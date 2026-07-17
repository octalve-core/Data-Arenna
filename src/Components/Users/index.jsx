import React, { useContext, useEffect, useState } from "react";
import user from "../../Assets/avatar3.png";
import moment from "moment";
import { BiCog } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalState } from "../../Data/Context";
import { ModalComponents } from "../DefaultHeader";
import { Buttons, EmptyComponent } from "../../Utils";
import { AddNotification } from "../Notification";
import LoadMore, { BottomTab } from "../LoadMore";
import { downloadExcel } from "react-export-table-to-excel";
import { MakeBonus } from "../../Views/controls/bonus";
import { MainPaginate, MainRanger } from "../Transactions";

const Users = () => {
	return <div>Users</div>;
};

export default Users;

export const ThreeBoxBar = ({ list, setSubActive }) => {
	let navigate = useNavigate();
	return (
		<>
			<div className="row mx-0 g-2 g-md-4 py-3 py-md-5">
				{list?.map((item, index) => (
					<div
						onClick={
							setSubActive
								? () => {
										setSubActive(index);
								  }
								: () => {}
						}
						className="col-6 col-md-4 productCard"
						key={index}>
						<div
							className="row mx-0 p-3 eachProduct rounded20 text-white h-100"
							onClick={() => (item?.link ? navigate(item?.link) : {})}
							style={{
								background: item?.color,
							}}>
							<div className="col my-auto d-none d-md-flex">
								<img src={item?.icon} className="img-fluid" alt="Icon" />
							</div>
							<div className="col my-auto">
								<p className="text2 m-0">{item?.number}</p>
								<h6 className="text-capitalize fontReduce2">{item?.name}</h6>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export const UserListOne = () => {
	const { users, numberWithCommas, loadAllUser, getReload, nairaSign } =
		useContext(GlobalState);
	let [data, setData] = useState(null),
		[isOpen, setIsOpen] = useState(false),
		[loading, setLoading] = useState(false),
		[mainUser, setMainUser] = useState(null),
		toggle = () => {
			if (isOpen) {
				setMainUser(null);
			}
			setIsOpen(!isOpen);
		},
		navigate = useNavigate(),
		{ page } = useParams(),
		[isUser, setIsUser] = useState(null),
		toggleNotify = () => {
			setIsUser(null);
		},
		[isDisable, setIsDisable] = useState(null),
		toggleDisable = () => {
			setIsDisable(null);
		},
		[isDeleted, setIsDeleted] = useState(null),
		toggleDeleted = () => {
			setIsDeleted(null);
		},
		[isSwitch, setIsSwitch] = useState(null),
		toggleSwitch = () => {
			setIsSwitch(null);
		},
		[search, setSearch] = useState(""),
		[down, setDown] = useState(false),
		[isBonus, setIsBonus] = useState(false),
		toggleBonus = () => {
			setIsBonus(false);
		};

	useEffect(() => {
		if (search) {
			document.getElementById("Search").addEventListener("search", () => {
				getReload();
			});
			let handleSubmit = async () => {
				if (!search) return;

				await loadAllUser({
					search,
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

	let handleLoadMore = async () => {
		setLoading(true);
		if (search)
			await loadAllUser({
				limit: Number(
					users?.search_paginate?.nextPage * users?.search_paginate?.limit
				),
				search,
			});
		else
			await loadAllUser({
				limit: Number(users?.paginate?.nextPage * users?.paginate?.limit),
			});
		setLoading(false);
	};

	useEffect(() => {
		if (users?.isFound)
			setData(
				page === "dashboard"
					? users?.mainSearch?.slice(0, 10)
					: users?.mainSearch
			);
		else
			setData(
				page === "dashboard"
					? users?.users?.length > 0
						? users?.users?.slice(0, 10)
						: users?.all_users?.slice(0, 10)
					: users?.users?.length > 0
					? users?.users
					: users?.all_users
			);
	}, [users?.users, page, users?.isFound, users?.mainSearch, users?.all_users]);

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

	let actionArr = [
		{
			name: "Profile",
			type: "link",
			link: `/users/profile`,
		},
		{
			name: "wallet history",
			type: "link",
			link: `/users/wallet`,
		},
		{
			name: "purchase history",
			type: "link",
			link: `/users/purchase`,
		},
		{
			name: "notification",
			type: "button",
			link: `notification`,
		},
		{
			name: "give bonus",
			type: "button",
			link: `bonus`,
		},
		{ name: "disable user", type: "button", link: `disable` },
		{ name: "switch privilege", type: "button", link: `switch` },
		{
			name: "add transaction",
			type: "link",
			link: `/transactions/add`,
			case: "transaction",
		},
		{ name: "delete user", type: "button", link: `delete` },
	];

	let handleDownloadExcel = () => {
		setDown(true);
		let userData = [];

		for (let i = 0; i < users?.all_users.length; i++) {
			userData?.push({
				index: i + 1,
				firstName: users?.all_users?.[i]?.firstName,
				lastName: users?.all_users?.[i]?.lastName,
				email: users?.all_users?.[i]?.email,
				telephone: users?.all_users?.[i]?.telephone,
				createdAt: moment(users?.all_users?.[i]?.createdAt).format(
					"Do MMM, YYYY. hh:mm A"
				),
			});
		}
		downloadExcel({
			fileName: `${
				process.env.REACT_APP_AGENT_NAME
			} User Data ${moment().format("DDMMYYYYhhmmA")}`,
			sheet: "User Data",
			tablePayload: {
				header: [
					"S/N",
					"Firstname",
					"Lastname",
					"Email",
					"Telephone",
					"Registered on",
				],
				//   // accept two different data structures
				body: userData,
			},
		});
		setDown(false);
	};

	return (
		<div className="pb-5 my-5">
			{page !== "dashboard" && (
				<>
					<div className="d-none justify-content-end align-items-center w-100">
						<Buttons
							loading={down}
							onClick={handleDownloadExcel}
							title="download excel"
							css="btn-primary1 text-capitalize py-2 py-md-3 px-3 pm-md-5"
							width="btn"
						/>
					</div>
				</>
			)}
			{page !== "dashboard" && (
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
				</>
			)}
			<div className="bland row mx-0 py-3 text-capitalize">
				<div className="col textTrunc text-uppercase fontReduce fw-bold Lexend">
					Name
				</div>
				<div className="col textTrunc text-uppercase fontReduce fw-bold Lexend">
					number
				</div>
				<div className="col textTrunc text-uppercase fontReduce fw-bold Lexend d-none d-md-flex">
					date
				</div>
				<div className="col textTrunc text-uppercase fontReduce fw-bold Lexend">
					balance
				</div>
				<div className="col textTrunc text-uppercase fontReduce fw-bold Lexend d-none d-md-flex">
					Email
				</div>
				<div className="col textTrunc text-uppercase fontReduce fw-bold Lexend d-none d-md-flex">
					Wallet ID
				</div>
				<div className="col textTrunc text-uppercase fontReduce fw-bold Lexend text-center">
					Action
				</div>
			</div>
			<div className="bland2 row mx-0">
				{currentItems?.length === 0 ? (
					<EmptyComponent subtitle={"Users' list is empty"} />
				) : (
					currentItems?.map((item, index) => (
						<div key={index} className="row mx-0 p-3 border-bottom">
							<div className="col fontReduce2 textTrunc my-auto">
								<div className="d-flex align-items-center w-100">
									<img
										src={item?.avatar ? item?.avatar?.url : user}
										alt="User"
										className="img-fluid rounded-circle d-none d-md-flex imgFluid"
										style={{
											height: "3rem",
											width: "3rem",
										}}
									/>
									<span className="fontInherit my-0 ps-0 ps-md-1 textTrunc textTrunc2 fontReduce w-100">
										{item?.lastName} {item?.firstName}
									</span>
								</div>
							</div>
							<div className="col fontReduce textTrunc my-auto">
								{item?.telephone}
							</div>
							<div className="col fontReduce2 textTrunc my-auto d-none d-md-flex">
								{moment(item?.createdAt).format("DD/MM/YYYY")}
							</div>
							<div className="col fontReduce2 textTrunc my-auto d-flex w-100">
								<span className="fontInherit d-none d-md-flex me-md-1">
									{nairaSign}
								</span>{" "}
								<span>
									{item?.wallet?.available
										? numberWithCommas(
												Number(item?.wallet?.available).toFixed(2)
										  )
										: 0}
								</span>
							</div>
							<div className="col fontReduce2 textTrunc my-auto d-none d-md-flex">
								{item?.email}
							</div>
							<div className="col fontReduce2 textTrunc my-auto d-none d-md-flex">
								{item?.wallet?.wallet_id}
							</div>
							<div
								className="col fontReduce2 textTrunc my-auto myCursor text-center"
								onClick={() => {
									setMainUser(item);
									toggle();
								}}>
								<BiCog className="iconDash" />
							</div>
						</div>
					))
				)}
			</div>
			{page !== "dashboard" && (
				<>
					<MainPaginate
						handlePageClick={handlePageClick}
						pageCount={pageCount}
					/>
					<BottomTab
						state={data}
						paginate={users?.isFound ? users?.search_paginate : users?.paginate}
					/>
					<LoadMore
						next={
							users?.isFound
								? users?.search_paginate?.next
								: users?.paginate?.next
						}
						handleLoadMore={handleLoadMore}
						loading={loading}
					/>
				</>
			)}
			<AddNotification isOpen={isUser} back={toggleNotify} />
			<MakeBonus
				isOpen={isBonus ? true : false}
				back={toggleBonus}
				user={isBonus?._id}
			/>
			<DisableUser
				isOpen={isDisable}
				back={toggleDisable}
				toggleAll={() => {
					setMainUser(null);
					setIsOpen(false);
				}}
			/>
			<DeleteUser
				isOpen={isDeleted}
				back={toggleDeleted}
				toggleAll={() => {
					setMainUser(null);
					setIsOpen(false);
				}}
			/>
			<SwitchUser
				isOpen={isSwitch}
				back={toggleSwitch}
				toggleAll={() => {
					setMainUser(null);
					setIsOpen(false);
				}}
			/>
			<ModalComponents title={"Manage User"} isOpen={isOpen} back={toggle}>
				<div className="row mx-0 g-4 g-md-5">
					{actionArr?.map((a, i) => (
						<div className="col-6 px-3" key={i}>
							<button
								onClick={
									a?.type === "button"
										? a?.link === "notification"
											? () => {
													setIsUser(mainUser?._id);
											  }
											: a?.link === "disable"
											? () => {
													setIsDisable(mainUser);
											  }
											: a?.link === "delete"
											? () => {
													setIsDeleted(mainUser);
											  }
											: a?.link === "bonus"
											? () => {
													setIsBonus(mainUser);
											  }
											: a?.link === "switch"
											? () => {
													setIsSwitch(mainUser);
											  }
											: null
										: () =>
												navigate(
													a?.case
														? `${a?.link}?name=${mainUser?.lastName}_${mainUser?.firstName}&userId=${mainUser?._id}`
														: `${a?.link}/${mainUser?._id}?name=${mainUser?.lastName}_${mainUser?.firstName}&userId=${mainUser?._id}`
												)
								}
								className="btn btn-outline-primary1 text-capitalize w-100 py-3">
								{a?.link === "disable"
									? `${mainUser?.status ? "Disable" : "Activate"} user`
									: a?.link === "switch"
									? `${a?.name} ${mainUser?.privilege}`
									: a?.name}
							</button>
						</div>
					))}
				</div>
			</ModalComponents>
		</div>
	);
};

const DisableUser = ({ isOpen, back, toggleAll }) => {
	const { manageUserActiveness, users } = useContext(GlobalState);
	let [loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false);

	useEffect(() => {
		if (submit && users?.isUpdated) {
			setSubmit(false);
			toggleAll();
			back();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, users?.isUpdated]);
	// console.log({ isOpen });
	return (
		<>
			<ModalComponents
				title={`${isOpen?.status ? "Suspend" : "Activate"} User`}
				back={back}
				isOpen={isOpen ? true : false}>
				<div className="downH2 d-flex">
					<div className="my-auto w-100">
						<form className="d-flex flex-column justify-content-center align-items-center h-100 w-100">
							<p className="text2p">
								Do you want to {isOpen?.status ? "Suspend" : "Activate"} this
								user?
							</p>
							<div className="btn-group mx-auto w-50">
								<Buttons
									loading={loading}
									onClick={async e => {
										e.preventDefault();
										setLoading(true);
										await manageUserActiveness(
											isOpen._id,
											isOpen?.status ? "suspend" : "activate"
										);
										setSubmit(true);
										setLoading(false);
									}}
									width="w-50"
									css="btn-success2 text-capitalize py-3 w-50"
									title={"yes"}
								/>
								<Buttons
									onClick={back}
									width="w-50"
									css="btn-primary1 text-capitalize py-3 w-50"
									title={"no"}
								/>
							</div>
						</form>
					</div>
				</div>
			</ModalComponents>
		</>
	);
};

export const DeleteUser = ({ isOpen, back, toggleAll }) => {
	const { manageUserActiveness, users } = useContext(GlobalState);
	let [loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false),
		handleSubmit = async e => {
			e?.preventDefault();
			setLoading(true);
			await manageUserActiveness(isOpen._id, "delete", null, null, isOpen);
			setSubmit(true);
			setLoading(false);
		};

	useEffect(() => {
		if (submit && users?.isDeleted) {
			setSubmit(false);
			toggleAll();
			back();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, users?.isDeleted]);
	// console.log({ isOpen });
	return (
		<>
			<ModalComponents
				title={`Delete User`}
				back={back}
				isOpen={isOpen ? true : false}>
				<div className="downH2 d-flex">
					<div className="my-auto w-100">
						<form
							className="d-flex flex-column justify-content-center align-items-center h-100 w-100"
							onSubmit={handleSubmit}>
							<p className="text2p">Do you want to delete this user?</p>
							<div className="btn-group mx-auto w-50">
								<Buttons
									loading={loading}
									onClick={handleSubmit}
									width="w-50"
									css="btn-success2 text-capitalize py-3 w-50"
									title={"yes"}
								/>
								<Buttons
									onClick={back}
									width="w-50"
									css="btn-danger text-capitalize py-3 w-50"
									title={"no"}
								/>
							</div>
						</form>
					</div>
				</div>
			</ModalComponents>
		</>
	);
};

const SwitchUser = ({ isOpen, back, toggleAll }) => {
	const { manageUserActiveness, users } = useContext(GlobalState);
	let [loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false),
		[privilege, setPrivilege] = useState("");

	useEffect(() => {
		setPrivilege(isOpen?.privilege);
	}, [isOpen?.privilege]);

	useEffect(() => {
		if (submit && users?.isUpdated) {
			setSubmit(false);
			toggleAll();
			back();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, users?.isUpdated]);
	// console.log({ isOpen });

	let switchcase = [
		{
			name: "Top user",
			case: "topuser",
		},
		{
			name: "Reseller",
			case: "reseller",
		},
		{
			name: "User",
			case: "user",
		},
	];

	return (
		<>
			<ModalComponents
				title={`Switch User Privilege`}
				back={back}
				isOpen={isOpen}>
				<div className="downH2 d-flex">
					<div className="my-auto w-100">
						<form className="d-flex flex-column justify-content-center align-items-center h-100 w-100">
							<div className="w-100 d-block py-5">
								<label htmlFor="Privilege" className="Lexend">
									Switch privilege from {isOpen?.privilege}
								</label>
								<div className="row mx-0 g-3">
									{switchcase?.map((item, i) => (
										<div className="col p-2" key={i}>
											<div
												className={`btn ${
													privilege === item?.case
														? "btn-primary1"
														: "btn-outline-primary1"
												} w-100 h-100 text-capitalize py-3 py-md-5 rounded20`}
												onClick={() => setPrivilege(item?.case)}>
												{item?.name}
											</div>
										</div>
									))}
								</div>
							</div>
							<div className="btn-group mx-auto w-50">
								<Buttons
									loading={loading}
									onClick={async e => {
										e.preventDefault();
										if (privilege === isOpen?.privilege) return;
										setLoading(true);
										await manageUserActiveness(isOpen._id, privilege, "put");
										setSubmit(true);
										setLoading(false);
									}}
									width="w-50"
									css="btn-success2 text-capitalize py-3 w-50"
									title={"yes"}
								/>
								<Buttons
									onClick={back}
									width="w-50"
									css="btn-primary1 text-capitalize py-3 w-50"
									title={"no"}
								/>
							</div>
						</form>
					</div>
				</div>
			</ModalComponents>
		</>
	);
};
