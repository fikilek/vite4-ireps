import { InfoWindow, useMap } from "@vis.gl/react-google-maps";
import { useCallback, useEffect, useMemo, useState } from "react";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
// import {Erf} from './erfs';
import { ErfMarker } from "@/components/maps/ErfMarker";

// export type ClusteredErfMarkersProps = {
//   erfs: Erf[];
// };

/**
 * The ClusteredErfMarkers component is responsible for integrating the
 * markers with the markerclusterer.
 */
export const ClusteredErfMarkers = (props) => {
  // console.log(`props`, props)
  const {erfs} = props
	const [markers, setMarkers] = useState({});
	const [selectedErfKey, setSelectedErfKey] = useState(null);
	console.log(`selectedErfKey`, selectedErfKey)

	// const { erfsContext } = useContext(erfsContext);
	// console.log(`erfsContext`, erfsContext)
  
  
	// const erfs = useMemo(() => erfsContext?.erfs, [erfsContext?.erfs]);
	// console.log(`erfs`, erfs);
  
	const selectedErf = useMemo(() => {
    return erfs && selectedErfKey
    ? erfs.find((erf) => erf.id === selectedErfKey)
    : null;
	}, [erfs, selectedErfKey]);
  console.log(`selectedErf`, selectedErf)

	// create the markerClusterer once the map is available and update it when
	// the markers are changed
	const map = useMap();
	const clusterer = useMemo(() => {
		if (!map) return null;

		return new MarkerClusterer({ map });
	}, [map]);

	useEffect(() => {
		if (!clusterer) return;

		clusterer.clearMarkers();
		clusterer.addMarkers(Object.values(markers));
	}, [clusterer, markers]);

	// this callback will effectively get passed as ref to the markers to keep
	// tracks of markers currently on the map
	const setMarkerRef = useCallback((marker, key) => {
		setMarkers((markers) => {
			if ((marker && markers[key]) || (!marker && !markers[key]))
				return markers;

			if (marker) {
				return { ...markers, [key]: marker };
			} else {
				const {[key]: _, ...newMarkers} = markers;

				// const newMarkers = { ...markers };
				// delete newMarkers[key];
        console.log(`newMarkers`, newMarkers)

				return newMarkers;
			}
		});
	}, []);

	const handleInfoWindowClose = useCallback((erf) => {
    console.log(`closing infoWindow`, erf)
		setSelectedErfKey(null);
	}, []);

	const handleMarkerClick = useCallback((erf) => {
    console.log(`opening infoWindow`, erf)
		setSelectedErfKey(erf.id);
	}, []);

	return (
		<>
			{erfs.map((erf) => (
				<ErfMarker
					key={erf.id}
					erf={erf}
					onClick={handleMarkerClick}
					setMarkerRef={setMarkerRef}
				/>
			))}

			{selectedErfKey && (
				<InfoWindow
					anchor={markers[selectedErfKey]}
					onCloseClick={handleInfoWindowClose}
				>
					<p>Erf Form{selectedErf.erfNo}</p>
				</InfoWindow>
			)}
		</>
	);
};
