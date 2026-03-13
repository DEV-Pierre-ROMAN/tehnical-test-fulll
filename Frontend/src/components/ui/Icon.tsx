import type { SVGProps } from "react";
import trashSvg from "../../assets/icons/trash-2.svg?raw";
import copySvg from "../../assets/icons/copy.svg?raw";
import squarePenSvg from "../../assets/icons/square-pen.svg?raw";
import squareMinusSvg from "../../assets/icons/square-minus.svg?raw";
import checkSvg from "../../assets/icons/check.svg?raw";
import sunSvg from "../../assets/icons/sun.svg?raw";
import moonSvg from "../../assets/icons/moon.svg?raw";

function extractInnerSvg(raw: string): string {
  return raw.replace(/<svg[^>]*>/, "").replace(/<\/svg>/, "");
}

const icons = {
  trash: extractInnerSvg(trashSvg),
  copy: extractInnerSvg(copySvg),
  squarePen: extractInnerSvg(squarePenSvg),
  squareMinus: extractInnerSvg(squareMinusSvg),
  check: extractInnerSvg(checkSvg),
  sun: extractInnerSvg(sunSvg),
  moon: extractInnerSvg(moonSvg),
} as const;

export type IconName = keyof typeof icons;

type IconProps = {
  name: IconName;
  size?: number;
} & Omit<SVGProps<SVGSVGElement>, "dangerouslySetInnerHTML">;

export function Icon({ name, size = 20, ...svgProps }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...svgProps}
      dangerouslySetInnerHTML={{ __html: icons[name] }}
    />
  );
}
