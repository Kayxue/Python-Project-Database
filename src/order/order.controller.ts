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
import { ApiBody, ApiQuery } from '@nestjs/swagger';

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
  public async postOrder(@Body() body: PostOrderBody) {
    return this.orderService.postOrder(body);
  }

  @ApiQuery({ name: 'id', required: false })
  @Get('get')
  public async getOrder(@Query('id') orderId?: string) {
    return (await this.orderService.getOrder(orderId)) ?? {};
  }
}
