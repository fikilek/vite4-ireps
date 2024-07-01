// css
import "@/components/erfs/ErfsMap.css";

// hooks
import { useErfsMap } from "@/hooks/useErfsMap";

// components
import MapIrepsMap from "@/components/maps/MapIrepsMap";
import MapLmBoundary from "@/components/maps/MapLmBoundary";
// import MapLmBoundary from "@/components/maps/MapLmBoundary";
import { MapMarkers } from "../maps/MapMarkers";
// import MapErfsClusters from "@/components/maps/MapErfsClusters";
// import { MapErfsClusterMap } from "@/components/maps/MapErfsClusterMap";
import MapPropertiesMap from "@/components/maps/MapPropertiesMap";
import MapErfsClusters from "@/components/maps/MapErfsClusters";
import GmrMainMap from "../mapsGoogleMapReact/GmrMainMap";
import GmrErfs from "../mapsGoogleMapReact/GmrErfs";
import MapLmWardBoundaries from "../maps/MapLmWardBoundaries";

// ErfsMap go to firebase erfs collection and fetch erfs on the workbase. Theese are then displayed using clustering
const ErfsMap = () => {
	// console.log(`ErfsMap`);

	useErfsMap();
	// useErfsMap will populate erfsMapContext with all erfs from the workbase */

	return (
		<div className="erfs-map">
			<MapIrepsMap>
				{/* <MapLmCadastral /> */}
				<MapLmWardBoundaries />
				<MapMarkers />
			</MapIrepsMap>
		</div>
	);
};

export default ErfsMap;
