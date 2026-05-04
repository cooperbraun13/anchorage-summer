import { prisma } from "@/lib/prisma";

export async function getPendingComments() {
  return prisma.comment.findMany({
    where: {
      approved: false,
    },
    orderBy: {
      createdAt: "asc",
    },
    include: {
      post: {
        select: {
          title: true,
          slug: true,
        },
      },
    },
  });
}
