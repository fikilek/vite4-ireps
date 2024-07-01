import { useEffect, useState } from "react";

// hooks
import { useFirestore } from "@/hooks/useFirestore.jsx";
import useIrepsMap from "@/hooks/useIrepsMap";
import useAuthContext from "@/hooks/useAuthContext";
import { useMap } from "@vis.gl/react-google-maps";

const MapLmWardBoundaries = () => {
	const map = useMap();
	// console.log(`map`, map);

	const { user } = useAuthContext();
	// console.log(`user`, user);

	// get user details from firestore on snapshot
	const { getDocument, response } = useFirestore("users");
	// console.log(`response`, response);

	const [workbase, setWorkbase] = useState(null);
	// console.log(`workbase`, workbase);

	const { displayLmWardBondaries, wardBoundaries } = useIrepsMap(workbase);
	// console.log(`displayLmWardBondaries`, displayLmWardBondaries)

	useEffect(() => {
		if (user?.uid) {
			getDocument(user?.uid);
		}
	}, [user?.uid]);

	useEffect(() => {
		if (response.success) {
			// console.log(`response`, response);
			const { workbase } = response?.document;
			// console.log(`workbase`, workbase)
			setWorkbase(workbase);
		}
	}, [response.success]);

	useEffect(() => {
		displayLmWardBondaries(map);
	}, [wardBoundaries]);

	return <div className="map-boundaries"></div>;
};

export default MapLmWardBoundaries;
