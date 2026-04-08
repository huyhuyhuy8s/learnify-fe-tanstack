import { Link } from '@tanstack/react-router';

interface TopNavLeftProps {
  pathname: string[];
}

const TopNavLeft = (props: TopNavLeftProps) => {
  const { pathname, ...rest } = props;

  const content = pathname.length >= 2 && (
    <>
      <Link to="/learner">
        <span className="material-symbols-rounded">home</span>
      </Link>
      {pathname.map((item, index) => (
        <>
          <span key={index} className="material-symbols-rounded">
            keyboard_arrow_right
          </span>
          <Link
            href={`/learner/${pathname.slice(0, index + 1).join('/')}`}
            to="/learner"
            key={item}
          >
            {item}
          </Link>
        </>
      ))}
    </>
  );

  return <div className="top-nav-left">{content}</div>;
};

export default TopNavLeft;
