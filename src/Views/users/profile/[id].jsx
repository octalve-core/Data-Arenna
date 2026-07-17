import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Container } from "reactstrap";
import { GlobalState } from "../../../Data/Context";
import user from "../../../Assets/avatar3.png";
import { Buttons } from "../../../Utils";
import { ModalComponents } from "../../../Components";

const UserProfile = () => {
	const {
			users,
			numberWithCommas,
			setStateName,
			nairaSign,
			manageUserActiveness,
		} = useContext(GlobalState),
		[state, setState] = useState(null),
		[loading, setLoading] = useState(""),
		[data, setData] = useState({
			email: state?.email,
			telephone: state?.telephone,
		}),
		params = useParams(),
		[getSearch] = useSearchParams(),
		[isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		setStateName(
			`${
				getSearch?.get("name")
					? getSearch?.get("name")?.split("_")?.join(" ")
					: ""
			}'s profile`
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		users?.all_users?.map(item => item?._id === params?.step && setState(item));
	}, [users?.all_users, params?.step]);

	if (!state) return;

	return (
		<div className="py-4 bg-white aboutScreen">
			<Container className="py-5">
				<div className="px-md-4 px-2 mb-5 col-lg-10">
					<div className="row mx-0 g-3 g-md-4">
						<div className="col-md order-2 order-md-1">
							<p>
								Contact:{" "}
								<strong>
									<a
										className="text-dark text-decoration-none"
										href={`tel:${state?.telephone}`}>
										{state?.telephone}
									</a>
								</strong>{" "}
							</p>
							<p>
								Email:{" "}
								<strong>
									<a
										className="text-dark text-decoration-none"
										href={`mailto:${state?.email}`}>
										{state?.email}
									</a>
								</strong>{" "}
							</p>
							<p>
								Joined since{" "}
								<strong>
									{moment(state?.createdAt).format("Do, MMMM YYYY")}
								</strong>{" "}
							</p>
						</div>
						<div className="col-md order-3 order-md-2">
							<p className="text-capitalize">
								Type: <strong>{state?.privilege}</strong>{" "}
							</p>
							<p>
								Wallet ID: <strong>{state?.wallet?.wallet_id}</strong>{" "}
							</p>
							<p>
								Status:{" "}
								<strong className="text-capitalize">{state?.statusText}</strong>{" "}
							</p>
						</div>
						<div className="col-md order-1 order-md-3">
							<img
								src={state?.avatar?.url ? state?.avatar?.url : user}
								alt={`img`}
								style={{
									height: "10rem",
									width: "10rem",
									objectFit: "cover",
									objectPosition: "center 15%",
								}}
								className="rounded-circle img-fluid mx-auto d-block"
							/>
							<div className="my-1">
								<h5 className="Lexend text-center">
									{state?.firstName} {state?.lastName}
								</h5>
							</div>
						</div>
					</div>
					<div className="row g-3 py-4 mx-0 align-items-center">
						<div className="col-6 col-lg-3 px-2">
							<Buttons
								loading={loading === "password"}
								onClick={async e => {
									e.preventDefault();
									setLoading("password");
									await manageUserActiveness(
										state._id,
										"password",
										null,
										null,
										data
									);
									setLoading("");
								}}
								width="auto"
								css="btn-primary1 text-capitalize py-3 px-md-5"
								title={"reset password"}
							/>
						</div>
						<div className="col-6 col-lg-3 px-2">
							<Buttons
								loading={loading === "wallet"}
								onClick={async e => {
									e.preventDefault();
									setLoading("wallet");
									await manageUserActiveness(
										state._id,
										"wallet",
										null,
										null,
										data
									);
									setLoading("");
								}}
								width="auto"
								css="btn-primary1 text-capitalize py-3 px-md-5"
								title={"reset wallet pin"}
							/>
						</div>
						<div className="col-6 col-lg-3 px-2">
							<Buttons
								loading={loading === "login"}
								onClick={async e => {
									e.preventDefault();
									setLoading("login");
									await manageUserActiveness(
										state._id,
										"login",
										null,
										null,
										data
									);
									setLoading("");
								}}
								width="auto"
								css="btn-primary1 text-capitalize py-3 px-md-5"
								title={"reset login deactivation"}
							/>
						</div>
						<div className="col-6 col-lg-3 px-2">
							<Buttons
								onClick={async e => setIsOpen(true)}
								// onClick={async e => {
								// 	e.preventDefault();
								// 	setLoading("login");
								// 	await manageUserActiveness(
								// 		state._id,
								// 		"login",
								// 		null,
								// 		null,
								// 		data
								// 	);
								// 	setLoading("");
								// }}
								width="auto"
								css="btn-primary1 text-capitalize py-3 px-md-5"
								title={"Change Email/Telephone"}
							/>
						</div>
					</div>
					<div
						className="rounded20 text-white p-4 my-3"
						style={{
							background: `linear-gradient(90.18deg, #3199B7 -52.19%, #144468 81.92%)`,
							minHeight: "179px",
						}}>
						<h4 className="text-uppercase mb-3 Lexend">About me</h4>
						<p>{state?.bio}</p>
					</div>
					<div className="row mx-0 g-3 g-md-5">
						<div className="col-6 col-md p-2 order-1">
							<button className="btn btn-outline-primary1 w-100 h-100 text-capitalize py-3 py-md-5 rounded20">
								<span className="d-block">Commissions</span>
								<span>
									{nairaSign}{" "}
									{state?.wallet?.commission
										? numberWithCommas(
												Number(state?.wallet?.commission).toFixed(2)
										  )
										: 0}
								</span>
							</button>
						</div>
						<div className="col-6 col-md p-2 order-3 order-md-2">
							<button className="btn btn-outline-primary1 w-100 h-100 text-capitalize py-3 py-md-5 rounded20">
								<span className="d-block">Wallet</span>
								<span>
									{nairaSign}{" "}
									{state?.wallet?.available
										? numberWithCommas(
												Number(state?.wallet?.available).toFixed(2)
										  )
										: 0}
								</span>
							</button>
						</div>
						<div className="col-6 col-md p-2 order-2 order-md-3">
							<button className="btn btn-outline-primary1 w-100 h-100 text-capitalize py-3 py-md-5 rounded20">
								<span className="d-block">Bonus</span>
								<span>
									{nairaSign}{" "}
									{state?.wallet?.bonus
										? numberWithCommas(Number(state?.wallet?.bonus).toFixed(2))
										: 0}
								</span>
							</button>
						</div>
					</div>
				</div>
			</Container>{" "}
			<ModalComponents
				isOpen={isOpen}
				toggle={() => {
					setIsOpen(false);
					setData({ email: state?.email, telephone: state?.telephone });
				}}
				title={"Change Email/Telephone"}>
				<div className="mb-3">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						required
						name="email"
						className="form-control py-3"
						value={data.email}
						onChange={e => setData({ ...data, email: e.target.value })}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="telephone">Phone number</label>
					<input
						type="tel"
						required
						name="telephone"
						className="form-control py-3"
						value={data.telephone}
						onChange={e => setData({ ...data, telephone: e.target.value })}
						maxLength={11}
					/>
				</div>
				<Buttons
					loading={loading === "details"}
					onClick={async e => {
						e.preventDefault();
						setLoading("details");
						await manageUserActiveness(state._id, "details", null, null, data);
						setLoading("");
					}}
					width="auto"
					css="btn-primary1 text-capitalize py-3 px-md-5 mx-auto"
					title={"Change Email/Telephone"}
				/>
			</ModalComponents>
		</div>
	);
};

export default UserProfile;
