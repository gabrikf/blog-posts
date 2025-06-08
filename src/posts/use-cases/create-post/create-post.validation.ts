// src/posts/zod/create-post.schema.ts
import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const CreatePostInputSchema = z.object({
  title: z.string().min(1).max(255),
  content: z.string().min(1),
});

export const BlogPostResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  createdAt: z.date(),
});

export type CreatePostInput = z.infer<typeof CreatePostInputSchema>;
export class CreatePostInputDTO extends createZodDto(CreatePostInputSchema) {}
export type BlogPostResponse = z.infer<typeof BlogPostResponseSchema>;
