// npm libraries
import { useContext } from "react";

import "@/components/reports/ReportAstsAnomalies.css";

// contexts
import { FiltersContext } from "@/contexts/FiltersContext";

import ReportHeading from "@/components/reports/ReportHeading";

const ReportAnomalies = () => {
	const { filtersContext } = useContext(FiltersContext);
	// console.log(`filtersContext`, filtersContext);

	return (
		<div className={`report-asts-anomalies`}>
			<ReportHeading title="Asts - Anomalies  Report" />
			<p>ReportAnomalies</p>
		</div>
	);
};

export default ReportAnomalies;
