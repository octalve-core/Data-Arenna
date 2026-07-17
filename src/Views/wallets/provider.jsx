import React, { useContext, useEffect, useState } from "react";
import { Container } from "reactstrap";
import { GlobalState } from "../../Data/Context";
import moment from "moment";
import { MainPaginate, MainRanger } from "../../Components/Transactions";

const Provider = () => {
	let { setStateName, stat, getProviderStat } = useContext(GlobalState);
	useEffect(() => {
		setStateName("Provider Wallet Stat");
		getProviderStat({ route: "/manage-transactions" }); // eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let [active, setActive] = useState(0),
		[daily, setDaily] = useState(null),
		[weekly, setWeekly] = useState(null),
		[monthly, setMonthly] = useState(null);

	useEffect(() => {
		setDaily(stat?.data?.daily);
		setWeekly(stat?.data?.weekly);
		setMonthly(stat?.data?.monthly);
	}, [stat?.data]);

	let tabControl = ["Daily", "weekly", "monthly"];
	return (
		<div className="bg-white aboutScreen">
			<Container className="py-3 py-md-5">
				<div>
					<div className="btn-group w-100 py-3">
						{tabControl?.map((item, i) => (
							<button
								key={i}
								className={`btn py-3 text-capitalize fw-bold ${
									active === i ? "border-bottom textColor" : ""
								} rounded-0`}
								onClick={() => setActive(i)}>
								{item}
							</button>
						))}
					</div>
					{active === 2 ? (
						<MainProviderStatData state={monthly} factor="month" />
					) : active === 1 ? (
						<MainProviderStatData state={weekly} factor="week" />
					) : (
						<MainProviderStatData state={daily} factor="day" />
					)}
				</div>
			</Container>{" "}
		</div>
	);
};

export default Provider;

let MainProviderStatData = ({ state, factor }) => {
	let { numberWithCommas, nairaSign } = useContext(GlobalState),
		[total, setTotal] = useState(0);

	useEffect(() => {
		if (state) {
			let paystackTotal = state?.reduce(
				(ac, i) => (ac += Number(i?.paystackTotal)),
				0
			);
			let monnifyTotal = state?.reduce(
				(ac, i) => (ac += Number(i?.monnifyTotal)),
				0
			);
			let flutterTotal = state?.reduce(
				(ac, i) => (ac += Number(i?.flutterTotal)),
				0
			);
			let manualTotal = state?.reduce(
				(ac, i) => (ac += Number(i?.manualTotal)),
				0
			);
			setTotal(
				Number(paystackTotal) +
					Number(monnifyTotal) +
					Number(flutterTotal) +
					Number(manualTotal)
			);
		}
	}, [state]);

	let [range, setRange] = useState(10);

	const [itemOffset, setItemOffset] = useState(0);
	const endOffset = itemOffset + range;
	if (!state) return;

	const currentItems = state.slice(itemOffset, endOffset);
	const pageCount = Math.ceil(state.length / range);

	const handlePageClick = event => {
		const newOffset = (event.selected * range) % state.length;
		setItemOffset(newOffset);
	};
	return (
		<>
			<div className="py-5">
		<MainRanger  setRange={setRange} range={range}/>
				<div className="bland row mx-0 py-3 px-0 text-capitalize">
					<div className="col textTrunc fontReduce fw-bold Lexend">S/N</div>
					<div className="col textTrunc fontReduce fw-bold Lexend">Monnify</div>
					<div className="col textTrunc fontReduce fw-bold Lexend">
						Flutterwave
					</div>
					<div className="col textTrunc fontReduce fw-bold Lexend">
						Paystack
					</div>
					<div className="col textTrunc fontReduce fw-bold Lexend">
						Manual total
					</div>
				</div>
				<div className="bland2 row mx-0">
					{currentItems?.map((item, index) => (
						<div key={index} className="row mx-0 py-3 px-0 border-bottom">
							<div className="col text-capitalize textTrunc fontReduce3 textTrunc2 my-auto">
								{factor === "day"
									? moment().dayOfYear(item?.[factor])?.format("Do MMM, YYYY")
									: factor === "week"
									? moment().week(item?.[factor])?.format("Do MMMM, YYYY")
									: moment()
											.month(item?.[factor] - 1)
											?.format("MMMM, YYYY")}
								{/* {factor} {item?.[factor]} */}
							</div>
							<div className="col textTrunc fontReduce3 textTrunc2 my-auto">
								{nairaSign}{" "}
								{numberWithCommas(Number(item?.monnifyTotal).toFixed(2))}
								<span className="d-none d-md-inline ps-md-2 textTrunc">
									({numberWithCommas(item?.monnifyCount)} time
									{item?.monnifyCount !== 1 ? "s" : ""})
								</span>
							</div>
							<div className="col textTrunc fontReduce3 textTrunc2 my-auto">
								{nairaSign}{" "}
								{numberWithCommas(Number(item?.flutterTotal).toFixed(2))}
								<span className="d-none d-md-inline ps-md-2 textTrunc">
									({numberWithCommas(item?.flutterCount)} time
									{item?.flutterCount !== 1 ? "s" : ""})
								</span>
							</div>
							<div className="col textTrunc fontReduce3 textTrunc2 my-auto">
								{nairaSign}{" "}
								{numberWithCommas(Number(item?.paystackTotal).toFixed(2))}
								<span className="d-none d-md-inline ps-md-2 textTrunc">
									({numberWithCommas(item?.paystackCount)} time
									{item?.paystackCount !== 1 ? "s" : ""})
								</span>
							</div>
							<div className="col textTrunc fontReduce3 textTrunc2 my-auto">
								{nairaSign}{" "}
								{numberWithCommas(Number(item?.manualTotal).toFixed(2))}
								<span className="d-none d-md-inline ps-md-2 textTrunc">
									({numberWithCommas(item?.manualCount)} time
									{item?.manualCount !== 1 ? "s" : ""})
								</span>
							</div>
						</div>
					))}
				</div>
							<MainPaginate handlePageClick={handlePageClick} pageCount={pageCount} />
				<div className="bland row mx-0 py-3 px-0 text-capitalize">
					<div className="col textTrunc fontReduce fw-bold Lexend"></div>
					<div className="col textTrunc fontReduce fw-bold Lexend">
						{nairaSign}{" "}
						{numberWithCommas(
							Number(
								state?.reduce((ac, i) => (ac += Number(i?.monnifyTotal)), 0)
							).toFixed(2)
						)}
						<span className="d-none d-md-inline ps-md-2 textTrunc">
							(
							{numberWithCommas(
								state?.reduce((ac, i) => (ac += Number(i?.monnifyCount)), 0)
							)}{" "}
							time
							{state?.reduce((ac, i) => (ac += Number(i?.monnifyCount)), 0) !==
							1
								? "s"
								: ""}
							)
						</span>
					</div>
					<div className="col textTrunc fontReduce fw-bold Lexend">
						{nairaSign}{" "}
						{numberWithCommas(
							Number(
								state?.reduce((ac, i) => (ac += Number(i?.flutterTotal)), 0)
							).toFixed(2)
							)}
						<span className="d-none d-md-inline ps-md-2 textTrunc">
							(
							{numberWithCommas(
								state?.reduce((ac, i) => (ac += Number(i?.flutterCount)), 0)
							)}{" "}
							time
							{state?.reduce((ac, i) => (ac += Number(i?.flutterCount)), 0) !==
							1
								? "s"
								: ""}
							)
						</span>
					</div>
					<div className="col textTrunc fontReduce fw-bold Lexend">
						{nairaSign}{" "}
						{numberWithCommas(
							Number(
								state?.reduce((ac, i) => (ac += Number(i?.paystackTotal)), 0)
							).toFixed(2)
						)}
						<span className="d-none d-md-inline ps-md-2 textTrunc">
							(
							{numberWithCommas(
								state?.reduce((ac, i) => (ac += Number(i?.paystackCount)), 0)
							)}{" "}
							time
							{state?.reduce((ac, i) => (ac += Number(i?.paystackCount)), 0) !==
							1
								? "s"
								: ""}
							)
						</span>
					</div>
					<div className="col textTrunc fontReduce fw-bold Lexend">
						{nairaSign}{" "}
						{numberWithCommas(
							Number(
								state?.reduce((ac, i) => (ac += Number(i?.manualTotal)), 0)
								).toFixed(2)
								)}
						<span className="d-none d-md-inline ps-md-2 textTrunc">
							(
							{numberWithCommas(
								state?.reduce((ac, i) => (ac += Number(i?.manualCount)), 0)
								)}{" "}
							time
							{state?.reduce((ac, i) => (ac += Number(i?.manualCount)), 0) !== 1
								? "s"
								: ""}
							)
						</span>
					</div>
				</div>
				<div className="py-3">
					<h2 className="Lexend">
						Total: {nairaSign} {numberWithCommas(Number(total).toFixed(2))}
					</h2>
				</div>
			</div>
		</>
	);
};
