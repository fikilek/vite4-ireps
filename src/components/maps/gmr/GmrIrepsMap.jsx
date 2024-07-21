/*
Base map for maps in ireps
*/

// npm libraries
import GoogleMap from "google-map-react";
import useSupercluster from "use-supercluster";
import { useRef, useState } from "react";

// css
import "@/components/maps/gmr/GmrIrepsMap.css";

// hooks

// contexts

// components

const GmrIrepsMap = (props) => {
	console.log(`props`, props);

	const { children, erf } = props;
	const mapRef = useRef();
	// console.log(`mapRef`, mapRef);

	const [bounds, setBounds] = useState([]);
	// console.log(`bounds`, bounds);
	const [zoom, setZoom] = useState(10);
	// console.log(`zoom`, zoom)

	const onMapLoad = (mapObjects) => {
		// console.log(`myMapObjects`, mapObjects);

		const { map, maps } = mapObjects;
		// console.log(`mapRef`, mapRef);

		mapRef.current = map;
		// console.log(`mapRef`, mapRef);

		mapRef.current?.data?.setStyle({
			fillOpacity: 0.0,
		});
	};

	// map options
	var options = {
		// panControl: true,
		// zoomControl: true,
		mapTypeControl: true,
		// scaleControl: true,
		// streetViewControl: true,
		overviewMapControl: true,
		rotateControl: true,
		fullscreenControl: false,
	};

  -29.207663033606362, 29.996729080424423

	return (
		<div className="gmr-ireps-map">
			<GoogleMap
				bootstrapURLKeys={{
					key: import.meta.env.VITE_APP_GOOGLE_MAPS_REACT_API_KEY,
				}}
				defaultCenter={{
					lat:-29.207663033606362,
					lng: 29.996729080424423,
				}}
        center={{
					lat:-29.207663033606362,
					lng: 29.996729080424423,
				}}

				defaultZoom={16}
				yesIWantToUseGoogleMapApiInternals
				onGoogleApiLoaded={onMapLoad}
				onChange={(args) => {
					// console.log(`args`, args);
					const { zoom, bounds } = args;
					setZoom(zoom);
					setBounds([
						bounds.nw.lng,
						bounds.se.lat,
						bounds.se.lng,
						bounds.nw.lat,
					]);
				}}
				// options={options}
			>
				{children}
			</GoogleMap>
		</div>
	);
};

export default GmrIrepsMap;
