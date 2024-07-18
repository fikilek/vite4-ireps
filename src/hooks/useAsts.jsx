import { useContext, useEffect, useState } from "react";
import { lazy, number, object, string } from "yup";
import { v4 as uuidv4 } from "uuid";
import { Timestamp, where } from "firebase/firestore";

// hooks
import useAuthContext from "@/hooks/useAuthContext";
import { useFirestore } from "./useFirestore";
import useGetCollection from "./useGetCollection";

// components
import TableDate from "@/components/tables/TableDate";
import TableModalBtn from "@/components/tables/TableModalBtn";
import { AstsContext } from "@/contexts/AstsContext";
import TableBtnsPossibleTrnsOnAst from "@/components/tables/TableBtnsPossibleTrnsOnAst";
import TableBtn from "@/components/tables/TableBtn";

export const useAsts = () => {
	const { astsContext, setAstsContext } = useContext(AstsContext);
	// console.log(`astsContext`, astsContext);

	// get user details from firestore on snapshot
	const { getDocument, response } = useFirestore("users");
	// console.log(`response`, response);

	const [workbase, setWorkbase] = useState(null);
	// console.log(`workbase`, workbase);

	const [constraints, setConstraints] = useState([]);
	// console.log(`constraints`, constraints);

	const { user } = useAuthContext();
	// console.log(`user`, user);

	const { state, getCollection } = useGetCollection("asts");
	// console.log(`state`, state);

	getCollection(constraints);

	useEffect(() => {
		setAstsContext({
			...astsContext,
			asts: state.data,
			astsTableFields,
		});
	}, [state]);

	useEffect(() => {
		// console.log(`workbase changed:`, workbase)
		// if(workbase) {
		// 	setConstraints(where("erf.address.lmMetro", "==", workbase?.trim()))
		// }
		if (workbase) {
			setConstraints((prev) => {
				return [...prev, where("erf.address.lmMetro", "==", workbase?.trim())];
			});
		}
	}, [workbase]);

	useEffect(() => {
		if (response.success) {
			// console.log(`response`, response);
			const { workbase } = response?.document;
			// console.log(`workbase`, workbase)
			setWorkbase(workbase);
		}
	}, [response.success]);

	useEffect(() => {
		if (user?.uid) {
			getDocument(user?.uid);
		}
	}, [user?.uid]);

	// const auditAstValidationSchema = {
	// 	meter: {
	// 		audit: object().shape({
	// 			access: object().shape({
	// 				meterAccess: string().required("Required"),
	// 				noAccessReason: string().when("meterAccess", (meterAccess, schema) => {
	// 					if (meterAccess[0] === "no") {
	// 						return schema
	// 							?.required("no access reason required")
	// 							?.notOneOf(["choose", ""], "Required");
	// 					} else {
	// 						return schema;
	// 					}
	// 				}),
	// 			}),
	// 			astData: lazy((v, { context }) => {
	// 				return object().shape({
	// 					astNo: string().when("meterAccess", (meterAccess_, schema) => {
	// 						const { meterAccess } = context.access;
	// 						if (meterAccess === "no") {
	// 							return schema.notRequired();
	// 						} else {
	// 							return schema.required("Required");
	// 						}
	// 					}),
	// 					astManufacturer: string().when("meterAccess", (meterAccess_, schema) => {
	// 						const { meterAccess } = context.access;
	// 						if (meterAccess === "no") {
	// 							return schema.notRequired();
	// 						} else {
	// 							return schema.required("Required");
	// 						}
	// 					}),
	// 					astName: string().when("meterAccess", (meterAccess_, schema) => {
	// 						const { meterAccess } = context.access;
	// 						if (meterAccess === "no") {
	// 							return schema.notRequired();
	// 						} else {
	// 							return schema.required("Required");
	// 						}
	// 					}),
	// 					meter: object().shape({
	// 						phase: string().when("astNo", (astNo_, schema) => {
	// 							const { astNo } = context.astData;
	// 							const { meterAccess } = context.access;
	// 							if (meterAccess === "no") {
	// 								return schema.notRequired();
	// 							}
	// 							if (astNo === "" || astNo === null || astNo === undefined) {
	// 								return schema?.notRequired();
	// 							} else {
	// 								return schema
	// 									?.defined("Required")
	// 									?.oneOf(["single", "three"], "Required");
	// 							}
	// 						}),
	// 						type: string().when("astNo", (astno, schema) => {
	// 							const { astNo } = context.astData;
	// 							const { meterAccess } = context.access;
	// 							if (meterAccess === "no") {
	// 								return schema.notRequired();
	// 							}
	// 							if (astNo === "" || astNo === null || astNo === undefined) {
	// 								return schema?.notRequired();
	// 							} else {
	// 								return schema
	// 									?.defined("Required")
	// 									?.oneOf(["pre-paid", "conventional"], "Required");
	// 							}
	// 						}),
	// 						keypad: object().shape({
	// 							keypadAccess: string().when("access", (meterAccess_, schema) => {
	// 								const { meterAccess } = context.access;
	// 								if (meterAccess === "no") {
	// 									return schema.notRequired();
	// 								}
	// 								if (meterAccess === "yes") {
	// 									return schema.oneOf(["yes", "no"], "yes or no?").required("Required");
	// 								} else {
	// 									return schema;
	// 								}
	// 							}),
	// 							serialNo: string().when("keypadAccess", (keypadAccess_, schema) => {
	// 								const { keypadAccess } = context.astData.meter.keypad;
	// 								const { meterAccess } = context.access;
	// 								if (meterAccess === "no") {
	// 									return schema.notRequired();
	// 								}
	// 								if (keypadAccess === "yes") {
	// 									return schema.required("Required");
	// 								}
	// 								if (keypadAccess === "no") {
	// 									return schema.oneOf([""], "Must Be Blank");
	// 								} else {
	// 									return schema;
	// 								}
	// 							}),
	// 							comment: string().when("keypadAccess", (keypadAccess_, schema) => {
	// 								const { keypadAccess } = context?.astData?.meter?.keypad;
	// 								const { meterAccess } = context.access;
	// 								if (meterAccess === "no") {
	// 									return schema.notRequired();
	// 								}
	// 								if (keypadAccess === "no") {
	// 									return schema.required("Required").notOneOf(["choose"], "Required");
	// 								} else {
	// 									return schema;
	// 								}
	// 							}),
	// 						}),
	// 						cb: object().shape({
	// 							isThereCb: string().when("meterAccess", (isThereCb_, schema) => {
	// 								const { meterAccess } = context.access;
	// 								if (meterAccess === "no") {
	// 									return schema.notRequired();
	// 								} else {
	// 									schema.oneOf(["yes", "no"], "yes or no").required("Required");
	// 								}
	// 							}),
	// 							size: number().when("isThereCb", (isThereCb_, schema) => {
	// 								const { isThereCb } = context.astData.meter.cb;
	// 								const { meterAccess } = context.access;
	// 								if (meterAccess === "no") {
	// 									return schema.notRequired();
	// 								}
	// 								if (isThereCb === "yes") {
	// 									return schema.required("Required");
	// 								}
	// 								if (isThereCb === "no") {
	// 									return schema.oneOf([""], "Must Be Blank");
	// 								} else {
	// 									return schema;
	// 								}
	// 							}),
	// 							comment: string().when("isThereCb", (isThereCb_, schema) => {
	// 								const { isThereCb } = context.astData.meter.cb;
	// 								const { meterAccess } = context.access;
	// 								if (meterAccess === "no") {
	// 									return schema.notRequired();
	// 								}
	// 								if (isThereCb === "no") {
	// 									return schema
	// 										.required("Value Required")
	// 										.notOneOf(["choose"], "Required")
	// 										.defined("Required");
	// 								} else {
	// 									return schema;
	// 								}
	// 							}),
	// 						}),
	// 						seal: object().shape({
	// 							meterSealed: string().when("meterAccess", (meterAccess_, schema) => {
	// 								const { meterAccess } = context.access;
	// 								if (meterAccess === "no") {
	// 									return schema.notRequired();
	// 								} else {
	// 									return schema.oneOf(["yes", "no"], "yes or no").required("Required");
	// 								}
	// 							}),
	// 							sealNo: string().when(
	// 								["meterSealed", "comment"],
	// 								([meterSealed, comment], schema) => {
	// 									// console.log(`meterSealed`, meterSealed);
	// 									// console.log(`comment`, comment);
	// 									const { meterAccess } = context.access;
	// 									if (meterAccess === "no") {
	// 										return schema.notRequired();
	// 									}
	// 									if (
	// 										comment === "seal no hard to read" ||
	// 										comment === "seal has no seal no" ||
	// 										meterSealed === "no"
	// 									) {
	// 										return schema.oneOf([""], "Must Be Blank");
	// 									}
	// 									if (meterSealed === "yes") {
	// 										return schema.required("Required");
	// 									} else {
	// 										return schema;
	// 									}
	// 								}
	// 							),
	// 							comment: string().when("meterSealed", (meterSealed_, schema) => {
	// 								const { meterSealed, sealNo } = context.astData.meter.seal;
	// 								const { meterAccess } = context.access;
	// 								if (meterAccess === "no") {
	// 									return schema.notRequired();
	// 								}
	// 								if (meterSealed === "yes" && sealNo === "") {
	// 									return schema
	// 										.required("Required")
	// 										.defined("Required")
	// 										.notOneOf(["choose"], "Required");
	// 								} else {
	// 									return schema;
	// 								}
	// 							}),
	// 						}),
	// 					}),
	// 				});
	// 			}),
	// 			location: lazy((v, { context }) => {
	// 				return object().shape({
	// 					// address: string().when("meterAccess", (meterAccess_, schema) => {
	// 					// 	const { meterAccess } = context.access;

	// 					// 	if (meterAccess === "yes") {
	// 					// 		return schema.required("Required");
	// 					// 	} else {
	// 					// 		return schema.notRequired();
	// 					// 	}
	// 					// }),
	// 					// gps: object().shape({
	// 					// 	lat: number().when("meterAccess", (meterAccess_, schema) => {
	// 					// 		const { meterAccess } = context.access;
	// 					// 		if (meterAccess === "yes") {
	// 					// 			return schema.required("Required");
	// 					// 		} else {
	// 					// 			return schema.notRequired();
	// 					// 		}
	// 					// 	}),
	// 					// 	lng: number().when("meterAccess", (meterAccess_, schema) => {
	// 					// 		const { meterAccess } = context.access;
	// 					// 		if (meterAccess === "yes") {
	// 					// 			return schema.required("Required");
	// 					// 		} else {
	// 					// 			return schema.notRequired();
	// 					// 		}
	// 					// 	}),
	// 					// }),
	// 					premises: string().when("meterAccess", (meterAccess_, schema) => {
	// 						const { meterAccess } = context.access;
	// 						if (meterAccess === "no") {
	// 							return schema.notRequired();
	// 						}
	// 						if (meterAccess === "yes") {
	// 							return schema
	// 								.required("Required")
	// 								.oneOf(["inside", "outside"], "Required");
	// 						} else {
	// 							return schema.notRequired();
	// 						}
	// 					}),
	// 					insideBox: string().when("meterAccess", (meterAccess_, schema) => {
	// 						const { meterAccess } = context.access;
	// 						if (meterAccess === "no") {
	// 							return schema.notRequired();
	// 						}
	// 						if (meterAccess === "yes") {
	// 							return schema.required("Required").oneOf(["yes", "no"], "Required");
	// 						} else {
	// 							return schema.notRequired();
	// 						}
	// 					}),
	// 				});
	// 			}),
	// 			anomalies: lazy((v, { context }) => {
	// 				return object().shape({
	// 					anomaly: string().when("meterAccess", (meterAccess_, schema) => {
	// 						const { meterAccess } = context.access;
	// 						if (meterAccess === "no") {
	// 							return schema.notRequired();
	// 						}
	// 						if (meterAccess === "yes") {
	// 							return schema.required("Required").notOneOf(["choose"], "Required");
	// 						} else {
	// 							return schema;
	// 						}
	// 					}),
	// 					anomalyDetail: string().when("anomaly", (meterAccess_, schema) => {
	// 						const { anomaly } = context.anomalies;
	// 						// console.log(`anomaly`, anomaly)
	// 						// console.log(`meterAccess_`, meterAccess_);
	// 						const { meterAccess } = context.access;
	// 						if (meterAccess === "no") {
	// 							return schema.notRequired();
	// 						}
	// 						if (
	// 							anomaly === "" ||
	// 							anomaly === "choose" ||
	// 							anomaly === null ||
	// 							anomaly === undefined
	// 						) {
	// 							return schema.notRequired();
	// 						} else {
	// 							return schema.required("Required").notOneOf(["choose"], "Required");
	// 						}
	// 					}),
	// 				});
	// 			}),
	// 			serviceConnection: lazy((v, { context }) => {
	// 				return object().shape({
	// 					configuration: string().when("meterAccess", (meterAccess_, schema) => {
	// 						const { meterAccess } = context.access;
	// 						if (meterAccess === "no") {
	// 							return schema.notRequired();
	// 						} else {
	// 							return schema.required("Required");
	// 						}
	// 					}),
	// 				});
	// 			}),
	// 			// metadata: lazy((v, { context }) => {
	// 			// 	return object().shape({
	// 			// 		// updatedAtDatetime: date().notRequired(),
	// 			// 		updatedByUser: string().notRequired(),
	// 			// 		updatedByUid: string().notRequired(),
	// 			// 		// createdAtDatetime: date().notRequired(),
	// 			// 		createdByUser: string().notRequired(),
	// 			// 		createdByUid: string().notRequired(),
	// 			// 		trnHistory: number().notRequired(), // how many times transaction has been updated
	// 			// 		trnType: string().notRequired(), //['installation', 'commissioning', 'vending', 'missing', 'found', 'disconnection', 'reconnection', 'sale', 'decomissioning', "dispose", 'inspection', 'audit']
	// 			// 		trnNo: string().notRequired(),
	// 			// 		trnId: string().notRequired(),
	// 			// 		aststate: string().notRequired(),
	// 			// 	});
	// 			// }),
	// 		}),
	// 	},
	// };

	const astsTableFields = [
		// ast id
		{
			field: "id",
			headerName: "System Id",
			width: 200,
			hide: true,
		},
		// ast created
		{
			headerName: "Created",
			children: [
				{
					field: "metadata.createdByUser",
					columnGroupShow: "closed",
					headerName: "Created By",
					width: 150,
					hide: false,
				},
				{
					field: "metadata.createdByUser",
					columnGroupShow: "open",
					headerName: "Created By",
					width: 150,
					hide: false,
				},
				{
					field: "metadata.createdAtDatetime",
					columnGroupShow: "open",
					headerName: "Date Created",
					width: 150,
					cellRenderer: (params) => {
						const timestamp = new Timestamp(
							params.value.seconds,
							params.value.nanoseconds
						);
						const newDate = timestamp.toDate();
						return (
							<TableDate date={newDate} dateFormat={"yyyy-MMM-dd HH:mm"} />
						);
					},
					valueGetter: (params) => {
						return params.data.metadata.createdAtDatetime;
					},
					hide: false,
				},
			],
		},
		// ast updated
		{
			headerName: "Updated",
			children: [
				{
					field: "metadata.updatedByUser",
					columnGroupShow: "closed",
					headerName: "Updated By",
					width: 150,
					hide: false,
				},
				{
					field: "metadata.updatedByUser",
					columnGroupShow: "open",
					headerName: "Updated By",
					width: 150,
					hide: false,
				},
				{
					field: "metadata.updatedAtDatetime",
					columnGroupShow: "open",
					headerName: "Date Created",
					width: 150,
					cellRenderer: (params) => {
						const timestamp = new Timestamp(
							params.value.seconds,
							params.value.nanoseconds
						);
						const newDate = timestamp.toDate();
						return (
							<TableDate date={newDate} dateFormat={"yyyy-MMM-dd HH:mm"} />
						);
					},
					valueGetter: (params) => {
						return params.data.metadata.updatedAtDatetime;
					},
					hide: false,
				},
			],
		},
		// Ast description
		{
			headerName: "Ast Description",
			children: [
				{
					field: "astData.astNo",
					headerName: "Meter No",
					width: 150,
					columnGroupShow: "closed",
					// cellRenderer: params => {
					// console.log(`params`, params);
					// return <TableModalBtn data={params}>{params.value}</TableModalBtn>;
					// },
					// cellRendererParams: {
					// 	modalName: "meterEdit",
					// 	width: "8rem",
					// 	irepsKeyItem: "erfs",
					// 	displayMode: "modal",
					// },
					hide: false,
				},
				{
					field: "astData.astCatergory",
					headerName: "Catergory",
					columnGroupShow: "open",
					width: 150,
					hide: true,
				},
				{
					field: "astData.astManufacturer",
					headerName: "Manufacturer (Brand)",
					columnGroupShow: "open",
					width: 200,
					hide: false,
				},
				{
					field: "astData.astName",
					headerName: "Ast Technical Name",
					columnGroupShow: "open",
					width: 150,
					hide: false,
				},
				{
					field: "astData.astState",
					headerName: "State",
					columnGroupShow: "open",
					width: 150,
					hide: false,
				},
			],
		},
		// trn history
		// {
		// 	field: "metadata.trnHistory",
		// 	headerName: "History",
		// 	width: 100,
		// },

		// ast media - all phots, voice clips and videos of the ast.
		{
			field: "",
			headerName: "Ast Media",
			width: 150,
			cellRenderer: (params) => {
				// console.log(`props`, props);
				return <TableModalBtn data={params}>{params.value}</TableModalBtn>;
			},
			cellRendererParams: {
				modalName: "mediaMobileAsts",
				width: "4rem",
				irepsKeyItem: "asts",
				displayMode: "modal",
			},
			valueGetter: (params) => {
				// console.log(`params`, params);
				const media = params?.data?.media?.length
					? params?.data?.media?.length
					: 0;
				return media;
			},
		},
		// Erf ast belongs to
		{
			field: "erf.erfNo",
			headerName: "Erf No",
			width: 100,
			tooltipField: "Erf the ast belong to",
		},

		// // trns - all trns on the ast
		// {
		// 	field: "trns",
		// 	headerName: "Trns On Ast",
		// 	width: 130,
		// 	valueGetter: params => {
		// 		return params.data?.trns?.length ? params.data?.trns?.length : 0;
		// 	},
		// 	// tooltipField: "asts",
		// 	cellRenderer: params => {
		// 		// console.log(`params`, params);
		// 		return <TableModalBtn data={params}>{params.value}</TableModalBtn>;
		// 	},
		// 	cellRendererParams: {
		// 		modalName: "iwTrnsOnAst",
		// 		width: "4rem",
		// 	},
		// 	hide: false,
		// 	// tooltipComponent: TableTrnsForAstsTooltip,
		// },

		// possible trns
		{
			field: "trns",
			headerName: "Trns On Ast",
			width: 320,
			// valueGetter: params => {
			// 	return params.data?.trns?.length ? params.data?.trns?.length : 0;
			// },
			// tooltipField: "asts",
			cellRenderer: TableBtnsPossibleTrnsOnAst,
			// cellRendererParams: {
			// 	modalName: "iwTrnsOnAst",
			// 	// width: "4rem",
			// },
			hide: false,
			// tooltipComponent: TableTrnsForAstsTooltip,
			valueGetter: (params) => {
				// console.log(`params.data`, params.data);
				return params.data;
			},
		},

		// Ast Specific data
		{
			headerName: "Ast Specific",
			children: [
				// astCat
				{
					field: "astData.meter.type",
					// columnGroupShow: "closed",
					headerName: "Meter Type",
					width: 150,
					hide: false,
				},
				{
					field: "astData.meter.phase",
					// columnGroupShow: "open",
					headerName: "Meter Phase",
					width: 150,
					hide: false,
				},
			],
		},
		// Ast Anomalies
		{
			headerName: "Anomalies",
			children: [
				{
					field: "anomalies.anomaly",
					columnGroupShow: "closed",
					headerName: "Anomaly",
					width: 200,
				},
				{
					field: "anomalies.anomalyDetail",
					columnGroupShow: "open",
					headerName: "Anomaly Detail",
					width: 300,
				},
			],
		},

		// Ast Location
		{
			headerName: "Ast Location",
			children: [
				{
					field: "location.address",
					columnGroupShow: "closed",
					headerName: "Ast Address",
					width: 450,
				},
				{
					field: "location.gps",
					columnGroupShow: "closed",
					headerName: "Ast Gps",

					cellRenderer: (params) => {
						// console.log(`params`, params)
						return <TableModalBtn data={params}>{params.value}</TableModalBtn>;
					},
					cellRendererParams: {
						modalName: "showAstOnMap",
						width: "7rem",
					},
					valueGetter: (params) => {
						const lat = Number(params.data.location.gps.lat);
						const lng = Number(params.data.location.gps.lng);
						return `${lat.toFixed(3)} / ${lng.toFixed(3)}`;
					},
					width: 140,
				},
				{
					field: "location.premises",
					columnGroupShow: "closed",
					headerName: "Premises",
					width: 120,
				},
				{
					field: "location.insideBox",
					columnGroupShow: "closed",
					headerName: "InsideBox",
					width: 120,
				},
			],
		},

		// Meter Keypad
		{
			headerName: "Keypad",
			children: [
				{
					field: "astData.meter.keypad.keypadAccess",
					columnGroupShow: "open",
					headerName: "Keypad Access?",
					width: 150,
				},
				{
					field: "astData.meter.keypad.serialNo",
					columnGroupShow: "open",
					headerName: "Serial No",
					width: 150,
				},
				{
					field: "astData.meter.keypad.comment",
					columnGroupShow: "open",
					headerName: "Comment",
					width: 300,
				},
			],
		},

		// Meter CB
		{
			headerName: "Circuit Breaker",
			children: [
				{
					field: "astData.meter.cb.isThereCb",
					columnGroupShow: "open",
					headerName: "Cb There?",
					width: 150,
				},
				{
					field: "astData.meter.cb.size",
					columnGroupShow: "open",
					headerName: "CB (Amps)",
					width: 150,
				},
				{
					field: "astData.meter.cb.comment",
					columnGroupShow: "open",
					headerName: "Comment",
					width: 300,
				},
			],
		},

		// Meter Seal
		{
			headerName: "Seal",
			children: [
				{
					field: "astData.meter.seal.meterSealed",
					columnGroupShow: "open",
					headerName: "Meter Sealed?",
					width: 150,
				},
				{
					field: "astData.meter.seal.sealNo",
					columnGroupShow: "open",
					headerName: "Seal No",
					width: 150,
				},
				{
					field: "astData.meter.seal.comment",
					columnGroupShow: "open",
					headerName: "Comment",
					width: 300,
				},
			],
		},

		// Service connection
		{
			field: "serviceConnection.configuration",
			columnGroupShow: "open",
			headerName: "Service Connection",
			width: 300,
		},
	];

	return { astsTableFields };
};
