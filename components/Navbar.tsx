import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
        <Link href="/" className="flex items-center gap-3 text-primary">
          <span className="flex size-11 items-end justify-center rounded-full bg-primary-soft text-2xl font-bold">
            A
          </span>
          <span className="font-serif text-2xl font-bold italic">
            {siteConfig.name}
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="border-b-2 border-transparent px-1 py-2 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Link
          href={siteConfig.actions.addPost.href}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft"
        >
          <span aria-hidden="true" className="text-lg leading-none">
            +
          </span>
          <span className="hidden sm:inline">{siteConfig.actions.addPost.label}</span>
        </Link>
      </nav>
    </header>
  );
}
