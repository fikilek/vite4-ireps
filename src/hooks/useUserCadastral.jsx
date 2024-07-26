// npm library imports
import { useReducer, useEffect, useState } from "react";

// hoooks
import { useFirestore } from "@/hooks/useFirestore.jsx";

// contexts
import useAuthContext from "@/hooks/useAuthContext";

/****************************************************************************
Victor Khanye LM
*****************************************************************************/
// Victor Khanye LM boundary

import za_mp_nkangala_vk from "@/maps/za/za_mp_nkangala_vk.geojson";
// Victor Khanye ward boundaries
import za_mp_nkangala_vk_w1 from "@/maps/za/za_mp_nkangala_vk_w1.geojson";
import za_mp_nkangala_vk_w2 from "@/maps/za/za_mp_nkangala_vk_w2.geojson";
import za_mp_nkangala_vk_w3 from "@/maps/za/za_mp_nkangala_vk_w3.geojson";
import za_mp_nkangala_vk_w4 from "@/maps/za/za_mp_nkangala_vk_w4.geojson";
import za_mp_nkangala_vk_w5 from "@/maps/za/za_mp_nkangala_vk_w5.geojson";
import za_mp_nkangala_vk_w6 from "@/maps/za/za_mp_nkangala_vk_w6.geojson";
import za_mp_nkangala_vk_w7 from "@/maps/za/za_mp_nkangala_vk_w7.geojson";
import za_mp_nkangala_vk_w8 from "@/maps/za/za_mp_nkangala_vk_w8.geojson";
import za_mp_nkangala_vk_w9 from "@/maps/za/za_mp_nkangala_vk_w9.geojson";

/****************************************************************************
Lesedi LM
*****************************************************************************/
// Lesedi LM boundary
import za_gp_sedibeng_lesedi from "@/maps/za/za_gp_sedibeng_lesedi.geojson";
// Lesedi LM ward boundaries
import za_gp_sedibeng_lesedi_w1 from "@/maps/za/za_gp_sedibeng_lesedi_w1.geojson";
import za_gp_sedibeng_lesedi_w2 from "@/maps/za/za_gp_sedibeng_lesedi_w2.geojson";
import za_gp_sedibeng_lesedi_w3 from "@/maps/za/za_gp_sedibeng_lesedi_w3.geojson";
import za_gp_sedibeng_lesedi_w4 from "@/maps/za/za_gp_sedibeng_lesedi_w4.geojson";
import za_gp_sedibeng_lesedi_w5 from "@/maps/za/za_gp_sedibeng_lesedi_w5.geojson";
import za_gp_sedibeng_lesedi_w6 from "@/maps/za/za_gp_sedibeng_lesedi_w6.geojson";
import za_gp_sedibeng_lesedi_w7 from "@/maps/za/za_gp_sedibeng_lesedi_w7.geojson";
import za_gp_sedibeng_lesedi_w8 from "@/maps/za/za_gp_sedibeng_lesedi_w8.geojson";
import za_gp_sedibeng_lesedi_w9 from "@/maps/za/za_gp_sedibeng_lesedi_w9.geojson";
import za_gp_sedibeng_lesedi_w10 from "@/maps/za/za_gp_sedibeng_lesedi_w10.geojson";
import za_gp_sedibeng_lesedi_w11 from "@/maps/za/za_gp_sedibeng_lesedi_w11.geojson";
import za_gp_sedibeng_lesedi_w12 from "@/maps/za/za_gp_sedibeng_lesedi_w12.geojson";
import za_gp_sedibeng_lesedi_w13 from "@/maps/za/za_gp_sedibeng_lesedi_w13.geojson";

