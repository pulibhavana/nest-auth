import { Controller, Delete, Get, Post, Put, Type, UseGuards } from '@nestjs/common';
import { GreetingsService } from './greetings.service';
import { UserGuard } from '../authentication/strategies/user.guard';

export function getControllerClass({
  customPath,
  handler,
  auth,
  ...rest
}): Type<any> {
  @Controller()
  class MyController {
    constructor(private readonly serv: GreetingsService) {
      console.log('REST', rest);
    }
    @Get([customPath])
    @UseGuards(UserGuard)
    async getSomething() {
      return this.serv[handler]();
    }
  }
  return MyController;
}

export function postControllerClass({ customPath }): Type<any> {
  @Controller()
  class MyController {
    constructor() {}
    @Post([customPath])
    async getSomething() {
      return 2;
    }
  }
  return MyController;
}

export function putControllerClass({ customPath }): Type<any> {
  @Controller()
  class MyController {
    constructor() {}
    @Put([customPath])
    async getSomething() {
      return 2;
    }
  }
  return MyController;
}

export function deleteControllerClass({ customPath }): Type<any> {
  @Controller()
  class MyController {
    constructor() {}
    @Delete([customPath])
    async getSomething() {
      return 2;
    }
  }
  return MyController;
}
