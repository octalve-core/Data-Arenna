import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../../Data/Context";
import { MainPaginate, MainRanger } from "../../../Components/Transactions";
import LoadMore, { BottomTab } from "../../../Components/LoadMore";
import moment from "moment";
import { useParams } from "react-router-dom";
import { Container } from "reactstrap";

const MainPage = () => {
	let { step } = useParams();

	if (!step) return;
	return (
		<div className="bg-white aboutScreen">
			<Container className="py-3 py-md-5">
				<h5 className="Lexend text-capitalize"> {step}</h5>

				<FundingPreview id={step} />
			</Container>
		</div>
	);
};

export default MainPage;

export const FundingPreview = ({ id }) => {
	const {
		funding,
		numberWithCommas,
		findProviderFunding,
		nairaSign,
		getReload,
	} = useContext(GlobalState);

	let [search, setSearch] = useState(""),
		[state, setState] = useState(null);

		useEffect(() => {
			findProviderFunding({ provider: id });
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [id]);

	useEffect(() => {
		if (search) {
			document.getElementById("Search").addEventListener("search", () => {
				getReload();
			});
			let handleSubmit = async () => {
				if (!search) return;

				await findProviderFunding({
					search,
					provider: id,
				});
			};
			handleSubmit();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search]);

	useEffect(() => {
		getReload();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let [loading, setLoading] = useState(false);
	let handleLoadMore = async () => {
		setLoading(true);
		if (search) {
			await findProviderFunding({
				limit: Number(
					funding?.[`${id}_paginate`]?.nextPage *
						funding?.[`${id}_paginate`]?.limit
				),
				provider: id,
				search,
			});
		} else
			await findProviderFunding({
				limit: Number(
					funding?.[`${id}_paginate`]?.nextPage *
						funding?.[`${id}_paginate`]?.limit
				),
				provider: id,
			});
		setLoading(false);
	};

	useEffect(() => {
		setState(
			funding?.isFound
				? funding?.mainSearch
				: id === "monnify"
				? funding?.monnify
				: id === "manual"
				? funding?.manual
				: id === "flutterwave"
				? funding?.flutterwave
				: id === "paystack"
				? funding?.paystack
				: []
		);
	}, [
		funding?.monnify,
		id,
		funding?.paystack,
		funding?.flutterwave,
		funding?.manual,
		funding?.isFound,
		funding?.mainSearch,
	]);

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
			<div className="w-50 w50 mb-3">
				<input
					type="search"
					name="search"
					id="Search"
					className="form-control w-100 py-3 borderColor2"
					placeholder="Type here to search"
					value={search}
					onChange={e => setSearch(e.target.value)}
				/>
			</div>
			<MainRanger setRange={setRange} range={range} />
			<div className="py-5">
				<div className="bland row mx-0 py-3 px-0 text-capitalize">
					<div className="col textTrunc fontReduce fw-bold Lexend">S/N</div>
					<div className="col textTrunc fontReduce fw-bold Lexend d-none d-md-flex">
						User
					</div>
					<div className="col textTrunc fontReduce fw-bold Lexend">Amount</div>
					<div className="col textTrunc fontReduce fw-bold Lexend">
						Previous Balance
					</div>
					<div className="col textTrunc fontReduce fw-bold Lexend">
						New Balance
					</div>
					<div className="col textTrunc fontReduce fw-bold Lexend d-none d-md-flex">
						date
					</div>
				</div>
				<div className="bland2 row mx-0">
					{currentItems?.map((item, index) => (
						<div key={index} className="row mx-0 py-3 px-0 border-bottom">
							<div className="col textTrunc fontReduce2 my-auto">
								{index + 1}
							</div>
							<div className="col textTrunc fontReduce2 my-auto textTrunc textTrunc3 d-none d-md-flex">
								{item?.user?.lastName} {item?.user?.firstName}
							</div>
							<div className="col textTrunc fontReduce2 my-auto">
								{nairaSign} {numberWithCommas(Number(item?.amount).toFixed(2))}
							</div>
							<div className="col textTrunc fontReduce2 my-auto">
								{nairaSign}{" "}
								{numberWithCommas(Number(item?.wallet?.prevBalance).toFixed(2))}
							</div>
							<div className="col textTrunc fontReduce2 my-auto">
								{nairaSign}{" "}
								{numberWithCommas(Number(item?.wallet?.balance).toFixed(2))}
							</div>
							<div className="col textTrunc fontReduce2 my-auto d-none d-md-flex">
								{moment(item?.createdAt).format("DD/MM/YYYY hh:mm A")}
							</div>
						</div>
					))}
				</div>
				<MainPaginate handlePageClick={handlePageClick} pageCount={pageCount} />
				<BottomTab state={state} paginate={funding?.[`${id}_paginate`]} />
				<LoadMore
					next={funding?.[`${id}_paginate`]?.next}
					handleLoadMore={handleLoadMore}
					loading={loading}
				/>
			</div>
		</>
	);
};
