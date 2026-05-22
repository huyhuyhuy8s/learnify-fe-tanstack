import { Suspense, useEffect } from "react";
import { createFileRoute, notFound, useRouter } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
import ErrorScene from "@/components/ErrorScene";
import NotFound from "@/components/NotFound";
import TetrisLoader from "@/components/TetrisLoader";
import TextButton from "@/components/TextButton";
import { useLayout } from "@/contexts/LayoutContext";
import { GET_PROFILE } from "@/graphql/user";
import type { GetUserProfileResponse } from "@/hooks/useProfile";
import {
  useSuspenseGetUserProfile,
  useUpdateUserProfile,
} from "@/hooks/useProfile";
import { graphqlClient } from "@/lib/graphql";
import { MOCK_USER_PROFILE } from "@/mock/user";
import { createLearnerHead } from "@/utils";
import { logger } from "@/utils/logger";
import EditableField from "./-components/EditableField";
import "./userId.scss";

function UserErrorComponent() {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <ErrorScene>
      <ErrorScene.Header>
        <ErrorScene.Title errorCode={500}>
          {t("profile.server_error")}
        </ErrorScene.Title>
        <ErrorScene.Description>
          {t("profile.load_error")}
        </ErrorScene.Description>
      </ErrorScene.Header>
      <ErrorScene.Content>
        <div className="error-scene__control">
          <TextButton
            text={t("errors.try_again")}
            onClick={() => router.invalidate()}
            className="error-scene__btn"
            size="medium"
            icon="refresh"
          />
          <TextButton
            text={t("errors.go_back")}
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
          throw new Error(i18n.t("profile.failed_fetch"));
        }
      },
    });
    if (!data.currentUser?.users?.length) throw notFound();
    return { title: data.currentUser.users[0]?.username };
  },
  head: ({ loaderData }) =>
    createLearnerHead(loaderData?.title ?? i18n.t("profile.head_title")),
  errorComponent: UserErrorComponent,
  pendingComponent: TetrisLoader,
  notFoundComponent: NotFound,
  component: UserProfile,
});

function UserProfile() {
  const { t } = useTranslation();
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
              alt={t("profile.avatar_alt")}
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
                <strong>{userDisplay.diamond}</strong> {t("profile.diamonds")}
              </span>
              <span className="profile-info-content-stats-dot">•</span>
              <span className="profile-info-content-stats-item">
                <strong>{userDisplay.followers}</strong>{" "}
                {t("profile.followers")}
              </span>
              <span className="profile-info-content-stats-dot">•</span>
              <span className="profile-info-content-stats-item">
                <strong>{userDisplay.currentSteak}</strong>{" "}
                {t("profile.streak")}
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
          <h2 className="profile-personal-info-title">
            {t("profile.personal_info")}
          </h2>

          <EditableField
            label={t("profile.username_label")}
            value={userDisplay.username}
            fieldName="username"
            onSave={handleUpdateUser}
            isLoading={updateUserMutation.isPending}
          />

          <EditableField
            label={t("profile.email_label")}
            value={userDisplay.email}
            fieldName="email"
            onSave={handleUpdateUser}
            isLoading={updateUserMutation.isPending}
          />

          <EditableField
            label={t("profile.phone_label")}
            value={userDisplay.phoneNumber}
            fieldName="phoneNumber"
            onSave={handleUpdateUser}
            isLoading={updateUserMutation.isPending}
          />
        </div>

        <div className="profile-courses">
          <h2 className="profile-courses-title">{t("profile.my_courses")}</h2>
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
                  {item.course.isDone
                    ? t("profile.completed")
                    : t("profile.in_progress")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Suspense>
    </div>
  );
}
