import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-4 sm:px-8 md:h-20 md:flex-row md:items-center md:justify-between md:gap-4 md:py-0 lg:px-10">
        <Link href="/" className="flex items-center gap-3 text-primary">
          <span className="flex size-10 items-end justify-center rounded-md bg-primary-soft text-xl font-bold shadow-sm">
            A
          </span>
          <span className="font-serif text-2xl font-bold italic leading-none">
            {siteConfig.name}
          </span>
        </Link>

        <div className="flex items-center gap-5 overflow-x-auto md:gap-8">
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 border-b-2 border-transparent px-1 py-2 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={siteConfig.actions.addPost.href}
            className="shrink-0 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft md:hidden"
          >
            {siteConfig.actions.addPost.label}
          </Link>
        </div>

        <Link
          href={siteConfig.actions.addPost.href}
          className="hidden items-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft md:inline-flex"
        >
          <span aria-hidden="true" className="text-lg leading-none">
            +
          </span>
          <span>{siteConfig.actions.addPost.label}</span>
        </Link>
      </nav>
    </header>
  );
}
