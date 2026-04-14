export type Label = "Trusted Learners" | "Courses" | "Satisfaction";
export interface AboutStatProps {
  label: Label;
  value: string;
}

export interface MemberProps {
  name: string;
  jobTitle: string;
  image: {
    name: string;
    folder: string;
  };
}
