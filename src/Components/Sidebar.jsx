import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GlobalState } from "../Data/Context";
import { BiCog, BiLogIn } from "react-icons/bi";
import "../Styles/Sidebar.css";
import { Navbar } from "reactstrap";
import { BsChevronRight, BsCodeSlash } from "react-icons/bs";
import { FaCircle, FaBars } from "react-icons/fa";
import { GiThreeFriends } from "react-icons/gi";
import { ModalComponents } from "./DefaultHeader";
import { useIdleTimer } from "react-idle-timer";
import AppLogo from "./app-logo";
import dataarena from "../Assets/dataarena.png"

export let CapitalizeFirst = text => {
	return text.replace(/\b\w/g, m => {
		return m.toUpperCase();
	});
};

const Sidebar = () => {
	const {
		sidebarList,
		sidebarListUser,
		logoutUser,
		auth,
		// getSetTempUser,
	} = useContext(GlobalState);
	let location = useLocation(),
		navigate = useNavigate(),
		[sidebarState, setSidebarState] = useState(null),
		[isOpen, setIsOpen] = useState(false),
		toggle = () => {
			setIsOpen(!isOpen);
		};

	useEffect(() => {
		if (auth?.user?.privilege === "agent") {
			setSidebarState(sidebarList);
		} else if (auth?.user?.privilege !== "agent") {
			setSidebarState(sidebarListUser);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [auth?.user?.privilege]);

	let toggleClose = () => {
		let sidebar = document?.body?.querySelector(".sidebar");
		if (!sidebar?.classList.contains("close")) {
			sidebar?.classList?.toggle("close");
		}
	};

	let menuList = (item, index) => (
		<li
			title={item?.name}
			onClick={toggleClose}
			className={`nav-link position-relative ${
				location.pathname.includes(item.url) ? "headerActive" : ""
			} ${item?.type === "button" ? "button" : ""}`}
			key={index}>
			{item?.counter > 0 && (
				<FaCircle
					className="text-danger position-absolute"
					style={{ top: "10px", right: "7px" }}
				/>
			)}
			{item?.type === "button" ? (
				<>
					<span className="myCursor nav-item dropdown post-options menuBtn">
						<span
							id="moreLink"
							data-bs-toggle="dropdown"
							className="menuBtn myCursor">
							{item.icon}
							<span className="text nav-text text-capitalize">{item.name}</span>
						</span>
						<span className="dropdown-menu" aria-labelledby="moreLink">
							{item?.listArr?.map((list, i) => (
								<div
									key={i}
									className="dropdown-item d-flex align-items-center text-[#FFC107] my-1 myCursor text-capitalize text-center d-flex justify-content-center">
									{list.type === "button" ? (
										item.name
									) : (
										<Link
											to={list?.url}
											className="text-decoration-none text-dark">
											{list?.name}
										</Link>
									)}
								</div>
							))}
						</span>
					</span>
				</>
			) : (
				<Link to={item?.url}>
					{item?.icon}
					<span className="text nav-text text-capitalize">{item?.name}</span>
				</Link>
			)}
		</li>
	);

	let handleLogOut = async e => {
		e?.preventDefault();
		console.log({ time: getLastActiveTime() });
		await logoutUser();
		setIsOpen(false);
		navigate("/");
	};

	const { getLastActiveTime } = useIdleTimer({
		timeout: 1000 * 60 * 10,
		onIdle: handleLogOut,
		debounce: 500,
	});

	useEffect(() => {
		document.title = CapitalizeFirst(
			`${process.env.REACT_APP_AGENT_NAME} ${location.pathname
				.split("/")
				.join(" ")
				.substring(1)}`
		);
	}, [location.pathname]);

	let handleToggle = () => {
		let sidebar = document?.body?.querySelector(".sidebar");

		sidebar?.classList?.toggle("close");
	};

	if (!sidebarState) return <></>;

	return (
		<>
			<nav className="sidebar !bg-[#0C5533] close">
				<header>
					<div className="image-text">
						<Link to={"/"}>
							<span className="image">
								<img
									src={dataarena}
									alt={`dataarena`}
									className="rounded logo"
								/>
								
							</span>
						</Link>
						{/* <div className="text header-text">
							<span className="name">Honour world</span>
							<span className="profession">Limited</span>
						</div> */}
					</div>
					<BsChevronRight
						className="toggle toggleIcon icon myCursor d-none d-md-block"
						onClick={handleToggle}
					/>
					<FaBars
						className="toggle toggleIcon icon myCursor d-md-none toggleBar"
						onClick={handleToggle}
					/>
				</header>
				<div className="menu-bar">
					<div className="menu">
						<ul className="menu-links list-unstyled">
							{sidebarState?.map((item, i) => menuList(item, i))}
							{["Cebizpay", "Teetop Digital"]?.includes(
								process.env.REACT_APP_AGENT_NAME
							) && (
								<>
									{["agent", "reseller"]?.includes(auth?.user?.privilege) && (
										<li
											title={"Documentation"}
											onClick={toggleClose}
											className={`nav-link position-relative ${
												location.pathname.includes("/documentation")
													? "headerActive"
													: ""
											}`}>
											<a
												target={"_blank"}
												rel="noreferrer"
												href="https://documenter.getpostman.com/view/13400807/2s93CLtDqa">
												<BsCodeSlash className="icon" size={24} />
												<span className="text nav-text text-capitalize">
													API Documentation
												</span>
											</a>
										</li>
									)}
								</>
							)}
						</ul>
					</div>
					<div className="bottom-content !text-[#FFC107]">
						<li
							title="Settings"
							className={`nav-link tw-rounded-lg ${
								location.pathname.includes("/referral") ? "headerActive" : ""
							}`}>
							<Link onClick={toggleClose} to="/wallets/referral">
								<GiThreeFriends className="icon" size={24} />
								<span className="text nav-text">Refer a friend</span>
							</Link>
						</li>
						<li
							title="Settings"
							className={`nav-link ${
								location.pathname.includes("/settings") ? "headerActive" : ""
							}`}>
							<Link onClick={toggleClose} to="/settings">
								<BiCog className="icon" size={24} />
								<span className="text nav-text">Settings</span>
							</Link>
						</li>
						<li
							className=""
							title="Logout"
							onClick={() => {
								toggle();
								toggleClose();
							}}>
							<Link to="#">
								<BiLogIn className="icon" size={24} />
								<span className="text nav-text">Logout</span>
							</Link>
						</li>
					</div>
				</div>
			</nav>
			<ModalComponents title={"Logout"} isOpen={isOpen} toggle={toggle}>
				<div className="downH2 d-flex flex-column align-items-center">
					<div className="my-auto w-100">
						<p className="text2 Lexend text-center">Do you want to logout?</p>
						<div className="w-100 d-flex">
							<div className="btn-group mx-auto w-50">
								<button
									className="btn btn-success2 text-uppercase py-3"
									onClick={handleLogOut}>
									yes
								</button>
								<button
									className="btn btn-danger text-uppercase py-3"
									onClick={toggle}>
									no
								</button>
							</div>
						</div>
					</div>
				</div>
			</ModalComponents>
		</>
	);
};

export default Sidebar;

export const SideHeader = ({ noLogo }) => {
	let location = useLocation(),
		[isShadow, setIsShadow] = useState(null);

	let handleScroll = () => {
		window.onscroll = () => {
			if (window.scrollY > 100) setIsShadow(true);
			else setIsShadow(false);
		};
	};

	useEffect(() => {
		document.title = CapitalizeFirst(
			`${process.env.REACT_APP_AGENT_NAME} ${location.pathname
				.split("/")
				.join(" ")
				.substring(1)}`
		);
		handleScroll();
	}, [location.pathname]);

	return (
		<Navbar
			expand="md"
			sticky="top"
			className={`container-fluid px-3 sidehead header bg-white
			 headerScroll ${isShadow ? "shadow2 shadow" : ""} ${noLogo ? "d-md-none" : ""}`}
			light>
			{!noLogo && (
				<Link to="/">
					<img
						src={process.env.REACT_APP_IMAGE_URL}
						alt={`logo ${process.env?.REACT_APP_AGENT_NAME}`}
						className="logo"
					/>
				</Link>
			)}
		</Navbar>
	);
};
