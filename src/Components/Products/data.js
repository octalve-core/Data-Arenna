import React, { useContext, useEffect, useState } from "react";
import { Container } from "reactstrap";
import { ModalComponents } from "../../Components";
import { Buttons } from "../../Utils";
import moment from "moment";
import { GlobalState } from "../../Data/Context";
import LoadMore, { BottomTab } from "../LoadMore";
import { TransactionDetails, NewPaginate } from "../Transactions";
import { BiEditAlt, BiTrashAlt } from "react-icons/bi";
import { DataNetworkList } from "./airtime";
import { TransactionPinBox } from "./AirtimePin";

const Data = () => {
	// let dataSortTab = [
	// 	{
	// 		name: "data history",
	// 		type: "button",
	// 		link: `detail`,
	// 	},
	// 	{ name: "mtn" },
	// 	{ name: "glo" },
	// 	{ name: "airtel" },
	// 	{ name: "9mobile" },
	// 	// { name: "vodafone" },
	// 	// { name: "multilinks" },
	// ];
	// let dataTab = [
	// 	{ name: "buy data", type: "button", link: "transfer" },
	// 	// { name: "data pin", type: "button", link: "pin" },
	// 	dataSortTab[0],
	// ];

	let { setStateName, auth, usecase } = useContext(GlobalState),
		[active, setActive] = useState(0),
		btnTab = ["data history", "data list"];
	useEffect(() => {
		setStateName(active === 2 ? "Main Data List" : btnTab[active]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [active]);
	let [isNew, setIsNew] = useState(false),
		[isPin, setIsPin] = useState(false),
		[isEdit, setIsEdit] = useState(false),
		[isBuy, setIsBuy] = useState(false),
		[isMake, setIsMake] = useState(false),
		[thisData, setThisData] = useState(false),
		[isTransfer, setIsTransfer] = useState(false),
		[isDelete, setIsDelete] = useState(false),
		toggleNew = () => {
			if (isMake) setIsMake(false);
			if (isEdit) setIsEdit(false);
			setIsNew(!isNew);
		},
		togglePin = () => {
			setIsPin(!isPin);
		},
		toggleTransfer = () => {
			setIsTransfer(!isTransfer);
			if (isBuy) setIsBuy(false);
		},
		toggleDelete = () => {
			setIsDelete(!isDelete);
		};

	useEffect(() => {
		if (isEdit) {
			setIsNew(true);
		}
	}, [isEdit]);
	useEffect(() => {
		if (isBuy) {
			setIsTransfer(true);
		}
	}, [isBuy]);
	useEffect(() => {
		if (isMake) {
			setIsNew(true);
		}
	}, [isMake]);
	return (
		<div className="bg-white aboutScreen">
			<Container className="py-5">
				{/* <div className="row mx-0 g-2 g-md-3">
					{dataTab?.map((it, i) => (
						<div className="col-6 col-md-4 p-1 p-md-3" key={i}>
							<button
								style={{ borderRadius: "30px" }}
								key={i}
								onClick={() => {
									if (it?.type === "button") {
										if (it?.link === "pin") togglePin();
										if (it?.link === "transfer") toggleTransfer();
										if (it?.link === "detail") setActive(1);
									}
								}}
								className="btn btn-outline-primary1 py-2 py-md-3 text-capitalize w-100 textTrunc">
								<span className="textTrunc">{it?.name}</span>
							</button>
						</div>
					))}
				</div> */}
				<div className="row mx-0">
					<div className="col d-flex">
						{usecase?.usecase?.data === "enable" && (
							<Buttons
								title={"buy data"}
								css="btn-primary1 text-capitalize p-2 py-md-3 px-md-5 fontReduce"
								width={"w-50 w50"}
								onClick={toggleTransfer}
								style={{ borderRadius: "30px" }}
							/>
						)}
					</div>
					{auth?.user?.privilege === "agent" && (
						<div className="col d-flex justify-content-end">
							<Buttons
								title={"add new data"}
								css="btn-outline-primary1 text-capitalize p-2 py-md-3 px-md-5 fontReduce"
								width={"w-50 w50"}
								onClick={toggleNew}
								style={{ borderRadius: "30px" }}
							/>
						</div>
					)}
				</div>
				<div className="btn-group w-100 py-3">
					{btnTab?.map((item, i) => (
						<button
							key={i}
							className={`btn py-3 text-capitalize fw-bold ${
								i === active ? "border-bottom textColor" : ""
							} rounded-0`}
							onClick={() => setActive(i)}>
							{item}
						</button>
					))}
					{auth?.user?.privilege === "agent" && (
						<button
							className={`btn py-3 text-capitalize fw-bold ${
								active === 2 ? "border-bottom textColor" : ""
							} rounded-0`}
							onClick={() => setActive(2)}>
							Main Data List
						</button>
					)}
				</div>
				<h4 className="text-capitalize my-3 Lexend">
					{active === 2
						? `main data List`
						: active === 1
						? "data list"
						: "data history"}
				</h4>
				{active === 2 ? (
					<MainDataList setIsMake={setIsMake} />
				) : active === 1 ? (
					<DataList
						setIsEdit={setIsEdit}
						setIsBuy={setIsBuy}
						setIsDelete={setIsDelete}
					/>
				) : (
					<TransferHistory
						active={active}
						setThisData={setThisData}
						thisData={thisData}
					/>
				)}
			</Container>
			<MakePin isOpen={isPin} back={togglePin} />
			<MakeNew
				isOpen={isNew}
				back={toggleNew}
				datum={isMake || isEdit}
				setIsEdit={setIsEdit}
			/>
			<MakeTransfer isOpen={isTransfer} back={toggleTransfer} datum={isBuy} />
			<MakeDelete isDelete={isDelete} back={toggleDelete} />
		</div>
	);
};

export default Data;

const MakeTransfer = ({ isOpen, back, datum }) => {
	const {
		data,
		general,
		buyServices,
		auth,
		numberWithCommas,
		usecase,
		returnErrors,
		nairaSign,
		wallet,
	} = useContext(GlobalState);
	let [state, setState] = useState(null),
		init = {
			network: "",
			planId: "",
			phone: "",
			amount: "",
			name: "",
			pin: "",
		},
		[buy, setBuy] = useState(init),
		[loading, setLoading] = useState(false),
		[type, setType] = useState([]),
		[submit, setSubmit] = useState(false),
		textChange =
			name =>
			({ target: { value } }) => {
				setBuy({ ...buy, [name]: value });
			},
		[buyActive, setBuyActive] = useState(0);

	useEffect(() => {
		if (datum) {
			setBuy({ ...buy, ...datum });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [datum]);
	// console.log({ datum });
	useEffect(() => {
		if (buy?.name) {
			let newOne = data?.main_data
				?.sort((a, b) => a?.price - b?.price)
				?.filter(
					item => item?.name?.toLowerCase() === buy?.name?.toLowerCase()
				);
			setType(newOne);
		}
	}, [buy?.name, data?.main_data]);
	// useEffect(() => {
	// 	if (buy?.network) {
	// 		let newOne = data?.main_data?.filter(
	// 			item => item?.network?.toLowerCase() === buy?.network?.toLowerCase()
	// 		);
	// 		setType(newOne);
	// 	}
	// }, [buy?.network, data?.main_data]);

	useEffect(() => {
		setState(data?.main_data);
	}, [data?.main_data]);

	let handleSubmit = async e => {
		e?.preventDefault();
		if (!buy?.phone) return;
		setLoading(true);
		await buyServices("data", buy);
		setLoading(false);
		setSubmit(true);
	};

	useEffect(() => {
		if (submit && data?.isAdded) {
			back();
			setState(init);
			setSubmit(false);
			setBuyActive(0);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, data?.isAdded]);

	useEffect(() => {
		if (buy?.name && buy?.planId) {
			let item = data?.main_data?.find(
				item =>
					item?.name?.toLowerCase() === buy?.name?.toLowerCase() &&
					Number(item?.planId) === Number(buy?.planId)
			);

			let price = item?.price;
			if (auth?.user?.privilege === "agent") price = item?.provider_price;
			if (auth?.user?.privilege === "topuser")
				price = item?.topuser_price ? item?.topuser_price : item?.price;
			if (auth?.user?.privilege === "reseller")
				price = item?.reseller_price ? item?.reseller_price : item?.price;
			setBuy({
				...buy,
				amount: price,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [buy?.name, buy?.planId, data?.main_data, auth?.user]);

	useEffect(() => {
		if (buy?.pin && buy?.pin?.length === 4) handleSubmit();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [buy?.pin]);

	if (!state) return <></>;

	return (
		<>
			<ModalComponents
				title="buy data"
				isOpen={isOpen}
				back={() => {
					setBuyActive(0);
					setBuy(init);
					back();
				}}>
				<div className="downH2 d-flex">
					{buyActive === 2 ? (
						<TransactionPinBox
							state={buy}
							setState={setBuy}
							handleSubmit={handleSubmit}
							loading={loading}
						/>
					) : buyActive === 1 ? (
						<>
							<>
								<div className="w-100">
									<p className="text-capitalize border-bottom d-flex justify-content-between printOnlyNone">
										<span>Network: </span>
										<span className="fontInherit Lexend">
											{buy?.network}
										</span>{" "}
									</p>
									<p className="text-capitalize border-bottom d-flex justify-content-between printOnlyNone">
										<span>Category: </span>
										<span className="fontInherit Lexend">
											{/* {buy?.name} */}
											{buy?.name?.includes("_") ? (
												<>{buy?.name?.replace("_", " [")}]</>
											) : (
												buy?.name
											)}
										</span>{" "}
									</p>
									<p className="text-capitalize border-bottom d-flex justify-content-between printOnlyNone">
										<span>Plan: </span>
										<span className="fontInherit Lexend">
											{
												type?.find(item => item?.planId === buy?.planId)
													?.allowance
											}
											{" | "}
											{
												type?.find(item => item?.planId === buy?.planId)
													?.validity
											}
										</span>{" "}
									</p>
									<p className="text-capitalize border-bottom d-flex justify-content-between printOnlyNone">
										<span>Amount: </span>
										<span className="fontInherit Lexend">
											{nairaSign}{" "}
											{numberWithCommas(Number(buy?.amount).toFixed(2))}
										</span>{" "}
									</p>
									<p className="text-capitalize border-bottom d-flex justify-content-between printOnlyNone">
										<span>Recipient number: </span>
										<span className="fontInherit Lexend">
											{buy?.phone}
										</span>{" "}
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
										css="btn-primary1 text-capitalize py-3 px-4 px-lg-5 mx-auto"
										width={"w-50 w50"}
										onClick={
											wallet?.balance?.wallet_pin
												? () => {
														setBuyActive(2);
												  }
												: () => {
														handleSubmit();
												  }
										}
										loading={loading}
										style={{ borderRadius: "30px" }}
									/>
								</div>
							</>
						</>
					) : (
						<form className="w-100">
							<div className="mb-4">
								<label htmlFor="Network">Network</label>
								{general?.networks?.[0]?.image ? (
									<>
										<DataNetworkList
											state={buy?.name}
											setState={i => {
												setBuy({ ...buy, name: i });
											}}
										/>
									</>
								) : (
									<select
										name="name"
										id="name"
										value={buy?.name}
										onChange={textChange("name")}
										className="form-control form-select py-3 rounded20">
										<option value="">Select type</option>
										{[...new Set(data?.data_direct?.map(item => item?.name))]
											?.sort()
											?.reverse()
											?.map((item, i) => (
												<option value={item} key={i}>
													{item?.includes("_") ? (
														<>{item?.replace("_", " [")}]</>
													) : (
														item
													)}
												</option>
											))}
									</select>
								)}
							</div>
							{buy?.name && (
								<div className="mb-4">
									<label htmlFor="value">Value</label>
									<select
										name="value"
										id="value"
										value={buy?.planId}
										onChange={textChange("planId")}
										className="form-control form-select py-3 rounded20">
										<option value="">Select value</option>
										{type?.map((item, i) => (
											<option value={item?.planId} key={i}>
												{
													data?.data_direct?.find(
														list =>
															list?.name?.toLowerCase() ===
																item?.name?.toLowerCase() &&
															Number(list?.planId) === Number(item?.planId)
													)?.allowance
												}{" "}
												{
													data?.data_direct?.find(
														list =>
															list?.name?.toLowerCase() ===
																item?.name?.toLowerCase() &&
															Number(list?.planId) === Number(item?.planId)
													)?.validity
												}
											</option>
										))}
									</select>
								</div>
							)}
							{buy?.name && buy?.planId && (
								<div className="mb-4">
									<label htmlFor="telephone">Amount</label>
									<input
										type={"number"}
										placeholder="300"
										readOnly
										className="form-control py-3"
										value={buy?.amount}
										onChange={textChange("amount")}
									/>
								</div>
							)}
							<div className="mb-4">
								<label htmlFor="telephone">Phone number</label>
								<input
									type={"tel"}
									maxLength={11}
									placeholder="300"
									className="form-control py-3"
									value={buy?.phone}
									onChange={textChange("phone")}
								/>
							</div>
							<Buttons
								title={"proceed"}
								css="btn-primary1 text-capitalize py-3 px-4 px-lg-5 mx-auto"
								width={"w-50 w50"}
								onClick={() => {
									if (!buy?.phone) return;
									setBuy({
										...buy,
										network: buy?.name?.includes("_")
											? buy?.name?.slice(0, buy?.name?.indexOf("_"))
											: buy?.name,
									});
									let enabler = "enable";
									if (buy?.name?.toUpperCase() === "MTN_SME") {
										if (usecase?.usecase?.mtnSme !== "enable")
											enabler = "disable";
									}
									if (buy?.name?.toUpperCase() === "MTN_SME2") {
										if (usecase?.usecase?.mtnSme2 !== "enable")
											enabler = "disable";
									}
									if (buy?.name?.toUpperCase() === "MTN_SME_2") {
										if (usecase?.usecase?.mtnSme2 !== "enable")
											enabler = "disable";
									}
									if (buy?.name?.toUpperCase() === "MTN_DG") {
										if (usecase?.usecase?.mtnDg !== "enable")
											enabler = "disable";
									}
									if (buy?.name?.toUpperCase() === "MTN_CG") {
										if (usecase?.usecase?.mtnCg !== "enable")
											enabler = "disable";
									}
									if (buy?.name?.toUpperCase() === "AIRTEL_DG") {
										if (usecase?.usecase?.airtelDg !== "enable")
											enabler = "disable";
									}
									if (buy?.name?.toUpperCase() === "AIRTEL_CG") {
										if (usecase?.usecase?.airtelCg !== "enable")
											enabler = "disable";
									}
									if (buy?.name?.toUpperCase() === "AIRTEL_SME") {
										if (usecase?.usecase?.airtelSme !== "enable")
											enabler = "disable";
									}
									if (buy?.name?.toUpperCase() === "GLO_CG") {
										if (usecase?.usecase?.gloCg !== "enable")
											enabler = "disable";
									}
									if (buy?.name?.toUpperCase() === "GLO_DG") {
										if (usecase?.usecase?.gloDg !== "enable")
											enabler = "disable";
									}
									if (buy?.name?.toUpperCase() === "GLO_SME") {
										if (usecase?.usecase?.gloSme !== "enable")
											enabler = "disable";
									}
									if (buy?.name?.toUpperCase() === "GLO") {
										if (usecase?.usecase?.gloNormal !== "enable")
											enabler = "disable";
									}
									if (buy?.name?.toUpperCase() === "9MOBILE") {
										if (usecase?.usecase?.mobile9Normal !== "enable")
											enabler = "disable";
									}
									if (buy?.name?.toUpperCase() === "9MOBILE_CG") {
										if (usecase?.usecase?.mobile9CG !== "enable")
											enabler = "disable";
									}
									if (buy?.name?.toUpperCase() === "9MOBILE_DG") {
										if (usecase?.usecase?.mobile9DG !== "enable")
											enabler = "disable";
									}
									if (buy?.name?.toUpperCase() === "9MOBILE_SME") {
										if (usecase?.usecase?.mobile9Sme !== "enable")
											enabler = "disable";
									}

									if (enabler !== "enable")
										return returnErrors({
											error: [
												{
													msg: `This service is currently not available, please try other ${
														buy?.name?.includes("_")
															? buy?.name?.slice(0, buy?.name?.indexOf("_"))
															: buy?.name
													} options`,
													param: buy?.name,
												},
											],
										});

									setBuyActive(1);
								}}
								style={{ borderRadius: "30px" }}
							/>
						</form>
					)}
				</div>
			</ModalComponents>
		</>
	);
};

const MakePin = ({ isOpen, back }) => {
	return (
		<>
			<ModalComponents title="data pin" isOpen={isOpen} back={back}>
				<div className="downH2 d-flex">
					<form className="w-100">
						<div className="mb-4">
							<label htmlFor="Newtwork">Network</label>
							<select
								name="network"
								id="network"
								className="form-control form-select py-3 rounded20">
								<option value="mtn">MTN</option>
							</select>
						</div>
						<div className="mb-4">
							<label htmlFor="value">Value</label>
							<input
								type={"number"}
								placeholder="500"
								className="form-control py-3"
							/>
						</div>
						<Buttons
							title={"get pin"}
							css="btn-primary1 text-capitalize py-3 px-4 px-lg-5"
							width={"w-50 w50"}
							onClick={back}
							style={{ borderRadius: "30px" }}
						/>
					</form>
				</div>
			</ModalComponents>
		</>
	);
};

const MakeNew = ({ isOpen, back, datum, setIsEdit }) => {
	const { general, data, dataServices, returnErrors } = useContext(GlobalState);
	let [type, setType] = useState([]),
		init = {
			network: "",
			planId: "",
			price: "",
			reseller_price: "",
			topuser_price: "",
			provider_price: "",
			enabler: "enable",
			name: "",
		},
		[loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false),
		[state, setState] = useState(init),
		[shouldEdit, setShouldEdit] = useState(false),
		textChange =
			name =>
			({ target: { value } }) => {
				setState({ ...state, [name]: value });
			};

	useEffect(() => {
		if (datum) {
			let newFind = data?.main_data?.find(
				list =>
					list?.network?.toLowerCase() === datum?.network?.toLowerCase() &&
					Number(list?.planId) === Number(datum?.planId)
			);
			if (newFind) {
				setShouldEdit(true);
				setState({ ...state, ...newFind });
			} else {
				setState({ ...state, ...datum });
				setShouldEdit(false);
			}
			console.log({ datum, newFind });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [datum, data?.main_data]);

	useEffect(() => {
		setShouldEdit(false);
	}, []);
	// console.log({ datum, shouldEdit });
	useEffect(() => {
		if (state?.network && !state?.name) {
			let newOne = data?.data_direct?.filter(
				item => item?.network?.toLowerCase() === state?.network?.toLowerCase()
			);
			setType(newOne);
		}
	}, [state?.network, data?.data_direct, state?.name]);

	useEffect(() => {
		if (state?.name) {
			let newOne = data?.data_direct?.filter(
				item => item?.name?.toLowerCase() === state?.name?.toLowerCase()
			);
			setType(newOne);
		}
	}, [data?.data_direct, state?.name]);

	useEffect(() => {
		if (state?.planId) {
			let newOne = type?.find(
				item => Number(item?.planId) === Number(state?.planId)
			);
			// console.log({newOne, type});
			setState({ ...state, provider_price: newOne?.price });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state?.planId, type]);

	useEffect(() => {
		if (state?.name) {
			setState({
				...state,
				network: state?.name?.includes("_")
					? state?.name?.slice(0, state?.name?.indexOf("_"))
					: state?.name,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state?.name]);
	// console.log({ state });

	let handleSubmit = async e => {
		e?.preventDefault();
		if (!state?.price) return;
		if (Number(state?.price) <= 0)
			return returnErrors({
				error: [
					{
						msg: "Price cannot be less than or equal to NGN 0",
						param: "price",
					},
				],
			});
		if (state?.reseller_price && Number(state?.reseller_price) <= 0)
			return returnErrors({
				error: [
					{
						msg: "Reseller Price cannot be less than or equal to NGN 0",
						param: "reseller_price",
					},
				],
			});
		if (state?.topuser_price && Number(state?.topuser_price) <= 0)
			return returnErrors({
				error: [
					{
						msg: "Topuser Price cannot be less than or equal to NGN 0",
						param: "topuser_price",
					},
				],
			});
		setLoading(true);
		await dataServices(shouldEdit ? "put" : "post", state);
		setLoading(false);
		setSubmit(true);
	};

	useEffect(() => {
		if (submit && data?.isAddedMain) {
			setIsEdit(false);
			back();
			setState(init);
			setSubmit(false);
		}
		if (submit && data?.isUpdatedMain) {
			setIsEdit(false);
			back();
			setState(init);
			setSubmit(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, data?.isAddedMain, data?.isUpdatedMain]);

	return (
		<>
			<ModalComponents
				title={`${shouldEdit ? "edit" : "new"} data type`}
				isOpen={isOpen}
				back={() => {
					setShouldEdit(false);
					setState(init);
					back();
				}}>
				<div className="downH2 d-flex">
					<form className="w-100">
						<div className="mb-4">
							<label htmlFor="Network">Network</label>
							{general?.networks?.[0]?.image ? (
								<>
									<DataNetworkList
										state={state?.name}
										setState={
											shouldEdit
												? () => {}
												: i => {
														setState({ ...state, name: i });
												  }
										}
										location="data_direct"
									/>
								</>
							) : (
								<select
									name="network"
									id="network"
									value={state?.network}
									readOnly={shouldEdit}
									onChange={textChange("network")}
									className="form-control form-select py-3 rounded20">
									<option value="">Select type</option>
									{general?.networks?.map((item, i) => (
										<option value={item} key={i}>
											{item}
										</option>
									))}
								</select>
							)}
						</div>
						{state?.network && (
							<div className="mb-4">
								<label htmlFor="Type">Type</label>
								<select
									name="network"
									id="network"
									readOnly={shouldEdit}
									value={state?.planId}
									onChange={textChange("planId")}
									className="form-control form-select py-3 rounded20">
									<option value="">Select type</option>
									{type?.map((item, i) => (
										<option value={item?.planId} key={i}>
											{
												data?.data_direct?.find(
													list =>
														list?.network?.toLowerCase() ===
															item?.network?.toLowerCase() &&
														Number(list?.planId) === Number(item?.planId)
												)?.allowance
											}{" "}
											{item?.validity}
										</option>
									))}
								</select>
							</div>
						)}
						{state?.planId && (
							<div className="mb-4">
								<label htmlFor="value">Provider price</label>
								<input
									type={"number"}
									readOnly
									value={state?.provider_price}
									onChange={textChange("provider_price")}
									placeholder="500"
									className="form-control py-3"
								/>
							</div>
						)}
						<div className="mb-4">
							<label htmlFor="value">Price</label>
							<input
								type={"number"}
								placeholder="500"
								value={state?.price}
								onChange={textChange("price")}
								className="form-control py-3"
							/>
						</div>
						<div className="mb-4">
							<label htmlFor="value">Reseller Price</label>
							<input
								type={"number"}
								placeholder="500"
								value={state?.reseller_price}
								onChange={textChange("reseller_price")}
								className="form-control py-3"
							/>
						</div>
						<div className="mb-4">
							<label htmlFor="value">Topuser Price</label>
							<input
								type={"number"}
								placeholder="500"
								value={state?.topuser_price}
								onChange={textChange("topuser_price")}
								className="form-control py-3"
							/>
						</div>
						{shouldEdit && (
							<div className="mb-4">
								<label htmlFor="value">Enable/Disable</label>
								<select
									type="number"
									name="Price"
									className="form-control w-100 py-3 borderColor form-select"
									placeholder="Enable"
									value={state?.enabler}
									onChange={textChange("enabler")}>
									<option value="">Select one</option>
									<option value="enable">Enabled</option>
									<option value="disable">Disabled</option>
								</select>
							</div>
						)}
						<Buttons
							title={shouldEdit ? "update" : "add"}
							css="btn-primary1 text-capitalize py-3 px-4 px-lg-5 mx-auto"
							width={"w-50 w50"}
							onClick={handleSubmit}
							loading={loading}
							style={{ borderRadius: "30px" }}
						/>
					</form>
				</div>
			</ModalComponents>
		</>
	);
};

const MakeDelete = ({ isDelete, back }) => {
	let { dataServices, data } = useContext(GlobalState);
	let [loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false),
		handleSubmit = async e => {
			e?.preventDefault();
			setLoading(true);
			await dataServices("delete", isDelete);
			setLoading(false);
			setSubmit(true);
		};

	useEffect(() => {
		if (submit && data?.isDeletedMain) {
			back();
			setSubmit(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, data?.isDeletedMain]);

	return (
		<>
			<ModalComponents
				title={"Delete plan"}
				isOpen={isDelete ? true : false}
				back={back}>
				<div className="downH2 d-flex">
					<div className="my-auto w-100">
						<p className="text-center">
							Do you want to delete this {isDelete?.network} data plan?
						</p>
						<div className="d-flex w-100">
							<Buttons
								loading={loading}
								title="confirm"
								onClick={handleSubmit}
								css="btn-primary1 text-capitalize py-3 w-50 my-4 mx-auto"
								width={"w-50"}
							/>
						</div>
					</div>
				</div>
			</ModalComponents>
		</>
	);
};

const TransferHistory = ({ setThisData, thisData }) => {
	const { data, getServicesHistory, getReload } = useContext(GlobalState);
	let [state, setState] = useState(null);

	let [loading, setLoading] = useState(false),
		[search, setSearch] = useState("");

		useEffect(() => {
			getServicesHistory("data");
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, []);

	useEffect(() => {
		if (search) {
			document.getElementById("Search").addEventListener("search", () => {
				getReload();
			});
			let handleSubmit = async () => {
				if (!search) return;

				await getServicesHistory("data", {
					search,
				});
			};
			handleSubmit();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search]);

	useEffect(() => {
		if (data.isFound) {
			setState(data.mainSearch);
		} else setState(data.data);
	}, [data.data, data.isFound, data.mainSearch]);

	useEffect(() => {
		getReload();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let handleLoadMore = async () => {
		setLoading(true);

		if (search) {
			await getServicesHistory("data", {
				limit: Number(data?.paginate?.nextPage * data?.paginate?.limit),
				search,
			});
		} else {
			await getServicesHistory("data", {
				limit: Number(data?.paginate?.nextPage * data?.paginate?.limit),
			});
		}
		setLoading(false);
	};

	if (!state) return;

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
			{/* <div className="bland row mx-0 py-3 px-0 text-capitalize">
				<div className="col textTrunc fontReduce fw-bold Lexend">ID</div>
				<div className="col textTrunc d-none d-md-flex fontReduce fw-bold Lexend">
					Date
				</div>
				<div className="col textTrunc d-none d-md-flex fontReduce fw-bold Lexend">
					reference
				</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">Phone</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">Network</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">Amount</div>
				<div className="col textTrunc fontReduce fw-bold Lexend d-none d-md-flex">
					Validity
				</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">Allowance</div>
			</div>
			<div className="bland2 row mx-0">
				{state?.length === 0 ? (
					<EmptyComponent subtitle={"Data list is empty"} />
				) : (
					state?.map((item, index) => (
						<div
							key={index}
							onClick={() => setThisData(item)}
							className="row mx-0 py-3 border-bottom px-0 myCursor">
							<div className="col textTrunc my-auto">{item?.item_id}</div>
							<div className="col textTrunc my-auto  d-none d-md-flex">
								{moment(item?.createdAt).format("DD/MM/YYYY")}
							</div>
							<div className="col textTrunc my-auto  d-none d-md-flex">
								{item?.reference}
							</div>
							<div className="col textTrunc my-auto">
								{item?.properties?.phone}
							</div>
							<div className="col textTrunc my-auto">
								{item?.properties?.network}
							</div>
							<div className="col textTrunc my-auto">
								{numberWithCommas(item?.properties?.amount)}
							</div>
							<div className="col textTrunc my-auto fontReduce2 d-none d-md-flex">
								{
									data?.data_direct?.find(
										list =>
											list?.network?.toLowerCase() ===
												item?.properties?.network?.toLowerCase() &&
											Number(list?.planId) === Number(item?.properties?.planId)
									)?.validity
								}
							</div>
							<div className="col textTrunc my-auto fontReduce2 textTrunc2">
								{
									data?.data_direct?.find(
										list =>
											list?.network?.toLowerCase() ===
												item?.properties?.network?.toLowerCase() &&
											Number(list?.planId) === Number(item?.properties?.planId)
									)?.allowance
								}
							</div>
						</div>
					))
				)}
			</div> */}
			<NewPaginate
				state={state}
				setState={setState}
				setThisData={setThisData}
				type={"data"}
				criteria={
					{
						// id: params?.step,
					}
				}
			/>
			<TransactionDetails
				thisData={thisData}
				setThisData={setThisData}
				type={"data"}
				criteria={
					{
						// id: params?.step,
					}
				}
			/>
			<BottomTab
				state={state}
				paginate={search ? data?.search_paginate : data?.paginate}
			/>
			<LoadMore
				next={search ? data?.search_paginate?.next : data?.paginate?.next}
				handleLoadMore={handleLoadMore}
				loading={loading}
			/>
		</div>
	);
};

const DataList = ({ setIsEdit, setIsBuy, setIsDelete }) => {
	const { data, auth } = useContext(GlobalState);
	let [state, setState] = useState(null),
		[stateMTNSME, setStateMTNSME] = useState([]),
		[stateMTNSME2, setStateMTNSME2] = useState([]),
		[stateMTNDG, setStateMTNDG] = useState([]),
		[stateMTNCG, setStateMTNCG] = useState([]),
		[stateAIRTELDG, setStateAIRTELDG] = useState([]),
		[stateAIRTELCG, setStateAIRTELCG] = useState([]),
		[stateAIRTELSME, setStateAIRTELSME] = useState([]),
		[stateGLOCG, setStateGLOCG] = useState([]),
		[stateGLODG, setStateGLODG] = useState([]),
		[stateGLOSME, setStateGLOSME] = useState([]),
		[state9MOBILE, setState9MOBILE] = useState([]),
		[state9MOBILESME, setState9MOBILESME] = useState([]),
		[state9MOBILECG, setState9MOBILECG] = useState([]),
		[state9MOBILEDG, setState9MOBILEDG] = useState([]),
		[stateGLO, setStateGLO] = useState([]);

	useEffect(() => {
		setState(data?.main_data);
		if (data?.main_data) {
			setStateMTNSME(
				data?.main_data?.filter(item => item?.name?.toLowerCase() === "mtn_sme")
			);
			setStateMTNSME2(
				data?.main_data?.filter(
					item => item?.name?.toLowerCase() === "mtn_sme2"
				)
			);
			setStateMTNDG(
				data?.main_data?.filter(item => item?.name?.toLowerCase() === "mtn_dg")
			);
			setStateMTNCG(
				data?.main_data?.filter(item => item?.name?.toLowerCase() === "mtn_cg")
			);
			setStateGLOCG(
				data?.main_data?.filter(item => item?.name?.toLowerCase() === "glo_cg")
			);
			setStateGLODG(
				data?.main_data?.filter(item => item?.name?.toLowerCase() === "glo_dg")
			);
			setStateGLOSME(
				data?.main_data?.filter(item => item?.name?.toLowerCase() === "glo_sme")
			);
			setStateGLO(
				data?.main_data?.filter(item => item?.name?.toLowerCase() === "glo")
			);
			setStateGLOCG(
				data?.main_data?.filter(item => item?.name?.toLowerCase() === "glo_cg")
			);
			setStateAIRTELSME(
				data?.main_data?.filter(
					item => item?.name?.toLowerCase() === "airtel_sme"
				)
			);
			setStateAIRTELDG(
				data?.main_data?.filter(
					item => item?.name?.toLowerCase() === "airtel_dg"
				)
			);
			setStateAIRTELCG(
				data?.main_data?.filter(
					item => item?.name?.toLowerCase() === "airtel_cg"
				)
			);
			setState9MOBILE(
				data?.main_data?.filter(item => item?.name?.toLowerCase() === "9mobile")
			);
			setState9MOBILECG(
				data?.main_data?.filter(
					item => item?.name?.toLowerCase() === "9mobile_cg"
				)
			);
			setState9MOBILESME(
				data?.main_data?.filter(
					item => item?.name?.toLowerCase() === "9mobile_sme"
				)
			);
			setState9MOBILEDG(
				data?.main_data?.filter(
					item => item?.name?.toLowerCase() === "9mobile_dg"
				)
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data?.main_data, data?.data_direct]);

	if (!state) return;

	return (
		<div className="pb-3 pb-md-5 my-3 py-md-5">
			<div className="d-none bland d-md-flex row mx-0 py-3 px-0 text-capitalize">
				<div className="col textTrunc  d-none d-md-flex fontReduce fw-bold Lexend">
					s/n
				</div>
				{auth?.user?.privilege === "agent" && (
					<div className="col textTrunc d-none d-md-flex fontReduce fw-bold Lexend">
						Date
					</div>
				)}
				<div className="col textTrunc fontReduce fw-bold Lexend">Network</div>
				{auth?.user?.privilege === "agent" && (
					<div className="col textTrunc fontReduce fw-bold Lexend">Amount</div>
				)}
				<div className="col textTrunc fontReduce fw-bold Lexend">Price</div>
				{auth?.user?.privilege === "agent" && (
					<>
						<div className="col textTrunc fontReduce fw-bold Lexend">
							Reseller
						</div>
						<div className="col textTrunc fontReduce fw-bold Lexend">
							Topuser
						</div>
					</>
				)}
				<div className="col textTrunc fontReduce fw-bold Lexend">Validity</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">Allowance</div>
				{auth?.user?.privilege === "agent" && (
					<div className="col textTrunc fontReduce fw-bold Lexend">Actions</div>
				)}
			</div>
			<h5 className="text-capitalize my-3 Lexend">MTN</h5>
			<div className="bland2 row mx-0">
				{stateMTNSME?.length > 0 && (
					<h6 className="text-capitalize my-3 Lexend">MTN SME</h6>
				)}
				{stateMTNSME
					?.sort((a, b) => a?.price - b?.price)
					?.map((item, index) => (
						<UserDataRecurrence
							item={item}
							index={index}
							key={index}
							setIsEdit={setIsEdit}
							setIsBuy={setIsBuy}
							setIsDelete={setIsDelete}
						/>
					))}
				{stateMTNSME2?.length > 0 && (
					<h6 className="text-capitalize my-3 Lexend">MTN SME 2</h6>
				)}
				{stateMTNSME2
					?.sort((a, b) => a?.price - b?.price)
					?.map((item, index) => (
						<UserDataRecurrence
							item={item}
							index={index}
							key={index}
							setIsEdit={setIsEdit}
							setIsBuy={setIsBuy}
							setIsDelete={setIsDelete}
						/>
					))}
				{stateMTNCG?.length > 0 && (
					<h6 className="text-capitalize my-3 Lexend">MTN CG</h6>
				)}
				{stateMTNCG
					?.sort((a, b) => a?.price - b?.price)
					?.map((item, index) => (
						<UserDataRecurrence
							item={item}
							index={index}
							key={index}
							setIsEdit={setIsEdit}
							setIsBuy={setIsBuy}
							setIsDelete={setIsDelete}
						/>
					))}
				{stateMTNDG?.length > 0 && (
					<h6 className="text-capitalize my-3 Lexend">MTN DG</h6>
				)}
				{stateMTNDG
					?.sort((a, b) => a?.price - b?.price)
					?.map((item, index) => (
						<UserDataRecurrence
							item={item}
							index={index}
							key={index}
							setIsEdit={setIsEdit}
							setIsBuy={setIsBuy}
							setIsDelete={setIsDelete}
						/>
					))}
			</div>
			<h5 className="text-capitalize my-3 Lexend">GLO</h5>
			<div className="bland2 row mx-0">
				{stateGLO?.length > 0 && (
					<h6 className="text-capitalize my-3 Lexend">GLO</h6>
				)}
				{stateGLO
					?.sort((a, b) => a?.price - b?.price)
					?.map((item, index) => (
						<UserDataRecurrence
							item={item}
							index={index}
							key={index}
							setIsEdit={setIsEdit}
							setIsBuy={setIsBuy}
							setIsDelete={setIsDelete}
						/>
					))}
				{stateGLOSME?.length > 0 && (
					<h6 className="text-capitalize my-3 Lexend">GLO SME</h6>
				)}
				{stateGLOSME
					?.sort((a, b) => a?.price - b?.price)
					?.map((item, index) => (
						<UserDataRecurrence
							item={item}
							index={index}
							key={index}
							setIsEdit={setIsEdit}
							setIsBuy={setIsBuy}
							setIsDelete={setIsDelete}
						/>
					))}
				{stateGLOCG?.length > 0 && (
					<h6 className="text-capitalize my-3 Lexend">GLO CG</h6>
				)}
				{stateGLOCG
					?.sort((a, b) => a?.price - b?.price)
					?.map((item, index) => (
						<UserDataRecurrence
							item={item}
							index={index}
							key={index}
							setIsEdit={setIsEdit}
							setIsBuy={setIsBuy}
							setIsDelete={setIsDelete}
						/>
					))}
				{stateGLODG?.length > 0 && (
					<h6 className="text-capitalize my-3 Lexend">GLO DG</h6>
				)}
				{stateGLODG
					?.sort((a, b) => a?.price - b?.price)
					?.map((item, index) => (
						<UserDataRecurrence
							item={item}
							index={index}
							key={index}
							setIsEdit={setIsEdit}
							setIsBuy={setIsBuy}
							setIsDelete={setIsDelete}
						/>
					))}
			</div>
			<h5 className="text-capitalize my-3 Lexend">AIRTEL</h5>
			<div className="bland2 row mx-0">
				{stateAIRTELSME?.length > 0 && (
					<h6 className="text-capitalize my-3 Lexend">AIRTEL SME</h6>
				)}
				{stateAIRTELSME
					?.sort((a, b) => a?.price - b?.price)
					?.map((item, index) => (
						<UserDataRecurrence
							item={item}
							index={index}
							key={index}
							setIsEdit={setIsEdit}
							setIsBuy={setIsBuy}
							setIsDelete={setIsDelete}
						/>
					))}
				{stateAIRTELCG?.length > 0 && (
					<h6 className="text-capitalize my-3 Lexend">AIRTEL CG</h6>
				)}
				{stateAIRTELCG
					?.sort((a, b) => a?.price - b?.price)
					?.map((item, index) => (
						<UserDataRecurrence
							item={item}
							index={index}
							key={index}
							setIsEdit={setIsEdit}
							setIsBuy={setIsBuy}
							setIsDelete={setIsDelete}
						/>
					))}
				{stateAIRTELDG?.length > 0 && (
					<h6 className="text-capitalize my-3 Lexend">AIRTEL DG</h6>
				)}
				{stateAIRTELDG
					?.sort((a, b) => a?.price - b?.price)
					?.map((item, index) => (
						<UserDataRecurrence
							item={item}
							index={index}
							key={index}
							setIsEdit={setIsEdit}
							setIsBuy={setIsBuy}
							setIsDelete={setIsDelete}
						/>
					))}
			</div>
			<h5 className="text-capitalize my-3 Lexend">9MOBILE</h5>
			<div className="bland2 row mx-0">
				{state9MOBILE?.length > 0 && (
					<h6 className="text-capitalize my-3 Lexend">9MOBILE</h6>
				)}
				{state9MOBILE
					?.sort((a, b) => a?.price - b?.price)
					?.map((item, index) => (
						<UserDataRecurrence
							item={item}
							index={index}
							key={index}
							setIsEdit={setIsEdit}
							setIsBuy={setIsBuy}
							setIsDelete={setIsDelete}
						/>
					))}
			</div>
			<div className="bland2 row mx-0">
				{state9MOBILESME?.length > 0 && (
					<h6 className="text-capitalize my-3 Lexend">9MOBILE SME</h6>
				)}
				{state9MOBILESME
					?.sort((a, b) => a?.price - b?.price)
					?.map((item, index) => (
						<UserDataRecurrence
							item={item}
							index={index}
							key={index}
							setIsEdit={setIsEdit}
							setIsBuy={setIsBuy}
							setIsDelete={setIsDelete}
						/>
					))}
			</div>
			<div className="bland2 row mx-0">
				{state9MOBILECG?.length > 0 && (
					<h6 className="text-capitalize my-3 Lexend">9MOBILE CG</h6>
				)}
				{state9MOBILECG
					?.sort((a, b) => a?.price - b?.price)
					?.map((item, index) => (
						<UserDataRecurrence
							item={item}
							index={index}
							key={index}
							setIsEdit={setIsEdit}
							setIsBuy={setIsBuy}
							setIsDelete={setIsDelete}
						/>
					))}
			</div>
			<div className="bland2 row mx-0">
				{state9MOBILEDG?.length > 0 && (
					<h6 className="text-capitalize my-3 Lexend">9MOBILE DG</h6>
				)}
				{state9MOBILEDG
					?.sort((a, b) => a?.price - b?.price)
					?.map((item, index) => (
						<UserDataRecurrence
							item={item}
							index={index}
							key={index}
							setIsEdit={setIsEdit}
							setIsBuy={setIsBuy}
							setIsDelete={setIsDelete}
						/>
					))}
			</div>
		</div>
	);
};

let UserDataRecurrence = ({
	item,
	index,
	setIsEdit,
	setIsBuy,
	setIsDelete,
}) => {
	const { auth, numberWithCommas, data, usecase, nairaSign } =
		useContext(GlobalState);

	let [mainPrice, setMainPrice] = useState(0);

	useEffect(() => {
		let price = item?.price;
		if (auth?.user?.privilege === "topuser")
			price = item?.topuser_price ? item?.topuser_price : item?.price;
		if (auth?.user?.privilege === "reseller")
			price = item?.reseller_price ? item?.reseller_price : item?.price;

		setMainPrice(price);
	}, [item?.price, auth?.user, item?.reseller_price, item?.topuser_price]);

	return (
		<div
			key={index}
			className="d-block d-md-flex row mx-0  py-3 border-bottom px-0">
			<div
				onClick={
					usecase?.usecase?.data === "enable" ? () => setIsBuy(item) : () => {}
				}
				className="col textTrunc my-auto d-flex fontReduceMini myCursor align-items-center justify-content-between py-1 py-md-0">
				<span className="fontReduce d-md-none Lexend">S/N:</span>

				{index + 1}
			</div>
			{auth?.user?.privilege === "agent" && (
				<div
					onClick={
						usecase?.usecase?.data === "enable"
							? () => setIsBuy(item)
							: () => {}
					}
					className="col textTrunc my-auto d-flex fontReduceMini myCursor align-items-center justify-content-between py-1 py-md-0">
					<span className="fontReduce d-md-none Lexend">Date:</span>

					{moment(item?.createdAt).format("DD/MM/YYYY")}
				</div>
			)}
			<div
				onClick={
					usecase?.usecase?.data === "enable" ? () => setIsBuy(item) : () => {}
				}
				className="col textTrunc my-auto d-flex fontReduceMini myCursor align-items-center justify-content-between py-1 py-md-0">
				<span className="fontReduce d-md-none Lexend">Network:</span>

				{item?.network}
			</div>
			{auth?.user?.privilege === "agent" && (
				<div
					onClick={
						usecase?.usecase?.data === "enable"
							? () => setIsBuy(item)
							: () => {}
					}
					className="col textTrunc my-auto d-flex fontReduceMini myCursor align-items-center justify-content-between py-1 py-md-0">
					<span className="fontReduce d-md-none Lexend">Amount:</span>
					<span>
						{nairaSign}{" "}
						{data?.data_direct?.length > 0
							? data?.data_direct?.find(
									list =>
										list?.network?.toLowerCase() ===
											item?.network?.toLowerCase() &&
										Number(list?.planId) === Number(item?.planId)
							  )
								? numberWithCommas(
										data?.data_direct?.find(
											list =>
												list?.network?.toLowerCase() ===
													item?.network?.toLowerCase() &&
												Number(list?.planId) === Number(item?.planId)
										)?.price
								  )
								: null
							: null}
					</span>
				</div>
			)}
			<div
				onClick={
					usecase?.usecase?.data === "enable" ? () => setIsBuy(item) : () => {}
				}
				className="col textTrunc my-auto d-flex fontReduceMini myCursor align-items-center justify-content-between py-1 py-md-0">
				<span className="fontReduce d-md-none Lexend">Price:</span>
				<span>
					{nairaSign} {numberWithCommas(Number(mainPrice).toFixed(2))}
				</span>
			</div>
			{auth?.user?.privilege === "agent" && (
				<>
					<div
						onClick={
							usecase?.usecase?.data === "enable"
								? () => setIsBuy(item)
								: () => {}
						}
						className="col textTrunc my-auto d-flex fontReduceMini myCursor align-items-center justify-content-between py-1 py-md-0">
						<span className="fontReduce d-md-none Lexend">Reseller:</span>
						<span>
							{nairaSign}{" "}
							{item?.reseller_price
								? numberWithCommas(Number(item?.reseller_price).toFixed(2))
								: 0}
						</span>
					</div>
					<div
						onClick={
							usecase?.usecase?.data === "enable"
								? () => setIsBuy(item)
								: () => {}
						}
						className="col textTrunc my-auto d-flex fontReduceMini myCursor align-items-center justify-content-between py-1 py-md-0">
						<span className="fontReduce d-md-none Lexend">Topuser:</span>
						<span>
							{nairaSign}{" "}
							{item?.topuser_price
								? numberWithCommas(Number(item?.topuser_price).toFixed(2))
								: 0}
						</span>
					</div>
				</>
			)}
			<div
				onClick={
					usecase?.usecase?.data === "enable" ? () => setIsBuy(item) : () => {}
				}
				className="col textTrunc my-auto d-flex fontReduceMini myCursor align-items-center justify-content-between py-1 py-md-0">
				<span className="fontReduce d-md-none Lexend">Validity:</span>

				{
					data?.data_direct?.find(
						list =>
							list?.network?.toLowerCase() === item?.network?.toLowerCase() &&
							Number(list?.planId) === Number(item?.planId)
					)?.validity
				}
			</div>
			<div
				onClick={
					usecase?.usecase?.data === "enable" ? () => setIsBuy(item) : () => {}
				}
				className="col textTrunc my-auto d-flex fontReduceMini myCursor align-items-center justify-content-between py-1 py-md-0 textrTrunc2">
				<span className="fontReduce d-md-none Lexend">Allowance:</span>

				{
					data?.data_direct?.find(
						list =>
							list?.network?.toLowerCase() === item?.network?.toLowerCase() &&
							Number(list?.planId) === Number(item?.planId)
					)?.allowance
				}
			</div>
			{auth?.user?.privilege === "agent" && (
				<div className="col textTrunc my-auto myCursor fontReduce2 text-uppercase text-primary1 btn-group w-100">
					<button
						onClick={() => setIsEdit(item)}
						className="btn  btn-success2 text-capitalize p-1 p-md-2 w-100 fontReduce2">
						<BiEditAlt />
					</button>
					<button
						onClick={() => setIsDelete(item)}
						className="btn  btn-danger2 text-capitalize p-1 p-md-2 w-100 fontReduce2">
						<BiTrashAlt />
					</button>
				</div>
			)}
		</div>
	);
};

const MainDataList = ({ setIsMake }) => {
	const { data } = useContext(GlobalState);
	let [state, setState] = useState(null),
		[stateMTNSME, setStateMTNSME] = useState([]),
		[stateMTNSME2, setStateMTNSME2] = useState([]),
		[stateMTNDG, setStateMTNDG] = useState([]),
		[stateMTNCG, setStateMTNCG] = useState([]),
		[stateAIRTELSME, setStateAIRTELSME] = useState([]),
		[stateAIRTELDG, setStateAIRTELDG] = useState([]),
		[stateAIRTELCG, setStateAIRTELCG] = useState([]),
		[stateGLOCG, setStateGLOCG] = useState([]),
		[stateGLODG, setStateGLODG] = useState([]),
		[stateGLOSME, setStateGLOSME] = useState([]),
		[state9MOBILE, setState9MOBILE] = useState([]),
		[state9MOBILESME, setState9MOBILESME] = useState([]),
		[state9MOBILECG, setState9MOBILECG] = useState([]),
		[state9MOBILEDG, setState9MOBILEDG] = useState([]),
		[stateGLO, setStateGLO] = useState([]);

	useEffect(() => {
		setState(data?.data_direct);
		if (data?.data_direct) {
			setStateMTNSME(
				data?.data_direct?.filter(
					item => item?.name?.toLowerCase() === "mtn_sme"
				)
			);
			setStateMTNSME2(
				data?.data_direct?.filter(
					item => item?.name?.toLowerCase() === "mtn_sme2"
				)
			);
			setStateMTNDG(
				data?.data_direct?.filter(
					item => item?.name?.toLowerCase() === "mtn_dg"
				)
			);
			setStateMTNCG(
				data?.data_direct?.filter(
					item => item?.name?.toLowerCase() === "mtn_cg"
				)
			);
			setStateGLO(
				data?.data_direct?.filter(item => item?.name?.toLowerCase() === "glo")
			);
			setStateGLOCG(
				data?.data_direct?.filter(
					item => item?.name?.toLowerCase() === "glo_cg"
				)
			);
			setStateGLODG(
				data?.data_direct?.filter(
					item => item?.name?.toLowerCase() === "glo_dg"
				)
			);
			setStateGLOSME(
				data?.data_direct?.filter(
					item => item?.name?.toLowerCase() === "glo_sme"
				)
			);
			setStateAIRTELSME(
				data?.data_direct?.filter(
					item => item?.name?.toLowerCase() === "airtel_sme"
				)
			);
			setStateAIRTELDG(
				data?.data_direct?.filter(
					item => item?.name?.toLowerCase() === "airtel_dg"
				)
			);
			setStateAIRTELCG(
				data?.data_direct?.filter(
					item => item?.name?.toLowerCase() === "airtel_cg"
				)
			);
			setState9MOBILE(
				data?.data_direct?.filter(
					item => item?.name?.toLowerCase() === "9mobile"
				)
			);
			setState9MOBILECG(
				data?.data_direct?.filter(
					item => item?.name?.toLowerCase() === "9mobile_cg"
				)
			);
			setState9MOBILESME(
				data?.data_direct?.filter(
					item => item?.name?.toLowerCase() === "9mobile_sme"
				)
			);
			setState9MOBILEDG(
				data?.data_direct?.filter(
					item => item?.name?.toLowerCase() === "9mobile_dg"
				)
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data?.data_direct, data?.data_direct]);

	if (!state) return;

	return (
		<div className="pb-3 pb-md-5 my-3 py-md-5">
			<div className="bland row mx-0 py-3 px-0 text-capitalize">
				<div className="col textTrunc  d-none d-md-flex fontReduce fw-bold Lexend">
					s/n
				</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">Network</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">Price</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">Validity</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">Allowance</div>
			</div>
			{/* <div className="bland2 row mx-0">
				{state?.map((item, index) => (
					<DataRecurrence
						item={item}
						index={index}
						key={index}
						setIsMake={setIsMake}
					/>
				))}
			</div> */}
			<h5 className="text-capitalize my-3 Lexend">MTN</h5>
			<div className="bland2 row mx-0">
				{stateMTNSME?.length > 0 && (
					<h6 className="text-capitalize my-3 Lexend">MTN SME</h6>
				)}
				{stateMTNSME
					?.sort((a, b) => a?.price - b?.price)
					?.map((item, index) => (
						<DataRecurrence
							item={item}
							index={index}
							key={index}
							setIsMake={setIsMake}
						/>
					))}
				{stateMTNSME2?.length > 0 && (
					<h6 className="text-capitalize my-3 Lexend">MTN SME 2</h6>
				)}
				{stateMTNSME2
					?.sort((a, b) => a?.price - b?.price)
					?.map((item, index) => (
						<DataRecurrence
							item={item}
							index={index}
							key={index}
							setIsMake={setIsMake}
						/>
					))}
				{stateMTNCG?.length > 0 && (
					<h6 className="text-capitalize my-3 Lexend">MTN CG</h6>
				)}
				{stateMTNCG
					?.sort((a, b) => a?.price - b?.price)
					?.map((item, index) => (
						<DataRecurrence
							item={item}
							index={index}
							key={index}
							setIsMake={setIsMake}
						/>
					))}
				{stateMTNDG?.length > 0 && (
					<h6 className="text-capitalize my-3 Lexend">MTN DG</h6>
				)}
				{stateMTNDG
					?.sort((a, b) => a?.price - b?.price)
					?.map((item, index) => (
						<DataRecurrence
							item={item}
							index={index}
							key={index}
							setIsMake={setIsMake}
						/>
					))}
			</div>
			<h5 className="text-capitalize my-3 Lexend">GLO</h5>
			<div className="bland2 row mx-0">
				{stateGLO?.length > 0 && (
					<h6 className="text-capitalize my-3 Lexend">GLO</h6>
				)}
				{stateGLO
					?.sort((a, b) => a?.price - b?.price)
					?.map((item, index) => (
						<DataRecurrence
							item={item}
							index={index}
							key={index}
							setIsMake={setIsMake}
						/>
					))}
				{stateGLOSME?.length > 0 && (
					<h6 className="text-capitalize my-3 Lexend">GLO SME</h6>
				)}
				{stateGLOSME
					?.sort((a, b) => a?.price - b?.price)
					?.map((item, index) => (
						<DataRecurrence
							item={item}
							index={index}
							key={index}
							setIsMake={setIsMake}
						/>
					))}
				{stateGLOCG?.length > 0 && (
					<h6 className="text-capitalize my-3 Lexend">GLO CG</h6>
				)}
				{stateGLOCG
					?.sort((a, b) => a?.price - b?.price)
					?.map((item, index) => (
						<DataRecurrence
							item={item}
							index={index}
							key={index}
							setIsMake={setIsMake}
						/>
					))}
				{stateGLODG?.length > 0 && (
					<h6 className="text-capitalize my-3 Lexend">GLO DG</h6>
				)}
				{stateGLODG
					?.sort((a, b) => a?.price - b?.price)
					?.map((item, index) => (
						<DataRecurrence
							item={item}
							index={index}
							key={index}
							setIsMake={setIsMake}
						/>
					))}
			</div>
			<h5 className="text-capitalize my-3 Lexend">AIRTEL</h5>
			<div className="bland2 row mx-0">
				{stateAIRTELSME?.length > 0 && (
					<h6 className="text-capitalize my-3 Lexend">AIRTEL SME</h6>
				)}
				{stateAIRTELSME
					?.sort((a, b) => a?.price - b?.price)
					?.map((item, index) => (
						<DataRecurrence
							item={item}
							index={index}
							key={index}
							setIsMake={setIsMake}
						/>
					))}
				{stateAIRTELCG?.length > 0 && (
					<h6 className="text-capitalize my-3 Lexend">AIRTEL CG</h6>
				)}
				{stateAIRTELCG
					?.sort((a, b) => a?.price - b?.price)
					?.map((item, index) => (
						<DataRecurrence
							item={item}
							index={index}
							key={index}
							setIsMake={setIsMake}
						/>
					))}
				{stateAIRTELDG?.length > 0 && (
					<h6 className="text-capitalize my-3 Lexend">AIRTEL DG</h6>
				)}
				{stateAIRTELDG
					?.sort((a, b) => a?.price - b?.price)
					?.map((item, index) => (
						<DataRecurrence
							item={item}
							index={index}
							key={index}
							setIsMake={setIsMake}
						/>
					))}
			</div>
			<h5 className="text-capitalize my-3 Lexend">9MOBILE</h5>
			<div className="bland2 row mx-0">
				{state9MOBILE?.length > 0 && (
					<h6 className="text-capitalize my-3 Lexend">9MOBILE</h6>
				)}
				{state9MOBILE
					?.sort((a, b) => a?.price - b?.price)
					?.map((item, index) => (
						<DataRecurrence
							item={item}
							index={index}
							key={index}
							setIsMake={setIsMake}
						/>
					))}
				{state9MOBILESME?.length > 0 && (
					<h6 className="text-capitalize my-3 Lexend">9MOBILE SME</h6>
				)}
				{state9MOBILESME
					?.sort((a, b) => a?.price - b?.price)
					?.map((item, index) => (
						<DataRecurrence
							item={item}
							index={index}
							key={index}
							setIsMake={setIsMake}
						/>
					))}
				{state9MOBILECG?.length > 0 && (
					<h6 className="text-capitalize my-3 Lexend">9MOBILE CG</h6>
				)}
				{state9MOBILECG
					?.sort((a, b) => a?.price - b?.price)
					?.map((item, index) => (
						<DataRecurrence
							item={item}
							index={index}
							key={index}
							setIsMake={setIsMake}
						/>
					))}
				{state9MOBILEDG?.length > 0 && (
					<h6 className="text-capitalize my-3 Lexend">9MOBILE DG</h6>
				)}
				{state9MOBILEDG
					?.sort((a, b) => a?.price - b?.price)
					?.map((item, index) => (
						<DataRecurrence
							item={item}
							index={index}
							key={index}
							setIsMake={setIsMake}
						/>
					))}
			</div>
		</div>
	);
};

let DataRecurrence = ({ item, index, setIsMake }) => {
	const { numberWithCommas, nairaSign } = useContext(GlobalState);
	return (
		<div
			onClick={() => setIsMake(item)}
			key={index}
			className="row mx-0 py-3 px-0 myCursor border-bottom">
			<div className="col textTrunc my-auto   d-none d-md-flex fontReduce2">
				{index + 1}
			</div>
			<div className="col textTrunc my-auto fontReduce2">{item?.network}</div>
			<div className="col textTrunc my-auto fontReduce2">
				{nairaSign} {numberWithCommas(Number(item?.price).toFixed(2))}
			</div>
			<div className="col textTrunc my-auto fontReduce2">{item?.validity}</div>
			<div className="col textTrunc my-auto fontReduce2 textTrunc2">
				{item?.allowance}
			</div>
		</div>
	);
};
