import { DocsFrame } from "@/components/docs-frame";
import { navGroups, searchEntries } from "@/lib/site-content";

export default function DocsLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DocsFrame groups={navGroups} searchEntries={searchEntries}>{children}</DocsFrame>;
}
