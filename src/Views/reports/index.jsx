import React, { useContext, useEffect, useState } from "react";
import { Container } from "reactstrap";
import moment from "moment";
import { GlobalState } from "../../Data/Context";

const Reports = () => {
	let { setStateName } = useContext(GlobalState);
	useEffect(() => {
		setStateName("sales report");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	let reportTab = ["Daily", "Monthly", "Yearly"];
	let [active, setActive] = useState(0);
	return (
		<div className="bg-white aboutScreen">
			<Container className="py-5">
				<div className="row mx-0 g-2 g-md-3">
					{reportTab?.map((it, i) => (
						<div className="col-6 col-md-4 p-1 p-md-3" key={i}>
							<button
								style={{ borderRadius: "30px" }}
								onClick={() => setActive(i)}
								className="btn btn-outline-primary1 py-2 py-md-3 text-capitalize w-100 textTrunc">
								<span className="textTrunc">{it} report</span>
							</button>
						</div>
					))}
				</div>
				<h4 className="text-capitalize my-3 Lexend">
					{reportTab[active]} report
				</h4>
				<DailyReport active={active} />
				<ReportDetails active={active} />
			</Container>
		</div>
	);
};

export default Reports;

let DailyReport = ({ active }) => {
	let days = [
		"monday",
		"tuesday",
		"wednessday",
		"thursday",
		"friday",
		"saturday",
		"sunday",
	];
	let months = [
		"january",
		"febuary",
		"march",
		"april",
		"may",
		"june",
		"july",
		"august",
		"september",
		"october",
		"november",
		"december",
	];

	return (
		<>
			<span className="d-block">
				Pick a {active === 2 ? "year" : active === 1 ? "month" : "day"}
			</span>
			<div className="my-3 d-flex">
				<div className="">
					<select
						name="day"
						id="day"
						value={
							active === 2
								? moment().format("YYYY")
								: active === 1
								? moment().format("MMMM").toLowerCase()
								: moment().format("dddd").toLowerCase()
						}
						style={{ borderRadius: "30px" }}
						className="form-control form-select py-2 py-md-3 text-capitalize px-md-5 px-3">
						{active === 2
							? days?.map((it, i) => (
									<option value={it} key={i}>
										{it}
									</option>
							  ))
							: active === 1
							? months?.map((it, i) => (
									<option value={it} key={i}>
										{it}
									</option>
							  ))
							: days?.map((it, i) => (
									<option value={it} key={i}>
										{it}
									</option>
							  ))}
					</select>
				</div>
			</div>
		</>
	);
};

const ReportDetails = ({ active }) => {
	let userList = [
		{
			name: "Honourworld",
			createdAt: Date.now(),
			amount: "50000",
			id: "1234567890",
			description: `
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita, id quas. Expedita ducimus nisi, ipsum quae fugiat ut deserunt aliquid delectus autem cupiditate perferendis aperiam harum? Ut laboriosam, ad, numquam, laborum ratione recusandae est rerum obcaecati ipsa distinctio aliquid quod.`,
			status: "pending",
		},
	];

	return (
		<div className="pb-5 my-5">
			<div className="bland row mx-0 p-3 text-capitalize">
				<div className="col textTrunc">product sold</div>
				<div className="col textTrunc d-none d-md-flex">description</div>
				<div className="col textTrunc">Date</div>
				<div className="col textTrunc">Amount</div>
				<div className="col textTrunc">Action</div>
			</div>
			<div className="bland2 row mx-0">
				{userList?.map((item, index) => (
					<div key={index} className="row mx-0 py-3 px-0">
						<div className="col textTrunc my-auto">{item?.name}</div>
						<div className="col textTrunc my-auto textTrunc textTrunc4 d-none d-md-flex">
							{item?.description}
						</div>
						<div className="col textTrunc my-auto">
							{moment(item?.createdAt).format("L")}
						</div>
						<div className="col textTrunc my-auto">{item?.amount}</div>
						<div className="col textTrunc my-auto text-primary">
							view details
						</div>
					</div>
				))}
			</div>
			<div className="d-inline-flex">
				<div className="me-3 me-lg-5">
					<h5 className="text-uppercase text-primary Lexend fontReduceBig">
						{active === 2 ? "year" : active === 1 ? "month" : "date"}
					</h5>
					<p className="fontReduceMini">{moment().format("L")}</p>
				</div>
				<div className="">
					<h5 className="text-uppercase text-primary Lexend fontReduceBig">
						sales
					</h5>
					<p className="fontReduceMini">NGN 200, 000</p>
				</div>
			</div>
		</div>
	);
};
