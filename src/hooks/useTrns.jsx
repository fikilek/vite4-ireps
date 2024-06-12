import { Timestamp, serverTimestamp, where } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { date, lazy, number, object, string } from "yup";
import { useContext, useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { LuFileEdit } from "react-icons/lu";
import { FaMapMarkedAlt } from "react-icons/fa";

// hooks
import useAuthContext from "@/hooks/useAuthContext";
import { useFirestore } from "@/hooks/useFirestore";
import useGetCollection from "@/hooks/useGetCollection";

// components
import TableDate from "@/components/tables/TableDate";
import TableModalBtn from "@/components/tables/TableModalBtn";
import { TrnsContext } from "@/contexts/TrnsContext";

export const useTrns = (trnType, astCat) => {
	// console.log(`trnType`, trnType);
	// console.log(`astCat`, astCat);

	const { trnsContext, setTrnsContext } = useContext(TrnsContext);
	// console.log(`trnsContext`, trnsContext);

	// get user details from firestore on snapshot
	const { getDocument, response } = useFirestore("users");
	// console.log(`response`, response);

	const [workbase, setWorkbase] = useState(null)
	// console.log(`workbase`, workbase);

	const [constraints, setConstraints] = useState([])
	// console.log(`constraints`, constraints);

	const { user } = useAuthContext();
	// console.log(`user`, user);	

	const { state, getCollection } = useGetCollection("trns");
	// console.log(`state`, state);

	getCollection(constraints)

	useEffect(() => {
		setTrnsContext({
			...trnsContext,
			trns: state.data,
			trnsTableFields
		});
	}, [state]);

	useEffect(()=>{
		// console.log(`workbase changed:`, workbase)
		if(workbase) {
			setConstraints( prev => {
					return [ ...prev,where("erf.address.lmMetro", "==", workbase?.trim()) ]
				}
			)
		}
		
		if(trnType && trnType !== 'all') {
			setConstraints( prev => {
					return [ ...prev,where("metadata.trnType", "==", trnType) ]
				}
			)
		}

		return () => setConstraints([])

	},[workbase, trnType])

	useEffect(()=>{
		if(response.success) {
			// console.log(`response`, response);
			const {workbase} = response?.document
			// console.log(`workbase`, workbase)
			setWorkbase(workbase)
		}

	},[response.success])

	useEffect(() => {
		if (user?.uid) {
			getDocument(user?.uid);
		}
	}, [user?.uid]);	

	const trnsNewFormData = {
		meter: {
			audit: {
				access: {
					meterAccess: "", // ['yes', 'no']
					noAccessReason: "", //['', '', ''] - reuquired if access === 'no
				},
				metadata: {
					updatedAtDatetime: Timestamp.now(),
					updatedByUser: user.displayName,
					updatedByUid: user.uid,
					createdAtDatetime: Timestamp.now(),
					createdByUser: user.displayName,
					createdByUid: user.uid,
					trnHistory: 0, // how many times transaction has been updated
					trnType: "audit", //['installation', 'commissioning', 'vending', 'missing', 'found', 'disconnection', 'reconnection', 'sale', 'decomissioning', "dispose", 'inspection', 'audit']
					trnNo: "1234",
					trnId: uuidv4(),
					trnState: "draft",
				},
				astData: {
					astId: uuidv4(),
					astNo: "", // for meters this is a meter no
					astCatergory: "meter", // [ 'pole', 'box', 'meter', 'curcuit breaker', 'seal'],
					astState: "service", // ['stores', 'field', 'service', 'etc']
					astManufacturer: "Conlog",
					astName: "BEC44",
					meter: {
						phase: "single", // ['single', 'three', ]
						type: "pre-paid", // ['pre-paid', 'conventional']
						keypad: {
							isThereKeypad: "yes", // [ 'yes', 'no']
							keypadAccess: "yes", // [ 'yes', 'no'] - required if 'isThereKeypad' is 'yes'
							serialNo: "1q1q1q1q", // required if 'isThereKeypad' === 'yes' && 'keypadAccess' === 'yes'
							comment: "good condition", // required if 'keypadAccess' is 'no' (no access reason)
						},
						cb: {
							isThereCb: "yes", // [ 'yes', 'no']
							size: "80", // number (Amps) - required if 'isThereCb' === 'yes'
							comment: "good condition", // required if 'isThereCb' === 'yes' && 'cbSize' !== null
						},
						seal: {
							meterSealed: "yes", // [ 'yes', 'no']
							sealNo: "qaqaqaqaqaq", // text - required if 'isThereSeal' is yes
							comment: "good condition", // required if 'isThereSeal' === 'yes' && sealNo === null
						},
					},
				},
				location: {
					address: "", // ast exact or nearest address. 'gcBt'n used to collect data
					gps: {
						lat: "", // long - Required
						lng: "", // long - Required
					},
					premises: "inside", // ['inside', 'outside'] - Required
					insideBox: "yes", // ['yes', 'no'] - Required
				},
				anomalies: {
					anomaly: "meter ok", // ['', '', '', '', '', ''] - required
					anomalyDetail: "operationally ok", // ['', '', '', '', '', ''] - required based on 'anomaly'
				},
				erf: {
					erfNo: "",
					erfId: "",
					erfAdr: "",
				},
				serviceConnection: {
					configuration: "overhead",
				},
			},
			tid: {
				access: {
					meterAccess: "", // ['yes', 'no']
					noAccessReason: "", //['', '', ''] - reuquired if access === 'no
				},
				metadata: {
					updatedAtDatetime: Timestamp.now(),
					updatedByUser: user.displayName,
					updatedByUid: user.uid,
					createdAtDatetime: serverTimestamp(),
					createdByUser: user.displayName,
					createdByUid: user.uid,
					trnHistory: 0, // how many times transaction has been updated
					trnType: "tid", //['installation', 'commissioning', 'vending', 'missing', 'found', 'disconnection', 'reconnection', 'sale', 'decomissioning', "dispose", 'inspection', 'audit']
					trnNo: "1234",
					trnId: uuidv4(),
					trnState: "draft",
				},
				astData: {
					astId: "",
					astNo: "", // for meters this is a meter no
					astCatergory: "meter", // [ 'pole', 'box', 'meter', 'curcuit breaker', 'seal'],
				},
				tidOperation: {
					tidDone: "",
					comment: "",
				},
				tidBefore: {
					tariff: "",
					krn: "",
				},
				tidAfter: {
					tariff: "",
					krn: "",
				},
			},
			installation: {
				access: {
					meterAccess: "", // ['yes', 'no']
					noAccessReason: "", //['', '', ''] - reuquired if access === 'no
				},
				installationData: {
					installationDate: new Date(),
					sgc: "222222", //supplier group code
				},
				metadata: {
					updatedAtDatetime: Timestamp.now(),
					updatedByUser: user.displayName,
					updatedByUid: user.uid,
					createdAtDatetime: Timestamp.now(),
					createdByUser: user.displayName,
					createdByUid: user.uid,
					trnHistory: 0, // how many times transaction has been updated
					trnType: "installation", //['installation', 'commissioning', 'vending', 'missing', 'found', 'disconnection', 'reconnection', 'sale', 'decomissioning', "dispose", 'inspection', 'audit']
					trnNo: "1234",
					trnId: uuidv4(),
					trnState: "draft",
				},
				astData: {
					astId: uuidv4(),
					astNo: "", // for meters this is a meter no
					astCatergory: "meter", // [ 'pole', 'box', 'meter', 'curcuit breaker', 'seal'],
					astState: "service", // ['stores', 'field', 'service', 'etc']
					astManufacturer: "Conlog",
					astName: "BEC44",
					meter: {
						phase: "single", // ['single', 'three', ]
						type: "pre-paid", // ['pre-paid', 'conventional']
						keypad: {
							keypadInstalled: "yes", // [ 'yes', 'no']
							serialNo: "1q1q1q1q", // required if 'isThereKeypad' === 'yes' && 'keypadAccess' === 'yes'
							comment: "good condition", // required if 'keypadAccess' is 'no' (no access reason)
						},
						cb: {
							cbInstalled: "yes", // [ 'yes', 'no']
							size: "80", // number (Amps) - required if 'isThereCb' === 'yes'
							comment: "good condition", // required if 'isThereCb' === 'yes' && 'cbSize' !== null
						},
						seal: {
							meterSealed: "yes", // [ 'yes', 'no']
							sealNo: "qaqaqa", // text - required if 'isThereSeal' is yes
							comment: "good condition", // required if 'isThereSeal' === 'yes' && sealNo === null
						},
					},
				},
				location: {
					address: "", // ast exact or nearest address. 'gcBt'n used to collect data
					gps: {
						lat: "", // long - Required
						lng: "", // long - Required
					},
					premises: "inside", // ['inside', 'outside'] - Required
					insideBox: "yes", // ['yes', 'no'] - Required
				},
				anomalies: {
					anomaly: "meter ok", // ['', '', '', '', '', ''] - required
					anomalyDetail: "operationally ok", // ['', '', '', '', '', ''] - required based on 'anomaly'
				},
				erf: {
					erfNo: "",
					erfId: "",
					erfAdr: "",
				},
				serviceConnection: {
					configuration: "overhead",
				},
			},
		},
	};

	const trnsValidationSchema = {
		meter: {
			audit: object().shape({
				access: object().shape({
					meterAccess: string().required("Required"),
					noAccessReason: string().when("meterAccess", (meterAccess, schema) => {
						if (meterAccess[0] === "no") {
							return schema
								?.required("no access reason required")
								?.notOneOf(["choose", ""], "Required");
						} else {
							return schema;
						}
					}),
				}),
				astData: lazy((v, { context }) => {
					return object().shape({
						astNo: string().when("meterAccess", (meterAccess_, schema) => {
							const { meterAccess } = context.access;
							if (meterAccess === "no") {
								return schema.notRequired();
							} else {
								return schema.required("Required");
							}
						}),
						astManufacturer: string().when("meterAccess", (meterAccess_, schema) => {
							const { meterAccess } = context.access;
							if (meterAccess === "no") {
								return schema.notRequired();
							} else {
								return schema.required("Required");
							}
						}),
						astName: string().when("meterAccess", (meterAccess_, schema) => {
							const { meterAccess } = context.access;
							if (meterAccess === "no") {
								return schema.notRequired();
							} else {
								return schema.required("Required");
							}
						}),
						meter: object().shape({
							phase: string().when("astNo", (astNo_, schema) => {
								const { astNo } = context.astData;
								const { meterAccess } = context.access;
								if (meterAccess === "no") {
									return schema.notRequired();
								}
								if (astNo === "" || astNo === null || astNo === undefined) {
									return schema?.notRequired();
								} else {
									return schema
										?.defined("Required")
										?.oneOf(["single", "three"], "Required");
								}
							}),
							type: string().when("astNo", (astno, schema) => {
								const { astNo } = context.astData;
								const { meterAccess } = context.access;
								if (meterAccess === "no") {
									return schema.notRequired();
								}
								if (astNo === "" || astNo === null || astNo === undefined) {
									return schema?.notRequired();
								} else {
									return schema
										?.defined("Required")
										?.oneOf(["pre-paid", "conventional"], "Required");
								}
							}),
							keypad: object().shape({
								keypadAccess: string().when("access", (meterAccess_, schema) => {
									const { meterAccess } = context.access;
									if (meterAccess === "no") {
										return schema.notRequired();
									}
									if (meterAccess === "yes") {
										return schema.oneOf(["yes", "no"], "yes or no?").required("Required");
									} else {
										return schema;
									}
								}),
								serialNo: string().when("keypadAccess", (keypadAccess_, schema) => {
									const { keypadAccess } = context.astData.meter.keypad;
									const { meterAccess } = context.access;
									if (meterAccess === "no") {
										return schema.notRequired();
									}
									if (keypadAccess === "yes") {
										return schema.required("Required");
									}
									if (keypadAccess === "no") {
										return schema.oneOf([""], "Must Be Blank");
									} else {
										return schema;
									}
								}),
								comment: string().when("keypadAccess", (keypadAccess_, schema) => {
									const { keypadAccess } = context.astData.meter.keypad;
									const { meterAccess } = context.access;
									if (meterAccess === "no") {
										return schema.notRequired();
									}
									if (keypadAccess === "no") {
										return schema.required("Required").notOneOf(["choose"], "Required");
									} else {
										return schema;
									}
								}),
							}),
							cb: object().shape({
								isThereCb: string().when("meterAccess", (isThereCb_, schema) => {
									const { meterAccess } = context.access;
									if (meterAccess === "no") {
										return schema.notRequired();
									} else {
										schema.oneOf(["yes", "no"], "yes or no").required("Required");
									}
								}),
								size: number().when("isThereCb", (isThereCb_, schema) => {
									const { isThereCb } = context.astData.meter.cb;
									const { meterAccess } = context.access;
									if (meterAccess === "no") {
										return schema.notRequired();
									}
									if (isThereCb === "yes") {
										return schema.required("Required");
									}
									if (isThereCb === "no") {
										return schema.oneOf([""], "Must Be Blank");
									} else {
										return schema;
									}
								}),
								comment: string().when("isThereCb", (isThereCb_, schema) => {
									const { isThereCb } = context.astData.meter.cb;
									const { meterAccess } = context.access;
									if (meterAccess === "no") {
										return schema.notRequired();
									}
									if (isThereCb === "no") {
										return schema
											.required("Value Required")
											.notOneOf(["choose"], "Required")
											.defined("Required");
									} else {
										return schema;
									}
								}),
							}),
							seal: object().shape({
								meterSealed: string().when("meterAccess", (meterAccess_, schema) => {
									const { meterAccess } = context.access;
									if (meterAccess === "no") {
										return schema.notRequired();
									} else {
										return schema.oneOf(["yes", "no"], "yes or no").required("Required");
									}
								}),
								sealNo: string().when(
									["meterSealed", "comment"],
									([meterSealed, comment], schema) => {
										// console.log(`meterSealed`, meterSealed);
										// console.log(`comment`, comment);
										const { meterAccess } = context.access;
										if (meterAccess === "no") {
											return schema.notRequired();
										}
										if (
											comment === "seal no hard to read" ||
											comment === "seal has no seal no" ||
											meterSealed === "no"
										) {
											return schema.oneOf([""], "Must Be Blank");
										}
										if (meterSealed === "yes") {
											return schema.required("Required");
										} else {
											return schema;
										}
									}
								),
								comment: string().when("meterSealed", (meterSealed_, schema) => {
									const { meterSealed, sealNo } = context.astData.meter.seal;
									const { meterAccess } = context.access;
									if (meterAccess === "no") {
										return schema.notRequired();
									}
									if (meterSealed === "yes" && sealNo === "") {
										return schema
											.required("Required")
											.defined("Required")
											.notOneOf(["choose"], "Required");
									} else {
										return schema;
									}
								}),
							}),
						}),
					});
				}),
				location: lazy((v, { context }) => {
					return object().shape({
						address: string().when("meterAccess", (meterAccess_, schema) => {
							const { meterAccess } = context.access;
							if (meterAccess === "yes") {
								return schema.required("Required");
							} else {
								return schema.notRequired();
							}
						}),
						gps: object().shape({
							lat: number().when("meterAccess", (meterAccess_, schema) => {
								const { meterAccess } = context.access;
								if (meterAccess === "yes") {
									return schema.required("Required");
								} else {
									return schema.notRequired();
								}
							}),
							lng: number().when("meterAccess", (meterAccess_, schema) => {
								const { meterAccess } = context.access;
								if (meterAccess === "yes") {
									return schema.required("Required");
								} else {
									return schema.notRequired();
								}
							}),
						}),
						premises: string().when("meterAccess", (meterAccess_, schema) => {
							const { meterAccess } = context.access;
							if (meterAccess === "no") {
								return schema.notRequired();
							}
							if (meterAccess === "yes") {
								return schema
									.required("Required")
									.oneOf(["inside", "outside"], "Required");
							} else {
								return schema.notRequired();
							}
						}),
						insideBox: string().when("meterAccess", (meterAccess_, schema) => {
							const { meterAccess } = context.access;
							if (meterAccess === "no") {
								return schema.notRequired();
							}
							if (meterAccess === "yes") {
								return schema.required("Required").oneOf(["yes", "no"], "Required");
							} else {
								return schema.notRequired();
							}
						}),
					});
				}),
				anomalies: lazy((v, { context }) => {
					return object().shape({
						anomaly: string().when("meterAccess", (meterAccess_, schema) => {
							const { meterAccess } = context.access;
							if (meterAccess === "no") {
								return schema.notRequired();
							}
							if (meterAccess === "yes") {
								return schema.required("Required").notOneOf(["choose"], "Required");
							} else {
								return schema;
							}
						}),
						anomalyDetail: string().when("anomaly", (meterAccess_, schema) => {
							const { anomaly } = context.anomalies;
							// console.log(`anomaly`, anomaly)
							// console.log(`meterAccess_`, meterAccess_);
							const { meterAccess } = context.access;
							if (meterAccess === "no") {
								return schema.notRequired();
							}
							if (
								anomaly === "" ||
								anomaly === "choose" ||
								anomaly === null ||
								anomaly === undefined
							) {
								return schema.notRequired();
							} else {
								return schema.required("Required").notOneOf(["choose"], "Required");
							}
						}),
					});
				}),
				serviceConnection: lazy((v, { context }) => {
					return object().shape({
						configuration: string().when("meterAccess", (meterAccess_, schema) => {
							const { meterAccess } = context.access;
							if (meterAccess === "no") {
								return schema.notRequired();
							} else {
								return schema.required("Required");
							}
						}),
					});
				}),
				// metadata: lazy((v, { context }) => {
				// 	return object().shape({
				// 		// updatedAtDatetime: date().notRequired(),
				// 		updatedByUser: string().notRequired(),
				// 		updatedByUid: string().notRequired(),
				// 		// createdAtDatetime: date().notRequired(),
				// 		createdByUser: string().notRequired(),
				// 		createdByUid: string().notRequired(),
				// 		trnHistory: number().notRequired(), // how many times transaction has been updated
				// 		trnType: string().notRequired(), //['installation', 'commissioning', 'vending', 'missing', 'found', 'disconnection', 'reconnection', 'sale', 'decomissioning', "dispose", 'inspection', 'audit']
				// 		trnNo: string().notRequired(),
				// 		trnId: string().notRequired(),
				// 		trnState: string().notRequired(),
				// 	});
				// }),
			}),
			tid: object().shape({
				access: object().shape({
					meterAccess: string()
						.required("Required")
						?.notOneOf(["choose", ""], "Required"),
					noAccessReason: string().when("meterAccess", (meterAccess, schema) => {
						// console.log(`meterAccess`, meterAccess);
						if (meterAccess[0] === "no") {
							return schema
								?.required("no access reason required")
								?.notOneOf(["choose", ""], "Required");
						}
						if (meterAccess[0] === "yes") {
							return schema?.oneOf(["choose"], "Must Be Choose");
						}
					}),
				}),

				tidOperation: lazy((v, { context }) => {
					return object().shape({
						tidDone: string().when("meterAccess", (meterAccess_, schema) => {
							const { meterAccess } = context.access;
							if (meterAccess === "yes") {
								return schema.required("Required").notOneOf(["choose", ""], "Required");
							} else {
								return schema.notRequired();
							}
						}),
						comment: string().when("tidDone", (tidDone, schema) => {
							const { meterAccess } = context.access;
							if (meterAccess === "no" || tidDone[0] === "no") {
								return schema.notRequired();
							}
							if (tidDone[0] === "yes") {
								return schema.required("Required").notOneOf(["choose"], "Required");
							} else {
								return schema;
							}
						}),
					});
				}),

				tidBefore: lazy((v, { context }) => {
					return object().shape({
						tariff: string().when("meterAccess", (meterAccess_, schema) => {
							const { meterAccess } = context.access;
							const { tidDone } = context.tidOperation;
							if (meterAccess === "yes" && tidDone === "yes") {
								return schema.required("Required").notOneOf(["choose"], "Required");
							}
							if (
								meterAccess === "yes" &&
								(tidDone === "no" || tidDone === "" || tidDone === "choose")
							) {
								return schema.notRequired();
							}
						}),
						krn: string().when("meterAccess", (meterAccess_, schema) => {
							const { meterAccess } = context.access;
							const { tidDone } = context.tidOperation;
							if (meterAccess === "yes" && tidDone === "yes") {
								return schema.required("Required").notOneOf(["choose"], "Required");
							}
							if (
								meterAccess === "yes" &&
								(tidDone === "no" || tidDone === "" || tidDone === "choose")
							) {
								return schema.notRequired();
							}
						}),
					});
				}),

				tidAfter: lazy((v, { context }) => {
					return object().shape({
						tariff: string().when("meterAccess", (meterAccess_, schema) => {
							const { meterAccess } = context.access;
							const { tidDone } = context.tidOperation;
							if (meterAccess === "yes" && tidDone === "yes") {
								return schema.required("Required").notOneOf(["choose"], "Required");
							}
							if (
								meterAccess === "yes" &&
								(tidDone === "no" || tidDone === "" || tidDone === "choose")
							) {
								return schema.notRequired();
							}
						}),
						krn: string().when("meterAccess", (meterAccess_, schema) => {
							const { meterAccess } = context.access;
							const { tidDone } = context.tidOperation;

							// console.log(`meterAccess`, meterAccess);
							// console.log(`tidDone`, tidDone);

							if (meterAccess === "yes" && tidDone === "yes") {
								return schema.required("Required").notOneOf(["choose"], "Required");
							}
							if (
								meterAccess === "yes" &&
								(tidDone === "no" || tidDone === "" || tidDone === "choose")
							) {
								return schema.notRequired();
							}
						}),
					});
				}),
			}),
			installation: object().shape({
				access: object().shape({
					meterAccess: string().required("Required"),
					noAccessReason: string().when("meterAccess", (meterAccess, schema) => {
						if (meterAccess[0] === "no") {
							return schema
								?.required("no access reason required")
								?.notOneOf(["choose", ""], "Required");
						} else {
							return schema;
						}
					}),
				}),
				installationData: object().shape({
					// installationDate: date().notRequired(),
					sgc: string().required("Required").notOneOf(["choose", ""], "Required"),
				}),
				astData: lazy((v, { context }) => {
					return object().shape({
						astNo: string().when("meterAccess", (meterAccess_, schema) => {
							const { meterAccess } = context.access;
							if (meterAccess === "no") {
								return schema.notRequired();
							} else {
								return schema.required("Required");
							}
						}),
						astManufacturer: string().required("Required"),
						astName: string().required("Required"),
						meter: object().shape({
							phase: string().required("Required"),
							type: string().required("Required"),
							keypad: object().shape({
								keypadInstalled: string()
									.required("Required")
									.oneOf(["yes", "no"], "Required")
									.notOneOf(["choose", ""], "Required"),
								serialNo: string().when(
									"keypadInstalled",
									(keypadInstalled, schema) => {
										if (keypadInstalled[0] === "yes") {
											return schema.required("Required");
										} else {
											return schema.notRequired();
										}
									}
								),
								comment: string().required("Required"),
							}),
							cb: object().shape({
								cbInstalled: string()
									.required("Required")
									.oneOf(["yes", "no"], "Required")
									.notOneOf(["choose", ""], "Required"),
								size: number().when("cbInstalled", (cbInstalled, schema) => {
									if (cbInstalled[0] === "yes") {
										return schema.required("Required").notOneOf([''], 'Required');
									} else {
										return schema.notRequired();
									}
								}),
								comment: string().notRequired(),
							}),
							seal: object().shape({
								meterSealed: string()
									.required("Required")
									.oneOf(["yes", "no"], "Required")
									.notOneOf(["choose", ""], "Required"),
								sealNo: string().when("meterSealed", (meterSealed, schema) => {
									if (meterSealed[0] === "yes") {
										return schema.required("Required").notOneOf([''], 'Required');
									} else {
										return schema.notRequired();
									}
								}),
								comment: string().notRequired(),
							}),
						}),
					});
				}),
				location: lazy((v, { context }) => {
					return object().shape({
						address: string().when("meterAccess", (meterAccess_, schema) => {
							const { meterAccess } = context.access;
							if (meterAccess === "yes") {
								return schema.required("Required");
							} else {
								return schema.notRequired();
							}
						}),
						gps: object().shape({
							lat: number().when("meterAccess", (meterAccess_, schema) => {
								const { meterAccess } = context.access;
								if (meterAccess === "yes") {
									return schema.required("Required");
								} else {
									return schema.notRequired();
								}
							}),
							lng: number().when("meterAccess", (meterAccess_, schema) => {
								const { meterAccess } = context.access;
								if (meterAccess === "yes") {
									return schema.required("Required");
								} else {
									return schema.notRequired();
								}
							}),
						}),
						premises: string().when("meterAccess", (meterAccess_, schema) => {
							const { meterAccess } = context.access;
							if (meterAccess === "no") {
								return schema.notRequired();
							}
							if (meterAccess === "yes") {
								return schema
									.required("Required")
									.oneOf(["inside", "outside"], "Required");
							} else {
								return schema.notRequired();
							}
						}),
						insideBox: string().when("meterAccess", (meterAccess_, schema) => {
							const { meterAccess } = context.access;
							if (meterAccess === "no") {
								return schema.notRequired();
							}
							if (meterAccess === "yes") {
								return schema.required("Required").oneOf(["yes", "no"], "Required");
							} else {
								return schema.notRequired();
							}
						}),
					});
				}),
				anomalies: lazy((v, { context }) => {
					return object().shape({
						anomaly: string().when("meterAccess", (meterAccess_, schema) => {
							const { meterAccess } = context.access;
							if (meterAccess === "no") {
								return schema.notRequired();
							}
							if (meterAccess === "yes") {
								return schema.required("Required").notOneOf(["choose"], "Required");
							} else {
								return schema;
							}
						}),
						anomalyDetail: string().when("anomaly", (meterAccess_, schema) => {
							const { anomaly } = context.anomalies;
							// console.log(`anomaly`, anomaly)
							// console.log(`meterAccess_`, meterAccess_);
							const { meterAccess } = context.access;
							if (meterAccess === "no") {
								return schema.notRequired();
							}
							if (
								anomaly === "" ||
								anomaly === "choose" ||
								anomaly === null ||
								anomaly === undefined
							) {
								return schema.notRequired();
							} else {
								return schema.required("Required").notOneOf(["choose"], "Required");
							}
						}),
					});
				}),
				serviceConnection: lazy((v, { context }) => {
					return object().shape({
						configuration: string().required("Required"),
					});
				}),
				// metadata: lazy((v, { context }) => {
				// 	return object().shape({
				// 		// updatedAtDatetime: date().notRequired(),
				// 		updatedByUser: string().notRequired(),
				// 		updatedByUid: string().notRequired(),
				// 		// createdAtDatetime: date().notRequired(),
				// 		createdByUser: string().notRequired(),
				// 		createdByUid: string().notRequired(),
				// 		trnHistory: number().notRequired(), // how many times transaction has been updated
				// 		trnType: string().notRequired(), //['installation', 'commissioning', 'vending', 'missing', 'found', 'disconnection', 'reconnection', 'sale', 'decomissioning', "dispose", 'inspection', 'audit']
				// 		trnNo: string().notRequired(),
				// 		trnId: string().notRequired(),
				// 		trnState: string().notRequired(),
				// 	});
				// }),
			}),
		},
	};

	const trnsTableFields = {
		meter: {
			audit: [
				// trn id
				{
					field: "id",
					headerName: "System Id",
					width: 200,
					hide: true,
				},
				// trn created
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
							cellRenderer: params => {
								const timestamp = new Timestamp(
									params.value.seconds,
									params.value.nanoseconds
								);
								const newDate = timestamp.toDate();
								return <TableDate date={newDate} dateFormat={"yyyy-MMM-dd HH:mm"} />;
							},
							valueGetter: params => {
								return params.data.metadata.createdAtDatetime;
							},
							hide: false,
						},
					],
				},
				// trn updated
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
							cellRenderer: params => {
								const timestamp = new Timestamp(
									params.value.seconds,
									params.value.nanoseconds
								);
								const newDate = timestamp.toDate();
								return <TableDate date={newDate} dateFormat={"yyyy-MMM-dd HH:mm"} />;
							},
							valueGetter: params => {
								return params.data.metadata.updatedAtDatetime;
							},
							hide: false,
						},
					],
				},
				// erf - data comes from the erf that created the trn
				{
					headerName: "Erf for Ast",
					children: [
						{
							field: "erf.erfNo",
							headerName: "Erf No",
							width: 110,
							cellRenderer: params => {
								// console.log(`props`, props);
								return (
									<TableModalBtn data={params}>
										<IconContext.Provider value={{ color: "blue", fontSize: "1rem" }}>
											<FaMapMarkedAlt /> {params.value}
										</IconContext.Provider>
									</TableModalBtn>
								);
							},
							cellRendererParams: {
								modalName: "iwShowOnMap",
								tableBtnClass: "table-btn-icon",
							},
							hide: false,
						},
						{
							field: "erf.address.systemAdr",
							headerName: "Erf Address (Google)",
							width: 300,
							hide: false,
							// valueGetter: params => {
							// 	console.log(`params`, params);
							// 	return "Erf Adr";
							// },
						},
						// {
						// 	field: "erf.erfId",
						// 	headerName: "Erf Address",
						// 	width: 200,
						// 	hide: true,
						// 	valueGetter: params => {
						// 		console.log(`params`, params);
						// 		return "Erf Adr";
						// 	},
						// },
					],
				},
				// trn history
				// {
				// 	field: "metadata.trnHistory",
				// 	headerName: "History",
				// 	width: 100,
				// },
				// trn number
				// {
				// 	field: "metadata.trnNo",
				// 	headerName: "Trn No",
				// 	width: 100,
				// }, 

						console.log(object),

				// edit
				{
					field: "",
					headerName: "Edit",
					cellRenderer: params => {
						// console.log(`props.data`, params.data);
						return (
							<TableModalBtn data={params}>
								<IconContext.Provider value={{ color: "blue", fontSize: "1rem" }}>
									<LuFileEdit />
								</IconContext.Provider>
							</TableModalBtn>
						);
					},
					cellRendererParams: {
						modalName: "meter-audit",
						validationSchema: trnsValidationSchema["meter"]["audit"],
						width: "3rem",
					},
					width: 80,
				},

				// trn state - shows the form state and opens it on a click for editing
				{
					field: "metadata.trnState",
					headerName: "State",
					width: 100,
				},

				// trn type
				{
					field: "metadata.trnType",
					headerName: "Trn Type",
					valueGetter: params => {
						// console.log(`params`, params);
						const { trnType } = params.data.metadata;
						return trnType;
					},
					width: 120,
				},
				{
					headerName: "Access",
					children: [
						{
							field: "access.meterAccess",
							headerName: "Access?",
							width: 120,
						},
						{
							field: "access.noAccessReason",
							headerName: "No Access Reason",
							width: 200,
						},
					],
				},

				// trn media - all phots, voice clips and videos of the ast involved in the trn.
				// These are ast photos
				// {
				// 	field: "",
				// 	headerName: "Ast Media",
				// 	width: 120,
				// 	cellRenderer: params => {
				// 		// console.log(`props`, props);
				// 		return <TableModalBtn data={params}>{params.value}</TableModalBtn>;
				// 	},
				// 	cellRendererParams: {
				// 		modalName: "mediaMobileAsts",
				// 		width: "4rem",
				// 		irepsKeyItem: "trns",
				// 		displayMode: 'modal'
				// 	},
				// 	valueGetter: params => {
				// 		// console.log(`params`, params);
				// 		// query mediaAsts to ifnd out hamy media files are there for the ast

				// 		// get ast id from params
				// 		const { astId } = params?.data?.astData
				// 		// console.log(`astId`, astId)

				// 		// quuery mediaAsts for the astId
				// 		// getCollectionCount("matadata.astId", '==', astId)

				// 		// console.log(`state`, state)

				// 		const media = params?.data?.media?.length ? params?.data?.media?.length : 0;
				// 		return media;
				// 	},
				// },
				// Ast Description
				{
					headerName: "Ast Description",
					children: [
						// astCat
						{
							field: "astData.astCatergory",
							// columnGroupShow: "closed",
							headerName: "Ast Cat",
							width: 150,
							hide: false,
						},
						{
							field: "astData.astNo",
							// columnGroupShow: "open",
							headerName: "Ast No",
							width: 150,
							hide: false,
						},
						{
							field: "astData.astManufacturer",
							// columnGroupShow: "open",
							headerName: "Manufacturer",
							width: 150,
							hide: false,
						},
						{
							field: "astData.astName",
							// columnGroupShow: "open",
							headerName: "Ast Name",
							width: 150,
							hide: false,
						},
					],
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
							columnGroupShow: "open",
							headerName: "Anomaly",
							width: 150,
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
							cellRenderer: params => {
								// console.log(`params`, params)
								return <TableModalBtn data={params}>{params.value}</TableModalBtn>;
							},
							cellRendererParams: {
								modalName: "showAstOnMap",
								width: "7rem",
							},
							valueGetter: params => {
								const lat = Number(params.data.location.gps.lat).toFixed(3);
								const lng = Number(params.data.location.gps.lng).toFixed(3);
								return `${lat}/${lng}`;
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
			],
			tid: [
				// trn id
				{
					field: "id",
					headerName: "System Id",
					width: 200,
					hide: true,
				},
				// trn created
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
							cellRenderer: params => {
								const timestamp = new Timestamp(
									params.value.seconds,
									params.value.nanoseconds
								);
								const newDate = timestamp.toDate();
								return <TableDate date={newDate} dateFormat={"yyyy-MMM-dd HH:mm"} />;
							},
							valueGetter: params => {
								return params.data.metadata.createdAtDatetime;
							},
							hide: false,
						},
					],
				},
				// trn updated
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
							cellRenderer: params => {
								const timestamp = new Timestamp(
									params.value.seconds,
									params.value.nanoseconds
								);
								const newDate = timestamp.toDate();
								return <TableDate date={newDate} dateFormat={"yyyy-MMM-dd HH:mm"} />;
							},
							valueGetter: params => {
								return params.data.metadata.updatedAtDatetime;
							},
							hide: false,
						},
					],
				},
				// tid form edit
				{
					field: "",
					headerName: "Edit",
					cellRenderer: params => {
						// console.log(`props.data`, params.data);
						return (
							<TableModalBtn data={params}>
								<IconContext.Provider value={{ color: "blue", fontSize: "1rem" }}>
									<LuFileEdit />
								</IconContext.Provider>
							</TableModalBtn>
						);
					},
					cellRendererParams: {
						modalName: "meter-tid",
						validationSchema: trnsValidationSchema["meter"]["tid"],
						width: "3rem",
					},
					width: 80,
				},
				// trn state
				{
					field: "metadata.trnState",
					headerName: "State",
					width: 100,
					hide: false,
				},
				// Access
				{
					headerName: "Access",
					children: [
						{
							field: "access.meterAccess",
							headerName: "Access",
							width: 100,
							hide: false,
						},
						{
							field: "access.noAccessReason",
							headerName: "No Access Reason",
							width: 220,
							hide: false,
						},
					],
				},
				// ast Data
				{
					headerName: "Ast Data",
					children: [
						{
							field: "astData.astNo",
							headerName: "Ast No",
							width: 150,
							hide: false,
						},
						{
							field: "astData.astCatergory",
							headerName: "Ast Catergory",
							width: 150,
							hide: false,
						},
					],
				},

				// tid operation
				{
					headerName: "Tid Operation",
					children: [
						// astCat
						{
							field: "tidOperation.tidDone",
							// columnGroupShow: "closed",
							headerName: "Tid Done?",
							width: 150,
							hide: false,
						},
						{
							field: "tidOperation.comment",
							// columnGroupShow: "open",
							headerName: "Comment",
							width: 200,
							hide: false,
						},
					],
				},

				// tid before
				{
					headerName: "Tid Before",
					children: [
						// astCat
						{
							field: "tidBefore.tariff",
							// columnGroupShow: "closed",
							headerName: "Tariff",
							width: 150,
							hide: false,
						},
						{
							field: "tidBefore.krn",
							// columnGroupShow: "open",
							headerName: "KRN",
							width: 150,
							hide: false,
						},
					],
				},
				// tid after
				{
					headerName: "Tid After",
					children: [
						// astCat
						{
							field: "tidAfter.tariff",
							// columnGroupShow: "closed",
							headerName: "Tariff",
							width: 150,
							hide: false,
						},
						{
							field: "tidAfter.krn",
							// columnGroupShow: "open",
							headerName: "KRN",
							width: 150,
							hide: false,
						},
					],
				},
			],
			installation: [
				// trn id
				{
					field: "id",
					headerName: "System Id",
					width: 200,
					hide: true,
				},
				// trn created
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
							cellRenderer: params => {
								const timestamp = new Timestamp(
									params.value.seconds,
									params.value.nanoseconds
								);
								const newDate = timestamp.toDate();
								return <TableDate date={newDate} dateFormat={"yyyy-MMM-dd HH:mm"} />;
							},
							valueGetter: params => {
								return params.data.metadata.createdAtDatetime;
							},
							hide: false,
						},
					],
				},
				// trn updated
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
							cellRenderer: params => {
								const timestamp = new Timestamp(
									params.value.seconds,
									params.value.nanoseconds
								);
								const newDate = timestamp.toDate();
								return <TableDate date={newDate} dateFormat={"yyyy-MMM-dd HH:mm"} />;
							},
							valueGetter: params => {
								return params.data.metadata.updatedAtDatetime;
							},
							hide: false,
						},
					],
				},

				// {
				// 	field: "installationData.installationDate",
				// 	columnGroupShow: "open",
				// 	headerName: "installation Date",
				// 	width: 170,
				// 	cellRenderer: params => {
				// 		const timestamp = new Timestamp(
				// 			params.value.seconds,
				// 			params.value.nanoseconds
				// 		);
				// 		const newDate = timestamp.toDate();
				// 		return <TableDate date={newDate} dateFormat={"yyyy-MMM-dd HH:mm"} />;
				// 	},
				// 	// valueGetter: params => {
				// 	// 	return params.data.installationData.installationDate;
				// 	// },
				// 	hide: false,
				// },
				// erf - data comes from the erf that created the trn
				{
					headerName: "Erf for Ast",
					children: [
						{
							field: "erf.erfNo",
							headerName: "Erf No",
							width: 110,
							cellRenderer: params => {
								// console.log(`props`, props);
								return <TableModalBtn data={params}>{params.value}</TableModalBtn>;
							},
							cellRendererParams: {
								modalName: "iwShowOnMap",
							},
							hide: false,
						},
						{
							field: "erf.address.systemAdr",
							headerName: "Erf Address (Google)",
							width: 400,
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
				// trn number
				// {
				// 	field: "metadata.trnNo",
				// 	headerName: "Trn No",
				// 	width: 100,
				// },

				// tid form edit
				{
					field: "",
					headerName: "Edit",
					cellRenderer: params => {
						// console.log(`props.data`, params.data);
						return (
							<TableModalBtn data={params}>
								<IconContext.Provider value={{ color: "blue", fontSize: "1rem" }}>
									<LuFileEdit />
								</IconContext.Provider>
							</TableModalBtn>
						);
					},
					cellRendererParams: {
						modalName: "meter-installation",
						validationSchema: trnsValidationSchema["meter"]["installation"],
						width: "3rem",
					},
					width: 80,
				},

				// trn state - shows the form state and opens it on a click for editing
				{
					field: "metadata.trnState",
					headerName: "State",
					width: 100,
				},

				// trn type
				{
					field: "metadata.trnType",
					headerName: "Trn Type",
					valueGetter: params => {
						// console.log(`params`, params);
						const { trnType } = params.data.metadata;
						return trnType;
					},
					width: 120,
				},
				// Ast Description
				{
					headerName: "Ast Description",
					children: [
						// astCat
						{
							field: "astData.astCatergory",
							// columnGroupShow: "closed",
							headerName: "Ast Cat",
							width: 150,
							hide: false,
						},
						{
							field: "astData.astNo",
							// columnGroupShow: "open",
							headerName: "Ast No",
							width: 150,
							hide: false,
						},
						{
							field: "astData.astManufacturer",
							// columnGroupShow: "open",
							headerName: "Manufacturer",
							width: 150,
							hide: false,
						},
						{
							field: "astData.astName",
							// columnGroupShow: "open",
							headerName: "Ast Name",
							width: 150,
							hide: false,
						},
					],
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
							cellRenderer: params => {
								// console.log(`params`, params)
								return <TableModalBtn data={params}>{params.value}</TableModalBtn>;
							},
							cellRendererParams: {
								modalName: "showAstOnMap",
								width: "7rem",
							},
							valueGetter: params => {
								const lat = Number(params.data.location.gps.lat).toFixed(3);
								const lng = Number(params.data.location.gps.lng).toFixed(3);
								return `${lat}/${lng}`;
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
			],
		},
		all: {
			all: 		[
				// trn id
				{
					field: "id",
					headerName: "System Id",
					width: 200,
					hide: true,
				},
				// trn created
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
							cellRenderer: params => {
								const timestamp = new Timestamp(
									params.value.seconds,
									params.value.nanoseconds
								);
								const newDate = timestamp.toDate();
								return <TableDate date={newDate} dateFormat={"yyyy-MMM-dd HH:mm"} />;
							},
							valueGetter: params => {
								return params.data.metadata.createdAtDatetime;
							},
							hide: false,
						},
					],
				},
				// trn updated
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
							cellRenderer: params => {
								const timestamp = new Timestamp(
									params.value.seconds,
									params.value.nanoseconds
								);
								const newDate = timestamp.toDate();
								return <TableDate date={newDate} dateFormat={"yyyy-MMM-dd HH:mm"} />;
							},
							valueGetter: params => {
								return params.data.metadata.updatedAtDatetime;
							},
							hide: false,
						},
					],
				},
				// erf - data comes from the erf that created the trn
				{
					headerName: "Erf for Ast",
					children: [
						{
							field: "erf.erfNo",
							headerName: "Erf No",
							width: 110,
							cellRenderer: params => {
								// console.log(`props`, props);
								return (
									<TableModalBtn data={params}>
										<IconContext.Provider value={{ color: "blue", fontSize: "1rem" }}>
											<FaMapMarkedAlt /> {params.value}
										</IconContext.Provider>
									</TableModalBtn>
								);
							},
							cellRendererParams: {
								modalName: "iwShowOnMap",
								tableBtnClass: "table-btn-icon",
							},
							hide: false,
						},
						{
							field: "erf.address.systemAdr",
							headerName: "Erf Address (Google)",
							width: 300,
							hide: false,
							// valueGetter: params => {
							// 	console.log(`params`, params);
							// 	return "Erf Adr";
							// },
						},
						// {
						// 	field: "erf.erfId",
						// 	headerName: "Erf Address",
						// 	width: 200,
						// 	hide: true,
						// 	valueGetter: params => {
						// 		console.log(`params`, params);
						// 		return "Erf Adr";
						// 	},
						// },
					],
				},
				// trn history
				// {
				// 	field: "metadata.trnHistory",
				// 	headerName: "History",
				// 	width: 100,
				// },
				// trn number
				// {
				// 	field: "metadata.trnNo",
				// 	headerName: "Trn No",
				// 	width: 100,
				// },
				
				// trn state - shows the form state and opens it on a click for editing
				{
					field: "metadata.trnState",
					headerName: "State",
					width: 100,
				},
	
				// trn type
				{
					field: "metadata.trnType",
					headerName: "Trn Type",
					valueGetter: params => {
						// console.log(`params`, params);
						const { trnType } = params.data.metadata;
						return trnType;
					},
					width: 120,
				},
				{
					headerName: "Access",
					children: [
						{
							field: "access.meterAccess",
							headerName: "Access?",
							width: 120,
						},
						{
							field: "access.noAccessReason",
							headerName: "No Access Reason",
							width: 200,
						},
					],
				},
	
				// trn media - all phots, voice clips and videos of the ast involved in the trn.
				// These are ast photos
				// {
				// 	field: "",
				// 	headerName: "Ast Media",
				// 	width: 120,
				// 	cellRenderer: params => {
				// 		// console.log(`props`, props);
				// 		return <TableModalBtn data={params}>{params.value}</TableModalBtn>;
				// 	},
				// 	cellRendererParams: {
				// 		modalName: "mediaMobileAsts",
				// 		width: "4rem",
				// 		irepsKeyItem: "trns",
				// 		displayMode: 'modal'
				// 	},
				// 	valueGetter: params => {
				// 		// console.log(`params`, params);
				// 		// query mediaAsts to ifnd out hamy media files are there for the ast
	
				// 		// get ast id from params
				// 		const { astId } = params?.data?.astData
				// 		// console.log(`astId`, astId)
	
				// 		// quuery mediaAsts for the astId
				// 		// getCollectionCount("matadata.astId", '==', astId)
	
				// 		// console.log(`state`, state)
	
				// 		const media = params?.data?.media?.length ? params?.data?.media?.length : 0;
				// 		return media;
				// 	},
				// },
	
				// Ast Description
				{
					headerName: "Ast Description",
					children: [
						// astCat
						{
							field: "astData.astCatergory",
							// columnGroupShow: "closed",
							headerName: "Ast Cat",
							width: 150,
							hide: false,
						},
						{
							field: "astData.astNo",
							// columnGroupShow: "open",
							headerName: "Ast No",
							width: 150,
							hide: false,
						},
						// {
						// 	field: "astData.astManufacturer",
						// 	// columnGroupShow: "open",
						// 	headerName: "Manufacturer",
						// 	width: 150,
						// 	hide: false,
						// },
						// {
						// 	field: "astData.astName",
						// 	// columnGroupShow: "open",
						// 	headerName: "Ast Name",
						// 	width: 150,
						// 	hide: false,
						// },
					],
				},
	
				// Ast Location
				// {
				// 	headerName: "Ast Location",
				// 	children: [
				// 		{
				// 			field: "location.address",
				// 			columnGroupShow: "closed",
				// 			headerName: "Ast Address",
				// 			width: 450,
				// 		},
				// 		{
				// 			field: "location.gps",
				// 			columnGroupShow: "closed",
				// 			headerName: "Ast Gps",
				// 			cellRenderer: params => {
				// 				// console.log(`params`, params)
				// 				return <TableModalBtn data={params}>{params.value}</TableModalBtn>;
				// 			},
				// 			cellRendererParams: {
				// 				modalName: "showAstOnMap",
				// 				width: "7rem",
				// 			},
				// 			valueGetter: params => {
				// 				const lat = Number(params.data.location.gps.lat).toFixed(3);
				// 				const lng = Number(params.data.location.gps.lng).toFixed(3);
				// 				return `${lat}/${lng}`;
				// 			},
				// 			width: 140,
				// 		},
				// 		{
				// 			field: "location.premises",
				// 			columnGroupShow: "closed",
				// 			headerName: "Premises",
				// 			width: 120,
				// 		},
				// 		{
				// 			field: "location.insideBox",
				// 			columnGroupShow: "closed",
				// 			headerName: "InsideBox",
				// 			width: 120,
				// 		},
				// 	],
				// },
			],
		} 
		

	};

	return {
		trnsNewFormData,
		trnsValidationSchema,
	};
};
