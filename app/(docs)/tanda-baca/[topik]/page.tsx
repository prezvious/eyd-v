import type { Metadata } from "next";

import { DocPageView } from "@/components/doc-page";
import { buildDocMetadata, requireDocPage } from "@/lib/doc-helpers";
import { getCategoryRoutes } from "@/lib/site-content";

type PageProps = {
  params: Promise<{
    topik: string;
  }>;
};

export function generateStaticParams() {
  return getCategoryRoutes("/tanda-baca").map((route) => ({
    topik: route.split("/").filter(Boolean)[1]
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { topik } = await params;
  return buildDocMetadata(`/tanda-baca/${topik}`);
}

export default async function Page({ params }: PageProps) {
  const { topik } = await params;
  const page = requireDocPage(`/tanda-baca/${topik}`);
  return <DocPageView page={page} />;
}
