import BackButton from "../BackButton";
import Sidebar from "../Sidebar/Sidebar";

const logs = [
  { id: 1, user: "Alice Johnson", action: "Login", date: "2025-06-27 10:15", status: "Success" },
  { id: 2, user: "Bob Smith", action: "Deleted Post", date: "2025-06-27 09:50", status: "Success" },
  { id: 3, user: "Charlie Brown", action: "Failed Login", date: "2025-06-26 22:30", status: "Failed" },
  { id: 4, user: "Alice Johnson", action: "Changed Password", date: "2025-06-26 20:10", status: "Success" },
];

const AuditLogs = () => {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white dark">
      <Sidebar />
      <main className="flex-1 p-8">
        <BackButton className="mb-6" />
        <h2 className="text-3xl font-bold mb-8 text-white">Audit Logs</h2>
        <div className="bg-gray-800 rounded-xl shadow-lg p-6 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-700">
                <th className="py-3 px-4 text-left text-gray-200 font-semibold">User</th>
                <th className="py-3 px-4 text-left text-gray-200 font-semibold">Action</th>
                <th className="py-3 px-4 text-left text-gray-200 font-semibold">Date</th>
                <th className="py-3 px-4 text-left text-gray-200 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="border-b border-gray-700 hover:bg-gray-700 transition">
                  <td className="py-2 px-4 text-gray-100">{log.user}</td>
                  <td className="py-2 px-4 text-gray-300">{log.action}</td>
                  <td className="py-2 px-4 text-gray-300">{log.date}</td>
                  <td className="py-2 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${log.status === "Success" ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"}`}>
                      {log.status}
                    </span>
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

export default AuditLogs;
