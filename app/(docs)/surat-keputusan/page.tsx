import { DocPageView } from "@/components/doc-page";
import { buildDocMetadata, requireDocPage } from "@/lib/doc-helpers";

export const metadata = buildDocMetadata("/surat-keputusan");

export default function Page() {
  const page = requireDocPage("/surat-keputusan");
  return <DocPageView page={page} />;
}
