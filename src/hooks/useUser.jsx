import { useEffect, useState } from "react";

import useAuthContext from "@/hooks/useAuthContext";
import { useFirestore } from "./useFirestore";

export const useUser = uid => {
	// console.log(`uid`, uid);

	// const userUid = useMemo(()=>uid, [uid])
	// console.log(`userUid`, userUid);

	const [initials, setInitials] = useState("");
	const [userFromUsers, setUserFromUsers] = useState({});
	// console.log(`userFromUsers`, userFromUsers);

	const { user } = useAuthContext() || {};
	const { displayName } = user;

	const { response, getDocument } = useFirestore("users");
	// console.log(`response`, response);

	useEffect(() => {
		if (uid) getDocument(uid);
	}, [uid]);

	useEffect(() => {
		if (response.success) {
			const userDoc = response.document;
			// console.log(`userDoc`, userDoc);
			setUserFromUsers(userDoc);
		}
	}, [response.success]);

	useEffect(() => {
		if (displayName) {
			const firstLetterSurname = displayName
				.split(" ")[0]
				.slice(0, 1)
				.toUpperCase();
			const firstLetterName = displayName.split(" ")[1].slice(0, 1).toUpperCase();
			setInitials(`${firstLetterSurname}${firstLetterName}`);
		}
	}, [displayName]);

	return { initials, userFromUsers };
};
