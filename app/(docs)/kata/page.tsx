import { DocPageView } from "@/components/doc-page";
import { buildDocMetadata, requireDocPage } from "@/lib/doc-helpers";

export const metadata = buildDocMetadata("/kata");

export default function Page() {
  const page = requireDocPage("/kata");
  return <DocPageView page={page} />;
}
