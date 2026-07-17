import React, { useState, useContext, useEffect } from "react";
import { DefaultAuthComponent } from "../../Screens/register";
import { Buttons } from "../../Utils";
import { GlobalState } from "../../Data/Context";
import { ModalComponents } from "../../Components";
import { useValidation } from "../../Data/useFetch";
import { useSearchParams } from "react-router-dom";

const AddTransaction = () => {
	let { setStateName } = useContext(GlobalState);
	useEffect(() => {
		setStateName("Add transaction");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let [category, setCategory] = useState("");

	let categoryArr = ["airtime", "data", "cables", "electricity", "education"];

	return (
		<>
			<DefaultAuthComponent nozoom>
				<section className="my-auto">
					<h3 className="text-capitalize text-center Lexend">
						add transaction
					</h3>
					<small className="text-center Lexend mb-3 d-block">
						Debit your users' by entering a transaction manually for them.
					</small>
					<div className="row mx-0 g-3 g-md-4">
						{categoryArr?.map((item, i) => (
							<div key={i} className="col-6 p-2">
								<button
									onClick={() => setCategory(item)}
									className="btn btn-outline-primary1 w-100 h-100 text-capitalize py-3 py-md-5 rounded20">
									{item}
								</button>
							</div>
						))}
					</div>
				</section>
			</DefaultAuthComponent>
			<ManualAirtime category={category} setCategory={setCategory} />
			<ManualCables category={category} setCategory={setCategory} />
			<ManualEducation category={category} setCategory={setCategory} />
			<ManualElectricity category={category} setCategory={setCategory} />
			<ManualData category={category} setCategory={setCategory} />
		</>
	);
};

export default AddTransaction;

const ManualCables = ({ category, setCategory }) => {
	let { cables, numberWithCommas, manualTransactions, general } =
		useContext(GlobalState);

	let init = {
			type: "",
			productsCode: "",
			packagename: "",
			amount: "",
			user: "",
			smartCardNo: "",
			reference: "",
		},
		[state, setState] = useState(init),
		[newState, setNewState] = useState(null),
		[loading, setLoading] = useState(null),
		[submit, setSubmit] = useState(null),
		textChange =
			name =>
			({ target: { value } }) => {
				setState({ ...state, [name]: value });
			},
		[type, setType] = useState([]),
		{ handleFetch } = useValidation("smartCardNo", state, setNewState);

	useEffect(() => {
		if (state?.smartCardNo?.length >= 10 && state?.type) handleFetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state?.smartCardNo, state?.type]);

	useEffect(() => {
		if (state?.type) {
			if (state?.type?.toUpperCase() === "DSTV") {
				setType(cables?.cable_package?.dstv ? cables?.cable_package?.dstv : "");
			}
			if (state?.type?.toUpperCase() === "GOTV") {
				setType(cables?.cable_package?.gotv ? cables?.cable_package?.gotv : []);
			}
			if (state?.type?.toUpperCase() === "STARTIMES") {
				setType(
					cables?.cable_package?.startimes
						? cables?.cable_package?.startimes
						: []
				);
			}
		}
	}, [state?.type, cables?.cable_package]);

	useEffect(() => {
		if (newState) {
			console.log({ newState });
			setState({
				...state,
				user: newState?.data?.customerName,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [newState]);

	let handleSubmit = async e => {
		e?.preventDefault();
		if (!state?.smartCardNo) return;
		let send = state;

		let find;
		if (state?.type !== "STARTIMES") {
			find = type?.find(item => item?.code === state?.productsCode);
			if (!find) return;
		}
		send = { ...send, packagename: find?.name };
		console.log({ send, state });
		setLoading(true);
		await manualTransactions({ ...send, category, user });
		setLoading(false);
		setSubmit(true);
	};

	useEffect(() => {
		if (submit && general?.isManual) {
			setState(init);
			setSubmit(false);
			setCategory("");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, general?.isManual]);

	let [user, setUser] = useState(""),
		[getSearch] = useSearchParams();

	useEffect(() => {
		if (getSearch?.get("userId")) {
			setUser(getSearch?.get("userId"));
		}
	}, [getSearch]);

	return (
		<>
			<ModalComponents
				title="add cable subscription"
				isOpen={category === "cables"}
				back={() => setCategory("")}>
				<div className="downH2 d-flex">
					<form className="w-100">
						<UserList user={user} setUser={setUser} />
						<div className="mb-4">
							<label htmlFor="Type">Select cable</label>
							<select
								name="type"
								id="type"
								value={state?.type}
								onChange={textChange("type")}
								className="form-control form-select py-3 rounded20">
								<option value="">Select Type</option>
								{cables?.cable_direct?.map((item, i) => (
									<option value={item} key={i}>
										{item}
									</option>
								))}
							</select>
						</div>
						{state?.type && state?.type !== "STARTIMES" && (
							<div className="mb-4">
								<label htmlFor="Package">Package</label>
								<select
									name="productsCode"
									id="productsCode"
									onChange={textChange("productsCode")}
									className="form-control form-select py-3 rounded20">
									<option value="">Select package</option>
									{type?.map((item, i) => (
										<option value={item?.code} key={i}>
											{item?.name} NGN{numberWithCommas(item?.price)}
										</option>
									))}
								</select>
							</div>
						)}
						<div className="mb-4">
							<label htmlFor="telephone">Smart card number</label>
							<input
								type={"number"}
								value={state?.smartCardNo}
								onChange={textChange("smartCardNo")}
								placeholder="08012345678"
								className="form-control py-3"
							/>
						</div>
						<div className="mb-4">
							<label htmlFor="telephone">Honour World Reference</label>
							<input
								type={"text"}
								value={state?.reference}
								onChange={textChange("reference")}
								placeholder="08012345678"
								className="form-control py-3"
							/>
						</div>
						{state?.user && (
							<div className="mb-4">
								<label htmlFor="telephone">Smart Card User</label>
								<input
									type={"text"}
									value={state?.user}
									onChange={textChange("user")}
									readOnly
									placeholder="User"
									className="form-control py-3"
								/>
							</div>
						)}
						{state?.type === "STARTIMES" && (
							<div className="mb-4">
								<label htmlFor="telephone">Amount</label>
								<input
									type={"number"}
									value={state?.amount}
									onChange={textChange("amount")}
									placeholder="Amount"
									className="form-control py-3"
								/>
							</div>
						)}
						<Buttons
							title={"proceed"}
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

const ManualAirtime = ({ category, setCategory }) => {
	let { general, returnErrors, usecase, manualTransactions } =
		useContext(GlobalState);

	let init = {
			phone: "",
			amount: "",
			network: "",
			reference: "",
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
			await manualTransactions({ ...state, category, user });
			setLoading(false);
			setSubmit(true);
		};

	useEffect(() => {
		if (general?.isManual && submit) {
			setCategory("");
			setSubmit(false);
			setState(init);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [general?.isManual, submit]);

	let [user, setUser] = useState(""),
		[getSearch] = useSearchParams();

	useEffect(() => {
		if (getSearch?.get("userId")) {
			setUser(getSearch?.get("userId"));
		}
	}, [getSearch]);

	return (
		<ModalComponents
			title="add airtime"
			isOpen={category === "airtime"}
			back={() => setCategory("")}>
			<div className="downH2 d-flex">
				<form className="w-100">
					<UserList user={user} setUser={setUser} />
					<div className="mb-4">
						<label htmlFor="Newtwork">Network</label>
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
							placeholder="08012345678"
							className="form-control py-3"
							value={state?.phone}
							onChange={textChange("phone")}
						/>
					</div>
					<div className="mb-4">
						<label htmlFor="telephone">Honour World Reference</label>
						<input
							type={"text"}
							value={state?.reference}
							onChange={textChange("reference")}
							placeholder="08012345678"
							className="form-control py-3"
						/>
					</div>
					<Buttons
						title={"proceed"}
						css="btn-primary1 text-capitalize py-3 w-50 my-4 mx-auto"
						width={"w-50"}
						style={{ borderRadius: "30px" }}
						loading={loading}
						onClick={handleSubmit}
					/>
				</form>
			</div>
		</ModalComponents>
	);
};

const ManualEducation = ({ category, setCategory }) => {
	let { educations, returnErrors, manualTransactions, general, users } =
		useContext(GlobalState);

	let init = {
			numberOfPin: "",
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
			await manualTransactions({ ...state, category, user });
			setLoading(false);
			setSubmit(true);
		};

	useEffect(() => {
		if (general?.isManual && submit) {
			setCategory("");
			setSubmit(false);
			setState(init);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [general?.isManual, submit]);

	let [user, setUser] = useState(""),
		[thisUser, setThisUser] = useState(null),
		[getSearch] = useSearchParams();

	useEffect(() => {
		if (user) {
			users?.all_users?.map(item => item?._id === user && setThisUser(item));
		}
	}, [user, users?.all_users]);

	useEffect(() => {
		if (state?.type && educations?.main_education) {
			educations?.main_education?.map(
				item =>
					item?._id === state?.type &&
					setState({
						...state,
						amount:
							thisUser?.privilege === "user"
								? item?.price
								: item?.reseller_price
								? item?.reseller_price
								: item?.price,
					})
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state?.type, educations?.main_education, thisUser?.privilege]);

	useEffect(() => {
		if (getSearch?.get("userId")) {
			setUser(getSearch?.get("userId"));
		}
	}, [getSearch]);

	return (
		<>
			<ModalComponents
				title="add education"
				isOpen={category === "education"}
				back={() => setCategory("")}>
				<div className="downH2 d-flex">
					<form className="w-100">
						<UserList user={user} setUser={setUser} />
						<div className="mb-4">
							<label htmlFor="Education">Education</label>
							<select
								name="network"
								id="network"
								value={state?.type}
								onChange={textChange("type")}
								className="form-control form-select py-3 rounded20">
								<option value="">Select plan</option>
								{educations?.main_education?.map((it, i) => (
									<option value={it?._id} key={i}>
										{it?.type}
									</option>
								))}
							</select>
						</div>
						{state?.type && (
							<div className="mb-4">
								<label htmlFor="value">Amount</label>
								<input
									type={"number"}
									placeholder="500"
									className="form-control py-3"
									value={state?.amount}
									onChange={textChange("amount")}
									readOnly
								/>
							</div>
						)}
						<div className="mb-4">
							<label htmlFor="numberOfPin">Number of pins</label>
							<input
								type={"number"}
								placeholder="2"
								className="form-control py-3"
								value={state?.numberOfPin}
								onChange={textChange("numberOfPin")}
							/>
						</div>
						<Buttons
							title={"proceed"}
							css="btn-primary1 text-capitalize py-3 w-50 my-4 mx-auto"
							width={"w-50"}
							style={{ borderRadius: "30px" }}
							loading={loading}
							onClick={handleSubmit}
						/>
					</form>
				</div>
			</ModalComponents>
		</>
	);
};

const ManualElectricity = ({ category, setCategory }) => {
	let { returnErrors, manualTransactions, electricity, general } =
		useContext(GlobalState);
	let init = {
			type: "PREPAID",
			disco: "",
			meterNo: "",
			phoneNumber: "",
			amount: "",
			reference: "",
			token: "",
			unit: "",
		},
		[state, setState] = useState(init),
		[newState, setNewState] = useState(null),
		[loading, setLoading] = useState(null),
		[submit, setSubmit] = useState(null),
		textChange =
			name =>
			({ target: { value } }) => {
				setState({ ...state, [name]: value });
			},
		{ handleFetch } = useValidation("meterNo", state, setNewState);

	useEffect(() => {
		if (state?.meterNo?.length >= 10 && state?.type) handleFetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state?.meterNo, state?.type]);

	useEffect(() => {
		if (newState) {
			console.log({ newState });
			setState({
				...state,
				user: newState?.data?.user,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [newState]);

	let handleSubmit = async e => {
		e?.preventDefault();
		if (!state?.meterNo) return;
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
		await manualTransactions({ ...state, category, user });
		setLoading(false);
		setSubmit(true);
	};

	useEffect(() => {
		if (submit && general?.isManual) {
			setCategory("");
			setState(init);
			setSubmit(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, general?.isManual]);

	let [user, setUser] = useState(""),
		[getSearch] = useSearchParams();

	useEffect(() => {
		if (getSearch?.get("userId")) {
			setUser(getSearch?.get("userId"));
		}
	}, [getSearch]);

	return (
		<>
			<ModalComponents
				title="add bills"
				isOpen={category === "electricity"}
				back={() => setCategory("")}>
				<div className="downH2 d-flex">
					<form className="w-100">
						<UserList user={user} setUser={setUser} />
						<div className="mb-4">
							<label htmlFor="Type">Type</label>
							<select
								name="type"
								id="type"
								value={state?.type}
								onChange={textChange("type")}
								className="form-control form-select py-3 rounded20">
								<option value="">Select bill type</option>
								<option value="PREPAID">PREPAID</option>
								<option value="POSTPAID">POSTPAID</option>
							</select>
						</div>
						<div className="mb-4">
							<label htmlFor="Disco">Platform</label>
							<select
								name="disco"
								id="disco"
								value={state?.disco}
								onChange={textChange("disco")}
								className="form-control form-select py-3 rounded20">
								<option value="">Select bill platform</option>
								{electricity?.electricity_direct?.map((item, i) => (
									<option value={item} key={i}>
										{item}
									</option>
								))}
							</select>
						</div>
						<div className="mb-4">
							<label htmlFor="telephone">Meter number</label>
							<input
								type={"number"}
								placeholder="08012345678"
								value={state?.meterNo}
								onChange={textChange("meterNo")}
								className="form-control py-3"
							/>
						</div>
						<div className="mb-4">
							<label htmlFor="value">Amount</label>
							<input
								type={"number"}
								placeholder="500"
								value={state?.amount}
								onChange={textChange("amount")}
								className="form-control py-3"
							/>
						</div>
						<div className="mb-4">
							<label htmlFor="value">Phone number</label>
							<input
								type={"tel"}
								placeholder="080 000 0000"
								value={state?.phoneNumber}
								onChange={textChange("phoneNumber")}
								className="form-control py-3"
							/>
						</div>
						<div className="mb-4">
							<label htmlFor="telephone">Honour World Reference</label>
							<input
								type={"text"}
								value={state?.reference}
								onChange={textChange("reference")}
								placeholder="08012345678"
								className="form-control py-3"
							/>
						</div>
						<div className="mb-4">
							<label htmlFor="telephone">Electricty token</label>
							<input
								type={"text"}
								value={state?.token}
								onChange={textChange("token")}
								placeholder="08012345678"
								className="form-control py-3"
							/>
						</div>
						<div className="mb-4">
							<label htmlFor="telephone">Unit</label>
							<input
								type={"text"}
								value={state?.unit}
								onChange={textChange("unit")}
								placeholder="82.2 kW"
								className="form-control py-3"
							/>
						</div>
						<Buttons
							title={"proceed"}
							css="btn-primary1 text-capitalize py-3 px-4 px-lg-5 mx-auto"
							loading={loading}
							width={"w-50 w50"}
							onClick={handleSubmit}
							style={{ borderRadius: "30px" }}
						/>
					</form>
				</div>
			</ModalComponents>
		</>
	);
};

const ManualData = ({ category, setCategory }) => {
	const { data, general, manualTransactions, users } = useContext(GlobalState);
	let [state, setState] = useState(null),
		init = { network: "", planId: "", phone: "", amount: "", reference: "" },
		[buy, setBuy] = useState(init),
		[loading, setLoading] = useState(false),
		[type, setType] = useState([]),
		[submit, setSubmit] = useState(false),
		textChange =
			name =>
			({ target: { value } }) => {
				setBuy({ ...buy, [name]: value });
			};

	useEffect(() => {
		if (buy?.network) {
			let newOne = data?.main_data?.filter(
				item => item?.network?.toLowerCase() === buy?.network?.toLowerCase()
			);
			setType(newOne);
		}
	}, [buy?.network, data?.main_data]);

	useEffect(() => {
		setState(data?.main_data);
	}, [data?.main_data]);

	let handleSubmit = async e => {
		e?.preventDefault();
		if (!buy?.phone) return;
		setLoading(true);
		await manualTransactions({ ...buy, category, user });
		setLoading(false);
		setSubmit(true);
	};

	useEffect(() => {
		if (submit && general?.isManual) {
			setCategory("");
			setState(init);
			setSubmit(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, general?.isManual]);

	let [user, setUser] = useState(""),
		[thisUser, setThisUser] = useState(null),
		[getSearch] = useSearchParams();

	useEffect(() => {
		if (user) {
			users?.all_users?.map(item => item?._id === user && setThisUser(item));
		}
	}, [user, users?.all_users]);

	useEffect(() => {
		if (buy?.network && buy?.planId) {
			data?.main_data?.map(
				item =>
					item?.network?.toLowerCase() === buy?.network?.toLowerCase() &&
					Number(item?.planId) === Number(buy?.planId) &&
					setBuy({
						...buy,
						amount:
							thisUser?.privilege !== "agent"
								? item?.price
								: item?.reseller_price
								? item?.reseller_price
								: item?.price,
					})
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [buy?.network, buy?.planId, data?.main_data]);

	useEffect(() => {
		if (getSearch?.get("userId")) {
			setUser(getSearch?.get("userId"));
		}
	}, [getSearch]);

	if (!state) return <></>;

	return (
		<>
			<ModalComponents
				title="add data"
				isOpen={category === "data"}
				back={() => setCategory("")}>
				<div className="downH2 d-flex">
					<form className="w-100">
						<UserList user={user} setUser={setUser} />
						<div className="mb-4">
							<label htmlFor="Network">Network</label>
							<select
								name="network"
								id="network"
								value={buy?.network}
								onChange={textChange("network")}
								className="form-control form-select py-3 rounded20">
								<option value="">Select type</option>
								{general?.networks?.map((item, i) => (
									<option value={item} key={i}>
										{item}
									</option>
								))}
							</select>
						</div>
						{buy?.network && (
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
														list?.network?.toLowerCase() ===
															item?.network?.toLowerCase() &&
														Number(list?.planId) === Number(item?.planId)
												)?.allowance
											}{" "}
											{
												data?.data_direct?.find(
													list =>
														list?.network?.toLowerCase() ===
															item?.network?.toLowerCase() &&
														Number(list?.planId) === Number(item?.planId)
												)?.validity
											}
										</option>
									))}
								</select>
							</div>
						)}
						{buy?.network && buy?.planId && (
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
								placeholder="300"
								className="form-control py-3"
								value={buy?.phone}
								onChange={textChange("phone")}
							/>
						</div>
						<div className="mb-4">
							<label htmlFor="telephone">Honour World Reference</label>
							<input
								type={"text"}
								value={state?.reference}
								onChange={textChange("reference")}
								placeholder="08012345678"
								className="form-control py-3"
							/>
						</div>
						<Buttons
							title={"proceed"}
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

export const UserList = ({ user, setUser }) => {
	let { users } = useContext(GlobalState);

	if (users?.all_users?.length === 0) return;

	return (
		<div className="mb-4">
			<label htmlFor="User">Users</label>
			<select
				name="users"
				id=""
				value={user}
				className="form-control form-select py-3"
				onChange={e => setUser(e.target.value)}>
				<option value="">Select a user</option>
				{users?.all_users?.map((item, i) => (
					<option value={item?._id} key={i}>
						{item?.lastName} {item?.firstName}
					</option>
				))}
			</select>
		</div>
	);
};
