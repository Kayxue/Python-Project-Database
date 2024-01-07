import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Home')
@Controller()
export class AppController {
  public constructor() {}

  @Get()
  public getHello(): string {
    return 'Welcome to the api of Python-Project';
  }
}
