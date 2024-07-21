// css
import "@/components/erfs/ErfsMap.css";

// contexts
// import { ErfsContext } from "@/contexts/ErfsContext";

// components
import MapIrepsMap from "@/components/maps/MapIrepsMap";
import { MapMarkers } from "../maps/MapMarkers";
import MapLmWardBoundaries from "../maps/MapLmWardBoundaries";
import { ClusteredErfMarkers } from "../maps/ClusteredTreeMarkers";
import { useContext } from "react";
// import { useContext } from "react";

// ErfsMap go to firebase erfs collection and fetch erfs on the workbase. These are then displayed using clustering
const ErfsMap = (props) => {
	// console.log(`ErfsMap props`, props);

	const {erfs} = props

	// const { erfsContext } = useContext(erfsContext);
	// console.log(`erfsContext`, erfsContext)

	return (
		<div className="erfs-map">
			<MapIrepsMap>
				<MapLmWardBoundaries />
				{/* <MapMarkers /> */}
				<ClusteredErfMarkers erfs={erfs} />
			</MapIrepsMap>
		</div>
	);
};

export default ErfsMap;
