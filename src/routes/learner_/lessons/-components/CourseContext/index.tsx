import DropdownMenu from "../DropdownMenu";
import "./style.scss";

const CourseContext = () => {
  return (
    <div className="course-context">
      <DropdownMenu
        icon="note_stack"
        title="Notes"
        iconOption="sticky_note_2"
        options={[
          { value: "a", label: "Note 1" },
          { value: "b", label: "Note 2" },
        ]}
      />
    </div>
  );
};

export default CourseContext;
