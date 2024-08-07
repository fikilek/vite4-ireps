// import { useContext } from "react";

// css
import "@/pages/map/Map.css";

// hooks
import {useAsts} from '@/hooks/useAsts.jsx'
import {useErfs} from '@/hooks/useErfs.jsx'

// contexts
// import { MapContext } from "@/contexts/MapContext";

// components
import MapMain from "@/components/map/MapMain";
import MapHeader from "@/components/map/MapHeader";
// import Filters from "@/components/filters/Filters";

const Map = () => {
	useErfs()
	useAsts()
	// const { mapContext } = useContext(MapContext);
	return (
		<div className="map">
			<MapHeader phLl="Map" />
			<div className="map-body">
				{/* {mapContext.filterBtn ? <Filters irepsKeyItem="map" /> : null} */}
				<MapMain />
			</div>
		</div>
	);
};

export default Map;
