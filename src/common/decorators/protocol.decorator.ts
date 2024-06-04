import { createParamDecorator } from '@nestjs/common';

export const Protocol = createParamDecorator((data, ctx) => {
  console.log(`get default data from @Protocol:${data}`);
  const request = ctx.switchToHttp().getRequest();
  return request.protocol;
});
