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
              big: e.data.big,
              medium: e.data.medium,
            };
          }),
        },
      },
      include: {
        orders: true,
      },
    });
  }

  public async getOrder(orderId?: string) {
    if (!orderId) {
      return this.prismaService.orderDetail.findMany({
        include: { orders: true },
      });
    }
    return this.prismaService.orderDetail.findUnique({
      where: { id: orderId },
      include: { orders: true },
    });
  }

  public async deleteOrder(orderId: string) {
    const result = await this.prismaService.orderDetail.findUnique({
      where: { id: orderId },
    });
    if (!result)
      throw new HttpException('No order found', HttpStatus.BAD_REQUEST);
    await this.prismaService.orderDetail.delete({
      where: { id: result.id },
    });
    return 'Finished Deletion';
  }

  public async deleteItemInOrder(orderId: string, items: string[]) {
    const result = await this.prismaService.orderDetail.findUnique({
      where: { id: orderId },
    });
    if (!result)
      throw new HttpException('No order found', HttpStatus.BAD_REQUEST);
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
        orders: true,
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
