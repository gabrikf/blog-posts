// src/posts/zod/get-post-by-id.schema.ts
import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const GetPostByIdInputSchema = z.object({
  id: z.coerce.number().int().min(1),
});

export const CommentSchema = z.object({
  id: z.number(),
  content: z.string(),
  createdAt: z.date(),
});

export const BlogPostWithCommentsSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  createdAt: z.date(),
  comments: z.array(CommentSchema),
});

export type GetPostByIdInput = z.infer<typeof GetPostByIdInputSchema>;
export class GetPostByIdInputDTO extends createZodDto(GetPostByIdInputSchema) {}
export type BlogPostWithComments = z.infer<typeof BlogPostWithCommentsSchema>;
