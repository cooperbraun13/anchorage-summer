import { notFound } from "next/navigation";
import { updatePostAction } from "@/app/posts/actions";
import { DeletePostForm } from "@/components/DeletePostForm";
import { PostForm } from "@/components/PostForm";
import { formatDateInput } from "@/lib/format";
import { getPostBySlug } from "@/lib/posts";

export const dynamic = "force-dynamic";

type EditPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams?: Promise<{
    deleteError?: string;
  }>;
};

export default async function EditPostPage({
  params,
  searchParams,
}: EditPostPageProps) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const updateAction = updatePostAction.bind(null, post.slug);

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-5 py-10 sm:px-8">
      <section className="border-b border-border/80 pb-7">
        <p className="mb-3 text-sm font-semibold text-accent">
          Owner
        </p>
        <h1 className="font-serif text-5xl font-semibold text-foreground">
          Edit Post
        </h1>
        <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
          Update post content, metadata, image, or map coordinates.
        </p>
      </section>
      <PostForm
        action={updateAction}
        submitLabel="Save Changes"
        initialValues={{
          title: post.title,
          slug: post.slug,
          category: post.category,
          date: formatDateInput(post.date),
          location: post.location ?? "",
          latitude: post.latitude?.toString() ?? "",
          longitude: post.longitude?.toString() ?? "",
          rating: post.rating?.toString() ?? "",
          cost: post.cost?.toString() ?? "",
          distance: post.distance?.toString() ?? "",
          body: post.body,
          imageUrl: post.imageUrl ?? "",
        }}
      />
      <DeletePostForm slug={post.slug} showError={query?.deleteError === "1"} />
    </main>
  );
}
