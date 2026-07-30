import { Message, MessageContent } from "@/components/ui/message";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";
import { UIDataTypes, UIMessage, UITools } from "ai";

type Props = {
  messages: UIMessage<unknown, UIDataTypes, UITools>[];
};

export default function MessagesView({ messages }: Props) {
  return (
    <MessageScrollerProvider>
      <MessageScroller className="flex min-h-0 w-1/2 flex-1 flex-col">
        <MessageScrollerViewport>
          <MessageScrollerContent>
            {messages.map((message) => (
              <MessageScrollerItem
                key={message.id}
                messageId={message.id}
                scrollAnchor={message.role === "user"}
              >
                <Message>
                  <MessageContent>
                    <div className="typeset typeset-docs w-fit max-w-[75%]">
                      {message.parts
                        .filter((part) => part.type === "text")
                        .map((part, i) => (
                          <span key={i}>{part.text}</span>
                        ))}
                    </div>
                  </MessageContent>
                </Message>
              </MessageScrollerItem>
            ))}
          </MessageScrollerContent>
        </MessageScrollerViewport>
        <MessageScrollerButton />
      </MessageScroller>
    </MessageScrollerProvider>
  );
}
