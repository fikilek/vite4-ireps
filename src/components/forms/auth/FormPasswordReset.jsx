import { object, string } from "yup";
import { Formik, Form } from "formik";
import { CiLogin } from "react-icons/ci";
import { useEffect } from "react";
import { toast } from "react-toastify";

// css
import "@/components/forms/Form.css";

// custome hooks
import { useSignin } from "@/hooks/useSignin.jsx";
import useModal from "@/hooks/useModal.jsx";

// components
import FormikControl from "@/components/forms/formik/FormikControl";
import FormFooter from "@/components/forms/formFooter/FormFooter";
import FormMsg from "@/components/forms/formMsg/FormMsg";
import FormLinkBtn from "@/components/forms/formBtns/FormLinkBtn";
import FormError from "@/components/forms/formError/FormError";
import HeaderGeneric from "@/components/header/HeaderGeneric";
import FormCloseBtn from "../formBtns/FormCloseBtn";

const linkTo = {
	icon: <CiLogin />,
	title: "Signin/Logon",
	linkName: "signin",
};

const FormPasswordReset = props => {
	// console.log(`FormPasswordReset`, props);

	const { closeModal } = useModal();

	const { passwordReset, error, success } = useSignin();

	const initialValues = {
		email: "",
	};

	const onSubmit = values => {
		console.log(`Password Reset Form values`, values);
		passwordReset(values);
	};

	const validationSchema = object({
		email: string().email("Email is NOT valid.").required("Email is required."),
	});

	useEffect(() => {
		if (success) {
			closeModal();
			toast.success(
				`Visit inbox for the email adr and follow the instructins to reset iREPS password.`,
				{
					position: "bottom-left",
				}
			);
		}
	}, [success, closeModal]);

	return (
		<div className="form-wrapper">
			<div className="form-container password-reset">
				<Formik
					initialValues={initialValues}
					onSubmit={onSubmit}
					validationSchema={validationSchema}
				>
					{formik => {
						// console.log(`formik`, formik);
						return (
							<>
								<Form>
									<HeaderGeneric hl1="Password Reset" ><FormCloseBtn /></HeaderGeneric>
									<FormMsg msg="A password RESET email will be sent to the inbox that signup/registered with iREPS." />
									<div className="password-reset-form">
										<FormikControl
											control="input"
											type="email"
											label="Email"
											name={"email"}
											placeholder=""
											autoFocus={true}
										/>
									</div>
									{error && <FormError errorMsg={error} />}
									<FormFooter formik={formik} linkTo={linkTo} currentForm="fpw">
										<FormLinkBtn icon={<CiLogin />} title="Signin" linkName="signin" />
									</FormFooter>
								</Form>
							</>
						);
					}}
				</Formik>
			</div>
		</div>
	);
};

export default FormPasswordReset;
