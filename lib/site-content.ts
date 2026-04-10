import rawRecords from "@/sections.json";

export type RawRecord = {
  id: string;
  source_url: string;
  page_location: string;
  anchor: string | null;
  title: string;
  markdown_path: string;
  markdown: string;
  plain_text: string;
};

type GroupKey = "pendahuluan" | "huruf" | "kata" | "tanda-baca" | "serapan";

type GroupConfig = {
  key: GroupKey;
  title: string;
  summary: string;
  icon: "book" | "letters" | "word" | "punctuation" | "layers";
  route?: string;
  pageLocations: string[];
};

type RouteEntry = {
  groupKey: GroupKey;
  groupTitle: string;
  groupSummary: string;
  icon: GroupConfig["icon"];
  route: string;
  pageLocation: string;
  label: string;
  fullLabel: string;
  prefix: string | null;
  description: string;
  isOverview: boolean;
};

export type NavLink = {
  route: string;
  label: string;
  fullLabel: string;
  prefix: string | null;
};

export type NavGroup = {
  key: GroupKey;
  title: string;
  summary: string;
  icon: GroupConfig["icon"];
  overview: NavLink | null;
  items: NavLink[];
};

export type Section = {
  id: string;
  anchor: string;
  route: string;
  href: string;
  title: string;
  fullTitle: string;
  prefix: string | null;
  markdown: string;
  plainText: string;
};

export type SearchEntry = {
  id: string;
  title: string;
  fullTitle: string;
  route: string;
  href: string;
  anchor: string | null;
  excerpt: string;
  category: string;
  pageTitle: string;
  keywords: string;
};

export type DocPage = {
  route: string;
  pageLocation: string;
  groupKey: GroupKey;
  groupTitle: string;
  groupSummary: string;
  icon: GroupConfig["icon"];
  isOverview: boolean;
  title: string;
  fullTitle: string;
  prefix: string | null;
  description: string;
  bodyMarkdown: string;
  sections: Section[];
  overviewLinks: NavLink[];
  siblingLinks: NavLink[];
  prev: NavLink | null;
  next: NavLink | null;
};

const RECORDS = rawRecords as RawRecord[];

