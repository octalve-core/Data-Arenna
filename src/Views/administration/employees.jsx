import React, { useContext, useEffect, useState } from "react";
import { Container } from "reactstrap";
import { ModalComponents } from "../../Components";
import { GlobalState } from "../../Data/Context";
import { Buttons } from "../../Utils";
import moment from "moment";

const Employees = () => {
	let { setStateName } = useContext(GlobalState);
	useEffect(() => {
		setStateName("employees");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let [isOpen, setIsOpen] = useState(false),
		toggle = () => {
			setIsOpen(!isOpen);
		};
	return (
		<div className="bg-white aboutScreen">
			<Container className="py-5">
				<h4>Employees</h4>{" "}
				<div className="btn-group">
					<Buttons
						title={"create new"}
						css="btn-primary1 text-capitalize py-md-3 py-2 px-4 px-lg-5 my-md-4 my-2 mb-0"
						width={"w-auto"}
						onClick={toggle}
						style={{ borderRadius: "30px" }}
					/>
				</div>
				<EmployeeDetails toggle={toggle} />
			</Container>{" "}
			<ModalComponents title="employee" isOpen={isOpen} back={toggle}>
				<div className="downH2 d-flex">
					<form className="w-100">
						<div className="mb-4">
							<label htmlFor="value">Fullname</label>
							<input
								type={"text"}
								placeholder="Name"
								className="form-control py-3"
							/>
						</div>
						<div className="form mb-3">
							<label htmlFor="bundle">Date of birth</label>
							<input
								type={"date"}
								placeholder="Date"
								className="form-control py-3"
							/>
						</div>
						<div className="mb-4">
							<label htmlFor="value">Email</label>
							<input
								type={"email"}
								placeholder="example@mail.com"
								className="form-control py-3"
							/>
						</div>
						<Buttons
							title={"create"}
							css="btn-primary1 text-capitalize py-3 px-4 px-lg-5 mx-auto my-4"
							width={"w-50 w50"}
							onClick={toggle}
							style={{ borderRadius: "30px" }}
						/>
					</form>
				</div>
			</ModalComponents>
		</div>
	);
};

export default Employees;

const EmployeeDetails = ({ toggle }) => {
	let historyList = [
		{
			id: "CONV-12",
			fullname: "Honourworld",
			date: Date.now(),
			email: "email@mail.com",
			role: "designer",
			organisation: "memo",
			status: "active",
		},
	];

	return (
		<>
			<div className="pb-5 my-5">
				<div className="bland row mx-0 py-3 px-0 text-capitalize">
					<div className="col textTrunc d-none d-md-flex">ID</div>
					<div className="col textTrunc">fullname</div>
					<div className="col textTrunc d-none d-md-flex">date</div>
					<div className="col textTrunc d-none d-md-flex">email</div>
					<div className="col textTrunc">role</div>
					<div className="col textTrunc d-none d-md-flex">organisation</div>
					<div className="col textTrunc">status</div>
					<div className="col textTrunc">action </div>
				</div>
				<div className="bg-white row mx-0">
					{historyList?.map((item, index) => (
						<div key={index} className="row mx-0 py-3 px-0">
							<div className="col d-none d-md-flex textTrunc my-auto">
								{item?.id}
							</div>
							<div className="col textTrunc my-auto">{item?.fullname}</div>
							<div className="col d-none d-md-flex textTrunc my-auto">
								{moment(item?.createdAt).format("L")}
							</div>
							<div className="col d-none d-md-flex textTrunc my-auto">
								{item?.email}
							</div>
							<div className="col textTrunc my-auto">{item?.role}</div>
							<div className="col d-none d-md-flex textTrunc my-auto">
								{item?.organisation}
							</div>
							<div className="col textTrunc my-auto">{item?.status}</div>
							<div className="col textTrunc my-auto">
								<div className="d-md-flex align-items-center">
									<p className="text-danger myCursor">Disable</p>
									<p className="text-red ms-2 myCursor" onClick={toggle}>
										Edit
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};
