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
  return getCategoryRoutes("/serapan").map((route) => ({
    topik: route.split("/").filter(Boolean)[1]
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { topik } = await params;
  return buildDocMetadata(`/serapan/${topik}`);
}

export default async function Page({ params }: PageProps) {
  const { topik } = await params;
  const page = requireDocPage(`/serapan/${topik}`);
  return <DocPageView page={page} />;
}
