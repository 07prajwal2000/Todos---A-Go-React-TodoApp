import { useState } from "react";
import { useForm } from "react-hook-form";
import Toast from "../../common/Toast";
import { SignupAsync } from "../../api/auth";

type SignupFormType = {
	FirstName: string;
	LastName: string;
	Email: string;
	Password: string;
};

const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

const SignupForm = () => {
  const [loading, setLoading] = useState(false);
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<SignupFormType>();

	async function onFormSubmit(data: SignupFormType) {
    try {
			setLoading(true);
			const response = await SignupAsync(data);
			Toast.Success(response!.Message);
		} catch (e: any) {
			handleSubmitErrors(e);
		} finally {
			setLoading(false);
		}
	}

	function handleSubmitErrors(e: any) {
		if (e?.response?.status >= 500) {
			Toast.Error(e?.response?.data?.message || "Internal server error");
		} else if (e?.response?.status >= 400) {
			Toast.Error(e?.response?.data?.message || "Please check the details you filled.");
		} else {
			Toast.Error("Unknown error");
		}
	}

	return (
		<form
			onSubmit={handleSubmit(onFormSubmit)}
			className="d-flex w-100 px-4 py-4 flex-column gap-3"
		>
			<input
				placeholder="First Name"
				className="form-control"
				type="text"
				{...register("FirstName", {
					required: true,
					minLength: 2,
				})}
			/>
			<input
				placeholder="Last Name"
				className="form-control"
				type="text"
				{...register("LastName", { required: true })}
			/>
			<input
				placeholder="Email"
				className="form-control"
				type="email"
				{...register("Email", {
					required: true,
					pattern: emailRegex,
				})}
			/>
			<input
				placeholder="Password"
				className="form-control"
				type="password"
				{...register("Password", {
					required: true,
					minLength: 6,
					maxLength: 50,
				})}
			/>
			<button type="submit" className="btn btn-primary d-block w-100">
      {loading ? (
					<div
            style={{width: '20px',height: '20px'}}
						className="spinner-border text-light border-3"
					></div>
				) : (
					"Signup"
				)}
			</button>
			<ul>
				{errors.FirstName && (
					<li className="text-danger">
						A valid first name is required.
					</li>
				)}
				{errors.LastName && (
					<li className="text-danger">
						A valid last name is required.
					</li>
				)}
				{errors.Email && (
					<li className="text-danger">A valid email is required.</li>
				)}
				{errors.Password && (
					<li className="text-danger">
						A valid password is required with a length between 6-50
					</li>
				)}
			</ul>
		</form>
	);
};

export default SignupForm;
