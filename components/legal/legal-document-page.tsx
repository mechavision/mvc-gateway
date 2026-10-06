import Link from "next/link";
import type { ReactNode } from "react";
import {
  getLegalDocument,
  type LegalDocumentSlug,
} from "@/lib/legal-documents";

type MarkdownBlock =
  | { text: string; type: "paragraph" }
  | { items: string[]; type: "unordered-list" }
  | { level: 1 | 2 | 3; text: string; type: "heading" };

function parseMarkdown(markdown: string): MarkdownBlock[] {
  const blocks: MarkdownBlock[] = [];
  const lines = markdown.split("\n");
  let paragraph: string[] = [];
  let listItems: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length === 0) {
      return;
    }

    blocks.push({
      type: "paragraph",
      text: paragraph.join(" "),
    });
    paragraph = [];
  };

  const flushList = () => {
    if (listItems.length === 0) {
      return;
    }

    blocks.push({
      type: "unordered-list",
      items: listItems,
    });
    listItems = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }

    if (trimmed.startsWith("### ")) {
      flushParagraph();
      flushList();
      blocks.push({
        type: "heading",
        level: 3,
        text: trimmed.slice(4),
      });
      continue;
    }

    if (trimmed.startsWith("## ")) {
      flushParagraph();
      flushList();
      blocks.push({
        type: "heading",
        level: 2,
        text: trimmed.slice(3),
      });
      continue;
    }

    if (trimmed.startsWith("# ")) {
      flushParagraph();
      flushList();
      blocks.push({
        type: "heading",
        level: 1,
        text: trimmed.slice(2),
      });
      continue;
    }

    if (trimmed.startsWith("- ")) {
      flushParagraph();
      listItems.push(trimmed.slice(2));
      continue;
    }

    flushList();
    paragraph.push(trimmed);
  }

  flushParagraph();
  flushList();

  return blocks;
}

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const tokenPattern = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];

    if (token.startsWith("**")) {
      nodes.push(
        <strong key={`${token}-${match.index}`} className="font-semibold text-dark-950">
          {token.slice(2, -2)}
        </strong>,
      );
    } else {
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);

      if (linkMatch) {
        const [, label, href] = linkMatch;
        const className =
          "font-medium text-dark-950 underline decoration-amber-500/45 underline-offset-4 transition-colors hover:text-amber-500";

        if (href.startsWith("http") || href.startsWith("mailto:")) {
          nodes.push(
            <a key={`${href}-${match.index}`} href={href} className={className}>
              {label}
            </a>,
          );
        } else {
          nodes.push(
            <Link key={`${href}-${match.index}`} href={href} className={className}>
              {label}
            </Link>,
          );
        }
      }
    }

    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

export default function LegalDocumentPage({
  slug,
}: {
  slug: LegalDocumentSlug;
}) {
  const document = getLegalDocument(slug);
  const blocks = parseMarkdown(document.body);

  return (
    <main className="min-h-screen bg-gray-50 text-dark-950">
      <header className="border-b border-dark-950/10 bg-dark-950 px-6 py-6 text-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-6">
          <Link href="/" className="font-display text-lg font-semibold tracking-tight">
            MVC
          </Link>
          <nav className="flex items-center gap-4 text-sm text-white/70">
            <Link href="/legal/terms" className="transition-colors hover:text-white">
              Terms
            </Link>
            <Link href="/legal/privacy" className="transition-colors hover:text-white">
              Privacy
            </Link>
          </nav>
        </div>
      </header>

      <article className="mx-auto max-w-4xl px-6 py-12 md:py-16">
        <div className="border-b border-dark-950/10 pb-8">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-amber-500">
            Legal
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-dark-950 md:text-6xl">
            {document.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-gray-600">
            {document.summary}
          </p>
          <p className="mt-4 text-sm text-gray-500">
            Last updated {document.lastUpdated}
          </p>
        </div>

        <div className="legal-content mt-10 space-y-6">
          {blocks.map((block, index) => {
            if (block.type === "heading") {
              if (block.level === 1) {
                return null;
              }

              if (block.level === 2) {
                return (
                  <h2
                    key={`${block.text}-${index}`}
                    className="pt-8 font-display text-2xl font-semibold tracking-tight text-dark-950 md:text-3xl"
                  >
                    {renderInline(block.text)}
                  </h2>
                );
              }

              return (
                <h3
                  key={`${block.text}-${index}`}
                  className="pt-4 text-lg font-semibold text-dark-950"
                >
                  {renderInline(block.text)}
                </h3>
              );
            }

            if (block.type === "unordered-list") {
              return (
                <ul
                  key={`list-${index}`}
                  className="ml-5 list-disc space-y-2 text-base leading-7 text-gray-700"
                >
                  {block.items.map((item) => (
                    <li key={item}>{renderInline(item)}</li>
                  ))}
                </ul>
              );
            }

            return (
              <p
                key={`${block.text.slice(0, 24)}-${index}`}
                className="text-base leading-7 text-gray-700"
              >
                {renderInline(block.text)}
              </p>
            );
          })}
        </div>
      </article>
    </main>
  );
}
