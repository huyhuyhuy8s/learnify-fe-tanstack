import { createFileRoute, redirect } from "@tanstack/react-router";
import ChatContainer from "./-components/ChatContainer";
import "./lessonId.scss";
import CourseContext from "./-components/CourseContext";
import TutorContainer from "./-components/TeacherContainer";
import { graphqlClient } from "@/lib/graphql";
import { CURRENT_USER_QUERY } from "@/graphql/mutations";
import type { UserReturn } from "@/gql/graphql";
import type { RouterContext } from "@/router";
import TeacherContainer from "./-components/TeacherContainer";

export const Route = createFileRoute("/learner_/lessons/$lessonId")({
  // beforeLoad: async ({ context, params }) => {
  //   const auth = (context as RouterContext).auth;
  //
  //   if (!auth?.isAuthenticated) {
  //     throw redirect({
  //       to: "/learner/log-in",
  //       search: (prev) => ({
  //         ...prev,
  //         redirect: `/learner/lessons/${params.lessonId}`,
  //       }),
  //     });
  //   }
  //
  //   try {
  //     const response = await graphqlClient.request<{
  //       currentUser: UserReturn;
  //     }>(CURRENT_USER_QUERY);
  //     if (
  //       !response.currentUser.isSuccess ||
  //       response.currentUser.users.length === 0
  //     ) {
  //       throw redirect({
  //         to: "/learner/log-in",
  //         search: (prev) => ({
  //           ...prev,
  //           redirect: `/learner/lessons/${params.lessonId}`,
  //         }),
  //       });
  //     }
  //   } catch {
  //     throw redirect({
  //       to: "/learner/log-in",
  //       search: (prev) => ({
  //         ...prev,
  //         redirect: `/learner/lessons/${params.lessonId}`,
  //       }),
  //     });
  //   }
  // },
  component: LessonDetail,
});

function LessonDetail() {
  return (
    <div className="lesson-detail-page">
      <ChatContainer />
      <CourseContext />
      <TeacherContainer />
    </div>
  );
}
