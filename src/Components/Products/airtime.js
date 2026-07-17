import React, { useState, useContext, useEffect } from "react";
import { Container } from "reactstrap";
import { Buttons } from "../../Utils";
import { ModalComponents } from "..";
import { GlobalState } from "../../Data/Context";
import LoadMore, { BottomTab } from "../LoadMore";
import { TransactionDetails, NewPaginate } from "../Transactions";
import { TransactionPinBox } from "./AirtimePin";

const Airtime = () => {
	let [isOpen, setIsOpen] = useState(false),
		toggle = () => {
			setIsOpen(!isOpen);
		},
		[buyActive, setBuyActive] = useState(0);

	let {
		setStateName,
		general,
		airtimes,
		buyServices,
		returnErrors,
		usecase,
		numberWithCommas,
		nairaSign,
		settings,
		wallet
	} = useContext(GlobalState);
	useEffect(() => {
		setStateName("airtime history");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let [stateData, setStateData] = useState(null);

	useEffect(() => {
		setStateData(settings?.settings);
	}, [settings?.settings]);

	const getCommission = (type, amount) => {
		switch (type) {
			case "MTN":
				return (stateData?.mtnCommission / 100) * amount;
			case "GLO":
				return (stateData?.gloCommission / 100) * amount;
			case "AIRTEL":
				return (stateData?.airtelCommission / 100) * amount;
			case "9MOBILE":
				return (stateData?.mobile9Commission / 100) * amount;
			default:
				return null;
		}
	};

	let init = {
			phone: "",
			amount: "",
			network: "",
			pin:""
		},
		[state, setState] = useState(init),
		[loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false),
		[thisData, setThisData] = useState(false),
		textChange =
			name =>
			({ target: { value } }) => {
				setState({ ...state, [name]: value });
			},
		handleSubmit = async e => {
			e?.preventDefault();
			if (Number(state?.amount) < Number(usecase?.usecase?.airtimeMini))
				return returnErrors({
					error: [
						{
							msg: `Amount cannot be less than NGN ${Number(
								usecase?.usecase?.airtimeMini
							)}`,
							param: "amount",
						},
					],
				});
			if (Number(state?.amount) > Number(usecase?.usecase?.airtimeMax))
				return returnErrors({
					error: [
						{
							msg: `Amount cannot be more than NGN ${Number(
								usecase?.usecase?.airtimeMax
							)}`,
							param: "amount",
						},
					],
				});
			setLoading(true);
			await buyServices("airtime", state);
			setLoading(false);
			setSubmit(true);
		};

	useEffect(() => {
		if (airtimes?.isAdded && submit) {
			setState(init);
			setBuyActive(0)
			setSubmit(false);
			setIsOpen(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [airtimes?.isAdded, submit]);

	useEffect(() => {
		if (state?.pin && state?.pin?.length === 4) handleSubmit();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state?.pin]);

	return (
		<div className="bg-white aboutScreen">
			<Container className="py-5">
				{usecase?.usecase?.airtime === "enable" && (
					<Buttons
						title={"buy airtime"}
						css="btn-primary1 text-capitalize py-3 px-4 px-lg-5"
						width={"w-25 w25"}
						onClick={toggle}
						style={{ borderRadius: "30px" }}
					/>
				)}
				<AirtimeHistory setThisData={setThisData} thisData={thisData} />
			</Container>
			<ModalComponents
				title="buy airtime"
				isOpen={isOpen}
				back={() => {
					setBuyActive(0);
					setState(init);
					toggle();
				}}>
				<div className="downH2 d-flex">
					{buyActive === 2 ? (
						<TransactionPinBox
							state={state}
							setState={setState}
							handleSubmit={handleSubmit}
							loading={loading}
						/>
					) : buyActive === 1 ? (
						<div className="w-100">
							<p className="text-capitalize border-bottom d-flex justify-content-between printOnlyNone">
								<span>Network: </span>
								<span className="fontInherit Lexend">
									{state?.network}
								</span>{" "}
							</p>
							<p className="text-capitalize border-bottom d-flex justify-content-between printOnlyNone">
								<span>Amount: </span>
								<span className="fontInherit Lexend">
									{nairaSign}{" "}
									{numberWithCommas(Number(state?.amount).toFixed(2))}
								</span>{" "}
							</p>
							<p className="text-capitalize border-bottom d-flex justify-content-between printOnlyNone">
								<span>Commission: </span>
								<span className="fontInherit Lexend">
									{nairaSign}{" "}
									{numberWithCommas(
										Number(
											getCommission(state?.network, state?.amount)
										).toFixed(2)
									)}
								</span>{" "}
							</p>
							<p className="text-capitalize border-bottom d-flex justify-content-between printOnlyNone">
								<span>Recipient number: </span>
								<span className="fontInherit Lexend">{state?.phone}</span>{" "}
							</p>
							<div className="d-flex justify-content-end">
								<Buttons
									title={"back"}
									css="btn-outline-primary1 text-capitalize"
									width={"w-auto"}
									onClick={() => {
										setBuyActive(0);
									}}
								/>
							</div>
							<Buttons
								title={"buy"}
								css="btn-primary1 text-capitalize py-3 w-50 my-4 mx-auto"
								width={"w-50"}
								style={{ borderRadius: "30px" }}
								loading={loading}
								onClick={
									wallet?.balance?.wallet_pin
										? () => {
												setBuyActive(2);
										  }
										: () => {
												handleSubmit();
										  }
								}
							/>
						</div>
					) : (
						<form className="w-100">
							<div className="mb-4">
								<label htmlFor="Newtwork">Network</label>
								{general?.networks?.[0]?.image ? (
									<>
										<NetworkList
											state={state?.network}
											setState={i => {
												setState({ ...state, network: i });
											}}
										/>
									</>
								) : (
									<select
										className="form-control py-3 py-md-4 text-capitalize form-select"
										name="network"
										placeholder="Network"
										value={state?.network}
										onChange={textChange("network")}
										id="network">
										<option value="">select network</option>
										{general?.networks?.map((item, i) => (
											<option value={item} key={i}>
												{item}
											</option>
										))}
									</select>
								)}
							</div>
							<div className="mb-4">
								<label htmlFor="value">Amount</label>
								<input
									type={"number"}
									placeholder="500"
									className="form-control py-3"
									value={state?.amount}
									onChange={textChange("amount")}
								/>
							</div>
							<div className="mb-4">
								<label htmlFor="telephone">Phone number</label>
								<input
									type={"tel"}
									maxLength={11}
									placeholder="08012345678"
									className="form-control py-3"
									value={state?.phone}
									onChange={textChange("phone")}
								/>
							</div>
							<Buttons
								title={"proceed"}
								css="btn-primary1 text-capitalize py-3 w-50 my-4 mx-auto"
								width={"w-50"}
								style={{ borderRadius: "30px" }}
								onClick={() => {
									if (
										Number(state?.amount) <
										Number(usecase?.usecase?.airtimeMini)
									)
										return returnErrors({
											error: [
												{
													msg: `Amount cannot be less than NGN ${Number(
														usecase?.usecase?.airtimeMini
													)}`,
													param: "amount",
												},
											],
										});
									if (
										Number(state?.amount) > Number(usecase?.usecase?.airtimeMax)
									)
										return returnErrors({
											error: [
												{
													msg: `Amount cannot be more than NGN ${Number(
														usecase?.usecase?.airtimeMax
													)}`,
													param: "amount",
												},
											],
										});
									setBuyActive(1);
								}}
							/>
						</form>
					)}
				</div>
			</ModalComponents>
		</div>
	);
};

export default Airtime;

const AirtimeHistory = ({ setThisData, thisData }) => {
	let { airtimes, getServicesHistory, getReload } = useContext(GlobalState);

	let [data, setData] = useState(null);

	let [loading, setLoading] = useState(false),
		[search, setSearch] = useState("");

		useEffect(() => {
			getServicesHistory("airtime");
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, []);

	useEffect(() => {
		if (search) {
			document.getElementById("Search").addEventListener("search", () => {
				getReload();
			});
			let handleSubmit = async () => {
				if (!search) return;

				await getServicesHistory("airtime", {
					search,
				});
			};
			handleSubmit();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search]);

	useEffect(() => {
		if (airtimes.isFound) {
			setData(airtimes.mainSearch);
		} else setData(airtimes.airtime);
	}, [airtimes.airtime, airtimes.isFound, airtimes.mainSearch]);

	useEffect(() => {
		getReload();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let handleLoadMore = async () => {
		setLoading(true);

		if (search) {
			await getServicesHistory("airtime", {
				limit: Number(airtimes?.paginate?.nextPage * airtimes?.paginate?.limit),
				search,
			});
		} else {
			await getServicesHistory("airtime", {
				limit: Number(airtimes?.paginate?.nextPage * airtimes?.paginate?.limit),
			});
		}
		setLoading(false);
	};

	if (!data) return;
	// console.log({ data });

	return (
		<div className="py-5">
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
			<NewPaginate
				state={data}
				setState={setData}
				setThisData={setThisData}
				type={"airtime"}
				criteria={
					{
						// id: params?.step,
					}
				}
			/>
			<TransactionDetails
				thisData={thisData}
				setThisData={setThisData}
				type={"airtime"}
				criteria={
					{
						// id: params?.step,
					}
				}
			/>
			<BottomTab
				state={data}
				paginate={search ? airtimes?.search_paginate : airtimes?.paginate}
			/>
			<LoadMore
				next={
					search ? airtimes?.search_paginate?.next : airtimes?.paginate?.next
				}
				handleLoadMore={handleLoadMore}
				loading={loading}
			/>
		</div>
	);
};

export const NetworkList = ({ state, setState }) => {
	let { general } = useContext(GlobalState);
	return (
		<div className="row mx-0">
			{general?.networks?.map((item, i) => (
				<div className="col p-2" onClick={() => setState(item?.name)} key={i}>
					<div
						style={{
							height: "5rem",
							width: "5rem",
						}}
						className={`rounded d-flex ${
							state === item?.name
								? "borderColor borderColor2 list-group-item-primary"
								: ""
						}`}>
						<img
							src={item?.image?.url}
							alt={item?.image?.name}
							className="img-fluid imgFluid h-75 w-75 m-auto"
						/>
					</div>
				</div>
			))}
		</div>
	);
};

export const NetworkList2 = ({ state }) => {
	let { general } = useContext(GlobalState);
	return (
		<div
			style={{
				height: "5rem",
				width: "5rem",
			}}
			className={`rounded d-flex`}>
			<img
				src={
					general?.networks?.find?.(item => state === item?.name)?.image?.url
				}
				alt={
					general?.networks?.find?.(item => state === item?.name)?.image?.name
				}
				className="img-fluid imgFluid h-75 w-75 m-auto"
			/>
		</div>
	);
};

export const DataNetworkList = ({
	state,
	setState,
	location = "main_data",
}) => {
	let { data } = useContext(GlobalState);
	return (
		<div className="row mx-0">
			{[...new Set(data?.[location]?.map(item => item?.name))]
				?.sort()
				?.reverse()
				?.map((item, i) => (
					<DataLister setState={setState} state={state} item={item} key={i} />
				))}
		</div>
	);
};

let DataLister = ({ item, setState, state }) => {
	let { general } = useContext(GlobalState),
		[list, setList] = useState(null);

	useEffect(() => {
		setList(
			general?.networks?.find(i =>
				item?.toLowerCase()?.includes(i?.name?.toLowerCase())
			)
		);
	}, [item, general]);

	if (!list) return;

	return (
		<div className="col-3 p-2" onClick={() => setState(item)}>
			<div
				style={{
					height: "3.5rem",
					width: "3.5rem",
				}}
				className={`rounded d-flex ${
					state === item
						? "borderColor borderColor2 list-group-item-primary"
						: ""
				}`}>
				<img
					src={list?.image?.url}
					alt={list?.image?.name}
					className="img-fluid imgFluid h-75 w-75 m-auto"
				/>
			</div>
			{item && (
				<small className="Lexend text-uppercase text-center">
					{item?.includes("_") ? item?.slice(item?.indexOf("_") + 1) : item}
				</small>
			)}
		</div>
	);
};
