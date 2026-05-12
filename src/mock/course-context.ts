type TCourseContextOption = {
  value: string;
  label: string;
};

export const MOCK_REFERENCES: TCourseContextOption[] = [
  { value: "ref-1", label: "React TanStack Official Docs" },
  { value: "ref-2", label: "Useful Resources and Cheatsheets" },
  { value: "ref-3", label: "Past Lesson Transcripts" },
  { value: "ref-4", label: "External Learning Links" },
];

export const MOCK_DOCUMENTS: TCourseContextOption[] = [
  { value: "doc-1", label: "Sample Lab Report - Data Analysis" },
  { value: "doc-2", label: "Presentation Slides Module 3" },
  { value: "doc-3", label: "Research Paper: Trends in AI" },
];

export const MOCK_NOTES: TCourseContextOption[] = [
  { value: "note-1", label: "My Personal Notes - Session 1" },
  { value: "note-2", label: "Key Concepts Summary" },
  { value: "note-3", label: "Questions for the Instructor" },
  { value: "note-4", label: "Study Group Notes - Week 2" },
];
