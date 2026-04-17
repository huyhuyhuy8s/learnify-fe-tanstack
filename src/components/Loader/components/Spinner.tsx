import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Spinner = () => {
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
  });

  return (
    <>
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
    </>
  );
};

export default Spinner;
