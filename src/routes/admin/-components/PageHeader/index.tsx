import Icon from "@/components/Icon";
import "./style.scss";

type TPageHeaderProps = {
  title: string;
  count?: number;
  onAddUser: () => void;
};

const PageHeader = ({ title, count, onAddUser }: TPageHeaderProps) => {
  return (
    <div className="admin-page-header">
      <div className="admin-page-header__text">
        <h1 className="admin-page-header__title">{title}</h1>
        {count !== undefined && (
          <span className="admin-page-header__count">
            {count.toLocaleString()} total
          </span>
        )}
      </div>

      <button
        id="page-header-add-user-btn"
        type="button"
        className="admin-page-header__add-btn"
        aria-label="Add a new user"
        onClick={onAddUser}
      >
        <Icon name="person_add" size={18} />
        <span>Add User</span>
      </button>
    </div>
  );
};

export default PageHeader;
