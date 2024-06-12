import "@/components/tables/TableModalBtn.css";

import useModal from "@/hooks/useModal.jsx";
import { memo } from "react";

const TableModalBtn = props => {
	console.log(`props`, props);
	const {
		modalName,
		data,
		infoName,
		irepsKeyItem,
		width,
		validationSchema,
		displayMode,
		title,
		tableBtnClass
	} = props.data;
	// console.log(`data`, data)
	// console.log(`modalName`, modalName);

	const { openModal } = useModal();
	const handleClick = e => {
		openModal({
			modalName: modalName  ,
			payload: {
				data,
				infoName,
				irepsKeyItem,
				width,
				validationSchema,
				displayMode,
				tableBtnClass
			},
		});
	};
	return (
		<div className="table-modal-btn">
			<button
				className={`table-btn ${tableBtnClass}`}
				onClick={handleClick}
				style={{ width: width }}
				title={title}
			>
				{props.children}
			</button>
		</div>
	);
};

export default TableModalBtn;
