
// css
// import "./ErfsFiltersBody.css";

// components
import ErfsFilterAreas from "@/components/erfs/ErfsFilterAreas";
import ErfsFilterData from "@/components/erfs/ErfsFilterData";

const ErfsFiltersBody = props => {
	const { filter } = props;
	return (
		<div className="erfs-filters-body">
			{filter === "data" && <ErfsFilterData />}
			{filter === "areas" && <ErfsFilterAreas />}
		</div>
	);
};

export default ErfsFiltersBody;
