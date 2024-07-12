/* eslint-disable no-undef */
const {
	onDocumentCreated,
	onDocumentWritten,
	// onDocumentWrittenWithAuthContext,
	// eslint-disable-next-line no-undef
} = require("firebase-functions/v2/firestore");

const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { initializeApp } = require("firebase-admin/app");
const admin = require("firebase-admin");
const functions = require("firebase-functions/v1");
const {
	getFirestore,
	FieldValue,
	Timestamp,
} = require("firebase-admin/firestore");
const { getAuth } = require("firebase-admin/auth");
// const { doc, getDoc } = require("firebase/firestore");
// const { query, collection, where, getDocs } = require("firebase/firestore");

initializeApp();
const db = getFirestore();

// Update service provider when a user is created. This is done by adding 'user'
// credentials(uid, name, email and phone) onto a 'user' array in the 'serviceProvider' document.
// TODO: take care of the situation where the user migrates from one sp to another or is deleted
exports.updateServiceProvider = onDocumentCreated(
	"users/{spId}",
	async (event) => {
		console.log(`event-----------------------------`, event);

		// step X: Get an object representing the document created
		const snapshot = event.data;
		if (!snapshot) {
			console.log("No data associated with the event");
			return;
		}
		const data = snapshot.data();
		console.log(`data------------------------------`, data);

		// step X: update the 'serviceProvider' document with the user details
		const spRef = db.collection("serviceProviders").doc(data.spId);
		await spRef.update({
			users: FieldValue.arrayUnion({
				name: data?.name,
				email: data?.email,
				phone: data?.phoneNumber,
				uid: data?.metadata?.createdByUid,
			}),
		});
		// console.log(`unionRes`, unionRes);
	}
);

exports.addDefaultUserRole = functions.auth.user().onCreate(async (user) => {
	console.log(`user ------------------------------------`, user);
	let uid = user.uid;

	const customClaims = {
		roles: {
			guest: true,
			fieldworker: false,
			supervisor: false,
			manager: false,
			superuser: false,
		},
	};

	return admin
		.auth()
		.setCustomUserClaims(uid, customClaims)
		.then(() => {
			return null;
		})
		.catch((err) => {
			console.log("Error setting custom claim:", err.message);
			return err.msg;
		});
});

exports.listAllUsers = onCall(async (request) => {
	let users = [];

	if (!request.auth) {
		// Throwing an HttpsError so that the client gets the error details.
		throw new HttpsError(`Error in listAllUsers. User not authenticated`);
	}

	return admin
		.auth()
		.listUsers(1000)
		.then((listUsersResult) => {
			listUsersResult.users.forEach((userRecord) => {
				users.push({ id: userRecord.uid, ...userRecord });
			});
			return users;
		})
		.catch((error) => {
			return `Error listing users: ${error.message}`;
		});
});

exports.disableUserAcc = onCall(async (request) => {
	// log(`request`, request);

	const { uid, action } = request.data;

	if (!request.auth) {
		// Throwing an HttpsError so that the client gets the error details.
		throw new HttpsError(
			`Error in disableUserAcc method. User not authenticated`
		);
	}

	return admin
		.auth()
		.updateUser(uid, {
			disabled: action,
		})
		.then((updatedUserRecord) => {
			log(`updatedUserRecord ----`, updatedUserRecord);
			// log(`User Account succesfully ${action ? "DISABLED" : "ENABLED"} ......`);
			return {
				result: `User Account with uid [${uid}] succesfully [${
					action ? "DISABLED" : "ENABLED"
				}] `,
				success: true,
			};
		})
		.catch((error) => {
			error(`Error enabling/disabling users account: ${error.message}`, error);
			return `Error enabling/disabling users account: ${error.message}`;
		});
});

