import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../Data/Context";
import { Container } from "reactstrap";
import moment from "moment";
import LoadMore, { BottomTab } from "../../Components/LoadMore";
import { MainTransFinder } from "./find-transactions";
import { MainPaginate, MainRanger } from "../../Components/Transactions";

const BonusData = () => {
	let { setStateName, stat, getDataTransactionStat } = useContext(GlobalState);
	useEffect(() => {
		setStateName("Data Profit details");
		getDataTransactionStat();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let [daily, setDaily] = useState(null),
		[weekly, setWeekly] = useState(null),
		[monthly, setMonthly] = useState(null),
		[active, setActive] = useState(0),
		tabControl = ["Profit history", "profit stat"];

	useEffect(() => {
		setDaily(stat?.dataFinder?.daily);
		setWeekly(stat?.dataFinder?.weekly);
		setMonthly(stat?.dataFinder?.monthly);
	}, [stat?.dataFinder]);

	return (
		<div className="bg-white aboutScreen">
			<Container className="py-3 py-md-5">
				<h5 className="Lexend text-capitalize">Data {tabControl[active]}</h5>
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
				{active === 1 ? (
					<MainTransFinder
						weekly={weekly}
						daily={daily}
						monthly={monthly}
						notype
					/>
				) : (
					<DataCommission />
				)}
			</Container>{" "}
		</div>
	);
};

export default BonusData;

export const DataCommission = () => {
	const { general, numberWithCommas, getDataHistory, nairaSign } =
		useContext(GlobalState);

	let [state, setState] = useState(null);

	useEffect(() => {
		getDataHistory();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let [loading, setLoading] = useState(false);
	let handleLoadMore = async () => {
		setLoading(true);

		await getDataHistory({
			limit: Number(
				general?.paginate_data?.nextPage * general?.paginate_data?.limit
			),
		});
		setLoading(false);
	};

	useEffect(() => {
		setState(general?.data);
	}, [general?.data]);

	let [range, setRange] = useState(10);

	const [itemOffset, setItemOffset] = useState(0);
	if (!state) return;

	const endOffset = itemOffset + range;

	const currentItems = state.slice(itemOffset, endOffset);
	const pageCount = Math.ceil(state.length / range);

	const handlePageClick = event => {
		const newOffset = (event.selected * range) % state.length;
		setItemOffset(newOffset);
	};

	return (
		<>
			<MainRanger setRange={setRange} range={range} />
			<div className="py-5">
				<div className="bland row mx-0 py-3 px-0 text-capitalize">
					<div className="col textTrunc fontReduce fw-bold Lexend">S/N</div>
					<div className="col textTrunc fontReduce fw-bold Lexend d-none d-md-flex">
						date
					</div>
					<div className="col textTrunc fontReduce fw-bold Lexend d-none d-md-flex">
						Description
					</div>
					<div className="col textTrunc fontReduce fw-bold Lexend">Amount</div>
					<div className="col textTrunc fontReduce fw-bold Lexend">Sold at</div>
					<div className="col textTrunc fontReduce fw-bold Lexend">Profit</div>
				</div>
				<div className="bland2 row mx-0">
					{currentItems?.map((item, index) => (
						<div key={index} className="row mx-0 py-3 px-0 border-bottom">
							<div className="col textTrunc fontReduce2 my-auto">
								{index + 1}
							</div>
							<div className="col textTrunc fontReduce2 my-auto d-none d-md-flex">
								{moment(item?.createdAt).format("DD/MM/YYYY")}
							</div>
							<div className="col textTrunc fontReduce2 my-auto textTrunc textTrunc3 d-none d-md-flex">
								{item?.description}
							</div>
							<div className="col textTrunc fontReduce2 my-auto">
								{nairaSign} {numberWithCommas(item?.amount - item?.profit)}
							</div>
							<div className="col textTrunc fontReduce2 my-auto">
								{nairaSign} {numberWithCommas(item?.amount)}
							</div>
							<div className="col textTrunc fontReduce2 my-auto">
								{nairaSign} {numberWithCommas(item?.profit)}
							</div>
						</div>
					))}
				</div>
				<MainPaginate handlePageClick={handlePageClick} pageCount={pageCount} />
				<BottomTab state={state} paginate={general?.paginate_data} />
				<LoadMore
					next={general?.paginate_data?.next}
					handleLoadMore={handleLoadMore}
					loading={loading}
				/>
			</div>
		</>
	);
};
