import { useState } from "react";
import { COLORS } from "@/styles/colors";
import {
  MOCK_REFERENCES,
  MOCK_DOCUMENTS,
  MOCK_NOTES,
} from "@/mock/course-context";
import DropdownMenu from "../DropdownMenu";
import "./style.scss";

const CourseContext = () => {
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
        options={MOCK_REFERENCES}
      />
      <DropdownMenu
        icon="docs"
        title="Documents"
        iconOption="docs"
        buttonBackgroundColor={COLORS.navyPastel100}
        isOpen={openDropdown === "Documents"}
        onToggle={(isOpen) => handleToggle("Documents", isOpen)}
        options={MOCK_DOCUMENTS}
      />
      <DropdownMenu
        icon="note_stack"
        title="Notes"
        iconOption="sticky_note_2"
        buttonBackgroundColor={COLORS.yellow300}
        isOpen={openDropdown === "Notes"}
        onToggle={(isOpen) => handleToggle("Notes", isOpen)}
        options={MOCK_NOTES}
      />
    </div>
  );
};

export default CourseContext;
