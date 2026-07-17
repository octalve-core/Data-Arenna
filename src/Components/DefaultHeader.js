import { useContext, useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { GlobalState } from "../Data/Context";
import user from "../Assets/avatar3.png";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

const DefaultHeader = () => {
	const { auth, stateName } = useContext(GlobalState);
	const [salutation, setSalutation] = useState("");
	let navigate = useNavigate(),
		param = useLocation();
	useEffect(() => {
		const date = new Date();
		const hrs = date.getHours();
		if (hrs < 12) {
			setSalutation("Good Morning");
		} else if (hrs >= 12 && hrs <= 17) {
			setSalutation("Good Afternoon");
		} else if (hrs >= 17 && hrs <= 24) {
			setSalutation("Good Evening");
		}
	}, []);
	return (
		<section className="border-bottom bg-white">
			<div className="pe-md-5 px-2 ps-md-3 d-flex align-items-center barFont justify-content-between defaultHead">
				<div className="w-100 d-flex align-items-center ps-md-auto ps-4">
					{param.pathname === "/dashboard" ? (
						<></>
					) : (
						<BiArrowBack
							className="ms-2 ms-md-5 myCursor"
							onClick={() => navigate(-1)}
						/>
					)}
					<div className="">
						{param.pathname === "/dashboard" ? (
							<small className="ms-2 text-uppercase fw-5">
								{auth?.user?.privilege === 'agent' ? "admin": auth?.user?.privilege}
							</small>
						) : (
							<h3 className="ms-2 text-capitalize my-0 fontReduceBig Lexend">
								{stateName || param.pathname.split("/")[1]}
							</h3>
						)}

						<h3 className="ms-2 fs-5 fw-bold text-capitalize my-0">
							{param.pathname === "/dashboard" &&
								salutation +
									", " +
									auth?.user?.firstName +
									" " +
									auth?.user?.lastName}
						</h3>
					</div>
				</div>
				<header className="d-flex align-items-center my-auto justify-content-end container">
					<Link
						className="text-dark text-decoration-none d-flex align-items-center"
						to="/settings">
						<img
							src={auth?.user?.avatar?.url || user}
							alt={`${auth?.user?.fullname} `}
							style={{
								height: "3.5rem",
								width: "3.5rem",
								objectFit: "cover",
								objectPosition: "center 15%",
							}}
							className="rounded-circle img-fluid mx-md-3"
						/>
					</Link>
				</header>
			</div>
		</section>
	);
};

export default DefaultHeader;

export const TabHeader = ({ title, subtitle }) => {
	let { page } = useParams();
	return (
		<>
			<h3 className="text-capitalize lexendFont">{title ? title : page}</h3>
			<p className="text-capitalize">
				{subtitle
					? subtitle
					: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta,
				impedit.`}
			</p>
		</>
	);
};

export const ModalComponents = ({
	isOpen,
	toggle,
	title,
	children,
	back,
	size,
	notHeader,
	borderNone,
	success,
}) => {
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		}
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isOpen]);
	return (
		<Modal
			isOpen={isOpen}
			centered
			scrollable
			size={size}
			className={notHeader ? "p-0 overflow-hidden" : ""}>
			{!notHeader && (
				<ModalHeader
					toggle={toggle}
					className={`${borderNone ? borderNone : ""} ${
						success ? success : ""
					} text-capitalize Lexend textColor2`}>
					{back && <BiArrowBack className="me-3 myCursor" onClick={back} />}
					{title}
				</ModalHeader>
			)}
			<ModalBody className={notHeader ? "p-0 overflow-hidden" : ""}>
				{children}
			</ModalBody>
		</Modal>
	);
};
