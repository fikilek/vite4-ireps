// npm libraries
import { useContext, useState } from "react";

import "@/components/reports/ReportAstsUsers.css";

// contexts
import { AstsContext } from "@/contexts/AstsContext";

import ReportHeading from "@/components/reports/ReportHeading";
import ReportAstsUsersTable from "@/components/reports/ReportAstsUsersTable";
import ReportAstsUsersPieChart from "@/components/reports/ReportAstsUsersPieChart";
import ReportAstsUsersBarChart from "@/components/reports/ReportAstsUsersBarChart";

const ReportAstsUsers = () => {
	const { astsContext } = useContext(AstsContext);
	// console.log(`astsContext`, astsContext);

	const users = astsContext?.statsCreatedAtDatetimeByUser;
	// console.log(`users`, users);

	return (
		<div className={`report-asts-users`}>
			<ReportHeading title="Asts - Users Report" />
			<div className="rau-body">
				<ReportAstsUsersTable data={users} />
				<ReportAstsUsersBarChart data={users} />
				<ReportAstsUsersPieChart data={users} />
			</div>
		</div>
	);
};

export default ReportAstsUsers;
