import { Link, useSearchParams } from "react-router-dom";
import LoginForm from "../../components/LoginForm";
import SignupForm from "../../components/SignupForm";

const Auth = () => {
	const [query, _] = useSearchParams();
	const type = query.get("type");
	const isSignup = type == "signup";

	return (
		<div>
			<div className="h-75 p-2 d-flex align-items-center flex-column mx-auto responsive-form">
				<div className="mx-auto d-flex flex-row justify-content-center align-items-center border border-2 px-2 py-1 border-dark-subtle rounded-2 gap-2">
					<Link
						to={"/auth"}
						style={{ fontSize: "1.05rem" }}
						className={`btn fw-bold ${!isSignup && "btn-primary"}`}
					>
						Login
					</Link>
					<Link
						to={"?type=signup"}
						style={{ fontSize: "1.05rem" }}
						className={`btn fw-bold ${isSignup && "btn-primary"}`}
					>
						Signup
					</Link>
				</div>

				{isSignup ? <SignupForm /> : <LoginForm />}
        <hr className="w-100" style={{height: '1px'}} />
        <div className="rounded-2 p-2">
          <h5>Continue with</h5>
          <div className="d-flex flex-row cursor-pointer justify-content-center align-items-center">
            <img className="social-btn" src="/google.png" alt="" />
          </div>
        </div>
			</div>
		</div>
	);
};

export default Auth;
