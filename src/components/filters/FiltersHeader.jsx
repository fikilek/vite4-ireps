// css
import "@/components/filters/FiltersHeader.css";

// components
import FilterHeaderBtn from "@/components/filters/FilterHeaderBtn";

const FiltersHeader = props => {
	const { active, setActive } = props;
	return (
		<div className="filters-header">
			<FilterHeaderBtn label="dataFilter" active={active} setActive={setActive} />
			<FilterHeaderBtn label="reports" active={active} setActive={setActive} />
		</div>
	);
};

export default FiltersHeader;
