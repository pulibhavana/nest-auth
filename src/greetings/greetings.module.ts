import { Module } from '@nestjs/common';
import { GreetingsController } from './greetings.controller';
import { GreetingsService } from './greetings.service';
import { PassportModule } from '@nestjs/passport';
import {
  deleteControllerClass,
  getControllerClass,
  postControllerClass,
  putControllerClass,
} from './utils';

const routes = [
  {
    customPath: 'v1/platforms',
    method: 'GET',
    auth: false,
    handler: 'getGreetings',
  },
  // {
  //   customPath: 'v1/snapshots',
  //   method: 'GET',
  //   handler: 'getGreetings',
  // },
  // { customPath: 'route2', method: 'POST', handler: 'postGreetings' },
  // { customPath: 'route3', method: 'PUT', handler: 'postGreetings' },
];
@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'AzureAD',
    }),
  ],
  controllers: [
    GreetingsController,
    ...routes.map((route) => {
      if (route.method === 'GET') {
        return getControllerClass(route);
      }
      if (route.method === 'POST') {
        return postControllerClass(route);
      }
      if (route.method === 'PUT') {
        return putControllerClass(route);
      }
      if (route.method === 'DELETE') {
        return deleteControllerClass(route);
      }
    }),
  ],
  providers: [GreetingsService],
})
export class GreetingsModule {}