const PAGE_ROUTE_MAP: Record<string, string> = {
  "": "/",
  "eyd/": "/pengantar",
  "eyd/surat-keputusan/": "/surat-keputusan",
  "eyd/penggunaan-huruf/": "/huruf",
  "eyd/penggunaan-huruf/huruf-abjad/": "/huruf/abjad",
  "eyd/penggunaan-huruf/huruf-vokal/": "/huruf/vokal",
  "eyd/penggunaan-huruf/huruf-konsonan/": "/huruf/konsonan",
  "eyd/penggunaan-huruf/gabungan-huruf-vokal/": "/huruf/gabungan-vokal",
  "eyd/penggunaan-huruf/gabungan-huruf-konsonan/": "/huruf/gabungan-konsonan",
  "eyd/penggunaan-huruf/huruf-kapital/": "/huruf/kapital",
  "eyd/penggunaan-huruf/huruf-miring/": "/huruf/miring",
  "eyd/penggunaan-huruf/huruf-tebal/": "/huruf/tebal",
  "eyd/penulisan-kata/": "/kata",
  "eyd/penulisan-kata/kata-dasar/": "/kata/dasar",
  "eyd/penulisan-kata/kata-turunan/": "/kata/turunan",
  "eyd/penulisan-kata/pemenggalan-kata/": "/kata/pemenggalan",
  "eyd/penulisan-kata/kata-depan/": "/kata/depan",
  "eyd/penulisan-kata/partikel/": "/kata/partikel",
  "eyd/penulisan-kata/singkatan-dan-akronim/": "/kata/singkatan",
  "eyd/penulisan-kata/angka-dan-bilangan/": "/kata/angka-bilangan",
  "eyd/penulisan-kata/kata-ganti/": "/kata/ganti",
  "eyd/penulisan-kata/kata-sandang/": "/kata/sandang",
  "eyd/penggunaan-tanda-baca/": "/tanda-baca",
  "eyd/penggunaan-tanda-baca/tanda-titik/": "/tanda-baca/titik",
  "eyd/penggunaan-tanda-baca/tanda-koma/": "/tanda-baca/koma",
  "eyd/penggunaan-tanda-baca/tanda-titik-koma/": "/tanda-baca/titik-koma",
  "eyd/penggunaan-tanda-baca/tanda-titik-dua/": "/tanda-baca/titik-dua",
  "eyd/penggunaan-tanda-baca/tanda-hubung/": "/tanda-baca/hubung",
  "eyd/penggunaan-tanda-baca/tanda-pisah/": "/tanda-baca/pisah",
  "eyd/penggunaan-tanda-baca/tanda-tanya/": "/tanda-baca/tanya",
  "eyd/penggunaan-tanda-baca/tanda-seru/": "/tanda-baca/seru",
  "eyd/penggunaan-tanda-baca/tanda-elipsis/": "/tanda-baca/elipsis",
  "eyd/penggunaan-tanda-baca/tanda-petik/": "/tanda-baca/petik",
  "eyd/penggunaan-tanda-baca/tanda-petik-tunggal/": "/tanda-baca/petik-tunggal",
  "eyd/penggunaan-tanda-baca/tanda-kurung/": "/tanda-baca/kurung",
  "eyd/penggunaan-tanda-baca/tanda-kurung-siku/": "/tanda-baca/kurung-siku",
  "eyd/penggunaan-tanda-baca/tanda-garis-miring/": "/tanda-baca/garis-miring",
  "eyd/penggunaan-tanda-baca/tanda-penyingkat-apostrof/": "/tanda-baca/apostrof",
  "eyd/unsur-serapan/": "/serapan",
  "eyd/unsur-serapan/umum/": "/serapan/umum",
  "eyd/unsur-serapan/khusus/": "/serapan/khusus"
};

