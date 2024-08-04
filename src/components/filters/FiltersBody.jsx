
// css
import "@/components/filters/FiltersBody.css";

// components
// import FilterDataFilter from "@/components/filters/FilterDataFilter";
import FilterReports from "@/components/filters/FilterReports";
import FilterDataFilter_ from "./FilterDataFilter_";

const FiltersHeader = props => {
  const { active, irepsKeyItem } = props;
	return (
		<div className="filters-body">
			{/* {active === "dataFilter" ? <FilterDataFilter irepsKeyItem={irepsKeyItem} /> : ""} */}
			{active === "dataFilter" ? <FilterDataFilter_ irepsKeyItem={irepsKeyItem} /> : ""}
			{active === "reports" ? <FilterReports irepsKeyItem={irepsKeyItem} /> : ""}
		</div>
	);
};

export default FiltersHeader;
