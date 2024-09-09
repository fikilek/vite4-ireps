// nom libraries

// css
import "@/components/asts/AstsMain.css";

// components
import AstsTable from "@/components/asts/AstsTable";

const AstsMain = ({ asts, astsTableFields }) => {

	return <div className="asts-main">{<AstsTable  asts={asts} astsTableFields={astsTableFields} />}</div>;
};

export default AstsMain;
