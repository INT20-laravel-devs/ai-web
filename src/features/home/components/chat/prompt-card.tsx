import { Sparkles, ChevronRight } from "lucide-react";

const PromptExampleCard = ({ title, description, onClick }) => (
  <div
    onClick={onClick}
    className="group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-indigo-300 hover:shadow-lg"
  >
    {/* Gradient accent on hover */}
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

    {/* Top accent line */}
    <div className="absolute left-0 right-0 top-0 h-1 origin-left scale-x-0 transform bg-gradient-to-r from-indigo-500 to-purple-500 transition-transform duration-300 group-hover:scale-x-100"></div>

    {/* Content */}
    <div className="relative z-10">
      <h4 className="mb-3 flex items-center font-medium text-gray-800 transition-colors duration-300 group-hover:text-indigo-700">
        <span className="mr-3 rounded-lg bg-indigo-100 p-2 transition-colors duration-300 group-hover:bg-indigo-200">
          <Sparkles className="h-4 w-4 text-indigo-600" />
        </span>
        {title}
      </h4>
      <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">
        {description}
      </p>
    </div>

    {/* "Try this" indicator */}
    <div className="mt-3 flex justify-end border-t border-gray-100 pt-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
      <span className="flex items-center text-xs font-medium text-indigo-600">
        Try this
        <ChevronRight className="ml-1 h-3 w-3" />
      </span>
    </div>
  </div>
);

export default PromptExampleCard;