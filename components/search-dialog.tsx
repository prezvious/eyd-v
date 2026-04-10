"use client";

import Link from "next/link";
import { useEffect, useDeferredValue, useRef, useState, useTransition } from "react";

import { CloseIcon, SearchIcon } from "@/components/icons";
import type { SearchEntry } from "@/lib/site-content";

type SearchDialogProps = {
  entries: SearchEntry[];
  open: boolean;
  onClose: () => void;
};

function scoreEntry(entry: SearchEntry, terms: string[]) {
  let score = 0;

  for (const term of terms) {
    if (entry.title.toLowerCase().includes(term)) {
      score += 6;
    }
    if (entry.pageTitle.toLowerCase().includes(term)) {
      score += 4;
    }
    if (entry.category.toLowerCase().includes(term)) {
      score += 2;
    }
    if (entry.keywords.includes(term)) {
      score += 1;
    }
  }

  return score;
}

export function SearchDialog({ entries, open, onClose }: SearchDialogProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();
  const deferredQuery = useDeferredValue(query);
  const terms = deferredQuery
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  useEffect(() => {
    if (!open) {
      return;
    }

    const timeout = window.setTimeout(() => inputRef.current?.focus(), 10);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.clearTimeout(timeout);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  const suggestions = entries.filter((entry) => entry.anchor === null && entry.route !== "/").slice(0, 8);
  const results =
    terms.length === 0
      ? suggestions
      : entries
          .map((entry) => ({ entry, score: scoreEntry(entry, terms) }))
          .filter((item) => item.score > 0)
          .sort((left, right) => right.score - left.score || left.entry.fullTitle.localeCompare(right.entry.fullTitle))
          .slice(0, 12)
          .map((item) => item.entry);

  return (
    <div aria-modal="true" className="search-overlay" role="dialog">
      <button aria-label="Tutup pencarian" className="search-backdrop" onClick={onClose} type="button" />
      <div className="search-panel">
        <div className="search-head">
          <div className="search-input-wrap">
            <SearchIcon size={18} />
            <input
              aria-label="Cari topik EYD"
              className="search-input"
              onChange={(event) => {
                const nextValue = event.target.value;
                startTransition(() => setQuery(nextValue));
              }}
              placeholder="Cari huruf kapital, partikel, tanda titik..."
              ref={inputRef}
              type="search"
              value={query}
            />
          </div>
          <button aria-label="Tutup" className="icon-button" onClick={onClose} type="button">
            <CloseIcon size={18} />
          </button>
        </div>

        <div className="search-results">
          <div className="search-meta">
            <span>{terms.length === 0 ? "Topik cepat" : `Hasil pencarian ${results.length}`}</span>
            <span>{isPending ? "Memuat..." : "Enter untuk membuka"}</span>
          </div>

          {results.length === 0 ? (
            <div className="search-empty">
              <p>Tidak ada hasil yang cocok.</p>
              <p>Coba kata kunci yang lebih pendek atau istilah resmi EYD V.</p>
            </div>
          ) : (
            <ul className="search-list">
              {results.map((entry) => (
                <li key={entry.id}>
                  <Link className="search-result" href={entry.href} onClick={onClose} prefetch={false}>
                    <div className="search-result-top">
                      <span className="search-category">{entry.category}</span>
                      <span className="search-page">{entry.pageTitle}</span>
                    </div>
                    <strong>{entry.fullTitle}</strong>
                    <p>{entry.excerpt}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
