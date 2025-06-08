import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const GetAllPostsInputSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

export const PostWithCommentCountSchema = z.object({
  id: z.number(),
  title: z.string(),
  _count: z.object({
    comments: z.number(),
  }),
});

export const PaginatedPostsResponseSchema = z.object({
  data: z.array(PostWithCommentCountSchema),
  meta: z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
  }),
});

export type GetAllPostsInput = z.infer<typeof GetAllPostsInputSchema>;

export class GetAllPostsInputDTO extends createZodDto(GetAllPostsInputSchema) {}
export type PaginatedPostsResponse = z.infer<
  typeof PaginatedPostsResponseSchema
>;
