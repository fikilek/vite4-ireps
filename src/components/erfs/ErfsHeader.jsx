import { useContext } from "react";

// css
import "@/components/erfs/ErfsHeader.css";

// hooks
import { useUser } from "@/hooks/useUser";
import useAuthContext from "@/hooks/useAuthContext";

// components
import { ErfsContext } from "@/contexts/ErfsContext";
import PageTitle from "@/pages/PageTitle";
import FilterBtn from "@/components/filters/FilterBtn";

const ErfsHeader = props => {
	// props
	const { phLl } = props;

	const { user } = useAuthContext();
	// console.log(`user`, user);
	
	const { userFromUsers } = useUser(user.uid);
	// console.log(`userFromUsers`, userFromUsers);

	// context
	const { erfsContext, setErfsContext } = useContext(ErfsContext);

	// handle event - active tab
	const handleActiveTab = e => {
		setErfsContext(prev => {
			return {
				...prev,
				activeTab: e.target.id,
			};
		});
	};

	return (
		<div className="erfs-header">
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
				<div className="phRl"></div>
				<div className="phRr">
					<button
						className={erfsContext.activeTab === "table" ? "active" : null}
						id="table"
						onClick={handleActiveTab}
					>
						Table
					</button>
					{/* <button
						className={erfsContext.activeTab === "split" ? "active" : null}
						id="split"
						onClick={handleActiveTab}
					>
						Split
					</button> */}
					<button
						className={erfsContext.activeTab === "map" ? "active" : null}
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

export default ErfsHeader;
