import React, { useMemo, useState, lazy, Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  prepare,
  layout,
  walkLineRanges,
  prepareWithSegments,
} from "@chenglou/pretext";
import { ABOUT_STATS, ABOUT_VALUES } from "@/mock/about";

const TeamImage = lazy(() => import("@/components/TeamImage/index.tsx"));

type DynamicTextParams = {
  text: string;
};

const DynamicTextContent = ({ text }: DynamicTextParams) => {
  const font = "16px Inter, sans-serif";
  const lineHeight = 24; // 24px line-height

  const prepared = useMemo(() => {
    return prepareWithSegments(text, font);
  }, [text]);

  const [maxW, setMaxW] = useState(0);
  walkLineRanges(prepared, 600, (line) => {
    if (line.width > maxW) setMaxW(line.width);
  });
  const { height, lineCount } = useMemo(() => {
    return layout(prepared, maxW, lineHeight);
  }, [prepared, maxW, lineHeight]);

  return (
    <div
      style={{
        width: `${maxW}px`,
        border: "1px solid #ccc",
        padding: "16px",
        textAlign: "justify",
      }}
    >
      <p style={{ margin: 0, font, lineHeight: `${lineHeight}px` }}>{text}</p>

      <div
        style={{
          marginTop: "12px",
          fontSize: "12px",
          color: "#666",
          textAlign: "justify",
        }}
      >
        Pretext measured: {height}px tall over {lineCount} lines.
      </div>
    </div>
  );
};

export default DynamicTextContent;

export const Route = createFileRoute("/learner/about/")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <DynamicTextContent text="lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
    </>
  );
}
