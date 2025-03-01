import { Check,Clock, Send } from "lucide-react";
import React from "react";

interface MessageInputProps {
  inputMessage: string;
  setInputMessage: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({
  inputMessage,
  setInputMessage,
  handleSendMessage,
}) => {
  return (
    <div className="border-t border-gray-200 bg-white p-4">
      <div className="flex items-center space-x-2">
        <input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && !e.shiftKey && handleSendMessage()
          }
          placeholder="Type your message..."
          className="flex-1 rounded-full border border-gray-300 p-3 text-gray-800 transition duration-300 placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          onClick={handleSendMessage}
          disabled={!inputMessage.trim()}
          className="flex items-center justify-center rounded-full bg-primary p-3 text-white shadow-sm transition duration-300 hover:bg-primary hover:shadow disabled:opacity-50 disabled:hover:bg-primary"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
