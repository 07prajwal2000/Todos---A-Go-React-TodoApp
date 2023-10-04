import { useState } from "react";
import useGlobalStore from "../../store/global";
import { GetPaymentTypeName } from "../../types/auth";
import { CurrencyDollarIcon } from "@heroicons/react/20/solid";

const LoadingForm = () => {
	return (
		<div className="container-fluid">
      <h2 className="fw-bold text-center pt-2 fs-1 text-uppercase">
					Profile
				</h2>
        <hr />
			<div className="row justify-content-around placeholder-glow">
        <div className="col-4 placeholder rounded-2" style={{height: '250px'}}></div>
        <div className="col-6 d-flex px-5 flex-column gap-4 placeholder-wave">
          <div className="placeholder h-25 rounded-2"></div>
          <div className="placeholder h-25 rounded-2"></div>
          <div className="placeholder h-25 rounded-2"></div>
        </div>
        <div className="col-12 px-5 gap-3 justify-content-around row placeholder-glow my-4">
          <div className="col-5 placeholder rounded-2" style={{height: '150px'}}></div>
          <div className="col-5 placeholder rounded-2" style={{height: '150px'}}></div>
        </div>
      </div>
		</div>
	);
};

const Profile = () => {
	const { Profile: profile } = useGlobalStore();
	const [fname, setFname] = useState(profile?.FirstName || "");
	const [lname, setLname] = useState(profile?.LastName || "");

	if (!profile) {
		return <LoadingForm />;
	}
	const { FirstName, LastName, Email, CreatedAt, PaymentType, Verified } =
		profile;

  function saveChanges() {
    
  }

	return (
		<>
			<div className="container-fluid">
				<h2 className="fw-bold text-center pt-2 fs-1 text-uppercase">
					Profile
				</h2>
				<hr />
				<div className="row px-5 justify-content-between">
					<div className="col-12 row justify-content-around">
						<img
							className="h-75 col-3"
							src={`https://ui-avatars.com/api/?background=5452ff&name=${FirstName}&bold=true&color=ffff`}
						/>
						<div className="col-6">
							<div className="form-group py-2">
								<label htmlFor="email" className="my-1">
									Email
								</label>
								<input
									type="text"
									placeholder="Email"
									value={Email}
									readOnly
									disabled
									className="form-control"
									id="email"
								/>
							</div>

							<div className="form-group py-2">
								<label htmlFor="fname" className="my-1">
									First Name
								</label>
								<input
									onChange={(e) => setFname(e.target.value)}
									type="text"
									placeholder="Your First name"
									defaultValue={FirstName}
									className="form-control"
									id="fname"
								/>
							</div>

							<div className="form-group py-2">
								<label htmlFor="lname" className="my-1">
									Last Name
								</label>
								<input
									onChange={(e) => setLname(e.target.value)}
									type="text"
									placeholder="Your last name"
									defaultValue={LastName}
									className="form-control"
									id="lname"
								/>
							</div>
						</div>
					</div>
					<div className="col-12 mb-2 row justify-content-around">
						{/* BUTTONS */}
						<div className="col-5">
							<div className="row border justify-content-center py-2 align-items-center flex-row">
								<h4 className="col-12 text-center">
									Subscription Type{" "}
								</h4>
								<hr />
								<h5 className="my-auto fw-bold col-4 p-3 bg-success-subtle text-center rounded-2 mx-2">
									<CurrencyDollarIcon
										style={{ marginBottom: "2spx" }}
										width={"22px"}
									/>{" "}
									{GetPaymentTypeName(PaymentType)}
								</h5>
								<h5 className="my-auto cursor-pointer c-nav-item fw-bold col-4 p-3 bg-info-subtle text-center rounded-2 mx-2">
									Change Plan
								</h5>
							</div>
							<button onClick={saveChanges} className="text-uppercase btn btn-primary w-100 my-2 mx-auto">
								save changes
							</button>
						</div>
						<div className="col-6">
							<div className="form-group py-2">
								<label htmlFor="joinedAt" className="my-1">
									Joined At
								</label>
								<input
									type="text"
									placeholder="joinedAt"
									value={new Date(
										CreatedAt * 1000
									).toUTCString()}
									readOnly
									disabled
									className="form-control"
									id="joinedAt"
								/>
							</div>

							<div className="form-group pt-1 d-flex flex-row align-items-center gap-3">
								<label htmlFor="verified" className="my-1">
									Verified
								</label>
								<input
									type="checkbox"
									style={{ width: "20px", height: "20px" }}
									placeholder="Verified"
									checked={Verified}
									readOnly
									disabled
									className="form-check-input"
									id="verified"
								/>
							</div>
							<div className="form-group py-2">
								<label htmlFor="joinedAt" className="my-1">
									Joined At
								</label>
								<input
									type="text"
									placeholder="joinedAt"
									value={new Date(
										CreatedAt * 1000
									).toUTCString()}
									readOnly
									disabled
									className="form-control"
									id="joinedAt"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Profile;
