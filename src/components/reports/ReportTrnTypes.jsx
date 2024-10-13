// npm libraries
import { useContext, useRef } from "react";

import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import { CsvExportModule } from "@ag-grid-community/csv-export";

ModuleRegistry.registerModules([ClientSideRowModelModule]);
ModuleRegistry.registerModules([CsvExportModule]);

import "@/components/reports/ReportTrnTypes.css";

// contexts
import { TrnsStatsContext } from "@/contexts/TrnsStatsContext";

import ReportHeading from "@/components/reports/ReportHeading";
import StatsCombo50_50 from "@/components/stats/StatsCombo50_50";
// import StatsComboPieChart from "@/components/stats/StatsComboPieChart";
import StatsCard from "@/components/stats/StatsCard";
import StatsComboTableTrnTypes from "@/components/stats/StatsComboTableTrnTypes";
import StatsComboBarChartTrnTypes from "@/components/stats/StatsComboBarChartTrnTypes";

import { capitalizeInitialsString } from "@/utils/utils";

const ReportTrnTypes = () => {
	const { trnsStatsContext } = useContext(TrnsStatsContext);
	// console.log(`trnsStatsContext`, trnsStatsContext);

	const tableRef = useRef();

	const { trnTypePerUserStats, statsTrnType } = trnsStatsContext;
	// console.log(`trnTypePerUserStats`, trnTypePerUserStats);
	// console.log(`statsTrnType`, statsTrnType);

	const barChartSeries = [
		{ type: "bar", xKey: "trntype", yKey: "quantity", yName: "Trn Type" },
	];

	// console.log(`barChartSeries`, barChartSeries);
	// console.log(`trnTypeData`, trnTypeData);

	const statsData = {
		statsTrnType,
		barChartSeries,
	};

	const statsName = "Trn Type Summary";

	const handleClick = (e) => {
		console.log(`export btn clicked`, e.target.value);
		console.log(`tableRef`, tableRef);
		tableRef.current?.api?.exportDataAsCsv();
	};

	const headerDataGeneric = {
		hl1: "hl1",
		hl2: "",
		hr1: " ",
		hr2: (
			<>
				<button onClick={handleClick} className="stats-btn stats-btn-export">
					Export
				</button>{" "}
				<button className="stats-btn stats-btn-pdf">Pdf</button>
			</>
		),
	};

	return (
		<div className={`report-trn-types`}>
			<ReportHeading title="Trn Type Stats" />
			<div className="tts-body">
				<StatsCombo50_50 statsName="Trn Types">
					<StatsCard
						statsName={`${statsName}`}
						stats={statsData}
						headerData={headerDataGeneric}
						tableRef={tableRef}
					>
						<StatsComboTableTrnTypes stats={statsTrnType} tableRef={tableRef} />
					</StatsCard>

					<StatsCard
						statsName={`${statsName}`}
						stats={statsData}
						headerData={headerDataGeneric}
						tableRef={tableRef}
					>
						<StatsComboBarChartTrnTypes stats={statsData} />
					</StatsCard>
				</StatsCombo50_50>
			</div>
		</div>
	);
};

export default ReportTrnTypes;
