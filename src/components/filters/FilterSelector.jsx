import Select from "react-select";

// css
import "@/components/filters/FilterSelector.css";

const FilterSelector = props => {
	const { label, value, erfsFilters, setErfsFilters, options } = props;
	// console.log(`props`, props)
	const setSelectedOption = e => {
		// console.log(`e`, e);
		setErfsFilters({
			...erfsFilters,
			[label]: e,
		});
	};

	const clearValue = e => {
		return null
	}
	return (
		<div id={label} className="filter-selector">
			<p>{label}</p>
			<Select
				options={options}
				isClearable={true}
				onChange={setSelectedOption}
				// clearValue={clearValue}
				value={value}
			/>
		</div>
	);
};

export default FilterSelector;
