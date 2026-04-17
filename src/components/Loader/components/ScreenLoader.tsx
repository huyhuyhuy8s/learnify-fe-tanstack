import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ScreenLoader = () => {
  const loaderContainerContentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
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
          "50%": {
            clipPath: "polygon(0% 0%, 70% 0%, 70% 0%, 0% 100%, 0% 100%)",
          },
          "60%": { clipPath: "polygon(0% 0%, 49% 0%, 49% 0%, 0% 80%, 0% 80%)" },
          "80%": { clipPath: "polygon(0% 0%, 20% 0%, 20% 0%, 0% 40%, 0% 40%)" },
          "100%": { clipPath: "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%)" },
          easeEach: "none",
        },
        duration: 1.5,
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
                clipPath:
                  "polygon(0% 0%, 100% 0%, 100% 20%, 50% 100%, 0% 100%)",
              },
              "30%": {
                clipPath:
                  "polygon(0% 0%, 100% 0%, 100% 0%, 38.5% 100%, 0% 100%)",
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
              "100%": {
                clipPath: "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%)",
              },
              easeEach: "none",
            },
            duration: 1.5,
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
                clipPath:
                  "polygon(0% 0%, 100% 0%, 100% 20%, 50% 100%, 0% 100%)",
              },
              "30%": {
                clipPath:
                  "polygon(0% 0%, 100% 0%, 100% 0%, 38.5% 100%, 0% 100%)",
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
              "100%": {
                clipPath: "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%)",
              },
              easeEach: "none",
            },
            duration: 1.5,
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
                clipPath:
                  "polygon(0% 0%, 100% 0%, 100% 20%, 50% 100%, 0% 100%)",
              },
              "30%": {
                clipPath:
                  "polygon(0% 0%, 100% 0%, 100% 0%, 38.5% 100%, 0% 100%)",
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
              "100%": {
                clipPath: "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%)",
              },
              easeEach: "none",
            },
            duration: 1.5,
            ease: "hop",
          },
          "-=0.5"
        );
    },
    { scope: loaderContainerContentRef }
  );

  return (
    <div className="loader-container-content" ref={loaderContainerContentRef}>
      <div className="loader-1"></div>
      <div className="loader-2"></div>
      <div className="loader-3"></div>
      <div className="loader-4"></div>
    </div>
  );
};

export default ScreenLoader;
