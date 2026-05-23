import DefaultCatchBoundary from "@/components/DefaultCatchBoundary";
import Loader from "@/components/Loader";
import NotFound from "@/components/NotFound";
import { LayoutProvider } from "@/contexts/LayoutContext";
import { useTheme } from "@/hooks/useTheme";
import { initI18n } from "@/i18n";
import type { RouterContext } from "@/router";
import { getCurrentUserFn, getServerCookiesFn } from "@/server/auth";
import { useAuthStore } from "@/store/authStore";
import { seo } from "@/utils/seo";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "@styles/_global.scss";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";
import * as React from "react";
import { Suspense, lazy, useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import "./root.scss";

gsap.registerPlugin(SplitText, CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");
CustomEase.create("glide", "0.8, 0, 0.2, 1");

const DevTools = import.meta.env.DEV
  ? lazy(() => import("@/components/DevTools"))
  : () => null;

const Root = createRootRouteWithContext<RouterContext>()({
  loader: async () => {
    const cookies = await getServerCookiesFn();
    if (cookies.language) initI18n(cookies.language);
    const { user, expired } = await getCurrentUserFn();
    return {
      auth: { user, isAuthenticated: !!user, expired },
      theme: cookies.theme,
    };
  },
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
        lang: "en-US",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      ...seo({
        title: "Learnify | Smart learning. Real skills. Ready careers.",
        description:
          "Learnify is an educational platform that highlights the future and craft of learning—from foundational concepts to hands-on practice to career-ready mastery. By showcasing the innovative technology and the 3D AI Lecturers behind our courses, we hope to demystify how modern education is built and deepen your connection with your own potential. Our approach begins with curiosity: we want to give you a window into the way interactive learning actually works.",
      }),
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      { rel: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.svg",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.svg",
      },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  notFoundComponent: () => (
    <RootDocument>
      <NotFound />
    </RootDocument>
  ),
  component: RootComponent,
});

function RootComponent() {
  useTheme();
  const setAuth = useAuthStore((state) => state.setAuth);
  const { auth } = Root.useLoaderData();
  const [phase1Done, setPhase1Done] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [phase2Done, setPhase2Done] = useState(false);
  const [showApp, setShowApp] = useState(false);

  const phase2Ready = phase1Done && pageLoaded;

  useEffect(() => {
    if (auth.expired) {
      import("@/i18n").then(({ default: i18nInstance }) =>
        toast.error(i18nInstance.t("errors.session_expired"))
      );
    }
    setAuth(
      auth.user
        ? { ...auth.user, subscription: auth.user.subscription || "Starter" }
        : null
    );
  }, [setAuth, auth]);

  useEffect(() => {
    const onLoad = () => setPageLoaded(true);
    window.addEventListener("load", onLoad);
    if (document.readyState === "complete") setTimeout(onLoad, 0);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  useEffect(() => {
    if (!phase2Done) return;
    const timer = setTimeout(() => setShowApp(true), 600);
    return () => clearTimeout(timer);
  }, [phase2Done]);

  return (
    <RootDocument>
      <Outlet />
      {!showApp && (
        <Loader
          onPhase1Complete={() => setPhase1Done(true)}
          ready={phase2Ready}
          onPhase2Complete={() => setPhase2Done(true)}
          disabled={import.meta.env.DEV}
        />
      )}
    </RootDocument>
  );
}

export const Route = Root;

function RootDocument({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme?: string;
}) {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";
  const [lang, setLang] = useState(() => {
    if (typeof document !== "undefined") {
      const match = document.cookie.match(/(?:^|;\s*)app-language=([^;]*)/);
      return match?.[1] || "en";
    }
    return "en";
  });

  useEffect(() => {
    import("@/i18n").then(({ default: i18nInstance }) => {
      setLang(i18nInstance.language);
      i18nInstance.on("languageChanged", setLang);
    });
  }, []);

  return (
    <html lang={lang} data-theme={theme || "light"} suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <GoogleOAuthProvider clientId={googleClientId}>
          <LayoutProvider>
            <main>{children}</main>
          </LayoutProvider>
          <Suspense fallback={null}>
            <DevTools />
          </Suspense>
          <Toaster position="bottom-right" richColors />
          <Scripts />
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