exports.updateUserRole = onCall(async (request) => {
	const { data, auth } = request;
	// console.log(`auth`, auth);
	// console.log(`auth.token.email`, auth.token.email);

	const { uid: claimUid, changeSet } = data;

	const customClaims = { roles: data.roles };

	// convert roles controlled object into an array
	const rolesControlledArray = [];
	for (const role in customClaims.roles) {
		// console.log(`role`, role);
		if (customClaims.roles[role]) {
			rolesControlledArray.push(role);
		}
	}

	// validation rules 1: only authenticated user is allowed to set a role
	if (!auth) {
		throw new functions.https.HttpsError(
			"permission-denied",
			"only authenticated user is allowed to set a role"
		);
	}

	// get current user auth uid
	const controllerUid = auth.uid;

	// get current user roles
	const rolesControllerObj = auth.token.roles;

	// convert roles controller object into an array
	const rolesControllerArray = [];
	for (const role in rolesControllerObj) {
		if (rolesControllerObj[role]) {
			rolesControllerArray.push(role);
		}
	}

	// validation rule 2: user cannot modify own roles
	if (controllerUid === claimUid) {
		throw new functions.https.HttpsError(
			"permission-denied",
			"user CANNOT alter OWN role"
		);
	}

	// validation rule 3: only manager or superuser can modify roles
	if (
		!rolesControllerArray.includes("manager") &&
		!rolesControllerArray.includes("superuser")
	) {
		throw new functions.https.HttpsError(
			`permission-denied`,
			`only manager or superuser can modify roles`
		);
	}

	// validation rule 4: user has NO ROLE, CANNOT alter roles
	if (rolesControllerArray.length === 0) {
		throw new functions.https.HttpsError(
			`permission-denied`,
			`user has NO ROLE, CANNOT alter roles`
		);
	}

	// validation rule 5: only fikilekentane@gmail.com can set a superuser role
	if (
		changeSet["superuser"]["change"] === true &&
		auth.token.email !== "fikilekentane@gmail.com"
	) {
		throw new functions.https.HttpsError(
			`permission-denied`,
			`user is NOT ALLOWED to modify a SUPERUSER role`
		);
	}

	return admin
		.auth()
		.setCustomUserClaims(claimUid, customClaims)
		.then((result) => {
			// console.log(`result`, result)
			return admin.auth().getUser(claimUid);
		})
		.then((userRecord) => {
			return {
				userRecord,
			};
		})
		.catch((err) => {
			console.log("Error updating custom claim:", err);
			return `${err.message}`;
		});
});

exports.updateUserWorkbase = onCall(async (request) => {
	// console.log(`request--------------------------------`, request);

	const { data, auth } = request;
	// console.log(`auth--------------------------------`, auth);
	// console.log(`data--------------------`, data);

	const { workbase } = data.roles;
	// console.log(`workbase------------------`, workbase);

	const userRecord = await getAuth().getUser(auth.uid);
	// console.log(`userRecord------------------`, userRecord);

	// desructure roles from userRecord
	const { roles } = userRecord.customClaims;
	// console.log(`roles------------------`, roles);

	// create a new customeclaaims object and update it with workbase
	const customClaims = {
		roles: {
			...roles,
			workbase: workbase,
		},
	};
	// console.log(`customClaims--------------------`, customClaims);

	return admin
		.auth()
		.setCustomUserClaims(auth.uid, customClaims)
		.then((result) => {
			// console.log(`claim update result -----------------------------`, result);
			return admin.auth().getUser(auth.uid);
		})
		.then((userRecord) => {
			return {
				userRecord,
			};
		})
		.catch((err) => {
			console.log("Error updating custom claim:", err);
			return `${err.message}`;
		});
});

// When a media (image, audio or video) is created and uploaded into storage, an assosciated document
// is also created on 'media' collection. The creation of a media document then triggers a
// function that will update an associated media property of the erf document.
exports.erfMedia = onDocumentCreated("mediaErfs/{mediaId}", async (event) => {
	// console.log(`event-------------------------`, event);
	// console.log(`event.data-------------------------`, event.data);
	// console.log(
	// 	`event.params.mediaId-------------------------`,
	// 	event.params.mediaId
	// );

	// step : Get an object representing the document created
	const mediaDocSnapshot = event.data;
	// console.log(
	// 	`mediaDocSnapshot------------------------------`,
	// 	mediaDocSnapshot
	// );

	if (!mediaDocSnapshot) {
		console.log("mediaDocSnapshot  ****** No data associated with the event");
		return;
	}

	// step : Extract data from the mediaDocSnapshot
	const data = mediaDocSnapshot.data();
	// console.log(`data------------------------------`, data);

	// step : Extract the erf id from the data
	const { erfId } = data.metadata;
	// console.log(`erfId------------------------------`, erfId);

	// step : get reference object to the erf using the erfId
	const erfRef = db.collection("erfs").doc(erfId);

	// step : create the media object to update the erf media
	const erfMedia = {
		mediaId: event.params.mediaId,
		mediaCategory: data.metadata.mediaCategory,
		createdAtDatetime: data?.metadata.createdAtDatetime,
		createdByUser: data?.metadata.createdByUser,
		ErfNo: data?.metadata.erfNo,
		url: data?.url,
		mediaType: data?.metadata?.mediaType,
	};
	// console.log(`erfMedia------------------------------`, erfMedia);
	// console.log(`erfRef------------------------------`, erfRef);

	const updateResult = await erfRef.update({
		media: FieldValue.arrayUnion(erfMedia),
		"metadata.updatedAtDatetime": Timestamp.now(),
		"metadata.updatedByUser": data?.metadata.createdByUser,
		"metadata.updatedByUid": data?.metadata.createdByUid,
	});
	// console.log(`updateResult------------------------------`, updateResult);
});

