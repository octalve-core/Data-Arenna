import React, { useContext, useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { GlobalState } from "../../../Data/Context";
import { Container } from "reactstrap";
import { EmptyComponent, Loader } from "../../../Utils";
import moment from "moment";
import { WalletDetails } from "../../../Components/Wallets";
import { MainPaginate, MainRanger } from "../../../Components/Transactions";

const UserWallet = () => {
	const { users, setStateName, manageUserActiveness } = useContext(GlobalState),
		[state, setState] = useState(null),
		params = useParams(),
		[getSearch] = useSearchParams();

	useEffect(() => {
		setStateName(
			`${
				getSearch?.get("name")
					? getSearch?.get("name")?.split("_")?.join(" ")
					: ""
			}'s wallet history`
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		let getUserDetails = async () => {
			await manageUserActiveness(params?.step, "wallet", "", "get");
		};
		getUserDetails();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params?.step]);

	useEffect(() => {
		if (users?.isFoundWallet) setState(users?.walletHistory);
	}, [users?.walletHistory, params?.step, users?.isFoundWallet]);

	if (!state) return;

	return (
		<div className="py-4 bg-white aboutScreen">
			{users?.isFoundWalletLoading ? (
				<Loader />
			) : (
				<Container className="py-5">
					<WalletHistoryList state={state} />
				</Container>
			)}
		</div>
	);
};

export default UserWallet;

export const WalletHistoryList = ({ state }) => {
	const { numberWithCommas, nairaSign } = useContext(GlobalState);
	let [thisData, setThisData] = useState(null);

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
			<MainRanger setRange={setRange} range={range} />
			<div className="row mx-0 my-2 py-3 bland">
				<div className="col my-auto text-uppercase fw-bold Lexend d-none d-md-flex fontReduce textTrunc">
					ID
				</div>
				<div className="col my-auto text-uppercase fw-bold Lexend fontReduce textTrunc">
					description
				</div>
				<div className="col my-auto text-uppercase fw-bold Lexend fontReduce textTrunc">
					amount
				</div>
				<div className="col my-auto text-uppercase fw-bold Lexend fontReduce textTrunc">
					balance
				</div>
				<div className="col my-auto text-uppercase fw-bold Lexend fontReduce textTrunc">
					previous amount
				</div>
				<div className="col my-auto text-uppercase fw-bold Lexend d-none d-md-flex fontReduce textTrunc">
					date
				</div>
			</div>
			{currentItems?.length === 0 ? (
				<EmptyComponent subtitle={"User wallet history is empty"} />
			) : (
				currentItems?.map((it, i) => (
					<div
						key={i}
						className="row mx-0 py-3 bland2 myCursor border-bottom"
						onClick={() => setThisData(it)}>
						<div className="col my-auto text-capitalize d-none d-md-flex fontReduce2 textTrunc">
							{it?.item_id}
						</div>
						<div className="col my-auto text-capitalize textTrunc textTrunc2 fontReduce2">
							{it?.description}
						</div>
						<div className="col my-auto fontReduce2 textTrunc">
							{nairaSign}{" "}
							{it?.amount ? numberWithCommas(Number(it?.amount).toFixed(2)) : 0}
						</div>
						<div className="col my-auto fontReduce2 textTrunc">
							{nairaSign}{" "}
							{it?.balance
								? numberWithCommas(Number(it?.balance).toFixed(2))
								: 0}
						</div>
						<div className="col my-auto fontReduce2 textTrunc">
							{nairaSign}{" "}
							{it?.prevBalance
								? numberWithCommas(Number(it?.prevBalance).toFixed(2))
								: 0}
						</div>
						<div className="col my-auto d-none d-md-flex fontReduce2 textTrunc">
							{moment(it?.createdAt).format("L hh:mm A")}
						</div>
					</div>
				))
			)}
			<MainPaginate handlePageClick={handlePageClick} pageCount={pageCount} />
			<WalletDetails setThisData={setThisData} thisData={thisData} />
		</>
	);
};
