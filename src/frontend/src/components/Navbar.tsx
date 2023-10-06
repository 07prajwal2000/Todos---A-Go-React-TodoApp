import { Link } from "react-router-dom";
import { NavPageRoutes } from "../common/Constants";
import { Bars2Icon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import useGlobalStore, { NavbarTypes } from "../store/global";
import AccountButton from "./AccountMenu";

const Navbar = () => {
	const [opened, setOpened] = useState(false);
	const { LoggedIn, NavbarType } = useGlobalStore();

	function onHamburgerClick() {
		setOpened((p) => !p);
	}

	function closeNavbar() {
		setOpened(false);
	}

	function DefaultNavbar() {
		return <div className="col-lg-3 col-md-3 d-flex flex-row justify-content-around align-items-center">
		{NavPageRoutes.map((x) => (
			<Link
				key={x.name}
				to={x.url}
				style={{ cursor: "pointer" }}
				className="fs-5 text-decoration-none text-dark c-nav-item py-1 px-3 rounded-2"
			>
				{x.name}
			</Link>
		))}
	</div>
	}

	function AccountNavbar() {
		return <div className="col-1 col-lg-4"></div>
	}

	return (
		<div className="container-fluid py-2 bg-white shadow shadow-lg">
			{/* PC navbar */}
			<div className="row justify-content-center align-items-center d-md-flex d-none">
				<Link
					className="col-lg-2 col-md-3 text-decoration-none text-dark"
					to={LoggedIn ? '/account' : "/"}
				>
					<h3 className="user-select-none fw-bold fst-italic">
						Todo App
					</h3>
				</Link>
				{
					NavbarType == NavbarTypes.Default ? <DefaultNavbar /> : <AccountNavbar />
				}
				<div className="col-lg-3 col-md-2"></div>
				{LoggedIn && <AccountButton />}
				{!LoggedIn && (
					<div className="col-2 d-flex flex-row gap-2">
						<Link
							to={"/auth"}
							className="btn c-nav-item"
							style={{ fontWeight: "700", fontSize: "1.15rem" }}
						>
							Login
						</Link>
						<Link
							to={"/auth?type=signup"}
							className="btn btn-primary fw-bold"
							style={{ fontSize: "1rem" }}
						>
							Signup
						</Link>
					</div>
				)}
			</div>
			{/* Mobile navbar */}
			<div className="row mx-2 z-3 gap-2 justify-content-around d-md-none align-items-center">
				<Link
					onClick={closeNavbar}
					className="col-6 text-decoration-none text-dark"
					to={"/"}
				>
					<h3 className="user-select-none fw-bold fst-italic">
						Todo App
					</h3>
				</Link>
				<div className="col-1"></div>
				<Link
					onClick={closeNavbar}
					to={"/auth"}
					className="col-2 fw-bold btn text-center border"
				>
					Login
				</Link>
				<button
					onClick={onHamburgerClick}
					style={{ maxHeight: "40px", maxWidth: '60px' }}
					className="btn col-2 c-nav-item d-flex justify-content-center align-items-center"
				>
					{opened ? (
						<XMarkIcon
							style={{ maxHeight: "30px", maxWidth: "40px" }}
						/>
					) : (
						<Bars2Icon
							style={{ maxHeight: "30px", maxWidth: "40px" }}
						/>
					)}
				</button>
				{opened && (
					<div
						style={{ top: "55px" }}
						className="position-fixed z-2 bottom-0 start-0 end-0 border-2 border z-3  bg-white h-100"
					>
						<div className="d-flex flex-column gap-3 mt-4">
							{NavPageRoutes.map((x) => (
								<Link
									onClick={closeNavbar}
									to={x.url}
									key={x.name}
									className="text-center text-decoration-none text-dark"
								>
									<h3>{x.name}</h3>
								</Link>
							))}
						</div>
						<Link
							to={"/auth?type=signup"}
							onClick={closeNavbar}
							className="btn btn-primary w-100 fw-bold fs-5 mt-5 d-block"
						>
							Signup
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default Navbar;
