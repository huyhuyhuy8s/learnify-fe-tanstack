import type { TAdminUser } from "@/hooks/useAdminUsers";
import "./style.scss";

type RecentUsersProps = {
  users: TAdminUser[];
};

const ROLE_MOD: Record<string, string> = {
  Learner: "blue",
  Teacher: "green",
  Instructor: "green",
  Reviewer: "orange",
  Admin: "red",
};

function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hr ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} days ago`;
}

const RecentUsers = ({ users }: RecentUsersProps) => {
  return (
    <div className="admin-recent-users">
      <div className="admin-recent-users__header">
        <h2 className="admin-recent-users__title">Recent Users</h2>
      </div>

      <ul className="admin-recent-users__list">
        {users.length === 0 && (
          <li className="admin-recent-users__empty">No recent users.</li>
        )}

        {users.map((user) => (
          <li key={user.id} className="admin-recent-users__item">
            <div className="admin-recent-users__avatar" aria-hidden="true">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="admin-recent-users__avatar-img"
                />
              ) : (
                user.username.charAt(0).toUpperCase()
              )}
            </div>
            <div className="admin-recent-users__info">
              <span className="admin-recent-users__name">{user.username}</span>
              <span className="admin-recent-users__email">{user.email}</span>
            </div>
            <div className="admin-recent-users__meta">
              <span
                className={`admin-recent-users__role admin-recent-users__role--${
                  ROLE_MOD[user.role] ?? "blue"
                }`}
              >
                {user.role}
              </span>
              <span className="admin-recent-users__time">
                {timeAgo(user.createdAt)}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentUsers;
