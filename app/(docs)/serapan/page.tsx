import { DocPageView } from "@/components/doc-page";
import { buildDocMetadata, requireDocPage } from "@/lib/doc-helpers";

export const metadata = buildDocMetadata("/serapan");

export default function Page() {
  const page = requireDocPage("/serapan");
  return <DocPageView page={page} />;
}
