import Logo from "./components/Logo";
import ScreenLoader from "./components/ScreenLoader";
import "./style.scss";

type TLoaderProps = {
  disabled?: boolean;
};

const Loader = (props: TLoaderProps) => {
  const { disabled = false } = props;

  if (disabled) return null;

  return (
    <section className="loader-container">
      <ScreenLoader />
      <Logo />
    </section>
  );
};

export default Loader;
