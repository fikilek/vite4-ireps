// npm libraries
import { useContext } from "react";

// css
import "@/pages/asts/Asts.css";

// hooks
import { useAsts } from "@/hooks/useAsts.jsx";
import { useErfs } from "@/hooks/useErfs.jsx";

// contexts
import { AstsContext } from "@/contexts/AstsContext";

// components
import AstsHeader from "@/components/asts/AstsHeader";
import AstsMain from "@/components/asts/AstsMain";
import Filters from "@/components/filters/Filters";

const Asts = () => {
	useErfs();

	const { astsTableFields, error } = useAsts();
	// console.log(`asts`, asts)
	// console.log(`astsTableFields`, astsTableFields)
	// console.log(`error`, error)

	const { astsContext, setAstsContext } = useContext(AstsContext);
	// console.log(`astsContext`, astsContext);

	const { asts, filterBtn } = astsContext;
	// console.log(`asts`, asts);

	return (
		<div className="asts">
			<AstsHeader
				phLl="Asts"
				context={astsContext}
				setContext={setAstsContext}
			/>
			<div className="asts-body">
				{filterBtn ? (
					<>
						<Filters />
						<AstsMain asts={asts} astsTableFields={astsTableFields} />
					</>
				) : (
					<AstsMain asts={asts} astsTableFields={astsTableFields} />
				)}
			</div>
		</div>
	);
};

export default Asts;
