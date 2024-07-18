import { useEffect } from "react";

// hooks
import useIrepsMap from "@/hooks/useIrepsMap";
import { useMap } from "@vis.gl/react-google-maps";

// Display all ward boundaries in workbase(municipality) and erfs of the props ward
const MapWardErfsBoundaries = (props) => {
	// console.log(`props`, props);

	const { lmMetro, ward } = props;

	const map = useMap();
	// console.log(`map`, map);

	const { displayWardErfsBondaries, wardBoundaries } = useIrepsMap(lmMetro, ward);
	// console.log(`displayLmWardBondaries`, displayLmWardBondaries)
	// console.log(`wardBoundaries`, wardBoundaries)

	useEffect(() => {
		displayWardErfsBondaries(map);
	}, [wardBoundaries]);

	return <div className="map-boundaries"></div>;
};

export default MapWardErfsBoundaries;
