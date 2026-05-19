import { Suspense, useEffect } from "react";
import { createFileRoute, notFound, useRouter } from "@tanstack/react-router";
import ErrorScene from "@/components/ErrorScene";
import NotFound from "@/components/NotFound";
import TetrisLoader from "@/components/TetrisLoader";
import TextButton from "@/components/TextButton";
import {
  useSuspenseGetUserProfile,
  useUpdateUserProfile,
} from "@/hooks/useProfile";
import { useLayout } from "@/contexts/LayoutContext";
import { MOCK_USER_PROFILE } from "@/mock/user";
import { createLearnerHead } from "@/utils";
import { logger } from "@/utils/logger";
import { graphqlClient } from "@/lib/graphql";
import { GET_PROFILE } from "@/graphql/user";
import type { GetUserProfileResponse } from "@/hooks/useProfile";
import EditableField from "./-components/EditableField";
import "./userId.scss";

function UserErrorComponent() {
  const router = useRouter();
  return (
    <ErrorScene>
      <ErrorScene.Header>
        <ErrorScene.Title errorCode={500}>Server Error</ErrorScene.Title>
        <ErrorScene.Description>
          Something went wrong while loading this profile. Please try again or
          come back later.
        </ErrorScene.Description>
      </ErrorScene.Header>
      <ErrorScene.Content>
        <div className="error-scene__control">
          <TextButton
            text="Try Again"
            onClick={() => router.invalidate()}
            className="error-scene__btn"
            size="medium"
            icon="refresh"
          />
          <TextButton
            text="Go Back"
            onClick={() => window.history.back()}
            className="error-scene__btn error-scene__btn--secondary"
            size="medium"
            icon="arrow_back"
            type="outlined"
          />
        </div>
      </ErrorScene.Content>
    </ErrorScene>
  );
}

export const Route = createFileRoute("/learner/user/$userId")({
  loader: async ({ params: { userId }, context }) => {
    const data = await context.queryClient.ensureQueryData({
      queryKey: ["user", "profile", userId],
      queryFn: async () => {
        try {
          return await graphqlClient.request<GetUserProfileResponse>(
            GET_PROFILE,
            { userId }
          );
        } catch {
          throw new Error("Failed to fetch user profile");
        }
      },
    });
    if (!data.currentUser?.users?.length) throw notFound();
    return { title: data.currentUser.users[0]?.username };
  },
  head: ({ loaderData }) =>
    createLearnerHead(loaderData?.title ?? "User Profile"),
  errorComponent: UserErrorComponent,
  pendingComponent: TetrisLoader,
  notFoundComponent: NotFound,
  component: UserProfile,
});

function UserProfile() {
  const { user } = Route.useRouteContext();
  const { setLayoutConfigState } = useLayout();
  const currentUserId = user?.id || "mock-id";

  logger.debug("UserProfile render:", { user, currentUserId });

  useEffect(() => {
    if (user?.username)
      setLayoutConfigState((prev) => ({ ...prev, customTitle: user.username }));
  }, [user?.username, setLayoutConfigState]);

  const { data } = useSuspenseGetUserProfile(currentUserId);
  const updateUserMutation = useUpdateUserProfile();

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

  const handleUpdateUser = (field: string, newValue: string) => {
    updateUserMutation.mutate({
      id: userDisplay.id,
      [field]: newValue,
    });
  };

  return (
    <div className="profile">
      <Suspense fallback={<TetrisLoader />}>
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

        <div className="profile-personal-info-card">
          <h2 className="profile-personal-info-title">Thông tin cá nhân</h2>

          <EditableField
            label="Tên người dùng"
            value={userDisplay.username}
            fieldName="username"
            onSave={handleUpdateUser}
            isLoading={updateUserMutation.isPending}
          />

          <EditableField
            label="Email"
            value={userDisplay.email}
            fieldName="email"
            onSave={handleUpdateUser}
            isLoading={updateUserMutation.isPending}
          />

          <EditableField
            label="Số điện thoại"
            value={userDisplay.phoneNumber}
            fieldName="phoneNumber"
            onSave={handleUpdateUser}
            isLoading={updateUserMutation.isPending}
          />
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
      </Suspense>
    </div>
  );
}
