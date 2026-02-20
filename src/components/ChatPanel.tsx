/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import type { Chat, ChatMember } from "../types/chat";
import ChatButton from "./ChatButton";
import { sendRequest } from "../utils/api";
import type { ChatPayload } from "../types/api";

interface Props {
  chooseChat: (chat: Chat & ChatMember) => void;
}

const ChatPanel = (props: Props) => {
  const { chooseChat } = props;

  const [chats, setChats] = useState<(Chat & ChatMember)[]>([]);

  const getChats = async () => {
    const data = await sendRequest(`/chat`, "GET", null);
    if (data.ok) {
      const chatPayload: ChatPayload = await data.json();
      if (chatPayload.status == "success") {
        setChats(chatPayload.data.chats);
      }
    }
  };

  useEffect(() => {
    getChats();
  }, []);

  return (
    <div>
      <h3>Choose Chats</h3>
      <div>
        {chats.map((chat, index) => {
          return (
            <ChatButton key={index} chatInfo={chat} chooseChat={chooseChat} />
          );
        })}
      </div>
    </div>
  );
};
