import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../../Data/Context";
import { Container } from "reactstrap";
import LoadMore, { BottomTab } from "../../../Components/LoadMore";
import moment from "moment";
import { EmptyComponent } from "../../../Utils";
import { MainPaginate, MainRanger } from "../../../Components/Transactions";

const Referral = () => {
	let { setStateName } = useContext(GlobalState);

	useEffect(() => {
		setStateName("Referral history");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="bg-white aboutScreen">
			<Container className="py-3 py-md-5">
				<h5 className="Lexend">Referral History</h5>
				<ReferedUser />{" "}
			</Container>{" "}
		</div>
	);
};

export default Referral;

const ReferedUser = () => {
	const { getReferrals, referral } = useContext(GlobalState);

	let [state, setState] = useState(null);

	useEffect(() => {
		getReferrals({ general: "allCases" });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let [loading, setLoading] = useState(false);
	let handleLoadMore = async () => {
		setLoading(true);

		await getReferrals({
			limit: Number(
				referral?.general_paginate?.nextPage * referral?.general_paginate?.limit
			),
			general: "allCases",
		});
		setLoading(false);
	};

	useEffect(() => {
		setState(referral?.all_referral);
	}, [referral]);

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
		<div className="py-5">
			<MainRanger setRange={setRange} range={range} />
			<div className="bland row mx-0 py-3 px-0 text-capitalize">
				<div className="col textTrunc fontReduce fw-bold Lexend">S/N</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">date</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">Referee</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">User</div>
			</div>
			<div className="bland2 row mx-0">
				{currentItems?.length === 0 ? (
					<EmptyComponent subtitle={`Referral list is empty`} />
				) : (
					currentItems?.map((item, index) => (
						<div key={index} className="row mx-0 py-3 px-0">
							<div className="col textTrunc fontReduce2 my-auto textTrunc textTrunc3 d-none d-md-flex">
								{index + 1}
							</div>
							<div className="col textTrunc fontReduce2 my-auto">
								{moment(item?.createdAt).format("DD/MM/YYYY hh:mm A")}
							</div>
							<div className="col textTrunc fontReduce2 my-auto">
								{item?.referee?.firstName} {item?.referee?.lastName}
							</div>
							<div className="col textTrunc fontReduce2 my-auto">
								{item?.user?.firstName} {item?.user?.lastName}
							</div>
						</div>
					))
				)}
			</div>
			<MainPaginate handlePageClick={handlePageClick} pageCount={pageCount} />
			<BottomTab state={state} paginate={referral?.all_paginate} />
			<LoadMore
				next={referral?.all_paginate?.next}
				handleLoadMore={handleLoadMore}
				loading={loading}
			/>
		</div>
	);
};
