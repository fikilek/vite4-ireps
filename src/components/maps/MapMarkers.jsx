import { useMap, AdvancedMarker } from "@vis.gl/react-google-maps";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { useEffect, useState, useRef, useContext } from "react";

// css
import '@/components/maps/MapMarkers.css'

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
			clusterer.current = new MarkerClusterer({ map: map, maxZoom: 10	 });
		}
	}, [map]);

	useEffect(() => {
		clusterer.current?.clearMarkers();
		clusterer.current?.addMarkers(Object.values(markers));
		// console.log(`clusterer.current`, clusterer.current);
	}, [markers]);

	const setMarkerRef = (marker, key) => {
		if (marker && markers[key]) return;
		if (!marker ) return;

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
			{erfs.map((erf) => {
				return (
					<AdvancedMarker
						position={{
							lat: erf?.address?.gps?.latitude,
							lng: erf?.address?.gps?.longitude,
						}}
						key={erf.id}
						ref={marker => {
							// console.log(`marker`, marker)
							setMarkerRef(marker, erf.id);
						}}
					>
						{/* <span style={{ fontSize: "2rem" }}>🌳</span> */}
						
						<button className="erf-no-btn">
								<span className="erf-no">{erf.erfNo}</span>
							</button>
					</AdvancedMarker>
				);
			})}
		</>
	);
};
