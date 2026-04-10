import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

function baseProps(props: IconProps) {
  const { size = 20, ...rest } = props;
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    ...rest
  };
}

export function SearchIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="m6 6 12 12" />
      <path d="m18 6-12 12" />
    </svg>
  );
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M19 12H5" />
      <path d="m11 18-6-6 6-6" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function ExternalIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M14 5h5v5" />
      <path d="m10 14 9-9" />
      <path d="M19 13v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4" />
    </svg>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

export function BookIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M6.5 5.5h11a1.5 1.5 0 0 1 1.5 1.5v10.5a1 1 0 0 1-1 1H7a3 3 0 0 0-3 3V8.5a3 3 0 0 1 2.5-3Z" />
      <path d="M7 18.5h12" />
      <path d="M7 5.5v13" />
    </svg>
  );
}

export function LettersIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="m7 17 3.5-10h1L15 17" />
      <path d="M8.2 13.5h5.6" />
      <path d="M18 8v9" />
      <path d="M18 8h1.2a2.3 2.3 0 1 1 0 4.6H18" />
    </svg>
  );
}

export function WordIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M4 7h16" />
      <path d="M4 12h9" />
      <path d="M4 17h13" />
      <path d="m17 13 3 4 3-4" transform="translate(-3 0)" />
    </svg>
  );
}

export function PunctuationIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M8 7.5a2 2 0 1 1 4 0c0 1.9-2 2.4-2 4.5" />
      <circle cx="10" cy="18" r="1" fill="currentColor" stroke="none" />
      <path d="M16.5 8v6" />
      <circle cx="16.5" cy="18" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LayersIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="m12 4 8 4-8 4-8-4 8-4Z" />
      <path d="m4 12 8 4 8-4" />
      <path d="m4 16 8 4 8-4" />
    </svg>
  );
}

export function FlagIcon(props: IconProps) {
  const { size = 20, ...rest } = props;
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      {...rest}
    >
      <rect fill="#D0202A" height="14" rx="5" width="20" x="2" y="5" />
      <path d="M2 12h20v2a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5v-2Z" fill="#F8F4EE" />
    </svg>
  );
}

export function GitHubIcon(props: IconProps) {
  const { size = 20, ...rest } = props;
  return (
    <svg
      aria-hidden="true"
      fill="currentColor"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      {...rest}
    >
      <path d="M12 .75A11.25 11.25 0 0 0 .75 12a11.25 11.25 0 0 0 7.69 10.68c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.8-1.33-3.8-1.33-.5-1.28-1.24-1.62-1.24-1.62-1.01-.7.08-.69.08-.69 1.11.08 1.7 1.14 1.7 1.14 1 .17.76 2.62 3.27 1.86.1-.72.39-1.21.7-1.49-2.5-.28-5.12-1.24-5.12-5.56 0-1.23.44-2.24 1.15-3.03-.11-.29-.5-1.43.11-2.98 0 0 .95-.3 3.11 1.16A10.8 10.8 0 0 1 12 6.54c.95 0 1.92.13 2.82.38 2.16-1.46 3.1-1.16 3.1-1.16.62 1.55.23 2.69.12 2.98.71.79 1.14 1.8 1.14 3.03 0 4.33-2.63 5.27-5.14 5.55.4.35.76 1.02.76 2.07v3.07c0 .3.2.65.78.54A11.25 11.25 0 0 0 23.25 12 11.25 11.25 0 0 0 12 .75Z" />
    </svg>
  );
}

export function getGroupIcon(name: "book" | "letters" | "word" | "punctuation" | "layers") {
  switch (name) {
    case "book":
      return BookIcon;
    case "letters":
      return LettersIcon;
    case "word":
      return WordIcon;
    case "punctuation":
      return PunctuationIcon;
    case "layers":
      return LayersIcon;
    default:
      return BookIcon;
  }
}
