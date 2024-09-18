import {
	VerticalTimeline,
	VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FaAdjust } from "react-icons/fa";
import { MdOutlineSchool } from "react-icons/md";
import { MdStar } from "react-icons/md";
import { format } from "date-fns";
import { constants } from "@/utils/utils";

import "@/components/meterTimeline/MeterTimeline.css";

const MeterTimeline = (props) => {
	// console.log(`props`, props);
	const {
		trns: transactions,
		astMediaInfo,
		chats: chats_,
		vendingData,
	} = props;

	const chats = chats_?.map((trn) => {
		return { timelineType: "chat", ...trn };
	});

	const trns = transactions?.map((trn) => {
		return { timelineType: "trn", ...trn };
	});

	const ami = astMediaInfo?.map((ami) => {
		return { timelineType: "media", ...ami.metadata, url: ami.url, id: ami.id };
	});
	// console.log(`ami`, ami);

	let timeline = null;

	if (trns && trns?.length > 0) {
		timeline = [...trns];
	}
	if (ami && ami?.length > 0) {
		timeline = [...timeline, ...ami];
	}
	if (chats && chats?.length > 0) {
		timeline = [...timeline, ...chats];
	}
	if (vendingData && vendingData?.length > 0) {
		timeline = [...timeline, ...vendingData];
	}

	// [...trns, ...ami, ...chats, ...vendingData];
	// console.log(`timeline BEFORE`, timeline);

	timeline?.sort(
		(a, b) =>
			b?.updatedAtDatetime?.toMillis() - a?.updatedAtDatetime?.toMillis()
	);
	// console.log(`timeline AFTER`, timeline);

	return (
		<div className="meter-timeline">
			<VerticalTimeline>
				{timeline?.map((item, index) => {
					if (item.timelineType === "chat") {
						// console.log(`chat item`, item)
						return (
							<VerticalTimelineElement
								key={index}
								className="vertical-timeline-element--work"
								contentStyle={{
									background: "rgb(33, 150, 243)",
									color: "#fff",
								}}
								contentArrowStyle={{
									borderRight: "7px solid  rgb(33, 150, 243)",
								}}
								date={format(
									item.updatedAtDatetime?.toDate(),
									constants?.dateFormat2
								)}
								// date={item.updatedAtDatetime.toString()}
								iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
								icon={<FaAdjust />}
							>
								<p>Chat</p>
							</VerticalTimelineElement>
						);
					}

					if (item.timelineType === "trn") {
						// console.log(`trn item`, item)
						return (
							<VerticalTimelineElement
								key={index}
								className="vertical-timeline-element--work"
								contentStyle={{
									background: "rgb(33, 150, 243)",
									color: "#fff",
								}}
								contentArrowStyle={{
									borderRight: "7px solid  rgb(33, 150, 243)",
								}}
								date={format(
									item.updatedAtDatetime?.toDate(),
									constants?.dateFormat2
								)}
								// date={item.updatedAtDatetime.toString()}
								iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
								icon={<FaAdjust />}
							>
								<p>Trn</p>
							</VerticalTimelineElement>
						);
					}
					if (item.timelineType === "media") {
						// console.log(`media item`, item)
						return (
							<VerticalTimelineElement
								key={index}
								className="vertical-timeline-element--work"
								contentStyle={{
									background: "rgb(33, 150, 243)",
									color: "#fff",
								}}
								contentArrowStyle={{
									borderRight: "7px solid  rgb(33, 150, 243)",
								}}
								date={format(
									item.updatedAtDatetime?.toDate(),
									constants?.dateFormat2
								)}
								// date={item.updatedAtDatetime.toString()}
								iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
								icon={<FaAdjust />}
							>
								<p>Media</p>
							</VerticalTimelineElement>
						);
					}
					if (item.timelineType === "vending") {
						// console.log(`media item`, item)
						return (
							<VerticalTimelineElement
								key={index}
								className="vertical-timeline-element--work"
								contentStyle={{
									background: "rgb(33, 150, 243)",
									color: "#fff",
								}}
								contentArrowStyle={{
									borderRight: "7px solid  rgb(33, 150, 243)",
								}}
								date={format(
									item.updatedAtDatetime?.toDate(),
									constants?.dateFormat2
								)}
								// date={item.updatedAtDatetime.toString()}
								iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
								icon={<FaAdjust />}
							>
								<p>Vending</p>
							</VerticalTimelineElement>
						);
					}
				})}
			</VerticalTimeline>
		</div>
	);
};

export default MeterTimeline;
