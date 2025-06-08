import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateCommentUseCase } from './create-comment.use-case';
import {
  CreateCommentBody,
  CreateCommentBodyDto,
} from './create-comment.validation';

@ApiTags('Posts')
@Controller('posts')
export class CreateCommentController {
  constructor(private readonly createCommentUseCase: CreateCommentUseCase) {}

  @Post(':id/comments')
  @ApiParam({ name: 'id' })
  @ApiBody({ type: CreateCommentBodyDto })
  async handle(
    @Param('id') id: string,
    @Body() { content }: CreateCommentBody,
  ) {
    return await this.createCommentUseCase.execute({
      content,
      postId: Number(id),
    });
  }
}
