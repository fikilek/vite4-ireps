import {
	APIProvider,
	ControlPosition,
	Map,
	MapControl,
} from "@vis.gl/react-google-maps";
import { memo, useState } from "react";

import "@/components/maps/MapIrepsMap.css";

import MapCenterMap from "@/components/maps/MapCenterMap";
import MapUserLocationOnMap from "@/components/maps/MapUserLocationOnMap";

const MapIrepsMap = props => {
	// console.log(`props`, props);

	const [mapCentered, setMapCentered] = useState(false);
	// console.log(`map: ${mapCentered ? "Centered" : "NOT Centered"} `);

	const defaultCenter = {
		lat: -26.541960658447646,
		lng: 28.338629116440828,
	};

	const onCenterChanged = e => {
		// console.log(`map position has changed`);
		setMapCentered(false);
	};

	const onBoundsChanged = e => {
		// console.log(`bondaries changed e: `, e)
		// const bounds = e.map.getBounds()
		// console.log(`bounds`, bounds)
	};

	return (
		<div className="map-ireps-map">
			<APIProvider apiKey={import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY}>
				<Map
					defaultZoom={15}
					defaultCenter={defaultCenter}
					gestureHandling={"greedy"}
					disableDefaultUI={false}
					mapId={import.meta.env.VITE_APP_GOOGLE_MAP_ID}
					onCenterChanged={onCenterChanged}
					onBoundsChanged={onBoundsChanged}
				>
					<MapControl position={ControlPosition.RIGHT_BOTTOM}>
						<MapCenterMap mapCentered={mapCentered} setMapCentered={setMapCentered} />
					</MapControl>
					<MapUserLocationOnMap />
					{props.children}
				</Map>
			</APIProvider>
		</div>
	);
};

export default memo(MapIrepsMap);
