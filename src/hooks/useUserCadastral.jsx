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
// za_mp_nlangala_vk ward cadastral
import za_mp_nkangala_vk_w1_cadastral from "@/maps/za/za_mp_nkangala_vk_w1_cadastral.geojson";
import za_mp_nkangala_vk_w2_cadastral from "@/maps/za/za_mp_nkangala_vk_w2_cadastral.geojson";
import za_mp_nkangala_vk_w3_cadastral from "@/maps/za/za_mp_nkangala_vk_w3_cadastral.geojson";
import za_mp_nkangala_vk_w4_cadastral from "@/maps/za/za_mp_nkangala_vk_w4_cadastral.geojson";
import za_mp_nkangala_vk_w5_cadastral from "@/maps/za/za_mp_nkangala_vk_w5_cadastral.geojson";
import za_mp_nkangala_vk_w6_cadastral from "@/maps/za/za_mp_nkangala_vk_w6_cadastral.geojson";
import za_mp_nkangala_vk_w7_cadastral from "@/maps/za/za_mp_nkangala_vk_w7_cadastral.geojson";
import za_mp_nkangala_vk_w8_cadastral from "@/maps/za/za_mp_nkangala_vk_w8_cadastral.geojson";
import za_mp_nkangala_vk_w9_cadastral from "@/maps/za/za_mp_nkangala_vk_w9_cadastral.geojson";

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

/****************************************************************************
eDumbe LM
*****************************************************************************/
// za_kzn_kwazulu_edumbe lm boundary
import za_kzn_kwazulu_edumbe from "@/maps/za/za_kzn_kwazulu_edumbe.geojson";
// za_kzn_kwazulu_edumbe ward boundaries
import za_kzn_kwazulu_edumbe_w1 from "@/maps/za/za_kzn_kwazulu_edumbe_w1.geojson";
import za_kzn_kwazulu_edumbe_w2 from "@/maps/za/za_kzn_kwazulu_edumbe_w2.geojson";
// import za_kzn_kwazulu_edumbe_w3 from "@/maps/za/za_kzn_kwazulu_edumbe_w3.geojson";
// import za_kzn_kwazulu_edumbe_w4 from "@/maps/za/za_kzn_kwazulu_edumbe_w4.geojson";
// import za_kzn_kwazulu_edumbe_w5 from "@/maps/za/za_kzn_kwazulu_edumbe_w5.geojson";
// za_kzn_kwazulu_edumbe ward cadastral
// import za_kzn_kwazulu_edumbe_w1_cadastral from "@/maps/za/za_kzn_kwazulu_edumbe_w1_cadastral.geojson";
// import za_kzn_kwazulu_edumbe_w2_cadastral from "@/maps/za/za_kzn_kwazulu_edumbe_w2_cadastral.geojson";
// import za_kzn_kwazulu_edumbe_w3_cadastral from "@/maps/za/za_kzn_kwazulu_edumbe_w3_cadastral.geojson";
// import za_kzn_kwazulu_edumbe_w4_cadastral from "@/maps/za/za_kzn_kwazulu_edumbe_w4_cadastral.geojson";
// import za_kzn_kwazulu_edumbe_w5_cadastral from "@/maps/za/za_kzn_kwazulu_edumbe_w5_cadastral.geojson";

/****************************************************************************
Amahlathi LM
*****************************************************************************/

// Amahlathi LM boundary
import za_ec_amathole_amahlathi from "@/maps/za/za_ec_amathole_amahlathi.geojson";

