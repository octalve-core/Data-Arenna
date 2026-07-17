import React from "react";
import { Link } from "react-router-dom";
import {
	FaPhone,
	FaInstagramSquare,
	FaFacebook,
	FaTwitter,
	FaMapMarker,
	FaWhatsapp,
} from "react-icons/fa";
import { HiOutlineEnvelope } from "react-icons/hi2";

export let socials = [
	{
		icon: <FaWhatsapp size={24} />,
		url: process.env.REACT_APP_AGENT_WHATSAPP
			? process.env.REACT_APP_AGENT_WHATSAPP
			: "",
	},
	{
		icon: <FaInstagramSquare size={24} />,
		url: process.env.REACT_APP_AGENT_INSTAGRAM
			? process.env.REACT_APP_AGENT_INSTAGRAM
			: "",
	},
	{
		icon: <FaFacebook size={24} />,
		url: process.env.REACT_APP_AGENT_FACEBOOK
			? process.env.REACT_APP_AGENT_FACEBOOK
			: "",
	},
	{
		icon: <FaTwitter size={24} />,
		url: process.env.REACT_APP_AGENT_TWITTER
			? process.env.REACT_APP_AGENT_TWITTER
			: "",
	},
	{
		icon: <HiOutlineEnvelope size={24} />,
		url: process.env.REACT_APP_AGENT_EMAIL
			? process.env.REACT_APP_AGENT_EMAIL
			: "",
		type: "mail",
	},
];

export let details = [
	{
		icon: <FaPhone />,
		text: process.env.REACT_APP_AGENT_TELEPHONE
			? process.env.REACT_APP_AGENT_TELEPHONE
			: "",
		type: "tel",
	},
	{
		icon: <HiOutlineEnvelope />,
		text: process.env.REACT_APP_AGENT_EMAIL
			? process.env.REACT_APP_AGENT_EMAIL
			: "",
		type: "mail",
	},
	{
		icon: <FaMapMarker />,
		text: process.env.REACT_APP_AGENT_ADDRESS
			? process.env.REACT_APP_AGENT_ADDRESS
			: "",
		type: "address",
	},
];
const Footer = () => {
	let quick = [
		{ name: "Home", url: "/" },
		{ name: "Services", url: "/services" },
		// { name: "Blog", url: "/blogs" },
		{ name: "About Us", url: "/about" },
	];

	let resources = [
		{ name: "Data services" },
		{ name: "Airtime Services" },
		{ name: "TV Subscription" },
		{ name: "Cable Subscription" },
		{ name: "Subscription" },
	];

	return (
		<footer className="bg-select-2 page-footer  p-3">
			<div className="container text-white">
				<div className="footerDiv py-5">
					<div>
						<Link
							to="/"
							className="text-decoration-none text-white d-flex align-items-center mb-5">
							<img
								src={
									process.env.REACT_APP_IMAGE_URL_LIGHT
										? process.env.REACT_APP_IMAGE_URL_LIGHT
										: process.env.REACT_APP_IMAGE_URL
								}
								alt={`logo ${process.env.REACT_APP_AGENT_NAME}`}
								className="logo me-1 logo2 rounded10"
							/>
							<div className="">
								<p className="text-capitalize m-0 text-light">
									{process.env.REACT_APP_AGENT_NAME}
								</p>
								<p className="text-capitalize m-0 site-secondary-color"></p>
							</div>
						</Link>
						{/* <div className="d-none d-md-block fontReduce">
  					We are the #MOVEMENT People Your Trusted Logistics Aggregator
  				</div> */}
					</div>
					<div>
						<h5>Explore</h5>
						<ul className="list-group border-0">
							{quick.map((item, index) => (
								<li
									key={index}
									className="list-group-item border-0 bg-transparent">
									<Link
										to={item.url}
										className="text-white text-decoration-none fontReduce">
										{item.name}
									</Link>{" "}
								</li>
							))}
						</ul>
					</div>
					<div className="pt-4 pt-md-0">
						<h5>Our services</h5>
						<ul className="list-group border-0">
							{resources.map((item, index) => (
								<li
									key={index}
									className="list-group-item border-0 bg-transparent">
									<p className="text-white text-decoration-none fontReduce">
										{item.name}
									</p>{" "}
								</li>
							))}
						</ul>
					</div>
					<div className="d-none d-md-block">
						<h5>Contact Us</h5>
						<ul className="list-group border-0">
							{details.map((item, index) =>
								item?.text ? (
									<li
										key={index}
										className="list-group-item border-0 bg-transparent text-white d-flex align-items-center">
										{item.icon}
										<p className="ms-3">
											{item?.type === "tel" ? (
												<>
													<a
														className="text-white text-decoration-none fontReduce"
														href={!item?.text ? "#" : `tel:${item?.text}`}>
														{item?.text ? item?.text : ""}
													</a>
												</>
											) : item?.type === "mail" ? (
												<>
													<a
														className="text-white text-decoration-none fontReduce"
														href={!item?.text ? "#" : `mailto:${item?.text}`}>
														{item?.text}
													</a>
												</>
											) : item?.type === "address" ? (
												<>
													<a
														className="text-white text-decoration-none fontReduce"
														target={"_blank"}
														rel="noreferrer"
														href={
															!item?.text
																? "#"
																: `https://www.google.com/maps/place/?q=place_id=${
																		details?.[details?.length - 1]?.text
																  }`
														}>
														{item?.text}
													</a>
												</>
											) : (
												<></>
											)}
										</p>
									</li>
								) : (
									""
								)
							)}
						</ul>
					</div>
					<div className="pt-4 d-none pt-md-0">
						<h5>Socials</h5>
						<ul className="list-group border-0 list-group-horizontal">
							{socials.map((item, index) => (
								<li
									key={index}
									className="list-group-item border-0 bg-transparent text-white d-flex align-items-center">
									<a
										className="text-white text-decoration-none fontReduce"
										target={"_blank"}
										rel="noreferrer"
										href={item?.url ? item?.url : "#"}>
										{item?.icon}
									</a>
								</li>
							))}
						</ul>
					</div>
				</div>
				<div className="container d-flex justify-content-center align-items-center">
					<p className="m-0 fontReduce text-center">
						All rights reserved.
						<span className="mx-1">
							&copy; {`${new Date().getFullYear() !== 2022 ? "2022 - " : ""}`}
							{new Date().getFullYear()}
						</span>
						&nbsp;{" "}
						<span className="d-block d-lg-inline">
							{process.env.REACT_APP_AGENT_NAME}{" "}
						</span>
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
