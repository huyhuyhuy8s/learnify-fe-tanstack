import {
  TRoundedCorner,
  TSize,
  TSpecial,
  TType,
  TTypeSecondary,
} from "../type";
import classNames from "classnames";

export interface IUseButtonProps {
  type: TType;
  roundedCorner: TRoundedCorner;
  size: TSize;
  typeSecondary: TTypeSecondary;
  shape: "circular";
  typeSpecial: TSpecial;
  text: string;
  tooltip: string;
}

export const useButton = (props: IUseButtonProps) => {
  const {
    type,
    roundedCorner,
    size,
    typeSecondary,
    shape,
    typeSpecial,
    text,
    tooltip,
  } = props;

  const buttonClassNames = classNames(
    "text-button",
    type,
    [`corner-${roundedCorner}`],
    size,
    { [`typeSecondary-${typeSecondary}`]: type === "secondary" },
    shape,
    { [`typeSpecial-${typeSpecial}`]: type === "special" }
  );

  const iconLabel = type === "special" ? typeSpecial : text;

  const specialContent: Record<TSpecial, string> = {
    lesson:
      "The fundamental unit of instruction: a single, focused topic designed to achieve one specific learning objective.",
    lab: "A hands-on, interactive environment for 'doing'—like writing code in a sandbox or configuring virtual networks.",
    check:
      "Short for 'Knowledge Check.' Low-stakes, instant-feedback quizzes to ensure mastery of a concept.",
    course:
      "A curated collection of lessons, labs, and checks organized around a broader subject with a clear path.",
    roadmap:
      "A high-level visual guide showing the recommended order of courses to reach a specific career goal.",
    certificate:
      "A formal digital credential earned upon completion to prove expertise on resumes or LinkedIn.",
    public:
      "Foundational, 'evergreen' lessons accessible to everyone and indexed by search engines.",
    private:
      "Restricted content for specific organizations or memberships that require prerequisites to unlock.",
    starter:
      "Start learning with basic access to hands-on labs and earn your first skill badges.",
    pro: "Unlock unlimited hands-on learning from beginner to advanced levels.",
    career:
      "Launch your career in high-paying fields with the skills employers are looking for.",
  };

  const toolTipContent =
    type === "special" ? specialContent[typeSpecial] : tooltip;

  return {
    buttonClassNames,
    iconLabel,
    toolTipContent,
  };
};
