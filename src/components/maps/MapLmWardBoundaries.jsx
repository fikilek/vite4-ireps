import { useEffect } from "react";

// hooks
import useIrepsMap from "@/hooks/useIrepsMap";
import { useMap } from "@vis.gl/react-google-maps";

const MapLmWardBoundaries = () => {
	// console.log(`MapLmWardBoundaries`)

	const map = useMap();
	// console.log(`map`, map);

	const { displayLMWardBoundaries, state } = useIrepsMap();
	// console.log(`displayLMWardBoundaries`, displayLMWardBoundaries)

	const { lmWardBoundaries } = state;

	useEffect(() => {

		if (!map) return;

		displayLMWardBoundaries(map);

	}, [map, lmWardBoundaries]);


	return <div className="map-boundaries"></div>;
};

export default MapLmWardBoundaries;
