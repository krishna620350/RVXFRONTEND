import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./component/auth/Login";
import Register from "./component/auth/Register";
import Dashboard from "./component/Admin/Dashboard";
import Profile from "./component/Admin/Profile/Profile";
import AnalyticsDashboard from "./component/Admin/Analytics/AnalyticsDashboard";
import UserManagement from "./component/Admin/Users/UserManagement";
import ModerationPanel from "./component/Admin/Moderation/ModerationPanel";
import Reports from "./component/Admin/Reports/Reports";
import Settings from "./component/Admin/Settings/Settings";
import AuditLogs from "./component/Admin/AuditLogs/AuditLogs";
import Support from "./component/Admin/Support/Support";
import RequireAuth from "./component/auth/RequireAuth";
import Layout from "./component/Customer/Layout/Layout";
import Home from "./component/Customer/Layout/Home";
import React from "react";
import ChatWindow from "./component/Customer/Chats/ChatWindow";
import CreatePost from "./component/Customer/Posts/CreatePost/CreatePost";

const NotAuthorized = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
    <h1 className="text-2xl font-bold">You are not authorized for this route.</h1>
  </div>
);

function AdminRoute({ children }: { children: React.ReactNode }) {
  // Replace this with your actual admin check logic
  const role = localStorage.getItem("role") || "null"
  if (role && role === "admin") {
    return <>{children}</>;
  }
  return <NotAuthorized />;
}

function AppRoutes() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };
  const backgroundLocation = state && state.backgroundLocation;

  return (
    <>
      {/* Always render the background routes */}
      <Routes location={backgroundLocation || location}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<RequireAuth><ChatWindow /></RequireAuth>} />
        <Route path="/layout" element={<RequireAuth><Layout /></RequireAuth>} />
        <Route path="/*" element={<RequireAuth><Home /></RequireAuth>} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <AdminRoute>
              <Profile />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/analytics"
          element={
            <AdminRoute>
              <AnalyticsDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <UserManagement />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/moderation"
          element={
            <AdminRoute>
              <ModerationPanel />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <AdminRoute>
              <Reports />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <AdminRoute>
              <Settings />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/audit-logs"
          element={
            <AdminRoute>
              <AuditLogs />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/support"
          element={
            <AdminRoute>
              <Support />
            </AdminRoute>
          }
        />
        <Route path="*" element={<NotAuthorized />} />
      </Routes>
      {/* Modal overlay for /post, rendered OUTSIDE of <Routes> */}
      {location.pathname === "/post" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="relative w-full max-w-xl mx-auto">
            <button
              className="absolute top-2 right-2 z-10 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700"
              onClick={() => window.history.back()}
              aria-label="Close"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
            <RequireAuth>
              <CreatePost />
            </RequireAuth>
          </div>
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
