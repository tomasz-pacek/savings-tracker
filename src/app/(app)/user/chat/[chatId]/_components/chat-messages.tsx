"use client";

import { UIMessage } from "ai";

type Props = {
  messages: UIMessage[];
};

export default function ChatMessages({ messages }: Props) {
  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message) => (
        <div key={message.id}>
          <strong>{message.role}</strong>

          {message.parts.map((part, index) => {
            if (part.type === "text") {
              return <p key={index}>{part.text}</p>;
            }

            return null;
          })}
        </div>
      ))}
    </div>
  );
}
