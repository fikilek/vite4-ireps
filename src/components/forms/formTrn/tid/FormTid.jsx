import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import { useCallback } from "react";

// css
import "@/components/forms/formTrn/tid/FormTid.css";

// custom hooks
import useModal from "@/hooks/useModal.jsx";
import { useLocalStorage } from "@/hooks/useLocalStorage.jsx";
import { useFirestore } from "@/hooks/useFirestore.jsx";

// components
import FormikControl from "@/components/forms/formik/FormikControl";
import FormSection from "@/components/forms/formSection/FormSection";
import { formSelectOptions } from "@/utils/utils";
import FormFooter from "@/components/forms/formFooter/FormFooter";
import HeaderGeneric from "@/components/header/HeaderGeneric";
import MediaMobileWrapper from "@/components/media/MediaMobileWrapper";
import FormCloseBtn from "@/components/forms/formBtns/FormCloseBtn";

const FormTid = props => {
	// console.log(`props`, props);

	const { data, validationSchema } = props?.data;
	// console.log(`data`, data);

	const { astNo, astId } = data.astData;

	// destructure trn id
	const { trnId } = data.metadata;
	// console.log(`trnId`, trnId);

	const [formState, setFormState] = useState(null);
	// console.log(`formState`, formState);

	const [formData, setFormData] = useState(null);
	// console.log(`formData`, formData);

	const key = `${astId}_${astNo}`;
	const { setItem, getItem, deleteItem } = useLocalStorage(`${astId}_${astNo}`);

	useEffect(() => {
		const existingTrn = getItem(key);
		// console.log(`existingTrn`, existingTrn);
		if (existingTrn) {
			setFormData(existingTrn);
		} else {
			setFormData(data);
		}
		return () => setFormData(null);
	}, []);

	useState(() => {
		setFormState(data.metadata.trnState);
		return () => setFormState(null);
	}, []);

	const { closeModal } = useModal();

	const [active, setActive] = useState(null);

	const { response, setDocument } = useFirestore("trns");
	// console.log(`response`, response)

	const onSubmit = useCallback(
		values => {
			// console.log(`values`, values);
			setDocument(
				{
					...values,
					metadata: {
						...values.metadata,
						trnState: formState,
					},
				},
				values.metadata.trnId
			);
		},
		[setDocument]
	);

	useEffect(() => {
		// console.log(`response`, response);
		if (response.success) {
			deleteItem(key);
			closeModal();
			toast(`Transaction UPDATED succesfully!`, {
				position: "bottom-left",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		}
	}, [response]);

	const handleChange = formik => {
		let state = formik.values.metadata.trnState;
		if (formik.values.access.meterAccess === "no") {
			state = "N/A";
		}
		if (
			formik.isValid &&
			formik.dirty &&
			formik.values.access.meterAccess === "yes"
		) {
			state = "valid";
		}

		setFormState(state);
		// submitted form must not be saved to useLocalStorage
		if (formik.values.metadata.trnState !== "submitted") {
			setItem(formik.values);
		}
	};

	return formData ? (
		<div className="form-wrapper">
			<div className="form-container trn form-meter-tid">
				<Formik
					initialValues={{
						...formData,
					}}
					onSubmit={onSubmit}
					validationSchema={validationSchema}
				>
					{formik => {
						// const disabled = !(formik.isValid && formik.dirty);
						// console.log(`formik.errors`, formik.errors);
						// console.log(`formik.isValid`, formik.isValid);
						// console.log(`disabled`, disabled);
						// console.log(`formik.values.access.meterAccess`, formik.values.access.meterAccess);

						return (
							<Form onChange={handleChange(formik)}>
								<div className="trn-form">
									<HeaderGeneric
										hl1={"Tid Form"}
										hl2={<span className="text-emphasis2">{formState}</span>}
										hr1={
											<span>
												Meter:
												<span className="text-emphasis2">
													{formik.values.astData.astNo}
												</span>
											</span>
										}
									>
										<FormCloseBtn />
									</HeaderGeneric>

									{/* meter access */}
									<FormSection
										sectionData={{
											sectionName: "access",
											formik: formik,
										}}
										active={active}
										setActive={setActive}
									>
										<div className="form-row-wrapper">
											<div className="row-0 form-row">
												<FormikControl
													control="selectMeterAccess"
													type="text"
													label="was there access to the meter?"
													name={`access.meterAccess`}
													options={formSelectOptions.yesNoOptions}
												/>
												<FormikControl
													control="select"
													type="text"
													label="meter no accss reasons"
													name={`access.noAccessReason`}
													options={formSelectOptions.keyPadNoAccessOptions}
												/>
											</div>
											<div className="row-0 form-row">
												<FormikControl
													control="mediaButton"
													type="button"
													label="no access media"
													name={`astData.media.noAccess`}
													ml1="asts"
													mediaCat="noAcces"
												/>
											</div>
										</div>
									</FormSection>

									{/* tid operation */}
									<FormSection
										sectionData={{
											sectionName: "tidOperation",
											formik: formik,
										}}
										active={active}
										setActive={setActive}
									>
										<div className="form-row-wrapper">
											<div className="row-1 form-row">
												<div className="row-50-50">
													<FormikControl
														control="selectTidDone"
														type="text"
														label="tid done?"
														name={`tidOperation.tidDone`}
														options={formSelectOptions.yesNoOptions}
													/>
													<FormikControl
														control="mediaButton"
														type="button"
														label="tid media"
														name={`media.tid`}
														ml1="asts"
													/>
												</div>
												<div>
													<FormikControl
														control="select"
														type="text"
														label="tid comment"
														name={`tidOperation.comment`}
														options={formSelectOptions.tidCommentsOptions}
													/>
												</div>
											</div>
										</div>
									</FormSection>

									{/* tid  before and after */}
									<FormSection
										sectionData={{
											sectionName: "beforeAndAfter",
											formik: formik,
										}}
										active={active}
										setActive={setActive}
									>
										<div className="form-row-wrapper">
											<div className="row-2 form-row">
												{/* tid before */}
												<div className="row-50-50">
													<FormikControl
														control="select"
														type="text"
														label="tariff Before"
														name={`tidBefore.tariff`}
														options={formSelectOptions.tariffOptions}
													/>
													<FormikControl
														control="select"
														type="text"
														label="krn Before"
														name={`tidBefore.krn`}
														options={formSelectOptions.krnOptions}
													/>
												</div>

												{/* tid after */}
												<div className="row-50-50">
													<FormikControl
														control="select"
														type="text"
														label="tariff After"
														name={`tidAfter.tariff`}
														options={formSelectOptions.tariffOptions}
													/>
													<FormikControl
														control="select"
														type="text"
														label="krn After"
														name={`tidAfter.krn`}
														options={formSelectOptions.krnOptions}
													/>
												</div>
											</div>
										</div>
									</FormSection>

									{formik.values.metadata.trnState === "submitted" ? (
										""
									) : (
										<FormFooter formik={formik} signState={response} />
									)}
								</div>
							</Form>
						);
					}}
				</Formik>
				<MediaMobileWrapper
					data={{
						...props.data,
						irepsKeyItem: "trns",
						displayMode: "popup",
						trnId,
					}}
				/>
			</div>
		</div>
	) : (
		<p>wait</p>
	);
};
export default FormTid;
