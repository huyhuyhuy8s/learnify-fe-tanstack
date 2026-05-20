export type TMessage = {
  id: string;
  content: string;
  sender: "user" | "teacher";
  timestamp: Date;
  type?: "text" | "attachment" | "system" | "image";
  imageUrl?: string;
};

export type TMessageProps = {
  message: TMessage;
  height?: number;
  className?: string;
};
