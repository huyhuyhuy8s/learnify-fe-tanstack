import { useState } from "react";
import classnames from "classnames";
import IconButton from "@/components/IconButton";
import { COLORS } from "@/styles/colors";
import type { TCourseControllerProps } from "./type";
import "./style.scss";

const CourseController = (props: TCourseControllerProps) => {
  const { courseName = "Course Name", className } = props;
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <nav
      className={classnames(
        "course-controller",
        { expanded: isExpanded },
        className
      )}
    >
      {isExpanded ? (
        <div className="course-controller_expanded">
          <div className="course-controller_header">
            <h5 className="course-controller_title bold">{courseName}</h5>
            <IconButton
              icon="close"
              onClick={() => setIsExpanded(false)}
              size="tiny"
              shape="circle"
              type="custom"
              color={COLORS.neutral900}
              tooltip="Close"
            />
          </div>
        </div>
      ) : (
        <div className="course-controller_compact">
          <IconButton
            icon="menu"
            onClick={() => setIsExpanded(true)}
            size="tiny"
            shape="circle"
            type="custom"
            color={COLORS.neutral900}
            tooltip="Open course menu"
          />
        </div>
      )}
    </nav>
  );
};

export default CourseController;