const GROUPS: GroupConfig[] = [
  {
    key: "pendahuluan",
    title: "Pengantar",
    summary: "Dasar resmi EYD V, kata pengantar, dan surat keputusan penetapan.",
    icon: "book",
    pageLocations: ["eyd/", "eyd/surat-keputusan/"]
  },
  {
    key: "huruf",
    title: "Penggunaan Huruf",
    summary: "Materi inti tentang abjad, vokal, konsonan, huruf kapital, miring, dan tebal.",
    icon: "letters",
    route: "/huruf",
    pageLocations: [
      "eyd/penggunaan-huruf/",
      "eyd/penggunaan-huruf/huruf-abjad/",
      "eyd/penggunaan-huruf/huruf-vokal/",
      "eyd/penggunaan-huruf/huruf-konsonan/",
      "eyd/penggunaan-huruf/gabungan-huruf-vokal/",
      "eyd/penggunaan-huruf/gabungan-huruf-konsonan/",
      "eyd/penggunaan-huruf/huruf-kapital/",
      "eyd/penggunaan-huruf/huruf-miring/",
      "eyd/penggunaan-huruf/huruf-tebal/"
    ]
  },
  {
    key: "kata",
    title: "Penulisan Kata",
    summary: "Aturan penulisan kata dasar, kata turunan, partikel, angka, singkatan, dan bentuk kata lain.",
    icon: "word",
    route: "/kata",
    pageLocations: [
      "eyd/penulisan-kata/",
      "eyd/penulisan-kata/kata-dasar/",
      "eyd/penulisan-kata/kata-turunan/",
      "eyd/penulisan-kata/pemenggalan-kata/",
      "eyd/penulisan-kata/kata-depan/",
      "eyd/penulisan-kata/partikel/",
      "eyd/penulisan-kata/singkatan-dan-akronim/",
      "eyd/penulisan-kata/angka-dan-bilangan/",
      "eyd/penulisan-kata/kata-ganti/",
      "eyd/penulisan-kata/kata-sandang/"
    ]
  },
  {
    key: "tanda-baca",
    title: "Penggunaan Tanda Baca",
    summary: "Panduan pemakaian tanda baca dari titik hingga apostrof beserta contoh penggunaannya.",
    icon: "punctuation",
    route: "/tanda-baca",
    pageLocations: [
      "eyd/penggunaan-tanda-baca/",
      "eyd/penggunaan-tanda-baca/tanda-titik/",
      "eyd/penggunaan-tanda-baca/tanda-koma/",
      "eyd/penggunaan-tanda-baca/tanda-titik-koma/",
      "eyd/penggunaan-tanda-baca/tanda-titik-dua/",
      "eyd/penggunaan-tanda-baca/tanda-hubung/",
      "eyd/penggunaan-tanda-baca/tanda-pisah/",
      "eyd/penggunaan-tanda-baca/tanda-tanya/",
      "eyd/penggunaan-tanda-baca/tanda-seru/",
      "eyd/penggunaan-tanda-baca/tanda-elipsis/",
      "eyd/penggunaan-tanda-baca/tanda-petik/",
      "eyd/penggunaan-tanda-baca/tanda-petik-tunggal/",
      "eyd/penggunaan-tanda-baca/tanda-kurung/",
      "eyd/penggunaan-tanda-baca/tanda-kurung-siku/",
      "eyd/penggunaan-tanda-baca/tanda-garis-miring/",
      "eyd/penggunaan-tanda-baca/tanda-penyingkat-apostrof/"
    ]
  },
  {
    key: "serapan",
    title: "Penulisan Unsur Serapan",
    summary: "Ringkasan kaidah umum dan khusus penyesuaian unsur serapan dalam bahasa Indonesia.",
    icon: "layers",
    route: "/serapan",
    pageLocations: [
      "eyd/unsur-serapan/",
      "eyd/unsur-serapan/umum/",
      "eyd/unsur-serapan/khusus/"
    ]
  }
];

function splitLabel(value: string): { prefix: string | null; label: string } {
  const match = value.trim().match(/^((?:[IVXLCDM]+|\d+[a-z]?|[A-Z]|[a-z])\.)\s+(.*)$/);
  if (!match) {
    return { prefix: null, label: value.trim() };
  }
  return { prefix: match[1], label: match[2].trim() };
}

