import { useState, useEffect, useContext } from "react";
import {
	collection,
	onSnapshot,
	orderBy,
	where,
	query,
	or,
} from "firebase/firestore";

// hooks
import useAuthContext from "@/hooks/useAuthContext";
import { useFirestore_ } from "@/hooks/useFirestore_";

// contexts
import { AstsContext } from "@/contexts/AstsContext";

// components
import { db } from "@/firebaseConfig/fbConfig";

function getRandomColor() {
	var letters = "0123456789ABCDEF";
	var color = "#";
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

const useGetAstsCollection = (fbCollection) => {
	// console.log(`fbCollection`, fbCollection);
	// console.log(`_constraints`, _constraints);

	const { astsContext, setAstsContext } = useContext(AstsContext);
	// console.log(`astsContext`, astsContext);

	const [asts, setAsts] = useState([]);
	// console.log(`asts`, asts);

	const [error, setError] = useState("");
	// console.log(`error`, error);

	const { getDocument } = useFirestore_("users");

	const { user } = useAuthContext();
	// console.log(`user`, user);

	const { uid } = user;
	// console.log(`uid`, uid);

	useEffect(() => {
		getDocument(uid).then((userData) => {
			// console.log(`userData`, userData);

			const { workbase } = userData?.doc;
			// console.log(`workbase`, workbase);

			const constraints = where("erf.address.lmMetro", "==", workbase);
			// console.log(`constraints`, constraints);

			if (!constraints) return;
			const q = query(
				collection(db, fbCollection),
				or(constraints, where("astData.astState.state", "==", "stores")),
				orderBy("metadata.updatedAtDatetime", "desc")
			);

			setError("");

			onSnapshot(
				q,
				(snapShot) => {
					const results = [];
					snapShot.docs.forEach((doc) => {
						results.push({ id: doc.id, ...doc.data() });
					});
					setAsts(results);

					const stats = {};
					results?.forEach((ast) => {
						stats[ast.metadata.createdByUid] =
							1 + (stats[ast.metadata.createdByUid] || 0);
					});

					const updatedStats = [];
					for (const uid in stats) {
						// console.log(`${uid}: ${object[property]}`);
						const matchingAst = results.find((ast) => {
							return ast?.metadata?.createdByUid === uid;
						});

						const percentage = ((stats[uid] / results?.length) * 100).toFixed(
							2
						);

						updatedStats.push({
							uid: uid,
							displayName: matchingAst?.metadata?.createdByUser,
							quantity: stats[uid],
							percentage: percentage,
							fillColor: getRandomColor(),
						});
					}

					setAstsContext({
						...astsContext,
						asts: results,
						statsCreatedAtDatetimeByUser: updatedStats,
					});
				},
				(err) => {
					console.log(`firestore err`, err.message);
					setError(err.message);
				}
			);

			setError("");
		});
	}, []);

	return { asts, error };
};

export default useGetAstsCollection;
