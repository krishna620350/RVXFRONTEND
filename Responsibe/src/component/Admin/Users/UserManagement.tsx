import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import BackButton from "../BackButton";
import { mockUsers } from "../../../tests/users/mockUsers";
import Pagination from "../utility/Pagination";
import { Line } from "react-chartjs-2";

const USERS_PER_PAGE = 6;

// Calculate users created per month for the last 12 months
const months = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];
const now = new Date();
const last12Months = Array.from({ length: 12 }).map((_, i) => {
	const d = new Date(now.getFullYear(), now.getMonth() - (11 - i), 1);
	return {
		label: months[d.getMonth()] + " '" + String(d.getFullYear()).slice(-2),
		year: d.getFullYear(),
		month: d.getMonth(),
	};
});
const userCountsByMonth = last12Months.map(({ year, month }) =>
	mockUsers.filter((u) => {
		const created = new Date(u.createdAt);
		return (
			created.getFullYear() === year && created.getMonth() === month
		);
	}).length
);

const UserManagement = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [search, setSearch] = useState("");

	const filteredUsers = mockUsers.filter(
		(user) =>
			user.name.toLowerCase().includes(search.toLowerCase()) ||
			user.email.toLowerCase().includes(search.toLowerCase())
	);

	const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
	const startIdx = (currentPage - 1) * USERS_PER_PAGE;
	const endIdx = startIdx + USERS_PER_PAGE;
	const usersToShow = filteredUsers.slice(startIdx, endIdx);

	React.useEffect(() => {
		setCurrentPage(1);
	}, [search]);

	const chartData = {
		labels: last12Months.map((m) => m.label),
		datasets: [
			{
				label: "Users Created",
				data: userCountsByMonth,
				borderColor: "#3b82f6",
				backgroundColor: "rgba(59,130,246,0.2)",
				tension: 0.4,
				fill: true,
				pointRadius: 2,
			},
		],
	};
	const chartOptions = {
		responsive: true,
		plugins: {
			legend: { display: false },
			tooltip: { enabled: true },
		},
		scales: {
			x: { ticks: { color: "#ccc", font: { size: 10 } } },
			y: { display: false },
		},
	};

	return (
		<div className="flex min-h-screen bg-gray-900 text-white dark">
			<Sidebar />
			<main className="flex-1 p-8">
				<BackButton className="mb-6" />
				<div className="flex items-center justify-between mb-8 mt-0">
					<div className="flex items-center gap-6">
						<h2 className="text-3xl font-bold text-white mb-0">
							User Management
						</h2>
						<span className="text-base font-medium bg-blue-800 text-blue-200 rounded px-3 py-2 ml-2">
							Total Users: {mockUsers.length}
						</span>
						<button className="ml-2 bg-blue-700 text-white px-3 py-2 rounded hover:bg-blue-800 transition font-semibold shadow text-sm">
							+ Add User
						</button>
					</div>
				</div>
				<div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
					<input
						type="text"
						placeholder="Search by name or email..."
						className="border border-gray-700 bg-gray-800 text-white rounded px-3 py-2 w-64 focus:outline-none focus:ring focus:ring-blue-700 placeholder-gray-400"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>
				<div className="bg-gray-800 rounded-xl shadow-lg p-6 overflow-x-auto">
					<table className="min-w-full text-sm">
						<thead>
							<tr className="bg-gray-700">
								<th className="py-3 px-4 text-left text-gray-200 font-semibold">
									Name
								</th>
								<th className="py-3 px-4 text-left text-gray-200 font-semibold">
									Email
								</th>
								<th className="py-3 px-4 text-left text-gray-200 font-semibold">
									Role
								</th>
								<th className="py-3 px-4 text-left text-gray-200 font-semibold">
									Status
								</th>
								<th className="py-3 px-4 text-left text-gray-200 font-semibold">
									Actions
								</th>
							</tr>
						</thead>
						<tbody>
							{usersToShow.map((user) => (
								<tr
									key={user.id}
									className="border-b border-gray-700 hover:bg-gray-700 transition"
								>
									<td className="py-2 px-4 flex items-center gap-3">
										<span className="inline-block w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
											{user.name[0]}
										</span>
										<span>{user.name}</span>
									</td>
									<td className="py-2 px-4 text-gray-300">
										{user.email}
									</td>
									<td className="py-2 px-4 text-gray-300">
										{user.role}
									</td>
									<td className="py-2 px-4">
										<span
											className={`px-2 py-1 rounded text-xs font-semibold ${
												user.status === "Active"
													? "bg-green-900 text-green-300"
													: "bg-red-900 text-red-300"
											}`}
										>
											{user.status}
										</span>
									</td>
									<td className="py-2 px-4 flex gap-2">
										<button className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700 transition font-semibold">
											Edit
										</button>
										<button className="bg-red-700 text-white px-3 py-1 rounded hover:bg-red-800 transition font-semibold">
											Delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={setCurrentPage}
					/>
				</div>
				{/* Line graph widget fixed at top right of the screen */}
				<div className="fixed top-4 right-4 bg-gray-800 rounded-xl shadow-lg p-4 flex flex-col items-center w-[400px] z-50">
					<span className="text-base font-semibold mb-2">
						Users Created (Last 12 Months)
					</span>
					<div className="w-full h-28">
						<Line data={chartData} options={chartOptions} height={80} />
					</div>
				</div>
			</main>
		</div>
	);
};

export default UserManagement;
