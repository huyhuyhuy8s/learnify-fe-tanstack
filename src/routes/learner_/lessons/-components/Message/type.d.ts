export type TMessage = {
  id: string;
  content: string;
  sender: "user" | "tutor";
  timestamp: Date;
  type?: "text" | "attachment" | "system";
};

export type TMessageProps = {
  message: TMessage;
  className?: string;
};
