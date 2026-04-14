export type TLabel = "Trusted Learners" | "Courses" | "Satisfaction";
export interface IAboutStatProps {
  label: TLabel;
  value: string;
}

export interface IMemberProps {
  name: string;
  jobTitle: string;
  image: {
    name: string;
    folder: string;
  };
}
