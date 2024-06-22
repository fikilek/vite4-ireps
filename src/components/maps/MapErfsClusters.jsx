import { useContext, useEffect, useRef, useState } from "react";
import { AdvancedMarker, Pin, useMap } from "@vis.gl/react-google-maps";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

import "@/components/maps/MapErfsClusters.css";

import { ErfsMapContext } from "@/contexts/ErfsMapContext";

const MapErfsClusters = () => {
	const { erfsMapContext } = useContext(ErfsMapContext);
	// console.log(`erfsMapContext`, erfsMapContext);

	const erfs = erfsMapContext?.erfs?.slice(0, 50);

	const map = useMap();
	const [markers, setMarkers] = useState({});
	const clusterer = useRef();

	useEffect(() => {
		// console.log(`useEffect running - map`, map)
		if (!map) return;
		if (!clusterer.current) {
			// console.log(`create new clusterer`)
			clusterer.current = new MarkerClusterer(map);
			console.log(`new clusterer`, clusterer);
		}
	}, [map]);

	const setMarkerRef = (marker, key) => {
		console.log(`marker`, marker);
		// console.log(`key`, key)

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

	useEffect(() => {
		// console.log(`markers`,markers )
		// const objValues = Object.values(markers)
		// console.log(`objValues`,objValues )
		console.log(`clusterer.current`, clusterer.current);
		
		clusterer.current?.clearMarkers();
		console.log(`clusterer.current`, clusterer.current);

		clusterer.current?.addMarkers(Object.values(markers), true);
		console.log(`clusterer.current`, clusterer.current);

	}, [markers]);

	return (
		<div className="map-erfs-markers">
			{erfs &&
				erfs.map((erf) => {
					const point = {
						lat: erf.address.gps.latitude,
						lng: erf.address.gps.longitude,
					};
					return (
						<AdvancedMarker
							position={point}
							key={erf.id}
							ref={(marker) => {
								// console.log(`marker`, marker)

								setMarkerRef(marker, erf.id);
							}}
						>
							<Pin background={"#22ccff"} borderColor={"#1e89a1"} scale={1}>
								{/* children are rendered as 'glyph' of pin */}
								<span className="erf">{erf.erfNo}</span>
							</Pin>
						</AdvancedMarker>
					);
				})}
		</div>
	);
};

export default MapErfsClusters;
