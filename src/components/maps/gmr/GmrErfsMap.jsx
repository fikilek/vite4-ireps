// css
import "@/components/maps/gmr/GmrErfsMap.css";

// components
import GmrIrepsMap from "@/components/maps/gmr/GmrIrepsMap";
import GmrErfMarker from "@/components/maps/gmr/GmrErfMarker";

// GmrErfsMap go to firebase erfs collection and fetch erfs on the workbase. These are then displayed using clustering
const GmrErfsMap = (props) => {

	const { erfs } = props;

	// const { erfsContext } = useContext(erfsContext);
	// console.log(`erfsContext`, erfsContext)

	return (
		<div className="gmr-erfs-map">
			<GmrIrepsMap >
				<GmrErfMarker erf={erfs[0]} />
			</GmrIrepsMap>
		</div>
	);
};

export default GmrErfsMap;
