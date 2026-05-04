"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import type { CommentActionState } from "@/lib/validations";
import { validateCommentFormData } from "@/lib/validations";

export async function createCommentAction(
  slug: string,
  _previousState: CommentActionState,
  formData: FormData,
): Promise<CommentActionState> {
  const parsed = validateCommentFormData(formData);

  if (!parsed.ok) {
    return {
      message: "Fix the highlighted fields.",
      errors: parsed.errors,
      values: parsed.values,
    };
  }

  if (parsed.spam) {
    return {
      ok: true,
      message: "Thanks! Your comment will appear after it is approved.",
    };
  }

  const post = await prisma.post.findUnique({
    where: { slug },
    select: { id: true },
  });

  if (!post) {
    return {
      message: "This post no longer exists.",
      values: {
        name: formData.get("name")?.toString() ?? "",
        body: formData.get("body")?.toString() ?? "",
        website: "",
      },
    };
  }

  await prisma.comment.create({
    data: {
      postId: post.id,
      name: parsed.data.name,
      body: parsed.data.body,
      approved: false,
    },
  });

  revalidatePath(`/posts/${slug}`);

  return {
    ok: true,
    message: "Thanks! Your comment will appear after it is approved.",
  };
}
