import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetPostId = createParamDecorator(
  (_data, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const { postId } = req.params;
    return Number(postId);
  },
);
