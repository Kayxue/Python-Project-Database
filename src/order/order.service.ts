/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { OrderDetail } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class OrderService {
  public constructor(private prismaService: PrismaService) {}

  public async postOrder(data: {
    orders: { name: string; data: { big: number; medium: number } }[];
  }): Promise<OrderDetail> {
    const result = await this.prismaService.orderDetail.create({
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

    return result;
  }
}
