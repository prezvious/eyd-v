import { DocPageView } from "@/components/doc-page";
import { buildDocMetadata, requireDocPage } from "@/lib/doc-helpers";

export const metadata = buildDocMetadata("/pengantar");

export default function Page() {
  const page = requireDocPage("/pengantar");
  return <DocPageView page={page} />;
}