// Amahlathi ward boundaries
import za_ec_amathole_amahlathi_w1 from "@/maps/za/za_ec_amathole_amahlathi_w1.geojson";
import za_ec_amathole_amahlathi_w2 from "@/maps/za/za_ec_amathole_amahlathi_w2.geojson";
import za_ec_amathole_amahlathi_w3 from "@/maps/za/za_ec_amathole_amahlathi_w3.geojson";
import za_ec_amathole_amahlathi_w4 from "@/maps/za/za_ec_amathole_amahlathi_w4.geojson";
import za_ec_amathole_amahlathi_w5 from "@/maps/za/za_ec_amathole_amahlathi_w5.geojson";
import za_ec_amathole_amahlathi_w6 from "@/maps/za/za_ec_amathole_amahlathi_w6.geojson";
import za_ec_amathole_amahlathi_w7 from "@/maps/za/za_ec_amathole_amahlathi_w7.geojson";
import za_ec_amathole_amahlathi_w8 from "@/maps/za/za_ec_amathole_amahlathi_w8.geojson";
import za_ec_amathole_amahlathi_w9 from "@/maps/za/za_ec_amathole_amahlathi_w9.geojson";
import za_ec_amathole_amahlathi_w10 from "@/maps/za/za_ec_amathole_amahlathi_w10.geojson";
import za_ec_amathole_amahlathi_w11 from "@/maps/za/za_ec_amathole_amahlathi_w11.geojson";
import za_ec_amathole_amahlathi_w12 from "@/maps/za/za_ec_amathole_amahlathi_w12.geojson";
import za_ec_amathole_amahlathi_w13 from "@/maps/za/za_ec_amathole_amahlathi_w13.geojson";
import za_ec_amathole_amahlathi_w14 from "@/maps/za/za_ec_amathole_amahlathi_w14.geojson";
import za_ec_amathole_amahlathi_w15 from "@/maps/za/za_ec_amathole_amahlathi_w15.geojson";

