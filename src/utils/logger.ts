const isDev = import.meta.env.DEV;

export const logger = {
  info: (...args: unknown[]) => {
    if (isDev) console.info("[learnify]", ...args);
  },
  error: (...args: unknown[]) => console.error("[learnify]", ...args),
  warn: (...args: unknown[]) => console.warn("[learnify]", ...args),
  debug: (...args: unknown[]) => {
    if (isDev) console.debug("[learnify]", ...args);
  },
};
