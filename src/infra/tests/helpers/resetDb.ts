import { PrismaClient } from '@prisma/client';

export async function resetDb() {
  const prisma = new PrismaClient();
  return await prisma.$transaction([
    prisma.comment.deleteMany(),
    prisma.blogPost.deleteMany(),
  ]);
}
