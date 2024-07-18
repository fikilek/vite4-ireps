import "@/components/irepsInfoWindow/IwShowOnMap.css";

import MapIrepsMap from "@/components/maps/MapIrepsMap";
import MapMarkerOnMap from "@/components/maps/MapMarkerOnMap";
import IrepsInfoWindow from "@/components/irepsInfoWindow/IrepsInfoWindow";
import { MapWardCadastralMarkers } from "@/components/maps/MapWardCadastralMarkers";
import MapWardErfsBoundaries from "@/components/maps/MapWardErfsBoundaries";

const IwShowOnMap = (props) => {
	// console.log(`props`, props);
	const { lat, lng, label, lmMetro, ward } = props;
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
				<MapWardErfsBoundaries lmMetro={lmMetro} ward={ward} />
				<MapWardCadastralMarkers lmMetro={lmMetro} ward={ward} />
				<MapMarkerOnMap gpsPoint={gpsPoint} label={label} />
			</MapIrepsMap>
		</IrepsInfoWindow>
	);
};

export default IwShowOnMap;
