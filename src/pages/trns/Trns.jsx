import { memo } from "react";

// css
import "@/pages/trns/Trns.css";

// import TrnsFilters from "@/components/trns/TrnsFilters";
import TrnsHeader from "@/components/trns/TrnsHeader";
import TrnsTable from "@/components/trns/TrnsTable";

const Trns = props => {
	const { trnType, astCat } = props;
	// console.log(`props`, props)

	return (
		<div className="trns">
			<TrnsHeader phLl="Trns" phL2={astCat}  phL3={trnType} />
			<div className="trns-body">
				{/* {trnsContext.filterBtn ? <TrnsFilters /> : null} */}
				<TrnsTable astCat={astCat} trnType={trnType} />
			</div>
		</div>
	);
};

export default memo(Trns);
