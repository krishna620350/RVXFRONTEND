import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Home from "./Home";

interface Profile {
  id: number;
  name: string;
  subtitle: string;
  avatar: string;
  status?: 'online' | 'offline' | 'away' | 'busy';
  role?: string;
  location?: string;
  verified?: boolean;
  lastSeen?: string;
}

const mockProfiles: Profile[] = [
  { 
    id: 1, 
    name: "Alice Johnson", 
    subtitle: "@alice", 
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    status: 'online',
    role: 'Software Engineer',
    location: 'San Francisco, CA',
    verified: true,
    lastSeen: '2 minutes ago'
  },
  { 
    id: 2, 
    name: "Bob Smith", 
    subtitle: "@bob", 
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    status: 'away',
    role: 'Product Manager',
    location: 'New York, NY',
    verified: false,
    lastSeen: '1 hour ago'
  },
  { 
    id: 3, 
    name: "Carol Lee", 
    subtitle: "@carol", 
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    status: 'online',
    role: 'UX Designer',
    location: 'Seattle, WA',
    verified: true,
    lastSeen: '5 minutes ago'
  },
  { 
    id: 4, 
    name: "David Kim", 
    subtitle: "@david", 
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    status: 'offline',
    role: 'Data Scientist',
    location: 'Austin, TX',
    verified: false,
    lastSeen: '3 hours ago'
  },
];

const LoadingSkeleton: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
    {/* Loading navbar skeleton */}
    <div className="fixed top-0 left-0 w-full h-16 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700/50 shadow-lg z-40">
      <div className="flex items-center justify-between h-full px-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-600 rounded-lg animate-pulse"></div>
          <div className="w-24 h-6 bg-gray-600 rounded animate-pulse"></div>
        </div>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-8 h-8 bg-gray-600 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    </div>

    {/* Loading content skeleton */}
    <div className="pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Profile header skeleton */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gray-600 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gray-600 rounded-full animate-pulse"></div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-32 h-5 bg-gray-600 rounded animate-pulse"></div>
                  <div className="w-4 h-4 bg-gray-600 rounded-full animate-pulse"></div>
                </div>
                <div className="w-24 h-4 bg-gray-600 rounded animate-pulse mb-1"></div>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-3 bg-gray-600 rounded animate-pulse"></div>
                  <div className="w-20 h-3 bg-gray-600 rounded animate-pulse"></div>
                  <div className="w-24 h-3 bg-gray-600 rounded animate-pulse"></div>
                </div>
              </div>
              <div className="w-20 h-8 bg-gray-600 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Posts skeleton */}
        <div className="max-w-2xl mx-auto space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 animate-pulse">
              <div className="flex items-start gap-4 mb-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-gray-600 rounded-full"></div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gray-600 rounded-full"></div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-24 h-4 bg-gray-600 rounded"></div>
                    <div className="w-16 h-3 bg-gray-600 rounded"></div>
                  </div>
                  <div className="w-full h-4 bg-gray-600 rounded mb-2"></div>
                  <div className="w-3/4 h-4 bg-gray-600 rounded"></div>
                </div>
                <div className="w-6 h-6 bg-gray-600 rounded"></div>
              </div>
              <div className="space-y-2">
                <div className="w-full h-4 bg-gray-600 rounded"></div>
                <div className="w-5/6 h-4 bg-gray-600 rounded"></div>
                <div className="w-4/6 h-4 bg-gray-600 rounded"></div>
              </div>
              <div className="flex items-center gap-6 mt-6 pt-4 border-t border-gray-700/50">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-gray-600 rounded"></div>
                    <div className="w-8 h-4 bg-gray-600 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Loading overlay */}
    <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-white mb-2">Loading your social feed</h2>
        <p className="text-gray-400">Preparing your personalized experience...</p>
      </div>
    </div>
  </div>
);

const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasError] = useState(false);

  if (hasError) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Something went wrong</h2>
          <p className="text-gray-400 mb-4">We're having trouble loading your content</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

const Layout: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Simulate loading time and potential API calls
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Check if user is authenticated using cookies
        const cookies = document.cookie.split(';').reduce((acc, cookie) => {
          const [key, value] = cookie.trim().split('=');
          acc[key] = value;
          return acc;
        }, {} as { [key: string]: string });
        
        const token = cookies.token || cookies.authToken || cookies.sessionToken;
        if (!token) {
          navigate('/login', { replace: true });
          return;
        }

        // Simulate profile data loading
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setLoading(false);
        navigate("/", { replace: true, state: { profiles: mockProfiles } });
      } catch {
        setError('Failed to load application data');
        setLoading(false);
      }
    };

    initializeApp();
  }, [navigate]);

  // Handle error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Connection Error</h2>
          <p className="text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Show loading skeleton
  if (loading) {
    return <LoadingSkeleton />;
  }

  // Render main content
  return (
    <ErrorBoundary>
      <Home profiles={mockProfiles} />
    </ErrorBoundary>
  );
};

export default Layout;
