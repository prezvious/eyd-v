# EYD V Learning Website

Static Next.js website for studying **Ejaan Bahasa Indonesia Edisi Kelima (EYD V)**.

GitHub repository: [prezvious/eyd-v](https://github.com/prezvious/eyd-v)

## Stack

- Next.js App Router
- Static export (`out/`)
- TypeScript
- Local content source from `sections.json`

## Content Source

- `sections.json` is the runtime source of truth.
- `sections/` stays in the project as the extracted Markdown archive.
- `public/content-assets/` contains localized copies of the small set of referenced content images.

## Main Routes

- `/`
- `/pengantar`
- `/surat-keputusan`
- `/huruf` and `/huruf/[topik]`
- `/kata` and `/kata/[topik]`
- `/tanda-baca` and `/tanda-baca/[topik]`
- `/serapan` and `/serapan/[topik]`

## Design Notes

- Light-first editorial layout
- Clean docs-style navigation
- Local client-side search
- SVG-only UI icons
- Favicon from `icon/flag-indonesia.svg`
- Visible GitHub link in the site UI for quick access to the source repository

## Commands

```bash
npm install
npm run dev
npm run build
npm run start
```

## Output

- Production static export: `out/`
