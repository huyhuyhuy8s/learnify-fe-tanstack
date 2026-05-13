import { useState } from "react";
import { COLORS } from "@/styles/colors";
import {
  MOCK_REFERENCES,
  MOCK_DOCUMENTS,
  MOCK_NOTES,
} from "@/mock/course-context";
import DropdownMenu from "../DropdownMenu";
import "./style.scss";
import { logger } from "@/utils/logger";

type TCourseContextSection = { value: string; label: string };

type TCourseContextProps = {
  references?: TCourseContextSection[];
  documents?: TCourseContextSection[];
  notes?: TCourseContextSection[];
};

const CourseContext = (props: TCourseContextProps) => {
  const {
    references = MOCK_REFERENCES,
    documents = MOCK_DOCUMENTS,
    notes = MOCK_NOTES,
  } = props;

  logger.info("[CourseContext] props:", { references, documents, notes });

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleToggle = (title: string, isOpen: boolean) => {
    setOpenDropdown(isOpen ? title : null);
  };

  return (
    <div className="course-context">
      <DropdownMenu
        icon="quick_reference"
        title="References"
        iconOption="description"
        buttonBackgroundColor={COLORS.greenPastel100}
        isOpen={openDropdown === "References"}
        onToggle={(isOpen) => handleToggle("References", isOpen)}
        options={references}
      />
      <DropdownMenu
        icon="docs"
        title="Documents"
        iconOption="docs"
        buttonBackgroundColor={COLORS.navyPastel100}
        isOpen={openDropdown === "Documents"}
        onToggle={(isOpen) => handleToggle("Documents", isOpen)}
        options={documents}
      />
      <DropdownMenu
        icon="note_stack"
        title="Notes"
        iconOption="sticky_note_2"
        buttonBackgroundColor={COLORS.yellow300}
        isOpen={openDropdown === "Notes"}
        onToggle={(isOpen) => handleToggle("Notes", isOpen)}
        options={notes}
      />
    </div>
  );
};

export default CourseContext;
