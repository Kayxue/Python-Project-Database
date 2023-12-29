import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  public constructor() {}

  @Get()
  public getHello(): string {
    return 'Welcome to the api of Python-Project';
  }
}
