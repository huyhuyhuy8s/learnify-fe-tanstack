import "./style.scss";

type TReviewerHeaderProps = {
  title?: string;
  onSearch?: (query: string) => void;
  onFilter?: () => void;
};

const ReviewerHeader = ({
  title = "Pending Course Reviews",
  onSearch,
  onFilter,
}: TReviewerHeaderProps) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch?.(e.target.value);
  };

  return (
    <header className="reviewer-header">
      <h1 className="reviewer-header__title">{title}</h1>

      <div className="reviewer-header__toolbar">
        <div className="reviewer-header__search-wrapper">
          <input
            id="reviewer-search"
            type="text"
            className="reviewer-header__search-input"
            placeholder="Search courses or instructors..."
            onChange={handleSearchChange}
            aria-label="Search courses or instructors"
          />
        </div>

        <button
          id="reviewer-filter-btn"
          type="button"
          className="reviewer-header__filter-btn"
          onClick={onFilter}
          aria-label="Open filter panel"
        >
          Filter
        </button>
      </div>
    </header>
  );
};

export default ReviewerHeader;
