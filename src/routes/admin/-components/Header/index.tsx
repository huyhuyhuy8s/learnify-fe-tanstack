import TopNavRight from "@/components/TopNav/components/TopNavRight";
import Icon from "@/components/Icon";
import "./style.scss";

type TAdminHeaderProps = {
  placeholder?: string;
};

const AdminHeader = ({
  placeholder = "Search users, settings...",
}: TAdminHeaderProps) => {
  return (
    <header className="admin-header">
      <div className="admin-header__search-wrapper">
        <span className="admin-header__search-icon" aria-hidden="true">
          <Icon name="search" size={18} />
        </span>
        <input
          id="admin-header-search"
          type="text"
          className="admin-header__search-input"
          placeholder={placeholder}
          aria-label="Search admin panel"
        />
      </div>

      <div className="admin-header__right">
        <TopNavRight />
      </div>
    </header>
  );
};

export default AdminHeader;