function compactWhitespace(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function stripLeadingHeading(markdown: string): string {
  return markdown.replace(/^#{1,6}\s+.+\n+/, "");
}

function stripLeadingRules(markdown: string): string {
  return markdown.replace(/^(?:\s*---\s*\n)+/, "");
}

function cleanMarkdown(markdown: string): string {
  const withoutHeading = stripLeadingHeading(markdown);
  const withoutRules = stripLeadingRules(withoutHeading);
  return withoutRules.trim();
}

function buildExcerpt(plainText: string, title: string, fallback: string): string {
  const compact = compactWhitespace(plainText);
  const plainTitle = compactWhitespace(title);
  const withoutTitle = compact.startsWith(plainTitle)
    ? compact.slice(plainTitle.length).trim()
    : compact;
  const excerpt = withoutTitle || fallback;
  if (excerpt.length <= 190) {
    return excerpt;
  }
  return `${excerpt.slice(0, 187).trimEnd()}...`;
}

function toSourcePageLocation(pathname: string): string {
  if (!pathname || pathname === "/") {
    return "";
  }
  return `${pathname.replace(/^\/+/, "").replace(/\/+$/, "")}/`;
}

function groupByPageLocation(records: RawRecord[]): Map<string, RawRecord[]> {
  const map = new Map<string, RawRecord[]>();
  for (const record of records) {
    const current = map.get(record.page_location) ?? [];
    current.push(record);
    map.set(record.page_location, current);
  }
  return map;
}

function compareRecords(a: RawRecord, b: RawRecord): number {
  if (a.anchor === null && b.anchor !== null) {
    return -1;
  }
  if (a.anchor !== null && b.anchor === null) {
    return 1;
  }
  return a.id.localeCompare(b.id, "id");
}

const pagesInDataset = [...new Set(RECORDS.map((record) => record.page_location))].sort();
const mappedPages = Object.keys(PAGE_ROUTE_MAP).sort();
const missingFromMap = pagesInDataset.filter((page) => !(page in PAGE_ROUTE_MAP));
const extraInMap = mappedPages.filter((page) => !pagesInDataset.includes(page));

if (missingFromMap.length > 0 || extraInMap.length > 0) {
  throw new Error(
    `Route map mismatch. Missing: ${missingFromMap.join(", ") || "none"} | Extra: ${
      extraInMap.join(", ") || "none"
    }`
  );
}

const recordsByPage = groupByPageLocation(RECORDS);

const routeEntries: RouteEntry[] = GROUPS.flatMap((group) =>
  group.pageLocations.map((pageLocation, index) => {
    const rootRecord = (recordsByPage.get(pageLocation) ?? []).find((record) => record.anchor === null);
    const sourceTitle = rootRecord?.title ?? group.title;
    const split = splitLabel(sourceTitle);

    return {
      groupKey: group.key,
      groupTitle: group.title,
      groupSummary: group.summary,
      icon: group.icon,
      route: PAGE_ROUTE_MAP[pageLocation],
      pageLocation,
      label: split.label,
      fullLabel: sourceTitle,
      prefix: split.prefix,
      description: buildExcerpt(
        rootRecord?.plain_text ?? "",
        sourceTitle,
        group.summary
      ),
      isOverview: Boolean(group.route) && index === 0
    };
  })
);

const routeEntryByRoute = new Map(routeEntries.map((entry) => [entry.route, entry]));
const pageLocationToRoute = new Map(Object.entries(PAGE_ROUTE_MAP));
const routeToPageLocation = new Map(routeEntries.map((entry) => [entry.route, entry.pageLocation]));

function buildNavLink(entry: RouteEntry): NavLink {
  return {
    route: entry.route,
    label: entry.label,
    fullLabel: entry.fullLabel,
    prefix: entry.prefix
  };
}

export const navGroups: NavGroup[] = GROUPS.map((group) => {
  const groupEntries = routeEntries.filter((entry) => entry.groupKey === group.key);
  const overview = group.route ? buildNavLink(groupEntries[0]) : null;
  const items = group.route ? groupEntries.slice(1).map(buildNavLink) : groupEntries.map(buildNavLink);

  return {
    key: group.key,
    title: group.title,
    summary: group.summary,
    icon: group.icon,
    overview,
    items
  };
});

const orderedDocLinks = routeEntries.map(buildNavLink);

export const docsIndex = {
  totalRecords: RECORDS.length,
  totalPages: routeEntries.length + 1,
  totalSections: RECORDS.filter((record) => record.anchor !== null).length
};

function buildSection(record: RawRecord): Section {
  const route = pageLocationToRoute.get(record.page_location);
  if (!route || !record.anchor) {
    throw new Error(`Missing route or anchor for record ${record.id}`);
  }
  const split = splitLabel(record.title);

  return {
    id: record.id,
    anchor: record.anchor,
    route,
    href: `${route}#${record.anchor}`,
    title: split.label,
    fullTitle: record.title,
    prefix: split.prefix,
    markdown: cleanMarkdown(record.markdown),
    plainText: compactWhitespace(record.plain_text)
  };
}

const pagesByRoute = new Map<string, DocPage>();

for (const entry of routeEntries) {
  const records = [...(recordsByPage.get(entry.pageLocation) ?? [])].sort(compareRecords);
  const rootRecord = records.find((record) => record.anchor === null);
  const sections = records.filter((record) => record.anchor !== null).map(buildSection);
  const group = navGroups.find((item) => item.key === entry.groupKey);
  const orderedLinks = orderedDocLinks;
  const currentIndex = orderedLinks.findIndex((item) => item.route === entry.route);
  const groupItems = group?.items ?? [];

  pagesByRoute.set(entry.route, {
    route: entry.route,
    pageLocation: entry.pageLocation,
    groupKey: entry.groupKey,
    groupTitle: entry.groupTitle,
    groupSummary: entry.groupSummary,
    icon: entry.icon,
    isOverview: entry.isOverview,
    title: entry.label,
    fullTitle: entry.fullLabel,
    prefix: entry.prefix,
    description: entry.description,
    bodyMarkdown: cleanMarkdown(rootRecord?.markdown ?? `# ${entry.label}`),
    sections,
    overviewLinks: entry.isOverview ? groupItems : groupItems.slice(0, 6),
    siblingLinks: entry.isOverview
      ? groupItems
      : groupItems.filter((item) => item.route !== entry.route),
    prev: currentIndex > 0 ? orderedLinks[currentIndex - 1] : null,
    next: currentIndex < orderedLinks.length - 1 ? orderedLinks[currentIndex + 1] : null
  });
}

export const searchEntries: SearchEntry[] = RECORDS.map((record) => {
  const route = pageLocationToRoute.get(record.page_location);
  if (!route) {
    throw new Error(`No route mapped for ${record.page_location}`);
  }

  const split = splitLabel(record.title);
  const page = pagesByRoute.get(route);
  const category = page?.groupTitle ?? "EYD V";
  const pageTitle = page?.title ?? split.label;
  const excerpt = buildExcerpt(record.plain_text, record.title, page?.description ?? category);

  return {
    id: record.id,
    title: split.label,
    fullTitle: record.title,
    route,
    href: record.anchor ? `${route}#${record.anchor}` : route,
    anchor: record.anchor,
    excerpt,
    category,
    pageTitle,
    keywords: `${split.label} ${pageTitle} ${category} ${excerpt}`.toLowerCase()
  };
});

export const homeGroups = navGroups.filter((group) => group.key !== "pendahuluan").map((group) => ({
  ...group,
  totalTopics: group.items.length,
  totalSections: group.items.reduce((count, item) => {
    const page = pagesByRoute.get(item.route);
    return count + (page?.sections.length ?? 0);
  }, 0)
}));

export function getDocPage(route: string): DocPage | null {
  return pagesByRoute.get(route) ?? null;
}

export function getDocRoutes(): string[] {
  return routeEntries.map((entry) => entry.route);
}

export function getCategoryRoutes(prefix: "/huruf" | "/kata" | "/tanda-baca" | "/serapan"): string[] {
  return routeEntries
    .filter((entry) => entry.route.startsWith(`${prefix}/`))
    .map((entry) => entry.route);
}

export function getRouteForPageLocation(pageLocation: string): string | null {
  return pageLocationToRoute.get(pageLocation) ?? null;
}

export function getSourcePageLocationForRoute(route: string): string | null {
  return routeToPageLocation.get(route) ?? null;
}

export function resolveContentHref(href: string): string {
  if (!href || href.startsWith("#")) {
    return href;
  }

  try {
    const url = new URL(href, "https://ejaan.kemendikdasmen.go.id");
    if (url.origin !== "https://ejaan.kemendikdasmen.go.id") {
      return href;
    }

    const targetPageLocation = toSourcePageLocation(url.pathname);
    const route = pageLocationToRoute.get(targetPageLocation);

    if (!route) {
      return href.startsWith("http") ? href : url.toString();
    }

    return `${route}${url.hash}`;
  } catch {
    return href;
  }
}

export function getGroupForRoute(route: string): NavGroup | null {
  const entry = routeEntryByRoute.get(route);
  if (!entry) {
    return null;
  }
  return navGroups.find((group) => group.key === entry.groupKey) ?? null;
}

export function getPageBySourcePath(path: string): DocPage | null {
  const route = pageLocationToRoute.get(path);
  if (!route) {
    return null;
  }
  return getDocPage(route);
}
