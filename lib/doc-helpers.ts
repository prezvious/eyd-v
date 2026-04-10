import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDocPage } from "@/lib/site-content";

export function requireDocPage(route: string) {
  const page = getDocPage(route);
  if (!page) {
    notFound();
  }
  return page;
}

export function buildDocMetadata(route: string): Metadata {
  const page = getDocPage(route);

  if (!page) {
    return {
      title: "EYD V"
    };
  }

  return {
    title: page.title,
    description: page.description
  };
}
