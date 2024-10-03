// npm libraries
import { useContext } from "react";
import { Timestamp, where } from "firebase/firestore";

// css
import "@/components/filters/FiltersControlBtns.css";

// hooks

// context
import { FiltersContext } from "@/contexts/FiltersContext";

const FiltersControlBtns = (props) => {
	// console.log(`props`, props)
	const { getAsts } = props;

	const { filtersContext, setFiltersContext } = useContext(FiltersContext);
	// console.log(`filtersContext`, filtersContext);

	const { createdAtDatetimeRange, updatedAtDatetimeRange, filterCondition } =
		filtersContext;
	// console.log(`filtersActive`, filtersActive);
	// console.log(`createdAtDatetimeRange`, createdAtDatetimeRange);

	const { astState, astCreation } = filterCondition;

	const handleClick = (e) => {
		// console.log(`Filter Get Data`, constraints);

		const createdAt =
			createdAtDatetimeRange[0] == null ||
			createdAtDatetimeRange[0] == undefined ||
			createdAtDatetimeRange[1] == null ||
			createdAtDatetimeRange[1] == undefined
				? false
				: true;

		// console.log(`createdAt`, createdAt);

		const updatedAt =
			updatedAtDatetimeRange[0] == null ||
			updatedAtDatetimeRange[0] == undefined ||
			updatedAtDatetimeRange[1] == null ||
			updatedAtDatetimeRange[1] == undefined
				? false
				: true;
		// console.log(`updatedAt`, updatedAt);

		let constraints = [];

		if (createdAt) {
			const [startDate, endDate] = createdAtDatetimeRange;
			const startDate_ = Timestamp.fromDate(new Date(startDate));
			// console.log(`startDate_`, startDate_);
			const endDate_ = Timestamp.fromDate(new Date(endDate));
			// console.log(`endDate_`, endDate_);

			constraints = [
				where("metadata.createdAtDatetime", ">=", startDate_),
				where("metadata.createdAtDatetime", "<=", endDate_),
			];
			// console.log(`constraints`, constraints);
		}
		if (updatedAt) {
			const [startDate, endDate] = updatedAtDatetimeRange;
			const startDate_ = Timestamp.fromDate(new Date(startDate));
			// console.log(`startDate_`, startDate_);
			const endDate_ = Timestamp.fromDate(new Date(endDate));
			// console.log(`endDate_`, endDate_);

			constraints = [
				where("metadata.updatedAtDatetime", ">=", startDate_),
				where("metadata.updatedAtDatetime", "<=", endDate_),
			];
			// console.log(`constraints`, constraints);
		}
		if (astCreation) {
			constraints = [
				...constraints,
				where("metadata.createdThrough.creatorTrnName", "==", astCreation),
			];
		}
		if (astState) {
			constraints = [...constraints, where("astData.astState", ">=", astState)];
		}
		// if (geographicArea) {
		// 	constraints = [...constraints, where("astData.astState", ">=", geographicArea)];
		// }

		console.log(`constraints`, constraints);

		getAsts(constraints);

		setFiltersContext({
			...filtersContext,
			filtersActive: true,
		});
	};

	const filterReset = (e) => {
		// console.log(`Filter Reset`);
		// setErfsFilters(initErfsFilter);
		getAsts();
		setFiltersContext({
			...filtersContext,
			filtersActive: false,
			createdAtDatetimeRange: [null, null],
			updatedAtDatetimeRange: [null, null],
			filterCondition: {
				astCreation: "",
				astState: "",
				geographicArea: "",
			},
		});
	};

	// const getAstsBtnDisabled = () => {
	// 	if (dateRange === "created") {
	// 		const [startDate, endDate] = createdAtDatetimeRange;
	// 		const astsBtnDisabled = startDate && endDate ? false : true;
	// 		return astsBtnDisabled;
	// 	}
	// 	if (dateRange === "updated") {
	// 		const [startDate, endDate] = updatedAtDatetimeRange;
	// 		const astsBtnDisabled = startDate && endDate ? false : true;
	// 		return astsBtnDisabled;
	// 	}
	// };

	return (
		<div className="filters-control-btns">
			{/* fcb - filters-control-btn */}
			<button
				className="fcb get-data-btn"
				onClick={handleClick}
				// disabled={getAstsBtnDisabled()}
			>
				Get Data
			</button>
			<button
				className="fcb clear-filters-btn"
				onClick={filterReset}
				// disabled={!filtersActive}
			>
				Reset Filters
			</button>
		</div>
	);
};

export default FiltersControlBtns;