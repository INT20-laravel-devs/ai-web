import { Sparkles } from "lucide-react";

const AiAvatar = () => (
  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-md transition-all duration-300 hover:shadow-lg">
    <Sparkles className="h-5 w-5 animate-pulse" />
  </div>
);

const TypingIndicator = () => (
  <div className="flex items-start gap-4">
    <AiAvatar />
    <div className="rounded-2xl rounded-tl-none border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex space-x-2">
        <div
          className="h-2 w-2 animate-bounce rounded-full bg-indigo-600"
          style={{ animationDelay: "0ms" }}
        ></div>
        <div
          className="h-2 w-2 animate-bounce rounded-full bg-indigo-600"
          style={{ animationDelay: "150ms" }}
        ></div>
        <div
          className="h-2 w-2 animate-bounce rounded-full bg-indigo-600"
          style={{ animationDelay: "300ms" }}
        ></div>
      </div>
    </div>
  </div>
);

export default TypingIndicator;