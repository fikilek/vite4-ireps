// css
import "@/components/erfs/ErfsMap.css";

// contexts
// import { ErfsContext } from "@/contexts/ErfsContext";

// components
import MapIrepsMap from "@/components/maps/MapIrepsMap";
// import { MapMarkers } from "../maps/MapMarkers";
import MapLmWardBoundaries from "@/components/maps/MapLmWardBoundaries";
import MapLmBoundary from "@/components/maps/MapLmBoundary";
import { ClusteredErfMarkers } from "../maps/ClusteredErfMarkers";
// import { useContext } from "react";
// import { useContext } from "react";

// ErfsMap go to firebase erfs collection and fetch erfs on the workbase. These are then displayed using clustering
const ErfsMap = () => {
	// console.log(`ErfsMap props`, props);

	// const {erfs} = props

	// const { erfsContext } = useContext(erfsContext);
	// console.log(`erfsContext`, erfsContext)

	return (
		<div className="erfs-map">
			<MapIrepsMap>
				<MapLmWardBoundaries />
				<MapLmBoundary center={'center'} />
				{/* <MapMarkers /> */}
				<ClusteredErfMarkers />
			</MapIrepsMap>
		</div>
	);
};

export default ErfsMap;
