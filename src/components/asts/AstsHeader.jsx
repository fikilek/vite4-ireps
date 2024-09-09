// npm library
// import { useContext } from "react";
import { IconContext } from "react-icons";
// import { FaMapMarkedAlt } from "react-icons/fa";
import { MdAddBox  } from "react-icons/md";

// css
import "@/components/asts/AstsHeader.css";

// hooks
import { useUser } from "@/hooks/useUser";
import { useTrns } from "@/hooks/useTrns";
// import useModal from "@/hooks/useModal.jsx";
import useModal from "@/hooks/useModal.jsx";


// contexts
// import { AstsContext } from "@/contexts/AstsContext";

// components
import PageTitle from "@/pages/PageTitle";
// import FilterBtn from "@/components/filters/FilterBtn";
import useAuthContext from "@/hooks/useAuthContext";

const AstsHeader = (props) => {
	const { phLl } = props;

	const {trnsNewFormData, trnsValidationSchema} = useTrns()

	const { user } = useAuthContext();
	// console.log(`user`, user);

	const { openModal } = useModal();

	const { userFromUsers } = useUser(user.uid);
	// console.log(`userFromUsers`, userFromUsers);

	return (
		<div className="asts-header">
			<div className="ph ph-left">
				<div className="phLl">
					{/* <FilterBtn /> */}
					<PageTitle title={phLl} />
					<PageTitle title={userFromUsers.workbase} />
				</div>
				<div className="phLr"></div>
			</div>

			<div className="ph ph-right">
				<div className="phRl"></div>
				<div className="phRr">

				</div>
			</div>
		</div>
	);
};

export default AstsHeader;
