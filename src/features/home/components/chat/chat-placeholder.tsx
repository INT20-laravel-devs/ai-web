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
      <div className="bg-primary-100 mb-4 rounded-full p-6 shadow-md transition-all hover:shadow-lg">
        <MessageCircle className="h-12 w-12 text-primary" />
      </div>
      <h3 className="mb-2 text-xl font-semibold text-gray-800">
        Почніть спілкування
      </h3>
      <p className="mb-10 max-w-md text-gray-500">
        Ви можете оберати один з прикладів нижче, щоб почати спілкування.
      </p>

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
  );
};

export default EmptyChatPlaceholder;
