// css
import "@/components/filters/FilterReport.css";

// contexts

// components
import FilterReportTypeBtn from "@/components/filters/FilterReportTypeBtn";

const FilterReport = () => {
	return (
		<div className="filter-reports">
			<div className="filter-report-body">
				<FilterReportTypeBtn title="Users Report" name="users" />
				<FilterReportTypeBtn title="Anomalies Report" name="anomalies" />
				<FilterReportTypeBtn title="Vending Report" name="vending" />
			</div>
		</div>
	);
};

export default FilterReport;
