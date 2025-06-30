import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  FiHome, 
  FiMessageCircle, 
  FiBell, 
  FiUsers, 
  FiEdit3, 
  FiMenu, 
  FiX, 
  FiLogOut, 
  FiSearch, 
  FiSettings, 
  FiUser,
  FiTrendingUp,
  FiBookmark
} from "react-icons/fi";
import Notification, { getNotificationList } from "../Notification/Notification";

const navItems = [
  { to: "/", label: "Home", icon: <FiHome /> },
  { to: "/chat", label: "Chat", icon: <FiMessageCircle /> },
  { to: "/post", label: "Post", icon: <FiEdit3 /> },
  { to: "/connections", label: "Connections", icon: <FiUsers /> },
  { to: "/trending", label: "Trending", icon: <FiTrendingUp /> },
  { to: "/bookmarks", label: "Bookmarks", icon: <FiBookmark /> },
];

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type?: "success" | "error" | "info" | "warning";
  } | null>(null);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const userMenuButtonRef = useRef<HTMLButtonElement>(null);
  const notificationMenuRef = useRef<HTMLDivElement>(null);
  const notificationButtonRef = useRef<HTMLButtonElement>(null);

  const user = {
    name: "Alice Johnson",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    email: "alice@example.com",
    role: "Software Engineer"
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showUserMenu &&
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node) &&
        !userMenuButtonRef.current?.contains(event.target as Node)
      ) {
        setShowUserMenu(false);
      }
      if (
        showNotifications &&
        notificationMenuRef.current &&
        !notificationMenuRef.current.contains(event.target as Node) &&
        !notificationButtonRef.current?.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showUserMenu, showNotifications]);

  const handleLogout = async () => { 
    setIsLoggingOut(true);
    setShowLogoutConfirm(false);
    setShowUserMenu(false);
    
    try {
      document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
      localStorage.clear();
      sessionStorage.clear();
      
      await new Promise(resolve => setTimeout(resolve, 800));
      window.location.replace('/login');
    } catch {
      setIsLoggingOut(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      setSearchQuery("");
      setShowSearch(false);
    }
  };

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  const handleMenuLinkClick = (path: string) => {
    navigate(path);
    setShowUserMenu(false);
  };
  
  const handleMobileMenuLinkClick = (path: string) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <>
      {/* Mobile menu overlay */}
      {menuOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          onClick={() => setMenuOpen(false)}
        >
          <div 
            className="absolute top-0 right-0 w-80 h-full bg-gray-900 shadow-2xl flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div className="flex items-center gap-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
                />
                <div>
                  <div className="text-white font-semibold">{user.name}</div>
                  <div className="text-gray-400 text-sm">{user.role}</div>
                </div>
              </div>
              <button 
                onClick={() => setMenuOpen(false)} 
                className="text-gray-400 hover:text-red-400 p-2 rounded-lg transition-colors"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
            
            <nav className="flex-1 p-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActiveRoute(item.to)
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>

            <div className="p-4 border-t border-gray-700 space-y-2">
              <button onClick={() => handleMobileMenuLinkClick('/customer/profile')} className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-all duration-200 w-full text-left">
                <FiUser className="text-lg" />
                <span className="font-medium">View Profile</span>
              </button>
              <button onClick={() => handleMobileMenuLinkClick('/settings')} className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-all duration-200 w-full text-left">
                <FiSettings className="text-lg" />
                <span className="font-medium">Settings</span>
              </button>
              <button
                onClick={() => { 
                  setMenuOpen(false); 
                  setShowLogoutConfirm(true); 
                }}
                className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition-all duration-200 w-full text-left"
              >
                <FiLogOut className="w-4 h-4" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search overlay */}
      {showSearch && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-start justify-center pt-20">
          <div className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl mx-4 p-6">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="flex items-center gap-3">
                <FiSearch className="text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search posts, people, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-lg"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowSearch(false)}
                  className="text-gray-400 hover:text-white p-2 rounded-lg transition-colors"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              <div className="text-sm text-gray-400">
                Press Enter to search or Escape to close
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Logout confirmation dialog */}
      {showLogoutConfirm && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
          onClick={() => setShowLogoutConfirm(false)}
        >
          <div 
            className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 w-full max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Sign Out</h3>
              <p className="text-gray-400 mb-6">Are you sure you want to sign out?</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-600/50 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {isLoggingOut ? 'Signing out...' : 'Sign Out'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notification toast */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      {/* Main navbar */}
      <header className="fixed top-0 left-0 w-full h-16 z-40 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700/50 shadow-lg">
        <div className="flex items-center justify-between h-full px-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                SocialApp
              </span>
            </Link>

            {!isMobile && (
              <nav className="flex items-center gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                      isActiveRoute(item.to)
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium hidden lg:block">{item.label}</span>
                  </Link>
                ))}
              </nav>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSearch(true)}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200"
              aria-label="Search"
            >
              <FiSearch className="w-5 h-5" />
            </button>

            <div className="relative">
              <button
                ref={notificationButtonRef}
                onClick={() => setShowNotifications(prev => !prev)}
                className={`p-2 rounded-lg transition-all duration-200 relative ${
                  showNotifications 
                    ? 'text-blue-400 bg-blue-500/10' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
                aria-label="Notifications"
              >
                <FiBell className="w-5 h-5" />
                {getNotificationList().length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {getNotificationList().length}
                  </span>
                )}
              </button>
      {showNotifications && (
                <div ref={notificationMenuRef} className="absolute top-14 right-0 z-50 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl w-80 max-w-[calc(100vw-2rem)]">
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Notifications</h3>
              <button 
                onClick={() => setShowNotifications(false)} 
                className="text-gray-400 hover:text-white p-1 rounded transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent hover:scrollbar-thumb-gray-500">
            {getNotificationList().length === 0 ? (
              <div className="p-6 text-center text-gray-400">
                <FiBell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No notifications yet</p>
              </div>
            ) : (
              <div className="p-2">
                {getNotificationList().map((n, idx) => (
                  <div key={idx} className="p-3 hover:bg-gray-700/50 rounded-lg transition-colors">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                        <p className="text-white text-sm truncate">{n.message}</p>
                      </div>
                      {n.type && (
                        <span className={`px-2 py-1 text-xs rounded-full flex-shrink-0 ${
                          n.type === 'success' ? 'bg-green-500/20 text-green-400' : 
                          n.type === 'error' ? 'bg-red-500/20 text-red-400' : 
                          n.type === 'warning' ? 'bg-yellow-500/20 text-yellow-400' : 
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {n.type.charAt(0).toUpperCase() + n.type.slice(1)}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
          </div>
          
            <div className="relative">
              <button
                ref={userMenuButtonRef}
                onClick={() => setShowUserMenu(prev => !prev)}
              className="flex items-center gap-2 p-1 rounded-lg transition-all duration-200 hover:bg-gray-800"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover border-2 border-gray-600"
              />
              </button>
              {showUserMenu && (
                <div ref={userMenuRef} className="absolute top-14 right-0 z-50 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl w-64">
                  <div className="p-4 border-b border-gray-700">
                    <div className="font-semibold text-white">{user.name}</div>
                    <div className="text-sm text-gray-400">{user.email}</div>
                  </div>
                  <div className="p-2">
                    <button onClick={() => handleMenuLinkClick('/customer/profile')} className="flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                      <FiUser className="w-4 h-4" />
                      <span>View Profile</span>
                    </button>
                    <button onClick={() => handleMenuLinkClick('/settings')} className="flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                      <FiSettings className="w-4 h-4" />
                      <span>Settings</span>
                    </button>
                  </div>
                  <div className="p-2 border-t border-gray-700">
                    <button onClick={() => setShowLogoutConfirm(true)} className="flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors">
                      <FiLogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {isMobile && (
              <button
                onClick={() => setMenuOpen(true)}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200"
                aria-label="Open menu"
              >
                <FiMenu className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
