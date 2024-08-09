// css
import "@/pages/map/Map.css";

// hooks
import { useAsts } from "@/hooks/useAsts.jsx";
import { useErfs } from "@/hooks/useErfs.jsx";

// components
import MapMain from "@/components/map/MapMain";
import MapHeader from "@/components/map/MapHeader";

const Map = () => {
	useErfs();
	useAsts();
	return (
		<div className="map">
			<MapHeader phLl="Map" />
			<div className="map-body">
				<MapMain />
			</div>
		</div>
	);
};

export default Map;
