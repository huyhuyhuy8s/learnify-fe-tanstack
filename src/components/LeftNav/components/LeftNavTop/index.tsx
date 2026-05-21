import IconButton from "@/components/IconButton";
import LeftNavItem from "../LeftNavItem";
import { useLayout } from "@/contexts/LayoutContext";
import { topItems } from "../../constants";

type TLeftNavTopProps = {
  pathname: string;
};

const LeftNavTop = (props: TLeftNavTopProps) => {
  const { pathname } = props;
  const { setLayoutConfigState } = useLayout();

  return (
    <div className="left-nav-top">
      <IconButton
        icon="search"
        size="small"
        ariaLabel="Search"
        onClick={() =>
          setLayoutConfigState((prev) => ({
            ...prev,
            showSearch: !prev.showSearch,
          }))
        }
      />
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
