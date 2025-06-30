import BackButton from "../BackButton";
import Sidebar from "../Sidebar/Sidebar";

const settings = [
  { id: 1, name: "Enable Dark Mode", type: "toggle", value: true },
  { id: 2, name: "Email Notifications", type: "toggle", value: false },
  { id: 3, name: "Integrate Slack", type: "integration", value: "Connected" },
  { id: 4, name: "API Access", type: "integration", value: "Enabled" },
];

const Settings = () => {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white dark">
      <Sidebar />
      <main className="flex-1 p-8">
        <BackButton className="mb-6" />
        <h2 className="text-3xl font-bold mb-8 text-white">Platform Settings</h2>
        <div className="bg-gray-800 rounded-xl shadow-lg p-6 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-700">
                <th className="py-3 px-4 text-left text-gray-200 font-semibold">Setting</th>
                <th className="py-3 px-4 text-left text-gray-200 font-semibold">Type</th>
                <th className="py-3 px-4 text-left text-gray-200 font-semibold">Value</th>
                <th className="py-3 px-4 text-left text-gray-200 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {settings.map((setting) => (
                <tr key={setting.id} className="border-b border-gray-700 hover:bg-gray-700 transition">
                  <td className="py-2 px-4 text-gray-100">{setting.name}</td>
                  <td className="py-2 px-4 text-gray-300 capitalize">{setting.type}</td>
                  <td className="py-2 px-4 text-gray-300">
                    {setting.type === "toggle" ? (
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${setting.value ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"}`}>
                        {setting.value ? "Enabled" : "Disabled"}
                      </span>
                    ) : (
                      <span className="px-2 py-1 rounded text-xs font-semibold bg-blue-900 text-blue-300">
                        {setting.value}
                      </span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {setting.type === "toggle" ? (
                      <button className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-800 transition font-semibold">
                        Toggle
                      </button>
                    ) : (
                      <button className="bg-blue-700 text-white px-3 py-1 rounded hover:bg-blue-800 transition font-semibold">
                        Manage
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Settings;
