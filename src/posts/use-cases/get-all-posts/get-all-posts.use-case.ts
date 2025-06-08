import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/database/prisma/prisma.service';
import {
  GetAllPostsInputSchema,
  PaginatedPostsResponse,
} from './get-all-posts.validation';

@Injectable()
export class GetAllPostsUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(params: unknown): Promise<PaginatedPostsResponse> {
    const parsed = GetAllPostsInputSchema.safeParse(params);
    if (!parsed.success) {
      throw new Error('Invalid pagination params');
    }

    const { page, limit } = parsed.data;
    const skip = (page - 1) * limit;

    const [total, data] = await Promise.all([
      this.prisma.blogPost.count(),
      this.prisma.blogPost.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          _count: {
            select: { comments: true },
          },
        },
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages,
      },
    };
  }
}
