import React, { useState } from "react";
import styles from "./ChatPopup.module.css";
import {
  FaFacebookMessenger,
  FaPaperPlane,
  FaPaperclip,
  FaSmile,
  FaUserAlt,
} from "react-icons/fa";

const ChatPopup = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleKeyPress = (event) => {
    // check user nếu có nhập tn và nhấn enter thì sẽ gửi tn
    if (event.key === "Enter" && message.trim() !== "") {
      setMessages([...messages, message]);
      setMessage("");
    }
  };

  return (
    <div className={styles.chatPopupContainer}>
      {isChatOpen && (
        <div className={styles.chatPopupBox}>
          <div className={styles.chatPopupHeader}>
            <div className={styles.chatPopupTitle}>
              <h3>Customer Support</h3>
            </div>
            <div className={styles.chatPopupBtn}>
              <p>Let's Chat App</p>
            </div>
          </div>
          <div className={styles.chatPopupContent}>
            {messages.map((msg, index) => (
              <div key={index} className={styles.chatPopupText}>
                <p>{msg}</p>
              </div>
            ))}
          </div>
          <div className={styles.chatPopupFooter}>
            <FaUserAlt />
            <input
              placeholder="Enter Message!"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyPress={handleKeyPress}
            ></input>
            <FaPaperclip />
            <FaSmile />
            <div
              onClick={() => {
                if (message.trim() !== "") {
                  setMessages([...messages, message]);
                  setMessage("");
                }
              }}
            >
              <FaPaperPlane />
            </div>
          </div>
        </div>
      )}
      <button className={styles.chatPopupButton} onClick={toggleChat}>
        <FaFacebookMessenger />
      </button>
    </div>
  );
};

export default ChatPopup;
