import { useRef, useState } from "react";
import { Timestamp } from "firebase/firestore";

// css
import "@/components/meterChats/MeterChatForm.css";

// custom hooks
import useAutosizeTextArea from "@/hooks/useAutosizeTextArea.jsx";
import useAuthContext from "@/hooks/useAuthContext.jsx";

// context

// components

const MeterChatForm = (props) => {
	// console.log(`props`, props);
	const {ast}= props
	// console.log(`ast`, ast);

	const { user } = useAuthContext();
	// console.log(`user`, user);

	const [value, setValue] = useState("");
	// console.log(`value`, value);

	const textAreaRef = useRef(null);

	useAutosizeTextArea(textAreaRef.current, value);

	const handleChange = (e) => {
		const val = e.target?.value;
		// console.log(`val`, val);
		setValue(val);
	};

	const disabled = value ? false : true

	const onSubmit = () => {
		const chatContent = {
			datetime: Timestamp.now(),
			uid: user.uid,
			displayname: user.displayName,
			chatContent: value,
			asiId: ast?.id,
		}
		console.log(`chatContent`, chatContent);
		// updateUserEmail(values);
	};

	return (
		<div className="meter-chat-form">
			<button onClick={()=>setValue('') } className={disabled ? 'disabled' : ''}  disabled={disabled}>Clear</button>
			<textarea
				className="textarea"
				onChange={handleChange}
				placeholder="type message"
				ref={textAreaRef}
				rows={1}
				value={value}
			/>
			<button onClick={onSubmit} className={disabled ? 'disabled' : ''} disabled={disabled}>Submit</button>
		</div>
	);
};

export default MeterChatForm;
