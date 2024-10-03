// npm
import { useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// css
import "@/components/filters/FilterUpdatedAtDatetime.css";

// contexts
import { FiltersContext } from "@/contexts/FiltersContext";

const FilterUpdatedAtDatetime = () => {
	const { filtersContext, setFiltersContext } = useContext(FiltersContext);
	// console.log(`filtersContext`,filtersContext)

	const [startDate, endDate] = filtersContext.updatedAtDatetimeRange;
	// console.log(`startDate`,startDate)
	// console.log(`endDate`,endDate)

	const handleChange = (update) => {
		// console.log(`update`, update);

		setFiltersContext({
			...filtersContext,
			updatedAtDatetimeRange: update,
			createdAtDatetimeRange: [null, null],
		});
	};

	return (
		<div className="filter-updated-at-datetime">
			<DatePicker
				selectsRange={true}
				startDate={startDate}
				endDate={endDate}
				onChange={handleChange}
				isClearable={true}
				// maxDate={new Date()}
				placeholderText="Select Filter"
			/>
		</div>
	);
};

export default FilterUpdatedAtDatetime;
