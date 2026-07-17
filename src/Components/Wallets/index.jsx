import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../Data/Context";
import { Container } from "reactstrap";
import moment from "moment";
import { BiCopy, BiDotsHorizontalRounded, BiTrashAlt } from "react-icons/bi";
import { RiShieldStarFill } from "react-icons/ri";
import { Buttons, EmptyComponent } from "../../Utils";
import { Link } from "react-router-dom";
import { RoundCharts } from "../Charts";
import { toast } from "react-toastify";
import { ModalComponents } from "../DefaultHeader";
import { FaCcMastercard, FaCcVisa } from "react-icons/fa";
import { WalletForm } from "../../Views/controls";
import LoadMore, { BottomTab } from "../LoadMore";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import axios from "axios";
import { usePaystackPayment } from "react-paystack";
import { useValidation } from "../../Data/useFetch";
import { useMonnifyPayment } from "react-monnify";
import { MainPaginate, MainRanger } from "../Transactions";

let colorArr = ["#E9F9F9", "#C0938E", "#000000", "#B3CEDE"];

const Wallets = () => {
	let {
		setStateName,
		wallet,
		numberWithCommas,
		auth,
		usecase,
		nairaSign,
		converterServices,
	} = useContext(GlobalState);
	let [isTransfer, setIsTransfer] = useState(false);
	let [isWithdraw, setIsWithdraw] = useState(false);
	let toggleTransfer = () => {
		setIsTransfer(!isTransfer);
	};
	let toggleWithdraw = () => {
		setIsWithdraw(!isWithdraw);
	};
	let [isVirtual, setIsVirtual] = useState(false);
	let toggleVirtual = () => {
		setIsVirtual(!isVirtual);
	};
	let [isManual, setIsManual] = useState(false);
	let toggleManual = () => {
		setIsManual(!isManual);
	};
	let [isCard, setIsCard] = useState("");
	let toggleCard = () => {
		setIsCard("");
	};
	let [isCardType, setIsCardType] = useState("");
	let toggleCardType = () => {
		setIsCardType(!isCardType);
	};
	let [moveType, setMoveType] = useState(false),
		[thisData, setThisData] = useState(false),
		[active, setActive] = useState(0);

	useEffect(() => {
		setStateName("my account");
		converterServices("get", "banks");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div className="bg-white aboutScreen">
			<Container className="py-5">
				<div className="rounded20 walletDiv p-3 px-md-5">
					<div className="d-md-flex align-items-center h-100">
						<div className="px-3 text-dark h-100 py-3 py-md-5 mx-auto">
							<h3 className="fontReduceBig">Wallet balance</h3>
							<h1
								className={`fw-bold text5 textMini ${
									auth?.user?.privilege === "agent" ? "" : "mb-5"
								}`}>
								NGN{" "}
								{wallet?.balance?.available
									? numberWithCommas(
											Number(wallet?.balance?.available).toFixed(2)
									  )
									: 0}
							</h1>
							{auth?.user?.privilege === "agent" && (
								<div>
									<h6 className="fw-bold mb-5">
										{process.env.REACT_APP_PROVIDER_NAME} balance: {nairaSign}{" "}
										{wallet?.provider_balance?.available
											? numberWithCommas(
													Number(wallet?.provider_balance?.available).toFixed(2)
											  )
											: 0}
									</h6>
								</div>
							)}
							<div className="row mx-0 w-100 mb-5">
								<div
									className="col text-center myCursor"
									onClick={() => setMoveType("commission")}>
									<h5 className="fw-bold">
										{nairaSign}
										{wallet?.balance?.commission
											? numberWithCommas(
													Number(wallet?.balance?.commission).toFixed(2)
											  )
											: 0}
									</h5>
									<small>Commission</small>
								</div>
								<div
									className="col text-center myCursor"
									onClick={() => setMoveType("bonus")}>
									<h5 className="fw-bold">
										{nairaSign}
										{wallet?.balance?.bonus
											? numberWithCommas(
													Number(wallet?.balance?.bonus).toFixed(2)
											  )
											: 0}
									</h5>
									<small>Bonus</small>
								</div>
								<div
									className="col text-center myCursor"
									onClick={() => setMoveType("referral")}>
									<h5 className="fw-bold">
										{nairaSign}
										{wallet?.balance?.referral
											? numberWithCommas(
													Number(wallet?.balance?.referral).toFixed(2)
											  )
											: 0}
									</h5>
									<small>Referral</small>
								</div>
								<div className="col text-center">
									<h5 className="fw-bold">
										{nairaSign}
										{wallet?.wallet_details?.purchase
											? numberWithCommas(
													Number(wallet?.wallet_details?.purchase).toFixed(2)
											  )
											: 0}
									</h5>
									<small>Purchase</small>
								</div>
							</div>
							<div className="d-flex align-items-center justify-content-between">
								{usecase?.usecase?.transferFund === "enable" && (
									<button
										onClick={toggleTransfer}
										className="btn text-capitalize fw-bold btn-primary1">
										wallet transfer
									</button>
								)}
								{/* <button
									onClick={toggleWithdraw}
									className="btn text-capitalize fw-bold btn-primary1">
									withdraw
								</button> */}
							</div>
						</div>
						<div className="ms-md-auto row mx-0 h-100">
							<div className="col darkBg h-100 rounded10 p-3 py-md-5 genWalletWidth d-flex flex-column">
								<p className="text2 text-center fw-bold">Wallet ID</p>
								<p className="text-center">{wallet?.balance?.wallet_id}</p>
								<p
									className="mt-auto myCursor force-d-flex"
									onClick={
										wallet?.balance?.wallet_id
											? () => {
													navigator.clipboard
														.writeText(wallet?.balance?.wallet_id)
														.then(
															() => {
																toast.info("Copied", { autoClose: 2000 });
															},
															err => {
																toast.warn(`Could not copy: ${err}`, {
																	autoClose: 2000,
																});
															}
														);
											  }
											: null
									}>
									Copy <BiCopy />{" "}
								</p>
							</div>
							<div className="col lilacBg h-100 rounded10 p-3 py-md-5 genWalletWidth mx-md-4 mx-md-3 my-3 my-md-0">
								<p className="text2 mb-5 text-dark fw-bold">Fund Wallet</p>
								<Buttons
									onClick={toggleVirtual}
									css={"btn-dark rounded10 text-capitalize my-3 py-3"}
									title="virtual account"
								/>
								{usecase?.usecase?.fundWallet === "enable" && (
									<>
										<Buttons
											onClick={toggleCardType}
											css={"btn-dark rounded10 text-capitalize my-3 py-3"}
											title="debit card"
										/>
									</>
								)}
								<Buttons
									onClick={toggleManual}
									css={"btn-dark rounded10 text-capitalize my-3 py-3"}
									title="manual account"
								/>
							</div>
							<div className="col greyBg h-100 rounded10 p-3 py-md-5 genWalletWidth">
								<p className="text2 text-dark fw-bold">Cards</p>
								<CardList bg />
							</div>
						</div>
					</div>
				</div>{" "}
				<div className="d-flex my-4">
					<Link
						to={`/wallets/commissions`}
						className="rounded20 shadow2 p-md-5 p-4 mx-2 mx-md-3 eachProduct myCursor text-dark text-decoration-none text-center">
						<div>
							<h6>Commission</h6>
							<h5 className="textMini2">
								{nairaSign}{" "}
								{wallet?.balance?.commission
									? numberWithCommas(
											Number(wallet?.balance?.commission).toFixed(2)
									  )
									: 0}
							</h5>
						</div>
					</Link>
					<Link
						to={`/wallets/bonus`}
						className="rounded20 shadow2 p-md-5 p-4 mx-2 mx-md-3 eachProduct myCursor text-dark text-decoration-none text-center">
						<div>
							<h6>Bonus</h6>
							<h5 className="textMini2">
								{nairaSign}{" "}
								{wallet?.balance?.bonus
									? numberWithCommas(Number(wallet?.balance?.bonus).toFixed(2))
									: 0}
							</h5>
						</div>
					</Link>
					<Link
						to={`/wallets/referral`}
						className="rounded20 shadow2 p-md-5 p-4 mx-2 mx-md-3 eachProduct myCursor text-dark text-decoration-none text-center">
						<div>
							<h6>Referral</h6>
							<h5 className="textMini2">
								{nairaSign}{" "}
								{wallet?.balance?.referral
									? numberWithCommas(
											Number(wallet?.balance?.referral).toFixed(2)
									  )
									: 0}
							</h5>
						</div>
					</Link>
				</div>
				<div className="row mx-0 g-4">
					<div className="col-12">
						<div className="btn-group pb-3">
							<button
								onClick={() => setActive(0)}
								className={`btn text-capitalize fw-bold Lexend ${
									active === 0 ? "text-dark border-bottom" : "text-muted"
								}`}>
								my wallet history
							</button>
							{/* {auth?.user?.privilege === "agent" && (
                <button
                  onClick={() => setActive(1)}
                  className={`btn text-capitalize fw-bold Lexend ${
                    active === 1 ? "text-dark border-bottom" : "text-muted"
                  }`}
                >
                  pending history
                </button>
              )} */}
						</div>
						{/* <div className="Lexend fw-bold mb-2">Wallet History</div> */}
						<div>
							{active === 1 ? (
								<>
									<PendingHistory setThisData={setThisData} />
									<PendingWalletDetails
										thisData={thisData}
										setThisData={setThisData}
									/>
								</>
							) : (
								<>
									<TransferList setThisData={setThisData} />
									<WalletDetails
										thisData={thisData}
										setThisData={setThisData}
									/>
								</>
							)}
						</div>
					</div>
					<div
						className="col-md-2 rounded10 p-3 d-none"
						style={{ background: "#FCFCF9" }}>
						<h5 className="fw-bold">Your activity</h5>
						<RoundCharts
							state={[
								{
									name: "expenses",
									value: wallet?.wallet_details?.purchase,
									color: "#FEC430",
								},
								{
									name: "commission",
									value: wallet?.wallet_details?.commissionTotal,
									color: "#AD9BB1",
								},
								{
									name: "fund",
									value: wallet?.wallet_details?.walletTotal,
									color: "#63B0C4",
								},
								{
									name: "bonus",
									value: wallet?.wallet_details?.bonusTotal,
									color: "#B9BBBC",
								},
							]}
							type="pie"
							css="h-100 w-100"
							noLegend
						/>
					</div>
				</div>
			</Container>{" "}
			<MakeTransfer isOpen={isTransfer} back={toggleTransfer} />
			<MakeWithdraw isOpen={isWithdraw} back={toggleWithdraw} />
			<MakeCardType
				isOpen={isCardType}
				back={toggleCardType}
				setIsCard={setIsCard}
			/>
			{process.env.REACT_APP_FLUTTERWAVE_PUBLIC_KEY &&
				usecase?.usecase?.fundWalletFlutterwave === "enable" &&
				isCard === "flutterwave" && (
					<MakeCardsFlutter
						isOpen={isCard === "flutterwave"}
						back={toggleCard}
						back2={() => setIsCard("")}
						value={isCard}
					/>
				)}
			{process.env.REACT_APP_PAYSTACK_PUBLIC_KEY &&
				usecase?.usecase?.fundWalletPaystack === "enable" &&
				isCard === "paystack" && (
					<MakeCardsPaystack
						isOpen={isCard === "paystack"}
						back={toggleCard}
						back2={() => setIsCard("")}
						value={isCard}
					/>
				)}
			{process.env.REACT_APP_MONNIFY_API_KEY &&
				process.env.REACT_APP_MONNIFY_CONTRACT_CODE &&
				usecase?.usecase?.fundWalletMonnifyCard === "enable" &&
				isCard === "monnify" && (
					<MakeCardsMonnify
						isOpen={isCard === "monnify"}
						back={toggleCard}
						back2={() => setIsCard("")}
						value={isCard}
					/>
				)}
			<MakeVirtual isOpen={isVirtual} back={toggleVirtual} />
			<ManualAccounts isOpen={isManual} back={toggleManual} />
			<MoveFund isOpen={moveType} back={() => setMoveType(false)} />
		</div>
	);
};

export default Wallets;

const MoveFund = ({ isOpen, back }) => {
	const { bonus, commission, manageWallet, referral } = useContext(GlobalState);

	let [loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false);
	let handleMove = async e => {
		e?.preventDefault();
		setLoading(true);
		await manageWallet(isOpen);
		setLoading(false);
		setSubmit(true);
	};

	useEffect(() => {
		if (isOpen === "bonus" && submit && bonus?.isMoved) {
			setSubmit(false);
			back();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen, submit, bonus?.isMoved]);

	useEffect(() => {
		if (isOpen === "commission" && submit && commission?.isMoved) {
			setSubmit(false);
			back();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen, submit, commission?.isMoved]);

	useEffect(() => {
		if (isOpen === "referral" && submit && referral?.isMoved) {
			setSubmit(false);
			back();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen, submit, referral?.isMoved]);

	return (
		<>
			<ModalComponents
				isOpen={isOpen}
				back={back}
				title={`Move ${isOpen} wallet`}>
				<form>
					<div className="downH2 d-flex align-items-center justify-content-center">
						<form className="">
							<p>Do you want to move {isOpen} to main wallet?</p>
							<div className="btn-group mx-auto w-100">
								<Buttons
									loading={loading}
									onClick={handleMove}
									width="w-50"
									css="btn-primary1 text-capitalize py-3 w-50"
									title={"yes"}
								/>
								<Buttons
									onClick={back}
									width="w-50"
									css="btn-secondary text-capitalize py-3 w-50"
									title={"no"}
								/>
							</div>
						</form>
					</div>
				</form>
			</ModalComponents>
		</>
	);
};

const MakeCardType = ({ isOpen, back, setIsCard }) => {
	let { usecase } = useContext(GlobalState);
	let [details, setDetails] = useState("");
	return (
		<>
			<ModalComponents isOpen={isOpen} back={back} title="Choose provider">
				<form>
					<div>
						{process.env.REACT_APP_PAYSTACK_PUBLIC_KEY &&
							usecase?.usecase?.fundWalletPaystack === "enable" && (
								<div
									onClick={() => setDetails("paystack")}
									className={`my-3 border-bottom d-flex align-items-center rounded10 myCursor flex-column p-3 ${
										details === "paystack" ? "list-group-item-info" : ""
									}`}>
									<div className="d-flex flex-column mx-auto">
										<div
											className="p-3 d-flex rounded10 align-items-center justify-content-center"
											style={{
												background: "#EFEFEF",
												height: "5rem",
												width: "100%",
											}}>
											<img
												src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Paystack_Logo.png/1200px-Paystack_Logo.png?20200430170057"
												alt="Paystack"
												className="img-fluid objectFit h-100 w-100"
											/>
										</div>
									</div>
									<div className="text-center">
										<h6 className="fw-bold text-dark Lexend text2p">
											Paystack
										</h6>
									</div>
								</div>
							)}

						{process.env.REACT_APP_FLUTTERWAVE_PUBLIC_KEY &&
							usecase?.usecase?.fundWalletFlutterwave === "enable" && (
								<div
									onClick={() => setDetails("flutterwave")}
									className={`my-3 border-bottom d-flex align-items-center rounded10 myCursor flex-column p-3 ${
										details === "flutterwave" ? "list-group-item-info" : ""
									}`}>
									<div className="d-flex flex-column mx-auto">
										<div
											className="p-3 d-flex rounded10 align-items-center justify-content-center"
											style={{
												background: "#EFEFEF",
												height: "5rem",
												width: "100%",
											}}>
											<img
												src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Flutterwave_Logo.png/1200px-Flutterwave_Logo.png?20220812092224"
												alt="Flutterwave"
												className="img-fluid objectFit h-100 w-100"
											/>
										</div>
									</div>
									<div className="text-center">
										<h6 className="fw-bold text-dark Lexend text2p">
											Flutterwave
										</h6>
									</div>
								</div>
							)}

						{process.env.REACT_APP_MONNIFY_API_KEY &&
							process.env.REACT_APP_MONNIFY_CONTRACT_CODE &&
							usecase?.usecase?.fundWalletMonnifyCard === "enable" && (
								<div
									onClick={() => setDetails("monnify")}
									className={`my-3 border-bottom d-flex align-items-center rounded10 myCursor flex-column p-3 ${
										details === "monnify" ? "list-group-item-info" : ""
									}`}>
									<div className="d-flex flex-column mx-auto">
										<div
											className="p-3 d-flex rounded10 align-items-center justify-content-center"
											style={{
												background: "#EFEFEF",
												height: "5rem",
												width: "100%",
											}}>
											<img
												src="https://monnify.com/assets/img/svg/site-logo.svg"
												alt="Monnify"
												className="img-fluid objectFit h-100 w-100"
											/>
										</div>
									</div>
									<div className="text-center">
										<h6 className="fw-bold text-dark Lexend text2p">Monnify</h6>
									</div>
								</div>
							)}
					</div>
					<Buttons
						title={"proceed"}
						css="btn-primary1 text-capitalize py-3 w-50 my-4 mx-auto"
						width={"w-50"}
						style={{ borderRadius: "30px" }}
						onClick={() => {
							if (!details) return;
							setIsCard(details);
							back();
						}}
					/>
				</form>
			</ModalComponents>
		</>
	);
};

export const MakeCardsPaystack = ({ isOpen, back, back2 }) => {
	const {
		wallet,
		returnErrors,
		usecase,
		auth,
		manageFundWalletFlutterwave,
		nairaSignNeutral,
	} = useContext(GlobalState);

	let [amount, setAmount] = useState(""),
		[reference, setReference] = useState(""),
		config = {
			email: auth?.user?.email,
			amount: Number(amount * 100),
			publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
			metadata: {
				name: `${auth?.user?.firstName} ${auth?.user?.lastName}`,
				phone: auth?.user?.telephone,
			},
			reference: reference ? reference?.toString()?.split("|")?.join("") : "",
		},
		initializePayment = usePaystackPayment(config);

	let handleSuccess = async ref => {
		setLoading(true);
		await manageFundWalletFlutterwave(ref, "paystack");
		setLoading(false);
		setSubmit(true);
	};

	// you can call this function anything
	const onClose = () => {
		// implementation for  whatever you want to do when the Paystack dialog closed.
		console.log("closed");
	};

	const onSuccess = ref => {
		// console.log({ ref });
		handleSuccess(ref);
	};

	useEffect(() => {
		if (reference) {
			initializePayment(onSuccess, onClose);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [reference]);

	let [loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false),
		handleSubmit = async e => {
			e?.preventDefault();
			if (Number(amount) <= 0)
				return returnErrors({
					error: [
						{
							msg: `Amount cannot be less than or equal to ${nairaSignNeutral} 0`,
							param: "amount",
						},
					],
				});
			if (Number(amount) < Number(usecase?.usecase?.cardFundingMini))
				return returnErrors({
					error: [
						{
							msg: `Amount cannot be less than ${nairaSignNeutral} ${Number(
								usecase?.usecase?.cardFundingMini
							)}`,
							param: "amount",
						},
					],
				});
			if (Number(amount) > Number(usecase?.usecase?.cardFundingMax))
				return returnErrors({
					error: [
						{
							msg: `Amount cannot be more than ${nairaSignNeutral} ${Number(
								usecase?.usecase?.cardFundingMax
							)}`,
							param: "amount",
						},
					],
				});
			if (!process.env.REACT_APP_PAYSTACK_PUBLIC_KEY)
				return returnErrors({
					error: [
						{
							msg: `Your request could not be processed at the moment, please try again later`,
							param: "paystack",
						},
					],
				});
			// console.log({ payment_data });
			try {
				setLoading(true);
				var resp = await axios.get(
					`/api/v1/wallet/generate-wallet-reference?amount=${amount}`
				);
				// console.log({ resp: resp?.data });
				setReference(resp?.data?.data);
				setLoading(false);
			} catch (err) {
				setLoading(false);
				console.log({ err });
				let error = err.response?.data?.error;
				if (error) {
					returnErrors({ error, status: err?.response?.status });
				}
				if (err?.response?.status === 429) toast.error(err?.response?.data);
			}
		};

	useEffect(() => {
		if (submit && wallet?.isFunded) {
			back2();
			setSubmit(false);
			setReference("");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, wallet?.isFunded]);

	return (
		<>
			<ModalComponents
				isOpen={isOpen ? true : false}
				back={back}
				title="Paystack checkout process">
				<form>
					<div className="mb-3">
						<label htmlFor="value">Amount</label>
						<input
							type={"number"}
							placeholder="50000"
							className="form-control py-3 rounded10"
							value={amount}
							onChange={e => setAmount(e.target.value)}
						/>
					</div>
					<Buttons
						title={"fund"}
						css="btn-primary1 text-capitalize py-3 w-50 my-4 mx-auto"
						width={"w-50"}
						style={{ borderRadius: "30px" }}
						loading={loading}
						onClick={() => handleSubmit()}
					/>
				</form>
			</ModalComponents>
		</>
	);
};

const MakeWithdraw = ({ isOpen, back }) => {
	return (
		<>
			<ModalComponents isOpen={isOpen} back={back} title="Choose card">
				<form>
					<CardList />
					<Buttons
						title={"withdraw"}
						css="btn-primary1 text-capitalize py-3 w-50 my-4 mx-auto"
						width={"w-50"}
						style={{ borderRadius: "30px" }}
					/>
				</form>
			</ModalComponents>
		</>
	);
};

// const MakeCards = ({ isOpen, back, back2, value }) => {
// 	const {
// 		manageFundWallet,
// 		wallet,
// 		returnErrors,
// 		usecase,
// 		manageFundWalletFlutterwave,
// 	} = useContext(GlobalState);
// 	let init = {
// 			card_number: "",
// 			card_cvv: "",
// 			card_pin: "",
// 			card_expiry: "",
// 		},
// 		[payment_data, setPaymentData] = useState(init),
// 		[isAdd, setIsAdd] = useState(false),
// 		[amount, setAmount] = useState(""),
// 		[loading, setLoading] = useState(false),
// 		[submit, setSubmit] = useState(false),
// 		[loading2, setLoading2] = useState(false),
// 		[submit2, setSubmit2] = useState(false),
// 		[updateType, setUpdateType] = useState(""),
// 		[updateValue, setUpdateValue] = useState({
// 			status: "",
// 			reference: "",
// 		}),
// 		toggle = () => {
// 			setIsAdd(!isAdd);
// 		},
// 		textChange =
// 			name =>
// 			({ target: { value } }) => {
// 				setPaymentData({ ...payment_data, [name]: value });
// 			},
// 		handleSubmit = async e => {
// 			e?.preventDefault();
// 			if (Number(amount) <= 0)
// 				return returnErrors({
// 					error: [
// 						{
// 							msg: "Amount cannot be less than or equal to NGN 0",
// 							param: "amount",
// 						},
// 					],
// 				});
// 			if (Number(amount) < Number(usecase?.usecase?.cardFundingMini))
// 				return returnErrors({
// 					error: [
// 						{
// 							msg: `Amount cannot be less than NGN ${Number(
// 								usecase?.usecase?.cardFundingMini
// 							)}`,
// 							param: "amount",
// 						},
// 					],
// 				});
// 			if (Number(amount) > Number(usecase?.usecase?.cardFundingMax))
// 				return returnErrors({
// 					error: [
// 						{
// 							msg: `Amount cannot be more than NGN ${Number(
// 								usecase?.usecase?.cardFundingMax
// 							)}`,
// 							param: "amount",
// 						},
// 					],
// 				});
// 			setLoading(true);
// 			// console.log({ payment_data });
// 			if (value === "flutterwave")
// 				await manageFundWalletFlutterwave({ payment_data, amount });
// 			else await manageFundWallet({ payment_data, amount });
// 			setLoading(false);
// 			setSubmit(true);
// 		},
// 		handleSubmitUpdate = async e => {
// 			e?.preventDefault();
// 			setLoading2(true);
// 			let data = { ...updateValue };

// 			if (updateValue?.status === "send_pin" || updateValue?.status === "pin")
// 				data = { ...data, pin: updateType };
// 			else if (
// 				updateValue?.status === "send_otp" ||
// 				updateValue?.status === "otp"
// 			)
// 				data = { ...data, otp: updateType };
// 			else if (updateValue?.status === "send_phone")
// 				data = { ...data, phone: updateType };
// 			else if (updateValue?.status === "send_birthday")
// 				data = { ...data, birthday: updateType };

// 			// console.log({ data, updateValue });
// 			if (value === "flutterwave")
// 				await manageFundWalletFlutterwave(data, "update");
// 			else await manageFundWallet(data, "update");
// 			setLoading2(false);
// 			setSubmit2(true);
// 		},
// 		setDetails = data => {
// 			setPaymentData({ ...payment_data, ...data });
// 		};

// 	useEffect(() => {
// 		if (
// 			submit &&
// 			wallet?.isFunded &&
// 			wallet?.data?.status?.toLowerCase()?.includes("success")
// 		) {
// 			back2();
// 			setSubmit(false);
// 			setPaymentData(init);
// 		}
// 		if (
// 			submit &&
// 			wallet?.isFunded &&
// 			wallet?.data?.status?.toLowerCase()?.includes("success")
// 		) {
// 			setUpdateValue(wallet?.data);
// 			back2();
// 			setSubmit(false);
// 			setPaymentData(init);
// 		}
// 		// eslint-disable-next-line react-hooks/exhaustive-deps
// 	}, [submit, wallet?.isFunded, submit2]);

// 	useEffect(() => {
// 		if (wallet?.data) {
// 			if (wallet?.data?.authorization) {
// 				setUpdateValue({
// 					...wallet?.data,
// 					status: wallet?.data?.authorization?.mode,
// 				});
// 			} else setUpdateValue(wallet?.data);
// 		}
// 		// eslint-disable-next-line react-hooks/exhaustive-deps
// 	}, [wallet?.data]);

// 	useEffect(() => {
// 		if (submit2 && wallet?.isUpdated) {
// 			back2();
// 			setSubmit(false);
// 			setPaymentData(init);
// 			setUpdateValue({ status: "" });
// 		}
// 		// eslint-disable-next-line react-hooks/exhaustive-deps
// 	}, [submit2, wallet?.isUpdated]);

// 	const { getCardNumberProps, getExpiryDateProps, getCVCProps, meta } =
// 			usePaymentInputs(),
// 		{ erroredInputs, touchedInputs } = meta;
// 	// console.log({ wal: wallet?.data, updateValue });
// 	return (
// 		<>
// 			<ModalComponents
// 				isOpen={isOpen ? true : false}
// 				back={back}
// 				title="Enter details">
// 				<form>
// 					{!isAdd && (
// 						<CardList
// 							details={setDetails}
// 							selectBg={payment_data?.card_number}
// 						/>
// 					)}
// 					<Buttons
// 						title={"new card"}
// 						css="btn-primary1 text-capitalize py-3 w-50 my-4 mx-auto"
// 						width={"w-50"}
// 						style={{ borderRadius: "30px" }}
// 						onClick={toggle}
// 					/>
// 					{isAdd && (
// 						<>
// 							<div className="mb-3">
// 								<label htmlFor="value">Card Number</label>
// 								<input
// 									{...getCardNumberProps({
// 										onChange: textChange("card_number"),
// 									})}
// 									value={payment_data?.card_number}
// 									placeholder="5394 2345 3456 5677"
// 									className="form-control py-3 rounded10"
// 									isInvalid={
// 										touchedInputs.cardNumber && erroredInputs.cardNumber
// 									}
// 								/>
// 							</div>
// 							<div className="mb-3">
// 								<label htmlFor="value">Card Expiry</label>
// 								<input
// 									{...getExpiryDateProps({
// 										onChange: textChange("card_expiry"),
// 									})}
// 									value={payment_data?.card_expiry}
// 									placeholder="12 / 24"
// 									className="form-control py-3 rounded10"
// 									isInvalid={
// 										touchedInputs.expiryDate && erroredInputs.expiryDate
// 									}
// 								/>
// 							</div>
// 							<div className="mb-3">
// 								<label htmlFor="value">Card CVV</label>
// 								<input
// 									value={payment_data?.card_cvv}
// 									{...getCVCProps({ onChange: textChange("card_cvv") })}
// 									placeholder="345"
// 									className="form-control py-3 rounded10"
// 									isInvalid={touchedInputs.cvc && erroredInputs.cvc}
// 								/>
// 							</div>
// 						</>
// 					)}
// 					{value === "flutterwave" && (
// 						<div className="mb-3">
// 							<label htmlFor="value">Card Pin</label>
// 							<input
// 								value={payment_data?.card_pin}
// 								placeholder="3456"
// 								className="form-control py-3 rounded10"
// 								onChange={textChange("card_pin")}
// 							/>
// 						</div>
// 					)}
// 					<div className="mb-3">
// 						<label htmlFor="value">Amount</label>
// 						<input
// 							type={"number"}
// 							placeholder="50000"
// 							className="form-control py-3 rounded10"
// 							value={amount}
// 							onChange={e => setAmount(e.target.value)}
// 						/>
// 					</div>
// 					<Buttons
// 						title={"fund"}
// 						css="btn-primary1 text-capitalize py-3 w-50 my-4 mx-auto"
// 						width={"w-50"}
// 						style={{ borderRadius: "30px" }}
// 						loading={loading}
// 						onClick={handleSubmit}
// 					/>
// 				</form>
// 			</ModalComponents>
// 			<ModalComponents
// 				isOpen={
// 					updateValue?.status
// 						? !updateValue?.status?.toLowerCase()?.includes("success")
// 							? true
// 							: false
// 						: false
// 				}
// 				back={() => setUpdateValue({ ...updateValue, status: "" })}
// 				title="Finalize transaction">
// 				<form>
// 					<div className="mb-3">
// 						<label htmlFor="value" className="text-capitalize">
// 							Enter {updateValue?.status?.split("_")?.[1]}
// 						</label>
// 						<input
// 							type={
// 								updateValue?.status === "send_pin" ||
// 								updateValue?.status === "pin" ||
// 								updateValue?.status === "send_otp"
// 									? "number"
// 									: updateValue?.status === "send_phone"
// 									? "tel"
// 									: updateValue?.status === "send_birthday"
// 									? "datetime-local"
// 									: "text"
// 							}
// 							placeholder="1234"
// 							className="form-control py-3 rounded10"
// 							value={updateType}
// 							onChange={e => setUpdateType(e.target.value)}
// 						/>
// 					</div>
// 					<Buttons
// 						title={updateValue?.status?.split("_")?.join(" ")}
// 						css="btn-primary1 text-capitalize py-3 w-50 my-4 mx-auto"
// 						width={"w-50"}
// 						style={{ borderRadius: "30px" }}
// 						loading={loading2}
// 						onClick={handleSubmitUpdate}
// 					/>
// 				</form>
// 			</ModalComponents>
// 		</>
// 	);
// };

const MakeCardsMonnify = ({ isOpen, back, back2 }) => {
	const {
		wallet,
		returnErrors,
		usecase,
		auth,
		manageFundWalletFlutterwave,
		nairaSignNeutral,
	} = useContext(GlobalState);

	let [payment_data, setPayment] = useState(null);

	let close = () => {
		console.log("Closed");
	};
	let onComplete = response => {
		console.log(response);
		setPayment(response);
	};
	let [amount, setAmount] = useState(""),
		[reference, setReference] = useState(),
		config = {
			apiKey: process.env.REACT_APP_MONNIFY_API_KEY,
			contractCode: process.env.REACT_APP_MONNIFY_CONTRACT_CODE,
			reference,
			amount,
			currency: "NGN",
			payment_options: "card",
			customerEmail: auth?.user?.email,
			customerMobileNumber: auth?.user?.telephone,
			customerFullName: `${auth?.user?.firstName} ${auth?.user?.lastName}`,
			paymentDescription:
				process.env.REACT_APP_AGENT_NAME +
				" Wallet Funding" +
				"Card wallet funding",
			isTestMode: process.env.NODE_ENV === "development",
			onComplete: onComplete,
			onClose: close,
		},
		handleMonnifyPayment = useMonnifyPayment(config);

	useEffect(() => {
		if (reference) {
			handleMonnifyPayment(onComplete, close);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [reference]);

	useEffect(() => {
		if (payment_data) {
			let sendBackend = async () => {
				setLoading(true);
				await manageFundWalletFlutterwave(
					payment_data?.status === "SUCCESS"
						? payment_data
						: {
								...payment_data,
								transactionReference: payment_data?.paymentReference,
						  },
					"monnify"
				);
				setLoading(false);
				setSubmit(true);
			};

			sendBackend();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [payment_data]);

	let [loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false),
		handleSubmit = async e => {
			e?.preventDefault();
			if (Number(amount) <= 0)
				return returnErrors({
					error: [
						{
							msg: `Amount cannot be less than or equal to ${nairaSignNeutral} 0`,
							param: "amount",
						},
					],
				});
			if (Number(amount) < Number(usecase?.usecase?.cardFundingMini))
				return returnErrors({
					error: [
						{
							msg: `Amount cannot be less than ${nairaSignNeutral} ${Number(
								usecase?.usecase?.cardFundingMini
							)}`,
							param: "amount",
						},
					],
				});
			if (Number(amount) > Number(usecase?.usecase?.cardFundingMax))
				return returnErrors({
					error: [
						{
							msg: `Amount cannot be more than ${nairaSignNeutral} ${Number(
								usecase?.usecase?.cardFundingMax
							)}`,
							param: "amount",
						},
					],
				});
			if (!process.env.REACT_APP_MONNIFY_API_KEY)
				return returnErrors({
					error: [
						{
							msg: `Your request could not be processed at the moment, please try again later`,
							param: "flutterwave",
						},
					],
				});
			// console.log({ payment_data });
			try {
				setLoading(true);
				var resp = await axios.get(
					`/api/v1/wallet/generate-wallet-reference?amount=${amount}`
				);
				// console.log({ resp: resp?.data });
				setReference(resp?.data?.data);
				setLoading(false);
			} catch (err) {
				setLoading(false);
				console.log({ err });
				let error = err.response?.data?.error;
				if (error) {
					returnErrors({ error, status: err?.response?.status });
				}
				if (err?.response?.status === 429) toast.error(err?.response?.data);
			}
		};

	useEffect(() => {
		if (submit && wallet?.isFunded) {
			back2();
			setSubmit(false);
			setReference("");
			setPayment(null);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, wallet?.isFunded]);

	// console.log({ wal: wallet?.data, updateValue });
	return (
		<>
			<ModalComponents
				isOpen={isOpen ? true : false}
				back={back}
				title="Monnify checkout process">
				{process.env.REAC_APP_PROVIDER_NAME === 'Spike Mobile' && 
				<>
				<p>
					<span className="tw-font-bold tw-capitalize tw-text-xl">
						charges:
					</span>{" "}
					1.5%
				</p>
				{amount && (
					<p>
						<span className="tw-font-bold tw-text-xl">
							Amount settled to you:
						</span>{" "}
						N{amount - amount * 0.015}
					</p>
				)}
				</>}
				<form>
					<div className="mb-3">
						<label htmlFor="value">Amount</label>
						<input
							type={"number"}
							placeholder="50000"
							className="form-control py-3 rounded10"
							value={amount}
							onChange={e => setAmount(e.target.value)}
						/>
					</div>

					<Buttons
						title={"Pay"}
						css="btn-primary1 text-capitalize py-3 w-50 my-4 mx-auto"
						width={"w-50"}
						style={{ borderRadius: "30px" }}
						loading={loading}
						onClick={() => handleSubmit()}
					/>
				</form>
			</ModalComponents>
		</>
	);
};

const MakeCardsFlutter = ({ isOpen, back, back2 }) => {
	const {
		wallet,
		returnErrors,
		usecase,
		auth,
		manageFundWalletFlutterwave,
		nairaSignNeutral,
	} = useContext(GlobalState);

	let [amount, setAmount] = useState(""),
		[payment_data, setPaymentData] = useState(null),
		[reference, setReference] = useState(""),
		config = {
			public_key: process.env.REACT_APP_FLUTTERWAVE_PUBLIC_KEY,
			tx_ref: reference,
			amount,
			currency: "NGN",
			payment_options: "card",
			customer: {
				email: auth?.user?.email,
				phone_number: auth?.user?.telephone,
				name: `${auth?.user?.firstName} ${auth?.user?.lastName}`,
			},
			customizations: {
				title: process.env.REACT_APP_AGENT_NAME + " Wallet Funding",
				description: "Card wallet funding",
				logo: process.env.REACT_APP_IMAGE_URL,
			},
		},
		handleFlutterPayment = useFlutterwave(config);

	useEffect(() => {
		if (payment_data) {
			let sendBackend = async () => {
				setLoading(true);
				await manageFundWalletFlutterwave(payment_data, "flutterwave");
				setLoading(false);
				setSubmit(true);
			};

			sendBackend();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [payment_data]);

	useEffect(() => {
		if (reference) {
			handleFlutterPayment({
				callback: response => {
					// console.log(response);
					setPaymentData(response);
					closePaymentModal();
				},
				onClose: () => {},
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [reference]);

	let [loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false),
		handleSubmit = async e => {
			e?.preventDefault();
			if (Number(amount) <= 0)
				return returnErrors({
					error: [
						{
							msg: `Amount cannot be less than or equal to ${nairaSignNeutral} 0`,
							param: "amount",
						},
					],
				});
			if (Number(amount) < Number(usecase?.usecase?.cardFundingMini))
				return returnErrors({
					error: [
						{
							msg: `Amount cannot be less than ${nairaSignNeutral} ${Number(
								usecase?.usecase?.cardFundingMini
							)}`,
							param: "amount",
						},
					],
				});
			if (Number(amount) > Number(usecase?.usecase?.cardFundingMax))
				return returnErrors({
					error: [
						{
							msg: `Amount cannot be more than ${nairaSignNeutral} ${Number(
								usecase?.usecase?.cardFundingMax
							)}`,
							param: "amount",
						},
					],
				});
			if (!process.env.REACT_APP_FLUTTERWAVE_PUBLIC_KEY)
				return returnErrors({
					error: [
						{
							msg: `Your request could not be processed at the moment, please try again later`,
							param: "flutterwave",
						},
					],
				});
			// console.log({ payment_data });
			try {
				setLoading(true);
				var resp = await axios.get(
					`/api/v1/wallet/generate-wallet-reference?amount=${amount}`
				);
				// console.log({ resp: resp?.data });
				setReference(resp?.data?.data);
				setLoading(false);
			} catch (err) {
				setLoading(false);
				console.log({ err });
				let error = err.response?.data?.error;
				if (error) {
					returnErrors({ error, status: err?.response?.status });
				}
				if (err?.response?.status === 429) toast.error(err?.response?.data);
			}
		};

	useEffect(() => {
		if (submit && wallet?.isFunded) {
			back2();
			setSubmit(false);
			setReference("");
			setPaymentData(null);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, wallet?.isFunded]);

	// console.log({ wal: wallet?.data, updateValue });
	return (
		<>
			<ModalComponents
				isOpen={isOpen ? true : false}
				back={back}
				title="Flutterwave checkout process">
				<form>
					<div className="mb-3">
						<label htmlFor="value">Amount</label>
						<input
							type={"number"}
							placeholder="50000"
							className="form-control py-3 rounded10"
							value={amount}
							onChange={e => setAmount(e.target.value)}
						/>
					</div>
					<Buttons
						title={"fund"}
						css="btn-primary1 text-capitalize py-3 w-50 my-4 mx-auto"
						width={"w-50"}
						style={{ borderRadius: "30px" }}
						loading={loading}
						onClick={() => handleSubmit()}
					/>
				</form>
			</ModalComponents>
		</>
	);
};

const MakeVirtual = ({ isOpen, back }) => {
	const { wallet, generateVirtual, generateVirtualCebiz, usecase } =
		useContext(GlobalState);
	let [loading, setLoading] = useState(false);
	let [loading2, setLoading2] = useState(false);

	return (
		<>
			<ModalComponents isOpen={isOpen} back={back} title="virtual accounts">
				{process.env.REAC_APP_PROVIDER_NAME === 'Spike Mobile' && 
				<>
				<p>
					<span className="tw-font-bold tw-text-xl tw-capitalize">
					charges:
					</span>{" "}
					1%
				</p>
				</>}
				<form>
					{usecase?.usecase?.fundWalletMonnify === "enable" && (
						<>
							{wallet?.wallet_details?.virtual ? (
								<div>
									{wallet?.wallet_details?.virtual?.accounts?.map((it, i) => (
										<div
											key={i}
											className="my-3 d-flex align-items-center rounded10 bg-light p-3">
											<div className="d-flex me-2">
												<div
													className="p-3 d-flex rounded10 align-items-center justify-content-center"
													style={{
														background: `${colorArr[i % colorArr.length]}`,
													}}>
													<RiShieldStarFill
														size={24}
														color={`${
															colorArr[i % colorArr.length] === "#000000"
																? "#fff"
																: "#000"
														}`}
													/>
												</div>
											</div>
											<div>
												<h6 className="fw-bold text-muted">{it?.bankName}</h6>
												<h6 className="fw-bold force-d-flex">
													{it?.accountNumber}{" "}
													<BiCopy
														size={20}
														className="ms-3 myCursor"
														onClick={() => {
															navigator.clipboard
																.writeText(it?.accountNumber)
																.then(
																	() => {
																		toast.info("Copied", { autoClose: 2000 });
																	},
																	err => {
																		toast.warn(`Could not copy: ${err}`, {
																			autoClose: 2000,
																		});
																	}
																);
														}}
													/>{" "}
												</h6>
											</div>
										</div>
									))}
								</div>
							) : (
								<Buttons
									title={"generate account"}
									css="btn-primary1 text-capitalize py-3 w-50 my-4 mx-auto"
									width={"w-50"}
									onClick={async () => {
										setLoading(true);
										await generateVirtual();
										setLoading(false);
									}}
									style={{ borderRadius: "30px" }}
									loading={loading}
								/>
							)}
						</>
					)}
					{usecase?.usecase?.fundWalletCebiz === "enable" && (
						<>
							{process.env.REACT_APP_AGENT_NAME === "Cebizpay" ? (
								<>
									<h5 className="Lexend my-3">Cebiz</h5>
									{wallet?.wallet_details?.cebiz ? (
										<div className="my-3 d-flex align-items-center rounded10 bg-light p-3">
											<div className="d-flex me-2">
												<div
													className="p-3 d-flex rounded10 align-items-center justify-content-center"
													style={{
														background: `${colorArr[colorArr.length]}`,
													}}>
													<RiShieldStarFill
														size={24}
														color={`${
															colorArr[colorArr.length] === "#000000"
																? "#fff"
																: "#000"
														}`}
													/>
												</div>
											</div>
											<div>
												<h6 className="fw-bold text-muted">WEMA BANK</h6>
												<h6 className="fw-bold">
													{wallet?.wallet_details?.cebiz?.account_id}{" "}
													<BiCopy
														size={20}
														className="ms-3 myCursor"
														onClick={() => {
															navigator.clipboard
																.writeText(
																	wallet?.wallet_details?.cebiz?.account_id
																)
																.then(
																	() => {
																		toast.info("Copied", { autoClose: 2000 });
																	},
																	err => {
																		toast.warn(`Could not copy: ${err}`, {
																			autoClose: 2000,
																		});
																	}
																);
														}}
													/>{" "}
												</h6>
											</div>
										</div>
									) : (
										<Buttons
											title={"generate cebiz account"}
											css="btn-primary1 text-capitalize py-3 w-50 my-4 mx-auto"
											width={"w-50"}
											onClick={async () => {
												setLoading2(true);
												await generateVirtualCebiz();
												setLoading2(false);
											}}
											style={{ borderRadius: "30px" }}
											loading={loading2}
										/>
									)}
								</>
							) : null}
						</>
					)}
				</form>
			</ModalComponents>
		</>
	);
};

const ManualAccounts = ({ isOpen, back }) => {
	const { stat, converter, manageManualBanks, auth } = useContext(GlobalState);
	let init = {
			account_number: "",
			account_name: "",
			bank_name: "",
			bank_code: "",
		},
		[loading, setLoading] = useState(false),
		[newState, setNewState] = useState(false),
		[submit, setSubmit] = useState(false),
		[state, setState] = useState(init),
		textChange =
			name =>
			({ target: { value } }) => {
				setState({ ...state, [name]: value });
			},
		handleSubmitBank = async e => {
			if (e) e.preventDefault();
			if (
				!state?.bank_code &&
				!state?.bank_name &&
				!state?.account_name &&
				!state?.account_number
			)
				return toast.info("Please provide bank name and account number", {
					autoClose: 10000,
				});
			setLoading(true);
			await manageManualBanks("post", state);
			setLoading(false);
			setSubmit(true);
		},
		{ validateLoading, handleFetch } = useValidation(
			"banks",
			state,
			setNewState
		),
		[active, setActive] = useState(false);

	useEffect(() => {
		if (state?.account_number?.length === 10 && state?.bank_code) handleFetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state?.account_number, state?.bank_code]);

	useEffect(() => {
		if (state?.bank_code) {
			converter?.banks?.map(
				item =>
					item?.code === state?.bank_code &&
					setState({ ...state, bank_name: item?.name })
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state?.bank_code, converter]);

	useEffect(() => {
		if (newState) {
			setState({
				...state,
				account_name: newState?.data?.account_name,
				account_number: newState?.data?.account_number,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [newState]);

	useEffect(() => {
		if (submit && stat?.isAdded) {
			setSubmit(false);
			setActive(false);
			setState(init);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, stat?.isDeleted, stat?.isAdded]);

	return (
		<>
			<ModalComponents isOpen={isOpen} back={back} title="manual accounts">
				<form>
					{stat?.banks ? (
						<div>
							{stat?.banks?.map((it, i) => (
								<div
									key={i}
									className="my-3 d-flex align-items-center rounded10 bg-light p-3">
									<div className="d-flex me-2">
										<div
											className="p-3 d-flex rounded10 align-items-center justify-content-center"
											style={{
												background: `${colorArr[i % colorArr.length]}`,
											}}>
											<RiShieldStarFill
												size={24}
												color={`${
													colorArr[i % colorArr.length] === "#000000"
														? "#fff"
														: "#000"
												}`}
											/>
										</div>
									</div>
									<div>
										<h6 className="fw-bold text-muted">{it?.bank_name}</h6>
										<h6 className="fw-bold text-muted">{it?.account_name}</h6>
										<h6 className="fw-bold force-d-flex">
											{it?.account_number}{" "}
											<BiCopy
												size={20}
												className="ms-3 myCursor"
												onClick={() => {
													navigator.clipboard
														.writeText(it?.account_number)
														.then(
															() => {
																toast.info("Copied", { autoClose: 2000 });
															},
															err => {
																toast.warn(`Could not copy: ${err}`, {
																	autoClose: 2000,
																});
															}
														);
												}}
											/>{" "}
										</h6>
										{auth?.user?.privilege === "agent" && (
											<BiTrashAlt
												size={20}
												color="red"
												onClick={async () => {
													if (window.confirm("Do you want to delete this")) {
														setLoading(true);
														await manageManualBanks("delete", it);
														setLoading(false);
													}
												}}
												className="myCursor"
											/>
										)}
									</div>
								</div>
							))}
						</div>
					) : null}
					{active ? (
						<>
							<div className="mb-3">
								<label className="text-capitalize" htmlFor="bank_code">
									Account Bank
								</label>
								<select
									className="form-control py-3 py-md-4 bg-transparent text-capitalize form-select"
									name="bank_code"
									placeholder="Account Bank"
									value={state?.bank_code}
									onChange={textChange("bank_code")}
									readOnly={validateLoading}
									id="bank_code">
									<option value="">select bank</option>
									{converter?.banks?.map((item, i) => (
										<option value={item?.code} key={i}>
											{item?.name}
										</option>
									))}
								</select>
							</div>
							<div className="mb-3">
								<label className="text-capitalize" htmlFor="name">
									Bank account
								</label>
								<input
									type="number"
									className="form-control py-3 py-md-4 bg-transparent"
									required
									name="account_number"
									readOnly={validateLoading}
									value={state?.account_number}
									onChange={textChange("account_number")}
								/>
							</div>
							{state?.account_name && state?.account_number?.length === 10 && (
								<div className="mb-3">
									<label className="text-capitalize" htmlFor="name">
										Account name
									</label>
									<input
										type="text"
										required
										name="account_name"
										readOnly
										className="form-control py-3 py-md-4 bg-transparent"
										value={state?.account_name}
										onChange={textChange("account_name")}
									/>
								</div>
							)}
							<div>
								<Buttons
									title={"add"}
									css="btn-primary1 text-capitalize py-3 w-50 my-4 mx-auto"
									width={"w-50"}
									style={{ borderRadius: "30px" }}
									loading={loading}
									onClick={handleSubmitBank}
								/>
							</div>
						</>
					) : auth?.user?.privilege === "agent" ? (
						<Buttons
							title={"add new"}
							css="btn-primary1 text-capitalize py-3 w-50 my-4 mx-auto"
							width={"w-50"}
							onClick={async () => {
								setActive(true);
							}}
							style={{ borderRadius: "30px" }}
						/>
					) : null}
				</form>
			</ModalComponents>
		</>
	);
};

const MakeTransfer = ({ isOpen, back }) => {
	let { manageWallet, wallet, returnErrors } = useContext(GlobalState);

	let init = {
			type: "wallet",
			user: "",
			amount: "",
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
			if (Number(state?.amount) <= 0)
				return returnErrors({
					error: [
						{
							msg: "Amount cannot be less than or equal to NGN 0",
							param: "amount",
						},
					],
				});
			setLoading(true);
			await manageWallet("wallet", state);
			setLoading(false);
			setSubmit(true);
		};

	useEffect(() => {
		if (wallet?.isTransfer && submit) {
			back();
			setSubmit(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [wallet?.isTransfer, submit]);

	return (
		<>
			<ModalComponents isOpen={isOpen} back={back} title="Transfer">
				<WalletForm state={state} textChange={textChange} />
				<Buttons
					title={"transfer"}
					css="btn-primary1 text-capitalize py-3 w-50 my-4 mx-auto"
					width={"w-50"}
					style={{ borderRadius: "30px" }}
					loading={loading}
					onClick={handleSubmit}
				/>
			</ModalComponents>
		</>
	);
};

export const BonusCommission = ({ type, general }) => {
	const {
		bonus,
		commission,
		numberWithCommas,
		getWalletHistory,
		nairaSign,
		referral,
	} = useContext(GlobalState);

	let [state, setState] = useState(null);

	useEffect(() => {
		getWalletHistory(
			type === "bonus"
				? "bonus"
				: type === "referral"
				? "referral"
				: "commission",
			general ? { general: general } : null
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [general, type]);

	let [loading, setLoading] = useState(false);
	let handleLoadMore = async () => {
		setLoading(true);

		await getWalletHistory(
			type === "bonus"
				? "bonus"
				: type === "referral"
				? "referral"
				: "commission",
			general
				? {
						limit: Number(
							type === "bonus"
								? bonus?.paginate?.nextPage * bonus?.paginate?.limit
								: commission?.paginate?.nextPage * commission?.paginate?.limit
						),
						general: "general",
				  }
				: {
						limit: Number(
							type === "bonus"
								? bonus?.paginate?.nextPage * bonus?.paginate?.limit
								: type === "referral"
								? referral?.paginate?.nextPage * referral?.paginate?.limit
								: commission?.paginate?.nextPage * commission?.paginate?.limit
						),
				  }
		);
		setLoading(false);
	};

	useEffect(() => {
		if (type === "bonus") {
			setState(bonus?.bonus);
		} else if (type === "referral") {
			setState(referral?.referral);
		} else {
			if (general) setState(commission?.general_commission);
			else setState(commission?.commission);
		}
	}, [type, bonus, commission, general, referral]);

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
				<div className="col textTrunc fontReduce fw-bold Lexend d-none d-md-flex">
					date
				</div>
				<div className="col textTrunc fontReduce fw-bold Lexend d-none d-md-flex">
					Description
				</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">Amount</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">Balance</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">
					Previous balance
				</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">Type</div>
			</div>
			<div className="bland2 row mx-0">
				{currentItems?.length === 0 ? (
					<EmptyComponent subtitle={`${type} list is empty`} />
				) : (
					currentItems?.map((item, index) => (
						<div key={index} className="row mx-0 py-3 px-0">
							<div className="col textTrunc fontReduce2 my-auto d-none d-md-flex">
								{moment(item?.createdAt).format("L hh:mm A")}
							</div>
							<div className="col textTrunc fontReduce2 my-auto textTrunc textTrunc3 d-none d-md-flex">
								{item?.description}
							</div>
							<div className="col textTrunc fontReduce2 my-auto">
								{nairaSign}
								{numberWithCommas(Number(item?.amount).toFixed())}
							</div>
							<div className="col textTrunc fontReduce2 my-auto">
								{nairaSign}
								{numberWithCommas(Number(item?.balance).toFixed())}
							</div>
							<div className="col textTrunc fontReduce2 my-auto">
								{nairaSign}
								{numberWithCommas(Number(item?.prevBalance).toFixed())}
							</div>
							<div
								className={`col textTrunc fontReduce2 my-auto text-capitalize ${
									item?.type === "credit" ? "text-success" : "text-danger"
								}`}>
								{item?.type}
							</div>
						</div>
					))
				)}
			</div>
			<MainPaginate handlePageClick={handlePageClick} pageCount={pageCount} />
			<BottomTab
				state={state}
				paginate={
					type === "bonus"
						? bonus?.paginate
						: type === "referral"
						? referral?.paginate
						: general
						? commission?.general_paginate
						: commission?.paginate
				}
			/>
			<LoadMore
				next={
					type === "bonus"
						? bonus?.paginate?.next
						: type === "referral"
						? referral?.paginate?.next
						: general
						? commission?.general_paginate?.next
						: commission?.paginate?.next
				}
				handleLoadMore={handleLoadMore}
				loading={loading}
			/>
		</div>
	);
};

const TransferList = ({ setThisData }) => {
	const { wallet, getWalletHistory, getReload } = useContext(GlobalState);
	let [loading, setLoading] = useState(false),
		[search, setSearch] = useState(""),
		[state, setState] = useState(null);

	useEffect(() => {
		getWalletHistory("wallet");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (search) {
			document.getElementById("Search").addEventListener("search", () => {
				getReload();
			});
			let handleSubmit = async () => {
				if (!search) return;

				await getWalletHistory("wallet", {
					search,
				});
			};
			handleSubmit();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search]);

	useEffect(() => {
		if (wallet.isFound) {
			setState(wallet.mainSearch);
		} else setState(wallet.wallet);
	}, [wallet.wallet, wallet.isFound, wallet.mainSearch]);

	useEffect(() => {
		getReload();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let handleLoadMore = async () => {
		setLoading(true);

		if (search) {
			await getWalletHistory("wallet", {
				limit: Number(wallet?.paginate?.nextPage * wallet?.paginate?.limit),
				search,
			});
		} else {
			await getWalletHistory("wallet", {
				limit: Number(wallet?.paginate?.nextPage * wallet?.paginate?.limit),
			});
		}
		setLoading(false);
	};

	if (!state) return <></>;

	return (
		<>
			<HistoryData
				search={search}
				setSearch={setSearch}
				setThisData={setThisData}
				state={state}
			/>
			<BottomTab
				state={state}
				paginate={search ? wallet?.search_paginate : wallet?.paginate}
			/>
			<LoadMore
				next={search ? wallet?.search_paginate?.next : wallet?.paginate?.next}
				handleLoadMore={handleLoadMore}
				loading={loading}
			/>
		</>
	);
};

let CardList = ({ bg, details, selectBg }) => {
	const { wallet } = useContext(GlobalState);

	let [state, setState] = useState(null);

	useEffect(() => {
		setState(bg ? wallet?.cards?.slice(0, 2) : wallet?.cards);
	}, [bg, wallet?.cards]);

	if (!state) return;

	return (
		<>
			<div>
				{state?.map((it, i) => (
					<div
						key={i}
						onClick={details ? () => details(it) : () => {}}
						className={`my-3 d-flex align-items-center rounded10 myCursor ${
							bg ? "" : "bg-light"
						}p-3 ${
							selectBg === it?.card_number ? "list-group-item-info" : ""
						}`}>
						<div className="d-flex me-2">
							<div
								className="p-3 d-flex rounded10 align-items-center justify-content-center"
								style={{ background: i % 2 === 0 ? "#EFEFEF" : "#34302F" }}>
								{it?.brand?.toLowerCase() === "visa" ? (
									<FaCcVisa
										size={30}
										color={i % 2 !== 0 ? "#EFEFEF" : "#34302F"}
									/>
								) : (
									<FaCcMastercard
										size={30}
										color={i % 2 !== 0 ? "#EFEFEF" : "#34302F"}
									/>
								)}
							</div>
						</div>
						<div>
							<h6 className="fw-bold text-dark">
								*
								{
									it?.card_number?.split(" ")[
										it?.card_number?.split(" ")?.length - 1
									]
								}
							</h6>
							<small className="fw-bold text-dark text-capitalize">
								{it?.brand}
							</small>
							{/* <h6 className="fw-bold">
								{it?.number}{" "}
								<BiCopy
									size={20}
									className="ms-3 myCursor"
									onClick={() => {
										navigator.clipboard.writeText(it?.number).then(
											() => {
												toast.info("Copied");
											},
											err => {
												toast.warn(`Could not copy: ${err}`);
											}
										);
									}}
								/>{" "}
							</h6> */}
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export const WalletDetails = ({ thisData, setThisData }) => {
	let { numberWithCommas, auth, nairaSign } = useContext(GlobalState);
	return (
		<>
			<ModalComponents
				isOpen={thisData ? true : false}
				toggle={() => setThisData(false)}
				title="Wallet details">
				<div className="downH2 d-flex flex-column">
					<p className="text-capitalize border-bottom d-flex justify-content-between">
						<span>Id: </span>
						<span className="fontInherit Lexend">{thisData?.item_id}</span>{" "}
					</p>
					<p className="text-capitalize border-bottom d-flex justify-content-between">
						<span>type: </span>
						<span
							className={`fontInherit Lexend ${
								thisData?.type === "credit"
									? "text-success2 text-success-2 text-success"
									: "text-danger2"
							}`}>
							{thisData?.type}
						</span>{" "}
					</p>
					<p className="text-capitalize border-bottom d-flex justify-content-between">
						<span>date: </span>
						<span className="fontInherit Lexend">
							{moment(thisData?.createdAt).format("DD/MM/YYYY hh:mm A")}
						</span>{" "}
					</p>
					{auth?.user?.privilege === "agent" && (
						<p className="border-bottom d-flex justify-content-between">
							<span className="text-capitalize">User: </span>
							<span>
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
					)}
					<p className="text-capitalize border-bottom d-flex justify-content-between">
						<span>Amount: </span>
						<span className="fontInherit Lexend">
							{nairaSign}{" "}
							{thisData?.amount
								? numberWithCommas(Number(thisData?.amount).toFixed(2))
								: 0}
						</span>{" "}
					</p>
					<p className="text-capitalize border-bottom d-flex justify-content-between">
						<span>{thisData?.status ? "Previous " : "Initial "} Balance: </span>
						<span className="fontInherit Lexend">
							{nairaSign}{" "}
							{thisData?.prevBalance
								? numberWithCommas(Number(thisData?.prevBalance).toFixed(2))
								: 0}
						</span>{" "}
					</p>
					<p className="text-capitalize border-bottom d-flex justify-content-between">
						<span>{thisData?.status ? "Current " : "Expected "}Balance: </span>
						<span className="fontInherit Lexend">
							{nairaSign}{" "}
							{thisData?.balance
								? numberWithCommas(Number(thisData?.balance).toFixed(2))
								: 0}
						</span>{" "}
					</p>
					<p className="text-capitalize border-bottom d-flex justify-content-between">
						<span>Description: </span>
						<span className="fontInherit Lexend">
							{thisData?.description}
						</span>{" "}
					</p>
					<p className="text-capitalize border-bottom d-flex justify-content-between">
						<span>Status: </span>
						<span
							className={`fontInherit Lexend ${
								thisData?.status
									? "text-success2 text-success-2 text-success"
									: "text-danger2"
							}`}>
							{thisData?.statusText}
						</span>{" "}
					</p>
				</div>
			</ModalComponents>
		</>
	);
};

export const HistoryData = ({ state, search, setSearch, setThisData }) => {
	const { numberWithCommas, nairaSign } = useContext(GlobalState);

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
			<div className="bland row mx-0 py-3 px-0 text-capitalize">
				<div className="col textTrunc fontReduce fw-bold Lexend">S/N</div>
				<div className="col textTrunc fontReduce fw-bold Lexend d-none d-md-flex"></div>
				<div className="col textTrunc fontReduce fw-bold Lexend">
					Description
				</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">Amount</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">
					Previous balance
				</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">Balance</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">date</div>
				<div className="col d-none d-md-flex"></div>
			</div>
			{currentItems?.length === 0 ? (
				<EmptyComponent subtitle={"Wallet is empty"} />
			) : (
				currentItems?.map((it, i) => (
					<div
						onClick={() => setThisData(it)}
						key={i}
						className="row mx-0 py-3 border-bottom myCursor">
						<div className="col my-auto text-capitalize fontReduce2 textTrunc py-3 py-md-4">
							{i + 1}
						</div>
						<div className="col d-none d-md-flex fontReduce2">
							<div className="d-flex">
								<div
									className="p-3 d-flex rounded10 align-items-center justify-content-center"
									style={{ background: `${colorArr[i % colorArr?.length]}` }}>
									<RiShieldStarFill
										size={24}
										color={`${
											colorArr[i % colorArr?.length] === "#000000"
												? "#fff"
												: "#000"
										}`}
									/>
								</div>
							</div>
						</div>
						<div className="col my-auto text-capitalize textTrunc textTrunc2 fw-md-bold fontReduce2">
							{it?.description}
						</div>
						<div className="col my-auto fontReduce2 d-flex w-100">
							<span className="fontInherit d-none d-md-flex me-md-1">
								{nairaSign}
							</span>{" "}
							{it?.amount ? numberWithCommas(Number(it?.amount).toFixed(2)) : 0}
						</div>
						<div className="col my-auto fontReduce2 d-flex w-100">
							<span className="fontInherit d-none d-md-flex me-md-1">
								{nairaSign}
							</span>{" "}
							{it?.prevBalance
								? numberWithCommas(Number(it?.prevBalance).toFixed(2))
								: 0}
						</div>
						<div className="col my-auto fontReduce2 d-flex w-100">
							<span className="fontInherit d-none d-md-flex me-md-1">
								{nairaSign}
							</span>{" "}
							{it?.balance
								? numberWithCommas(Number(it?.balance).toFixed(2))
								: 0}
						</div>
						<div className="col my-auto fontReduce2">
							{moment(it?.createdAt).format("DD/MM/YYYY hh:mm A")}
						</div>
						<div className="col my-auto d-none d-md-flex fontReduce2">
							<div className="d-flex">
								<div
									className={`p-3 d-flex rounded10 align-items-center justify-content-center shadow2 myCursor horizHover ${
										it?.type === "credit"
											? "list-group-item-success"
											: "list-group-item-danger"
									}`}>
									<BiDotsHorizontalRounded size={24} />
								</div>
							</div>
						</div>
					</div>
				))
			)}
			<MainPaginate handlePageClick={handlePageClick} pageCount={pageCount} />
		</>
	);
};

export const PendingHistory = ({ setThisData }) => {
	let [active, setActive] = useState(0);
	return (
		<>
			<div className="btn-group pb-3">
				<button
					onClick={() => setActive(0)}
					className={`btn text-capitalize fw-bold Lexend ${
						active === 0 ? "text-dark border-bottom" : "text-muted"
					}`}>
					wallet transfer
				</button>
				<button
					onClick={() => setActive(1)}
					className={`btn text-capitalize fw-bold Lexend ${
						active === 1 ? "text-dark border-bottom" : "text-muted"
					}`}>
					virtual payment
				</button>
				<button
					onClick={() => setActive(2)}
					className={`btn text-capitalize fw-bold Lexend ${
						active === 2 ? "text-dark border-bottom" : "text-muted"
					}`}>
					card payment
				</button>
			</div>
			<div>
				{active === 2 ? (
					<PayStackPending setThisData={setThisData} />
				) : active === 1 ? (
					<MonnifyPending setThisData={setThisData} />
				) : (
					<TransferPending setThisData={setThisData} />
				)}
			</div>
		</>
	);
};

export let MonnifyPending = ({ setThisData }) => {
	const { pending_virtual, loadAllPending, getReload } =
		useContext(GlobalState);
	let [loading, setLoading] = useState(false),
		[search, setSearch] = useState(""),
		[state, setState] = useState(null);

	useEffect(() => {
		loadAllPending({
			type: "virtual",
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (search) {
			document.getElementById("Search").addEventListener("search", () => {
				getReload();
			});
			let handleSubmit = async () => {
				if (!search) return;

				await loadAllPending({
					search,
					type: "virtual",
				});
			};
			handleSubmit();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search]);

	useEffect(() => {
		if (pending_virtual.isFound) {
			setState(
				pending_virtual.mainSearch?.filter(item => item?.action !== "approved")
			);
		} else
			setState(
				pending_virtual.virtual?.filter(item => item?.action !== "approved")
			);
	}, [
		pending_virtual.virtual,
		pending_virtual.isFound,
		pending_virtual.mainSearch,
	]);

	useEffect(() => {
		getReload();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let handleLoadMore = async () => {
		setLoading(true);

		if (search) {
			await loadAllPending({
				limit: Number(
					pending_virtual?.paginate?.nextPage * pending_virtual?.paginate?.limit
				),
				search,
				type: "virtual",
			});
		} else {
			await loadAllPending({
				limit: Number(
					pending_virtual?.paginate?.nextPage * pending_virtual?.paginate?.limit
				),
				type: "virtual",
			});
		}
		setLoading(false);
	};

	if (!state) return <></>;

	return (
		<>
			<PendingHistoryData
				search={search}
				setSearch={setSearch}
				setThisData={setThisData}
				state={state}
			/>
			<BottomTab
				state={state}
				paginate={
					search ? pending_virtual?.search_paginate : pending_virtual?.paginate
				}
			/>
			<LoadMore
				next={
					search
						? pending_virtual?.search_paginate?.next
						: pending_virtual?.paginate?.next
				}
				handleLoadMore={handleLoadMore}
				loading={loading}
			/>
		</>
	);
};

export let TransferPending = ({ setThisData }) => {
	const { pending_wallet, loadAllPending, getReload } = useContext(GlobalState);
	let [loading, setLoading] = useState(false),
		[search, setSearch] = useState(""),
		[state, setState] = useState(null);

	useEffect(() => {
		if (search) {
			document.getElementById("Search").addEventListener("search", () => {
				getReload();
			});
			let handleSubmit = async () => {
				if (!search) return;

				await loadAllPending({
					search,
					type: "transfer",
				});
			};
			handleSubmit();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search]);

	useEffect(() => {
		loadAllPending({
			type: "transfer",
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (pending_wallet.isFound) {
			setState(
				pending_wallet.mainSearch?.filter(item => item?.action !== "approved")
			);
		} else
			setState(
				pending_wallet.wallet?.filter(item => item?.action !== "approved")
			);
	}, [
		pending_wallet.wallet,
		pending_wallet.isFound,
		pending_wallet.mainSearch,
	]);

	useEffect(() => {
		getReload();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let handleLoadMore = async () => {
		setLoading(true);

		if (search) {
			await loadAllPending({
				limit: Number(
					pending_wallet?.paginate?.nextPage * pending_wallet?.paginate?.limit
				),
				search,
				type: "transfer",
			});
		} else {
			await loadAllPending({
				limit: Number(
					pending_wallet?.paginate?.nextPage * pending_wallet?.paginate?.limit
				),
				type: "transfer",
			});
		}
		setLoading(false);
	};

	if (!state) return <></>;

	return (
		<>
			<PendingHistoryData
				search={search}
				setSearch={setSearch}
				setThisData={setThisData}
				state={state}
			/>
			<BottomTab
				state={state}
				paginate={
					search ? pending_wallet?.search_paginate : pending_wallet?.paginate
				}
			/>
			<LoadMore
				next={
					search
						? pending_wallet?.search_paginate?.next
						: pending_wallet?.paginate?.next
				}
				handleLoadMore={handleLoadMore}
				loading={loading}
			/>
		</>
	);
};

export let PayStackPending = ({ setThisData }) => {
	const { pending_card, loadAllPending, getReload } = useContext(GlobalState);
	let [loading, setLoading] = useState(false),
		[search, setSearch] = useState(""),
		[state, setState] = useState(null);

	useEffect(() => {
		if (search) {
			document.getElementById("Search").addEventListener("search", () => {
				getReload();
			});
			let handleSubmit = async () => {
				if (!search) return;

				await loadAllPending({
					search,
					type: "card",
				});
			};
			handleSubmit();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search]);

	useEffect(() => {
		loadAllPending({
			type: "card",
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (pending_card.isFound) {
			setState(
				pending_card.mainSearch?.filter(item => item?.action !== "approved")
			);
		} else
			setState(pending_card.card?.filter(item => item?.action !== "approved"));
	}, [pending_card.card, pending_card.isFound, pending_card.mainSearch]);

	useEffect(() => {
		getReload();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let handleLoadMore = async () => {
		setLoading(true);

		if (search) {
			await loadAllPending({
				limit: Number(
					pending_card?.paginate?.nextPage * pending_card?.paginate?.limit
				),
				search,
				type: "card",
			});
		} else {
			await loadAllPending({
				limit: Number(
					pending_card?.paginate?.nextPage * pending_card?.paginate?.limit
				),
				type: "card",
			});
		}
		setLoading(false);
	};

	if (!state) return <></>;

	return (
		<>
			<PendingHistoryData
				search={search}
				setSearch={setSearch}
				setThisData={setThisData}
				state={state}
			/>
			<BottomTab
				state={state}
				paginate={
					search ? pending_card?.search_paginate : pending_card?.paginate
				}
			/>
			<LoadMore
				next={
					search
						? pending_card?.search_paginate?.next
						: pending_card?.paginate?.next
				}
				handleLoadMore={handleLoadMore}
				loading={loading}
			/>
		</>
	);
};

export const PendingHistoryData = ({
  state,
  search,
  setSearch,
  setThisData,
}) => {
  const { numberWithCommas, nairaSign } = useContext(GlobalState);

  let [range, setRange] = useState(10);

  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + range;
  if (!state) return;

  const currentItems = state.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(state.length / range);

  const handlePageClick = (event) => {
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
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <MainRanger setRange={setRange} range={range} />
      <div className="bland row mx-0 py-3 px-0 text-capitalize">
        <div className="col textTrunc fontReduce fw-bold Lexend d-none d-md-flex"></div>
        <div className="col textTrunc fontReduce fw-bold Lexend d-none d-md-flex">
          type
        </div>
        <div className="col textTrunc fontReduce fw-bold Lexend">Channel</div>
        <div className="col textTrunc fontReduce fw-bold Lexend">Amount</div>
        <div className="col textTrunc fontReduce fw-bold Lexend">
          Previous balance
        </div>
        <div className="col textTrunc fontReduce fw-bold Lexend">Balance</div>
        <div className="col textTrunc fontReduce fw-bold Lexend">date</div>
        <div className="col d-none d-md-flex"></div>
      </div>
      {currentItems?.length === 0 ? (
        <EmptyComponent subtitle={"Wallet is empty"} />
      ) : (
        currentItems?.map((it, i) => (
          <div
            onClick={() => setThisData(it)}
            key={i}
            className="row mx-0 py-3 border-bottom myCursor"
          >
            <div className="col d-none d-md-flex fontReduce2">
              <div className="d-flex">
                <div
                  className="p-3 d-flex rounded10 align-items-center justify-content-center"
                  style={{ background: `${colorArr[i % colorArr?.length]}` }}
                >
                  <RiShieldStarFill
                    size={24}
                    color={`${
                      colorArr[i % colorArr?.length] === "#000000"
                        ? "#fff"
                        : "#000"
                    }`}
                  />
                </div>
              </div>
            </div>
            <div className="col my-auto text-capitalize d-none d-md-flex fw-md-bold fontReduce2">
              {it?.type}
            </div>
            <div className="col my-auto text-capitalize textTrunc textTrunc2 fw-md-bold fontReduce2">
              {it?.type === "transfer"
                ? "Wallet transfer"
                : it?.type === "virtual"
                ? "Monnify"
                : it?.provider === "paystack"
                ? "Paystack"
                : it?.provider === "cebiz"
                ? "Cebiz"
                : "Flutterwave"}
            </div>
            <div className="col my-auto fontReduce2 d-flex w-100">
              <span className="fontInherit d-none d-md-flex me-md-1">
                {nairaSign}
              </span>{" "}
              {it?.amount ? numberWithCommas(Number(it?.amount).toFixed(2)) : 0}
            </div>
            <div className="col my-auto fontReduce2 d-flex w-100">
              <span className="fontInherit d-none d-md-flex me-md-1">
                {nairaSign}
              </span>{" "}
              {it?.wallet?.prevBalance
                ? numberWithCommas(Number(it?.wallet?.prevBalance).toFixed(2))
                : 0}
            </div>
            <div className="col my-auto fontReduce2 d-flex w-100">
              <span className="fontInherit d-none d-md-flex me-md-1">
                {nairaSign}
              </span>{" "}
              {it?.wallet?.balance
                ? numberWithCommas(Number(it?.wallet?.balance).toFixed(2))
                : 0}
            </div>
            <div className="col my-auto fontReduce2">
              {moment(it?.createdAt).format("DD/MM/YYYY hh:mm A")}
            </div>
            <div className="col my-auto d-none d-md-flex fontReduce2">
              <div className="d-flex">
                <div
                  className={`p-3 d-flex rounded10 align-items-center justify-content-center shadow2 myCursor horizHover ${
                    it?.type === "credit"
                      ? "list-group-item-success"
                      : "list-group-item-danger"
                  }`}
                >
                  <BiDotsHorizontalRounded size={24} />
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      <MainPaginate handlePageClick={handlePageClick} pageCount={pageCount} />
    </>
  );
};

export const PendingWalletDetails = ({ thisData, setThisData }) => {
  let {
      numberWithCommas,
      auth,
      updatePending,
      pending_wallet,
      pending_card,
      pending_virtual,
      nairaSign,
    } = useContext(GlobalState),
    [loading, setLoading] = useState(false),
    [submit, setSubmit] = useState(false);

  let handleAction = (type) => async (e) => {
    e?.preventDefault();
    setLoading(true);
    await updatePending(thisData, type === "decline" ? "declined" : "");
    setLoading(false);
    setSubmit(true);
  };

  useEffect(() => {
    if (submit && pending_wallet?.isUpdated) {
      setThisData(null);
      setSubmit(false);
    }
    if (submit && pending_virtual?.isUpdated) {
      setThisData(null);
      setSubmit(false);
    }
    if (submit && pending_card?.isUpdated) {
      setThisData(null);
      setSubmit(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    submit,
    pending_wallet?.isUpdated,
    pending_card?.isUpdated,
    pending_virtual?.isUpdated,
  ]);

  return (
    <>
      <ModalComponents
        isOpen={thisData ? true : false}
        toggle={() => setThisData(false)}
        title="Pending Wallet details"
      >
        <div className="downH2 d-flex flex-column">
          <p className="text-capitalize border-bottom d-flex justify-content-between">
            <span>Id: </span>
            <span className="fontInherit Lexend">
              {thisData?.wallet?.item_id}
            </span>{" "}
          </p>
          <p className="text-capitalize border-bottom d-flex justify-content-between">
            <span>type: </span>
            <span className="fontInherit Lexend">
              {thisData?.type === "transfer"
                ? "Wallet transfer"
                : thisData?.type === "virtual"
                ? "Monnify"
                : thisData?.provider === "paystack"
                ? "Paystack"
                : thisData?.provider === "cebiz"
                ? "Cebiz"
                : "Flutterwave"}
            </span>{" "}
          </p>
          <p className="text-capitalize border-bottom d-flex justify-content-between">
            <span>date: </span>
            <span className="fontInherit Lexend">
              {moment(thisData?.createdAt).format("DD/MM/YYYY hh:mm A")}
            </span>{" "}
          </p>
          {auth?.user?.privilege === "agent" && (
            <p className="border-bottom d-flex justify-content-between">
              <span className="text-capitalize">User: </span>
              <span>
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
          )}
          <p className="text-capitalize border-bottom d-flex justify-content-between">
            <span>Amount: </span>
            <span className="fontInherit Lexend">
              {nairaSign}{" "}
              {thisData?.amount
                ? numberWithCommas(Number(thisData?.amount).toFixed())
                : 0}
            </span>{" "}
          </p>
          <p className="text-capitalize border-bottom d-flex justify-content-between">
            <span>
              {thisData?.wallet?.status ? "Previous " : "Initial "} Balance:{" "}
            </span>
            <span className="fontInherit Lexend">
              {nairaSign}{" "}
              {thisData?.wallet?.prevBalance
                ? numberWithCommas(
                    Number(thisData?.wallet?.prevBalance).toFixed()
                  )
                : 0}
            </span>{" "}
          </p>
          <p className="text-capitalize border-bottom d-flex justify-content-between">
            <span>{thisData?.wallet?.status ? "" : "Expected "}Balance: </span>
            <span className="fontInherit Lexend">
              {nairaSign}{" "}
              {thisData?.wallet?.balance
                ? numberWithCommas(Number(thisData?.wallet?.balance).toFixed())
                : 0}
            </span>{" "}
          </p>
          {thisData?.type === "transfer" && (
            <>
              {auth?.user?.privilege === "agent" && (
                <p className="border-bottom d-flex justify-content-between">
                  <span className="text-capitalize">Receiver: </span>
                  <span>
                    <span className="fontInherit Lexend d-block text-capitalize">
                      {thisData?.wallet2?.user?.lastName}{" "}
                      {thisData?.user?.firstName}
                    </span>{" "}
                    <span className="fontInherit Lexend d-block">
                      {thisData?.wallet2?.user?.telephone}
                    </span>{" "}
                    <span className="fontInherit Lexend d-block">
                      {thisData?.wallet2?.user?.email}
                    </span>{" "}
                  </span>
                </p>
              )}
              <p className="text-capitalize border-bottom d-flex justify-content-between">
                <span>
                  Receivers'{"  "}
                  {thisData?.wallet2?.status ? "Previous " : "Initial "}{" "}
                  Balance:{" "}
                </span>
                <span className="fontInherit Lexend">
                  {nairaSign}{" "}
                  {thisData?.wallet2?.prevBalance
                    ? numberWithCommas(
                        Number(thisData?.wallet2?.prevBalance).toFixed()
                      )
                    : 0}
                </span>{" "}
              </p>
              <p className="text-capitalize border-bottom d-flex justify-content-between">
                <span>
                  Receivers' {thisData?.wallet2?.status ? "" : "Expected "}
                  Balance:{" "}
                </span>
                <span className="fontInherit Lexend">
                  {nairaSign}{" "}
                  {thisData?.wallet2?.balance
                    ? numberWithCommas(
                        Number(thisData?.wallet2?.balance).toFixed()
                      )
                    : 0}
                </span>{" "}
              </p>
            </>
          )}
          <p className="text-capitalize border-bottom d-flex justify-content-between">
            <span>Description: </span>
            <span className="fontInherit Lexend">
              {thisData?.wallet?.description}
            </span>{" "}
          </p>
          <p className="text-capitalize border-bottom d-flex justify-content-between">
            <span>Status: </span>
            <span
              className={`fontInherit Lexend ${
                thisData?.action === "approved"
                  ? "text-success2 text-success-2 text-success"
                  : "text-danger2"
              }`}
            >
              {thisData?.action}
            </span>{" "}
          </p>
          {thisData?.action === "pending" && (
            <div className="col textTrunc my-auto btn-group fontReduce2 w-50 w50 mx-auto">
              <Buttons
                loading={loading}
                css="btn btn-success2 text-capitalize p-2 p-md-3 w-100 fontReduce2"
                title={"approve"}
                onClick={handleAction("approve")}
              />
              {thisData?.type === "transfer" && (
                <>
                  <Buttons
                    loading={loading}
                    css="btn btn-danger2 text-capitalize p-2 p-md-3 w-100 fontReduce2"
                    title={"decline"}
                    onClick={handleAction("decline")}
                  />
                </>
              )}
            </div>
          )}
        </div>
      </ModalComponents>
    </>
  );
};
