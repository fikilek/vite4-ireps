// npm libraries

// css
import "@/pages/asts/Asts.css";

// hooks
import { useAsts } from "@/hooks/useAsts.jsx";
import { useErfs } from "@/hooks/useErfs.jsx";

// contexts

// components
import AstsHeader from "@/components/asts/AstsHeader";
import AstsMain from "@/components/asts/AstsMain";

const Asts = () => {

	useErfs();

	const {asts , astsTableFields, error } = useAsts();
	// console.log(`asts`, asts)
	// console.log(`astsTableFields`, astsTableFields)
	// console.log(`error`, error)
	
	return (
		<div className="asts">
			<AstsHeader phLl="Asts" />
			<div className="asts-body">
				<AstsMain asts={asts} astsTableFields={astsTableFields} />
			</div>
		</div>
	);
};

export default Asts;
