/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { PostOrderBody } from '../../Types/RequestTypes';

@Controller('order')
export class OrderController {
  public constructor(private orderService: OrderService) {}

  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  @Post('post')
  public async postOrder(@Body() body: PostOrderBody) {
    return this.orderService.postOrder(body);
  }

  @Get('get')
  public async getOrder(@Query('id') orderId: string) {
    return (await this.orderService.getOrder(orderId)) ?? {};
  }
}
