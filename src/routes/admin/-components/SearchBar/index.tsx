import Icon from "@/components/Icon";
import "./style.scss";

type TSearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const SearchBar = ({
  value,
  onChange,
  placeholder = "Search by name, email or role...",
}: TSearchBarProps) => {
  return (
    <div className="admin-search-bar">
      <span className="admin-search-bar__icon" aria-hidden="true">
        <Icon name="search" size={18} />
      </span>
      <input
        id="admin-user-search"
        type="text"
        className="admin-search-bar__input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search users"
      />
      {value && (
        <button
          type="button"
          id="admin-search-clear-btn"
          className="admin-search-bar__clear-btn"
          aria-label="Clear search"
          onClick={() => onChange("")}
        >
          <Icon name="close" size={16} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
