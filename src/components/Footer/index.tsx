import { Link } from "@tanstack/react-router";
import { OptimizeImage } from "@/components/Images";
import "./style.scss";
import IconButton from "@/components/IconButton";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer>
      <OptimizeImage
        className="footer-banner"
        src="/footer.webp"
        alt="footer-banner"
        priority
      />
      <div className="footer-content">
        <div className="item item-1">
          <h2 className="bold">Learnify</h2>
          <p>
            Made by{" "}
            <a href="https://tanstack.com/start/latest">Tanstack Start</a>
          </p>
        </div>
        <div className="item item-2">
          <div className="navigation">
            <p className="footer-section-label">Navigation</p>
            <div className="navigation-context">
              <Link to="/learner/courses">Courses</Link>
              <Link to="/learner/roadmaps">Roadmaps</Link>
              <Link to="/learner/friends">Friends</Link>
              <Link to="/learner/about">About</Link>
            </div>
          </div>
          <p>&copy;{currentYear} Learnify. All right reserved.</p>
        </div>
        <div className="item item-3">
          <div className="socials">
            <p className="footer-section-label">Socials</p>
            <div className="socials-context">
              <a href="/">IG</a>
              <a href="/">DR</a>
              <a href="/">FB</a>
              <a href="/">X</a>
            </div>
          </div>
          <a href="/">Privacy Policy</a>
        </div>
        <IconButton
          icon="arrow_upward"
          specialIcon="arrow_upward"
          ariaLabel="Scroll to top"
          onClick={scrollToTop}
        />
      </div>
    </footer>
  );
};

export default Footer;
