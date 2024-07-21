// css
import "@/components/maps/rgm/RgmErfsMap.css";

// components
import RgmIrepsMap from "@/components/maps/rgm/RgmIrepsMap";
import RgmErfMarker from "@/components/maps/rgm/RgmErfMarker";
import RgmErfMarkers from "@/components/maps/rgm/RgmErfMarkers";

// import RgmErfMarker from "@/components/maps/rgm/RgmErfMarker";

// RgmErfsMap go to firebase erfs collection and fetch erfs on the workbase. These are then displayed using clustering
const RgmErfsMap = (props) => {

	const { erfs } = props;
	// console.log(`erfs`, erfs)

	// const { erfsContext } = useContext(erfsContext);

	return (
		<div className="rgm-erfs-map">
			<RgmIrepsMap erfs={erfs} >
				{/* <RgmErfMarker erf={erfs[0]} /> */}
				{/* <RgmErfMarkers erfs={erfs} /> */}
			</RgmIrepsMap>
		</div>
	);
};

export default RgmErfsMap;
