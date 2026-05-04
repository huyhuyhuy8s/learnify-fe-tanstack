import classnames from "classnames";
import "./style.scss";

type TTetrisLoaderProps = {
  className?: string;
  size?: "small" | "medium" | "large";
};

const TetrisLoader = ({ className, size = "medium" }: TTetrisLoaderProps) => {
  const cls = classnames("tetris-loader", `size-${size}`, className);

  return (
    <div className={cls}>
      <div className="tetris-loader-row">
        <div className="block block-1" />
        <div className="block block-2" />
        <div className="block block-3" />
        <div className="block block-4" />
      </div>
    </div>
  );
};

export default TetrisLoader;
