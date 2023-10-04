import { useEffect, useRef, useState } from "react";
import useGlobalStore from "../store/global";
import { Link, useNavigate } from "react-router-dom";
import {
	ArrowLeftOnRectangleIcon,
	Cog6ToothIcon,
	IdentificationIcon,
	UserCircleIcon,
} from "@heroicons/react/20/solid";
import Toast from "../common/Toast";

function AccountButton() {
	const { Profile, Logout } = useGlobalStore();
	const nav = useNavigate();
	const [profileOpened, setProfileOpened] = useState(false);
	const profileBtnRef = useRef<HTMLImageElement | null>(null);
	const menuRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const windowClick = (e: any) => {
			if (
				e.target !== menuRef.current &&
				e.target !== profileBtnRef.current &&
				!menuRef.current?.contains(e.target)
			) {
				closeMenu();
			}
		};
		window.addEventListener("click", windowClick);
		return () => window.removeEventListener("click", windowClick);
	}, []);

	function closeMenu() {
		setProfileOpened(false);
	}

	function logoutBtnClicked() {
		closeMenu();
		Logout();
		Toast.Default("Logged out successfully");
		nav("/auth");
	}

	return (
		<div className="col-2">
			<div
				className="d-flex position-relative justify-content-center align-items-center float-end rounded-circle"
				style={{ height: "50px", width: "50px" }}
			>
				{Profile ? (
					<img
						ref={profileBtnRef}
						onClick={() => setProfileOpened((p) => !p)}
						width={"50px"}
						className="cursor-pointer"
						src={`https://ui-avatars.com/api/?background=5452ff&name=${Profile?.FirstName}&rounded=true&bold=true&color=ffff`}
						alt={Profile?.FirstName}
					/>
				) : (
					<div
						style={{ width: "50px", height: "50px" }}
						className="placeholder-glow"
					>
						<div className="placeholder" />{" "}
					</div>
				)}
				{profileOpened && (
					<div
						ref={menuRef}
						className="position-absolute mt-2 top-100 bg-white shadow shadow-lg px-2 py-3 border gap-2 border-2 rounded-2 row"
						style={{
							width: "220px",
							overflow: "hidden",
						}}
					>
						<p
							className="col-12 fw-bold text-capitalize mb-1 text-center text-primary-emphasis"
							style={{ fontSize: ".85rem" }}
						>
							{Profile?.FirstName}&nbsp;{Profile?.LastName}
						</p>
						<p
							className="col-12 mb-1 text-center text-primary-emphasis"
							style={{ fontSize: ".8rem" }}
						>
							{Profile?.Email}
						</p>
						<hr className="my-0" />
						<div
							className="col-12 row justify-content-center mx-auto"
							style={{ maxWidth: "180px" }}
						>
							<Link
								onClick={closeMenu}
								to={"/account"}
								className="btn d-flex justify-content-around text-primary-emphasis c-nav-item col-12"
							>
								<UserCircleIcon style={{ width: "22px" }} />{" "}
								<span>Account</span>
							</Link>
							<Link
								onClick={closeMenu}
								to={"/account/profile"}
								className="btn d-flex justify-content-around text-primary-emphasis c-nav-item col-12"
							>
								<IdentificationIcon style={{ width: "22px" }} />{" "}
								<span>Profile</span>
							</Link>
							<Link
								onClick={closeMenu}
								to={"/account/settings"}
								className="btn d-flex justify-content-around text-primary-emphasis c-nav-item col-12"
							>
								<Cog6ToothIcon style={{ width: "22px" }} />{" "}
								<span>Settings</span>
							</Link>
							<button
								onClick={logoutBtnClicked}
								className="col-12 btn d-flex mt-2 justify-content-around btn-outline-danger"
							>
								<ArrowLeftOnRectangleIcon
									style={{ width: "22px" }}
								/>{" "}
								<span>Logout</span>
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default AccountButton;
