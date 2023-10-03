import { Link } from "react-router-dom";
import { NavPageRoutes } from "../common/Constants";
import { Bars2Icon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import useGlobalStore from "../store/global";

const Navbar = () => {
	const [opened, setOpened] = useState(false);
	const [profileOpened, setProfileOpened] = useState(false);
	const { LoggedIn, Profile } = useGlobalStore();

	function onHamburgerClick() {
		setOpened((p) => !p);
	}

	function closeNavbar() {
		setOpened(false);
	}

	function AccountButton() {
		return <div className="col-2">
			<div className="d-flex position-relative justify-content-center align-items-center cursor-pointer float-end rounded-circle" style={{height: '50px', width: '50px'}}>
				<img onClick={() => setProfileOpened(p => !p)} width={'50px'} src={`https://ui-avatars.com/api/?background=5452ff&name=${Profile?.FirstName}&rounded=true&bold=true&color=ffff`} alt={Profile?.FirstName} />
				{profileOpened && <div className="position-absolute mt-2 top-100 bg-white shadow shadow-lg p-4 border border-2 rounded-2">
					<h2>Menu</h2>
				</div>}
			</div>
		</div>
	}
	
	return (
		<div className="container-fluid py-2 shadow shadow-lg mb-4">
			{/* PC navbar */}
			<div className="row justify-content-center align-items-center d-md-flex d-none">
				<Link
					className="col-lg-2 col-md-3 text-decoration-none text-dark"
					to={"/"}
				>
					<h3 className="user-select-none fw-bold fst-italic">
						Todo App
					</h3>
				</Link>
				<div className="col-lg-3 col-md-3 d-flex flex-row justify-content-around align-items-center">
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
				<div className="col-lg-3 col-md-2"></div>
				{
					LoggedIn && <AccountButton />
				}
				{!LoggedIn && <div className="col-2 d-flex flex-row gap-2">
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
				</div>}
			</div>
			{/* Mobile navbar */}
			<div className="row mx-2 z-3 gap-2 justify-content-around d-md-none align-items-center">
				<Link onClick={closeNavbar} className="col-3 text-decoration-none text-dark" to={"/"}>
					<h3 className="user-select-none fw-bold fst-italic">
						Todo App
					</h3>
				</Link>
				<div className="col-6"></div>
				<Link onClick={closeNavbar} to={"/auth"} className="col-1 fw-bold btn text-center">
					Login
				</Link>
				<button
					onClick={onHamburgerClick}
					className="btn col-1 c-nav-item"
				>
					{opened ? <XMarkIcon /> : <Bars2Icon />}
				</button>
					{opened && (
						<div style={{top: '55px'}} className="position-absolute z-2 bottom-0 start-0 end-0 border-2 border bg-white">
							<div className="d-flex flex-column gap-3 mt-4">
              {NavPageRoutes.map(x => (
                <Link onClick={closeNavbar} to={x.url} key={x.name} className="text-center text-decoration-none text-dark">
                  <h3>{x.name}</h3>
                </Link>
              ))}
              </div>
              <Link to={"/auth?type=signup"} onClick={closeNavbar} className="btn btn-primary w-100 fw-bold fs-5 mt-5 d-block">Signup</Link>
						</div>
					)}
			</div>
		</div>
	);
};

export default Navbar;
