import "@/pages/asts/Asts.css";

import AstsHeader from "@/components/asts/AstsHeader";
import AstsTable from "@/components/asts/AstsTable";

const Asts = () => {
	// const { astsContext } = useContext(AstsContext);
	return (
		<div className="asts">
			<AstsHeader phLl="Asts" />
			<div className="asts-body">
				{/* {astsContext.filterBtn ? <AstsFilters /> : null} */}
				<AstsTable />
			</div>
		</div>
	);
};

export default Asts;
