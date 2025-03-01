import { Settings, LogOut } from "lucide-react";

const SidebarFooter = ({ isSidebarOpen }) => (
  <div className="border-t border-gray-200 p-4">
    {isSidebarOpen ? (
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">
            U
          </div>
          <div className="text-sm">
            <p className="font-medium text-gray-900">User Account</p>
            <p className="text-xs text-gray-500">Professional Plan</p>
          </div>
        </div>
        <div className="flex space-x-1">
          <button
            className="rounded-full p-2 text-gray-600 hover:bg-gray-100"
            title="Settings"
          >
            <Settings className="h-5 w-5" />
          </button>
          <button
            className="rounded-full p-2 text-gray-600 hover:bg-gray-100"
            title="Sign Out"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    ) : (
      <button
        className="flex w-full justify-center rounded-full p-2 transition hover:bg-gray-100"
        title="Settings"
      >
        <Settings className="h-6 w-6 text-gray-700" />
      </button>
    )}
  </div>
);

export default SidebarFooter;