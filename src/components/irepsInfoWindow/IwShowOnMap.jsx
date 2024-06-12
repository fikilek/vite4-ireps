import "@/components/irepsInfoWindow/IwShowOnMap.css";

import MapIrepsMap from "@/components/maps/MapIrepsMap";
import MapMarkerOnMap from "@/components/maps/MapMarkerOnMap";
import IrepsInfoWindow from "@/components/irepsInfoWindow/IrepsInfoWindow";

const IwShowOnMap = props => {
	// console.log(`props`, props);
	const { lat, lng, label } = props;
	const gpsPoint = {
		lat,
		lng,
	};
	return (
		<IrepsInfoWindow
			hl1={
				<span>
					Showing <span className="text-emphasis2">{label}</span> on Map
				</span>
			}
			hr1={<p></p>}
		>
			<MapIrepsMap>
				<MapMarkerOnMap gpsPoint={gpsPoint} label={label} />
			</MapIrepsMap>
		</IrepsInfoWindow>
	);
};

export default IwShowOnMap;
