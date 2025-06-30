import { Link } from "react-router-dom";

interface SidebarProps {
  onLogout?: () => void;
}

const Sidebar = ({ onLogout }: SidebarProps) => {
  return (
    <div className="h-screen w-64 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col shadow-lg">
      {/* Company Logo */}
      <div className="flex items-center justify-center h-20 border-b border-gray-200 dark:border-gray-800">
        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-2xl font-bold">
          {/* Placeholder for logo, replace with <img src='/logo.png' alt='Logo' /> if you have a logo */}
          CL
        </div>
        <span className="ml-3 text-xl font-semibold">CompanyName</span>
      </div>
      {/* Sidebar Options */}
      <nav className="flex-1 py-6 flex flex-col gap-2">
        <Link to="/admin" className="px-6 py-3 hover:bg-gray-200 dark:hover:bg-gray-800 rounded transition-colors">Dashboard</Link>
        <Link to="/admin/analytics" className="px-6 py-3 hover:bg-gray-200 dark:hover:bg-gray-800 rounded transition-colors">Analytics</Link>
        <Link to="/admin/users" className="px-6 py-3 hover:bg-gray-200 dark:hover:bg-gray-800 rounded transition-colors">Manage Users</Link>
        <Link to="/admin/moderation" className="px-6 py-3 hover:bg-gray-200 dark:hover:bg-gray-800 rounded transition-colors">Moderation</Link>
        <Link to="/admin/reports" className="px-6 py-3 hover:bg-gray-200 dark:hover:bg-gray-800 rounded transition-colors">Reports</Link>
        <Link to="/admin/settings" className="px-6 py-3 hover:bg-gray-200 dark:hover:bg-gray-800 rounded transition-colors">System Settings</Link>
        <Link to="/admin/audit-logs" className="px-6 py-3 hover:bg-gray-200 dark:hover:bg-gray-800 rounded transition-colors">Audit Logs</Link>
        <Link to="/admin/support" className="px-6 py-3 hover:bg-gray-200 dark:hover:bg-gray-800 rounded transition-colors">Support</Link>
        <Link to="/profile" className="px-6 py-3 hover:bg-gray-200 dark:hover:bg-gray-800 rounded transition-colors">Profile</Link>
        <button
          type="button"
          onClick={onLogout}
          className="text-left px-6 py-3 hover:bg-gray-200 dark:hover:bg-gray-800 rounded transition-colors w-full"
        >
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
