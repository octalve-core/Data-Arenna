import moment from "moment";
import React, { useContext, useEffect, useState, useRef } from "react";
import icon1 from "../../Assets/Fresh Folk Teamwork.png";
import icon2 from "../../Assets/Finance.png";
import icon3 from "../../Assets/Support.png";
import { ThreeBoxBar } from "../Users";
import { GlobalState } from "../../Data/Context";
import { Buttons, EmptyComponent } from "../../Utils";
import LoadMore, { BottomTab } from "../LoadMore";
import { useParams } from "react-router-dom";
import { ModalComponents } from "../DefaultHeader";
import { useReactToPrint } from "react-to-print";
import { Link } from "react-router-dom";
import { FindDetails } from "../../Views/wallets/find-transactions";
import { NetworkList2 } from "../Products/airtime";
import ReactPaginate from "react-paginate";

const TransactionsFolder = ({ active = 0, subActive = 0 }) => {
	return (
		<>
			{active === 1 ? (
				<SubMyTransactionsFolder subActive={subActive} />
			) : (
				<SubTransactionsFolder subActive={subActive} />
			)}
		</>
	);
};

export const SubTransactionsFolder = ({ subActive = 0, active = 0 }) => {
	const { general, getServicesHistory, getReload, auth } =
		useContext(GlobalState);

	let [loading, setLoading] = useState(false),
		{ page } = useParams(),
		[search, setSearch] = useState(""),
		[streamline, setStreamline] = useState(""),
		[state, setState] = useState(null),
		[thisData, setThisData] = useState(null);

		useEffect(()=> {
			getServicesHistory("all", {streamline})
		// eslint-disable-next-line react-hooks/exhaustive-deps
		},[streamline])

	useEffect(() => {
		if (search) {
			document.getElementById("Search").addEventListener("search", () => {
				getReload();
			});
			let handleSubmit = async () => {
				if (!search) return;

				await getServicesHistory("all", {
					search,
					streamline
				});
			};
			handleSubmit();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search]);

	useEffect(() => {
		if (general?.isFound) {
			setState(general?.mainSearch);
		} else
			setState(
				subActive === 1
					? general?.month_transactions
					: subActive === 0
					? general?.day_transactions
					: general?.transactions
			);
		if (subActive === 1) {
			setStreamline("month");
		}
		if (subActive === 0) {
			setStreamline("day");
		}
		if (subActive === 2) {
			setStreamline("");
		}
	}, [
		general?.transactions,
		general?.day_transactions,
		general?.month_transactions,
		general?.isFound,
		general?.mainSearch,
		subActive,
	]);

	useEffect(() => {
		getReload();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let handleLoadMore = async () => {
			setLoading(true);

			if (search) {
				await getServicesHistory("all", {
					limit: Number(general?.paginate?.nextPage * general?.paginate?.limit),
					search,
					streamline,
				});
			} else {
				await getServicesHistory("all", {
					limit:
						subActive === 1
							? Number(
									general?.month_paginate?.nextPage *
										general?.month_paginate?.limit
							  )
							: subActive === 0
							? Number(
									general?.day_paginate?.nextPage * general?.day_paginate?.limit
							  )
							: Number(general?.paginate?.nextPage * general?.paginate?.limit),
					streamline,
				});
			}
			setLoading(false);
		},
		init = { category: "", network: "", type: "", status: "" },
		[stateFilter, setStateFilter] = useState(init),
		[isOpen, setIsOpen] = useState(false),
		toggle = () => {
			if (isOpen) setStateFilter(init);
			setIsOpen(!isOpen);
		},
		[loadingFilter, setLoadingFilter] = useState(false),
		[submit, setSubmit] = useState(false),
		textChange =
			name =>
			({ target: { value } }) => {
				setStateFilter({ ...stateFilter, [name]: value });
			},
		handleFind = async () => {
			setLoadingFilter(true);
			await getServicesHistory("all", {
				search,
				streamline,
				filter: `${
					stateFilter?.category ? `&category=${stateFilter?.category}` : ""
				}${stateFilter?.network ? `&network=${stateFilter?.network}` : ""}${
					stateFilter?.status ? `&status=${stateFilter?.status}` : ""
				}${stateFilter?.type ? `&caseType=${stateFilter?.type}` : ""}`,
			});
			setLoadingFilter(false);
			setSubmit(true);
		};

	useEffect(() => {
		if (submit && general?.isFound) {
			setSubmit(false);
			toggle();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, general?.isFound]);

	if (!state) return <></>;

	return (
		<>
			<div className="d-flex justify-content-between align-items-center my-4">
				{page === "transactions" &&
					auth?.user?.privilege === "agent" && (
						<Link
							to={`/transactions/add`}
							style={{ borderRadius: "30px" }}
							className="btn-primary1 text-capitalize py-3 px-4 px-lg-5 btn">
							manual debit
						</Link>
					)}
				{page === "transactions" && (
					<Buttons
						title={"filter"}
						css="btn-primary1 text-capitalize py-3 px-4 px-lg-5"
						width={"w-25 w25"}
						onClick={toggle}
						style={{ borderRadius: "30px" }}
					/>
				)}
			</div>
			{page !== "dashboard" && (
				<>
					<div className="w-50 w50">
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
				</>
			)}
			<NewPaginate
				state={page !== "dashboard" ? state : state?.slice(0, 10)}
				setThisData={setThisData}
				setState={setState}
				type={"all"}
				criteria={{
					limit:
						subActive === 1
							? general?.month_paginate?.limit
							: subActive === 0
							? general?.day_paginate?.limit
							: general?.paginate?.limit,
					search: search ? search : "",
					streamline,
				}}
			/>

			<>
				{page !== "dashboard" && (
					<>
						<BottomTab
							state={state}
							paginate={
								general?.isFound
									? general?.search_paginate
									: subActive === 1
									? general?.month_paginate
									: subActive === 0
									? general?.day_paginate
									: general?.paginate
							}
						/>
						<LoadMore
							next={
								general?.isFound
									? general?.search_paginate?.next
									: subActive === 1
									? general?.month_paginate?.next
									: subActive === 0
									? general?.day_paginate?.next
									: general?.paginate?.next
							}
							handleLoadMore={handleLoadMore}
							loading={loading}
						/>
					</>
				)}
			</>
			<TransactionDetails
				type={"all"}
				criteria={{
					limit:
						subActive === 1
							? general?.month_paginate?.limit
							: subActive === 0
							? general?.day_paginate?.limit
							: general?.paginate?.limit,
					search: search ? search : "",
					streamline,
				}}
				thisData={thisData}
				setThisData={setThisData}
			/>
			<FindDetails
				isOpen={isOpen}
				back={toggle}
				state={stateFilter}
				textChange={textChange}
				handleFind={handleFind}
				loading={loadingFilter}
				filter
			/>
		</>
	);
};

export const SubMyTransactionsFolder = ({ subActive = 0 }) => {
	const { general, getReload, getDataHistory } = useContext(GlobalState);

	let [loading2, setLoading2] = useState(false),
		{ page } = useParams(),
		[streamline, setStreamline] = useState(""),
		[search2, setSearch2] = useState(""),
		[state2, setState2] = useState(null),
		[thisData, setThisData] = useState(null);

		useEffect(() => {
			getDataHistory({streamline},"all");
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [streamline]);

	useEffect(() => {
		if (search2) {
			document.getElementById("Search").addEventListener("search", () => {
				getReload();
			});
			let handleSubmit = async () => {
				if (!search2) return;

				await getDataHistory(
					{
						search: search2,
					},
					"all"
				);
			};
			handleSubmit();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search2]);

	useEffect(() => {
		if (general?.my_isFound) setState2(general?.my_mainSearch);
		else
			setState2(
				subActive === 1
					? general?.month_my_transactions
					: subActive === 0
					? general?.day_my_transactions
					: general.my_transactions
			);
		if (subActive === 1) {
			setStreamline("month");
		}
		if (subActive === 0) {
			setStreamline("day");
		}
		if (subActive === 1) {
			setStreamline("");
		}
	}, [
		general.my_transactions,
		general.day_my_transactions,
		general.month_my_transactions,
		general.my_isFound,
		general.my_mainSearch,
		subActive,
	]);

	useEffect(() => {
		getReload();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let handleLoadMore2 = async () => {
		setLoading2(true);
		if (search2) {
			await getDataHistory(
				{
					limit: Number(
						general?.my_search_paginate?.nextPage *
							general?.my_search_paginate?.limit
					),
					search: search2,
					streamline,
				},
				"all"
			);
		} else
			await getDataHistory(
				{
					limit:
						subActive === 1
							? Number(
									general?.month_my_paginate?.nextPage *
										general?.month_my_paginate?.limit
							  )
							: subActive === 0
							? Number(
									general?.day_my_paginate?.nextPage *
										general?.day_my_paginate?.limit
							  )
							: Number(
									general?.my_paginate?.nextPage * general?.my_paginate?.limit
							  ),
					streamline,
				},
				"all"
			);

		setLoading2(false);
	};

	if (!state2) return <></>;

	return (
		<>
			{page !== "dashboard" && (
				<>
					<div className="w-50 w50">
						<input
							type="search"
							name="search"
							id="Search"
							className="form-control w-100 py-3 borderColor2"
							placeholder="Type here to search"
							value={search2}
							onChange={e => setSearch2(e.target.value)}
						/>
					</div>
				</>
			)}
			<NewPaginate
				state={page !== "dashboard" ? state2 : state2?.slice(0, 10)}
				setThisData={setThisData}
				setState={setState2}
				type={""}
				criteria={{
					limit:
						subActive === 1
							? general?.month_my_paginate?.limit
							: subActive === 0
							? general?.day_my_paginate?.limit
							: general?.my_paginate?.limit,
					search: search2 ? search2 : "",
					streamline,
				}}
			/>

			<>
				{page !== "dashboard" && (
					<>
						<BottomTab
							state={state2}
							paginate={
								search2
									? general?.my_search_paginate
									: subActive === 1
									? general?.month_my_paginate
									: subActive === 0
									? general?.day_my_paginate
									: general?.my_paginate
							}
						/>
						<LoadMore
							next={
								search2
									? general?.my_search_paginate?.next
									: subActive === 1
									? general?.month_my_paginate?.next
									: subActive === 0
									? general?.day_my_paginate?.next
									: general?.my_paginate?.next
							}
							handleLoadMore={handleLoadMore2}
							loading={loading2}
						/>
					</>
				)}
			</>
			<TransactionDetails
				type={""}
				criteria={{
					limit:
						subActive === 1
							? general?.month_my_paginate?.limit
							: subActive === 0
							? general?.day_my_paginate?.limit
							: general?.my_paginate?.limit,
					search: search2 ? search2 : "",
					streamline,
				}}
				thisData={thisData}
				setThisData={setThisData}
			/>
		</>
	);
};

export const TransactionDetails = ({
	thisData,
	setThisData,
	type,
	criteria,
}) => {
	let { auth, manageTransaction, general } = useContext(GlobalState),
		[loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false);

	useEffect(() => {
		if (submit && general?.isDeleted) setThisData(false);
		if (submit && general?.isUpdated) setThisData(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [general?.isDeleted, submit, general?.isUpdated]);

	return (
		<>
			<ModalComponents
				isOpen={thisData ? true : false}
				toggle={() => setThisData(false)}
				title="Transaction details">
				<div className="downH2 d-flex flex-column">
					<PDFMode thisData={thisData} setThisData={setThisData} />
					{auth?.user?.privilege === "agent" && (
						<div className="py-2 btn-group">
							{thisData?.properties?.resData?.code === 300 ||
							!thisData?.properties?.resData ? (
								<Buttons
									title={"delete transaction"}
									css="btn btn-danger-2 btn-danger2 py-2 py-md-3 text-capitalize Lexend d-block"
									width={"mx-auto"}
									loading={loading === "mark-delete"}
									onClick={async () => {
										setLoading("mark-delete");
										await manageTransaction(
											thisData,
											type,
											criteria,
											null,
											"mark-delete"
										);
										setLoading("");
										setSubmit(true);
									}}
								/>
							) : null}
							{thisData?.properties?.resData?.code === 400 ? (
								<>
									<Buttons
										title={"fail transaction"}
										css="btn mx-md-2 btn-primary1 py-2 py-md-3 text-capitalize Lexend d-block"
										width={"mx-auto"}
										loading={loading === "mark-fail"}
										onClick={async () => {
											setLoading("mark-fail");
											await manageTransaction(
												thisData,
												type,
												criteria,
												null,
												"mark-fail"
											);
											setLoading("");
											setSubmit(true);
										}}
									/>
									<Buttons
										title={"validate transaction"}
										css="btn btn-success-2 btn-success2 py-2 py-md-3 text-capitalize Lexend d-block"
										width={"mx-auto"}
										loading={loading === "mark-success"}
										onClick={async () => {
											setLoading("mark-success");
											await manageTransaction(
												thisData,
												type,
												criteria,
												null,
												"mark-success"
											);
											setLoading("");
											setSubmit(true);
										}}
									/>
								</>
							) : null}
						</div>
					)}
				</div>
			</ModalComponents>
		</>
	);
};

const PDFMode = ({ thisData, setThisData }) => {
	let { numberWithCommas, auth, nairaSign } = useContext(GlobalState);
	let ref = useRef();
	const handlePrint = useReactToPrint({
		content: () => ref.current,
		documentTitle: `${
			process.env.REACT_APP_AGENT_NAME
		}-${thisData?.type?.toUpperCase()}-${moment(thisData.createdAt).format(
			"dddd, L"
		)}`,
		bodyClass: "p-2",
	});

	return (
		<>
			<div ref={ref}>
				<div className="printOnly d-none">
					<div className="d-flex justify-content-center flex-column bg-white">
						<img
							src={process.env.REACT_APP_IMAGE_URL}
							alt="Logo"
							className="mx-auto rounded"
							style={{ height: "70px", width: "auto" }}
						/>
						<div className="text-center">
							<h3 className="Lexend fw-bold">
								{process.env.REACT_APP_AGENT_NAME}
							</h3>
							<p className="my-0 Lexend">{thisData?.type?.toUpperCase()}</p>
							<p className="mt-0 text2Print">
								Reciept:{" "}
								<span className="fontInherit Lexend">{thisData?.item_id}</span>{" "}
							</p>
						</div>
					</div>
					<hr />
				</div>
				<p className="text-capitalize border-bottom d-flex justify-content-between printOnlyNone text2Print">
					<span className="fontInherit">Id: </span>
					<span className="fontInherit Lexend">{thisData?.item_id}</span>{" "}
				</p>
				{auth?.user?.privilege === "agent" && (
					<p className="text-capitalize border-bottom d-flex justify-content-between text2Print">
						<span className="fontInherit">reference: </span>
						<span className="fontInherit Lexend">
							{thisData?.reference}
						</span>{" "}
					</p>
				)}
				<p className="text-capitalize border-bottom d-flex justify-content-between text2Print">
					<span className="fontInherit">type: </span>
					<span className="fontInherit Lexend">{thisData?.type}</span>{" "}
				</p>
				{["Cebizpay", "Teetop Digital"]?.includes(
					process.env.REACT_APP_AGENT_NAME
				) &&
					["agent", "reseller"]?.includes(auth?.user?.privilege) && (
						<p className="text-capitalize border-bottom d-flex justify-content-between">
							<span>channel: </span>
							<span className="fontInherit Lexend text-uppercase">
								{thisData?.channel}
							</span>{" "}
						</p>
					)}
				<p className="text-capitalize border-bottom d-flex justify-content-between text2Print">
					<span className="fontInherit">date: </span>
					<span className="fontInherit Lexend">
						{moment(thisData?.createdAt).format("DD/MM/YYYY hh:mm A")}
					</span>{" "}
				</p>
				{auth?.user?.privilege === "agent" && (
					<>
						<p className="border-bottom d-flex justify-content-between text2Print">
							<span className="fontInherit">User: </span>
							<span className="fontInherit Lexend">
								<span className="fontInherit Lexend d-block text-capitalize">
									{thisData?.user?.lastName} {thisData?.user?.firstName}
								</span>{" "}
								<span className="fontInherit Lexend d-block">
									{thisData?.user?.telephone}
								</span>{" "}
								<span className="fontInherit Lexend d-block">
									{thisData?.user?.email}
								</span>{" "}
							</span>
						</p>
						{thisData?.deviceProperties && (
							<p className="border-bottom d-flex justify-content-between">
								<span className="text-capitalize">Device property: </span>
								<span>
									<span className="fontInherit Lexend d-block text-capitalize">
										OS: {thisData?.deviceProperties?.os?.name} -{" "}
										{thisData?.deviceProperties?.os?.version}
									</span>{" "}
									<span className="fontInherit Lexend d-block text-capitalize">
										client: {thisData?.deviceProperties?.client?.type} -{" "}
										{thisData?.deviceProperties?.client?.name}
									</span>{" "}
									<span className="fontInherit Lexend d-block text-capitalize">
										Device: {thisData?.deviceProperties?.device?.type} -{" "}
										{thisData?.deviceProperties?.device?.brand} -{" "}
										{thisData?.deviceProperties?.device?.model}
									</span>{" "}
									<span className="fontInherit Lexend d-block">
										IP: {thisData?.deviceProperties?.ip}
									</span>{" "}
								</span>
							</p>
						)}
					</>
				)}
				<p className="text-capitalize border-bottom d-flex justify-content-between text2Print">
					<span className="fontInherit">recipient: </span>
					<span className="fontInherit Lexend">
						{thisData?.type === "cables"
							? thisData?.properties?.smartCardNo
							: thisData?.type === "electricity"
							? thisData?.properties?.meterNo
							: thisData?.type === "airtime"
							? thisData?.properties?.phone
							: thisData?.type === "airtime_pin"
							? thisData?.properties?.name_on_card
							: thisData?.type === "education"
							? thisData?.properties?.numberOfPin
							: thisData?.type === "data"
							? thisData?.properties?.phone
							: ""}
					</span>{" "}
				</p>
				{thisData?.type !== "data" && (
					<p className="text-capitalize border-bottom d-flex justify-content-between text2Print">
						<span className="fontInherit">usage: </span>
						<span className="fontInherit Lexend">
							{thisData?.type === "cables"
								? thisData?.properties?.packagename
									? thisData?.properties?.packagename
									: thisData?.properties?.type
								: thisData?.type === "airtime" ||
								  thisData?.type === "airtime_pin"
								? thisData?.properties?.network
								: thisData?.type === "electricity"
								? thisData?.properties?.disco
								: thisData?.type === "education"
								? thisData?.properties?.type
								: thisData?.type === "data"
								? thisData?.description
								: ""}
						</span>{" "}
					</p>
				)}
				<p className="text-capitalize border-bottom d-flex justify-content-between text2Print">
					<span className="fontInherit">Amount: </span>
					<span className="fontInherit Lexend">
						{nairaSign}{" "}
						{thisData?.properties?.amount
							? numberWithCommas(
									Number(thisData?.properties?.amount).toFixed(2)
							  )
							: 0}
					</span>{" "}
				</p>
				{thisData?.prevBalance !== 0 || thisData?.balance !== 0 ? (
					<>
						<p className="text-capitalize border-bottom d-flex justify-content-between text2Print printOnlyNone">
							<span className="fontInherit">Previous Wallet balance: </span>
							<span className="fontInherit Lexend">
								{nairaSign}{" "}
								{thisData?.prevBalance
									? numberWithCommas(Number(thisData?.prevBalance).toFixed(2))
									: 0}
							</span>{" "}
						</p>
						<p className="text-capitalize border-bottom d-flex justify-content-between text2Print printOnlyNone">
							<span className="fontInherit">Current Wallet balance: </span>
							<span className="fontInherit Lexend">
								{nairaSign}{" "}
								{thisData?.balance
									? numberWithCommas(Number(thisData?.balance).toFixed(2))
									: 0}
							</span>{" "}
						</p>
					</>
				) : (
					<></>
				)}
				<p className="text-capitalize border-bottom d-flex justify-content-between text2Print">
					<span className="fontInherit">Description: </span>
					<span className="fontInherit Lexend">
						{thisData?.description}
					</span>{" "}
				</p>
				{thisData?.type === "electricity" && thisData?.status && (
					<>
						<p className="text-capitalize border-bottom d-flex justify-content-between text2Print">
							<span className="fontInherit">Token: </span>
							<span className="fontInherit Lexend">
								{thisData?.properties?.resData?.token}
							</span>{" "}
						</p>
						<p className="text-capitalize border-bottom d-flex justify-content-between text2Print">
							<span className="fontInherit">Unit(s): </span>
							<span className="fontInherit Lexend">
								{thisData?.properties?.resData?.unit}
							</span>{" "}
						</p>
					</>
				)}
				{thisData?.type === "education" && thisData?.status && (
					<>
						<p className="text-capitalize border-bottom d-flex justify-content-between">
							<span>Pin(s): </span>
							<span className="fontInherit Lexend">
								{Array?.isArray(thisData?.properties?.data_pin) ? (
									thisData?.properties?.data_pin?.map((it, i) => (
										<span className="d-block Lexend" key={i}>
											{it?.Serial || it?.pin || it?.serial ? (
												<>
													{it?.Serial || it?.serial || it?.serialNumber}
													{" : "}
													{it?.Pin || it?.pin}
												</>
											) : (
												it
											)}
										</span>
									))
								) : (
									<span className="fontInherit Lexend">
										{thisData?.properties?.data_pin?.toString()}
									</span>
								)}
							</span>{" "}
						</p>
						<p className="text-capitalize border-bottom d-flex justify-content-between">
							<span>number of pin(s): </span>
							<span className="fontInherit Lexend">
								{thisData?.properties?.numberOfPin}
							</span>{" "}
						</p>
					</>
				)}
				<p className="text-capitalize border-bottom d-flex justify-content-between text2Print">
					<span className="fontInherit">Status: </span>
					<span
						className={`${
							thisData?.status
								? "text-success text-succcess2"
								: "text-danger text-danger2"
						} fw-bold fontInherit Lexend`}>
						{thisData?.type === "data"
							? thisData?.status
								? "successful"
								: thisData?.statusText
							: thisData?.statusText}
					</span>{" "}
				</p>
				<div className="printOnly d-none">
					<div className="d-flex justify-content-center flex-column bg-white text-uppercase text-center">
						<h4 className="Lexend text2Print">Thanks for your patronage</h4>
					</div>
				</div>
			</div>
			{thisData?.type === "airtime_pin" && thisData?.status ? (
				<PDFPinMode
					thisData={thisData?.properties}
					date={thisData?.createdAt}
				/>
			) : null}
			<div className="ms-auto d-flex align-items-center">
				<button
					className="btn btn-danger btn-danger-2 btn-danger2 d-block ms-auto me-2"
					onClick={() => setThisData(false)}>
					Close
				</button>
				<button
					className="btn btn-primary1 d-block ms-auto"
					onClick={handlePrint}>
					Print
				</button>
			</div>
		</>
	);
};

const PDFPinMode = ({ thisData, date }) => {
	let { numberWithCommas, nairaSign } = useContext(GlobalState);
	let ref = useRef();
	const handlePrint = useReactToPrint({
		content: () => ref.current,
		documentTitle: `${
			process.env.REACT_APP_AGENT_NAME
		}-${thisData?.name_on_card?.toUpperCase()}-${moment(date).format(
			"dddd, L"
		)}`,
		bodyClass: "p-2",
	});

	return (
		<>
			<div ref={ref}>
				<div className="printOnly d-none">
					<div className="row mx-0 g-3">
						{thisData?.data_pin?.map((item, i) => (
							<div className="col-6 border-dash borderDashAll p-2" key={i}>
								<p className="Lexend text-center">{thisData?.name_on_card}</p>
								<div className="row mx-0 px-3 py-2">
									<div className="col-10">
										<p className="text-capitalize d-flex justify-content-between my-0">
											<span>REF: </span>
											<span className="fontInherit Lexend">
												{item?.pk}
											</span>{" "}
										</p>
										<p className="text-capitalize d-flex justify-content-between my-0">
											<span>PIN: </span>
											<span className="fontInherit Lexend">
												{item?.fields?.pin}
											</span>{" "}
										</p>
										<p className="text-capitalize d-flex justify-content-between my-0">
											<span>S/N: </span>
											<span className="fontInherit Lexend">
												{item?.fields?.serial}
											</span>{" "}
										</p>
										<p className="text-capitalize d-flex justify-content-between my-0">
											<span>Date: </span>
											<span className="fontInherit Lexend">
												{moment(date).format("MMMM DD, YYYY. hh:mm A")}
											</span>{" "}
										</p>
										<p className="text-center">{item?.fields?.load_code}</p>
									</div>
									<div className="col-2">
										<NetworkList2 state={thisData?.network} />
										<p className="text-center Lexend">
											{nairaSign}
											{numberWithCommas(item?.fields?.amount)}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className="ms-auto d-flex align-items-center py-2">
				<button
					className="btn btn-primary1 d-block ms-auto"
					onClick={handlePrint}>
					Print card
				</button>
			</div>
		</>
	);
};

export const TransactionsData = ({
	state,
	setThisData,
	setState,
	type,
	criteria,
}) => {
	const { numberWithCommas, manageTransaction, auth, nairaSign } =
			useContext(GlobalState),
		[isChecked, setIsChecked] = useState([]),
		{ page } = useParams(),
		[loading, setLoading] = useState(false);
	useEffect(() => {
		if (state) setIsChecked(state?.filter(item => item?.isCheckedFE));
	}, [state]);

	if (!state) return;
	return (
		<div className="py-5">
			{page !== "dashboard" && isChecked?.length > 0 && (
				<div className="py-2 btn-group">
					<Buttons
						title={"delete selected"}
						css="btn btn-danger-2 btn-danger2 py-2 py-md-3 text-capitalize Lexend"
						width={"auto"}
						loading={loading === "mark-delete"}
						onClick={async () => {
							setLoading("mark-delete");
							await manageTransaction(
								isChecked,
								type,
								criteria,
								"multiple",
								"mark-delete"
							);
							setLoading("");
						}}
					/>
					<Buttons
						title={"fail selected"}
						css="btn btn-primary1 py-2 py-md-3 text-capitalize Lexend mx-md-3"
						width={"auto"}
						loading={loading === "mark-fail"}
						onClick={async () => {
							setLoading("mark-fail");
							await manageTransaction(
								isChecked,
								type,
								criteria,
								"multiple",
								"mark-fail"
							);
							setLoading("");
						}}
					/>
					<Buttons
						title={"validate selected"}
						css="btn btn-success-2 btn-success2 py-2 py-md-3 text-capitalize Lexend"
						width={"auto"}
						loading={loading === "mark-success"}
						onClick={async () => {
							setLoading("mark-success");
							await manageTransaction(
								isChecked,
								type,
								criteria,
								"multiple",
								"mark-success"
							);
							setLoading("");
						}}
					/>
				</div>
			)}
			<div className="row mx-0 py-3 bland">
				<div className="col textTrunc my-auto text-uppercase fontReduce2 fw-bold Lexend">
					s/n
				</div>
				<div className="col textTrunc my-auto text-uppercase fontReduce2 fw-bold Lexend d-none d-md-flex">
					ID
				</div>
				{page === "transactions" && (
					<div className="col textTrunc my-auto text-uppercase fontReduce2 fw-bold Lexend">
						type
					</div>
				)}
				<div className="col textTrunc my-auto text-uppercase fontReduce2 fw-bold Lexend">
					usage
				</div>
				<div className="col textTrunc my-auto text-uppercase fontReduce2 fw-bold Lexend">
					recipient
				</div>
				{["Cebizpay", "Teetop Digital"]?.includes(
					process.env.REACT_APP_AGENT_NAME
				) && (
					<>
						{["agent", "reseller"]?.includes(auth?.user?.privilege) && (
							<div className="col textTrunc my-auto text-uppercase fontReduce2 fw-bold Lexend">
								channel
							</div>
						)}
					</>
				)}
				<div className="col my-auto text-uppercase fontReduce2 fw-bold Lexend d-none d-md-flex">
					date
				</div>
				<div className="col textTrunc my-auto text-uppercase fontReduce2 fw-bold Lexend">
					amount
				</div>
				<div className="col textTrunc my-auto text-uppercase fontReduce2 fw-bold Lexend">
					status
				</div>
			</div>
			{state?.length === 0 ? (
				<EmptyComponent subtitle={"User purchase history is empty"} />
			) : (
				state?.map((it, i) => (
					<div
						key={i}
						className={`row mx-0 bland2 border-bottom myCursor ${
							it?.isCheckedFE ? "list-group-item-secondary" : ""
						}`}>
						<div className="col my-auto text-capitalize fontReduce3 textTrunc py-3 py-md-4 d-flex w-100 justify-content-evenly align-items-center h-100">
							<span className="fontInherit">
								{page !== "dashboard" && (
									<>
										{auth?.user?.privilege === "agent" && !it?.status && (
											<input
												type={"checkbox"}
												className="form-control form-check-input myCursor"
												checked={it?.isCheckedFE}
												onChange={e => {
													let update = {
														...it,
														isCheckedFE: e.target.checked,
													};
													setState(
														state?.map(item =>
															item?._id === it?._id ? update : item
														)
													);
												}}
											/>
										)}
									</>
								)}
							</span>
							<span className="fontInherit">{i + 1}</span>
						</div>
						<div
							onClick={() => setThisData(it)}
							className="col my-auto text-capitalize d-none d-md-flex fontReduce2 textTrunc py-3 py-md-4 ">
							{it?.item_id}
						</div>
						{page === "transactions" && (
							<div
								onClick={() => setThisData(it)}
								className="col my-auto text-capitalize fontReduce2 textTrunc py-3 py-md-4 ">
								{it?.type}
							</div>
						)}
						<div
							onClick={() => setThisData(it)}
							className="col my-auto fontReduce2 textTrunc py-3 py-md-4 ">
							{it?.type === "cables"
								? it?.properties?.packagename
									? it?.properties?.packagename
									: it?.properties?.type
								: it?.type === "airtime" || it?.type === "airtime_pin"
								? it?.properties?.network
								: it?.type === "electricity"
								? it?.properties?.disco
								: it?.type === "education"
								? it?.properties?.type
								: it?.type === "data"
								? it?.description
								: ""}
						</div>

						<div
							onClick={() => setThisData(it)}
							className="col my-auto fontReduce2 textTrunc py-3 py-md-4 ">
							{it?.type === "cables"
								? it?.properties?.smartCardNo
								: it?.type === "electricity"
								? it?.properties?.meterNo
								: it?.type === "airtime"
								? it?.properties?.phone
								: it?.type === "airtime_pin"
								? it?.properties?.name_on_card
								: it?.type === "education"
								? it?.properties?.numberOfPin
								: it?.type === "data"
								? it?.properties?.phone
								: ""}
						</div>
						{["Cebizpay", "Teetop Digital"]?.includes(
							process.env.REACT_APP_AGENT_NAME
						) && (
							<>
								{["agent", "reseller"]?.includes(auth?.user?.privilege) && (
									<div
										onClick={() => setThisData(it)}
										className="col my-auto d-none d-md-flex textTrunc py-3 py-md-4 text-uppercase">
										{it?.channel}
									</div>
								)}
							</>
						)}
						<div
							onClick={() => setThisData(it)}
							className="col my-auto d-none d-md-flex textTrunc py-3 py-md-4 ">
							{moment(it?.createdAt).format("DD/MM/YYYY hh:mm A")}
						</div>
						<div
							onClick={() => setThisData(it)}
							className={`col my-auto fontReduce2 textTrunc d-flex w-100 text-dark py-3 py-md-4  ${
								it?.status
									? "list-group-item-success"
									: it?.properties?.resData?.code === 400
									? "list-group-item-warning"
									: "list-group-item-danger"
							}`}>
							<span className="fontInherit d-none d-md-flex me-md-1">
								{nairaSign}
							</span>{" "}
							<span className="fontInherit">
								{it?.properties?.amount
									? numberWithCommas(Number(it?.properties?.amount).toFixed(2))
									: 0}
							</span>
						</div>
						<div
							onClick={() => setThisData(it)}
							className={`col textTrunc fontReduce3 text-uppercase my-auto ${
								it?.status
									? "text-success"
									: it?.properties?.resData?.code === 400
									? "text-warning"
									: "text-danger"
							}`}>
							{it?.status
								? "successful"
								: it?.properties?.resData?.code === 400
								? "pending"
								: "failed"}
						</div>
					</div>
				))
			)}
		</div>
	);
};

export default TransactionsFolder;

export const TopFolder = ({ active = 0, setSubActive }) => {
	let { setStateName, wallet, numberWithCommas, nairaSignNeutral } =
		useContext(GlobalState);
	useEffect(() => {
		setStateName("Transactions history");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	let usersArr = [
		{
			icon: icon2,
			name: "Today's transactions",
			number: `${nairaSignNeutral}${
				wallet?.wallet_details?.transactions?.day
					? numberWithCommas(
							Number(wallet?.wallet_details?.transactions?.day).toFixed(2)
					  )
					: 0
			}`,
			color:
				"linear-gradient(90deg, rgba(228, 51, 105, 0.7) 16.14%, rgba(194, 14, 25, 0.7) 101.45%)",
		},
		{
			icon: icon3,
			name: `${moment().format("MMMM")}'s transactions`,
			number: `${nairaSignNeutral}${
				wallet?.wallet_details?.transactions?.month
					? numberWithCommas(
							Number(wallet?.wallet_details?.transactions?.month).toFixed(2)
					  )
					: 0
			}`,
			color:
				"linear-gradient(96.86deg, rgba(83, 242, 147, 0.8) 18.88%, rgba(158, 255, 0, 0.8) 125.77%)",
		},
		{
			icon: icon1,
			name: "Total Transactions",
			number: `${nairaSignNeutral}${
				wallet?.wallet_details?.transactions?.total
					? numberWithCommas(
							Number(wallet?.wallet_details?.transactions?.total).toFixed(2)
					  )
					: 0
			}`,
			color: "linear-gradient(90.18deg, #84C7DB -52.19%, #377FB6 81.92%)",
		},
	];
	let usersArr2 = [
		{
			icon: icon2,
			name: "Today's transactions",
			number: `${nairaSignNeutral}${
				wallet?.wallet_details?.transactions?.agent?.day
					? numberWithCommas(
							Number(wallet?.wallet_details?.transactions?.agent?.day).toFixed(
								2
							)
					  )
					: 0
			}`,
			color:
				"linear-gradient(90deg, rgba(228, 51, 105, 0.7) 16.14%, rgba(194, 14, 25, 0.7) 101.45%)",
		},
		{
			icon: icon3,
			name: `${moment().format("MMMM")}'s transactions`,
			number: `${nairaSignNeutral}${
				wallet?.wallet_details?.transactions?.agent?.month
					? numberWithCommas(
							Number(
								wallet?.wallet_details?.transactions?.agent?.month
							).toFixed(2)
					  )
					: 0
			}`,
			color:
				"linear-gradient(96.86deg, rgba(83, 242, 147, 0.8) 18.88%, rgba(158, 255, 0, 0.8) 125.77%)",
		},
		{
			icon: icon1,
			name: "Total Transactions",
			number: `${nairaSignNeutral}${
				wallet?.wallet_details?.transactions?.agent?.total
					? numberWithCommas(
							Number(
								wallet?.wallet_details?.transactions?.agent?.total
							).toFixed(2)
					  )
					: 0
			}`,
			color: "linear-gradient(90.18deg, #84C7DB -52.19%, #377FB6 81.92%)",
		},
	];

	return (
		<ThreeBoxBar
			list={active === 1 ? usersArr2 : usersArr}
			setSubActive={setSubActive}
		/>
	);
};

export let NewPaginate = ({ state, setThisData, setState, type, criteria }) => {
	let [range, setRange] = useState(10);

	const [itemOffset, setItemOffset] = useState(0);
	const endOffset = itemOffset + range;

	const currentItems = state.slice(itemOffset, endOffset);
	const pageCount = Math.ceil(state.length / range);

	const handlePageClick = event => {
		const newOffset = (event.selected * range) % state.length;
		setItemOffset(newOffset);
	};

	return (
		<>
			<MainRanger range={range} setRange={setRange} />
			<TransactionsData
				state={currentItems}
				setThisData={setThisData}
				setState={setState}
				type={type}
				criteria={criteria}
			/>
			<MainPaginate handlePageClick={handlePageClick} pageCount={pageCount} />
		</>
	);
};

export const MainPaginate = ({ handlePageClick, pageCount }) => (
	<ReactPaginate
		breakLabel="..."
		nextLabel=">"
		onPageChange={handlePageClick}
		pageRangeDisplayed={5}
		pageCount={pageCount}
		previousLabel="<"
		renderOnZeroPageCount={null}
		className="list-unstyled d-flex align-items-center justify-content-end py-3"
		pageClassName="mx-1 p-2 border rounded tex-capitalize text-decoration-none"
		previousClassName="text-decoration-none d-none"
		nextClassName="text-decoration-none d-none"
		activeClassName="list-group-item-primary"
	/>
);

export const MainRanger = ({ range, setRange }) => {
	let rangeArr = [10, 50, 100, 200, 500, 1000];

	return (
		<div className="py-3">
			<div className="col-3 col-md-1">
				<select
					className="form-control py-2 form-select"
					name="range"
					value={range}
					onChange={e => {
						setRange(Number(e.target.value));
					}}>
					{rangeArr?.map((item, i) => (
						<option key={i} value={item}>
							{item}
						</option>
					))}
				</select>
			</div>
		</div>
	);
};
