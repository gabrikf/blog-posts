import { Controller, Get, Param } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { GetPostByIdUseCase } from './get-post-by-id.use-case';

@ApiTags('Posts')
@Controller('posts')
export class GetPostByIdController {
  constructor(private readonly getPostByIdUseCase: GetPostByIdUseCase) {}

  @Get(':id')
  @ApiParam({ name: 'id' })
  async handle(@Param('id') id: string) {
    return await this.getPostByIdUseCase.execute({ id: Number(id) });
  }
}
