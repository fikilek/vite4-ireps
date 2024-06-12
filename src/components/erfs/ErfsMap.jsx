// css
import "@/components/erfs/ErfsMap.css";

// components
import MapBoundaries from "@/components/maps/MapBoundaries";
import MapErfsMarkers from "@/components/maps/MapErfsMarkers";
import MapIrepsMap from "@/components/maps/MapIrepsMap";

const ErfsMap = () => {
	return (
		<div className="erfs-map">
			<MapIrepsMap>
				<MapBoundaries />
				<MapErfsMarkers />
			</MapIrepsMap>
		</div>
	);
};

export default ErfsMap;
