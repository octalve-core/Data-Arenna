import React, { useState, useContext, useEffect } from "react";
import { Container } from "reactstrap";
import { Buttons, EmptyComponent } from "../../Utils";
import { GlobalState } from "../../Data/Context";
import LoadMore, { BottomTab } from "../../Components/LoadMore";
import { ModalComponents } from "../../Components";
import moment from "moment";
import { MainPaginate, MainRanger } from "../../Components/Transactions";

const Bonus = () => {
	let [isBonus, setIsBonus] = useState(false),
		toggleBonus = () => {
			setIsBonus(!isBonus);
		};

	let { setStateName } = useContext(GlobalState);
	useEffect(() => {
		setStateName("give bonus history");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<div className="bg-white aboutScreen">
				<Container className="py-5">
					<Buttons
						title={"give bonus"}
						css="btn-primary1 text-capitalize py-3 px-4 px-lg-5"
						width={"w-25 w25"}
						onClick={toggleBonus}
						style={{ borderRadius: "30px" }}
					/>
					<BonusHistory />
				</Container>
			</div>
			<MakeBonus isOpen={isBonus} back={toggleBonus} />
		</>
	);
};

export default Bonus;

const BonusHistory = () => {
	let { bonus, getManualBonusHistory, numberWithCommas, nairaSign } =
		useContext(GlobalState);

	let [data, setData] = useState(null);

	useEffect(()=> {
		getManualBonusHistory("manage-bonus")
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])

	useEffect(() => {
		setData(bonus?.give_bonus);
	}, [bonus?.give_bonus]);

	let [loading, setLoading] = useState(false);
	let handleLoadMore = async () => {
		setLoading(true);

		await getManualBonusHistory("manage-bonus", {
			limit: Number(
				bonus?.paginate_bonus?.nextPage * bonus?.paginate_bonus?.limit
			),
		});
		setLoading(false);
	};

	let [range, setRange] = useState(10);

	const [itemOffset, setItemOffset] = useState(0);
	const endOffset = itemOffset + range;
	if (!data) return;

	const currentItems = data.slice(itemOffset, endOffset);
	const pageCount = Math.ceil(data.length / range);

	const handlePageClick = event => {
		const newOffset = (event.selected * range) % data.length;
		setItemOffset(newOffset);
	};
	
	return (
		<div className="py-5">
			<MainRanger  setRange={setRange} range={range}/>
			<div className="row mx-0 my-2 py-3 bland">
				<div className="col my-auto text-uppercase fw-bold Lexend d-none d-md-flex fontReduce textTrunc">
					S/N
				</div>
				<div className="col my-auto text-uppercase fw-bold Lexend fontReduce textTrunc">
					title
				</div>
				<div className="col my-auto text-uppercase fw-bold Lexend fontReduce textTrunc">
					description
				</div>
				<div className="col my-auto text-uppercase fw-bold Lexend fontReduce textTrunc">
					target
				</div>
				<div className="col my-auto text-uppercase fw-bold Lexend fontReduce textTrunc">
					amount
				</div>
				<div className="col my-auto text-uppercase fw-bold Lexend d-none d-md-flex fontReduce textTrunc">
					date
				</div>
			</div>
			{currentItems?.length === 0 ? (
				<EmptyComponent subtitle={"User bonus history is empty"} />
			) : (
				currentItems?.map((it, i) => (
					<div key={i} className="row mx-0 py-3 bland2 myCursor">
						<div className="col my-auto text-capitalize d-none d-md-flex fontReduce2 textTrunc">
							{i + 1}
						</div>
						<div className="col my-auto text-capitalize textTrunc textTrunc2 fontReduce2">
							{it?.title}
						</div>
						<div className="col my-auto text-capitalize textTrunc textTrunc2 fontReduce2">
							{it?.description}
						</div>
						<div className="col my-auto text-capitalize textTrunc textTrunc2 fontReduce2">
							{it?.category === "all"
								? "Everyone"
								: it?.category !== "single"
								? `all ${it?.category}`
								: `${it?.recipients?.[0]?.firstName} ${it?.recipients?.[0]?.lastName}`}
						</div>
						<div className="col my-auto fontReduce2 textTrunc">
							{nairaSign}{" "}
							{it?.amount ? numberWithCommas(Number(it?.amount).toFixed(2)) : 0}
						</div>
						<div className="col my-auto d-none d-md-flex fontReduce2 textTrunc">
							{moment(it?.createdAt).format("L hh:mm A")}
						</div>
					</div>
				))
				)}
				<MainPaginate handlePageClick={handlePageClick} pageCount={pageCount} />
			<BottomTab state={data} paginate={bonus?.paginate_bonus} />
			<LoadMore
				next={bonus?.paginate_bonus?.next}
				handleLoadMore={handleLoadMore}
				loading={loading}
			/>
		</div>
	);
};

export const MakeBonus = ({ isOpen, back, user }) => {
	let { manageWallet, bonus } = useContext(GlobalState);

	let init = {
			title: "",
			description: "",
			user: user ? user : "",
			amount: "",
			category: "",
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
			await manageWallet("bonus", { ...state, user: user ? user : "" }, "give");
			setLoading(false);
			setSubmit(true);
		};

	useEffect(() => {
		if (bonus?.isAdded && submit) {
			back();
			setSubmit(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [bonus?.isAdded, submit]);

	return (
		<>
			<ModalComponents isOpen={isOpen} back={back} title="Bonus">
				<form>
					{!user && (
						<UserTypeSelect
							state={state?.category}
							textChange={textChange}
							name="category"
						/>
					)}
					<div className="form mb-3">
						<label htmlFor="wallet">Title</label>
						<input
							type="text"
							className="form-control rounded10 py-3"
							placeholder="Enter title"
							value={state?.title}
							onChange={textChange("title")}
						/>
					</div>
					<div className="form mb-3">
						<label htmlFor="wallet">Description</label>
						<textarea
							value={state?.description}
							onChange={textChange("description")}
							className="form-control rounded10 py-3"
							placeholder="Enter description"
							style={{
								resize: "none",
								height: "7rem",
							}}
						/>
					</div>
					<div className="form mb-3">
						<label htmlFor="amount">Amount</label>
						<input
							type="number"
							className="form-control rounded10 py-3"
							placeholder="5000"
							value={state?.amount}
							onChange={textChange("amount")}
						/>
					</div>
					{/* 
					<div className="form mb-3">
						<label htmlFor="wallet">Select wallet_id</label>
						<input
							type="text"
							className="form-control rounded10 py-3"
							placeholder="123456789"
						/>
					</div> */}
					<Buttons
						title={"send"}
						css="btn-primary1 text-capitalize py-3 w-50 my-4 mx-auto"
						width={"w-50"}
						style={{ borderRadius: "30px" }}
						loading={loading}
						onClick={handleSubmit}
					/>
				</form>
			</ModalComponents>
		</>
	);
};

export let UserTypeSelect = ({ state, textChange, name }) => {
	let categories = ["all", "agent", "reseller", "topuser", "user"];
	return (
		<>
			<div className="form mb-3">
				<label htmlFor="wallet">Select target</label>
				<select
					value={state}
					onChange={textChange(name)}
					className="form-control rounded10 py-3 form-select text-capitalize">
					<option value="">Select target</option>
					{categories?.map((item, i) => (
						<option value={item} key={i}>
							{item}
						</option>
					))}
				</select>
			</div>
		</>
	);
};
