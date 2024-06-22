import { useMap, AdvancedMarker } from "@vis.gl/react-google-maps";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { useEffect, useState, useRef, useContext } from "react";
// import { trees } from "../../data/tree";
import { ErfsMapContext } from "@/contexts/ErfsMapContext";
// [{ name: "Oak, English", lat: 43.64, lng: -79.41, key: "ABCD" }]

// type Point = google.maps.LatLngLiteral & { key: string };
// type Props = { points: Point[] };

export const MapMarkers = () => {

	const { erfsMapContext } = useContext(ErfsMapContext);
	// console.log(`erfsMapContext`, erfsMapContext);

	const erfs = erfsMapContext?.erfs;
  // console.log(`erfs`, erfs)


	const map = useMap();
	const [markers, setMarkers] = useState({});
	const clusterer = useRef(null);

	useEffect(() => {
		if (!map) return;
		if (!clusterer.current) {
			clusterer.current = new MarkerClusterer({ map });
		}
	}, [map]);

	useEffect(() => {
		console.log(Date.now());
		// console.log(`markers`,markers )

		clusterer.current?.clearMarkers();
		clusterer.current?.addMarkers(Object.values(markers));
		console.log(`clusterer.current`, clusterer.current);
	}, [markers]);

	const setMarkerRef = (marker, key) => {
		if (marker && markers[key]) return;
		if (!marker && !markers[key]) return;

		setMarkers((prev) => {
			if (marker) {
				return { ...prev, [key]: marker };
			} else {
				const newMarkers = { ...prev };
				delete newMarkers[key];
				return newMarkers;
			}
		});
	};

	return (
		<>
			{erfs.map((point, index) => {
				// console.log(`point`, point)
				const gpsPoint = {
					lat: point?.address?.gps?.latitude,
					lng: point?.address?.gps?.longitude,
				};
				return (
					<AdvancedMarker
						position={gpsPoint}
						key={index}
						ref={marker => {
							// console.log(`marker`, marker)
							setMarkerRef(marker, index);
						}}
					>
						<span style={{ fontSize: "2rem" }}>🌳</span>
					</AdvancedMarker>
				);
			})}
		</>
	);
};
