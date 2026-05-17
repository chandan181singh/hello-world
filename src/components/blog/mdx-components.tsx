import type { MDXComponents } from "mdx/types";
import Link from "next/link";

export const mdxComponents: MDXComponents = {
  h1: ({ children, ...props }) => (
    <h1
      {...props}
      className="mt-12 mb-4 font-display text-3xl font-bold tracking-tight md:text-4xl"
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2
      {...props}
      className="mt-12 mb-3 font-display text-2xl font-bold tracking-tight md:text-3xl"
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      {...props}
      className="mt-10 mb-3 font-display text-xl font-semibold tracking-tight md:text-2xl"
    >
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p
      {...props}
      className="my-4 leading-relaxed text-[var(--foreground)]/90"
    >
      {children}
    </p>
  ),
  a: ({ href = "", children, ...props }) => {
    const isExternal = /^https?:\/\//.test(href);
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gradient-static font-medium underline decoration-[color-mix(in_oklab,var(--color-primary)_60%,transparent)] underline-offset-4 hover:decoration-[var(--color-primary)]"
          {...props}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className="text-gradient-static font-medium underline underline-offset-4"
      >
        {children}
      </Link>
    );
  },
  ul: ({ children, ...props }) => (
    <ul {...props} className="my-4 list-disc space-y-1.5 pl-6">
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol {...props} className="my-4 list-decimal space-y-1.5 pl-6">
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li {...props} className="leading-relaxed text-[var(--foreground)]/90">
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      {...props}
      className="my-6 rounded-r-lg border-l-4 py-2 pl-4 italic text-[var(--muted-foreground)]"
      style={{ borderColor: "var(--color-primary)" }}
    >
      {children}
    </blockquote>
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      {...props}
      className="rounded-md border border-[var(--border)] bg-[color-mix(in_oklab,var(--color-primary)_8%,transparent)] px-1.5 py-0.5 font-mono text-[0.85em] text-[var(--color-primary)]"
    />
  ),
  pre: ({ children, ...props }) => (
    <pre
      {...props}
      className="my-6 overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--muted)] p-4 font-mono text-sm leading-relaxed"
    >
      {children}
    </pre>
  ),
  hr: () => (
    <hr
      className="my-12 border-0 h-px"
      style={{
        background:
          "linear-gradient(90deg, transparent, color-mix(in oklab, var(--color-primary) 40%, transparent), transparent)",
      }}
    />
  ),
  img: (props) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      alt={props.alt ?? ""}
      className="my-6 rounded-xl border border-[var(--border)]"
    />
  ),
  strong: ({ children, ...props }) => (
    <strong {...props} className="font-semibold text-[var(--foreground)]">
      {children}
    </strong>
  ),
};
