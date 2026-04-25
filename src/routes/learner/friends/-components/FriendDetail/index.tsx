import type { TFriendDetail } from "./type";
import "./style.scss";

const FriendDetail = (props: TFriendDetail) => {
  const {
    imgBackground,
    imgUrl,
    name,
    email,
    streak,
    badges,
    follower,
    course,
  } = props;

  return (
    <div className="friend-detail">
      <div className="friend-detail-header">
        {imgBackground ? (
          <img
            className="friend-detail-bg"
            src={imgBackground}
            alt="Background"
          />
        ) : (
          <div className="friend-detail-bg friend-detail-bg--empty"></div>
        )}
        <div className="friend-detail-avatar-wrapper">
          <img className="friend-detail-avatar" src={imgUrl} alt={name} />
        </div>
      </div>

      <div className="friend-detail-body">
        <h3 className="friend-detail-name bold">{name}</h3>
        <p className="friend-detail-meta">{email}</p>

        <div className="friend-detail-stats">
          <div className="friend-detail-stat-item">
            <span className="friend-detail-stat-value">{badges}</span>
            <span className="friend-detail-stat-label">Badges</span>
          </div>
          <div className="friend-detail-stat-item">
            <span className="friend-detail-stat-value">{follower}</span>
            <span className="friend-detail-stat-label">Followers</span>
          </div>
          <div className="friend-detail-stat-item">
            <span className="friend-detail-stat-value">{streak}</span>
            <span className="friend-detail-stat-label">Streak Days</span>
          </div>
          <div className="friend-detail-stat-item">
            <span className="friend-detail-stat-value">{course}</span>
            <span className="friend-detail-stat-label">Courses</span>
          </div>
        </div>

        <div className="friend-detail-achievements">
          <h2 className="friend-detail-achievements-title">Achievements</h2>
          <div className="friend-detail-achievements-list">
            <div className="friend-detail-achievement-item">
              <div className="friend-detail-achievement-icon friend-detail-achievement-icon--yellow"></div>
              <span className="friend-detail-achievement-label">
                Path Enroll
              </span>
            </div>
            <div className="friend-detail-achievement-item">
              <div className="friend-detail-achievement-icon friend-detail-achievement-icon--red"></div>
              <span className="friend-detail-achievement-label">First Lab</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendDetail;