/****************************************************************************
Nkandla LM
*****************************************************************************/
// za_kzn_umgungundlovu_mpofana lm boundary
import za_kzn_king_cetshwayo_nkandla from "@/maps/za/za_kzn_king_cetshwayo_nkandla.geojson";
// za_kzn_king_cetshwayo_nkandla ward boundaries
import za_kzn_king_cetshwayo_nkandla_w1 from "@/maps/za/za_kzn_king_cetshwayo_nkandla_w1.geojson";
import za_kzn_king_cetshwayo_nkandla_w2 from "@/maps/za/za_kzn_king_cetshwayo_nkandla_w2.geojson";
import za_kzn_king_cetshwayo_nkandla_w3 from "@/maps/za/za_kzn_king_cetshwayo_nkandla_w3.geojson";
import za_kzn_king_cetshwayo_nkandla_w4 from "@/maps/za/za_kzn_king_cetshwayo_nkandla_w4.geojson";
import za_kzn_king_cetshwayo_nkandla_w5 from "@/maps/za/za_kzn_king_cetshwayo_nkandla_w5.geojson";
import za_kzn_king_cetshwayo_nkandla_w6 from "@/maps/za/za_kzn_king_cetshwayo_nkandla_w6.geojson";
import za_kzn_king_cetshwayo_nkandla_w7 from "@/maps/za/za_kzn_king_cetshwayo_nkandla_w7.geojson";
import za_kzn_king_cetshwayo_nkandla_w8 from "@/maps/za/za_kzn_king_cetshwayo_nkandla_w8.geojson";
import za_kzn_king_cetshwayo_nkandla_w9 from "@/maps/za/za_kzn_king_cetshwayo_nkandla_w9.geojson";
import za_kzn_king_cetshwayo_nkandla_w10 from "@/maps/za/za_kzn_king_cetshwayo_nkandla_w10.geojson";
import za_kzn_king_cetshwayo_nkandla_w11 from "@/maps/za/za_kzn_king_cetshwayo_nkandla_w11.geojson";
import za_kzn_king_cetshwayo_nkandla_w12 from "@/maps/za/za_kzn_king_cetshwayo_nkandla_w12.geojson";
import za_kzn_king_cetshwayo_nkandla_w13 from "@/maps/za/za_kzn_king_cetshwayo_nkandla_w13.geojson";
import za_kzn_king_cetshwayo_nkandla_w14 from "@/maps/za/za_kzn_king_cetshwayo_nkandla_w14.geojson";

/****************************************************************************
Mpofana LM
*****************************************************************************/
// za_kzn_umgungundlovu_mpofana lm boundary
import za_kzn_umgungundlovu_mpofana from "@/maps/za/za_kzn_umgungundlovu_mpofana.geojson";
// za_kzn_umgungundlovu_mpofana ward boundaries
import za_kzn_umgungundlovu_mpofana_w1 from "@/maps/za/za_kzn_umgungundlovu_mpofana_w1.geojson";
import za_kzn_umgungundlovu_mpofana_w2 from "@/maps/za/za_kzn_umgungundlovu_mpofana_w2.geojson";
import za_kzn_umgungundlovu_mpofana_w3 from "@/maps/za/za_kzn_umgungundlovu_mpofana_w3.geojson";
import za_kzn_umgungundlovu_mpofana_w4 from "@/maps/za/za_kzn_umgungundlovu_mpofana_w4.geojson";
import za_kzn_umgungundlovu_mpofana_w5 from "@/maps/za/za_kzn_umgungundlovu_mpofana_w5.geojson";
// za_kzn_umgungundlovu_mpofana ward cadastral
import za_kzn_umgungundlovu_mpofana_w1_cadastral from "@/maps/za/za_kzn_umgungundlovu_mpofana_w1_cadastral.geojson";
import za_kzn_umgungundlovu_mpofana_w2_cadastral from "@/maps/za/za_kzn_umgungundlovu_mpofana_w2_cadastral.geojson";
import za_kzn_umgungundlovu_mpofana_w3_cadastral from "@/maps/za/za_kzn_umgungundlovu_mpofana_w3_cadastral.geojson";
import za_kzn_umgungundlovu_mpofana_w4_cadastral from "@/maps/za/za_kzn_umgungundlovu_mpofana_w4_cadastral.geojson";
import za_kzn_umgungundlovu_mpofana_w5_cadastral from "@/maps/za/za_kzn_umgungundlovu_mpofana_w5_cadastral.geojson";

const initUserCadastral = {
	lmName: null,
	lmWardBoundaries: [],
	lmBoundary: [],
};

const reducer = (state, action) => {
	// console.log(`state`, state);
	// console.log(`action`, action);

	const { type } = action;
	const { payload } = action;
	switch (type) {
		default:
			return state;
		case "lmName":
			return { ...state, lmName: payload?.lmName };
		case "lmWardBoundaries":
			return { ...state, lmWardBoundaries: payload?.lmWardBoundaries };
		case "lmBoundary":
			return { ...state, lmBoundary: payload?.lmBoundary };
	}
};

