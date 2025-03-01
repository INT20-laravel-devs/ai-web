import React from "react";

import { type PromptExample } from "@/features/chat/types/chat-types";

interface PromptExampleCardProps extends PromptExample {
  onClick: () => void;
}

const PromptExampleCard: React.FC<PromptExampleCardProps> = ({
  title,
  description,
  onClick,
}) => (
  <div
    onClick={onClick}
    className="hover:border-primary relative flex cursor-pointer flex-col overflow-hidden rounded-xl border-2 border-gray-200 bg-white p-6 shadow-md transition-all duration-300"
  >
    <div className="from-primary-500/10 to-primary-600/5 absolute inset-0 bg-gradient-to-br"></div>
    <div className="bg-primary-500 absolute left-0 right-0 top-0 h-1.5"></div>
    <div className="absolute bottom-0 right-0 h-24 w-24 opacity-10">
      <div className="grid grid-cols-6 grid-rows-6 gap-1">
        {Array(36)
          .fill(null)
          .map((_, i) => (
            <div key={i} className="bg-primary-500 rounded-full"></div>
          ))}
      </div>
    </div>

    <div className="relative z-10">
      <h4 className="text-primary-600 mb-3 font-medium">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

export default PromptExampleCard;
