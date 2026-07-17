import React, { useContext, useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  Header,
	Sidebar,
  DefaultHeader,
  Footer,
	SideHeader,
  ModalComponents,
} from "./Components";
import { GlobalState } from "./Data/Context";
import PageRender from "./PageRender";
import gif from "./Assets/59945-success-confetti.gif";
import gif2 from "./Assets/icons8-cancel.gif";
import moment from "moment";
import { Fragment } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { BsInstagram, BsTwitter } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";

import Home from "./Screens/home";
import Home2 from "./Pages/home";
import Home3 from "./Views/home";
import HomeFour from "./Screens/home-four";
import HomeThree from "./Screens/home-three";
import HomeTwo from "./Screens/home-two/index";
import HomeOne from "./Screens/home-one/index";

// import HomeFive from "./Screens/home-five";
// import HomeSix from "./Screens/home-six";
// import HomeSeven from "./Screens/home-seven";

const Routers = () => {
	const location = useLocation();
  const {
    auth,
    success,
    restoreMsg,
    errors,
    clearErrors,
    notifications,
    manageNotify,
  } = useContext(GlobalState);

	const showDashboardLayout = auth?.user && location.pathname === "/dashboard";

  let [notifyList, setNotifyList] = useState([]),
    [isOpen, setIsOpen] = useState(false),
    [keepOpen, setKeepOpen] = useState("open");

  useEffect(() => {
    if (notifications?.incoming?.length > 0) {
      let res = notifications?.incoming?.filter(
        (item) =>
          item?.priority && !item?.isNotifiedTo?.includes(auth?.user?._id)
      );
      if (res?.length > 0) setNotifyList(res);
    }
  }, [notifications?.incoming, auth?.user]);

  useEffect(() => {
    if (notifyList?.length > 0 && !isOpen && keepOpen === "open") {
      setTimeout(() => {
        setIsOpen(true);
      }, 5000);
    } else {
      setIsOpen(false);
    }
    if (notifyList?.length === 0 || keepOpen !== "open") setIsOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifyList?.length, keepOpen]);

  let markAsNotified = async () => {
    for (let m = 0; m < notifyList.length; m++) {
      await manageNotify(null, notifyList?.[m]?._id, "prior");
    }
    setIsOpen(false);
  };

  return (
		<>
			<ToastContainer autoClose={false} />
			{showDashboardLayout ? (
				<>
					<Sidebar />
					<SideHeader noLogo />
				</>
			) : ["DataArena"]?.includes(process.env.REACT_APP_AGENT_NAME) ||
			  ["DataArena"]?.includes(
					process.env.REACT_APP_PROVIDER_NAME
			  ) ? (
				<></>
			) : (
				<Header />
				// ""
			)}
			<div className={showDashboardLayout ? "home" : ""}>
				{showDashboardLayout ? <DefaultHeader /> : <></>}
				<Routes>
					<Route
						path="/"
						element={
							auth?.user?.privilege === "agent" ? (
								<Home3 />
							) : ["Spike Mobile"]?.includes(
									process.env.REACT_APP_PROVIDER_NAME
							  ) ||
							  [
									"DataArena"
							  ]?.includes(process.env.REACT_APP_AGENT_NAME) ? (
								<HomeThree />
							): (
								<Home />
							)
						}
					/>
					<Route path="/:page" element={<PageRender />} />
					<Route path="/:page/:id" element={<PageRender />} />
					<Route path="/:page/:id/:step" element={<PageRender />} />
				</Routes>
			</div>
			{auth?.user ||
			["DataArena"]?.includes(process.env.REACT_APP_AGENT_NAME) ||
			["Spike Mobile"]?.includes(
				process.env.REACT_APP_PROVIDER_NAME
			) ? (
				<></>
			) : (
				<Footer />
				// ""
			)}
			<ModalComponents
				isOpen={success?.msg ? true : false}
				title="Success"
				size={"sm"}
				success="text-success text-succcess2"
				borderNone={"borderNone"}
				toggle={() => restoreMsg()}>
				<div className="downH2 d-flex flex-column">
					<div className="mx-auto">
						<img src={gif} alt="Gif" className="img-fluid" />
					</div>
					<p className="fw-bold Lexend text-center w-100">{success?.msg}</p>
					<button
						onClick={() => restoreMsg()}
						className="btn btn-success2 py-2 py-md-3 text-capitalize mx-auto my-3 px-3 px-md-5">
						close
					</button>
				</div>
			</ModalComponents>
			<ModalComponents
				isOpen={errors?.error?.error?.length > 0}
				title="Error"
				size={"sm"}
				success="text-danger text-danger2"
				borderNone={"borderNone"}
				toggle={() => clearErrors()}>
				<div className="downH2 d-flex flex-column">
					<div className="mx-auto mb-3">
						<img src={gif2} alt="Gif" className="img-fluid" />
					</div>
					{errors?.error?.error?.map((item, i) => (
						<p key={i} className="fw-bold Lexend text-center w-100">
							<span className="fontInherit me-2">{i > 0 && <>{i + 1}.</>}</span>{" "}
							{item?.msg}
						</p>
					))}
					<button
						onClick={() => clearErrors()}
						className="btn btn-primary1 py-2 py-md-3 text-capitalize mx-auto my-3 px-3 px-md-5">
						close
					</button>
				</div>
			</ModalComponents>
			<ModalComponents
				isOpen={isOpen}
				title="Be informed"
				size={"sm"}
				borderNone={"borderNone"}
				toggle={() => {
					setKeepOpen("close");
					markAsNotified();
				}}>
				<div className="downH2 d-flex flex-column">
					{notifyList?.map((item, i) => (
						<Fragment key={i}>
							<p className="fw-bold Lexend text-center w-100 my-0">
								<span className="fontInherit me-2">
									{i > 0 && <>{i + 1}.</>}
								</span>{" "}
								{item?.message}
							</p>
							<small className="d-block ms-auto Lexend mb-3">
								{moment(item?.createdAt).diff(moment(), "years") < 0
									? moment(item?.createdAt).format("DD/MM/YYYY hh:mm A")
									: moment(item?.createdAt).diff(moment(), "months") < 0
									? moment(item?.createdAt).format("DD/MM hh:mm A")
									: moment(item?.createdAt).diff(moment(), "days") < 0
									? moment(item?.createdAt).format("DD/MM hh:mm A")
									: moment(item?.createdAt).format("hh:mm A")}
							</small>
						</Fragment>
					))}
					<button
						onClick={() => {
							setKeepOpen("close");
							markAsNotified();
						}}
						className="btn btn-primary1 py-2 py-md-3 text-capitalize mx-auto my-3 px-3 px-md-5">
						close
					</button>
				</div>
			</ModalComponents>
			{auth?.isAuth && (
				<div className="position-relative">
					<div
						className="position-absolute"
						style={{
							bottom: "2rem",
							right: "2rem",
						}}>
						{process.env.REACT_APP_AGENT_TWITTER && (
							<a
								style={{
									height: "3rem",
									width: "3rem",
									background: "#3199b7",
								}}
								className="d-flex justify-content-center align-items-center bg-select-2 my-2  rounded-circle text-decoration-none text-capitalize text-white"
								href={process.env.REACT_APP_AGENT_TWITTER}
								target={"_blank"}
								title="Contact admin through Twitter"
								rel={"noreferrer"}>
								<BsTwitter size={24} />
							</a>
						)}
						{process.env.REACT_APP_AGENT_INSTAGRAM && (
							<a
								style={{
									height: "3rem",
									width: "3rem",
									background: "#ff476b",
								}}
								className="d-flex justify-content-center align-items-center bg-select-2 my-2  rounded-circle text-decoration-none text-capitalize text-white"
								href={process.env.REACT_APP_AGENT_INSTAGRAM}
								target={"_blank"}
								title="Contact admin through Instagram"
								rel={"noreferrer"}>
								<BsInstagram size={24} />
							</a>
						)}
						{process.env.REACT_APP_AGENT_FACEBOOK && (
							<a
								style={{
									height: "3rem",
									width: "3rem",
									background: "#1a10c5",
								}}
								className="d-flex justify-content-center align-items-center bg-select-2 my-2  rounded-circle text-decoration-none text-capitalize text-white"
								href={process.env.REACT_APP_AGENT_FACEBOOK}
								target={"_blank"}
								title="Contact admin through Facebook"
								rel={"noreferrer"}>
								<FaFacebookF size={24} />
							</a>
						)}
						{process.env.REACT_APP_AGENT_WHATSAPP_GROUP && (
							<a
								style={{
									height: "3rem",
									width: "3rem",
									background: "#20c997",
								}}
								className="d-flex justify-content-center align-items-center bg-select-2 my-2  rounded-circle text-decoration-none text-capitalize text-white"
								href={process.env.REACT_APP_AGENT_WHATSAPP_GROUP}
								target={"_blank"}
								title="Join WhatsApp Group"
								rel={"noreferrer"}>
								<FaWhatsapp size={24} />
							</a>
						)}
						{process.env.REACT_APP_AGENT_WHATSAPP && (
							<a
								style={{
									height: "3rem",
									width: "3rem",
									background: "#20c997",
								}}
								className="d-flex justify-content-center align-items-center bg-select-2 my-2  rounded-circle text-decoration-none text-capitalize text-white"
								href={process.env.REACT_APP_AGENT_WHATSAPP}
								target={"_blank"}
								title="Contact admin through WhatsApp"
								rel={"noreferrer"}>
								<FaWhatsapp size={24} />
							</a>
						)}
						{process.env.REACT_APP_AGENT_EMAIL && (
							<a
								style={{
									height: "3rem",
									width: "3rem",
									background: "#d63384",
								}}
								title="Contact admin through email"
								className="d-flex justify-content-center align-items-center bg-select-2 my-2  rounded-circle text-decoration-none text-capitalize text-white"
								href={`mailto:${process.env.REACT_APP_AGENT_EMAIL}`}
								target={"_blank"}
								rel={"noreferrer"}>
								<HiOutlineEnvelope size={24} />
							</a>
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default Routers;
