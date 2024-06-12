import "@/components/header/HeaderGeneric1.css";

const HeaderGeneric1 = props => {
	const { hl1, hr1, opacity, position, children } = props;

	return (
		<div
			className="header-generic1"
			style={{ opacity: opacity, position: position }}
		>
			<div>{hl1}</div>
			<div>{hr1}</div>
			{children}
		</div>
	);
};

export default HeaderGeneric1;
