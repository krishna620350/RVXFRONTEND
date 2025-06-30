import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import Sidebar from "../Sidebar/Sidebar";

const userGrowthData = [
  { month: "Jan", users: 1200 },
  { month: "Feb", users: 1400 },
  { month: "Mar", users: 1700 },
  { month: "Apr", users: 2100 },
  { month: "May", users: 2350 },
  { month: "Jun", users: 2600 },
];

const engagementData = [
  { week: "W1", rate: 3.8 },
  { week: "W2", rate: 4.1 },
  { week: "W3", rate: 4.3 },
  { week: "W4", rate: 4.2 },
];

const activeUsersData = [
  { hour: "8am", users: 800 },
  { hour: "10am", users: 950 },
  { hour: "12pm", users: 1100 },
  { hour: "2pm", users: 1234 },
  { hour: "4pm", users: 1200 },
];

const postsCommentsData = [
  { day: "Mon", posts: 120, comments: 300 },
  { day: "Tue", posts: 140, comments: 320 },
  { day: "Wed", posts: 160, comments: 350 },
  { day: "Thu", posts: 180, comments: 370 },
  { day: "Fri", posts: 200, comments: 400 },
  { day: "Sat", posts: 220, comments: 420 },
  { day: "Sun", posts: 210, comments: 410 },
];

const AnalyticsDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 md:p-8 flex flex-col items-center">
        <div className="w-full max-w-5xl">
          <h2 className="text-3xl font-bold mb-8 text-white">Analytics Overview</h2>
          {/* Responsive: 1 card per row on small, 2 per row on md+; cards fit screen */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-6 w-full">
            <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700 flex flex-col items-center w-full">
              <span className="text-blue-400 font-semibold mb-2">User Growth</span>
              <div className="w-full h-32 bg-gray-700 rounded mb-2 flex items-center justify-center">
                <ResponsiveContainer width="100%" height={100}>
                  <LineChart data={userGrowthData} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
                    <XAxis dataKey="month" stroke="#a3a3a3" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis hide />
                    <Tooltip contentStyle={{ background: '#222', border: 'none', color: '#fff' }} />
                    <Line type="monotone" dataKey="users" stroke="#60a5fa" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-gray-300 text-sm">+12% this month</p>
            </div>
            <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700 flex flex-col items-center w-full">
              <span className="text-green-400 font-semibold mb-2">Engagement Rate</span>
              <div className="w-full h-32 bg-gray-700 rounded mb-2 flex items-center justify-center">
                <ResponsiveContainer width="100%" height={100}>
                  <LineChart data={engagementData} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
                    <XAxis dataKey="week" stroke="#a3a3a3" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis hide />
                    <Tooltip contentStyle={{ background: '#222', border: 'none', color: '#fff' }} />
                    <Line type="monotone" dataKey="rate" stroke="#34d399" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-gray-300 text-sm">Avg. 4.2 interactions/user</p>
            </div>
            <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700 flex flex-col items-center w-full">
              <span className="text-yellow-400 font-semibold mb-2">Active Users</span>
              <div className="w-full h-32 bg-gray-700 rounded mb-2 flex items-center justify-center">
                <ResponsiveContainer width="100%" height={100}>
                  <BarChart data={activeUsersData} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
                    <XAxis dataKey="hour" stroke="#a3a3a3" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis hide />
                    <Tooltip contentStyle={{ background: '#222', border: 'none', color: '#fff' }} />
                    <Bar dataKey="users" fill="#facc15" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-gray-300 text-sm">1,234 online now</p>
            </div>
            <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700 flex flex-col items-center w-full">
              <span className="text-pink-400 font-semibold mb-2">Posts/Comments</span>
              <div className="w-full h-32 bg-gray-700 rounded mb-2 flex items-center justify-center">
                <ResponsiveContainer width="100%" height={100}>
                  <BarChart data={postsCommentsData} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
                    <XAxis dataKey="day" stroke="#a3a3a3" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis hide />
                    <Tooltip contentStyle={{ background: '#222', border: 'none', color: '#fff' }} />
                    <Bar dataKey="posts" fill="#f472b6" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="comments" fill="#818cf8" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-gray-300 text-sm">+8% new posts this week</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
