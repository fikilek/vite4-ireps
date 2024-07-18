// css
import "@/components/erfs/ErfsMap.css";

// contexts
import { ErfsContext } from "@/contexts/ErfsContext";

// components
import MapIrepsMap from "@/components/maps/MapIrepsMap";
import { MapMarkers } from "../maps/MapMarkers";
import MapLmWardBoundaries from "../maps/MapLmWardBoundaries";
import { useContext } from "react";

// ErfsMap go to firebase erfs collection and fetch erfs on the workbase. These are then displayed using clustering
const ErfsMap = () => {
	// console.log(`ErfsMap`);

	// const { erfsContext } = useContext(ErfsContext);
	// console.log(`erfsContext`, erfsContext)

	return (
		<div className="erfs-map">
			<MapIrepsMap>
				<MapLmWardBoundaries />
				<MapMarkers />
			</MapIrepsMap>
		</div>
	);
};

export default ErfsMap;
