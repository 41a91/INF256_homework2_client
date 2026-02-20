import type { Chat, ChatMember } from "../types/chat";

interface Props {
  chatInfo: Chat & ChatMember;
  chooseChat: (chat: Chat & ChatMember) => void;
}

const ChatButton = (props: Props) => {
  const { chatInfo, chooseChat } = props;

  return (
    <div className={"button"}>
      <h3>{chatInfo.name}</h3>
    </div>
  );
};

export default ChatButton;