// When ast media (image, audio or video) is created and uploaded into storage, an assosciated document is also created on 'mediaAst' collection. The creation of a media document then triggers a function that will update an assosciated madia property of the ast document as well as the trn linked to the ast..
exports.astMedia = onDocumentCreated("mediaAsts/{mediaId}", async (event) => {
	// console.log(`event-------------------------`, event);
	// console.log(`event.data-------------------------`, event.data);
	// console.log(
	// 	`event.params.mediaId-------------------------`,
	// 	event.params.mediaId
	// );

	// step : Get an object representing the document created
	const mediaDocSnapshot = event.data;
	// console.log(
	// 	`mediaDocSnapshot------------------------------`,
	// 	mediaDocSnapshot
	// );

	if (!mediaDocSnapshot) {
		console.log("mediaDocSnapshot  ****** No data associated with the event");
		return;
	}

	// step : Extract data from the mediaDocSnapshot
	const data = mediaDocSnapshot.data();
	// console.log(`data------------------------------`, data);

	// step : Extract the ast id from the data
	const { astId } = data.metadata;
	// console.log(`astId------------------------------`, astId);

	// step : query 'mediaAst' for all media associated with astId
	// first check if the 'mediaAsts' collection exists
	db.collection("mediaAsts")
		.where("metadata.astId", "==", astId)
		.get()
		.then((querySnapshot) => {
			// console.log(`querySnapshot------------------------------`, querySnapshot);
			const media = [];
			querySnapshot.forEach((doc) => {
				// doc.data() is never undefined for query doc snapshots
				// console.log(`Doc id --------------------------`, doc.id);
				media.push({
					id: doc.id,
					...doc.data(),
				});
			});
			// console.log(`media------------------------------`, media);

			// step : create the media array that will replace existing the ast media  array
			const updatedAstMedia = media.map((data) => {
				return {
					mediaId: data.id,
					mediaCategory: data.metadata.mediaCategory,
					createdAtDatetime: data?.metadata.createdAtDatetime,
					createdByUser: data?.metadata.createdByUser,
					astNo: data?.metadata.astNo,
					url: data?.url,
					mediaType: data?.metadata?.mediaType,
				};
			});
			console.log(
				// `updatedAstMedia------------------------------`,
				updatedAstMedia
			);

			// step : get reference object to the ast using the astId
			const astRef = db.collection("asts").doc(astId);
			// console.log(`astRef------------------------------`, astRef);

			// update the existing ast media array
			astRef
				.update({
					media: updatedAstMedia,
					"metadata.updatedAtDatetime": Timestamp.now(),
					"metadata.updatedByUser": data?.metadata.createdByUser,
					"metadata.updatedByUid": data?.metadata.createdByUid,
				})
				.then((result) => {
					// console.log(
					// 	`mediaAst update result------------------------------`,
					// 	result
					// );
				});
		})

		.catch((error) => {
			console.log("Error getting documents:....................... ", error);
		});

	// step : Extract the trn id from the data
	const { trnId } = data.metadata;
	// console.log(`trnId------------------------------`, trnId);

	// Update the trn where the media was cuptured
	db.collection("trns")
		.doc(trnId)
		.update({
			"metadata.updatedAtDatetime": Timestamp.now(),
			"metadata.updatedByUser": data?.metadata.createdByUser,
			"metadata.updatedByUid": data?.metadata.createdByUid,
		})
		.then((result) => {
			// console.log(`trn update result------------------------------`, result);
		})
		.catch((error) => {
			console.log(
				`Error updating trn------------------------------`,
				error.message
			);
		});
});

