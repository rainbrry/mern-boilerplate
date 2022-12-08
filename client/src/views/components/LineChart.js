import React from "react";
import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";

export default function LineChart({ data }) {
	Chart.register(CategoryScale);

	return (
		<div className="chart-container">
			<h2 className="text-xl font-semibold">Line chart</h2>
			<Line style={{ maxHeight: "480px" }} data={data} />
		</div>
	);
}
