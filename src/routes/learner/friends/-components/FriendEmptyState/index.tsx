import classnames from "classnames";
import { useNavigate } from "@tanstack/react-router";
import TextButton from "@/components/TextButton";
import Icon from "@/components/Icon";
import "./style.scss";

type TFriendEmptyStateProps = {
  className?: string;
};

const FriendEmptyState = ({ className }: TFriendEmptyStateProps) => {
  const navigate = useNavigate();
  const cls = classnames("friend-empty-state", className);

  return (
    <div className={cls}>
      <Icon name="group" className="friend-empty-state__icon" />
      <h4 className="semibold">Sign in to see your friends</h4>
      <p>
        Connect with classmates and track their progress together. Sign in to
        start building your learning community.
      </p>
      <TextButton
        text="Log in"
        size="medium"
        type="primary"
        icon="login"
        onClick={() =>
          navigate({
            to: "/learner/log-in",
            search: { redirect: "/learner/friends" },
          })
        }
      />
    </div>
  );
};

export default FriendEmptyState;
