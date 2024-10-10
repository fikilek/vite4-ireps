// npm libraries
import { useContext } from "react";

import "@/components/reports/ReportAstsUsers.css";

// contexts
import { AstsStatsContext } from "@/contexts/AstsStatsContext";

import ReportHeading from "@/components/reports/ReportHeading";
import ReportAstsUsersTable from "@/components/reports/ReportAstsUsersTable";
import ReportAstsUsersPieChart from "@/components/reports/ReportAstsUsersPieChart";
import ReportAstsUsersBarChart from "@/components/reports/ReportAstsUsersBarChart";

const ReportAstsUsers = () => {
	const { astsStatsContext } = useContext(AstsStatsContext);
	// console.log(`astsContext`, astsContext);

	const users = astsStatsContext?.statsAstsUsers;
	// console.log(`users`, users);

	return (
		<div className={`report-asts-users`}>
			<ReportHeading title="Users Stats" />
			<div className="rau-body">
				<ReportAstsUsersTable data={users} />
				<ReportAstsUsersBarChart data={users} />
				{/* <ReportAstsUsersPieChart data={users} /> */}
			</div>
		</div>
	);
};

export default ReportAstsUsers;
