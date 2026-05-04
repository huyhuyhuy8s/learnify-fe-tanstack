import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { GoogleOAuthProvider } from "@react-oauth/google";
import * as React from "react";
import { useEffect } from "react";
import DefaultCatchBoundary from "@/components/DefaultCatchBoundary";
import NotFound from "@/components/NotFound";
import { seo } from "@/utils/seo";
import "@styles/_global.scss";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";
import { useTheme } from "@/hooks/useTheme";
import type { RouterContext } from "@/router";
import Loader from "@/components/Loader";
import { useAuthStore } from "@/store/authStore";
import "./root.scss";
import "@styles/_global.scss";

gsap.registerPlugin(SplitText, CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");
CustomEase.create("glide", "0.8, 0, 0.2, 1");

const STORAGE_KEY = "auth-storage";

export const Route = createRootRouteWithContext<RouterContext>()({
  loader: ({ context }) => {
    const cookies =
      (context as { request?: Request }).request?.headers?.get("cookie") || "";
    const authCookie = cookies
      .split(";")
      .find((c: string) => c.trim().startsWith(`${STORAGE_KEY}=`));

    console.log("cookies", cookies);
    console.log("authCookie", authCookie);
    if (authCookie) {
      try {
        const cookieValue = authCookie.split("=")[1];
        if (cookieValue) {
          const value = decodeURIComponent(cookieValue);
          const parsed = JSON.parse(value);
          if (parsed.user) {
            return {
              auth: {
                user: parsed.user,
                isAuthenticated: true,
              },
            };
          }
        }
      } catch {
        throw new Error("Invalid cookie");
      }
    }
    return { auth: null };
  },
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
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
      { rel: "stylesheet" },
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
  pendingComponent: () => (
    <RootDocument>
      <Loader />
    </RootDocument>
  ),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
});

function RootComponent() {
  useTheme();
  const setHydrated = useAuthStore((state) => state.setHydrated);

  useEffect(() => {
    setHydrated(true);
  }, [setHydrated]);

  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <GoogleOAuthProvider clientId={googleClientId}>
          {children}
          <div style={{ position: "absolute" }}>
            <TanStackRouterDevtools position="bottom-right" />
            <ReactQueryDevtools buttonPosition="bottom-left" />
            <Scripts />
          </div>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
