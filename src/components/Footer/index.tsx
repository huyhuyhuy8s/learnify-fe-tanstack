import { Link } from "@tanstack/react-router";
import { OptimizeImage } from "@/components/Images";
import "./style.scss";
import IconButton from "@/components/IconButton";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    gsap.to(window, {
      duration: 0.5,
      scrollTo: { y: 0 },
      ease: "power3.out",
    });
  };

  return (
    <footer>
      <OptimizeImage
        className="footer-banner"
        src="/footer.webp"
        alt="footer-banner"
      />
      <div className="footer-content">
        <div className="item item-1">
          <h1 className="bold">Learnify</h1>
          <p>
            Made by{" "}
            <a href="https://tanstack.com/start/latest">Tanstack Start</a>
          </p>
        </div>
        <div className="item item-2">
          <div className="navigation">
            <h6>Navigation</h6>
            <div className="navigation-context">
              <h6>
                <Link to="/learner/courses">Courses</Link>
              </h6>
              <h6>
                <Link to="/learner/roadmaps">Roadmaps</Link>
              </h6>
              <h6>
                <Link to="/learner/friends">Friends</Link>
              </h6>
              <h6>
                <Link to="/learner/about">About</Link>
              </h6>
            </div>
          </div>
          <p>&copy;{currentYear} Learnify. All right reserved.</p>
        </div>
        <div className="item item-3">
          <div className="socials">
            <h6>Socials</h6>
            <div className="socials-context">
              <h6>
                {" "}
                <a href="/">IG</a>{" "}
              </h6>
              <h6>
                {" "}
                <a href="/">DR</a>{" "}
              </h6>
              <h6>
                {" "}
                <a href="/">FB</a>{" "}
              </h6>
              <h6>
                {" "}
                <a href="/">X</a>{" "}
              </h6>
            </div>
          </div>
          <a href="/">Privacy Policy</a>
        </div>
        <IconButton
          icon="arrow_upward"
          specialIcon="arrow_upward"
          onClick={scrollToTop}
        />
      </div>
    </footer>
  );
};

export default Footer;
