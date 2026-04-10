import { DocPageView } from "@/components/doc-page";
import { buildDocMetadata, requireDocPage } from "@/lib/doc-helpers";

export const metadata = buildDocMetadata("/huruf");

export default function Page() {
  const page = requireDocPage("/huruf");
  return <DocPageView page={page} />;
}
