// css
import "@/components/asts/AstsMap.css";

// contexts
// import { AstsContext } from "@/contexts/AstsContext";

// components
import MapIrepsMap from "@/components/maps/MapIrepsMap";
// import { MapMarkers } from "../maps/MapMarkers";
import MapLmWardBoundaries from "@/components/maps/MapLmWardBoundaries";
import MapAstFilter from "@/components/maps/MapAstFilter";
import MapLmBoundary from "@/components/maps/MapLmBoundary";
import { ClusteredAstMarkers } from "@/components/maps/ClusteredAstMarkers";
import { ClusteredErfMarkers } from "@/components/maps/ClusteredErfMarkers";
// import { useContext } from "react";
// import { useContext } from "react";

// AstsMap go to firebase asts collection and fetch asts on the workbase. These are then displayed using clustering
const AstsMap = () => {
	// console.log(`AstsMap props`, props);

	// const {asts} = props

	// const { astsContext } = useContext(astsContext);
	// console.log(`astsContext`, astsContext)

	return (
		<div className="asts-map">
			<MapIrepsMap>
				<MapLmWardBoundaries />
				<MapLmBoundary center={"center"} />
				<ClusteredErfMarkers />
				<ClusteredAstMarkers />
				<MapAstFilter />
			</MapIrepsMap>
		</div>
	);
};

export default AstsMap;
