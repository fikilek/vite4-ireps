// npm libraries
import { useContext } from "react";

// css
import "@/components/filters/FilterItemHeading.css";

// contexts
import { FiltersContext } from "@/contexts/FiltersContext";

const FilterItemHeading = (props) => {
	const { title, name, value } = props;

	const { filtersContext } = useContext(FiltersContext);
	// console.log(`filtersContext.dateRange`,filtersContext.dateRange)

	const { dateRange } = filtersContext;

	let checked = null;
	if (dateRange === value) {
		checked = true;
	}

	return (
		<div className="filter-item-heading">
			<p>{title}</p>
			{name === "geographicArea" ? (
				<button>View On Map</button>
			) : (
				<input
					type="radio"
					value={value}
					name={name}
					checked={checked}
					readOnly
				/>
			)}
		</div>
	);
};

export default FilterItemHeading;
