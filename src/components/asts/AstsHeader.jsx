import { useContext } from "react";

import "@/components/asts/AstsHeader.css";

import { AstsContext } from "@/contexts/AstsContext";
import PageTitle from "@/pages/PageTitle";
import FilterBtn from "@/components/filters/FilterBtn";
import useModal from "@/hooks/useModal.jsx";
import useAuthContext from "@/hooks/useAuthContext";
import { useUser } from "@/hooks/useUser";

const AstsHeader = props => {
	const { phLl } = props;
	
	const { user } = useAuthContext();
	// console.log(`user`, user);
	
	const { userFromUsers } = useUser(user.uid);
	// console.log(`userFromUsers`, userFromUsers);

	const { astsContext, setAstsContext } = useContext(AstsContext);

	// handle event - active tab
	const handleActiveTab = e => {
		setAstsContext(prev => {
			return {
				...prev,
				activeTab: e.target.id,
			};
		});
	};

	return (
		<div className="asts-header">
			<div className="ph ph-left">
				<div className="phLl">
					<FilterBtn />
					<PageTitle title={phLl} />
				</div>
				<div className="phLr">
					<PageTitle title={userFromUsers.workbase} />

				</div>
			</div>

			<div className="ph ph-right">
				<div className="phRl">
				</div>
				<div className="phRr">
				<button
						className={astsContext.activeTab === "table" ? "active" : null}
						id="table"
						onClick={handleActiveTab}
					>
						Table
					</button>
					{/* <button
						className={astsContext.activeTab === "split" ? "active" : null}
						id="split"
						onClick={handleActiveTab}
					>
						Split
					</button> */}
					<button
						className={astsContext.activeTab === "map" ? "active" : null}
						id="map"
						onClick={handleActiveTab}
					>
						Map
					</button>
				</div>
			</div>
		</div>
	);
};

export default AstsHeader;
