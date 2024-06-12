import { useContext } from "react";

// css
import "@/pages/erfs/Erfs.css";

// contexts
import { ErfsContext } from "@/contexts/ErfsContext";

// components
import ErfsMain from "@/components/erfs/ErfsMain";
import ErfsHeader from "@/components/erfs/ErfsHeader";
import Filters from "@/components/filters/Filters";

const Erfs = () => {
	const { erfsContext } = useContext(ErfsContext);
	return (
		<div className="erfs">
			<ErfsHeader phLl="Erfs" />
			<div className="erfs-body">
				{erfsContext.filterBtn ? <Filters irepsKeyItem='erfs' /> : null}
				<ErfsMain />
			</div>
		</div>
	);
};

export default Erfs;
