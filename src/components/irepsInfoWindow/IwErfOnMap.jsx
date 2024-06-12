import "@/components/irepsInfoWindow/IwErfOnMap.css";

import MapIrepsMap from "@/components/maps/MapIrepsMap";
import MapMarkerOnMap from "@/components/maps/MapMarkerOnMap";
import IrepsInfoWindow from "@/components/irepsInfoWindow/IrepsInfoWindow";

const IwErfOnMap = props => {
	// console.log(`props`, props);
	const { address, erfNo } = props?.data.data;
	const gpsPoint = {
		lat: address.gps.latitude,
		lng: address.gps.longitude,
	};
	return (
		<IrepsInfoWindow
			hl1={"Erf On Map"}
			hl2={
				<span>
					Erf No: <span className="text-emphasis2">{erfNo}</span>
				</span>
			}
			hr1={<p></p>}
		>
			<MapIrepsMap>
				<MapMarkerOnMap gpsPoint={gpsPoint} label={erfNo} />
			</MapIrepsMap>
		</IrepsInfoWindow>
	);
};

export default IwErfOnMap;
