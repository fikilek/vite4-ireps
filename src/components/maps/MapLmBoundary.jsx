import { useMap } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

// hooks
import { useFirestore } from "@/hooks/useFirestore.jsx";
import useIrepsMap from "@/hooks/useIrepsMap";
import useAuthContext from "@/hooks/useAuthContext";
import useCadastral from "@/hooks/useCadastral";

const MapLmBoundary = (props) => {

	// console.log(`props`, props)
	// const {mapRef} = props
	// console.log(`mapRef`, mapRef)

	const { user } = useAuthContext();
	// console.log(`user`, user);

	// get user details from firestore on snapshot
	const { getDocument, response } = useFirestore("users");
	// console.log(`response`, response);
	
	const [workbase, setWorkbase] = useState(null)
	// console.log(`workbase`, workbase);

	// get map object
	const map = useMap();
	// const map = mapRef.current;
	// console.log(`map`, map);

	const { displayLmBondary } = useIrepsMap();
	// console.log(`displayLmBondary`, displayLmBondary)
	
	const {lmBoundaryFile} = useCadastral(workbase?.trim())
	// console.log(`lmBoundaryFile`, lmBoundaryFile)

	useEffect(() => {
		if (user?.uid) {
			getDocument(user?.uid);
		}
	}, [user?.uid]);

	useEffect(()=>{
		if(response.success) {
			// console.log(`response`, response);
			const {workbase} = response?.document
			// console.log(`workbase`, workbase)
			setWorkbase(workbase)
		}
	},[response.success])

	useEffect(() => {

		map?.data?.forEach(function (feature) {
			// console.log(`feature`, feature);
			map?.data.remove(feature);
		});

		if (!map) return;
		
		displayLmBondary(map, lmBoundaryFile);

		return () => {
			// console.log(`cleaning`);
			// setSetSelected(null);
			map?.data?.forEach(function (feature) {
				// console.log(`feature`, feature);
				map?.data.remove(feature);
			});
		};
	}, [lmBoundaryFile]);

	return <div className="map-boundaries"></div>;
};

export default MapLmBoundary;
