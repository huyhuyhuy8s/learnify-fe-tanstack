import trim from "lodash/trim";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import Icon from "@/components/Icon";
import "./style.scss";

type TSearchProps = {
  style?: React.CSSProperties;
  placeholder?: string;
  onSearch?: (query: string) => void;
};

const Search = (props: TSearchProps) => {
  const { t } = useTranslation();
  const { style, onSearch } = props;
  const placeholder = props.placeholder ?? t("search.placeholder");
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
      aria-label={t("search.aria_label")}
      className="search"
      style={style}
      onSubmit={handleSubmit}
    >
      <label htmlFor="search" className="sr-only">
        {t("search.label")}
      </label>
      <input type="text" placeholder={placeholder} id="search" name="q" />
      <button type="submit" aria-label={t("search.submit_aria")}>
        <Icon name="search" size={30} />
      </button>
    </form>
  );
};

export default Search;
