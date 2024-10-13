import { useState } from "react";

// css
import "@/components/filters/FiltersTrns.css";

// hooks
// import { useGetTrnsReport } from "@/hooks/useGetTrnsReport";

// context

// components
import FiltersHeader from "@/components/filters/FiltersHeader";
import FilterItem from "@/components/filters/FilterItem";
import FiltersControlBtns from "@/components/filters/FiltersControlBtns";
import FilterReportTypeBtn from "@/components/filters/FilterReportTypeBtn";

const FiltersTrns = (props) => {
	const { irepsKeyItem } = props;
	const [active, setActive] = useState("reportFilters");

	// const { getTrns } = useGetTrnsReport("asts");
	const getTrns = () => {};

	return (
		<div className="filters-trns">
			<FiltersHeader
				active={active}
				setActive={setActive}
				irepsKeyItem={irepsKeyItem}
			/>
			<div className="filters-body">
				{active === "reportFilters" ? (
					<div className="filter-data-filter">
						<div className="filter-items">
							<FilterItem
								title="CreatedAtDatetime"
								name="dateRange"
								value="created"
							>
								{/* <FilterCreatedAtDatetime /> */}
							</FilterItem>

							<FilterItem
								title="UpdatedAtDatetime"
								name="dateRange"
								value="updated"
							>
								{/* <FilterUpdatedAtDatetime /> */}
							</FilterItem>

							<FilterItem title="TrnType" name="trnType" value="trnType">
								{/* <FilterTrnType /> */}
							</FilterItem>

							<FilterItem title="Access" name="trnsAccess" value="trnsAccess">
								{/* <FilterTrnAccess /> */}
							</FilterItem>
						</div>
						<FiltersControlBtns getTrns={getTrns} />
					</div>
				) : (
					""
				)}
				{active === "reportStats" ? (
					<div className="filter-reports">
						<div className="filter-report-body">
							<FilterReportTypeBtn title="Trn Types Stats" name="trnTypes" />
							<FilterReportTypeBtn
								title="Trn Type Per Users Stats"
								name="trnsPerUser"
							/>
						</div>
					</div>
				) : (
					""
				)}
			</div>
		</div>
	);
};

export default FiltersTrns;
