import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../infra/database/prisma/prisma.service';
import {
  CommentResponse,
  CreateCommentInput,
  CreateCommentInputSchema,
} from './create-comment.validation';

@Injectable()
export class CreateCommentUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(data: CreateCommentInput): Promise<CommentResponse> {
    const parsed = CreateCommentInputSchema.safeParse(data);

    if (!parsed.success) {
      throw new BadRequestException(parsed.error.flatten());
    }

    const { content, postId } = parsed.data;

    const postExists = await this.prisma.blogPost.findUnique({
      where: { id: postId },
      select: { id: true },
    });

    if (!postExists) {
      throw new NotFoundException(`Post with id ${postId} not found`);
    }

    const comment = await this.prisma.comment.create({
      data: {
        content,
        postId,
      },
    });

    return comment;
  }
}
