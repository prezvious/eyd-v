import { DocPageView } from "@/components/doc-page";
import { buildDocMetadata, requireDocPage } from "@/lib/doc-helpers";

export const metadata = buildDocMetadata("/tanda-baca");

export default function Page() {
  const page = requireDocPage("/tanda-baca");
  return <DocPageView page={page} />;
}
