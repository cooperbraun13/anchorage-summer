"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { verifyAdminPassword, verifyAdminPasswordValue } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const adminCookieName = "anchorage-admin";

export async function loginAdminAction(formData: FormData) {
  const auth = verifyAdminPassword(formData.get("adminPassword"));

  if (!auth.ok) {
    redirect("/admin/comments?error=1");
  }

  const cookieStore = await cookies();

  cookieStore.set(adminCookieName, formData.get("adminPassword") as string, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin/comments",
  });

  redirect("/admin/comments");
}

export async function approveCommentAction(commentId: string) {
  await requireAdminCookie();

  const comment = await prisma.comment.update({
    where: { id: commentId },
    data: { approved: true },
    select: {
      post: {
        select: {
          slug: true,
        },
      },
    },
  });

  revalidatePath("/admin/comments");
  revalidatePath(`/posts/${comment.post.slug}`);
}

export async function deleteCommentAction(commentId: string) {
  await requireAdminCookie();

  const comment = await prisma.comment.delete({
    where: { id: commentId },
    select: {
      post: {
        select: {
          slug: true,
        },
      },
    },
  });

  revalidatePath("/admin/comments");
  revalidatePath(`/posts/${comment.post.slug}`);
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const auth = verifyAdminPasswordValue(cookieStore.get(adminCookieName)?.value);
  return auth.ok;
}

async function requireAdminCookie() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/comments?error=1");
  }
}
