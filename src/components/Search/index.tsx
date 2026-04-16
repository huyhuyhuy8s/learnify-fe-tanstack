import "./style.scss";

type TSearchProps = {
  style?: React.CSSProperties;
  placeholder?: string;
};

const Search = (props: TSearchProps) => {
  const { style, placeholder = "Search for courses..." } = props;

  return (
    <form aria-checked className="search" style={style}>
      <input type="text" placeholder={placeholder} id="search" />
      <button>
        <span className="material-symbols-rounded">search</span>
      </button>
    </form>
  );
};

export default Search;
