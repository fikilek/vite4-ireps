
// css
import "@/components/trns/TrnsHeader.css";

// hooks
import useAuthContext from "@/hooks/useAuthContext";
import { useUser } from "@/hooks/useUser";

// components
import PageTitle from "@/pages/PageTitle";


const TrnsHeader = props => {
	const { phLl, phL2 } = props;
	const { user } = useAuthContext();
	// console.log(`user`, user);
	
	const { userFromUsers } = useUser(user.uid);
	// console.log(`userFromUsers`, userFromUsers);
	return (
		<div className="trns-header">
			<div className="ph ph-left">
				<div className="phLl">
					{/* <FilterBtn /> */}
					<PageTitle title={phLl} />
					<PageTitle title={phL2} />
				</div>
				<div className="phLr">
					<PageTitle title={userFromUsers.workbase} />
				</div>
			</div>

			<div className="ph ph-right">
				<div className="phRl">
				</div>
				<div className="phRr">
					<button className="trnsTable" id="table">
						Table
					</button>
				</div>
			</div>
		</div>
	);
};

export default TrnsHeader;
