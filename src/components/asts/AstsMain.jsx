// nom libraries
import { useContext } from "react";

// css
import "@/components/asts/AstsMain.css";

// context
import { AstsContext } from "@/contexts/AstsContext";

// components
import AstsTable from "@/components/asts/AstsTable";
// import RgmAstsMap from "@/components/maps/rgm/RgmAstsMap";
import AstsMap from "./AstsMap";

const AstsMain = () => {
	const { astsContext } = useContext(AstsContext);
	// console.log(`astsContext`, astsContext);

	// const isThereAsts = astsContext.asts.length
	// console.log(`isThereAsts`, isThereAsts)

	return (
		<div className="asts-main">
			{astsContext.activeTab === "table" && <AstsTable />}
			{astsContext.activeTab === "map" && <AstsMap />}
		</div>
	);
};

export default AstsMain;
