import IconButton from "@/components/IconButton";
import LeftNavItem from "../LeftNavItem";
import { topItems } from "../../constants";

interface LeftNavTopProps {
  pathname: string;
}

const LeftNavTop = (props: LeftNavTopProps) => {
  const { pathname, ...rest } = props;

  return (
    <div className="left-nav-top">
      <IconButton icon="search" size="small" />
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
