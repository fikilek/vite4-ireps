// npm libraries
import { useContext } from "react";

import "@/components/reports/ReportAstsAnomalies.css";

// contexts
import { AstsStatsContext } from "@/contexts/AstsStatsContext";

import ReportHeading from "@/components/reports/ReportHeading";
import StatsCombo from "@/components/stats/StatsCombo";
import StatsComboTableAnomalies from "@/components/stats/StatsComboTableAnomalies";
import StatsComboBarChartAnomalies from "@/components/stats/StatsComboBarChartAnomalies";
import StatsComboPieChart from "@/components/stats/StatsComboPieChart";
import StatsCard from "@/components/stats/StatsCard";

const ReportAnomalies = () => {
	const { astsStatsContext } = useContext(AstsStatsContext);
	// console.log(`astsStatsContext`, astsStatsContext);

	const { anomalyPerUserStats } = astsStatsContext;
	// console.log(`anomalyPerUserStats`, anomalyPerUserStats);

	const statsName = "Anomaly Summary";
	const headerDataGeneric = {
		hl1: "hl1",
		hl2: "",
		hr1: " ",
		hr2: (
			<>
				<button className="stats-btn stats-btn-export">Export</button>{" "}
				<button className="stats-btn stats-btn-pdf">Pdf</button>
			</>
		),
	};

	return (
		<div className={`report-asts-anomalies`}>
			<ReportHeading title="Anomaly Stats" />

			{/* display main anomalies data */}
			<div className="raa-body">
				<StatsCombo statsName="Anomaly Summary">
					<StatsCard
						statsName={statsName}
						stats={anomalyPerUserStats}
						headerData={headerDataGeneric}
					>
						<StatsComboTableAnomalies stats={anomalyPerUserStats} />
					</StatsCard>

					{/* <StatsCard
						statsName={`${statsName} Bar Chart`}
						stats={anomalyPerUserStats}
						headerData={headerDataGeneric}
					>
						<StatsComboBarChartAnomalies stats={anomalyPerUserStats} />
					</StatsCard> */}

					{/* <StatsCard
						statsName={`${statsName} Pie Chart`}
						stats={anomalyPerUserStats}
						headerData={headerDataGeneric}
					>
						<StatsComboPieChart stats={anomalyPerUserStats} />
					</StatsCard> */}
				</StatsCombo>
			</div>
		</div>
	);
};

export default ReportAnomalies;
