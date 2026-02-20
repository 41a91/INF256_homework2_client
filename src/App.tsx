import { useState } from "react";
import "./App.css";
import type { PAGE } from "./types/page";
import UserPage from "./screens/UserPage";
import ChatPage from "./screens/ChatPage";

function App() {
  const [currentPage, setCurrentPage] = useState<PAGE>("USER");

  return (
    <>
      {currentPage == "USER" ? (
        <UserPage changePage={setCurrentPage} />
      ) : (
        <ChatPage changePage={setCurrentPage} />
      )}
    </>
  );
}

export default App;
