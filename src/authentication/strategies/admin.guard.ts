import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AdminGuard implements CanActivate {
  public canActivate(context: ExecutionContext) {
    const http = context.switchToHttp();
    const req = http.getRequest();
    const { roles } = req.user;
    console.log("********************",roles);

    return roles && roles.includes('Admin');
  }
}
