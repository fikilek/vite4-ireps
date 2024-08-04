import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";

// css
import "@/components/filters/FilterDataFilter.css";

// contexts
import { ErfsContext } from "@/contexts/ErfsContext";

// hooks
import { useUser } from "@/hooks/useUser";
import useAuthContext from "@/hooks/useAuthContext";

// components
import FilterSelector from "@/components/filters/FilterSelector";
import { db } from "@/firebaseConfig/fbConfig";
import FilterDataFilterHeader from "@/components/filters/FilterDataFilterHeader";

const FilterDataFilter_ = (props) => {
	// console.log(`props`, props);
	// const { irepsKeyItem } = props;

	// const { user } = useAuthContext();
	// console.log(`user`, user);

	const { erfsContext, setErfsContext } = useContext(ErfsContext);
	// console.log(`erfsContext`, erfsContext);

	const [selectedErf, setSelectedErf] = useState(null);
	// console.log(`selectedErf`, selectedErf);

	const { erfs } = erfsContext;

	useEffect(() => {
		setErfsContext({
			...erfsContext,
			selectedErf: selectedErf,
		});
	}, [selectedErf]);

	// create select options
	const options = erfs.map((erf) => {
		return { value: erf, label: erf.erfNo };
	});

	return (
		<div className="filter-data-filter">
			<FilterDataFilterHeader
				// handleGetData={handleGetData}
				erfsFilters={selectedErf}
				setErfsFilters={setSelectedErf}
				// initErfsFilter={initErfsFilter}
			/>

			<div className="filters">
				{/* {erfs.map((erf) => {
					// console.log(`filter`, filter);
					return ( */}
				<FilterSelector
					// key={erf.id}
					selectedErf={selectedErf}
					setSelectedErf={setSelectedErf}
					options={options}
				/>
				{/* );
				})} */}
			</div>
		</div>
	);
};

export default FilterDataFilter_;
