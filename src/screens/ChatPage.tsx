import { useState } from "react";
import type { PAGE } from "../types/page";
import type { Chat, ChatMember } from "../types/chat";
import MessagePanel from "../components/MessagePanel";
import ChatPanel from "../components/ChatPanel";

interface Props {
  changePage: (page: PAGE) => void;
}

const ChatPage = (props: Props) => {
  const { changePage } = props;

  const [chosenChat, setChosenChat] = useState<(Chat & ChatMember) | null>(
    null,
  );

  const logOff = () => {
    localStorage.clear();
    changePage("USER");
  };

  const deselectChat = () => {
    setChosenChat(null);
  };

  return (
    <>
      <button onClick={() => logOff()}>Log off</button>
      {chosenChat != null ? (
        <MessagePanel name={chosenChat.name} chatId={chosenChat.id} />
      ) : (
        <ChatPanel chooseChat={setChosenChat} />
      )}
    </>
  );
};

export default ChatPage;