const useUserCadastral = () => {
	// console.log(`useUserCadastral`);

	// ------------------------------------------------------------------

	// get workbase from user
	const { user } = useAuthContext();
	// console.log(`user`, user);

	// get user details from firestore on snapshot
	const { getDocument, response } = useFirestore("users");
	// console.log(`response`, response);

	const [workbase, setWorkbase] = useState(null);
	// console.log(`workbase`, workbase);

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

	// ---------------------------------------------------------

	// set user cadastral data based on user workbase
	const [state, dispatch] = useReducer(reducer, initUserCadastral);
	// console.log(`state`, state);

	useEffect(() => {
		if (workbase) {
			// console.log(`workbase`, workbase);
			dispatch({
				type: "lmName",
				payload: {
					lmName: workbase,
				},
			});

			let lmWardBoundaries = [];
			switch (workbase) {
				case "Nkandla LM":
					console.log(`workbase`, workbase);

					lmWardBoundaries.push({
						wardBoundary: za_kzn_king_cetshwayo_nkandla_w1,
						wardName: "w1",
					});
					lmWardBoundaries.push({
						wardBoundary: za_kzn_king_cetshwayo_nkandla_w2,
						wardName: "w2",
					});
					lmWardBoundaries.push({
						wardBoundary: za_kzn_king_cetshwayo_nkandla_w3,
						wardName: "w3",
					});
					lmWardBoundaries.push({
						wardBoundary: za_kzn_king_cetshwayo_nkandla_w4,
						wardName: "w4",
					});
					lmWardBoundaries.push({
						wardBoundary: za_kzn_king_cetshwayo_nkandla_w5,
						wardName: "w5",
					});
					lmWardBoundaries.push({
						wardBoundary: za_kzn_king_cetshwayo_nkandla_w6,
						wardName: "w6",
					});
					lmWardBoundaries.push({
						wardBoundary: za_kzn_king_cetshwayo_nkandla_w7,
						wardName: "w7",
					});
					lmWardBoundaries.push({
						wardBoundary: za_kzn_king_cetshwayo_nkandla_w8,
						wardName: "w8",
					});
					lmWardBoundaries.push({
						wardBoundary: za_kzn_king_cetshwayo_nkandla_w9,
						wardName: "w9",
					});
					lmWardBoundaries.push({
						wardBoundary: za_kzn_king_cetshwayo_nkandla_w10,
						wardName: "w10",
					});
					lmWardBoundaries.push({
						wardBoundary: za_kzn_king_cetshwayo_nkandla_w11,
						wardName: "w11",
					});
					lmWardBoundaries.push({
						wardBoundary: za_kzn_king_cetshwayo_nkandla_w12,
						wardName: "w12",
					});
					lmWardBoundaries.push({
						wardBoundary: za_kzn_king_cetshwayo_nkandla_w13,
						wardName: "w13",
					});
					lmWardBoundaries.push({
						wardBoundary: za_kzn_king_cetshwayo_nkandla_w14,
						wardName: "w14",
					});

					dispatch({
						type: "lmWardBoundaries",
						payload: {
							lmWardBoundaries: lmWardBoundaries,
						},
					});

					dispatch({
						type: "lmBoundary",
						payload: {
							lmBoundary: za_kzn_king_cetshwayo_nkandla,
						},
					});
					break;

				case "Mpofana LM":
					// console.log(`workbase`, workbase);

					// ward 1
					lmWardBoundaries.push({
						wardBoundary: za_kzn_umgungundlovu_mpofana_w1,
						erfBoundary: za_kzn_umgungundlovu_mpofana_w1_cadastral,
						ward: "w1",
					});
					// ward 2
					lmWardBoundaries.push({
						wardBoundary: za_kzn_umgungundlovu_mpofana_w2,
						erfBoundary: za_kzn_umgungundlovu_mpofana_w2_cadastral,
						ward: "w2",
					});
					// ward 3
					lmWardBoundaries.push({
						wardBoundary: za_kzn_umgungundlovu_mpofana_w3,
						erfBoundary: za_kzn_umgungundlovu_mpofana_w3_cadastral,
						ward: "w3",
					});

					// ward 4
					lmWardBoundaries.push({
						wardBoundary: za_kzn_umgungundlovu_mpofana_w4,
						erfBoundary: za_kzn_umgungundlovu_mpofana_w4_cadastral,
						ward: "w4",
					});

					// ward 5
					lmWardBoundaries.push({
						wardBoundary: za_kzn_umgungundlovu_mpofana_w5,
						erfBoundary: za_kzn_umgungundlovu_mpofana_w5_cadastral,
						ward: "w5",
					});
					// console.log(`lmWardBoundaries`, lmWardBoundaries)

					dispatch({
						type: "lmWardBoundaries",
						payload: {
							lmWardBoundaries: lmWardBoundaries,
						},
					});

					dispatch({
						type: "lmBoundary",
						payload: {
							lmBoundary: za_kzn_umgungundlovu_mpofana,
						},
					});
					break;

				case "eDumbe LM":
					// console.log(`workbase`, workbase);
					break;

				case "Victor Khanye LM":
					// console.log(`workbase`, workbase);
					lmWardBoundaries.push({
						wardBoundary: za_mp_nkangala_vk_w1,
						erfBoundary: '',
						ward: "w1",
					});
					lmWardBoundaries.push({
						wardBoundary: za_mp_nkangala_vk_w2,
						// erfBoundary: za_mp_nkangala_vk_w1_cadastral,
						ward: "w2",
					});
					lmWardBoundaries.push({
						wardBoundary: za_mp_nkangala_vk_w3,
						// erfBoundary: za_mp_nkangala_vk_w1_cadastral,
						ward: "w3",
					});
					lmWardBoundaries.push({
						wardBoundary: za_mp_nkangala_vk_w4,
						// erfBoundary: za_mp_nkangala_vk_w1_cadastral,
						ward: "w4",
					});
					lmWardBoundaries.push({
						wardBoundary: za_mp_nkangala_vk_w5,
						// erfBoundary: za_mp_nkangala_vk_w1_cadastral,
						ward: "w5",
					});
					lmWardBoundaries.push({
						wardBoundary: za_mp_nkangala_vk_w6,
						// erfBoundary: za_mp_nkangala_vk_w1_cadastral,
						ward: "w6",
					});
					lmWardBoundaries.push({
						wardBoundary: za_mp_nkangala_vk_w7,
						// erfBoundary: za_mp_nkangala_vk_w1_cadastral,
						ward: "w7",
					});
					lmWardBoundaries.push({
						wardBoundary: za_mp_nkangala_vk_w8,
						// erfBoundary: za_mp_nkangala_vk_w1_cadastral,
						ward: "w8",
					});
					lmWardBoundaries.push({
						wardBoundary: za_mp_nkangala_vk_w9,
						// erfBoundary: za_mp_nkangala_vk_w1_cadastral,
						ward: "w9",
					});

					dispatch({
						type: "lmWardBoundaries",
						payload: {
							lmWardBoundaries: lmWardBoundaries,
						},
					});

					dispatch({
						type: "lmBoundary",
						payload: {
							lmBoundary: za_mp_nkangala_vk,
						},
					});
					break;

				case "Lesedi LM":
					// console.log(`workbase`, workbase);
					lmWardBoundaries.push({
						wardBoundary: za_gp_sedibeng_lesedi_w1,
						erfBoundary: "",
						ward: "w1",
					});
					lmWardBoundaries.push({
						wardBoundary: za_gp_sedibeng_lesedi_w2,
						erfBoundary: "",
						ward: "w2",
					});
					lmWardBoundaries.push({
						wardBoundary: za_gp_sedibeng_lesedi_w3,
						erfBoundary: "",
						ward: "w3",
					});
					lmWardBoundaries.push({
						wardBoundary: za_gp_sedibeng_lesedi_w4,
						erfBoundary: "",
						ward: "w4",
					});
					lmWardBoundaries.push({
						wardBoundary: za_gp_sedibeng_lesedi_w5,
						erfBoundary: "",
						ward: "w5",
					});
					lmWardBoundaries.push({
						wardBoundary: za_gp_sedibeng_lesedi_w6,
						erfBoundary: "",
						ward: "w6",
					});
					lmWardBoundaries.push({
						wardBoundary: za_gp_sedibeng_lesedi_w7,
						erfBoundary: "",
						ward: "w7",
					});
					lmWardBoundaries.push({
						wardBoundary: za_gp_sedibeng_lesedi_w8,
						erfBoundary: "",
						ward: "w8",
					});
					lmWardBoundaries.push({
						wardBoundary: za_gp_sedibeng_lesedi_w9,
						erfBoundary: "",
						ward: "w9",
					});
					lmWardBoundaries.push({
						wardBoundary: za_gp_sedibeng_lesedi_w10,
						erfBoundary: "",
						ward: "w10",
					});
					lmWardBoundaries.push({
						wardBoundary: za_gp_sedibeng_lesedi_w11,
						erfBoundary: "",
						ward: "w11",
					});
					lmWardBoundaries.push({
						wardBoundary: za_gp_sedibeng_lesedi_w12,
						erfBoundary: "",
						ward: "w12",
					});
					lmWardBoundaries.push({
						wardBoundary: za_gp_sedibeng_lesedi_w13,
						erfBoundary: "",
						ward: "w13",
					});

					dispatch({
						type: "lmWardBoundaries",
						payload: {
							lmWardBoundaries: lmWardBoundaries,
						},
					});

					dispatch({
						type: "lmBoundary",
						payload: {
							lmBoundary: za_gp_sedibeng_lesedi,
						},
					});
					break;

				default:
					break;
			}
		}
	}, [workbase]);

	return { state };
};

export default useUserCadastral;
