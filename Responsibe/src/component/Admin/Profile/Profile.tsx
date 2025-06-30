import BackButton from "../BackButton";
import Sidebar from "../Sidebar/Sidebar";

const Profile = () => {
  // Dummy user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://i.pravatar.cc/100?img=3",
    role: "Administrator",
    phone: "+1 555-123-4567",
    location: "San Francisco, CA, USA",
    joined: "2022-01-15",
    bio: "Building the next-gen social platform. Passionate about tech, coffee, and community."
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className="flex flex-1 flex-col items-center justify-center pt-8">
        <BackButton className="mb-8 self-start ml-8" />
        <div className="flex flex-row gap-8 w-full max-w-5xl">
          {/* Profile Card */}
          <div className="bg-gray-800 dark:bg-gray-900 rounded-xl shadow-2xl p-8 w-full max-w-md flex flex-col items-center border border-gray-700">
            <img
              src={user.avatar}
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-blue-500 shadow-lg mb-4"
            />
            <h2 className="text-3xl font-extrabold mb-2 text-white tracking-tight">{user.name}</h2>
            <p className="text-blue-400 mb-1 text-sm font-medium">{user.email}</p>
            <span className="inline-block bg-blue-900 text-blue-300 px-3 py-1 rounded-full text-xs font-semibold mb-2 uppercase tracking-wider">
              {user.role}
            </span>
            <p className="text-gray-400 text-xs mb-2">Joined: {user.joined}</p>
            <p className="text-gray-400 text-xs mb-2">Phone: {user.phone}</p>
            <p className="text-gray-400 text-xs mb-4">Location: {user.location}</p>
            <p className="text-gray-300 italic text-center mb-6">"{user.bio}"</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 mb-2">
              Edit Profile
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-gray-200 font-semibold px-6 py-2 rounded-lg shadow transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-900">
              Change Password
            </button>
          </div>
          {/* Recent Activity */}
          <div className="bg-gray-800 dark:bg-gray-900 rounded-xl shadow-2xl p-8 w-full max-w-md flex flex-col border border-gray-700">
            <h3 className="text-lg font-bold text-white mb-3">Recent Activity</h3>
            <ul className="bg-gray-800 rounded-lg shadow divide-y divide-gray-700 flex-1">
              <li className="px-4 py-3 text-gray-300 flex justify-between items-center">
                <span>Logged in</span>
                <span className="text-xs text-gray-500">2 hours ago</span>
              </li>
              <li className="px-4 py-3 text-gray-300 flex justify-between items-center">
                <span>Updated profile</span>
                <span className="text-xs text-gray-500">1 day ago</span>
              </li>
              <li className="px-4 py-3 text-gray-300 flex justify-between items-center">
                <span>Changed password</span>
                <span className="text-xs text-gray-500">3 days ago</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
