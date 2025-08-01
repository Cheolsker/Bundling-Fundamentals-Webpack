import React from "react";
import { emojis } from "./emoji";
import { format } from "date-fns";
import "./style.css";

const App = () => {
  const [selectedEmoji, setSelectedEmoji] = React.useState(emojis[0]);

  // main.ts에 있던 showRandomEmoji 함수를 가져오되, React 상태에 저장하도록 수정했어요
  const showRandomEmoji = () => {
    const randomIndex = Math.floor(Math.random() * emojis.length);
    setSelectedEmoji(emojis[randomIndex]);
  };

  return (
    <div className="container">
      <img src="./assets/logo.svg" alt="Logo" className="logo"></img>
      <h1>Emoji of the Day</h1>
      <div className="date-display">{format(new Date(), "MMMM d, yyyy")}</div>
      <div className="emoji-container">
        <div className="emoji">{selectedEmoji.icon}</div>
        <div className="emoji-name">{selectedEmoji.name}</div>
        {/* 다른 이모지 보기 기능을 추가했어요 */}
        <button onClick={showRandomEmoji}>See other emoji</button>
      </div>
    </div>
  );
};

export default App;
