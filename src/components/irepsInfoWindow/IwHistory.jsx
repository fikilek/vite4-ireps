// css
import "@/components/irepsInfoWindow/IwHistory.css";

// components
import IrepsInfoWindow from "@/components/irepsInfoWindow/IrepsInfoWindow";
import HistoryErfs from "@/components/history/HistoryErfs";
import HistoryAsts from "@/components/history/HistoryAsts";
// import HistoryTrns from "@/components/history/HistoryTrns";

// other
import {irepsDictionary} from '@/utils/utils'

const IwHistory = props => {
	console.log(`IwHistory props`, props);

	const irepsKeyItem = props?.data?.infoName?.irepsKeyItem
	console.log(`irepsKeyItem`, irepsKeyItem)
	
	return (
		<div className="iw-history">
			<IrepsInfoWindow
				hl1={`${ irepsDictionary.get(irepsKeyItem) } History`}
				hr1={<p></p>}
				windowWidth="50rem"
				windowHeight="35rem"
				headerType="headerType3"
			>
				{irepsKeyItem === 'erfs' && <HistoryErfs erf={props?.data?.data} />}
				{/* {irepsKeyItem === 'trns' && <HistoryTrns trn={props?.data?.data} />} */}
				{irepsKeyItem === 'asts' && <HistoryAsts ast={props?.data?.data} />}

			</IrepsInfoWindow>
		</div>
	);
};

export default IwHistory;
