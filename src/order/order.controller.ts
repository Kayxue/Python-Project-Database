import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  public constructor(private orderService: OrderService) {}

  @Post('post')
  public async postOrder(@Body() body) {
    return this.orderService.postOrder(body);
  }
}
