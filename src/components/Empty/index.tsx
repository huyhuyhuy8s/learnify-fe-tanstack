import classnames from "classnames";
import type {
  TEmptyProps,
  TEmptyHeaderProps,
  TEmptyMediaProps,
  TEmptyTitleProps,
  TEmptyDescriptionProps,
  TEmptyContentProps,
} from "./type";
import "./style.scss";

const Empty = ({ className, children, ...props }: TEmptyProps) => {
  return (
    <div
      data-slot="empty"
      className={classnames("empty", className)}
      {...props}
    >
      {children}
    </div>
  );
};

const EmptyHeader = ({ className, children, ...props }: TEmptyHeaderProps) => {
  return (
    <header
      data-slot="empty-header"
      className={classnames("empty__header", className)}
      {...props}
    >
      {children}
    </header>
  );
};

const EmptyMedia = ({
  className,
  variant = "default",
  children,
  ...props
}: TEmptyMediaProps) => {
  return (
    <div
      data-slot="empty-media"
      data-variant={variant}
      className={classnames("empty__media-wrapper", className)}
    >
      {variant === "icon" && (
        <>
          <div
            className="empty__media empty__media--decorator empty__media--decorator-left"
            aria-hidden="true"
          />
          <div
            className="empty__media empty__media--decorator empty__media--decorator-right"
            aria-hidden="true"
          />
        </>
      )}
      <div className="empty__media" data-variant={variant} {...props}>
        {children}
      </div>
    </div>
  );
};

const EmptyTitle = ({ className, children, ...props }: TEmptyTitleProps) => {
  return (
    <h2
      data-slot="empty-title"
      className={classnames("empty__title semibold beauty", className)}
      {...props}
    >
      {children}
    </h2>
  );
};

const EmptyDescription = ({
  className,
  children,
  ...props
}: TEmptyDescriptionProps) => {
  return (
    <h6
      data-slot="empty-description"
      className={classnames("empty__description", className)}
      {...props}
    >
      {children}
    </h6>
  );
};

const EmptyContent = ({
  className,
  children,
  ...props
}: TEmptyContentProps) => {
  return (
    <div
      data-slot="empty-content"
      className={classnames("empty__content", className)}
      {...props}
    >
      {children}
    </div>
  );
};

Empty.Header = EmptyHeader;
Empty.Media = EmptyMedia;
Empty.Title = EmptyTitle;
Empty.Description = EmptyDescription;
Empty.Content = EmptyContent;

export default Empty;
