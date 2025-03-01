import { Send, Clock, Check } from "lucide-react";

const MessageInput = ({ inputMessage, setInputMessage, handleSendMessage }) => {
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
          className="flex-1 rounded-full border border-gray-300 p-3 text-gray-800 transition duration-300 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleSendMessage}
          disabled={!inputMessage.trim()}
          className="flex items-center justify-center rounded-full bg-indigo-600 p-3 text-white shadow-sm transition duration-300 hover:bg-indigo-700 hover:shadow disabled:opacity-50 disabled:hover:bg-indigo-600"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>

      {/* Status indicators */}
      <div className="mt-2 flex items-center text-xs text-gray-500">
        <Clock className="mr-1 h-3 w-3" />
        <span>Responses typically in under 5 seconds</span>
        <span className="ml-3 flex items-center">
          <Check className="mr-1 h-3 w-3 text-green-500" />
          Secure messaging
        </span>
      </div>
    </div>
  );
};
export default MessageInput;