// za_ec_amathole_amahlathi ward cadastral
import za_ec_amathole_amahlathi_w1_cadastral from "@/maps/za/za_ec_amathole_amahlathi_w1_cadastral.geojson";
import za_ec_amathole_amahlathi_w2_cadastral from "@/maps/za/za_ec_amathole_amahlathi_w2_cadastral.geojson";
import za_ec_amathole_amahlathi_w3_cadastral from "@/maps/za/za_ec_amathole_amahlathi_w3_cadastral.geojson";
import za_ec_amathole_amahlathi_w4_cadastral from "@/maps/za/za_ec_amathole_amahlathi_w4_cadastral.geojson";
import za_ec_amathole_amahlathi_w5_cadastral from "@/maps/za/za_ec_amathole_amahlathi_w5_cadastral.geojson";
import za_ec_amathole_amahlathi_w6_cadastral from "@/maps/za/za_ec_amathole_amahlathi_w6_cadastral.geojson";
import za_ec_amathole_amahlathi_w7_cadastral from "@/maps/za/za_ec_amathole_amahlathi_w7_cadastral.geojson";
import za_ec_amathole_amahlathi_w8_cadastral from "@/maps/za/za_ec_amathole_amahlathi_w8_cadastral.geojson";
import za_ec_amathole_amahlathi_w9_cadastral from "@/maps/za/za_ec_amathole_amahlathi_w9_cadastral.geojson";
import za_ec_amathole_amahlathi_w10_cadastral from "@/maps/za/za_ec_amathole_amahlathi_w10_cadastral.geojson";
import za_ec_amathole_amahlathi_w11_cadastral from "@/maps/za/za_ec_amathole_amahlathi_w11_cadastral.geojson";
import za_ec_amathole_amahlathi_w12_cadastral from "@/maps/za/za_ec_amathole_amahlathi_w12_cadastral.geojson";
import za_ec_amathole_amahlathi_w13_cadastral from "@/maps/za/za_ec_amathole_amahlathi_w13_cadastral.geojson";
import za_ec_amathole_amahlathi_w14_cadastral from "@/maps/za/za_ec_amathole_amahlathi_w14_cadastral.geojson";
import za_ec_amathole_amahlathi_w15_cadastral from "@/maps/za/za_ec_amathole_amahlathi_w15_cadastral.geojson";

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
						ward: 1,
					});
					// ward 2
					lmWardBoundaries.push({
						wardBoundary: za_kzn_umgungundlovu_mpofana_w2,
						erfBoundary: za_kzn_umgungundlovu_mpofana_w2_cadastral,
						ward: 2,
					});
					// ward 3
					lmWardBoundaries.push({
						wardBoundary: za_kzn_umgungundlovu_mpofana_w3,
						erfBoundary: za_kzn_umgungundlovu_mpofana_w3_cadastral,
						ward: 3,
					});

					// ward 4
					lmWardBoundaries.push({
						wardBoundary: za_kzn_umgungundlovu_mpofana_w4,
						erfBoundary: za_kzn_umgungundlovu_mpofana_w4_cadastral,
						ward: 4,
					});

					// ward 5
					lmWardBoundaries.push({
						wardBoundary: za_kzn_umgungundlovu_mpofana_w5,
						erfBoundary: za_kzn_umgungundlovu_mpofana_w5_cadastral,
						ward: 5,
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
					console.log(`workbase`, workbase);

					lmWardBoundaries.push({
						wardBoundary: za_kzn_kwazulu_edumbe_w1,
						erfBoundary: "",
						ward: 1,
					});

					lmWardBoundaries.push({
						wardBoundary: za_kzn_kwazulu_edumbe_w2,
						erfBoundary: "",
						ward: 2,
					});

					// lmWardBoundaries.push({
					// 	wardBoundary: za_kzn_kwazulu_edumbe_w3,
					// 	ward: "w3",
					// });

					// lmWardBoundaries.push({
					// 	wardBoundary: za_kzn_kwazulu_edumbe_w4,
					// 	ward: "w4",
					// });

					// lmWardBoundaries.push({
					// 	wardBoundary: za_kzn_kwazulu_edumbe_w5,
					// 	ward: "w5",
					// });

					// lmWardBoundaries.push({
					// 	wardBoundary: za_kzn_kwazulu_edumbe_w6,
					// 	ward: "w6",
					// });

					// lmWardBoundaries.push({
					// 	wardBoundary: za_kzn_kwazulu_edumbe_w7,
					// 	ward: "w7",
					// });

					// lmWardBoundaries.push({
					// 	wardBoundary: za_kzn_kwazulu_edumbe_w8,
					// 	ward: "w8",
					// });

					dispatch({
						type: "lmWardBoundaries",
						payload: {
							lmWardBoundaries: lmWardBoundaries,
						},
					});

					dispatch({
						type: "lmBoundary",
						payload: {
							lmBoundary: za_kzn_kwazulu_edumbe,
						},
					});
					break;

				case "Victor Khanye LM":
					// console.log(`workbase`, workbase);
					lmWardBoundaries.push({
						wardBoundary: za_mp_nkangala_vk_w1,
						erfBoundary: za_mp_nkangala_vk_w1_cadastral,
						ward: 1,
					});
					lmWardBoundaries.push({
						wardBoundary: za_mp_nkangala_vk_w2,
						erfBoundary: za_mp_nkangala_vk_w2_cadastral,
						ward: 2,
					});
					lmWardBoundaries.push({
						wardBoundary: za_mp_nkangala_vk_w3,
						erfBoundary: za_mp_nkangala_vk_w3_cadastral,
						ward: 3,
					});
					lmWardBoundaries.push({
						wardBoundary: za_mp_nkangala_vk_w4,
						erfBoundary: za_mp_nkangala_vk_w4_cadastral,
						ward: 4,
					});
					lmWardBoundaries.push({
						wardBoundary: za_mp_nkangala_vk_w5,
						erfBoundary: za_mp_nkangala_vk_w5_cadastral,
						ward: 5,
					});
					lmWardBoundaries.push({
						wardBoundary: za_mp_nkangala_vk_w6,
						erfBoundary: za_mp_nkangala_vk_w6_cadastral,
						ward: 6,
					});
					lmWardBoundaries.push({
						wardBoundary: za_mp_nkangala_vk_w7,
						erfBoundary: za_mp_nkangala_vk_w7_cadastral,
						ward: 7,
					});
					lmWardBoundaries.push({
						wardBoundary: za_mp_nkangala_vk_w8,
						erfBoundary: za_mp_nkangala_vk_w8_cadastral,
						ward: 8,
					});
					lmWardBoundaries.push({
						wardBoundary: za_mp_nkangala_vk_w9,
						erfBoundary: za_mp_nkangala_vk_w9_cadastral,
						ward: 9,
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
						ward: 1,
					});
					lmWardBoundaries.push({
						wardBoundary: za_gp_sedibeng_lesedi_w2,
						erfBoundary: "",
						ward: 2,
					});
					lmWardBoundaries.push({
						wardBoundary: za_gp_sedibeng_lesedi_w3,
						erfBoundary: "",
						ward: 3,
					});
					lmWardBoundaries.push({
						wardBoundary: za_gp_sedibeng_lesedi_w4,
						erfBoundary: "",
						ward: 4,
					});
					lmWardBoundaries.push({
						wardBoundary: za_gp_sedibeng_lesedi_w5,
						erfBoundary: "",
						ward: 5,
					});
					lmWardBoundaries.push({
						wardBoundary: za_gp_sedibeng_lesedi_w6,
						erfBoundary: "",
						ward: 6,
					});
					lmWardBoundaries.push({
						wardBoundary: za_gp_sedibeng_lesedi_w7,
						erfBoundary: "",
						ward: 7,
					});
					lmWardBoundaries.push({
						wardBoundary: za_gp_sedibeng_lesedi_w8,
						erfBoundary: "",
						ward: 8,
					});
					lmWardBoundaries.push({
						wardBoundary: za_gp_sedibeng_lesedi_w9,
						erfBoundary: "",
						ward: 9,
					});
					lmWardBoundaries.push({
						wardBoundary: za_gp_sedibeng_lesedi_w10,
						erfBoundary: "",
						ward: 10,
					});
					lmWardBoundaries.push({
						wardBoundary: za_gp_sedibeng_lesedi_w11,
						erfBoundary: "",
						ward: 11,
					});
					lmWardBoundaries.push({
						wardBoundary: za_gp_sedibeng_lesedi_w12,
						erfBoundary: "",
						ward: 12,
					});
					lmWardBoundaries.push({
						wardBoundary: za_gp_sedibeng_lesedi_w13,
						erfBoundary: "",
						ward: 13,
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

				case "Amahlathi LM":
					// console.log(`workbase`, workbase);
					// ward 1
					lmWardBoundaries.push({
						wardBoundary: za_ec_amathole_amahlathi_w1,
						erfBoundary: za_ec_amathole_amahlathi_w1_cadastral,
						ward: 1,
					});
					// ward 2
					lmWardBoundaries.push({
						wardBoundary: za_ec_amathole_amahlathi_w2,
						erfBoundary: za_ec_amathole_amahlathi_w2_cadastral,
						ward: 2,
					});
					// ward 3
					lmWardBoundaries.push({
						wardBoundary: za_ec_amathole_amahlathi_w3,
						erfBoundary: za_ec_amathole_amahlathi_w3_cadastral,
						ward: 3,
					});

					// ward 4
					lmWardBoundaries.push({
						wardBoundary: za_ec_amathole_amahlathi_w4,
						erfBoundary: za_ec_amathole_amahlathi_w4_cadastral,
						ward: 4,
					});

					// ward 5
					lmWardBoundaries.push({
						wardBoundary: za_ec_amathole_amahlathi_w5,
						erfBoundary: za_ec_amathole_amahlathi_w5_cadastral,
						ward: 5,
					});

					// ward 6
					lmWardBoundaries.push({
						wardBoundary: za_ec_amathole_amahlathi_w6,
						erfBoundary: za_ec_amathole_amahlathi_w6_cadastral,
						ward: 6,
					});

					// ward 7
					lmWardBoundaries.push({
						wardBoundary: za_ec_amathole_amahlathi_w7,
						erfBoundary: za_ec_amathole_amahlathi_w7_cadastral,
						ward: 7,
					});

					// ward 8
					lmWardBoundaries.push({
						wardBoundary: za_ec_amathole_amahlathi_w8,
						erfBoundary: za_ec_amathole_amahlathi_w8_cadastral,
						ward: 8,
					});

					// ward 9
					lmWardBoundaries.push({
						wardBoundary: za_ec_amathole_amahlathi_w9,
						erfBoundary: za_ec_amathole_amahlathi_w9_cadastral,
						ward: 9,
					});

					// ward 10
					lmWardBoundaries.push({
						wardBoundary: za_ec_amathole_amahlathi_w10,
						erfBoundary: za_ec_amathole_amahlathi_w10_cadastral,
						ward: 10,
					});

					// ward 11
					lmWardBoundaries.push({
						wardBoundary: za_ec_amathole_amahlathi_w11,
						erfBoundary: za_ec_amathole_amahlathi_w11_cadastral,
						ward: 11,
					});

					// ward 12
					lmWardBoundaries.push({
						wardBoundary: za_ec_amathole_amahlathi_w12,
						erfBoundary: za_ec_amathole_amahlathi_w12_cadastral,
						ward: 12,
					});

					// ward 13
					lmWardBoundaries.push({
						wardBoundary: za_ec_amathole_amahlathi_w13,
						erfBoundary: za_ec_amathole_amahlathi_w13_cadastral,
						ward: 13,
					});

					// ward 14
					lmWardBoundaries.push({
						wardBoundary: za_ec_amathole_amahlathi_w14,
						erfBoundary: za_ec_amathole_amahlathi_w14_cadastral,
						ward: 14,
					});

					// ward 15
					lmWardBoundaries.push({
						wardBoundary: za_ec_amathole_amahlathi_w15,
						erfBoundary: za_ec_amathole_amahlathi_w15_cadastral,
						ward: 15,
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
							lmBoundary: za_ec_amathole_amahlathi,
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
