import "@/components/tables/TableBtnsPossibleTrnsOnAst.css";

import useModal from "@/hooks/useModal.jsx";
import { useTrns } from "@/hooks/useTrns.jsx";

import TableModalBtn from "@/components/tables/TableModalBtn";

const TableBtnsPossibleTrnsOnAst = props => {
	console.log(`props`, props);
	const { trns, erf } = props.data;
	const { astNo, astId, astCatergory } = props.data.astData;

	const { trnsNewFormData, trnsValidationSchema } = useTrns(null);
	// console.log(`trnsNewFormData`, trnsNewFormData);
	// console.log(`trnsValidationSchema`, trnsValidationSchema);

	const { openModal } = useModal();

	const handleTrnsOnAst = e => {
		openModal({
			modalName: "iwTrnsOnAst",
			payload: { data: props.data, width: "4rem" },
		});
	};

	return (
		// possible-trns-on-ast -ptoa
		<div className="table-btns-possible-trns-on-ast">
			<div>
				<button
					title="Transaction on ast"
					className="trns-on-ast-btn table-btn"
					onClick={handleTrnsOnAst}
				>
					{trns.length}
				</button>
			</div>

			{/* Meter tid */}
			<TableModalBtn
				data={{
					modalName: "meter-tid",
					data: {
						...trnsNewFormData["meter"]["tid"],
						astData: {
							astNo,
							astId,
							astCatergory,
						},
						erf
					},
					validationSchema: trnsValidationSchema["meter"]["tid"],
					infoName: "",
					irepsKeyItem: "trns",
					width: "3rem",
					displayMode: "modal",
					title: "TID transaction",
				}}
			>
				Tid
			</TableModalBtn>

			{/* Meter inspection */}
			<TableModalBtn
				data={{
					modalName: "meter-inspection",
					data: props.data,
					validationSchema: trnsValidationSchema["meter"]["inspection"],
					infoName: "",
					irepsKeyItem: "trns",
					width: "3rem",
					displayMode: "modal",
					title: "Meter Inspection",
				}}
			>
				Insp
			</TableModalBtn>

			{/* Meter removal / decommission */}
			<TableModalBtn
				data={{
					modalName: "meter-decommission",
					data: {
						...trnsNewFormData["meter"]["decommission"],

						astData: {
							astNo,
							astId,
							astCatergory,
						},
					},
					validationSchema: trnsValidationSchema["meter"]["decommission"],
					infoName: "",
					irepsKeyItem: "trns",
					width: "3rem",
					displayMode: "modal",
					title: "Meter decomissioning",
				}}
			>
				Decom
			</TableModalBtn>

			{/* Meter disconnection */}
			<TableModalBtn
				data={{
					modalName: "meter-disconnection",
					data: {
						...trnsNewFormData["meter"]["disconnection"],
						astData: {
							astNo,
							astId,
							astCatergory,
						},
					},
					validationSchema: trnsValidationSchema["meter"]["disconnection"],
					infoName: "",
					irepsKeyItem: "trns",
					width: "3rem",
					displayMode: "modal",
					title: "Meter Disconnection",
				}}
			>
				Dscn
			</TableModalBtn>

			{/* Meter reconnection */}
			<TableModalBtn
				data={{
					modalName: "meter-reconnection",
					data: {
						...trnsNewFormData["meter"]["reconnection"],
						astData: {
							astNo,
							astId,
							astCatergory,
						},
					},
					validationSchema: trnsValidationSchema["meter"]["reconnection"],
					infoName: "",
					irepsKeyItem: "trns",
					width: "3rem",
					displayMode: "modal",
					title: "Meter Reconnection",
				}}
			>
				Recn
			</TableModalBtn>
		</div>
	);
};

export default TableBtnsPossibleTrnsOnAst;
