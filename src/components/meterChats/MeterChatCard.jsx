import { format } from "date-fns";
import { constants } from "@/utils/utils";

import "@/components/meterChats/MeterChatCard.css";

// hooks
import useAuthContext from "@/hooks/useAuthContext.jsx";

const MeterChatCard = (props) => {
	const { chat } = props;
	// console.log(`ast`, ast);
	const { displayName, chatContent, datetime, userUid } = chat;
	// console.log(`userUid`, userUid)

	const { user } = useAuthContext();
	// console.log(`user`, user);

	const {uid} = user
	// console.log(`uid`, uid)

	const chatter = userUid === uid ? 'self' : 'other'
	
	return (
		<div className={`meter-chat-card ${chatter}`}>
			<p className="user">{displayName}</p>
			<p className="content">{chatContent}</p>
			<p className="datetime">
				{format(datetime.toDate(), constants.dateFormat2)}
			</p>
		</div>
	);
};

export default MeterChatCard;
