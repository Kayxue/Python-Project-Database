/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { PostOrderBody } from '../../Types/RequestTypes.dto';
import { ApiBody, ApiQuery, ApiResponse } from '@nestjs/swagger';

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
  @ApiBody({ type: PostOrderBody })
  @ApiResponse({
    status: 201,
    description:
      'An order has been successfully created, and will return an Order Object',
  })
  @ApiResponse({
    status: 400,
    description: 'Post body not complete or is empty',
  })
  public async postOrder(@Body() body: PostOrderBody) {
    return this.orderService.postOrder(body);
  }

  @ApiQuery({
    name: 'id',
    required: false,
    description:
      'Order you want to find, leave empty if you want to get all order in database',
  })
  @ApiResponse({
    status: 200,
    description:
      "Get data completed, will return all order in database, or return an order data if id query is provided, or empty object if can't find any order with given order id",
  })
  @Get('get')
  public async getOrder(@Query('id') orderId?: string) {
    return (await this.orderService.getOrder(orderId)) ?? {};
  }
}
