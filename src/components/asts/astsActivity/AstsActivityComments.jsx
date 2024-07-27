// css
import "@/components/asts/astsActivity/AstsActivityComments.css";

const AstsActivityComments = (props) => {
	console.log(`props`, props);

	const { ast } = props;
	return <div className="ast-activity-trns">Meter Comments</div>;
};

export default AstsActivityComments;
