//  css
import "@/components/maps/gmr/GmrErfMarker.css";

const Marker = ({ children }) => children;

const GmrErfMarker = (props) => {
	console.log(`props`, props);
	const { erf } = props;

	// const {latitude, longitude, openInfoWindow, markerId, markerData} = props
	// const {erfNo, asts} = markerData
	// const handleClick = e => {
	//   openInfoWindow(markerId, latitude, longitude)
	// }
	return (
		// <div className="gmr-erf-marker">
			<Marker
				key={erf.id}
				lat={erf?.address?.gps?.latitude}
				lng={erf?.address?.gps?.longitude}
			>
				<button
					className={`erf-marker`}
				>
					<span >{erf.erfNo}</span>
				</button>
				{/* <GmrErf erfNo={erfNo} openInfoWindow={openInfoWindow} /> */}
				{/* <GmrAstsOnErfs erf={props.erf} /> */}
			</Marker>
		// </div>
	);
};

export default GmrErfMarker;
