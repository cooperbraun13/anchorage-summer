import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/format";
import { siteConfig } from "@/lib/site-config";

type TimelinePost = {
  id: string;
  title: string;
  slug: string;
  category: string;
  date: Date;
  location: string | null;
  body: string;
  imageUrl: string | null;
  rating: number | null;
};

type TimelineGroup = {
  label: string;
  posts: TimelinePost[];
};

type TimelineProps = {
  groups: TimelineGroup[];
};

export function Timeline({ groups }: TimelineProps) {
  return (
    <div className="grid gap-10">
      {groups.map((group) => (
        <section key={group.label} className="grid gap-5 md:grid-cols-[9rem_1fr]">
          <div>
            <h2 className="sticky top-24 font-serif text-2xl font-bold text-primary">
              {group.label}
            </h2>
          </div>

          <div className="relative grid gap-5 border-l border-primary/20 pl-5 sm:pl-7">
            {group.posts.map((post) => (
              <article key={post.id} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[1.85rem] top-6 size-3 rounded-full border-2 border-white bg-primary shadow-sm sm:-left-[2.35rem]"
                />
                <Link
                  href={`/posts/${post.slug}`}
                  className="group grid gap-4 rounded-lg border border-border bg-white/95 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-soft sm:grid-cols-[11rem_1fr] sm:p-5"
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-muted sm:aspect-[4/3]">
                    <Image
                      src={post.imageUrl || siteConfig.assets.defaultPostImage}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 176px, 100vw"
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-sm border border-primary/10 bg-primary-soft px-2.5 py-1 text-[0.68rem] font-bold uppercase text-primary">
                        {post.category}
                      </span>
                      <time
                        dateTime={post.date.toISOString()}
                        className="text-xs font-semibold text-muted-foreground"
                      >
                        {formatDate(post.date)}
                      </time>
                      {post.rating ? (
                        <span className="text-xs font-semibold text-amber-600">
                          {post.rating}/10
                        </span>
                      ) : null}
                    </div>

                    <h3 className="mt-2 font-serif text-2xl font-bold leading-tight text-foreground">
                      {post.title}
                    </h3>
                    {post.location ? (
                      <p className="mt-1 text-sm font-semibold text-muted-foreground">
                        {post.location}
                      </p>
                    ) : null}
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-foreground/75">
                      {post.body}
                    </p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
