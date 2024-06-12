import { ErrorMessage, Field } from "formik";

import "@/components/forms/Form.css";

import FormFieldError from "@/components/forms/formError/FormFieldError";

const FormikSelectMeterAccess = props => {
	// console.log(`props`, props);
	const { label, name, options, ...rest } = props;
	// console.log(`rest`, rest);

	return (
		<div className={`form-control ${name} `}>
			<Field id={name} name={name} {...rest}>
				{props => {
					// console.log(`props`, props);
					const { field, form, meta } = props;

					const handleChange = e => {
						console.log(`e.target.value`, e.target.value);
						console.log(`field.name`, field.name);

						form.setFieldValue("access.meterAccess", e.target.value);
						// form.validateField("access.meterAccess");

						if (e.target.value === "yes") {
							form.setFieldValue("access.noAccessReason", "");
							// form.validateField("access.noAccessReason");
						}
						if (e.target.value === "choose") {
							form.setFieldValue("access.noAccessReason", "choose");
							// form.validateField("access.noAccessReason");
						}
					};

					return (
						<select {...field} onChange={handleChange}>
							{options &&
								options.map(option => {
									return (
										<option key={option.key} value={option.value}>
											{option.key}
										</option>
									);
								})}
						</select>
					);
				}}
			</Field>
			<label className="label" htmlFor={name}>
				{label}
			</label>
			<ErrorMessage name={name} component={FormFieldError}></ErrorMessage>
		</div>
	);
};

export default FormikSelectMeterAccess;
