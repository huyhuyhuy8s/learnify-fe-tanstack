import { Suspense, useEffect } from "react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { getCurrentUserFn } from "@/server/auth";
import { MOCK_USER_PROFILE } from "@/mock/user";
import { useSuspenseGetUserProfile } from "@/hooks/useProfile";
import { useAuthStore } from "@/store";
import { useLayout } from "@/contexts/LayoutContext";
import TetrisLoader from "@/components/TetrisLoader";
import "./userId.scss";

export const Route = createFileRoute("/learner/user/$userId")({
  beforeLoad: async ({ location }) => {
    const user = await getCurrentUserFn();
    if (!user)
      throw redirect({
        to: "/learner/log-in",
        search: { redirect: location.pathname },
      });
    return { user };
  },
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <Suspense fallback={<TetrisLoader />}>
      <ProfileInner />
    </Suspense>
  );
}

function ProfileInner() {
  const { user } = useAuthStore();
  const { setLayoutConfigState } = useLayout();
  const currentUserId = user?.id || "mock-id";

  useEffect(() => {
    if (user?.username)
      setLayoutConfigState((prev) => ({ ...prev, customTitle: user.username }));
  }, [user?.username, setLayoutConfigState]);

  const { data } = useSuspenseGetUserProfile(currentUserId);
  const isBackendSuccess = !!data?.currentUser?.users?.length;
  const successCourses = data.countSuccessEnrollments?.data || [];
  const inProgressCourses = data.countInProgressEnrollments?.data || [];

  const userDisplay = isBackendSuccess
    ? (() => {
        const backendUser = data.currentUser.users[0]!;
        return {
          ...MOCK_USER_PROFILE,
          id: backendUser.id,
          username: backendUser.username || MOCK_USER_PROFILE.username,
          email: backendUser.email || MOCK_USER_PROFILE.email,
          diamond: backendUser.diamond ?? MOCK_USER_PROFILE.diamond,
          currentSteak:
            backendUser.currentSteak ?? MOCK_USER_PROFILE.currentSteak,
          phoneNumber: backendUser.phoneNumber || MOCK_USER_PROFILE.phoneNumber,
          enrollment: [
            ...successCourses.map((c) => ({ course: c })),
            ...inProgressCourses.map((c) => ({ course: c })),
          ],
        };
      })()
    : MOCK_USER_PROFILE;

  return (
    <div className="profile">
      <div className="profile-banner"></div>

      <div className="profile-info">
        <div className="profile-info-avatar">
          <img
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userDisplay.username}`}
            alt="Avatar"
          />
        </div>

        <div className="profile-info-content">
          <div className="profile-info-content-header">
            <h1 className="profile-info-content-header-name">
              {userDisplay.username}
            </h1>
            <button className="profile-info-content-header-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <line x1="19" y1="8" x2="19" y2="14"></line>
                <line x1="22" y1="11" x2="16" y2="11"></line>
              </svg>
              <span>Add friend</span>
            </button>
          </div>

          <div className="profile-info-content-stats">
            <span className="profile-info-content-stats-user">
              @{userDisplay.username}
            </span>
            <span className="profile-info-content-stats-dot">•</span>
            <span className="profile-info-content-stats-item">
              <strong>{userDisplay.diamond}</strong> Diamonds
            </span>
            <span className="profile-info-content-stats-dot">•</span>
            <span className="profile-info-content-stats-item">
              <strong>{userDisplay.followers}</strong> Followers
            </span>
            <span className="profile-info-content-stats-dot">•</span>
            <span className="profile-info-content-stats-item">
              <strong>{userDisplay.currentSteak}</strong> Streak
            </span>
          </div>

          <div className="profile-info-content-details">
            <span>{userDisplay.email}</span>
            <span className="profile-info-content-details-dot">•</span>
            <span>{userDisplay.phoneNumber}</span>
          </div>
        </div>
      </div>

      <div className="profile-courses">
        <h2 className="profile-courses-title">My Courses</h2>
        <div className="profile-courses-list">
          {userDisplay.enrollment.map((item) => (
            <div key={item.course.id} className="profile-courses-list-card">
              <div className="profile-courses-list-card-icon">
                <div className="profile-courses-list-card-icon-shape"></div>
              </div>
              <h3 className="profile-courses-list-card-name">
                {item.course.courseName}
              </h3>
              <p className="profile-courses-list-card-abstract">
                {item.course.abstract}
              </p>
              <div className="profile-courses-list-card-status">
                {item.course.isDone ? "Completed" : "In Progress"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
