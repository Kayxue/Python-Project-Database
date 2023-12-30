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
    description: 'An order has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Post body not complete or is empty',
  })
  public async postOrder(@Body() body: PostOrderBody) {
    return this.orderService.postOrder(body);
  }

  @ApiQuery({ name: 'id', required: false })
  @ApiResponse({ status: 200, description: 'Get data completed' })
  @Get('get')
  public async getOrder(@Query('id') orderId?: string) {
    return (await this.orderService.getOrder(orderId)) ?? {};
  }
}
