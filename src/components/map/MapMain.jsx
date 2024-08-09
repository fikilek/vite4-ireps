// css
import "@/components/map/MapMain.css";

// contexts

// components
import MapIrepsMap from "@/components/maps/MapIrepsMap";
import MapLmWardBoundaries from "@/components/maps/MapLmWardBoundaries";
import MapLmBoundary from "@/components/maps/MapLmBoundary";
import { ClusteredErfMarkers } from "../maps/ClusteredErfMarkers";
import { ClusteredAstMarkers } from "@/components/maps/ClusteredAstMarkers";
import MapAstFilter from "@/components/maps/MapAstFilter";
import MapErfFilter from "@/components/maps/MapErfFilter";

const ErfsMap = () => {
	// console.log(`ErfsMap props`, props);

	return (
		<div className="erfs-map">
			<MapIrepsMap>
				<MapLmWardBoundaries />
				<MapLmBoundary center={'center'} />
				<ClusteredAstMarkers />
				<ClusteredErfMarkers />
				<MapAstFilter />
				<MapErfFilter />
			</MapIrepsMap>
		</div>
	);
};

export default ErfsMap;
