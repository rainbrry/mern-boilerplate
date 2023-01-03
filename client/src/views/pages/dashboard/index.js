import React, { useEffect, useState } from "react";
import LineChart from "../../components/LineChart";
import { rupiah } from "../../../helpers/currency";
import { useSelector } from "react-redux";
import { useGetDashboardQuery } from "../../../services/api/dashboard";

export default function Dashboard() {
	const { data: dashboard = [], isLoading, isError } = useGetDashboardQuery();
	const { chart } = useSelector((state) => state.chart);

	const [chartData, setChartData] = useState({
		labels: chart.map((item) => item.date),
		datasets: [
			{
				label: "Pemasukan",
				data: chart.map((item) => item.revenue),
				backgroundColor: "rgba(255, 99, 132, 0.2)",
				borderColor: "rgba(255, 99, 132, 1)",
				borderWidth: 1,
			},
		],
	});

	useEffect(() => {
		setChartData({
			labels: chart.map((item) => item.date),
			datasets: [
				{
					label: "Pemasukan",
					data: chart?.map((item) => item.revenue),
					backgroundColor: "rgba(255, 99, 132, 0.2)",
					borderColor: "rgba(255, 99, 132, 1)",
					borderWidth: 1,
				},
			],
		});
	}, [chart]);

	return (
		<div className="px-8 py-4">
			<h3 className="text-2xl text-base-500">Dashboard</h3>
			<div className="py-4 flex gap-2 justify-between">
				<div className="w-3/12 h-32 bg-base-100 rounded-lg p-4 shadow-xl flex items-center hover:bg-yellow-500 hover:text-white transition duration-150">
					<div className="flex flex-col w-64 gap-2 truncate">
						<div className="flex justify-between">
							<h4 className="text-xl text-base-500">Total pemasukan</h4>
							<div className="p-2 rounded-full bg-yellow-500 shadow-xl flex justify-center items-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="white"
									className="w-6 h-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
									/>
								</svg>
							</div>
						</div>
						<p className="text-3xl text-base-500">
							{isLoading ? (
								<span className="text-md font-light">Loading...</span>
							) : (
								<span>{rupiah(dashboard.todaysRevenue)}</span>
							)}
						</p>
					</div>
				</div>

				<div className="w-3/12 h-32 bg-base-100 rounded-lg p-4 shadow-xl flex items-center hover:bg-red-500 hover:text-white transition duration-150">
					<div className="flex flex-col w-64 gap-4 truncate">
						<div className="flex justify-between">
							<h4 className="text-xl text-base-500">Total pengeluaran</h4>
							<div className="p-2 rounded-full bg-red-600 shadow-xl flex justify-center items-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="white"
									className="w-6 h-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
									/>
								</svg>
							</div>
						</div>
						<p className="text-3xl text-base-500">
							{isLoading ? (
								<span className="text-md font-light">Loading...</span>
							) : isError ? (
								0
							) : (
								rupiah(dashboard.todaysExpenses)
							)}
						</p>
					</div>
				</div>

				<div className="w-3/12 h-32 bg-base-100 rounded-lg p-4 shadow-xl flex items-center hover:bg-green-500 hover:text-white transition duration-150">
					<div className="flex flex-col w-64 gap-4 truncate">
						<div className="flex justify-between">
							<h4 className="text-xl text-base-500">Laba Bersih</h4>
							<div className="p-2 rounded-full bg-green-600 shadow-xl flex justify-center items-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="white"
									className="w-6 h-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</div>
						</div>
						<p className="text-3xl text-base-500">
							{isLoading ? (
								<span className="text-md font-light">Loading...</span>
							) : isError ? (
								0
							) : (
								rupiah(dashboard.todaysProfit)
							)}
						</p>
					</div>
				</div>

				<div className="w-3/12 h-32 bg-base-100 rounded-lg p-4 shadow-xl flex items-center hover:bg-cyan-500 hover:text-white transition duration-150">
					<div className="flex flex-col w-64 gap-4 truncate">
						<div className="flex justify-between">
							<h4 className="text-xl text-base-500">Transaksi penjualan</h4>
							<div className="p-2 rounded-full bg-cyan-600 shadow-xl flex justify-center items-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="white"
									className="w-6 h-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
									/>
								</svg>
							</div>
						</div>
						<p className="text-3xl text-center text-base-500">
							{isLoading ? (
								<span className="text-md font-light">Loading...</span>
							) : isError ? (
								0
							) : (
								dashboard.todaysSales
							)}
						</p>
					</div>
				</div>
			</div>
			<div className="py-4">
				<div className="w-full h-[540px] bg-base-100 rounded-lg p-4 shadow-xl">
					{chart.length ? <LineChart data={chartData} /> : <p>Loading...</p>}
				</div>
			</div>
		</div>
	);
}
