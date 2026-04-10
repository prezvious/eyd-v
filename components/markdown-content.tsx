import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

import { ExternalIcon } from "@/components/icons";
import { resolveContentHref } from "@/lib/site-content";

type MarkdownContentProps = {
  markdown: string;
};

const LOCAL_ASSET_MAP: Record<string, string> = {
  "https://ejaan.kemendikdasmen.go.id/assets/icons/Icon-512.webp": "/content-assets/icon-512.webp",
  "https://ejaan.kemendikdasmen.go.id/assets/contoh-penggunaan-tanda-baca-titik-a3-c.png":
    "/content-assets/contoh-penggunaan-tanda-baca-titik-a3-c.png",
  "https://ejaan.kemendikdasmen.go.id/assets/contoh-penggunaan-tanda-baca-titik-a3.png":
    "/content-assets/contoh-penggunaan-tanda-baca-titik-a3.png",
  "https://ejaan.kemendikdasmen.go.id/assets/contoh-penggunaan-tanda-baca-titik-a4.png":
    "/content-assets/contoh-penggunaan-tanda-baca-titik-a4.png"
};

function isExternalHref(href: string): boolean {
  return /^https?:\/\//.test(href);
}

function localizeAsset(src: string): string {
  return LOCAL_ASSET_MAP[src] ?? src;
}

export function MarkdownContent({ markdown }: MarkdownContentProps) {
  if (!markdown.trim()) {
    return null;
  }

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        a({ href = "", children }) {
          const resolved = resolveContentHref(href);
          const external = isExternalHref(resolved);

          if (external) {
            return (
              <a className="md-link md-link-external" href={resolved} target="_blank" rel="noreferrer">
                <span>{children}</span>
                <ExternalIcon size={14} />
              </a>
            );
          }

          return (
            <Link className="md-link" href={resolved} prefetch={false}>
              {children}
            </Link>
          );
        },
        img({ src = "", alt = "" }) {
          const localized = typeof src === "string" ? localizeAsset(src) : "";
          return (
            <figure className="md-figure">
              <img alt={alt} className="md-image" loading="lazy" src={localized} />
              {alt ? <figcaption className="md-caption">{alt}</figcaption> : null}
            </figure>
          );
        },
        table({ children }) {
          return (
            <div className="md-table-wrap">
              <table className="md-table">{children}</table>
            </div>
          );
        },
        blockquote({ children }) {
          return <blockquote className="md-blockquote">{children}</blockquote>;
        },
        hr() {
          return <hr className="md-divider" />;
        },
        h1({ children }) {
          return <h2 className="md-h2">{children}</h2>;
        },
        h2({ children }) {
          return <h3 className="md-h3">{children}</h3>;
        },
        h3({ children }) {
          return <h4 className="md-h4">{children}</h4>;
        },
        h4({ children }) {
          return <h5 className="md-h5">{children}</h5>;
        }
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
}
