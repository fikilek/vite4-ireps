import { useContext } from "react";

// css
import "@/components/trns/TrnsTable.css";

// hooks
import { useTrns } from "@/hooks/useTrns";

// components
import TableTrns from "@/components/tables/TableTrns";
import { TrnsContext } from "@/contexts/TrnsContext";

const TrnsTable = props => {
	const { trnType, astCat } = props;

	useTrns(trnType, astCat);

	const { trnsContext } = useContext(TrnsContext);
	// console.log(`trnsContext`, trnsContext);

	return (
		<div className="trns-table table">

			{ trnsContext.trns?.length === 0 ? (
				<p className="no-data">No data</p>
				) : (
					(trnsContext?.trnsTableFields && (trnsContext?.trns.length > 0)) ? (
						<TableTrns
							rowData={trnsContext?.trns}
							colDefs={trnsContext?.trnsTableFields[astCat][trnType]}
							key={trnType}
						/>
					) : <p>Loading ....</p>
				)

			}
			
		</div>
	);
};

export default TrnsTable;
