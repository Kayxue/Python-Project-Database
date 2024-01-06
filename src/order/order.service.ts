/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OrderDetail } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { PostOrderBody } from '../../Types/RequestTypes.dto';

@Injectable()
export class OrderService {
  public constructor(private prismaService: PrismaService) {}

  public async postOrder(data: PostOrderBody): Promise<OrderDetail> {
    return this.prismaService.orderDetail.create({
      data: {
        orders: {
          create: data.orders.map((e) => {
            return {
              name: e.name,
              data: {
                create: {
                  big: e.data.big,
                  medium: e.data.medium,
                },
              },
            };
          }),
        },
      },
      include: {
        orders: {
          include: {
            data: true,
          },
        },
      },
    });
  }

  public async getOrder(orderId?: string) {
    if (!orderId) {
      return this.prismaService.orderDetail.findMany({
        include: { orders: { include: { data: true } } },
      });
    }
    return this.prismaService.orderDetail.findUnique({
      where: { id: orderId },
      include: { orders: { include: { data: true } } },
    });
  }

  public async deleteOrder(orderId: string) {
    const result = await this.prismaService.orderDetail.findUnique({
      where: { id: orderId },
      include: { orders: { include: { data: true } } },
    });
    if (!result)
      throw new HttpException('No order found', HttpStatus.BAD_REQUEST);
    const orderIdMap = result.orders.map((e) => e.orderId);
    await this.prismaService.order.deleteMany({
      where: {
        id: {
          in: orderIdMap,
        },
      },
    });
    await this.prismaService.orderDetail.delete({
      where: { id: result.id },
    });
    return 'Finished Deletion';
  }

  public async deleteItemInOrder(orderId: string, items: string[]) {
    const result = await this.prismaService.orderDetail.findUnique({
      where: { id: orderId },
      include: { orders: { include: { data: true } } },
    });
    if (!result)
      throw new HttpException('No order found', HttpStatus.BAD_REQUEST);
    await this.prismaService.order.deleteMany({
      where: {
        id: {
          in: result.orders
            .filter((e) => e.name in items)
            .map((e) => e.orderId),
        },
      },
    });
    const updated = await this.prismaService.orderDetail.update({
      where: { id: result.id },
      data: {
        orders: {
          deleteMany: {
            name: {
              in: items,
            },
          },
        },
      },
      include: {
        orders: {
          include: {
            data: true,
          },
        },
      },
    });
    if (updated.orders.length <= 0) {
      await this.prismaService.orderDetail.delete({
        where: { id: result.id },
      });
      return 'No item in order list, this order has already been deleted';
    }
    return updated;
  }
}
