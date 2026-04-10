import Link from "next/link";

import { ArrowLeftIcon, ArrowRightIcon, ChevronRightIcon, getGroupIcon } from "@/components/icons";
import { MarkdownContent } from "@/components/markdown-content";
import type { DocPage, NavLink } from "@/lib/site-content";

type DocPageProps = {
  page: DocPage;
};

function TopicLinks({ links, title }: { links: NavLink[]; title: string }) {
  if (links.length === 0) {
    return null;
  }

  return (
    <section className="surface-block">
      <div className="section-kicker">{title}</div>
      <div className="topic-grid">
        {links.map((link) => (
          <Link className="topic-card" href={link.route} key={link.route} prefetch={false}>
            <span className="topic-card-meta">{link.prefix ?? "Topik"}</span>
            <strong>{link.label}</strong>
            <span className="topic-card-arrow">
              <ChevronRightIcon size={16} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function DocPageView({ page }: DocPageProps) {
  const Icon = getGroupIcon(page.icon);
  const relatedLinks = page.isOverview ? page.overviewLinks : page.siblingLinks.slice(0, 6);

  return (
    <div className="doc-grid">
      <article className="doc-article">
        <div className="doc-hero">
          <div className="crumbs">
            <Link href="/" prefetch={false}>Beranda</Link>
            <span>/</span>
            <span>{page.groupTitle}</span>
          </div>

          <div className="doc-hero-card">
            <div className="doc-hero-icon">
              <Icon size={18} />
            </div>
            <div className="doc-hero-copy">
              <div className="doc-hero-meta">
                <span>{page.groupTitle}</span>
                {page.prefix ? <span>{page.prefix}</span> : null}
              </div>
              <h1>{page.title}</h1>
              <p>{page.description}</p>
            </div>
          </div>
        </div>

        {page.bodyMarkdown ? (
          <section className="surface-block prose-block">
            <MarkdownContent markdown={page.bodyMarkdown} />
          </section>
        ) : null}

        {page.isOverview ? <TopicLinks links={page.overviewLinks} title="Daftar topik" /> : null}

        {page.sections.length > 0 ? (
          <section className="doc-sections">
            {page.sections.map((section) => (
              <section className="surface-block doc-section" id={section.anchor} key={section.id}>
                <div className="section-kicker">
                  {section.prefix ? <span className="section-prefix">{section.prefix}</span> : null}
                  <span>{page.title}</span>
                </div>
                <h2>{section.title}</h2>
                <MarkdownContent markdown={section.markdown} />
              </section>
            ))}
          </section>
        ) : null}

        <TopicLinks
          links={relatedLinks}
          title={page.isOverview ? "Lanjutkan belajar" : "Topik terkait"}
        />

        <div className="pager">
          {page.prev ? (
            <Link className="pager-link" href={page.prev.route} prefetch={false}>
              <span className="pager-direction">
                <ArrowLeftIcon size={16} />
                Sebelumnya
              </span>
              <strong>{page.prev.label}</strong>
            </Link>
          ) : (
            <div className="pager-link is-disabled" />
          )}

          {page.next ? (
            <Link className="pager-link align-right" href={page.next.route} prefetch={false}>
              <span className="pager-direction">
                Berikutnya
                <ArrowRightIcon size={16} />
              </span>
              <strong>{page.next.label}</strong>
            </Link>
          ) : (
            <div className="pager-link is-disabled" />
          )}
        </div>
      </article>

      <aside className="doc-toc">
        <div className="toc-panel">
          <div className="section-kicker">Daftar isi</div>
          <h2>{page.title}</h2>
          <p>{page.sections.length} bagian pada halaman ini.</p>
          {page.sections.length > 0 ? (
            <ul className="toc-list">
              {page.sections.map((section) => (
                <li key={section.anchor}>
                  <a href={`#${section.anchor}`}>{section.fullTitle}</a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="toc-empty">Halaman ini berupa ringkasan topik tanpa subbagian berjangkar.</p>
          )}
        </div>
      </aside>
    </div>
  );
}
