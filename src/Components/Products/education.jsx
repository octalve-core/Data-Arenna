import React, { useState, useContext, useEffect } from "react";
import { Container } from "reactstrap";
import { Buttons, EmptyComponent } from "../../Utils";
import { ModalComponents } from "..";
import { GlobalState } from "../../Data/Context";
import LoadMore, { BottomTab } from "../LoadMore";
import { useValidation } from "../../Data/useFetch";
import { TransactionDetails, NewPaginate } from "../Transactions";
import { TransactionPinBox } from "./AirtimePin";
import { BiTrashAlt } from "react-icons/bi";
import { ClipLoader } from "react-spinners";
import { BsPen } from "react-icons/bs";

const Education = () => {
	let [isOpen, setIsOpen] = useState(false),
		toggle = () => {
			setIsOpen(!isOpen);
		};

	let {
			setStateName,
			education,
			buyServices,
			usecase,
			nairaSign,
			numberWithCommas,
			settings,
			wallet,
			auth,
		} = useContext(GlobalState),
		btnTab = ["education history", "education list"],
		[active, setActive] = useState(0),
		[buyActive, setBuyActive] = useState(0);

	useEffect(() => {
		setStateName(btnTab[active]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [active]);

	let [stateData, setStateData] = useState(null);

	useEffect(() => {
		setStateData(settings?.settings);
	}, [settings?.settings]);

	let init = {
			numberOfPin: "",
			amount: "",
			type: "",
			subType: "",
			jambID: "",
			pin: "",
		},
		[state, setState] = useState(init),
		[loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false),
		[isNew, setIsNew] = useState(false),
		[datum, setDatum] = useState(null),
		toggleNew = () => {
			if (datum) setDatum(false);
			setIsNew(!isNew);
		},
		textChange =
			name =>
			({ target: { value } }) => {
				setState({ ...state, [name]: value });
			},
		[newState, setNewState] = useState(null),
		{ handleFetch, validateLoading } = useValidation(
			"jambID",
			state,
			setNewState
		),
		handleSubmit = async e => {
			e?.preventDefault();
			setLoading(true);
			await buyServices("education", state);
			setLoading(false);
			setSubmit(true);
		};

	useEffect(() => {
		if (state?.jambID?.length >= 10 && state?.type && state?.subType)
			handleFetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state?.jambID, state?.type, state?.subType]);

	useEffect(() => {
		if (newState) {
			console.log({ newState });
			setState({
				...state,
				user: newState?.data?.content,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [newState]);

	useEffect(() => {
		if (validateLoading) {
			// console.log({ newState });
			setState({
				...state,
				user: null,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [validateLoading]);

	useEffect(() => {
		if (state?.type) {
			let findAmount = education?.educationToBuy?.find(
				item => item?.type?.toUpperCase() === state?.type?.toUpperCase()
			);
			if (findAmount) {
				setState({ ...state, amount: findAmount?.price });
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state?.type, education?.educationToBuy]);

	useEffect(() => {
		if (education?.isAdded && submit) {
			setState(init);
			setIsOpen(false);
			setBuyActive(0);
			setSubmit(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [education?.isAdded, submit]);

	useEffect(() => {
		if (state?.pin && state?.pin?.length === 4) handleSubmit();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state?.pin]);

	useEffect(() => {
		if (datum) {
			setIsNew(true);
		}
	}, [datum]);

	return (
		<div className="bg-white aboutScreen">
			<Container className="py-5">
				<div className="row mx-0">
					<div className="col d-flex">
						{usecase?.usecase?.education === "enable" && (
							<Buttons
								title={"education"}
								css="btn-primary1 text-capitalize py-3 px-4 px-lg-5"
								width={"w-25 w25"}
								onClick={toggle}
								style={{ borderRadius: "30px" }}
							/>
						)}
					</div>
					{auth?.user?.privilege === "agent" && (
						<div className="col d-flex justify-content-end">
							<Buttons
								title={"create education"}
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
				</div>
				{active === 0 ? (
					<EducationHistory />
				) : (
					<>
						{education?.educationToBuy?.[0]?._id ? (
							<EducationBundleDetails setDatum={setDatum} />
						) : (
							<div className="row mx-0">
								{education?.educationToBuy?.map((item, i) => (
									<div
										className="col-4 col-md-3 px-2 p-md-3 text-center dashHeight dashHeight2"
										key={i}>
										<div className="shadow2 p-3 p-md-4 eachProduct rounded20 h-100 d-flex align-items-center justify-content-center fontReduce2 flex-column">
											<img
												src={item?.image?.url}
												alt={item?.type}
												className="img-fluid rounded imgFluid"
												style={{
													height: "auto",
													width: "auto",
												}}
											/>
											<h5 className="pt-3 Lexend fw-bold">{item?.type}</h5>
										</div>
									</div>
								))}
							</div>
						)}
					</>
				)}
			</Container>
			<ModalComponents
				title="buy education"
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
									<span>Type: </span>
									<span className="fontInherit Lexend">{state?.type}</span>{" "}
								</p>
								<p className="text-capitalize border-bottom d-flex justify-content-between printOnlyNone">
									<span>Number of pin: </span>
									<span className="fontInherit Lexend">
										{state?.numberOfPin}
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
									<span>Cummulative Amount: </span>
									<span className="fontInherit Lexend">
										{nairaSign}{" "}
										{numberWithCommas(
											Number(state?.amount * state?.numberOfPin).toFixed(2)
										)}
									</span>{" "}
								</p>
								<p className="text-capitalize border-bottom d-flex justify-content-between printOnlyNone">
									<span>Commission: </span>
									<span className="fontInherit Lexend">
										{nairaSign}{" "}
										{numberWithCommas(
											Number(
												(stateData?.educationCommission / 100) *
													(state?.amount * state?.numberOfPin)
											).toFixed(2)
										)}
									</span>{" "}
								</p>
								{state?.type?.toUpperCase() === "JAMB" ? (
									<>
										<p className="text-capitalize border-bottom d-flex justify-content-between printOnlyNone">
											<span>JAMB ID: </span>
											<span className="fontInherit Lexend">
												{state?.jambID}
											</span>{" "}
										</p>
										<p className="text-capitalize border-bottom d-flex justify-content-between printOnlyNone">
											<span>JAMB Type: </span>
											<span className="fontInherit Lexend text-uppercase">
												{state?.subType}
											</span>{" "}
										</p>
										<p className="text-capitalize border-bottom d-flex justify-content-between printOnlyNone">
											<span>Customer name: </span>
											<span className="fontInherit Lexend">
												{state?.user?.Customer_Name}
											</span>{" "}
										</p>
										<p className="text-capitalize border-bottom d-flex justify-content-between printOnlyNone">
											<span>Customer address: </span>
											<span className="fontInherit Lexend">
												{state?.user?.Address}
											</span>{" "}
										</p>
									</>
								) : null}
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
									loading={loading}
									width={"w-50 w50"}
									onClick={
										wallet?.balance?.wallet_pin
											? () => {
													if (state?.type?.toUpperCase() === "JAMB")
														if (!state?.user) return;
													setBuyActive(2);
											  }
											: () => {
													if (state?.type?.toUpperCase() === "JAMB")
														if (!state?.user) return;
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
								<label htmlFor="Education">Education type</label>
								<select
									className="form-control py-3 py-md-4 text-capitalize form-select"
									name="type"
									placeholder="Education"
									value={state?.type}
									onChange={textChange("type")}
									id="type">
									<option value="">select type</option>
									{education?.educationToBuy?.map((it, i) => (
										<option value={it?.type} key={i}>
											{it?.type}
										</option>
									))}
								</select>
							</div>
							<div className="mb-4">
								<label htmlFor="value">Amount</label>
								<input
									type={"number"}
									placeholder="500"
									readOnly
									className="form-control py-3"
									value={state?.amount}
									onChange={textChange("amount")}
								/>
							</div>
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
							{state?.type?.toUpperCase() === "JAMB" && (
								<>
									<div className="mb-4">
										<label htmlFor="jambID">JAMB ID</label>
										<input
											type={"text"}
											placeholder="2"
											className="form-control py-3"
											value={state?.jambID}
											onChange={textChange("jambID")}
										/>
									</div>
									<div className="mb-4">
										<label htmlFor="Education">JAMB Type</label>
										<select
											className="form-control py-3 py-md-4 text-capitalize form-select"
											name="subType"
											placeholder="UTME"
											value={state?.subType}
											onChange={textChange("subType")}
											id="subType">
											<option value="">select type</option>
											<option value="utme">UTME</option>
											<option value="de">DE</option>
										</select>
									</div>
								</>
							)}
							<Buttons
								title={"proceed"}
								css="btn-primary1 text-capitalize py-3 w-50 my-4 mx-auto"
								width={"w-50"}
								style={{ borderRadius: "30px" }}
								onClick={() => {
									setBuyActive(1);
								}}
							/>
						</form>
					)}
				</div>
			</ModalComponents>
			<MakeNew isOpen={isNew} back={toggleNew} datum={datum} />
		</div>
	);
};

export default Education;

const EducationHistory = () => {
	const { education, getServicesHistory, getReload } = useContext(GlobalState);
	let [state, setState] = useState(null);

	let [loading, setLoading] = useState(false),
		[search, setSearch] = useState(""),
		[thisData, setThisData] = useState(null);

	useEffect(() => {
		getServicesHistory("education");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (search) {
			document.getElementById("Search").addEventListener("search", () => {
				getReload();
			});
			let handleSubmit = async () => {
				if (!search) return;

				await getServicesHistory("education", {
					search,
				});
			};
			handleSubmit();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search]);

	useEffect(() => {
		if (education.isFound) {
			setState(education.mainSearch);
		} else setState(education.education);
	}, [education.education, education.isFound, education.mainSearch]);

	useEffect(() => {
		getReload();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let handleLoadMore = async () => {
		setLoading(true);

		if (search) {
			await getServicesHistory("education", {
				limit: Number(
					education?.paginate?.nextPage * education?.paginate?.limit
				),
				search,
			});
		} else {
			await getServicesHistory("education", {
				limit: Number(
					education?.paginate?.nextPage * education?.paginate?.limit
				),
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
			<NewPaginate
				state={state}
				setState={setState}
				setThisData={setThisData}
				type={"education"}
				criteria={
					{
						// id: params?.step,
					}
				}
			/>
			<TransactionDetails
				thisData={thisData}
				setThisData={setThisData}
				type={"education"}
				criteria={
					{
						// id: params?.step,
					}
				}
			/>
			<BottomTab
				state={state}
				paginate={search ? education?.search_paginate : education?.paginate}
			/>
			<LoadMore
				next={
					search ? education?.search_paginate?.next : education?.paginate?.next
				}
				handleLoadMore={handleLoadMore}
				loading={loading}
			/>
		</div>
	);
};

const MakeNew = ({ isOpen, back, datum }) => {
	let { education, manageEducationBundle } = useContext(GlobalState);
	let init = {
			enabler: "",
			type: "",
			price: "",
			resellerPrice: "",
			topuserPrice: "",
		},
		[state, setState] = useState(init),
		textChange =
			name =>
			({ target: { value } }) => {
				setState({ ...state, [name]: value });
			},
		[shouldEdit, setShouldEdit] = useState(false),
		[newLoad, setNewLoad] = useState(false),
		[submit, setSubmit] = useState(false),
		[image, setImages] = useState();

	useEffect(() => {
		if (datum) {
			setState(datum);
			if (datum?._id) setShouldEdit(true);
			setImages(datum?.image ? datum?.image : false);
		}
		return () => setShouldEdit(false);
	}, [datum]);

	let handleSubmit = async e => {
		e?.preventDefault();
		if (!state?.type) return;

		let datee = state;

		if (!datum) {
			// return toast.info("Pleae fill out all fields");
			// if (!image) return toast.warn("Tour image required");
			datee = { ...state, image };
		} else {
			if (image === datum?.image) {
				datee = { ...state };
			} else datee = { ...state, image };
		}

		setNewLoad(true);
		datum?._id
			? await manageEducationBundle(datee, datum?._id, "edit")
			: await manageEducationBundle(datee);
		setNewLoad(false);
		setSubmit(true);
	};

	useEffect(() => {
		if (submit && education?.isCreated) {
			setSubmit(false);
			setState(init);
			back();
		}
		if (submit && education?.isUpdated) {
			setSubmit(false);
			setState(init);
			back();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, education?.isCreated, education?.isUpdated]);

	return (
		<>
			<ModalComponents
				title={
					datum?._id ? `update ${datum?.type || ""}` : "add education plan"
				}
				isOpen={isOpen}
				back={back}>
				<div className="downH2 d-flex">
					<form className="w-100">
						<UploadPicture img={image} setImages={setImages} />
						<div className="mb-4">
							<label htmlFor="value">Type name</label>
							<input
								type={"text"}
								placeholder="Type name"
								className="form-control py-3"
								value={state?.type}
								onChange={textChange("type")}
							/>
						</div>
						<div className="mb-4">
							<label htmlFor="value">Price</label>
							<input
								type={"number"}
								placeholder="200"
								className="form-control py-3"
								value={state?.price}
								onChange={textChange("price")}
							/>
						</div>
						<div className="mb-4">
							<label htmlFor="value">Reseller price</label>
							<input
								type={"number"}
								placeholder="200"
								className="form-control py-3"
								value={state?.resellerPrice}
								onChange={textChange("resellerPrice")}
							/>
						</div>
						<div className="mb-4">
							<label htmlFor="value">Topuser price</label>
							<input
								type={"number"}
								placeholder="200"
								className="form-control py-3"
								value={state?.topuserPrice}
								onChange={textChange("topuserPrice")}
							/>
						</div>

						{shouldEdit && (
							<>
								<div className="mb-4">
									<label htmlFor="value">Status</label>
									<select
										name="Status"
										className="form-control py-3"
										value={state?.enabler}
										onChange={textChange("enabler")}
										id="">
										<option value="">Select status</option>
										<option value="enable">Enabled</option>
										<option value="disable">Disabled</option>
									</select>
								</div>
							</>
						)}
						<Buttons
							title={datum?._id ? "update" : "create"}
							css="btn-primary1 text-capitalize py-3 px-4 px-lg-5 mx-auto my-4"
							width={"w-50 w50"}
							onClick={handleSubmit}
							style={{ borderRadius: "30px" }}
							loading={newLoad}
						/>
					</form>
				</div>
			</ModalComponents>
		</>
	);
};

const EducationBundleDetails = ({ setDatum }) => {
	let { education, manageEducationBundle, nairaSign, numberWithCommas, auth } =
			useContext(GlobalState),
		[state, setState] = useState(null),
		[load2, setLoad2] = useState({ isLoad: false, loadEducation: "" });

	useEffect(() => {
		setState(education?.educationToBuy);
	}, [education?.educationToBuy]);

	if (!state) return;

	return (
		<>
			<div className="pb-5 my-5">
				<div className="bland row mx-0 py-3 px-0 text-capitalize Lexend fw-bold">
					<div className="col textTrunc d-none d-md-flex Lexend">S/N</div>
					<div className="col textTrunc Lexend">Image</div>
					<div className="col textTrunc Lexend">Type</div>
					<div className="col textTrunc Lexend">Price</div>
					{auth?.user?.privilege === "agent" && (
						<>
							<div className="col textTrunc Lexend">Reseller Price</div>
							<div className="col textTrunc Lexend">Topuser Price</div>
						</>
					)}
					<div className="col textTrunc Lexend">status</div>
					<div className="col textTrunc Lexend">action </div>
				</div>
				<div className="bg-white row mx-0">
					{state?.length === 0 ? (
						<EmptyComponent subtitle={"EducationBundle state empty"} />
					) : (
						state?.map((item, index) => (
							<div key={index} className="row mx-0 py-3 px-0 border-bottom">
								<div className="col d-none d-md-flex textTrunc my-auto">
									{index + 1}
								</div>
								<div className="col my-auto">
									<img
										src={item?.image?.url}
										alt={item?.image?.name}
										className="img-fluid rounded imgFluid"
										style={{
											height: "10rem",
											width: "100%",
										}}
									/>
								</div>
								<div className="col textTrunc my-auto">{item?.type}</div>
								<div className="col d-none d-md-flex textTrunc my-auto">
									{nairaSign}
									{item?.price
										? numberWithCommas(Number(item?.price).toFixed(2))
										: 0}
								</div>
								{auth?.user?.privilege === "agent" && (
									<>
										<div className="col textTrunc my-auto">
											{nairaSign}
											{item?.resellerPrice
												? numberWithCommas(
														Number(item?.resellerPrice).toFixed(2)
												  )
												: 0}
										</div>
										<div className="col textTrunc my-auto">
											{nairaSign}
											{item?.topuserPrice
												? numberWithCommas(
														Number(item?.topuserPrice).toFixed(2)
												  )
												: 0}
										</div>
									</>
								)}
								<div
									className={`col textTrunc my-auto ${
										item?.enabler === "enable"
											? "text-success text-success2"
											: "text-danger text-danger2"
									}`}>
									{item?.enabler === "enable" ? "Available" : "Not available"}
								</div>
								<div className="col textTrunc my-auto btn-group">
									<button
										title="Edit Education plan"
										onClick={() => setDatum(item)}
										className="btn btn-success2 text-capitalize p-1 p-md-2 w-100 fontReduce2">
										<BsPen />
									</button>
									<button
										title="Delete Education plan"
										onClick={async () => {
											setLoad2({ isLoad: true, loadEducation: item?._id });
											await manageEducationBundle(item, item?._id, "delete");
											setLoad2({ isLoad: false, loadEducation: "" });
										}}
										className="btn btn-danger2 text-capitalize p-1 p-md-2 w-100 fontReduce2">
										{load2?.isLoad && load2?.loadEducation === item?._id ? (
											<ClipLoader color="white" size={16} />
										) : (
											<BiTrashAlt />
										)}
									</button>
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</>
	);
};

export const UploadPicture = ({ img, setImages }) => {
	let handleChangeImage = e => {
		let file = e.target.files[0];
		if (!file) {
			// return toast.error("No Image file included...");
		}

		if (
			file.type !== "image/jpeg" &&
			file.type !== "image/jpg" &&
			file.type !== "image/png"
		) {
			// return toast.error("Image format not supported");
		}
		setImages(file);
	};
	return (
		<div className="mb-3 mb-md-5">
			<h4 className="textColor mb-3 Lexend">Upload picture</h4>
			<div className="file_upload d-inline myCursor mb-5">
				<button
					title="Upload file"
					className="btn btn-outline-primary1 text-capitalize px-2 px-md-5 mx-1 mx-md-3">
					click to upload
				</button>
				<input
					title="Upload file"
					type="file"
					name="file"
					id="file"
					className="myCursor"
					accept="image/*"
					onChange={handleChangeImage}
				/>
				<div className="mb-3 mb-md-5" />
			</div>
			{img ? (
				<>
					<div className="row mx-0 g-4 mb-3 mb-md-5">
						<div className="col-md-4">
							<img
								src={img?.url ? img?.url : URL?.createObjectURL(img)}
								alt="Img"
								className="img-fluid fleetImg fleetImg2 rounded imgShow"
							/>
						</div>
					</div>
				</>
			) : (
				<></>
			)}
		</div>
	);
};