// css
import "./FilterDataFilterHeader.css";

const FilterDataFilterHeader = props => {
  // console.log(`props`, props)

	const {
		handleGetData,
		filterState,
		erfsFilters,
		setErfsFilters,
		initErfsFilter,
	} = props;

	const handleClick = e => {
		// console.log(`Filter Get Data`);
		handleGetData();
	};

	const filterReset = e => {
    // console.log(`Filter Reset`);
    setErfsFilters(initErfsFilter);
	};

	return (
		<div className="filter-data-filter-header">
			<button className="get-data-btn" onClick={handleClick}>
				Get Data
			</button>
			<button className="filter-sate">Filter State</button>
			<button className="clear-filters" onClick={filterReset}>
				Reset
			</button>
		</div>
	);
};

export default FilterDataFilterHeader;