// create new ast
const createNewAst = async (trnAfter) => {
	// console.log(`creating ast -------------------`, trnAfter);
	// console.log(`ast - line 439`, ast);
	// console.log(`ast.astId - line 440`, ast.astId);
	// console.log(`ast.trnObject.id - line 441`, ast.trnObject.id);

	// extract ast id
	const { astId } = trnAfter.astData;
	// console.log(`astId------------------------------`, astId);

	// create a new ast object
	const newAst = {
		metadata: {
			createdAtDatetime: Timestamp.now(),
			createdByUser: trnAfter.metadata.createdByUser,
			createdByUid: trnAfter.metadata.createdByUid,
			updatedAtDatetime: Timestamp.now(),
			updatedByUser: trnAfter.metadata.updatedByUser,
			updatedByUid: trnAfter.metadata.updatedByUid,
			createdThrough: {
				creatorTrnName: trnAfter.metadata.trnType,
				creatorTrnNo: trnAfter.metadata.trnNo,
				creatorTrnId: trnAfter.metadata.trnId,
			},
			// trnCount: admin.firestore.FieldValue.arrayUnion(astUpdatedObj),
		},
		astData: {
			astId: trnAfter.astData.astId,
			astNo: trnAfter.astData.astNo,
			astCatergory: trnAfter.astData.astCatergory,
			astState: trnAfter.astData.astState,
			astManufacturer: trnAfter.astData.astManufacturer,
			astName: trnAfter.astData.astName,
			meter: {
				phase: trnAfter.astData.meter.phase,
				type: trnAfter.astData.meter.type,
				keypad: {
					serialNo: trnAfter.astData.meter.keypad.serialNo,
					comment: trnAfter.astData.meter.keypad.comment,
				},
				cb: {
					size: trnAfter.astData.meter.cb.size,
					comment: trnAfter.astData.meter.cb.comment,
				},
				seal: {
					sealNo: trnAfter.astData.meter.seal.sealNo,
					comment: trnAfter.astData.meter.seal.comment,
				},
			},
		},
		erf: trnAfter.erf,
		location: trnAfter.location,
		anomalies: trnAfter.anomalies,
		trns: [
			{
				trnId: trnAfter.metadata.trnId,
				trnType: trnAfter.metadata.trnType,
				updatedAtDatetime: Timestamp.now(),
				updatedByUser: trnAfter.metadata.updatedByUser,
			},
		],
	};
	// console.log(`newAst------------------------------`, newAst);

	// add the new ast to the asts collection
	db.collection("asts")
		.doc(astId)
		.set(newAst)
		.then((docRef) => {
			// console.log(
			// 	"Document set with docRef: ----------------------------- ",
			// 	docRef
			// );
			return `Document set with docRef: ${docRef}`;
		})
		.catch((error) => {
			// console.error("Error adding document ): --------------------- ", error.msg);
			return "Error adding document: ", error.msg;
		});
};

const updateAstTrns = async (trnAfter) => {
	// console.log(`trnAfter------------------------------`, trnAfter);
	// retrieve trnId from trnAfter
	const { trnId } = trnAfter.metadata;
	// console.log(`trnId------------------------------`, trnId);

	// retrieve trnType from trnAfter
	const { trnType } = trnAfter.metadata;
	// console.log(`trnType------------------------------`, trnType);

	// retrieve trn displayName and user uid from trn metadata
	const userDisplayname = trnAfter.metadata.updatedByUser;
	// console.log(`userDisplayname------------------------------`, userDisplayname);

	const userUid = trnAfter.metadata.updatedByUid;
	// console.log(`userUid------------------------------`, userUid);

	// retrieve the astId from trn metatada
	const { astId } = trnAfter.astData;
	// console.log(`astId------------------------------`, astId);

	// get reference to the ast at astId
	const astRef = db.collection("asts").doc(astId);
	// console.log(`astRef------------------------------`, astRef);

	// step X: update the 'ast' document with the trn details
	await astRef.update({
		"metadata.updatedAtDatetime": Timestamp.now(),
		"metadata.updatedByUser": userDisplayname,
		"metadata.updatedByUid": userUid,
		trns: FieldValue.arrayUnion({
			trnId: trnId,
			trnType: trnType,
			updatedAtDatetime: Timestamp.now(),
			updatedByUser: userDisplayname,
		}),
	});
};

