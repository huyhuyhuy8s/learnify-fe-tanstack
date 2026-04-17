import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import Spinner from "./Spinner";

const Logo = () => {
  const logoDivRef = useRef<HTMLDivElement>(null);

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
      const tl = gsap.timeline({
        delay: 3.525,
      });
      tl.to(logoDivRef.current, {
        opacity: 0,
        duration: 1.5,
        ease: "hop",
      }).to(logoDivRef.current, {
        visibility: "hidden",
      });
    },
    { scope: logoDivRef }
  );

  return (
    <div className="logo" ref={logoDivRef}>
      <h2 className="black">Learnify</h2>
      <Spinner />
    </div>
  );
};

export default Logo;
