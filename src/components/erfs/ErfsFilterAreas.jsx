// 
import { flattenTree } from "react-accessible-treeview";

// css
import "@/components/erfs/ErfsFilterAreas.css";

// components
import { tree } from "@/pages/administrativeAreas/AdministrativeAreas";
import TreeAdministrativeAreas from "@/components/trees/TreeAdministrativeAreas";

const ErfsFilterAreas = () => {
	const flattenedTree = flattenTree(tree);
	// console.log(`flattenedTree`, flattenedTree);
	return (
		<div className="erfs-filter-areas">
			<TreeAdministrativeAreas tree={flattenedTree} />
		</div>
	);
};

export default ErfsFilterAreas;
