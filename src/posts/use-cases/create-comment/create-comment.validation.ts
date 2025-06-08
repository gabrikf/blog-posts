import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const CreateCommentParamsSchema = z.object({
  id: z.coerce.number().int().min(1), // post ID
});

export const CreateCommentBodySchema = z.object({
  content: z.string().min(1).max(1000),
});

export const CreateCommentInputSchema = z.object({
  content: z.string().min(1).max(1000),
  postId: z.coerce.number().int().min(1),
});

export const CommentResponseSchema = z.object({
  id: z.number(),
  content: z.string(),
  createdAt: z.date(),
  postId: z.number(),
});

export type CreateCommentParams = z.infer<typeof CreateCommentParamsSchema>;
export type CreateCommentBody = z.infer<typeof CreateCommentBodySchema>;
export class CreateCommentBodyDto extends createZodDto(
  CreateCommentBodySchema,
) {}
export type CreateCommentInput = z.infer<typeof CreateCommentInputSchema>;
export type CommentResponse = z.infer<typeof CommentResponseSchema>;
