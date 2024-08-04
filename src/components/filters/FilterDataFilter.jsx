import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useContext, useState } from "react";

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

const initErfsFilter = {
	// updatedBy: null,
	// createdBy: null,
	erfNo: null,
	// propertyType: null,
};

const options = {
	erfNo: [
		{ value: 90, label: 90 },
		{ value: 2271, label: 2271 },
		{ value: 869, label: 869 },
		{ value: 127, label: 127 },
		{ value: 1435, label: 1435 },
	],
	propertyType: [
		{ value: "Flats", label: "Flats" },
		{ value: "Stand Alone House", label: "Stand Alone House" },
		{ value: "Estate", label: "Estate" },
	],
	createdBy: [
		{ value: "Fikile Kentane", label: "Fikile Kentane" },
		{ value: "Siya Kentane", label: "Siya Kentane" },
	],
};

const FilterDataFilter = props => {
	// console.log(`props`, props);
	const { irepsKeyItem } = props;

	const { user } = useAuthContext();
	// console.log(`user`, user);

	const { userFromUsers } = useUser(user.uid);
	// console.log(`userFromUsers.workbase`, userFromUsers.workbase);

	const { erfsContext, setErfsContext } = useContext(ErfsContext);

	const [erfsFilters, setErfsFilters] = useState(initErfsFilter);
	// console.log(`erfsFilters`, erfsFilters);

	const queryConstraints = [];
	for (const property in erfsFilters) {
		// console.log(`${property}: ${erfsFilters[property]?.value}`);
		let value = null;
		let prop = null;
		if (property === "erfNo") {
			value = erfsFilters[property]?.value?.toString();
			prop = property;
		}
		if (property === "propertyType") {
			value = erfsFilters[property]?.value?.toString();
			prop = "propertyType.type";
		} else {
			value = erfsFilters[property]?.value?.toString();
			prop = property;
		}
		queryConstraints.push([prop, "==", value]);
	}
	queryConstraints.push(["address.lmMetro", "==", userFromUsers?.workbase?.trim()]);
	// console.log(`queryConstraints`, queryConstraints);

	const erfsFiltersArray = Object.entries(erfsFilters);
	// console.log(`erfsFiltersArray`, erfsFiltersArray);

	const handleGetData = e => {
		// console.log(`get data from firestore`, e);
		// console.log(`queryConstraints`, queryConstraints);

		// filter out nulls from the queryConstraints
		const qcc = queryConstraints.filter(qc => qc[2] !== undefined);
		// console.log(`qcc`, qcc);

		// prepare the contraint
		const qccc = qcc.map(qc => {
			return where(...qc);
		});
		// console.log(`qccc`, qccc);

		const q = query(collection(db, irepsKeyItem), ...qccc);
		// console.log(`q`, q);

		onSnapshot(
			q,
			snapShot => {
				// console.log(`snapShot`, snapShot);
				const results = [];
				snapShot.docs.forEach(doc => {
					// console.log(`doc`, doc);
					results.push({ id: doc.id, ...doc.data() });
				});
				// console.log(`results`, results);
				setErfsContext({
					...erfsContext,
					erfs: results,
				});
			},

			err => {
				console.log(`firestore err`, err.message);
			}
		);
	};

	return (
		<div className="filter-data-filter">
			{/* <FilterDataFilterHeader
				handleGetData={handleGetData}
				erfsFilters={erfsFilters}
				setErfsFilters={setErfsFilters}
				initErfsFilter={initErfsFilter}
			/> */}

			<div className="filters">
				{erfsFiltersArray.map(filter => {
					// console.log(`filter`, filter);
					const label = filter[0];
					const value = filter[1];
					return (
						<FilterSelector
							label={label}
							value={value}
							key={label}
							erfsFilters={erfsFilters}
							setErfsFilters={setErfsFilters}
							options={options[label]}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default FilterDataFilter;
