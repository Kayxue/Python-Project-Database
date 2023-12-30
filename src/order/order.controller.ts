import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { PostOrderBody } from 'Types/RequestTypes';

@Controller('order')
export class OrderController {
  public constructor(private orderService: OrderService) {}

  @UsePipes(ValidationPipe)
  @Post('post')
  public async postOrder(@Body() body: PostOrderBody) {
    return this.orderService.postOrder(body);
  }
}
