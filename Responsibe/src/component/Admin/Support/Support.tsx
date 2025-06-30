import BackButton from "../BackButton";
import Sidebar from "../Sidebar/Sidebar";
import { useState } from "react";

const faqs = [
	"How do I reset my password?",
	"How can I contact support?",
	"Where can I find the user guide?",
];

const tickets = [
	{ id: 1, subject: "Login issue", status: "Open", date: "2025-06-27" },
	{
		id: 2,
		subject: "Feature request: Dark mode",
		status: "Closed",
		date: "2025-06-25",
	},
	{
		id: 3,
		subject: "Bug: Notification not working",
		status: "Open",
		date: "2025-06-24",
	},
];

const Support = () => {
	const [search, setSearch] = useState("");

	// Filter tickets by id (as string, includes for partial match)
	const filteredTickets = tickets.filter((ticket) =>
		ticket.id.toString().includes(search)
	);

	return (
		<div className="flex min-h-screen bg-gray-900 text-white dark">
			<Sidebar />
			<main className="flex-1 p-8">
				<BackButton className="mb-6" />
				<h2 className="text-3xl font-bold mb-8 text-white">
					Support & Help Center
				</h2>
				<div className="bg-gray-800 rounded-xl shadow-lg p-6 overflow-x-auto mb-8">
					<div className="mb-4 flex items-center justify-between">
						<input
							type="text"
							placeholder="Search by Ticket ID..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="border border-gray-700 bg-gray-900 text-white rounded px-3 py-2 w-64 focus:outline-none focus:ring focus:ring-blue-700 placeholder-gray-400"
						/>
						<button className="ml-4 bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition font-semibold shadow">
							+ Create Ticket
						</button>
					</div>
					<table className="min-w-full text-sm">
						<thead>
							<tr className="bg-gray-700">
								<th className="py-3 px-4 text-left text-gray-200 font-semibold">
									Ticket ID
								</th>
								<th className="py-3 px-4 text-left text-gray-200 font-semibold">
									Subject
								</th>
								<th className="py-3 px-4 text-left text-gray-200 font-semibold">
									Status
								</th>
								<th className="py-3 px-4 text-left text-gray-200 font-semibold">
									Date
								</th>
								<th className="py-3 px-4 text-left text-gray-200 font-semibold">
									Actions
								</th>
							</tr>
						</thead>
						<tbody>
							{filteredTickets.map((ticket) => (
								<tr
									key={ticket.id}
									className="border-b border-gray-700 hover:bg-gray-700 transition"
								>
									<td className="py-2 px-4 text-gray-100">{ticket.id}</td>
									<td className="py-2 px-4 text-gray-300">
										{ticket.subject}
									</td>
									<td className="py-2 px-4">
										<span
											className={`px-2 py-1 rounded text-xs font-semibold ${
												ticket.status === "Open"
													? "bg-yellow-900 text-yellow-300"
													: "bg-green-900 text-green-300"
											}`}
										>
											{ticket.status}
										</span>
									</td>
									<td className="py-2 px-4 text-gray-300">
										{ticket.date}
									</td>
									<td className="py-2 px-4 flex gap-2">
										<button className="bg-blue-700 text-white px-3 py-1 rounded hover:bg-blue-800 transition font-semibold">
											View
										</button>
										{ticket.status === "Open" && (
											<button className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-800 transition font-semibold">
												Close
											</button>
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div className="bg-gray-800 rounded-xl shadow-lg p-6 max-w-2xl">
					<h3 className="text-lg font-semibold mb-4 text-white">FAQs</h3>
					<ul className="list-disc pl-6 text-gray-300 space-y-2">
						{faqs.map((faq, idx) => (
							<li key={idx}>{faq}</li>
						))}
					</ul>
				</div>
			</main>
		</div>
	);
};

export default Support;
