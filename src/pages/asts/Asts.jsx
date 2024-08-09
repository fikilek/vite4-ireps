
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
	return (
		<div className="asts">
			<AstsHeader phLl="Asts" />
			<div className="asts-body">
				<AstsMain />
			</div>
		</div>
	);
};

export default Asts;
