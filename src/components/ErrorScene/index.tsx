import classnames from "classnames";
import type {
  TErrorSceneProps,
  TErrorSceneHeaderProps,
  TErrorSceneTitleProps,
  TErrorSceneDescriptionProps,
  TErrorSceneContentProps,
} from "./type";
import "./style.scss";

const ErrorScene = ({ className, children, ...props }: TErrorSceneProps) => {
  return (
    <div
      data-slot="error-scene"
      className={classnames("error-scene", className)}
      {...props}
    >
      {children}
    </div>
  );
};

const ErrorSceneHeader = ({
  className,
  children,
  ...props
}: TErrorSceneHeaderProps) => {
  return (
    <header
      data-slot="error-scene-header"
      className={classnames("error-scene__header", className)}
      {...props}
    >
      {children}
    </header>
  );
};

const ErrorSceneTitle = ({
  className,
  errorCode,
  children,
  ...props
}: TErrorSceneTitleProps) => {
  return (
    <div className="error-scene-title" data-slot="error-scene-title">
      <h3 className="error-scene__title-code">{errorCode}</h3>
      <h2
        className={classnames(
          "error-scene__title-context semibold beauty",
          className
        )}
        {...props}
      >
        {children}
      </h2>
    </div>
  );
};

const ErrorSceneDescription = ({
  className,
  children,
  ...props
}: TErrorSceneDescriptionProps) => {
  return (
    <h6
      data-slot="error-scene-description"
      className={classnames("error-scene__description", className)}
      {...props}
    >
      {children}
    </h6>
  );
};

const ErrorSceneContent = ({
  className,
  children,
  ...props
}: TErrorSceneContentProps) => {
  return (
    <div
      data-slot="error-scene-content"
      className={classnames("error-scene__content", className)}
      {...props}
    >
      {children}
    </div>
  );
};

ErrorScene.Header = ErrorSceneHeader;
ErrorScene.Title = ErrorSceneTitle;
ErrorScene.Description = ErrorSceneDescription;
ErrorScene.Content = ErrorSceneContent;

export default ErrorScene;
