import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createCommentAction } from "@/app/posts/[slug]/comments/actions";
import { CommentForm } from "@/components/CommentForm";
import { CommentList } from "@/components/CommentList";
import { formatDate } from "@/lib/format";
import { getPostWithApprovedComments } from "@/lib/posts";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-dynamic";

type PostDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { slug } = await params;
  const post = await getPostWithApprovedComments(slug);

  if (!post) {
    notFound();
  }

  const commentAction = createCommentAction.bind(null, post.slug);

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-7 px-5 py-9 sm:px-8">
      <section className="overflow-hidden rounded-lg border border-border bg-white/95 shadow-soft">
        <div className="relative aspect-[16/9] bg-muted">
          <Image
            src={post.imageUrl || siteConfig.assets.defaultPostImage}
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 960px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="grid gap-5 p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="rounded-sm border border-primary/10 bg-primary-soft px-3 py-1 text-xs font-bold uppercase text-primary">
              {post.category}
            </span>
            <time className="text-sm font-medium text-muted-foreground">
              {formatDate(post.date)}
            </time>
          </div>
          <div>
            <h1 className="font-serif text-4xl font-bold leading-tight text-foreground sm:text-5xl">
              {post.title}
            </h1>
            <div className="mt-4 flex flex-wrap gap-3 text-sm font-medium text-muted-foreground">
              {post.location ? <span>{post.location}</span> : null}
              {post.rating ? <span>{post.rating}/10 rating</span> : null}
              {post.distance ? <span>{post.distance} mi</span> : null}
              {post.cost !== null ? <span>${post.cost}</span> : null}
            </div>
          </div>
          <div className="max-w-none whitespace-pre-wrap text-base leading-8 text-foreground/85 sm:text-lg">
            {post.body}
          </div>
          {post.latitude !== null && post.longitude !== null ? (
            <div className="rounded-sm border border-primary/10 bg-primary-soft/60 p-4 text-sm font-semibold text-primary">
              Map coordinates: {post.latitude}, {post.longitude}
            </div>
          ) : null}
          <div className="flex flex-wrap justify-between gap-3 border-t border-border pt-5">
            <Link
              href="/posts"
              className="rounded-sm border border-border bg-white px-4 py-3 text-sm font-semibold text-primary transition hover:-translate-y-0.5 hover:border-primary"
            >
              Back to posts
            </Link>
            <Link
              href={`/posts/${post.slug}/edit`}
              className="rounded-sm bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-primary/90"
            >
              Edit Post
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
        <CommentList comments={post.comments} />
        <CommentForm action={commentAction} />
      </section>
    </main>
  );
}
