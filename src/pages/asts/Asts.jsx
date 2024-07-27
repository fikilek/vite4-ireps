
// css
import "@/pages/asts/Asts.css";

// hooks
import {useAsts} from '@/hooks/useAsts.jsx'
import {useErfs} from '@/hooks/useErfs.jsx'

// components
import AstsHeader from "@/components/asts/AstsHeader";
import AstsMain from "@/components/asts/AstsMain";

const Asts = () => {
	useErfs()
	useAsts()
	// const { astsContext } = useContext(AstsContext);
	return (
		<div className="asts">
			<AstsHeader phLl="Asts" />
			<div className="asts-body">
				{/* {astsContext.filterBtn ? <AstsFilters /> : null} */}
				<AstsMain />
			</div>
		</div>
	);
};

export default Asts;
