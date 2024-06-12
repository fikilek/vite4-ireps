import { useContext } from "react";

// css
import "@/components/erfs/ErfsMain.css";

// context
import { ErfsContext } from "@/contexts/ErfsContext";

// components
import ErfsTable from "@/components/erfs/ErfsTable";
import ErfsSplit from "@/components/erfs/ErfsSplit";
import ErfsMap from "@/components/erfs/ErfsMap";

const ErfsMain = () => {
	const { erfsContext } = useContext(ErfsContext);

	return (
		<div className="erfs-main">
			{erfsContext.activeTab === "table" && <ErfsTable />}
			{erfsContext.activeTab === "split" && <ErfsSplit />}
			{erfsContext.activeTab === "map" && <ErfsMap />}
		</div>
	);
};

export default ErfsMain;
