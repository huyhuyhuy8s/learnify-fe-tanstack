import Logo from "./components/Logo";
import ScreenLoader from "./components/ScreenLoader";
import "./style.scss";

const Loader = () => {
  return (
    <section className="loader-container">
      <ScreenLoader />
      <Logo />
    </section>
  );
};

export default Loader;
