import Sidebar from "../Sidebar/Sidebar";
import BackButton from "../BackButton";

const reports = [
  { id: 1, user: "Alice Johnson", type: "Post", content: "This is a reported post.", status: "Pending", date: "2025-06-27" },
  { id: 2, user: "Bob Smith", type: "Comment", content: "This comment violates guidelines.", status: "Resolved", date: "2025-06-26" },
  { id: 3, user: "Charlie Brown", type: "Post", content: "Spam content detected.", status: "Pending", date: "2025-06-25" },
];

const ModerationPanel = () => {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white dark">
      <Sidebar />
      <main className="flex-1 p-8">
        <BackButton className="mb-6" />
        <h2 className="text-3xl font-bold mb-8 text-white">Content Moderation</h2>
        <div className="bg-gray-800 rounded-xl shadow-lg p-6 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-700">
                <th className="py-3 px-4 text-left text-gray-200 font-semibold">User</th>
                <th className="py-3 px-4 text-left text-gray-200 font-semibold">Type</th>
                <th className="py-3 px-4 text-left text-gray-200 font-semibold">Content</th>
                <th className="py-3 px-4 text-left text-gray-200 font-semibold">Date</th>
                <th className="py-3 px-4 text-left text-gray-200 font-semibold">Status</th>
                <th className="py-3 px-4 text-left text-gray-200 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id} className="border-b border-gray-700 hover:bg-gray-700 transition">
                  <td className="py-2 px-4 text-gray-100">{report.user}</td>
                  <td className="py-2 px-4 text-gray-300">{report.type}</td>
                  <td className="py-2 px-4 text-gray-300 max-w-xs truncate" title={report.content}>{report.content}</td>
                  <td className="py-2 px-4 text-gray-300">{report.date}</td>
                  <td className="py-2 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${report.status === "Pending" ? "bg-yellow-900 text-yellow-300" : "bg-green-900 text-green-300"}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 flex gap-2">
                    {report.status === "Pending" && (
                      <>
                        <button className="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-800 transition font-semibold">Approve</button>
                        <button className="bg-red-700 text-white px-3 py-1 rounded hover:bg-red-800 transition font-semibold">Reject</button>
                      </>
                    )}
                    {report.status === "Resolved" && (
                      <span className="text-gray-400">No actions</span>
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

export default ModerationPanel;
