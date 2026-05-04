import { createPostAction } from "@/app/posts/actions";
import { PostForm } from "@/components/PostForm";

export default function NewPostPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-5 py-10 sm:px-8">
      <section className="border-b border-border/80 pb-7">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-primary">
          Owner
        </p>
        <h1 className="font-serif text-5xl font-bold text-foreground">
          Add Post
        </h1>
        <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
          Create a new Anchorage field note. Posts can include optional map
          coordinates, ratings, cost, distance, and an image.
        </p>
      </section>
      <PostForm action={createPostAction} submitLabel="Create Post" />
    </main>
  );
}
