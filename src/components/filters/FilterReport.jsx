// css
import "@/components/filters/FilterReport.css";

// contexts

// components
import FilterReportTypeBtn from "@/components/filters/FilterReportTypeBtn";

const FilterReport = () => {
	return (
		<div className="filter-reports">
			<div className="filter-report-body">
				<FilterReportTypeBtn title="Asts Per User Report" name="users" />
				<FilterReportTypeBtn
					title="Meter Type Per Users Report"
					name="meterType"
				/>
				{/* <FilterReportTypeBtn
					title="Meter Phase Per Users Report"
					name="meterPhase"
				/> */}
				<FilterReportTypeBtn
					title="Anomalies Per Users Report"
					name="anomalies"
				/>
				<FilterReportTypeBtn title="Vending Report" name="vending" />
			</div>
		</div>
	);
};

export default FilterReport;
