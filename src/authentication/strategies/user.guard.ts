import { CanActivate, ExecutionContext } from '@nestjs/common';

export class UserGuard implements CanActivate {
  public canActivate(context: ExecutionContext) {
    const http = context.switchToHttp();
    const req = http.getRequest();
    return false;
  }
}
