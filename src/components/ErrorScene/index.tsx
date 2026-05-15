import classnames from "classnames";
import type {
  TErrorSceneProps,
  TErrorSceneHeaderProps,
  TErrorSceneMediaProps,
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

const ErrorSceneCode = ({
  className,
  errorCode,
  children,
  ...props
}: TErrorSceneMediaProps) => {
  return (
    <div className={classnames("error-scene__media-wrapper", className)}>
      <h1 className="error-scene__media black" {...props}>
        {errorCode}
      </h1>
      {children}
    </div>
  );
};

const ErrorSceneTitle = ({
  className,
  children,
  ...props
}: TErrorSceneTitleProps) => {
  return (
    <h2
      data-slot="error-scene-title"
      className={classnames("error-scene__title semibold beauty", className)}
      {...props}
    >
      {children}
    </h2>
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
ErrorScene.Code = ErrorSceneCode;
ErrorScene.Title = ErrorSceneTitle;
ErrorScene.Description = ErrorSceneDescription;
ErrorScene.Content = ErrorSceneContent;

export default ErrorScene;
