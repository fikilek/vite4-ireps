import { createContext, useState } from "react";

// Create context:
export const FiltersContext = createContext();

const initSettings = {
	filtersActive: false,
	activeTab: "table",
	activeArea: "",
	asts: null,
	createdAtDatetimeRange: [null, null],
	updatedAtDatetimeRange: [null, null],
	// dateRange: "",
	activeReport: "",
	filterCondition: {
		createdAtDatetime: [],
		updatedAtDatetime: [],
		astCreation: "",
		astMeterType: "",
		astState: "",
		geographicArea: "",
	},
};

export const FiltersContextProvider = (props) => {
	const [filtersContext, setFiltersContext] = useState(initSettings);
	// console.log(`filtersContext`, filtersContext);
	return (
		<FiltersContext.Provider value={{ filtersContext, setFiltersContext }}>
			{props.children}
		</FiltersContext.Provider>
	);
};
