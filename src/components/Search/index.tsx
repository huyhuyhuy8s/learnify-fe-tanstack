import "./style.scss";
import { useNavigate } from "@tanstack/react-router";
import trim from "lodash/trim";
import Icon from "@/components/Icon";

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
    const query = trim(new FormData(e.currentTarget).get("q") as string);
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
      <button type="submit" aria-label="Search">
        <Icon name="search" size={30} />
      </button>
    </form>
  );
};

export default Search;
