import { ErrorMessage, Field } from "formik";

import "@/components/forms/Form.css";

import FormFieldError from "@/components/forms/formError/FormFieldError";

const FormikSelectTidDone = props => {
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

						form.setFieldValue("tidOperation.tidDone", e.target.value);
						form.validateField("tidOperation.tidDone");

						if (e.target.value === "no") {
							form.setFieldValue("tidBefore.tariff", "");
							form.validateField("tidBefore.tariff");

							form.setFieldValue("tidBefore.krn", "");
							form.validateField("tidBefore.krn");

							form.setFieldValue("tidAfter.tariff", "");
							form.validateField("tidAfter.tariff");

							form.setFieldValue("tidAfter.krn", "");
							form.validateField("tidAfter.krn");

							form.validateField("tidOperation.comment");
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

export default FormikSelectTidDone;
