// css
import "@/components/forms/formTrn/inspection/FormMeterInspection.css";

// components
import HeaderGeneric from "@/components/header/HeaderGeneric";
import FormCloseBtn from "@/components/forms/formBtns/FormCloseBtn";

const FormMeterInspection = () => {
	return (
		<div className="form-wrapper">
			<div className="form-container trn form-meter-inspection">
				<HeaderGeneric
					hl1={"Meter Inspection Form"}
					hl2={<span className="text-emphasis2"></span>}
					hr1={<p></p>}
				>
					<FormCloseBtn />
				</HeaderGeneric>
				<div className="form-body-temp">
					<p>Coming Soon</p>
				</div>
			</div>
		</div>
	);
};

export default FormMeterInspection;
