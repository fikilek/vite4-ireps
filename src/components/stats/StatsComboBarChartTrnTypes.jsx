import { AgCharts } from "ag-charts-react";

import "@/components/stats/StatsComboBarChartTrnTypes.css";

const StatsComboBarChartTrnTypes = (props) => {
	// console.log(`props`, props);

	// get stats from props
	const { statsTrnType, barChartSeries } = props?.stats;

	const options = {
		title: {
			text: "Trn Types",
		},
		subtitle: {
			text: "Transaction Types",
		},
		data: statsTrnType,
		series: barChartSeries,
	};

	return (
		<div className="stats-combo-bar-chart">
			<AgCharts options={options} />
		</div>
	);
};

export default StatsComboBarChartTrnTypes;
