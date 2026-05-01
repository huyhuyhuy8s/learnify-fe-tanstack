import { useEffect, useRef, useState } from "react";
import ChatMessage from "../ChatMessage";
import type { TMessage } from "../ChatMessage/type";
import ChatInput from "../ChatInput";
import "./style.scss";

const ChatMessageWrapper = () => {
  const [messages, setMessages] = useState<TMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (content: string) => {
    const newMessage: TMessage = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
      type: "text",
    };

    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <div className="chat-message-wrapper">
      <div className="chat-container-messages">
        {messages.length === 0 ? (
          <div className="chat-container-empty">
            <p className="chat-container-empty-text">
              Start a conversation with your AI tutor
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput
        onSendMessage={handleSendMessage}
        placeholder="Ask your AI tutor anything..."
      />
    </div>
  );
};

export default ChatMessageWrapper;
