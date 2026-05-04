import type { Prisma } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export type PostListParams = {
  category?: string;
  search?: string;
  sort?: string;
};

export async function getPosts(params: PostListParams = {}) {
  const where: Prisma.PostWhereInput = {};
  const category = params.category?.trim();
  const search = params.search?.trim();

  if (category) {
    where.category = category;
  }

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { location: { contains: search, mode: "insensitive" } },
      { body: { contains: search, mode: "insensitive" } },
    ];
  }

  return prisma.post.findMany({
    where,
    orderBy: {
      date: params.sort === "oldest" ? "asc" : "desc",
    },
  });
}

export async function getPostBySlug(slug: string) {
  return prisma.post.findUnique({
    where: { slug },
  });
}

export async function getPostWithApprovedComments(slug: string) {
  return prisma.post.findUnique({
    where: { slug },
    include: {
      comments: {
        where: {
          approved: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });
}

export async function getPostCategories() {
  const categories = await prisma.post.findMany({
    distinct: ["category"],
    orderBy: {
      category: "asc",
    },
    select: {
      category: true,
    },
  });

  return categories.map((item) => item.category);
}
