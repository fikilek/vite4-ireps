/*
Base map for maps in ireps
*/

// npm libraries
import {
	GoogleMap,
	MarkerClustererF,
	MarkerF,
	useJsApiLoader,
} from "@react-google-maps/api";

// css
import "@/components/maps/rgm/RgmIrepsMap.css";
import { Children, memo, useCallback, useMemo, useRef, useState } from "react";
import RgmErfMarkers from "./RgmErfMarkers";

// hooks

// contexts

// components
import erf_icon3 from '@/images/erf_icon3.jpg'

const containerStyle = {
	width: "100%",
	height: "100%",
};

const RgmIrepsMap = (props) => {
	console.log(`props`, props);

	const erfs = useMemo(() => props?.erfs?.slice(0, 5000), [props?.erfs]);

	const mapRef = useRef(null);
	// const markerRef = useRef(null);

	const mpofanaCityCenter = useMemo(() => {
		return {
			lat: -29.207686353523933,
			lng: 29.996715841161038,
		};
	}, []);

	const options = useMemo(() => {
		{
			clickableIcons: false;
		}
	}, []);

	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_REACT_API_KEY,
	});

	// const [map, setMap] = useState(null);

	// const onUnmount = useCallback((map) => {
	// 	setMap(null);
	// }, []);

	const onLoad = useCallback((map) => {
		mapRef.current = map;
	}, []);

	if (!isLoaded) return <p>Loading....</p>;

	return (
		<GoogleMap
			mapContainerStyle={containerStyle}
			center={mpofanaCityCenter}
			zoom={10}
			options={options}
			onLoad={onLoad}
			// onUnmount={onUnmount}
		>
			{/* <RgmErfMarkers erfs={props.erfs} /> */}
			{erfs && (
				<MarkerClustererF>
					{(clusterer) => (
						<div>
							{erfs.map((erf) => {
								// console.log(`clusterer`, clusterer);
								return (
									<MarkerF
										key={erf.id}
										// ref={markerRef}
										position={{
											lat: erf?.address?.gps?.latitude,
											lng: erf?.address?.gps?.longitude,
										}}
										label={`${erf.erfNo} [${(erf?.asts?.length) ? [(erf?.asts?.length)] : 0}]`}
										clusterer={clusterer}
										// icon={{
										// 	path:
										// 		"M8 12l-4.7023 2.4721.898-5.236L.3916 5.5279l5.2574-.764L8 0l2.3511 4.764 5.2574.7639-3.8043 3.7082.898 5.236z",
										// 	fillColor: "yellow",
										// 	fillOpacity: 0.9,
										// 	scale: 2,
										// 	strokeColor: "gold",
										// 	strokeWeight: 2,
										// }}
										icon={erf_icon3}
										// icon={"https://web.archive.org/web/20230701011019/https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"}
										// onClick={() => {
										// 	fetchDirections(house);
										// }}
									>
										<button>{erf.erfNo}</button>
									</MarkerF>
								);
							})}
						</div>
					)}
				</MarkerClustererF>
			)}
		</GoogleMap>
	);
};

export default memo(RgmIrepsMap);
