import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import Card from "@/components/Card";
import DecorationCard from "@/components/DecorationCard";
import TextButton from "@/components/TextButton";
import { MOCK_COMMENT } from "@/mock";
import { COLORS } from "@/styles/colors";
import CommentItem from "../-components/CommentItem";
import { roadmapQueryOptions } from "@/utils/roadmaps";
import type { TProgress, TStatusCard } from "@/types/global";

export const Route = createLazyFileRoute("/learner/roadmaps/$roadmapId/")({
  component: RoadmapItem,
});

function RoadmapItem() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { roadmapId } = Route.useParams();

  const { data } = useSuspenseQuery(roadmapQueryOptions(roadmapId));
  const roadmapDetail = data.getRoadmapById.roadmap[0]!;

  const displayCourses = useMemo(
    () =>
      roadmapDetail.courses.map((course) => ({
        id: course.id,
        typeSpecial: "course" as const,
        title: course.courseName,
        description: course.abstract,
        duration: "--",
        status: (course.status.toLowerCase() === "published"
          ? "default"
          : "locked") as TStatusCard,
        percentage: 0 as TProgress,
      })),
    [roadmapDetail]
  );

  return (
    <div className="roadmap__container">
      <div className="roadmap__item-list">
        <DecorationCard
          listBadge={
            <TextButton
              text={t("course_detail.badge_text")}
              size="tiny"
              type="special"
              typeSpecial="roadmap"
              backgroundColor={COLORS.navy300}
              color={COLORS.neutral100}
              onClick={() => {}}
            />
          }
          typeSpecial="roadmap"
          backgroundColor={COLORS.modeGreen}
          title={roadmapDetail.roadMapName}
          status="default"
          listFeature={[]}
          percentage={0 as TProgress}
        />

        <div className="roadmap__content">
          <TextButton
            text={t("course_detail.send_feedback")}
            size="small"
            icon="feedback"
            type="outlined"
            typeSpecial="course"
            onClick={() => {}}
          />
          <div className="roadmap__list">
            {displayCourses.map((course) => (
              <Card
                key={course.id}
                typeSpecial={course.typeSpecial}
                title={course.title}
                description={course.description}
                duration={course.duration}
                status={course.status}
                percentage={course.percentage}
                onClick={() =>
                  navigate({
                    to: "/learner/courses/$courseId",
                    params: { courseId: course.id.toString() },
                  })
                }
              />
            ))}
          </div>
        </div>
      </div>

      <div className="roadmap__comment">
        {MOCK_COMMENT.map((comment) => (
          <CommentItem
            key={comment.id}
            id={comment.id}
            userName={comment.userName}
            time={comment.time}
            content={comment.content}
          />
        ))}
      </div>
    </div>
  );
}
