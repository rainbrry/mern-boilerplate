import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboard } from "../../../redux/features/dashboardSlice";
import { rupiah } from "../../../helpers/currency";
import LineChart from "../../components/LineChart";

export default function Dashboard() {
	const dispatch = useDispatch();
	const dashboard = useSelector((state) => state.dashboard);
	const { revenue, expenses, sales, chart } = dashboard;
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
		dispatch(getDashboard());

		setChartData({
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
	}, [dispatch, chart]);

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
						<p className="text-3xl text-base-500">{rupiah(revenue || 0)}</p>
					</div>
				</div>

				<div className="w-3/12 h-32 bg-base-100 rounded-lg p-4 shadow-xl flex items-center">
					<div className="flex flex-col w-64 gap-4 truncate">
						<h4 className="text-xl text-base-500">Total pengeluaran</h4>
						<p className="text-3xl text-base-500">{rupiah(expenses || 0)}</p>
					</div>
				</div>

				<div className="w-3/12 h-32 bg-base-100 rounded-lg p-4 shadow-xl flex items-center">
					<div className="flex flex-col w-64 gap-4 truncate">
						<h4 className="text-xl text-base-500">Transaksi penjualan</h4>
						<p className="text-3xl text-center text-base-500">{sales}</p>
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
