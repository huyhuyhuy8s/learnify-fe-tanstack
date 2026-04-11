import LeftNav from "@/components/LeftNav";
import TopNav from "@/components/TopNav";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import Footer from "@/components/Footer";
import "./style.scss";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import CustomEase from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(SplitText, CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");
CustomEase.create("glide", "0.8, 0, 0.2, 1");

export const Route = createFileRoute("/learner")({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
        title: "Learnify for Learner",
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const loaderContainer = useRef<HTMLDivElement>(null);
  const logoDiv = useRef<HTMLDivElement>(null);

  gsap.set(".logo h2", {
    y: "100%",
  });

  useGSAP(
    () => {
      new SplitText(".logo h2", {
        type: "chars",
        charsClass: "char",
      });
      gsap.to(".logo h2 .char", {
        y: "0%",
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.1,
      });
    },
    { scope: logoDiv }
  );

  useGSAP(() => {
    const spinnerTL = gsap.timeline({
      repeat: -1,
    });
    spinnerTL
      .to(".spinner-tracker", {
        strokeDashoffset: 750,
        duration: 1.0,
        ease: "hop",
      })
      .to(
        ".loader-container svg",
        {
          rotation: 180,
          duration: 1.0,
          ease: "hop",
        },
        "<"
      )
      .to(".spinner-tracker", {
        strokeDashoffset: 900,
        duration: 1.0,
        ease: "hop",
      })
      .to(
        ".loader-container svg",
        {
          rotation: 360,
          duration: 1.0,
          ease: "hop",
        },
        "<"
      );
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({
      delay: 1.0,
    });
    tl.to(".loader-4", {
      keyframes: {
        "0%": {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%)",
        },
        "20%": {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 20%, 50% 100%, 0% 100%)",
        },
        "30%": {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 38.5% 100%, 0% 100%)",
        },
        "50%": { clipPath: "polygon(0% 0%, 70% 0%, 70% 0%, 0% 100%, 0% 100%)" },
        "60%": { clipPath: "polygon(0% 0%, 49% 0%, 49% 0%, 0% 80%, 0% 80%)" },
        "80%": { clipPath: "polygon(0% 0%, 20% 0%, 20% 0%, 0% 40%, 0% 40%)" },
        "100%": { clipPath: "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%)" },
        easeEach: "none",
      },
      duration: 2.0,
      ease: "hop",
    })
      .to(
        ".loader-3",
        {
          keyframes: {
            "0%": {
              clipPath:
                "polygon(0% 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%)",
            },
            "20%": {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 20%, 50% 100%, 0% 100%)",
            },
            "30%": {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 38.5% 100%, 0% 100%)",
            },
            "50%": {
              clipPath: "polygon(0% 0%, 70% 0%, 70% 0%, 0% 100%, 0% 100%)",
            },
            "60%": {
              clipPath: "polygon(0% 0%, 49% 0%, 49% 0%, 0% 80%, 0% 80%)",
            },
            "80%": {
              clipPath: "polygon(0% 0%, 20% 0%, 20% 0%, 0% 40%, 0% 40%)",
            },
            "100%": { clipPath: "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%)" },
            easeEach: "none",
          },
          duration: 2.0,
          ease: "hop",
        },
        "-=0.5"
      )
      .to(
        ".loader-2",
        {
          keyframes: {
            "0%": {
              clipPath:
                "polygon(0% 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%)",
            },
            "20%": {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 20%, 50% 100%, 0% 100%)",
            },
            "30%": {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 38.5% 100%, 0% 100%)",
            },
            "50%": {
              clipPath: "polygon(0% 0%, 70% 0%, 70% 0%, 0% 100%, 0% 100%)",
            },
            "60%": {
              clipPath: "polygon(0% 0%, 49% 0%, 49% 0%, 0% 80%, 0% 80%)",
            },
            "80%": {
              clipPath: "polygon(0% 0%, 20% 0%, 20% 0%, 0% 40%, 0% 40%)",
            },
            "100%": { clipPath: "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%)" },
            easeEach: "none",
          },
          duration: 2.0,
          ease: "hop",
        },
        "-=0.5"
      )
      .to(
        ".loader-1",
        {
          keyframes: {
            "0%": {
              clipPath:
                "polygon(0% 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%)",
            },
            "20%": {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 20%, 50% 100%, 0% 100%)",
            },
            "30%": {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 38.5% 100%, 0% 100%)",
            },
            "50%": {
              clipPath: "polygon(0% 0%, 70% 0%, 70% 0%, 0% 100%, 0% 100%)",
            },
            "60%": {
              clipPath: "polygon(0% 0%, 49% 0%, 49% 0%, 0% 80%, 0% 80%)",
            },
            "80%": {
              clipPath: "polygon(0% 0%, 20% 0%, 20% 0%, 0% 40%, 0% 40%)",
            },
            "100%": { clipPath: "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%)" },
            easeEach: "none",
          },
          duration: 2.0,
          ease: "hop",
        },
        "-=0.5"
      )
      .to(
        ".logo",
        {
          opacity: 0,
          duration: 2.0,
          ease: "hop",
        },
        "-=1.975"
      );
  }, [loaderContainer]);

  return (
    <>
      <section className="loader-container">
        <div className="loader-1"></div>
        <div className="loader-2"></div>
        <div className="loader-3"></div>
        <div className="loader-4"></div>
        <div className="logo" ref={logoDiv}>
          <h2 className="black">Learnify</h2>
          <svg
            width="50"
            height="50"
            viewBox="0 0 50 50"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="25"
              cy="25"
              r="20"
              className="spinner-tracker"
              fill="none"
              strokeWidth="1"
              strokeDasharray="900"
              strokeDashoffset="900"
            />
          </svg>
          <small>loading...</small>
        </div>
      </section>
      <LeftNav />
      <article className="body">
        <TopNav />
        <div className="inner">
          <div className="content">
            <Outlet />
          </div>
          <Footer />
        </div>
      </article>
    </>
  );
}
