import React, { useContext, useEffect, useState } from "react";
import { Container } from "reactstrap";
import { GlobalState } from "../../Data/Context";
import { Buttons } from "../../Utils";
import moment from "moment";
import { ModalComponents } from "../../Components";

const Tvsubscription = () => {
	let { setStateName } = useContext(GlobalState);
	useEffect(() => {
		setStateName("service Control");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let [isOpen, setIsOpen] = useState(false),
		toggle = () => {
			setIsOpen(!isOpen);
		};

	return (
		<div className="bg-white aboutScreen">
			<Container className="py-5">
				<h4>Tv Plans</h4>{" "}
				<div className="btn-group">
					<Buttons
						title={"create new tv plan"}
						css="btn-primary1 text-capitalize px-md-4 px-3 mx-1 mx-md-3 py-1 py-md-2 fontReduce2"
						width={"w-auto"}
						onClick={toggle}
						style={{ borderRadius: "30px" }}
					/>
					<Buttons
						title={"disable all data"}
						css="btn-primary1 text-capitalize px-md-4 px-3 mx-1 mx-md-3 py-1 py-md-2 fontReduce2"
						width={"w-auto"}
						style={{ borderRadius: "30px" }}
					/>
				</div>
				<SubHistory toggle={toggle} />
			</Container>{" "}
			<ModalComponents title="tv plan" isOpen={isOpen} back={toggle}>
				<div className="downH2 d-flex">
					<form className="w-100">
						<div className="mb-4">
							<label htmlFor="value">Type</label>
							<input
								type={"text"}
								placeholder="Type"
								className="form-control py-3"
							/>
						</div>
						<div className="form mb-3">
							<label htmlFor="bundle">Description</label>
							<textarea
								className="form-control rounded10 py-3"
								placeholder="Enter description"
								style={{
									resize: "none",
									height: "7rem",
								}}
							/>
						</div>
						<div className="mb-4">
							<label htmlFor="value">Price</label>
							<input
								type={"number"}
								placeholder="500"
								className="form-control py-3"
							/>
						</div>
						<div className="mb-4">
							<label htmlFor="value">Provider Price</label>
							<input
								type={"number"}
								placeholder="500"
								className="form-control py-3"
							/>
						</div>
						<Buttons
							title={"update"}
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

export default Tvsubscription;

const SubHistory = ({ toggle }) => {
	let historyList = [
		{
			id: "CONV-12",
			description:
				"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde, officia!",
			date: Date.now(),
			price: 5000,
			discount: 2,
			status: "active",
		},
	];

	return (
		<>
			<div className="pb-5 my-5">
				<div className="bland row mx-0 p-3 text-capitalize">
					<div className="col textTrunc d-none d-md-flex">ID</div>
					<div className="col textTrunc d-none d-md-flex">description</div>
					<div className="col textTrunc">date</div>
					<div className="col textTrunc">Price</div>
					<div className="col textTrunc d-none d-md-flex">discount</div>
					<div className="col textTrunc">status</div>
					<div className="col textTrunc">action </div>
				</div>
				<div className="bg-white row mx-0">
					{historyList?.map((item, index) => (
						<div key={index} className="row mx-0 p-3">
							<div className="col d-none d-md-flex textTrunc my-auto">
								{item?.id}
							</div>
							<div className="col d-none d-md-flex textTrunc my-auto">
								{item?.description}
							</div>
							<div className="col textTrunc my-auto">
								{moment(item?.createdAt).format("L")}
							</div>
							<div className="col textTrunc my-auto">{item?.price}</div>
							<div className="col d-none d-md-flex textTrunc my-auto">
								{item?.discount}
							</div>
							<div className="col textTrunc my-auto">{item?.status}</div>
							<div className="col textTrunc my-auto">
								<div className="d-flex align-items-center">
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
