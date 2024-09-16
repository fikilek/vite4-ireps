import { useMemo, useState } from "react";
import { where } from "firebase/firestore";

import "@/components/irepsInfoWindow/IwMeterReport.css";

// hooks
import useCollection from "@/hooks/useCollection.jsx";

// components
import IrepsInfoWindow from "@/components/irepsInfoWindow/IrepsInfoWindow";
import TableTrnsOnAst from "@/components/tables/TableTrnsOnAst";
import TableDate from "@/components/tables/TableDate";
import TabPanel from "@/components/tabPanel/TabPanel";
import { irepsConstants } from "@/utils/utils";
import MediaAlbum from "@/components/media/MediaAlbum";
import MapIrepsMap from "@/components/maps/MapIrepsMap";
import BtnTab from "@/components/btns/BtnTab";
import MeterChat from "@/components/meterChats/MeterChat";
import MeterTimeline from "@/components/meterTimeline/MeterTimeline";
import MapMeterOnMap from "@/components/maps/MapMeterOnMap";
import MapWardErfsBoundaries from "@/components/maps/MapWardErfsBoundaries";

const IwMeterReport = (props) => {
	// console.log(`props`, props);
	// const { data } = props;
	const { astData, erf, trns } = props?.data?.data;
	// console.log(`trns`, trns);

	const ast = props?.data?.data;
	// console.log(`ast`, ast);

	const { lmMetro, ward } = ast?.erf?.address;

	const { astId } = astData;
	// console.log(`astId`, astId)

	const constraints = useMemo(
		() => where("metadata.astId", "==", astId),
		[astId]
	);
	// console.log(`constraints`, constraints);

	const { data: astMediaInfo } = useCollection("mediaAsts", [constraints]);
	// console.log(`astMediaInfo`, astMediaInfo);

	const trnsOnAstTableFields = [
		{
			field: "trnType",
			headerName: "Trn Type",
			// width: 150,
			flex: 0.2,
		},
		{
			field: "updatedByUser",
			headerName: "Updated By",
			// width: 150,
			flex: 0.3,
		},
		{
			field: "updatedAtDatetime",
			headerName: "Updated At Datetime",
			cellRenderer: (params) => {
				// console.log(`params`, params);
				const newDate = params.value.toDate();
				return (
					<TableDate
						date={newDate}
						dateFormat={irepsConstants.IC_DATE_FORMAT1}
					/>
				);
			},
			valueGetter: (params) => {
				// console.log(`params`, params);
				return params.data.updatedAtDatetime;
			},
			// width: 190,
			flex: 0.4,
		},
	];

	const hl1 = (
		<span>
			Mn: <span className="text-emphasis2">{astData?.astNo}</span>
		</span>
	);
	const hl2 = (
		<span>
			Erf: <span className="text-emphasis2">{erf?.erfNo}</span>
		</span>
	);
	const hr1 = (
		<span>
			State: <span className="text-emphasis2">{astData?.astState?.state}</span>
		</span>
	);
	const hr2 = <button>Export</button>;

	const [activeTab, setActiveTab] = useState("trns");

	return (
		<div className="iw-meter-report">
			<IrepsInfoWindow hl1={hl1} hl2={hl2} hr1={hr1} hr2={hr2}>
				<div className="tab-btns">
					<BtnTab
						setActiveTab={setActiveTab}
						activeTab={activeTab}
						tabName="trns"
					/>
					<BtnTab
						setActiveTab={setActiveTab}
						activeTab={activeTab}
						tabName="media"
					/>
					<BtnTab
						setActiveTab={setActiveTab}
						activeTab={activeTab}
						tabName="map"
					/>
					<BtnTab
						setActiveTab={setActiveTab}
						activeTab={activeTab}
						tabName="chat"
					/>
					<BtnTab
						setActiveTab={setActiveTab}
						activeTab={activeTab}
						tabName="timeline"
					/>
				</div>

				<TabPanel title="Ast Transactions" activeTab={activeTab} tabName="trns">
					<TableTrnsOnAst rowData={trns} colDefs={trnsOnAstTableFields} />
				</TabPanel>

				<TabPanel title="Ast Media" activeTab={activeTab} tabName="media">
					<MediaAlbum media={astMediaInfo} />
				</TabPanel>

				<TabPanel title="Ast on Map" activeTab={activeTab} tabName="map">
					<div className="map-wrapper">
						<MapIrepsMap>
							<MapWardErfsBoundaries lmMetro={lmMetro} ward={ward} />
							<MapMeterOnMap ast={ast} />
						</MapIrepsMap>
					</div>
				</TabPanel>

				<TabPanel title="Chat" activeTab={activeTab} tabName="chat">
					<MeterChat ast={ast} />
				</TabPanel>

				<TabPanel title="Timeline" activeTab={activeTab} tabName="timeline">
					<MeterTimeline />
				</TabPanel>
			</IrepsInfoWindow>
		</div>
	);
};

export default IwMeterReport;
