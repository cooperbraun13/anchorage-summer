import { put } from "@vercel/blob";

const allowedImageTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
]);

export const maxPostImageSize = 4 * 1024 * 1024;

export type ImageFileValidationResult =
  | {
      ok: true;
      file: File | null;
    }
  | {
      ok: false;
      message: string;
    };

export function getPostImageFile(formData: FormData): ImageFileValidationResult {
  const value = formData.get("imageFile");

  if (!value || typeof value === "string" || value.size === 0) {
    return {
      ok: true,
      file: null,
    };
  }

  if (!allowedImageTypes.has(value.type)) {
    return {
      ok: false,
      message: "Upload a JPEG, PNG, WebP, or AVIF image.",
    };
  }

  if (value.size > maxPostImageSize) {
    return {
      ok: false,
      message: "Image must be 4 MB or smaller.",
    };
  }

  return {
    ok: true,
    file: value,
  };
}

export async function uploadPostImage(file: File, slug: string) {
  const filename = sanitizeFilename(file.name || "post-image");
  const pathname = `posts/${slug}-${crypto.randomUUID()}-${filename}`;

  return put(pathname, file, {
    access: "public",
    addRandomSuffix: true,
    contentType: file.type,
  });
}

function sanitizeFilename(filename: string) {
  const parts = filename.split(".");
  const extension = parts.length > 1 ? parts.pop()?.toLowerCase() : "";
  const basename = parts
    .join(".")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

  return `${basename || "post-image"}${extension ? `.${extension}` : ""}`;
}
