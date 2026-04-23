import "./style.scss";
import { useNavigate } from "@tanstack/react-router";
import _ from "lodash";

type TSearchProps = {
  style?: React.CSSProperties;
  placeholder?: string;
  onSearch?: (query: string) => void;
};

const Search = (props: TSearchProps) => {
  const { style, placeholder = "Search for courses...", onSearch } = props;
  const navigate = useNavigate();

  const handleSubmit: React.EventHandler<
    React.SyntheticEvent<HTMLFormElement>
  > = (e) => {
    e.preventDefault();
    const query = _.trim(new FormData(e.currentTarget).get("q") as string);
    if (!query) return;

    if (onSearch) onSearch(query);
    else navigate({ to: "/learner/search", search: { q: query } });
  };

  return (
    <form
      aria-label="Search"
      className="search"
      style={style}
      onSubmit={handleSubmit}
    >
      <input type="text" placeholder={placeholder} id="search" name="q" />
      <button type="submit">
        <span className="material-symbols-rounded">search</span>
      </button>
    </form>
  );
};

export default Search;
