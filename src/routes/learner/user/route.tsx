import { useMemo } from "react";
import { createFileRoute, Navigate, getRouteApi } from "@tanstack/react-router";
import { MOCK_USER_PROFILE } from "@/mock/user";
import { useGetUserProfile } from "@/hooks/useProfile";
import "./userId.scss";

export const Route = createFileRoute("/learner/user")({
  component: RouteComponent,
});
const rootRoute = getRouteApi("__root__");

function RouteComponent() {
  // 1. TẤT CẢ HOOKS PHẢI ĐƯỢC GỌI Ở TRÊN CÙNG (Tránh lỗi Rules of Hooks)
  const { auth } = rootRoute.useLoaderData();
  const currentUserId = auth?.user?.id || "mock-id";

  const { data, isLoading, isError } = useGetUserProfile(currentUserId);

  const userDisplay = useMemo(() => {
    if (!isLoading && !isError && data?.currentUser?.users?.length) {
      const backendUser = data.currentUser.users[0]!;
      const successCourses = data.countSuccessEnrollments?.data || [];
      const inProgressCourses = data.countInProgressEnrollments?.data || [];
      const mappedEnrollments = [
        ...successCourses.map((course) => ({ course })),
        ...inProgressCourses.map((course) => ({ course })),
      ];

      return {
        ...MOCK_USER_PROFILE,
        id: backendUser.id,
        username: backendUser.username || MOCK_USER_PROFILE.username,
        email: backendUser.email || MOCK_USER_PROFILE.email,
        diamond: backendUser.diamond ?? MOCK_USER_PROFILE.diamond,
        currentSteak:
          backendUser.currentSteak ?? MOCK_USER_PROFILE.currentSteak,
        phoneNumber: backendUser.phoneNumber || MOCK_USER_PROFILE.phoneNumber,
        enrollment:
          mappedEnrollments.length > 0
            ? mappedEnrollments
            : MOCK_USER_PROFILE.enrollment,
      };
    }

    return MOCK_USER_PROFILE;
  }, [data, isLoading, isError]);

  // 2. LỆNH ĐIỀU HƯỚNG (EARLY RETURN) PHẢI NẰM SAU CÁC HOOKS
  if (!auth?.isAuthenticated) {
    return (
      <Navigate
        to="/learner/log-in"
        search={{ redirect: "/learner/user" }} // Có thể sửa lại redirect tuỳ ý
        replace
      />
    );
  }

  // 3. RENDER GIAO DIỆN
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
