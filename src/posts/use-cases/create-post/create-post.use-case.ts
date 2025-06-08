import { BadRequestException, Injectable } from '@nestjs/common';
import {
  BlogPostResponse,
  CreatePostInput,
  CreatePostInputSchema,
} from './create-post.validation';
import { PrismaService } from '../../../infra/database/prisma/prisma.service';

@Injectable()
export class CreatePostUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(data: CreatePostInput): Promise<BlogPostResponse> {
    const parsed = CreatePostInputSchema.safeParse(data);
    if (!parsed.success) {
      throw new BadRequestException('Invalid blog post input');
    }

    const { title, content } = parsed.data;
    const post = await this.prisma.blogPost.create({
      data: { title, content },
    });

    return post;
  }
}
