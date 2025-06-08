import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../../infra/database/prisma/prisma.service';
import {
  BlogPostWithComments,
  GetPostByIdInputSchema,
} from './get-post-by-id.validation';

@Injectable()
export class GetPostByIdUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(rawParams: unknown): Promise<BlogPostWithComments> {
    const parsed = GetPostByIdInputSchema.safeParse(rawParams);
    if (!parsed.success) {
      throw new BadRequestException(parsed.error.flatten());
    }

    const { id } = parsed.data;

    const post = await this.prisma.blogPost.findUnique({
      where: { id },
      include: {
        comments: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    return post;
  }
}
