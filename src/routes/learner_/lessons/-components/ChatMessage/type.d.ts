export type TMessage = {
  id: string;
  content: string;
  sender: "user" | "tutor";
  timestamp: Date;
  type?: "text" | "attachment" | "system";
};

export type TChatMessageProps = {
  message: TMessage;
  className?: string;
};
