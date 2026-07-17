import React from "react";
import HomeSevenNav from "../../Components/home-seven/HomeSevenNav";
import HomeSevenHerroBg from "../../Assets/HomeSevenHerroBg.png";
import HomeSevenCard from "../../Components/home-seven/HomeSevenCard";
import HsixRectangle1 from "../../Assets/HsixRectangle1.png";
import Hsevenicon from "../../Assets/Hsevenicon.png";
import HsevenredArrow from "../../Assets/HsevenredArrow.png";
import HsixRectangle2 from "../../Assets/HsixRectangle2.png";
import HsixRectangle3 from "../../Assets/HsixRectangle3.png";
import HsixRectangle4 from "../../Assets/HsixRectangle4.png";
import HsixRectangle5 from "../../Assets/HsixRectangle5.png";
import HsixRectangle6 from "../../Assets/HsixRectangle6.png";
import HsevenFooter from "../../Assets/HsevenFooter.jpg";
import { Link } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
import AppLogo from "../../Components/app-logo";
import { socials } from "../../Components/Footer";

const HomeSeven = () => {
	const backgroundColors = [
		"#FFFBEF",
		"#FEEFEA",
		"#FFFBEF",
		"#FEEFEA",
		"#FFFBEF",
		"#FEEFEA",
	];

	const cardData = [
		{
			image: HsixRectangle1,
			imagee: Hsevenicon,
			title: "Data Service",
			text: "is a reliable and affordable platform for purchasing affordable data bundles and airtime top-ups for any Nigerian network. We offer competitive pricing for data plans from Airtel, MTN, 9mobile, and Glo.",
			buttonText: "LEARN MORE",
			arrow: HsevenredArrow,
		},
		{
			image: HsixRectangle2,
			imagee: Hsevenicon,
			title: "TV Subscription",
			text: " offers convenient and rapid airtime top-up services at competitive rates. Our low charges and quick recharge services make it easy for customers to top up their airtime.",
			buttonText: "LEARN MORE",
			arrow: HsevenredArrow,
		},
		{
			image: HsixRectangle3,
			imagee: Hsevenicon,
			title: "Cable Subscription",
			text: "we offer discounted rates for renewing your DSTV, GOTV, and Startimes subscriptions, allowing you to save money on your cable service. Our convenient access to subscription renewal saves you time and effort in obtaining your cable service.",
			buttonText: "LEARN MORE",
			arrow: HsevenredArrow,
		},
		{
			image: HsixRectangle4,
			imagee: Hsevenicon,
			title: "Electricity Payment",
			text: "is a reliable and affordable platform for purchasing affordable data bundles and airtime top-ups for any Nigerian network. We offer competitive pricing for data plans from Airtel, MTN, 9mobile, and Glo.",
			buttonText: "LEARN MORE",
			arrow: HsevenredArrow,
		},
		{
			image: HsixRectangle5,
			imagee: Hsevenicon,
			title: "Education E-Payment",
			text: "Do you want to stay on top of your finances, then make you can make use of  our pocket-friendly electricity payment feature. It saves more time and money with our streamlined payment tools.",
			buttonText: "LEARN MORE",
			arrow: HsevenredArrow,
		},
		{
			image: HsixRectangle6,
			imagee: Hsevenicon,
			title: "Data Service",
			text: "is your go-to source for various examination scratch cards, including those for Waec, Neco, and Nabteb. We take pride in providing top-quality service and aim to make our website your go-to destination after your first experience with us.",
			buttonText: "LEARN MORE",
			arrow: HsevenredArrow,
		},
	];

	const Hseventestyone = require("../../Assets/Hseventestyone.jpg");
	const Hseventestytwo = require("../../Assets/Hseventestytwo.jpg");
	const Hseventestythree = require("../../Assets/Hseventestythree.jpg");
	const Hseventestyfour = require("../../Assets/Hseventestyfour.jpg");

	const imageData = [
		{
			imageUrl: Hseventestyone,
			ceoName: "Mark Johnson (CEO)",
			customerName: "Eva Davis",
			text: "Lorem ipsum dolor sit amet consectetur. Amet vel blandit ut enim vel amet ullamcorper cras.",
		},
		{
			imageUrl: Hseventestytwo,
			ceoName: "Mark Johnson (CEO)",
			customerName: "Eva Davis",
			text: "Lorem ipsum dolor sit amet consectetur. Amet vel blandit ut enim vel amet ullamcorper cras.",
		},
		{
			imageUrl: Hseventestythree,
			ceoName: "Jane Smith (CEO)",
			customerName: "Bob Johnson",
			text: "Lorem ipsum dolor sit amet consectetur. Amet vel blandit ut enim vel amet ullamcorper cras.",
		},
		{
			imageUrl: Hseventestyfour,
			ceoName: "Anna Brown (CEO)",
			customerName: "David Wilson",
			text: "Lorem ipsum dolor sit amet consectetur. Amet vel blandit ut enim vel amet ullamcorper cras.",
		},
	];

	const ImageWithText = ({ imageUrl, ceoName, customerName, text }) => {
		return (
			<div className="relative rounded-lg w-[170px] h-[190px]">
				<div
					className="absolute rounded-lg inset-0 bg-cover bg-center bg-no-repeat"
					style={{ backgroundImage: `url(${imageUrl})` }}>
					<div className=" h-full rounded-lg p-3 grid justify-center bg-opacity-75 bg-black text-white">
						<p className=" font-bold text-homesevenbtn">{ceoName}</p>
						<p className=" font-bold">{customerName}</p>
						<p className="">{text}</p>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className="w-full overflow-hidden mx-auto">
			<div
				className=" flex bg-cover bg-center bg-no-repeat"
				style={{
					backgroundImage: `url(${HomeSevenHerroBg})`,
					backgroundSize: "150% 105%",
				}}>
				<HomeSevenNav />
				<div className=" lg:flex md:flex grid md:px-16 lg:px-28 px-8 pb-[24px] lg:mt-20 md:mt35 mt-30 justify-center mx-auto w-full h-full">
					<div className="lg:w-1/2 md:w-1/2 lg:h-[500px] w-full relative lg:bottom-[-33px] ">
						<img
							data-aos="fade-up"
							data-aos-duration="3000"
							className=" lg:w-3/4 lg:h-full"
							src={require("../../Assets/HsevenWoman.png")}
							alt=""
						/>
					</div>

					<div className=" relative lg:top-0 md:top-0 top-5 grid lg:w-1/2 md:w-1/2 w-full lg:mt-5">
						<p className=" relative lg:top-7 lg:bottom-0 md:bottom-[-20px] bottom-1 lg:text-[15px] md:text-[15px] text-[8px] font-bold text-white">
							WE ARE THE BEST SUBSCRIPTION PLATFORM
						</p>
						<div className="flex">
							<img
								className=" object-cover lg:h-96 md:h-96 lg:flex md:flex hidden relative lg:right-10 lg:top-7 md:right-10 md:bottom-[-38px]"
								src={require("../../Assets/HsevenLine.png")}
								alt=""
							/>
							<p
								data-aos="fade-left"
								data-aos-duration="3000"
								className=" relative font-KoHo font-bold lg:bottom-0 md:bottom-[-30px] bottom-3 text-white lg:text-[70px] md:text-[50px] text-[30px] ">
								Never run out of data. Stay Connected!
							</p>
						</div>
						<p className="text-white w-96 h-auto relative lg:bottom-8 md:bottom-8 bottom-5">
							In a few clicks, buy data to keep surfing the internet. You can
							buy whatever size of data plan for whichever network you desire.
							Get Started!
						</p>
						<div className="flex relative lg:top-0 md:top-0 top-[-10px] lg:justify-start md:justify-start justify-center items-center space-x-5">
							<RouterLink to="/login">
								<button
									to="/login"
									className=" transition-transform hover:scale-110 duration-300 ease-in text-white bg-transparent border-white text-center no-underline border-4 lg:w-[170px] lg:h-[42px] md:w-[130px] md:h-[38px] w-[120px] h-[30px] rounded-3xl">
									Get Started
								</button>
							</RouterLink>
							<div>
								<img
									className="lg:w-8 lg:h-8 md:w-6 md:h-6 sm:w-4 h-4"
									src={require("../../Assets/HsevenArr.png")}
									alt=""
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="md:px-16 lg:px-28 px-8 mt-28  justify-center w-full h-full mx-auto">
				<div className="lg:flex md:grid grid lg:space-y-0 md:space-y-10 space-y-10 lg:gap-10">
					<div
						data-aos="fade-up"
						data-aos-duration="3000"
						className="grid  lg:w-1/2 md:w-full w-full ">
						<p className=" text-homesevenbtn font-Inter lg:text-[13px] md:text-[10px] text-[10px] font-bold">
							WE ARE THE BEST SUBSCRIPTION PLATFORM
						</p>
						<p className=" lg:text-[24px] md:text-[18px] text-[15px] font-bold">
							We have the BEST Features For Your Subscriptions. You can trsut us
							with your subscriptions.
						</p>
						<p>
							{" "}
							Lorem ipsum dolor sit amet consectetur. Tellus tellus vitae
							venenatis turpis elementum iaculis nunc. Tincidunt lacinia Lorem
							ipsum dolor sit amet consectetur. Tellus tellus vitae venenatis
							turpis elementum iaculis nunc. Tincidunt lacinia Lorem ipsum dolor
							sit amet consectetur. Tellus tellus vitae venenatis turpis
							elementum iaculis nunc. Tincidunt lacinia
						</p>
						<div className=" object-cover">
							<img
								className=""
								src={require("../../Assets/HsixFrame.png")}
								alt=""
							/>
						</div>
					</div>

					<div
						data-aos="fade-left"
						data-aos-duration="3000"
						className="grid lg:w-1/2 md:w-full w-full space-y-7">
						<div className=" object-cover">
							<img src={require("../../Assets/HsixFrame2.png")} alt="" />
						</div>
						<div className="flex space-x-5">
							<div>
								<img
									className="w-10 h-10"
									src={require("../../Assets/HsixGroup1.png")}
									alt=""
								/>
								<div>
									<p className=" text-[20px]">Secure Transactions</p>
									<p>
										Lorem ipsum dolor sit amet consectetur. Tellus tellus vitae
										venenatis turpis elementum iaculis nunc. Tincidunt lacinia
									</p>
								</div>
							</div>
							<div>
								<img
									className="w-10 h-10"
									src={require("../../Assets/HsixGroup2.png")}
									alt=""
								/>
								<div>
									<p className=" text-[20px]">Secure Transactions</p>
									<p>
										Lorem ipsum dolor sit amet consectetur. Tellus tellus vitae
										venenatis turpis elementum iaculis nunc. Tincidunt lacinia
									</p>
								</div>
							</div>
						</div>

						<button className=" transition-transform hover:scale-110 duration-300 ease-in text-white bg-homesevenbtn lg:w-[170px] lg:h-[42px] md:w-[130px] md:h-[38px] w-[120px] h-[30px] rounded-3xl">
							Get Started
						</button>
					</div>
				</div>
			</div>

			<div name="product" className=" bg-homeSixBgCol mx-auto">
				<div className=" md:px-16 lg:px-28 px-8 py-5 lg:mt-16 md:mt35 mt-20  justify-center w-full h-full mx-auto">
					<div className=" grid justify-center">
						<div data-aos="fade-up" data-aos-duration="3000" className="py-20">
							<p className=" lg:text-[13px] md:text-[10px] text-[10px] text-homesevenbtn text-center font-bold ">
								WHAT WE DO
							</p>
							<p className=" lg:text-[24px] md:text-[18px] text-[12px] w-2/3 flex justify-center mx-auto text-center">
								We have the BEST Features For Your Subscriptions. You can trust
								us with your subscriptions.
							</p>
						</div>

						<div
							data-aos="fade-left"
							data-aos-duration="3000"
							className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 justify-center mx-auto">
							{cardData.map((card, index) => (
								<HomeSevenCard
									key={index}
									image={card.image}
									imagee={card.imagee}
									title={card.title}
									text={card.text}
									buttonText={card.buttonText}
									arrow={card.arrow}
									backgroundColor={
										backgroundColors[index % backgroundColors.length]
									}
								/>
							))}
						</div>
					</div>
				</div>
			</div>

			<div name="about" className=" bg-hseventestimonial mx-auto h-auto">
				<div className="lg:flex md:grid grid md:px-16 lg:px-52 px-8">
					<div className="lg:w-1/2 md:w-full w-full h-auto">
						<div className=" flex md:justify-center">
							<img
								data-aos="fade-up"
								data-aos-duration="3000"
								className=" object-cover w-auto lg:h-[400px] md:h-96 h-96"
								src={require("../../Assets/HsixSmiling.png")}
								alt=""
							/>
						</div>
					</div>
					<div className=" lg:w-1/2 md:w-full w-full grid justify-center items-center lg:mt-0 md:mt-6 mt-6 h-auto">
						<div
							data-aos="fade-left"
							data-aos-duration="3000"
							className="grid w-auto h-auto">
							<div className="flex justify-center space-x-10 items-center">
								<div>
									<img
										className=" w-auto lg:h-36  md:h-14 h-16 "
										src={require("../../Assets/HsevenTline.png")}
										alt=""
									/>
								</div>
								<div className=" lg:mt-0 md:mt-0 mt-3">
									<p className=" text-white lg:text-[20px] md:text-[14px] text-[12px]">
										I was hesitant to switch to an online platform for my
										subscriptions initially, but{" "}
										<span className=" text-homesevenbtn lg:text-[20px] md:text-[14px] text-[12px]">
											{process.env.REACT_APP_AGENT_NAME}
										</span>{" "}
										has exceeded my expectations.
									</p>
								</div>
							</div>

							<div className="grid">
								<div>
									<p className=" lg:text-[18px] md:text-[13px] text-[10px] text-white">
										Latest review
									</p>
								</div>
								<div className="flex items-center relative top-[-7px]">
									<div>
										<img
											className="h-[48px] w-[192px]"
											src={require("../../Assets/HsixAvatar.png")}
											alt=""
										/>
									</div>
									<div className="flex items-center pt-2">
										<p className=" text-white lg:text-[24px] md:text-[16px] text-[13px]">
											20k
										</p>
										<p className=" text-homesevenbtn">+</p>
									</div>
								</div>
							</div>

							<div className="grid">
								<div>
									<p className="text-white lg:text-[18px] md:text-[13px] text-[10px] ">
										Ratings
									</p>
								</div>
								<div className="flex items-center">
									<img
										className="w-[152px] h-[24px] relative top-[-20px]"
										src={require("../../Assets/HsevenRatting.png")}
										alt=""
									/>

									<p className="lg:text-[24px] md:text-[16px] text-[13px] relative top-[-10px] text-white">
										4.9
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="  bg-homeSixBgCol mx-auto">
				<div className="md:px-16 lg:px-28 px-8 justify-center w-full h-full mx-auto">
					<div className="grid py-20">
						<div className=" grid justify-center ">
							<p
								data-aos="fade-up"
								data-aos-duration="3000"
								className=" text-homesevenbtn text-[13px] font-bold">
								HEAR OUR CUSTOMERS SPEAKS
							</p>
						</div>
						<div
							data-aos="fade-up"
							data-aos-duration="3000"
							className=" grid justify-center lg:px-[260px] ">
							<p className=" text-black text-center lg:text-[24px] md:text-[16px] text-[12px] font-bold">
								We have the BEST Features For Your Subscriptions. You can trust
								us with your subscriptions.
							</p>
						</div>

						<div
							data-aos="fade-left"
							data-aos-duration="3000"
							className=" lg:flex md:grid grid lg:space-x-5 justify-center items-center">
							<div className=" flex justify-center">
								<img
									className=" w-5 h-5 cursor-pointer"
									src={require("../../Assets/HsevenLeftarrow.png")}
									alt=""
								/>
							</div>

							<div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-center items-center">
								{imageData.map((item, index) => (
									<ImageWithText
										key={index}
										imageUrl={item.imageUrl}
										ceoName={item.ceoName}
										customerName={item.customerName}
										text={item.text}
									/>
								))}
							</div>

							<div className=" flex justify-center">
								<img
									className=" w-5 h-5 cursor-pointer"
									src={require("../../Assets/HsevenRightarrow.png")}
									alt=""
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* footer */}
			<div name="contact" className="w-full overflow-hidden mx-auto">
				<div
					className=" bg-cover bg-center mx-auto bg-no-repeat"
					style={{
						backgroundImage: `url(${HsevenFooter})`,
					}}>
					<div className="h-full px-8 md:px-16 lg:px-28 grid space-y-5 items-center py-10 bg-opacity-95 bg-hsevenfooter text-white">
						<div
							data-aos="fade-up"
							data-aos-duration="3000"
							className=" lg:flex md:grid grid lg:space-y-0 md:space-y-0 space-y-5 justify-between">
							<div className="flex space-x-10">
								<img
									className=" w-auto lg:h-[90px] md:h-[50px] h-[50px] relative lg:bottom-[-16px]"
									src={require("../../Assets/HsevenFooterLine.png")}
									alt=""
								/>
								<div className="grid lg:space-y-5">
									<div className=" lg:text-[16px] md:text-[12px] text-[10px]">
										JOIN OUR COMMUNITY
									</div>
									<div className=" lg:text-[24px] w-[280px] h-auto md:text-[16px] text-[12px]">
										Subscribe to Get Our Latest Updates
									</div>
								</div>
							</div>

							<div className=" flex justify-center space-x-3 items-center">
								<div>
									<input
										className=" lg:w-[500px] text-black px-2 md:w-[200px] w-[200px] lg:h-[57px] md:h-[30px] h-[30px] rounded-lg"
										placeholder="Enter Your Email"
										type="text"
									/>
								</div>
								<div>
									<button className=" lg:text-[16px] lg:h-[57px] md:h-[30px] h-[30px] lg:w-[174px] md:w-[100px] w-[100px] bg-homesevenbtn rounded-lg transition-transform hover:scale-110 duration-300 ease-in">
										Subscribe Now
									</button>
								</div>
							</div>
						</div>

						<div
							data-aos="fade-up"
							data-aos-duration="3000"
							className=" lg:flex md:grid grid lg:space-y-0 md:space-y-5 space-y-5 justify-between">
							<div className="grid">
								<AppLogo type="dark" height="50px" />
								<div>
									<p>{process.env.REACT_APP_AGENT_ADDRESS}</p>
									<div className=" w-56">
										{/* <p>
											Lorem ipsum dolor sit amet consectetur. Eu ut egestas elit
											ut orci. Bibendum lobortis amet.
										</p> */}
									</div>
								</div>
							</div>
							<div className="grid">
								<div className="flex items-center space-x-3">
									<img
										className=" w-auto h-4 mb-3"
										src={require("../../Assets/HsevenTline.png")}
										alt=""
									/>
									<p className=" font-bold">Explore</p>
								</div>
								<div className=" space-y-4">
									<Link
										to="about"
										className="text-white block cursor-pointer no-underline">
										About
									</Link>
									<Link
										to="contact"
										className="text-white block cursor-pointer no-underline">
										Contact
									</Link>
								</div>
							</div>
							<div className="grid">
								<div className="flex items-center space-x-3">
									<img
										className=" w-auto h-4 mb-3"
										src={require("../../Assets/HsevenTline.png")}
										alt=""
									/>
									<p className=" font-bold">Our Services</p>
								</div>
								<div>
									<p>Airtime Services</p>
									<p>Data services</p>
									<p>Cable Subscription</p>
									<p>TV Subscription</p>
								</div>
							</div>
							<div className="grid">
								<div className="flex items-center space-x-3">
									<img
										className=" w-auto h-4 mb-3"
										src={require("../../Assets/HsevenTline.png")}
										alt=""
									/>
									<p className="font-bold">Contact Us</p>
								</div>
								<div>
									{/* <p>+234 800 000 0000</p> */}
									<p>{process.env.REACT_APP_AGENT_TELEPHONE}</p>
									<p>{process.env.REACT_APP_AGENT_EMAIL}</p>
								</div>
							</div>
						</div>

						<div>
							<hr className=" text-white" />
						</div>

						<div className="lg:flex md:grid grid items-center justify-between">
							{/* <div className="flex items-center space-x-3">
								<img
									className=" w-5 h-5"
									src={require("../../Assets/HsevenInstagram.png")}
									alt=""
								/>
								<img
									className=" w-5 h-5"
									src={require("../../Assets/HsevenTwiter.png")}
									alt=""
								/>
								<img
									className=" w-5 h-5"
									src={require("../../Assets/HsevenFacebook.png")}
									alt=""
								/>
							</div> */}
							<ul className="list-group border-0 list-group-horizontal">
								{socials.map((item, index) => (
									<li
										key={index}
										className="list-group-item border-0 bg-transparent text-homesevenbtn d-flex align-items-center">
										<a
											className="text-homesevenbtn text-decoration-none fontReduce"
											target={"_blank"}
											rel="noreferrer"
											href={item?.url || "#"}>
											{item?.icon}
										</a>
									</li>
								))}
							</ul>
							<div>
								<p>Copyright © 2023. All rights reserved</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomeSeven;
