
// css
import "@/components/filters/FiltersBody.css";

// components
import FilterActiveArea from "@/components/filters/FilterActiveArea";
import FilterDataFilter from "@/components/filters/FilterDataFilter";
import FilterReports from "@/components/filters/FilterReports";

const FiltersHeader = props => {
  const { active, irepsKeyItem } = props;
	return (
		<div className="filters-body">
			{/* {active === "activeArea" ? <FilterActiveArea irepsKeyItem={irepsKeyItem} /> : ""} */}
			{active === "dataFilter" ? <FilterDataFilter irepsKeyItem={irepsKeyItem} /> : ""}
			{active === "reports" ? <FilterReports irepsKeyItem={irepsKeyItem} /> : ""}
		</div>
	);
};

export default FiltersHeader;
