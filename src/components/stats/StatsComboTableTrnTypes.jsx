// npm libraries
// import { useContext } from "react";

import "@/components/stats/StatsComboTableTrnTypes.css";

// contexts
// import { FiltersContext } from "@/contexts/FiltersContext";
// import { AstsStatsContext } from "@/contexts/AstsStatsContext";
import { capitalizeInitialsString } from "@/utils/utils";

// components
import TableComboData from "@/components/tables/TableComboData";

const StatsComboTableTrnTypes = (props) => {
	// Get trn types from the astsStatsContext
	const { stats, tableRef } = props;
	// console.log(`stats`, stats);

	let columnDefinitions = [
		{
			field: "trntype",
			// width: "150",
			headerName: "Trn Type",
			flex: 4,
		},
		{
			field: "quantity",
			// width: "150",
			// headerName: "",
			flex: 3,
		},
		{
			field: "percentage",
			// width: "150",
			// headerName: "",
			flex: 3,
			valueFormatter: (params) => `${params.value}%`,
		},
	];

	let trnTypeData = [];

	// stats?.forEach((trnType) => {
	// 	// console.log(`trnType`, trnType);

	// 	let trnTypes = {};
	// 	trnType?.stats?.forEach((trnType) => {
	// 		const result = columnDefinitions.some((fw) => fw.uid === trnType.uid);

	// 		trnTypes[trnType.uid] = {
	// 			trnType: trnType,
	// 		};

	// 		if (!result) {
	// 			columnDefinitions.push({
	// 				field: `trnTypes.${trnType.uid}.trnType.quantity`,
	// 				headerName: capitalizeInitialsString(trnType.displayName),
	// 				width: "60",
	// 				// flex: 1,
	// 				headerTooltip: trnType.displayName,
	// 				valueGetter: (params) => {
	// 					// console.log(`params`, params);
	// 					const value =
	// 						params.data?.trnTypes[trnType?.uid]?.trnType?.quantity;
	// 					return value ? value : 0;
	// 				},
	// 			});
	// 		}
	// 	});

	// 	trnTypeData.push({
	// 		trnTypeName: trnType.trnTypeName,
	// 		total: trnType.total,
	// 		trnTypes,
	// 	});
	// 	// console.log(`trnTypeData`, trnTypeData);
	// 	// });
	// });

	// console.log(`anomalyData`, anomalyData);
	// console.log(`columnDefinitions`, columnDefinitions);

	// columnDefinitions.push({
	// 	field: "total",
	// 	headerName: "Total",
	// 	width: "100",
	// 	// flex: 2,
	// 	cellRenderer: (params) => {
	// 		// console.log(`params.value`, params.value);
	// 		return params.value ? params.value : 0;
	// 	},
	// });

	// console.log(`trnTypeData`, trnTypeData);
	// console.log(`columnDefinitions`, columnDefinitions);

	return (
		<div className="stats-combo-table-trn-type">
			<TableComboData
				rowData={stats}
				colDefs={columnDefinitions}
				tableRef={tableRef}
			/>
		</div>
	);
};

export default StatsComboTableTrnTypes;
