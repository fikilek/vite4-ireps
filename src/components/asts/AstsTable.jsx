import { useContext } from "react";

// css
import "@/components/asts/AstsTable.css";

// custome hooks
import { useAsts } from "@/hooks/useAsts.jsx";

// context
import { AstsContext } from "@/contexts/AstsContext.jsx";

// components
import TableAsts from "@/components/tables/TableAsts";

const AstsTable = () => {
	const { astsTableFields } = useAsts();
	const { astsContext } = useContext(AstsContext);
	// console.log(`astsContext`, astsContext);

	return (
		<div className="asts-table table">
			{astsContext.asts?.length === 0 ? (
				<p className="no-data">No data</p>
			) : (
				<TableAsts rowData={astsContext.asts} colDefs={astsTableFields} />
			)}
		</div>
	);
};

export default AstsTable;
