import { useContext } from "react";
import { IconContext } from "react-icons";
import { MdArrowLeft } from "react-icons/md";
import { IoMdArrowDropright } from "react-icons/io";

import "@/components/filters/FilterBtn.css";

import { ErfsContext } from "@/contexts/ErfsContext";

const FilterBtn = () => {
	const { erfsContext, setErfsContext } = useContext(ErfsContext);

	const handleClick = e => {
		setErfsContext(prev => ({
			...prev,
			filterBtn: !prev.filterBtn,
		}));
	};
	return (
		<div className="filter-btn">
			<button className="flt-btn" onClick={handleClick}>
				{erfsContext.filterBtn ? (
					<IconContext.Provider value={{ color: "blue", size: "2rem" }}>
						<MdArrowLeft />
					</IconContext.Provider>
				) : (
					<IconContext.Provider value={{ color: "green", size: "2rem" }}>
						<IoMdArrowDropright />
					</IconContext.Provider>
				)}
			</button>
		</div>
	);
};

export default FilterBtn;
