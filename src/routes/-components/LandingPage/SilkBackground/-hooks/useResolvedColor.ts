import { useEffect, useMemo, useState } from "react";

function resolveColor(input: string): string {
  if (!input.startsWith("var(")) return input;
  const match = input.match(/var\(--([^)]+)\)/);
  if (!match) return input;
  const varName = `--${match[1]}`;
  if (typeof document === "undefined") return "#b6c3b8";
  return (
    getComputedStyle(document.documentElement)
      .getPropertyValue(varName)
      .trim() || "#b6c3b8"
  );
}

export function useResolvedColor(color: string): string {
  const [version, setVersion] = useState(0);

  const resolved = useMemo(
    () => resolveColor(color),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [color, version]
  );

  useEffect(() => {
    if (!color.startsWith("var(")) return;
    const observer = new MutationObserver(() => {
      setVersion((v) => v + 1);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, [color]);

  return resolved;
}
