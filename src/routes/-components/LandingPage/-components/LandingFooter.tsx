import "./LandingFooter.scss";

export default function LandingFooter() {
  return (
    <footer className="landing-footer">
      <p>&copy; {new Date().getFullYear()} Learnify.</p>
    </footer>
  );
}
