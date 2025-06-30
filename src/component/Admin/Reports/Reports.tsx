import BackButton from "../BackButton";
import Sidebar from "../Sidebar/Sidebar";

const reports = [
  { id: 1, name: "User Growth", type: "User", date: "2025-06-27", status: "Ready" },
  { id: 2, name: "Engagement Overview", type: "Engagement", date: "2025-06-26", status: "Processing" },
  { id: 3, name: "Content Moderation", type: "Moderation", date: "2025-06-25", status: "Ready" },
];

const Reports = () => {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white dark">
      <Sidebar />
      <main className="flex-1 p-8">
        <BackButton className="mb-6" />
        <h2 className="text-3xl font-bold mb-8 text-white">Reports & Analytics</h2>
        <div className="bg-gray-800 rounded-xl shadow-lg p-6 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-700">
                <th className="py-3 px-4 text-left text-gray-200 font-semibold">Report Name</th>
                <th className="py-3 px-4 text-left text-gray-200 font-semibold">Type</th>
                <th className="py-3 px-4 text-left text-gray-200 font-semibold">Date</th>
                <th className="py-3 px-4 text-left text-gray-200 font-semibold">Status</th>
                <th className="py-3 px-4 text-left text-gray-200 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id} className="border-b border-gray-700 hover:bg-gray-700 transition">
                  <td className="py-2 px-4 text-gray-100">{report.name}</td>
                  <td className="py-2 px-4 text-gray-300">{report.type}</td>
                  <td className="py-2 px-4 text-gray-300">{report.date}</td>
                  <td className="py-2 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${report.status === "Ready" ? "bg-green-900 text-green-300" : "bg-yellow-900 text-yellow-300"}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 flex gap-2">
                    {report.status === "Ready" && (
                      <>
                        <button className="bg-blue-700 text-white px-3 py-1 rounded hover:bg-blue-800 transition font-semibold">Download</button>
                        <button className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-800 transition font-semibold">View</button>
                      </>
                    )}
                    {report.status === "Processing" && (
                      <span className="text-gray-400">Processing...</span>
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

export default Reports;
