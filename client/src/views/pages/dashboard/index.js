import React, { useState } from "react";
import LineChart from "../../components/LineChart";

export default function Dashboard() {
	const Data = [
		{
			id: 1,
			year: 2016,
			revenue: 80000,
			sales: 823,
		},
		{
			id: 2,
			year: 2017,
			revenue: 45677,
			sales: 345,
		},
		{
			id: 3,
			year: 2018,
			revenue: 78888,
			sales: 555,
		},
		{
			id: 4,
			year: 2019,
			revenue: 90000,
			sales: 4555,
		},
		{
			id: 5,
			year: 2020,
			revenue: 4300,
			sales: 234,
		},
	];

	const [chartData, setChartData] = useState({
		labels: Data.map((item) => item.year),
		datasets: [
			{
				label: "Revenue",
				data: Data.map((item) => item.revenue),
				backgroundColor: "rgba(255, 99, 132, 0.2)",
				borderColor: "rgba(255, 99, 132, 1)",
				borderWidth: 1,
			},
			{
				label: "Sales",
				data: Data.map((item) => item.sales),
				backgroundColor: "rgba(255, 99, 132, 0.2)",
				borderColor: "rgba(255, 99, 132, 1)",
				borderWidth: 1,
			},
		],
	});

	return (
		<div className="px-8 py-4">
			<h3 className="text-2xl text-base-500">Dashboard</h3>
			<div className="py-4 flex gap-2 justify-between">
				<div className="w-3/12 h-32 bg-base-100 rounded-lg p-4 shadow-xl flex items-center">
					<div className="flex flex-col w-64 gap-4 truncate">
						<h4 className="text-xl text-base-500">Kas</h4>
						<p className="text-3xl text-base-500">Rp. 200.000</p>
					</div>
				</div>

				<div className="w-3/12 h-32 bg-base-100 rounded-lg p-4 shadow-xl flex items-center">
					<div className="flex flex-col w-64 gap-4 truncate">
						<h4 className="text-xl text-base-500">Total pemasukan</h4>
						<p className="text-3xl text-base-500">Rp. 2.000.000</p>
					</div>
				</div>

				<div className="w-3/12 h-32 bg-base-100 rounded-lg p-4 shadow-xl flex items-center">
					<div className="flex flex-col w-64 gap-4 truncate">
						<h4 className="text-xl text-base-500">Laba</h4>
						<p className="text-3xl text-base-500">Rp. 1.800.000</p>
					</div>
				</div>

				<div className="w-3/12 h-32 bg-base-100 rounded-lg p-4 shadow-xl flex items-center">
					<div className="flex flex-col w-64 gap-4 truncate">
						<h4 className="text-xl text-base-500">Transaksi penjualan</h4>
						<p className="text-3xl text-center text-base-500">0</p>
					</div>
				</div>
			</div>
			<div className="py-4">
				<div className="w-full h-[540px] bg-base-100 rounded-lg p-4 shadow-xl">
					<LineChart data={chartData} />
				</div>
			</div>
		</div>
	);
}
