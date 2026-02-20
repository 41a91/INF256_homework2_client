import { useEffect, useState } from "react";
import type { ChatMessage } from "../types/chat";
import { sendRequest } from "../utils/api";
import type { MessagePayload } from "../types/api";

interface Props {
  name: string;
  chatId: number;
  deselectChat: () => void;
}

const MessagePanel = (props: Props) => {
  const { name, chatId, deselectChat } = props;

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState<string>("");

  const getMessages = async () => {
    const data = await sendRequest(
      `/chat/messages?chatId=${chatId}`,
      "GET",
      null,
    );
    if (data.ok) {
      const messagePayload: MessagePayload = await data.json();
      if (messagePayload.status == "success") {
        setMessages(messagePayload.data.messages);
      }
    }
  };

  const sendMessage = async () => {
    if (message.length > 0) {
      //Need to send the message here
      const body = new URLSearchParams({
        message,
        messageType: "TEXT",
        chatId: chatId.toString(),
      });
      const data = await sendRequest(`/chat/send`, "POST", body);
      if (data.ok) {
        const messages: MessagePayload = await data.json();
        setMessages(messages.data.messages);
      }
    }
  };

  useEffect(() => {
    getMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId]);

  return (
    <div>
      <h3>Chat: {name}</h3>
      <div>
        {messages.map((message, index) => {
          return (
            <div key={index}>
              <div>{message.message}</div>
            </div>
          );
        })}
      </div>
      <input
        type={"text"}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={() => sendMessage()}>Send Message</button> <div></span>
      <button onClick={() => deselectChat()}>Back</button>
    </div>
  );
};

export default MessagePanel;
