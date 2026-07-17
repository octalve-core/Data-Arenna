import React, { useState, useContext, useEffect } from "react";
import { Container } from "reactstrap";
import { Buttons, OtpComponent } from "../../Utils";
import { ModalComponents } from "..";
import { GlobalState } from "../../Data/Context";
import LoadMore, { BottomTab } from "../LoadMore";
import { TransactionDetails, NewPaginate } from "../Transactions";
import { NetworkList } from "./airtime";

const Airtime = () => {
	let [isOpen, setIsOpen] = useState(false),
		toggle = () => {
			setIsOpen(!isOpen);
		};

	let {
		setStateName,
		// network,
		airtimes_pin,
		buyServices,
		returnErrors,
		numberWithCommas,
		nairaSign,
		nairaSignNeutral,
		settings,wallet
	} = useContext(GlobalState);
	useEffect(() => {
		setStateName("airtime pin history");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let [stateData, setStateData] = useState(null);

	useEffect(() => {
		setStateData(settings?.settings);
	}, [settings?.settings]);

	const getCommission = (type, amount) => {
		switch (type) {
			case "MTN":
				return (stateData?.mtnCardCommission / 100) * amount;
			case "GLO":
				return (stateData?.gloCardCommission / 100) * amount;
			case "AIRTEL":
				return (stateData?.airtelCardCommission / 100) * amount;
			case "9MOBILE":
				return (stateData?.mobile9CardCommission / 100) * amount;
			default:
				return null;
		}
	};

	let init = {
			amount: "",
			network: "",
			name: "",
			quantity: 1,
			pin:""
		},
		[state, setState] = useState(init),
		[loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false),
		textChange =
			name =>
			({ target: { value } }) => {
				setState({ ...state, [name]: value });
			},
		handleSubmit = async e => {
			e?.preventDefault();
			if (Number(state?.amount) < 100)
				return returnErrors({
					error: [
						{
							msg: `Amount cannot be less than ${nairaSignNeutral} 100`,
							param: "amount",
						},
					],
				});
			setLoading(true);
			await buyServices("airtime_pin", state);
			setLoading(false);
			setSubmit(true);
		},
		[buyActive, setBuyActive] = useState(0);

	useEffect(() => {
		if (airtimes_pin?.isAdded && submit) {
			setIsOpen(false);
			setSubmit(false);
			setState(init);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [airtimes_pin?.isAdded, submit]);

	useEffect(() => {
		if (state?.pin && state?.pin?.length === 4) handleSubmit();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state?.pin]);

	return (
		<div className="bg-white aboutScreen">
			<Container className="py-5">
				<Buttons
					title={"generate airtime pin"}
					css="btn-primary1 text-capitalize py-3 px-4 px-lg-5"
					width={"w-25 w25"}
					onClick={toggle}
					style={{ borderRadius: "30px" }}
				/>
				<AirtimePinHistory />
			</Container>
			<ModalComponents
				title="generate airtime pin"
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
						<>
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
									<span>Quantity: </span>
									<span className="fontInherit Lexend">
										{numberWithCommas(Number(state?.quantity))}
									</span>{" "}
								</p>
								<p className="text-capitalize border-bottom d-flex justify-content-between printOnlyNone">
									<span>Total Amount: </span>
									<span className="fontInherit Lexend">
										{nairaSign}{" "}
										{numberWithCommas(
											Number(state?.amount * state?.quantity).toFixed(2)
										)}
									</span>{" "}
								</p>
								<p className="text-capitalize border-bottom d-flex justify-content-between printOnlyNone">
									<span>Commission: </span>
									<span className="fontInherit Lexend">
										{nairaSign}{" "}
										{numberWithCommas(
											Number(
												getCommission(
													state?.network,
													state?.amount * state?.quantity
												)
											).toFixed(2)
										)}
									</span>{" "}
								</p>
								<p className="text-capitalize border-bottom d-flex justify-content-between printOnlyNone">
									<span>Name on card: </span>
									<span className="fontInherit Lexend">{state?.name}</span>{" "}
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
									title={"generate"}
									css="btn-primary1 text-capitalize py-3 px-4 px-lg-5 mx-auto"
									loading={loading}
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
									style={{ borderRadius: "30px" }}
								/>
							</div>
						</>
					) : (
						<form className="w-100">
							<div className="mb-4">
								<label htmlFor="Newtwork">Network</label>
								{/* <select
									className="form-control py-3 py-md-4 text-capitalize form-select"
									name="network"
									placeholder="Network"
									value={state?.network}
									onChange={textChange("network")}
									id="network">
									<option value="">select network</option>
									{network?.data?.map((item, i) => (
										<option value={item?.name} key={i}>
											{item?.name}
										</option>
									))}
								</select> */}
								<NetworkList
									state={state?.network}
									setState={i => {
										setState({ ...state, network: i });
									}}
								/>
							</div>
							<div className="mb-4">
								<label htmlFor="value">Amount</label>
								<select
									className="form-control py-3 py-md-4 text-capitalize form-select"
									name="amount"
									placeholder="Amount"
									value={state?.amount}
									onChange={textChange("amount")}
									id="amount">
									<option value="">select amount</option>
									{[100, 200, 500, 1000]?.map((item, i) => (
										<option value={item} key={i}>
											{nairaSign} {numberWithCommas(item)}
										</option>
									))}
								</select>
								{/* <input
									type={"number"}
									placeholder="500"
									className="form-control py-3"
									value={state?.amount}
									onChange={textChange("amount")}
									min={100}
								/> */}
							</div>
							<div className="mb-4">
								<label htmlFor="value">Quantity</label>
								<input
									type={"number"}
									placeholder="50"
									className="form-control py-3"
									value={state?.quantity}
									onChange={textChange("quantity")}
									min={1}
								/>
							</div>
							<div className="mb-4">
								<label htmlFor="name">Name on card</label>
								<input
									type={"text"}
									placeholder={process.env.REACT_APP_NAME}
									className="form-control py-3"
									value={state?.name}
									onChange={textChange("name")}
								/>
							</div>
							<Buttons
								title={"proceed"}
								css="btn-primary1 text-capitalize py-3 w-50 my-4 mx-auto"
								width={"w-50"}
								style={{ borderRadius: "30px" }}
								onClick={() => {
									if (Number(state?.amount) < 100)
										return returnErrors({
											error: [
												{
													msg: `Amount cannot be less than ${nairaSignNeutral} 100`,
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

const AirtimePinHistory = () => {
	let { airtimes_pin, getServicesHistory } = useContext(GlobalState);

	let [data, setData] = useState(null),
		[thisData, setThisData] = useState(null);

		useEffect(() => {
			getServicesHistory("airtime_pin");
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, []);

	useEffect(() => {
		setData(airtimes_pin?.airtime);
	}, [airtimes_pin?.airtime]);

	let [loading, setLoading] = useState(false);
	let handleLoadMore = async () => {
		setLoading(true);

		await getServicesHistory("airtime_pin", {
			limit: Number(
				airtimes_pin?.paginate?.nextPage * airtimes_pin?.paginate?.limit
			),
		});
		setLoading(false);
	};

	if (!data) return;
	// console.log({ data });

	return (
		<div className="pb-5 my-5">
			{/* <div className="bland row mx-0 p-3 text-capitalize">
				<div className="col textTrunc fontReduce d-none d-md-flex">ID</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">network</div>
				<div className="col textTrunc fontReduce fw-bold Lexend d-none d-md-flex">
					date
				</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">Number</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">amount</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">status</div>
			</div>
			<div className="bg-white row mx-0">
				{data?.length === 0 ? (
					<></>
				) : (
					data?.map((item, index) => (
						<div key={index} className="row mx-0 py-3 border-bottom">
							<div className="col textTrunc fontReduce2 my-auto d-none d-md-flex">
								{item?.item_id}
							</div>
							<div className="col textTrunc fontReduce2 my-auto">
								{item?.properties?.network}
							</div>
							<div className="col textTrunc fontReduce2 my-auto d-none d-md-flex">
								{moment(item?.createdAt).format("L")}
							</div>
							<div className="col textTrunc fontReduce2 my-auto">
								{item?.properties?.phone}
							</div>
							<div className="col textTrunc fontReduce2 my-auto">
								{numberWithCommas(item?.properties?.amount)}
							</div>
							<div
								className={`col textTrunc fontReduce2 text-capitalize my-auto ${
									item?.status ? "text-success" : "text-danger"
								}`}>
								{item?.statusText}
							</div>
						</div>
					))
				)}
			</div> */}
			<NewPaginate
				state={data}
				setState={setData}
				setThisData={setThisData}
				type={"airtime_pin"}
				criteria={
					{
						// id: params?.step,
					}
				}
			/>
			<TransactionDetails
				thisData={thisData}
				setThisData={setThisData}
				type={"airtime_pin"}
				criteria={
					{
						// id: params?.step,
					}
				}
			/>
			<BottomTab state={data} paginate={airtimes_pin?.paginate} />
			<LoadMore
				next={airtimes_pin?.paginate?.next}
				handleLoadMore={handleLoadMore}
				loading={loading}
			/>
		</div>
	);
};

export const TransactionPinBox = ({
	state,
	loading,
	setState,
	handleSubmit,
}) => {
	return (
		<div className="d-flex flex-column w-100">
			<small className="mb-4 d-block text-center">
				Enter your transaction pin
			</small>
			<div className="d-flex justify-content-center my-5 mx-auto">
				<OtpComponent
					stateData={state?.pin}
					textChange={data => {
						setState({ ...state, pin: data });
					}}
					css="borderColor"
					loading={loading}
					numInputs={4}
					isInputSecure={true}
				/>
			</div>
			<div className="w-100">
				<Buttons
					title={"buy"}
					css="btn-primary1 text-capitalize py-3 px-4 px-lg-5 mx-auto"
					loading={loading}
					width={"w-50 w50"}
					onClick={() => {
						if (!state?.pin || state?.pin?.length !== 4) return;
						handleSubmit();
					}}
					style={{ borderRadius: "30px" }}
				/>
			</div>
		</div>
	);
};