import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiMessageCircle, FiUser, FiBell, FiUsers, FiEdit3, FiMenu, FiX } from "react-icons/fi";

const navItems = [
  { to: "/", label: "Home", icon: <FiHome /> },
  { to: "/chat", label: "Chat", icon: <FiMessageCircle /> },
  { to: "/post", label: "Post", icon: <FiEdit3 /> },
  { to: "/connections", label: "Connections", icon: <FiUsers /> },
  { to: "/notifications", label: "Notifications", icon: <FiBell /> },
  { to: "/profile", label: "Profile", icon: <FiUser /> },
];

const Navbar: React.FC = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-gray-950/95 border-b border-gray-800 flex items-center justify-center shadow">
      <div className="w-full max-w-2xl px-4 sm:px-6 py-3 flex items-center justify-between" style={{ width: '100%', maxWidth: '100%' }}>
        <span className="text-xl font-bold text-blue-400">SocialApp</span>
        {/* Desktop/tablet/laptop nav: icons only */}
        <div className="hidden min-[1024px]:flex gap-2 sm:gap-4 md:gap-6 flex-wrap">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center justify-center text-gray-200 hover:text-blue-400 font-medium transition px-2 py-1 rounded ${location.pathname === item.to ? "bg-gray-800 text-blue-400" : ""}`}
            >
              <span className="text-lg">{item.icon}</span>
            </Link>
          ))}
        </div>
        {/* Hamburger for mobile/tablet only */}
        <button
          className="flex max-[1023px]:flex min-[1024px]:hidden items-center text-gray-200 hover:text-blue-400 text-2xl focus:outline-none ml-2"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>
      {/* Mobile menu overlay: icons and names */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 flex max-[1023px]:flex min-[1024px]:hidden" onClick={() => setMenuOpen(false)}>
          <div
            className="bg-gray-950 w-4/5 max-w-xs h-full shadow-lg flex flex-col gap-2 p-6"
            onClick={e => e.stopPropagation()}
          >
            <span className="text-xl font-bold text-blue-400 mb-6">SocialApp</span>
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 justify-start text-gray-200 hover:text-blue-400 font-medium transition px-2 py-3 rounded ${location.pathname === item.to ? "bg-gray-800 text-blue-400" : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
