import IconButton from "@/components/IconButton";
import LeftNavItem from "../LeftNavItem";
import { topItems } from "../../constants";

type TLeftNavTopProps = {
  pathname: string;
};

const LeftNavTop = (props: TLeftNavTopProps) => {
  const { pathname } = props;

  return (
    <div className="left-nav-top">
      <IconButton icon="search" size="small" ariaLabel="Search" />
      <div className="item-list">
        {topItems.map((item) => (
          <LeftNavItem
            key={item.label}
            iconName={item.iconName}
            label={item.label}
            href={item.href}
            active={pathname === item.href}
          />
        ))}
      </div>
    </div>
  );
};

export default LeftNavTop;
