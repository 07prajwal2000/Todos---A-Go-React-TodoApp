import { useState } from "react";
import { useForm } from "react-hook-form";

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

	function onLoginSubmit(data: SignupFormType) {
		console.log(data);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
	}

	return (
		<form
			onSubmit={handleSubmit(onLoginSubmit)}
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
