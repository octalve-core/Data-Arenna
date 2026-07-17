import React, { useContext, useEffect, useState } from "react";
import { Container } from "reactstrap";
import { GlobalState } from "../../Data/Context";
import { Buttons } from "../../Utils";
import moment from "moment";
import { ModalComponents } from "../../Components";
import icon1 from "../../Assets/Saly-26 (1).png";
import icon2 from "../../Assets/Saly-25.png";
import icon3 from "../../Assets/Saly-31.png";
import { ThreeBoxBar } from "../../Components/Users";

const Broadcasts = () => {
	let { setStateName } = useContext(GlobalState);
	useEffect(() => {
		setStateName("broadcast");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let [isOpen, setIsOpen] = useState(false),
		toggle = () => {
			setIsOpen(!isOpen);
		};

	let usersArr = [
		{
			icon: icon1,
			name: "Average Click",
			number: "10%",
			color: "linear-gradient(90.18deg, #84C7DB -52.19%, #377FB6 81.92%)",
		},
		{
			icon: icon2,
			name: "Average Open",
			number: "40%",
			color: "linear-gradient(90deg, #DE0DE2 16.14%, #880EC2 101.45%)",
		},
		{
			icon: icon3,
			name: `Total broadcasts`,
			number: "1900",
			color: "linear-gradient(90deg, #E43369 16.14%, #C20E19 101.45%)",
		},
	];

	return (
		<div className="bg-white aboutScreen">
			<Container className="py-5">
				<ThreeBoxBar list={usersArr} />
				<div className="btn-group">
					<Buttons
						title={"send new broadcast"}
						css="btn-primary1 text-capitalize px-md-4 px-3 mx-1 mx-md-3 py-1 py-md-2 fontReduce2"
						width={"w-auto"}
						onClick={toggle}
						style={{ borderRadius: "30px" }}
					/>
				</div>
				<BroadcastHistory toggle={toggle} />
			</Container>{" "}
			<ModalComponents title="broadcast" isOpen={isOpen} back={toggle}>
				<div className="downH2 d-flex">
					<form className="w-100">
						<div className="mb-4">
							<label htmlFor="value">Title</label>
							<input
								type={"text"}
								placeholder="Title"
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
						<div className="form mb-3">
							<label htmlFor="bundle">Select target</label>
							<select className="form-control rounded10 py-3 form-select">
								<option value="ringo">Agent</option>
							</select>
						</div>
						<Buttons
							title={"send"}
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

export default Broadcasts;

const BroadcastHistory = ({ toggle }) => {
	let historyList = [
		{
			title: "CONV-12",
			description:
				"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde, officia!",
			date: Date.now(),
			target: "agent",
			status: "active",
		},
	];

	return (
		<>
			<div className="pb-5 my-5">
				<div className="bland row mx-0 p-3 text-capitalize">
					<div className="col textTrunc">title</div>
					<div className="col textTrunc">date</div>
					<div className="col textTrunc d-none d-md-flex">description</div>
					<div className="col textTrunc d-none d-md-flex">target</div>
					<div className="col textTrunc">status</div>
					<div className="col textTrunc">action </div>
				</div>
				<div className="bg-white row mx-0">
					{historyList?.map((item, index) => (
						<div key={index} className="row mx-0 p-3">
							<div className="col textTrunc my-auto">{item?.title}</div>
							<div className="col textTrunc my-auto">
								{moment(item?.createdAt).format("L")}
							</div>
							<div className="col d-none d-md-flex textTrunc my-auto">
								{item?.description}
							</div>
							<div className="col d-none d-md-flex textTrunc my-auto">
								{item?.target}
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
