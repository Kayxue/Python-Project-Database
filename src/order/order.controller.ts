import { Body, Controller, Post } from '@nestjs/common';

@Controller('order')
export class OrderController {
  @Post('post')
  public async postOrder(@Body() body) {
    return body;
  }
}
