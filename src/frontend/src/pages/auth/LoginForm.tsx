import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginAsync } from "../../api/auth";
import Toast from "../../common/Toast";
import { LoginResponse } from "../../types/auth";
import useGlobalStore from "../../store/global";
import { useNavigate } from "react-router-dom";

type LoginFormType = {
	Email: string;
	Password: string;
	RememberMe: boolean;
};

const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

const LoginForm = () => {
	const [loading, setLoading] = useState(false);
	const nav = useNavigate();
	const { SetTokens, SetLoggedIn } = useGlobalStore();
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<LoginFormType>();

	async function onFormSubmit(data: LoginFormType) {
		try {
			setLoading(true);
			const response = await LoginAsync(data);
			console.log(response);
      handleLoginSuccess(response!);
		} catch (e: any) {
			console.log(e);
      if (e?.response?.status >= 400 && e?.response?.status <= 499) Toast.Error(e?.response?.data?.message || "Failed to login. Please check your details.");
      else Toast.Error("Server error. Please try again later.");
		} finally {
			setLoading(false);
		}
	}

	function handleLoginSuccess(response: LoginResponse) {
		Toast.Success("Logged in successfully");
		SetTokens(response.AccessToken, response.RefreshToken);
		SetLoggedIn(true);
		nav("/account");
	}

	return (
		<form
			onSubmit={handleSubmit(onFormSubmit)}
			className="d-flex w-100 px-4 py-4 flex-column gap-3"
		>
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
			<label htmlFor="remember">
				<input
					id="remember"
					className="form-check-input"
					style={{ width: "20px", height: "20px" }}
					type="checkbox"
					{...register("RememberMe")}
				/>
				<p className="d-inline fs-5 mx-2">Remember Me?</p>
			</label>
			<button
				disabled={loading}
				type="submit"
				className="btn btn-primary d-block w-100"
			>
				{loading ? (
					<div
						style={{ width: "20px", height: "20px" }}
						className="spinner-border text-light border-3"
					></div>
				) : (
					"Login"
				)}
			</button>
			<ul>
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

export default LoginForm;
