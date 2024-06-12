import { useEffect, useState } from "react";

import "@/components/irepsInfoWindow/ShowAstOnMap.css";

import IwShowOnMap from "@/components/irepsInfoWindow/IwShowOnMap";

const ShowAstOnMap = props => {
	// console.log(`props`, props);

	const { astNo } = props.data.data?.astData;
	// console.log(`astNo`, astNo);

	const { gps } = props.data.data?.location;
	// console.log(`gps`, gps);

	const [gpsPoint, setGpsPoint] = useState({});
	// console.log(`gpsPoint`, gpsPoint);

	useEffect(() => {
		// console.log(`document changed`, document);
		setGpsPoint({
			point: {
				lat: Number(gps?.lat),
				lng: Number(gps?.lng),
			},
			label: astNo,
		});
	}, []);

	return (
		<div className="show-on-map">
			{gpsPoint?.point?.lat && (
				<IwShowOnMap
					lat={gpsPoint?.point?.lat}
					lng={gpsPoint?.point?.lng}
					label={gpsPoint?.label}
				/>
			)}
		</div>
	);
};

export default ShowAstOnMap;
