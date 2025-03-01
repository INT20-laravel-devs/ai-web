import { Copy, Sparkles, User } from "lucide-react";

const AiAvatar = () => (
  <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300">
    <Sparkles className="w-5 h-5 animate-pulse" />
  </div>
);

const UserAvatar = () => (
  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100">
    <User className="h-5 w-5 text-indigo-600" />
  </div>
);

const ChatMessage = ({ message, handleCopyMessage }) => (
  <div
    className={`group flex items-start gap-4 ${message.sender === "user" ? "justify-end" : "justify-start"} `}
  >
    {message.sender === "ai" && <AiAvatar />}

    <div className="flex max-w-[70%] flex-col">
      <div
        className={`rounded-2xl p-4 shadow-sm ${
          message.sender === "user"
            ? "rounded-tr-none bg-indigo-600 text-white"
            : "rounded-tl-none border border-gray-200 bg-white text-gray-800"
        } `}
      >
        <p className="text-sm leading-relaxed">{message.content}</p>
      </div>

      <div
        className={`mt-1 flex items-center space-x-2 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
      >
        <span className="text-xs text-gray-500">{message.timestamp}</span>

        {message.sender === "ai" && (
          <div className="opacity-0 transition-opacity group-hover:opacity-100">
            <button
              onClick={() => handleCopyMessage(message.content)}
              className="rounded p-1 hover:bg-gray-100"
              title="Copy message"
            >
              <Copy className="h-3 w-3 text-gray-500" />
            </button>
          </div>
        )}
      </div>
    </div>

    {message.sender === "user" && <UserAvatar />}
  </div>
);

export default ChatMessage;