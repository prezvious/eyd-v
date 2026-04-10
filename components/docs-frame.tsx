"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { FlagIcon, GitHubIcon, MenuIcon, SearchIcon, getGroupIcon } from "@/components/icons";
import { SearchDialog } from "@/components/search-dialog";
import type { NavGroup, SearchEntry } from "@/lib/site-content";

const repoHref = "https://github.com/prezvious/eyd-v";

type DocsFrameProps = {
  groups: NavGroup[];
  searchEntries: SearchEntry[];
  children: React.ReactNode;
};

type NavListProps = {
  groups: NavGroup[];
  pathname: string;
  onNavigate?: () => void;
};

function NavList({ groups, onNavigate, pathname }: NavListProps) {
  return (
    <nav aria-label="Navigasi utama" className="sidebar-nav">
      {groups.map((group) => {
        const Icon = getGroupIcon(group.icon);
        const groupActive =
          group.overview?.route === pathname || group.items.some((item) => item.route === pathname);

        return (
          <section className="nav-group" key={group.key}>
            <div className={`nav-group-head ${groupActive ? "is-active" : ""}`}>
              <span className="nav-group-icon">
                <Icon size={16} />
              </span>
              {group.overview ? (
                <Link className="nav-group-link" href={group.overview.route} onClick={onNavigate} prefetch={false}>
                  {group.title}
                </Link>
              ) : (
                <span className="nav-group-link">{group.title}</span>
              )}
            </div>
            <ul className="nav-items">
              {group.items.map((item) => (
                <li key={item.route}>
                  <Link
                    className={`nav-item ${pathname === item.route ? "is-active" : ""}`}
                    href={item.route}
                    onClick={onNavigate}
                    prefetch={false}
                  >
                    {item.prefix ? <span className="nav-prefix">{item.prefix}</span> : null}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </nav>
  );
}

export function DocsFrame({ groups, searchEntries, children }: DocsFrameProps) {
  const pathname = usePathname() ?? "/";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <SearchDialog entries={searchEntries} onClose={() => setIsSearchOpen(false)} open={isSearchOpen} />

      <div className="docs-shell">
        <aside className="docs-sidebar">
          <Link className="brand" href="/" prefetch={false}>
            <span className="brand-mark">
              <FlagIcon size={18} />
            </span>
            <span className="brand-text">
              <strong>EYD V</strong>
              <span>Referensi belajar bahasa Indonesia</span>
            </span>
          </Link>

          <NavList groups={groups} pathname={pathname} />

          <div className="sidebar-footer">
            <a className="repo-link" href={repoHref} rel="noreferrer" target="_blank">
              <GitHubIcon size={16} />
              <span>Lihat di GitHub</span>
            </a>
          </div>
        </aside>

        <div className="docs-stage">
          <header className="topbar">
            <Link className="brand brand-mobile" href="/" prefetch={false}>
              <span className="brand-mark">
                <FlagIcon size={18} />
              </span>
              <span className="brand-text">
                <strong>EYD V</strong>
                <span>Bahasa Indonesia</span>
              </span>
            </Link>

            <div className="topbar-actions">
              <a className="repo-link topbar-repo" href={repoHref} rel="noreferrer" target="_blank">
                <GitHubIcon size={16} />
                <span>GitHub</span>
              </a>
              <button className="search-trigger" onClick={() => setIsSearchOpen(true)} type="button">
                <SearchIcon size={16} />
                <span>Cari topik</span>
                <kbd>Ctrl K</kbd>
              </button>
              <button
                aria-label="Buka menu"
                className="icon-button mobile-only"
                onClick={() => setIsMenuOpen(true)}
                type="button"
              >
                <MenuIcon size={18} />
              </button>
            </div>
          </header>

          <main className="docs-main">{children}</main>
        </div>
      </div>

      {isMenuOpen ? (
        <div className="mobile-nav">
          <button aria-label="Tutup menu" className="mobile-nav-backdrop" onClick={() => setIsMenuOpen(false)} type="button" />
          <div className="mobile-nav-panel">
            <div className="mobile-nav-header">
              <span className="brand compact">
                <span className="brand-mark">
                  <FlagIcon size={18} />
                </span>
                <span className="brand-text">
                  <strong>EYD V</strong>
                  <span>Navigasi materi</span>
                </span>
              </span>
              <button
                aria-label="Tutup menu"
                className="icon-button"
                onClick={() => setIsMenuOpen(false)}
                type="button"
              >
                <MenuIcon size={18} />
              </button>
            </div>
            <a className="repo-link" href={repoHref} rel="noreferrer" target="_blank">
              <GitHubIcon size={16} />
              <span>Lihat di GitHub</span>
            </a>
            <NavList groups={groups} onNavigate={() => setIsMenuOpen(false)} pathname={pathname} />
          </div>
        </div>
      ) : null}
    </>
  );
}
