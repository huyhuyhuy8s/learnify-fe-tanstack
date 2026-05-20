import "./PageSkeleton.scss";

export const PageSkeleton = () => {
  return (
    <div className="page-skeleton">
      <div className="page-skeleton__header" />
      <div className="page-skeleton__content">
        <div className="page-skeleton__title" />
        <div className="page-skeleton__grid">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="page-skeleton__card">
              <div className="page-skeleton__card-image" />
              <div className="page-skeleton__card-line page-skeleton__card-line--long" />
              <div className="page-skeleton__card-line page-skeleton__card-line--medium" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
