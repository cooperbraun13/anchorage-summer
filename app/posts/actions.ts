"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { verifyAdminPassword } from "@/lib/auth";
import { getPostImageFile, uploadPostImage } from "@/lib/blob";
import { prisma } from "@/lib/prisma";
import type { PostActionState } from "@/lib/validations";
import { getPostFormValues, validatePostFormData } from "@/lib/validations";

export async function createPostAction(
  _previousState: PostActionState,
  formData: FormData,
): Promise<PostActionState> {
  const auth = verifyAdminPassword(formData.get("adminPassword"));

  if (!auth.ok) {
    return {
      message: auth.message,
      errors: { adminPassword: auth.message },
      values: getPostFormValues(formData),
    };
  }

  const parsed = validatePostFormData(formData);

  if (!parsed.ok) {
    return {
      message: "Fix the highlighted fields.",
      errors: parsed.errors,
      values: parsed.values,
    };
  }

  const imageFile = getPostImageFile(formData);

  if (!imageFile.ok) {
    return {
      message: "Fix the highlighted fields.",
      errors: { imageFile: imageFile.message },
      values: {
        ...getPostFormValues(formData),
        slug: parsed.data.slug,
      },
    };
  }

  const existingPost = await prisma.post.findUnique({
    where: { slug: parsed.data.slug },
    select: { id: true },
  });

  if (existingPost) {
    return {
      message: "A post with this slug already exists.",
      errors: { slug: "Choose a unique slug." },
      values: {
        ...getPostFormValues(formData),
        slug: parsed.data.slug,
      },
    };
  }

  let imageUrl = parsed.data.imageUrl;

  if (imageFile.file) {
    const uploadResult = await uploadImageAndReturnUrl(
      imageFile.file,
      parsed.data.slug,
      formData,
    );

    if (typeof uploadResult !== "string") {
      return uploadResult.error;
    }

    imageUrl = uploadResult;
  }

  await prisma.post.create({
    data: {
      ...parsed.data,
      imageUrl,
    },
  });

  revalidatePath("/posts");
  redirect(`/posts/${parsed.data.slug}`);
}

export async function updatePostAction(
  currentSlug: string,
  _previousState: PostActionState,
  formData: FormData,
): Promise<PostActionState> {
  const auth = verifyAdminPassword(formData.get("adminPassword"));

  if (!auth.ok) {
    return {
      message: auth.message,
      errors: { adminPassword: auth.message },
      values: getPostFormValues(formData),
    };
  }

  const parsed = validatePostFormData(formData);

  if (!parsed.ok) {
    return {
      message: "Fix the highlighted fields.",
      errors: parsed.errors,
      values: parsed.values,
    };
  }

  const imageFile = getPostImageFile(formData);

  if (!imageFile.ok) {
    return {
      message: "Fix the highlighted fields.",
      errors: { imageFile: imageFile.message },
      values: {
        ...getPostFormValues(formData),
        slug: parsed.data.slug,
      },
    };
  }

  const post = await prisma.post.findUnique({
    where: { slug: currentSlug },
    select: { id: true },
  });

  if (!post) {
    return {
      message: "Post not found.",
      errors: { form: "This post no longer exists." },
    };
  }

  const slugConflict = await prisma.post.findUnique({
    where: { slug: parsed.data.slug },
    select: { id: true },
  });

  if (slugConflict && slugConflict.id !== post.id) {
    return {
      message: "A post with this slug already exists.",
      errors: { slug: "Choose a unique slug." },
      values: {
        ...getPostFormValues(formData),
        slug: parsed.data.slug,
      },
    };
  }

  let imageUrl = parsed.data.imageUrl;

  if (imageFile.file) {
    const uploadResult = await uploadImageAndReturnUrl(
      imageFile.file,
      parsed.data.slug,
      formData,
    );

    if (typeof uploadResult !== "string") {
      return uploadResult.error;
    }

    imageUrl = uploadResult;
  }

  await prisma.post.update({
    where: { id: post.id },
    data: {
      ...parsed.data,
      imageUrl,
    },
  });

  revalidatePath("/posts");
  revalidatePath(`/posts/${currentSlug}`);
  revalidatePath(`/posts/${parsed.data.slug}`);
  redirect(`/posts/${parsed.data.slug}`);
}

export async function deletePostAction(
  currentSlug: string,
  formData: FormData,
) {
  const auth = verifyAdminPassword(formData.get("adminPassword"));

  if (!auth.ok) {
    redirect(`/posts/${currentSlug}/edit?deleteError=1`);
  }

  await prisma.post.delete({
    where: { slug: currentSlug },
  });

  revalidatePath("/posts");
  redirect("/posts");
}

async function uploadImageAndReturnUrl(
  file: File,
  slug: string,
  formData: FormData,
): Promise<string | { error: PostActionState }> {
  try {
    const blob = await uploadPostImage(file, slug);
    return blob.url;
  } catch {
    return {
      error: {
        message:
          "Image upload failed. Check BLOB_READ_WRITE_TOKEN and try again.",
        errors: {
          imageFile:
            "Image upload failed. Check BLOB_READ_WRITE_TOKEN and try again.",
        },
        values: {
          ...getPostFormValues(formData),
          slug,
        },
      },
    };
  }
}
