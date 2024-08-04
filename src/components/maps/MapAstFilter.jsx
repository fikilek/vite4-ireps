// npm libraries
import { useContext, useMemo } from "react";
import Select from "react-select";

// css
import "@/components/maps/MapAstFilter.css";

// hooks
import { useMap, MapControl, ControlPosition } from "@vis.gl/react-google-maps";

// contexts
import { AstsContext } from "@/contexts/AstsContext";

const MapAstFilter = () => {
	// console.log(`MapAstFilter`)

	const map = useMap();
	// console.log(`map`, map);

	const { astsContext } = useContext(AstsContext);
	// console.log(`astsContext`, astsContext);
	
	// const {asts} = astsContext
	const asts = useMemo(()=>{
		return astsContext?.asts
	},[astsContext])
	// console.log(`asts`, asts);
	
	const options = asts && asts.map(ast => {
		return {
			value: ast.astData.astNo,
			label: ast.astData.astNo,
			data: ast
		}
	})
	// console.log(`options`, options);

	const setSelectedOption = (selection) => {
		console.log(`selection`, selection);
		if(!map) return
		if(!selection) return
		map.panTo({
			lat: Number(selection.data?.location?.gps?.lat),
			lng: Number(selection.data?.location?.gps?.lng),
		});
		map.setZoom(20);
	};

	const clearValue = (e) => {
		console.log(`clearing selected value`, e);
		return null;
	};

	return (
		<MapControl
			position={ControlPosition.TOP_LEFT}
			style={{ margin: "1.6rem" }}
		>
			<div className="map-ast-filter">
			<Select
				defaultValue={"Meter No"}
				options={options}
				isClearable={true}
				onChange={setSelectedOption}
				clearValue={clearValue}
			/>
			</div>
		</MapControl>
	);
};

export default MapAstFilter;
