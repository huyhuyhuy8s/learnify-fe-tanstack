export type TLabel =
  | "Trusted Learners"
  | "Courses"
  | "Members"
  | "Trusted Partners";
export type TAboutStatProps = {
  index: number;
  color: string;
  label: TLabel;
  value: string;
};

export type TMemberProps = {
  name: string;
  jobTitle: string;
  image: {
    name: string;
    folder: string;
  };
};
