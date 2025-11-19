import React, { useEffect, useRef, useState } from "react";
import { FiSend, FiPlus, FiUser } from "react-icons/fi";
import Message from "./components/message";
import EmojiPicker from "emoji-picker-react";

function App() {
  const [text, setText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [messages, setMessages] = useState([]);

  const emojiRef = useRef(null);

  const fileInputRef = useRef(null);

  const openFilePicker = () => {
    fileInputRef.current.click();
  };

  const changeState = () => {
    setShowEmoji(!showEmoji);
  };
  const addMes = () => {
    if (text.trim() !== "") {
      setMessages([
        ...messages,
        {
          type: "text",
          content: text,
        },
      ]);
      setText("");
    }
  };

  const onEmojiClick = (emojiData) => {
    setText((prev) => prev + emojiData.emoji);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileURL = URL.createObjectURL(file);

    setMessages([
      ...messages,
      {
        type: "file",
        file: file,
        url: fileURL,
      },
    ]);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setShowEmoji(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <React.Fragment>
      <div className="flex items-center justify-center min-h-screen bg-gray-400 rtl">
        <div className="w-[360px] h-[640px] rounded-xl shadow-lg flex flex-col">
          <div className="flex items-center px-4 py-2 bg-white shadow">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <FiUser className="text-white text-xl" />
            </div>
            <div className="ml-3 font-semibold mr-4">اسم کاربر</div>
          </div>

          <div className="flex-1 p-4 bg-gray-100 overflow-y-auto">
            {messages.map((msg, index) => (
              <Message key={index} message={msg} />
            ))}
          </div>

          <div className="flex items-center px-4 py-2 bg-white shadow relative ">
            <button className="ml-2 text-blue-500 text-2xl" onClick={addMes}>
              <FiSend />
            </button>
            <textarea
              value={text}
              onChange={(e) => {
                setText(e.target.value);

                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
              }}
              placeholder="پیام خود را بنویسید ..."
              className="flex-1 border rounded-xl px-4 py-2 focus:outline-none resize-none overflow-hidden leading-6"
              rows={1}
            />
            <button onClick={changeState} className="mx-2 text-2xl">
              🙂
            </button>
            <button
              onClick={openFilePicker}
              className="mr-2 text-gray-600 text-2xl cursor-pointer"
            >
              <FiPlus />
            </button>
            {showEmoji && (
              <div ref={emojiRef} className="absolute bottom-14 right-10 z-50">
                <EmojiPicker onEmojiClick={onEmojiClick} />
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileSelect}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
