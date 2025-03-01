import { MessageCircle } from "lucide-react";
import React from "react";

import { type PromptExample } from "@/features/chat/types/chat-types";

import { promptExamples } from "../../data/mock-data";
import PromptExampleCard from "./prompt-card";

interface EmptyChatPlaceholderProps {
  setInputMessage: React.Dispatch<React.SetStateAction<string>>;
}

const EmptyChatPlaceholder: React.FC<EmptyChatPlaceholderProps> = ({
  setInputMessage,
}) => {
  const handleExampleClick = (example: PromptExample) => {
    setInputMessage(example.description);
  };

  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <div className="mb-4 rounded-full bg-indigo-100 p-6">
        <MessageCircle className="h-12 w-12 text-indigo-600" />
      </div>
      <h3 className="mb-2 text-xl font-semibold text-gray-800">
        Start the conversation
      </h3>
      <p className="mb-10 max-w-md text-gray-500">
        Begin by typing a message below to get professional assistance.
      </p>

      <div className="w-full max-w-2xl rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 p-6 shadow-sm">
        <h4 className="mb-4 flex items-center text-left font-medium text-gray-700">
          <MessageCircle className="mr-2 h-4 w-4 text-indigo-600" />
          Try an example:
        </h4>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {promptExamples.map((example, index) => (
            <PromptExampleCard
              key={index}
              title={example.title}
              description={example.description}
              onClick={() => handleExampleClick(example)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmptyChatPlaceholder;
