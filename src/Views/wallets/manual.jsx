import React, { useState, useContext, useEffect } from "react";
import { Container } from "reactstrap";
import { Buttons } from "../../Utils";
import { GlobalState } from "../../Data/Context";
import LoadMore, { BottomTab } from "../../Components/LoadMore";
import { WalletHistoryList } from "../users/wallet/[id]";
import { ModalComponents } from "../../Components";

const Bonus = () => {
	let [isWallet, setIsWallet] = useState(false),
		toggleWallet = () => {
			setIsWallet(!isWallet);
		};

	let { setStateName } = useContext(GlobalState);
	useEffect(() => {
		setStateName("manual wallet history");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<div className="bg-white aboutScreen">
				<Container className="py-5">
					<Buttons
						title={"manual top up"}
						css="btn-primary1 text-capitalize py-3 px-4 px-lg-5"
						width={"w-25 w25"}
						onClick={toggleWallet}
						style={{ borderRadius: "30px" }}
					/>
					<ManualHistory />
				</Container>
			</div>
			<MakeWallet isOpen={isWallet} back={toggleWallet} />
		</>
	);
};

export default Bonus;

const ManualHistory = () => {
	let { wallet, getManualBonusHistory } = useContext(GlobalState);

	let [data, setData] = useState(null);

	useEffect(()=> {
		getManualBonusHistory("manual-funding")
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])

	useEffect(() => {
		setData(wallet?.manual);
	}, [wallet?.manual]);

	let [loading, setLoading] = useState(false);
	let handleLoadMore = async () => {
		setLoading(true);

		await getManualBonusHistory("manual-funding", {
			limit: Number(
				wallet?.paginate_manual?.nextPage * wallet?.paginate_manual?.limit
			),
		});
		setLoading(false);
	};

	if (!data) return;
	// console.log({ data });

	return (
		<div className="pb-5 my-5">
			<WalletHistoryList state={data} />
			<BottomTab state={data} paginate={wallet?.paginate_manual} />
			<LoadMore
				next={wallet?.paginate_manual?.next}
				handleLoadMore={handleLoadMore}
				loading={loading}
			/>
		</div>
	);
};

export const MakeWallet = ({ isOpen, back, user, debit = false }) => {
	let { manageWallet, wallet, manualDirectDebit } = useContext(GlobalState);

	let init = {
			type: "wallet",
			user: user ? user : "",
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
			setLoading(true);
			if (debit) {
				await manualDirectDebit(state);
			} else await manageWallet("wallet", state, "add");
			setLoading(false);
			setSubmit(true);
		};

	useEffect(() => {
		if (wallet?.isAdded && submit) {
			back();
			setSubmit(false);
		}
		if (wallet?.isManualDebit && submit) {
			back();
			setSubmit(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [wallet?.isAdded, submit, wallet?.isManualDebit]);

	return (
		<>
			<ModalComponents
				isOpen={isOpen}
				back={back}
				title={debit ? "debit user wallet" : "top up Wallet"}>
				<WalletForm state={state} textChange={textChange} />
				<Buttons
					title={debit ? "debit user" : "top up"}
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
// const MakeBundle = ({ isOpen, back }) => {
// 	return (
// 		<>
// 			<ModalComponents isOpen={isOpen} back={back} title="new Wallet">
// 				<form className="row mx-0">
// 					<div className="form mb-3 col-6">
// 						<label htmlFor="wallet">Title</label>
// 						<input
// 							type="text"
// 							className="form-control rounded10 py-3"
// 							placeholder="Enter title"
// 						/>
// 					</div>
// 					<div className="form mb-3 col-6">
// 						<label htmlFor="wallet">Choose biller</label>
// 						<select className="form-control rounded10 py-3 form-select">
// 							<option value="ringo">Ringo</option>
// 						</select>
// 					</div>
// 					<div className="form mb-3 col-6">
// 						<label htmlFor="wallet">Choose network</label>
// 						<select className="form-control rounded10 py-3 form-select">
// 							<option value="mtn">MTN</option>
// 						</select>
// 					</div>
// 					<div className="form mb-3 col-6">
// 						<label htmlFor="wallet">Price</label>
// 						<input
// 							type="number"
// 							className="form-control rounded10 py-3"
// 							placeholder="200"
// 						/>
// 					</div>
// 					<div className="form mb-3 col-6">
// 						<label htmlFor="wallet">Network ID</label>
// 						<input
// 							type="text"
// 							className="form-control rounded10 py-3"
// 							placeholder="1234567"
// 						/>
// 					</div>
// 					<div className="form mb-3 col-6">
// 						<label htmlFor="wallet">Plan ID</label>
// 						<input
// 							type="text"
// 							className="form-control rounded10 py-3"
// 							placeholder="1234567"
// 						/>
// 					</div>
// 					<div className="form mb-3 col-6">
// 						<label htmlFor="wallet">Validity</label>
// 						<input
// 							type="text"
// 							className="form-control rounded10 py-3"
// 							placeholder="1"
// 						/>
// 					</div>
// 					<div className="form mb-3 col-6">
// 						<label htmlFor="wallet">HW Code</label>
// 						<input
// 							type="text"
// 							className="form-control rounded10 py-3"
// 							placeholder="1234"
// 						/>
// 					</div>
// 					<div className="form mb-3 col-6">
// 						<label htmlFor="wallet">Allowance</label>
// 						<input
// 							type="text"
// 							className="form-control rounded10 py-3"
// 							placeholder=""
// 						/>
// 					</div>
// 				</form>
// 				<Buttons
// 					title={"create wallet"}
// 					css="btn-primary1 text-capitalize py-3 w-50 my-4 mx-auto"
// 					width={"w-50"}
// 					style={{ borderRadius: "30px" }}
// 				/>
// 			</ModalComponents>
// 		</>
// 	);
// };

export const WalletForm = ({ state, textChange }) => {
	return (
		<form className="row mx-0">
			<div className="form mb-3">
				<label htmlFor="type">Type</label>
				<select
					value={state?.type}
					onChange={textChange("type")}
					className="form-control rounded10 py-3 form-select">
					<option value="">Choose type</option>
					<option value="wallet">Wallet ID</option>
					<option value="email">User Email</option>
					<option value="telephone">User Number</option>
				</select>
			</div>
			<div className="form mb-3">
				<label htmlFor="id">
					{state?.type === "email"
						? "Email"
						: state?.type === "telephone"
						? "Telephone"
						: "ID"}
				</label>
				<input
					type={
						state?.type === "email"
							? "email"
							: state?.type === "telephone"
							? "tel"
							: "text"
					}
					value={state?.user}
					onChange={textChange("user")}
					className="form-control rounded10 py-3"
					placeholder={
						state?.type === "email"
							? "example@mail.com"
							: state?.type === "telephone"
							? "0800 0000 000"
							: "1234567890"
					}
				/>
			</div>
			<div className="form mb-3">
				<label htmlFor="wallet">Amount</label>
				<input
					type="number"
					value={state?.amount}
					onChange={textChange("amount")}
					className="form-control rounded10 py-3"
					placeholder="2000"
				/>
			</div>
		</form>
	);
};