// update Erf through a cloud function onCreate everytime an ast is created
exports.updateErfOnAstCreation = onDocumentCreated(
	"asts/{astId}",
	async (event) => {
		// console.log(`event -------------------------`, event);

		// step X: Get an object representing the ast document created
		const snapshot = event.data;
		if (!snapshot) {
			console.log("No data associated with the event");
			return;
		}

		// step X: retrieve data for ast just created
		const data = snapshot.data();
		// console.log(`data 370------------------------------`, data);
		// console.log(`data.metadata 371------------------------------`, data.metadata);

		// step X: retrieve erf info where the newly created ast is located
		const { erfId } = data.erf;
		// console.log(`erfId------------------------------`, erfId);

		// step X: get reference to the erf
		const erfRef = db.collection("erfs").doc(erfId);
		// console.log(`erfRef------------------------------`, erfRef);

		// retrive trn displayName and user uid from trn metadata
		const userDisplayname = data.metadata.updatedByUser;
		// console.log(`userDisplayname------------------------------`, userDisplayname);
		const userUid = data.metadata.updatedByUid;
		// console.log(`userUid------------------------------`, userUid);
		const astCreatorTrnName = data.metadata.createdThrough.creatorTrnName;
		// console.log(`astCreator------------------------------`, astCreatorTrnName);

		// step X: update the 'erf' document with the user details
		await erfRef.update(
			{
				"metadata.updatedAtDatetime": Timestamp.now(),
				"metadata.updatedByUser": userDisplayname,
				"metadata.updatedByUid": userUid,
				asts: FieldValue.arrayUnion({
					astId: snapshot.id,
					astNo: data.astData.astNo,
					astCat: data.astData.astCatergory,
					createdAtDatetime: Timestamp.now(),
					createdByUser: userDisplayname,
					astCreatorTrnName: astCreatorTrnName,
				}),
			},
			{ merge: true }
		);
		// console.log(`unionRes`, unionRes);
	}
);

// update trn state
const setTrnState = (trnSnapshot, newState) => {
	// console.log(`trnSnapshot --------------------------`, trnSnapshot);

	// retrieve trn ref
	const { ref } = trnSnapshot;

	// retrive trn displayName and user uid from trn metadata
	const userDisplayname = trnSnapshot.data().metadata.updatedByUser;
	const userUid = trnSnapshot.data().metadata.updatedByUid;

	ref
		.update({
			"metadata.trnState": newState,
			"metadata.updatedAtDatetime": Timestamp.now(),
			"metadata.updatedByUser": userDisplayname,
			"metadata.updatedByUid": userUid,
		})
		.then((updateTrn) => {
			console.log(`updatedTrn`, updateTrn);
			return updateTrn;
		});
};

exports.trnAction = onDocumentWritten("trns/{trnId}", async (event) => {
	const snapshot = event.data.after;
	// console.log(`trnAfter snapshot-------------------------`, snapshot);
	if (!snapshot) {
		// console.log("No data associated with the event");
		return;
	}
	const data = event.data.after.data();
	// console.log(`trnAfter data -------------`, data);

	// retrieve trn state
	const { trnState } = data.metadata;
	// console.log(`trnState -------------`, trnState);

	// retrieve trn type
	const { trnType } = data.metadata;
	// console.log(`trnState -------------`, trnState);

	// respnse to each state using switch statement
	switch (trnState) {
		default:
			return;
		case "N/A":
		case "submitted":
		case "draft":
			// console.log(`Trn state is ${trnState}: --------------------do not do anything`);
			break;
		case "valid":
			// 1. create a new ast (this is only for 'audit' and 'installation')
			// console.log(`trnType is : ------------------------------`, trnType);
			if (trnType === "audit" || trnType === "installation") {
				await createNewAst(data);
			}
			if (trnType === "inspection" || trnType === "tid") {
				// console.log(`updateAstTrns with data: --------------------`, data	);
				// console.log(`updating 'trns' array on ast with data: --------------------`, data	);
				await updateAstTrns(data);
			}

			// 2. update erf that created the trn
			// TODO: do this through a cloud function function triggered when the ast doc is created

			// 3. update the trn state from 'valid' to 'submitted'
			// `Trn state is ${trnState}: --------------------update trn state to "submitted"`
			setTrnState(snapshot, "submitted");

			break;
	}

	return null;
});

// exports.getUserWorkbase = onCall(async request => {
// 	// console.log(`request ---------------------`, request);

// 	if (!request.auth) {
// 		// Throwing an HttpsError so that the client gets the error details.
// 		throw new HttpsError(`Error in getUserWorkbase. User not authenticated`);
// 	}

// 	// get uid passed from the client.
// 	const { uid } = request.data;
// 	// console.log(`uid ---------------------`, uid);

// 	// get reference to the user
// 	const userRef = db.collection("users").doc(uid.trim());
// 	// const userRef = doc(db, "users", uid);
// 	// console.log(`userRef------------------------------`, userRef);

// 	return userRef
// 	.get()
// 	.then(doc => {
// 			// console.log(`doc------------------------------`, doc);
// 			if (doc.exists) {
// 				console.log("Document data:", doc.data());
// 				return { workbase: doc.data().workbase };
// 			} else {
// 				// doc.data() will be undefined in this case
// 				console.log("No such document!");
// 				return { Error: "No such document!" };
// 			}
// 		})
// 		.catch(error => {
// 			console.log("Error getting document:", error);
// 			return { Error: `Error getting document:", ${error.message}` };
// 		});

// });
