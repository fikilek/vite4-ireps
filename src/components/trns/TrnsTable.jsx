// import { useContext } from "react";

// css
import "@/components/trns/TrnsTable.css";

// hooks
// import { useTrns } from "@/hooks/useTrns";

// components
import TableTrns from "@/components/tables/TableTrns";
// import { TrnsContext } from "@/contexts/TrnsContext";

const TrnsTable = (props) => {
	// console.log(`props`, props);

	const { trns, trnsTableFields } = props;

	const { all: colDefs } = trnsTableFields?.all;

	return (
		<div className="trns-table table">
			{trns?.length > 0 ? (
				<TableTrns
					rowData={trns}
					colDefs={colDefs}
					// key={trnType}
				/>
			) : (
				<p>Loading ....</p>
			)}
		</div>
	);
};

export default TrnsTable;
