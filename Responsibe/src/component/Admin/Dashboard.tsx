import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import StatWidget from "./Dashboard/StatWidget";
import AnimatedNumber from "./Dashboard/AnimatedNumber";

// test import
import {mockUsers} from "../../tests/users/mockUsers"

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Dummy user data
  const user = {
    name: "John Doe",
    avatar: "https://i.pravatar.cc/40?img=3",
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setProfileMenuOpen(false);
      }
    }
    if (profileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileMenuOpen]);

  // Example widget data with line graph data
  // Calculate monthly user counts from mockUsers
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  // Get last 6 months (including current)
  const now = new Date();
  const last12Months = Array.from({ length: 12 }).map((_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (12 - i), 1);
    return {
      label: months[d.getMonth()] + " '" + String(d.getFullYear()).slice(-2),
      year: d.getFullYear(),
      month: d.getMonth(),
    };
  });
  // Count users created in each month
  const userCountsByMonth = last12Months.map(({ year, month }) =>
    mockUsers.filter((u) => {
      const created = new Date(u.createdAt);
      return created.getFullYear() === year && created.getMonth() === month;
    }).length
  );
  const widgets = [
    {
      title: "Total Users",
      value: mockUsers.length,
      color: "bg-blue-600",
      data: userCountsByMonth,
      labels: last12Months.map((m) => m.label),
      animated: true,
    },
    {
      title: "Active Users",
      value: mockUsers.filter(user => user.status === 'Active').length,
      color: "bg-green-600",
      data: userCountsByMonth, // You may want to use a separate array for active users by month
      labels: last12Months.map((m) => m.label),
      animated: true,
    },
    {
      title: "Inactive Users",
      value: mockUsers.filter(user => user.status === 'Inactive').length,
      color: "bg-yellow-500",
      data: userCountsByMonth,
      labels: last12Months.map((m) => m.label),
      animated: true,
    },
    {
      title: "Account Deleted",
      value: mockUsers.filter(user => user.status === 'Closed').length,
      color: "bg-red-600",
      data: userCountsByMonth,
      labels: last12Months.map((m) => m.label),
      animated: true,
    },
  ];

  // Helper to clear all cookies
  function clearAllCookies() {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }
  }

  function handleLogout() {
    // Clear cookies
    clearAllCookies();
    // Clear local and session storage
    localStorage.clear();
    sessionStorage.clear();
    // Redirect to login
    navigate("/login", { replace: true });
  }

  return (
    <div className="min-h-screen flex bg-gray-900 text-white dark">
      {/* Sidebar */}
      <div className={sidebarOpen ? "block" : "hidden"}>
        <Sidebar onLogout={handleLogout} />
      </div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* NavBar */}
        <div className="bg-gray-800 shadow flex items-center justify-between px-4 h-16 relative">
          <div className="flex items-center">
            <button
              className="mr-4 focus:outline-none md:hidden"
              onClick={() => setSidebarOpen((open) => !open)}
              aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              {sidebarOpen ? (
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
            <h1 className="text-2xl font-bold text-white">
              Admin Console
            </h1>
          </div>
          {/* Profile Dropdown */}
          <div className="relative" ref={profileMenuRef}>
            <button
              className="flex items-center gap-2 focus:outline-none"
              onClick={() => setProfileMenuOpen((open) => !open)}
              aria-label="Open profile menu"
            >
              <img
                src={user.avatar}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-blue-500"
              />
              <span className="font-semibold text-white">
                {user.name}
              </span>
            </button>
            {profileMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-gray-800 rounded shadow-lg py-2 z-50">
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-700"
                  onClick={() => {
                    setProfileMenuOpen(false);
                    navigate("/profile");
                  }}
                >
                  Profile
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-700"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
        {/* Dashboard Widgets */}
        <div className="p-8">
          <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {widgets.map((widget, idx) => (
              <StatWidget
                key={widget.title}
                title={widget.title}
                value={widget.animated ? <AnimatedNumber value={widget.value} /> : widget.value}
                color={widget.color}
                data={widget.data}
                labels={widget.labels}
                // Pass start/end labels as props for Total Users only
                startLabel={idx === 0 ? widget.labels[0] : undefined}
                endLabel={idx === 0 ? widget.labels[widget.labels.length - 1] : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
