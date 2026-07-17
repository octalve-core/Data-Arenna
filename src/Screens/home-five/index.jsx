import React from "react";
import HomeFiveNav from "../../Components/home-five/HomeFiveNav";
import HomefiveArrow from "../../Assets/HomefiveArrow.png";
import HomefiveHerroImg from "../../Assets/HomefiveHerroImg.png";
// import Aos from "aos";
import "aos/dist/aos.css";
import "./Homefive.css";
import { Link } from "react-scroll";

import Icon1 from "../../Assets/Icon1.png";
import HomefiveLine from "../../Assets/HomefiveLine.png";

const HomeFive = () => {
  return (
		<div name="product" className=" w-full overflow-hidden">
			<HomeFiveNav />
			<div className=" md:px-16 lg:px-28 p-8 lg:mt-40 md:mt35 mt-20  justify-center w-full h-full">
				<div className=" lg:flex md:flex grid lg:space-y-0 md:space-y-0 space-y-20">
					<div className="lg:w-1/2 md:w-1/2 sm:w-full ">
						<p className=" text-btncol lg:text-[64px] md:text-[50px] text-[40px]">
							Never run out of data. Stay Connected!
						</p>
						<p
							data-Aos="fade-up"
							data-aos-duration="3000"
							className="lg:text-[24px] md:text-[20px] text-[15px] text-textcol">
							Lorem ipsum dolor sit amet consectetur. Diam pulvinar morbi eget
							malesuada et a amet nunc.
						</p>
						<div className="flex items-center space-x-5">
							<button className=" transition-transform hover:scale-110 duration-300 ease-in text-white bg-btncol lg:w-[170px] lg:h-[42px] md:w-[130px] md:h-[38px] w-[120px] h-[30px] rounded-3xl">
								Get Started
							</button>
							<img
								className="lg:w-8 lg:h-8 md:w-6 md:h-6 sm:w-4 h-4"
								src={HomefiveArrow}
								alt=""
							/>
						</div>
					</div>

					<div className="lg:w-1/2 md:w-1/2 sm:w-full">
						<img
							data-Aos="fade-right"
							data-Aos-duration="3000"
							src={HomefiveHerroImg}
							className="h-full w-full object-cover"
							alt=""
						/>
					</div>
				</div>
			</div>

			<div className=" md:px-16 lg:px-28 p-8 mt-10 justify-center w-full h-full mx-auto">
				<div className="lg:flex md:grid grid">
					<div className=" grid space-y-5 lg:w md:w-full w-full">
						<div
							data-Aos="fade-right"
							data-Aos-duration="3000"
							className="lg:flex md:grid grid lg:space-x-5 lg:space-y-0 md:space-y-8 space-y-8">
							<div className="card grid items-center w-full h-full space-y-3 p-4 bg-white shadow-md ring-offset-4 cursor-pointer ring-offset-white rounded-2xl transition-transform hover:scale-105 duration-300 ease-in ">
								<img className="w-10 h-auto" src={Icon1} alt="" />
								<h4 className=" font-bold">Data Service</h4>
								<p className="text-justify">
									is a reliable and affordable platform for purchasing
									affordable data bundles and airtime top-ups for any Nigerian
									network. We offer competitive pricing for data plans from
									Airtel, MTN, 9mobile, and Glo
								</p>
							</div>
							<div className="card grid items-center w-full h-full space-y-3 p-4 bg-white shadow-md ring-offset-4 cursor-pointer ring-offset-white rounded-2xl transition-transform hover:scale-105 duration-300 ease-in ">
								<img className="w-10 h-auto" src={Icon1} alt="" />
								<h4 className=" font-bold">Airtime Service</h4>
								<p className=" text-justify">
									offers convenient and rapid airtime top-up services at
									competitive rates. Our low charges and quick recharge services
									make it easy for customers to top up their airtime.
								</p>
							</div>
							<div className="card grid items-center w-full h-full space-y-3 p-4 bg-white shadow-md ring-offset-4 cursor-pointer ring-offset-white rounded-2xl transition-transform hover:scale-105 duration-300 ease-in ">
								<img className="w-10 h-auto" src={Icon1} alt="" />
								<h4 className=" font-bold">Cable Subscription</h4>
								<p className=" text-justify">
									we offer discounted rates for renewing your DSTV, GOTV, and
									Startimes subscriptions, allowing you to save money on your
									cable service. Our convenient access to subscription renewal
									saves you time and effort in obtaining your cable service.
								</p>
							</div>
						</div>

						<div
							data-Aos="fade-left"
							data-Aos-duration="3000"
							className="lg:flex md:grid grid  lg:space-x-5 lg:space-y-0 md:space-y-8 space-y-8">
							<div className="card grid items-center w-full h-full space-y-3 p-4 bg-white shadow-md ring-offset-4 cursor-pointer ring-offset-white rounded-2xl transition-transform hover:scale-105 duration-300 ease-in ">
								<img className="w-10 h-auto" src={Icon1} alt="" />
								<h4 className=" font-bold">Electricity</h4>
								<p className=" text-justify">
									Do you want to stay on top of your finances, then make you can
									make use of our pocket-friendly electricity payment feature.
									It saves more time and money with our streamlined payment
									tools.
								</p>
							</div>
							<div className="card grid items-center w-full h-full space-y-3 p-4 bg-white shadow-md ring-offset-4 cursor-pointer ring-offset-white rounded-2xl transition-transform hover:scale-105 duration-300 ease-in ">
								<img className="w-10 h-auto" src={Icon1} alt="" />
								<h4 className=" font-bold">Education</h4>
								<p className=" text-justify">
									is your go-to source for various examination scratch cards,
									including those for Waec, Neco, and Nabteb. We take pride in
									providing top-quality service and aim to make our website your
									go-to destination after your first experience with us.
								</p>
							</div>
							<div className="card grid items-center w-full h-full space-y-3 p-4 bg-white shadow-md ring-offset-4 cursor-pointer ring-offset-white rounded-2xl transition-transform hover:scale-105 duration-300 ease-in ">
								<img className="w-10 h-auto" src={Icon1} alt="" />
								<h4 className=" font-bold">Tv Subscription</h4>
								<p className=" text-justify">
									is a reliable and affordable platform for purchasing
									affordable data bundles and airtime top-ups for any Nigerian
									network. We offer competitive pricing for data plans from
									Airtel, MTN, 9mobile, and Glo
								</p>
							</div>
						</div>
					</div>

					<div
						name="about"
						className=" lg:mt-0 grid md:mt-10 mt-10 lg:pl-8 lg:w-2/4 md:w-full w-full">
						<div data-Aos="fade-up" data-Aos-duration="3000">
							<p className=" text-btncol">OUR SERVICES</p>
							<div>
								<p className="lg:text-[48px] md:text-[25px] text-[22px]">
									What We Do
								</p>
								<img
									className=" lg:w-[170.11px] md:w-[100px] w-[75px]"
									src={HomefiveLine}
									alt=""
								/>
							</div>
						</div>

						<p data-Aos="fade-down" data-Aos-duration="3000" className="">
							Lorem ipsum dolor sit amet consectetur. Mauris erat tortor dolor
							nunc interdum. Lacinia nunc.
						</p>
						<button
							data-Aos="fade-up"
							data-Aos-duration="3000"
							className=" transition-transform hover:scale-110 duration-300 ease-in text-white bg-btncol lg:w-[170px] lg:h-[42px] md:w-[130px] md:h-[38px] w-[120px] h-[30px] rounded-3xl">
							Get Started
						</button>
					</div>
				</div>
			</div>

			<div className="md:px-16 lg:px-28 p-8  justify-center w-full h-full">
				<div className="grid mt-10">
					<p
						data-Aos="fade-up"
						data-Aos-duration="3000"
						className="text-center font-bold lg:text-[45px] md:text-[30px] text-[15px] ">
						Optimize Your Business Fast And Secured!
					</p>
					<p
						data-Aos="fade-left"
						data-Aos-duration="3000"
						className=" text-center">
						Lorem ipsum dolor sit amet consectetur. Mauris erat tortor dolor
						nunc interdum. Lacinia nunc.
					</p>

					<div className="flex items-center justify-center">
						<button className=" transition-transform hover:scale-110 duration-300 ease-in text-white bg-btncol lg:w-[170px] lg:h-[42px] md:w-[130px] md:h-[38px] w-[120px] h-[30px] rounded-3xl">
							Get Started
						</button>
					</div>
				</div>
			</div>

			<div
				name="contact"
				className=" md:px-16 lg:px-28 p-8 justify-center w-full h-full">
				<div className="lg:flex md:grid grid lg:space-x-8 md:space-y-8 space-y-8">
					<div className=" grid lg:w-1/2 md:w-full w-full">
						<p
							data-Aos="fade-down"
							data-Aos-duration="2000"
							className=" text-btncol text-[13px] font-bold">
							WE ARE THE BEST SUBSCRIPTION PLATFORM
						</p>
						<p
							data-Aos="fade-right"
							data-Aos-duration="3000"
							className="font-bold lg:text-[20px] md:text-[15px] text-[12px]">
							We have the BEST Features For Your Subscriptions. You can trust us
							with your subscriptions.
						</p>
						<p data-Aos="fade-right" data-Aos-duration="3000">
							Lorem ipsum dolor sit amet consectetur. Tellus tellus vitae
							venenatis turpis elementum iaculis nunc. Tincidunt lacinia Lorem
							ipsum dolor sit amet consectetur. Tellus tellus vitae venenatis
							turpis elementum iaculis nunc. Tincidunt lacinia Lorem ipsum dolor
							sit amet consectetur. Tellus tellus vitae venenatis turpis
							elementum iaculis nunc. Tincidunt lacinia
						</p>
						<img
							className="mx-auto"
							src={require("../../Assets/HomefiveFrame.png")}
							alt=""
						/>
					</div>

					<div className=" lg:w-1/2 md:w-full w-full">
						<div className="grid space-y-5">
							<div
								data-Aos="fade-up"
								data-Aos-duration="3000"
								className="flex space-x-5">
								<div className="shadow-md p-3">
									<img
										className=" h-auto w-10"
										src={require("../../Assets/Tranc1.png")}
										alt=""
									/>
									<p className=" lg:text-[20px] md:text-[15px] text-[12px] font-bold">
										Secure Transactions
									</p>
									<p>
										Lorem ipsum dolor sit amet consectetur. Tellus tellus vitae
										venenatis turpis elementum iaculis nunc. Tincidunt lacinia
									</p>
								</div>
								<div className="shadow-md p-3">
									<img
										className=" h-auto w-10"
										src={require("../../Assets/Tranc2.png")}
										alt=""
									/>
									<p className=" lg:text-[20px] md:text-[15px] text-[12px] font-bold">
										Secure Transactions
									</p>
									<p>
										Lorem ipsum dolor sit amet consectetur. Tellus tellus vitae
										venenatis turpis elementum iaculis nunc. Tincidunt lacinia
									</p>
								</div>
							</div>

							<div
								data-Aos="fade-left"
								data-Aos-duration="3000"
								className="flex space-x-5 ">
								<div className=" shadow-md p-3">
									<img
										className=" h-auto w-10"
										src={require("../../Assets/Tranc1.png")}
										alt=""
									/>
									<p className=" lg:text-[20px] md:text-[15px] text-[12px] font-bold">
										Secure Transactions
									</p>
									<p>
										Lorem ipsum dolor sit amet consectetur. Tellus tellus vitae
										venenatis turpis elementum iaculis nunc. Tincidunt lacinia
									</p>
								</div>
								<div className=" shadow-md p-3">
									<img
										className=" h-auto w-10"
										src={require("../../Assets/Tranc2.png")}
										alt=""
									/>
									<p className=" lg:text-[20px] md:text-[15px] text-[12px]font-bold">
										Secure Transactions
									</p>
									<p>
										Lorem ipsum dolor sit amet consectetur. Tellus tellus vitae
										venenatis turpis elementum iaculis nunc. Tincidunt lacinia
									</p>
								</div>
							</div>
							<button
								data-Aos="fade-left"
								data-Aos-duration="3000"
								className=" transition-transform hover:scale-110 duration-300 ease-in text-white bg-btncol lg:w-[170px] lg:h-[42px] md:w-[130px] md:h-[38px] w-[120px] h-[30px] rounded-3xl">
								Get Started
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className=" bg-black bg-opacity-80 mx-auto justify-center w-full">
				<div className="lg:px-28 py-16 md:px-16 px-8 flex ">
					<div
						data-Aos="fade-right"
						data-Aos-duration="3000"
						className="w-2/5 lg:grid md:hidden hidden relative lg:left-20 md:left-0 left-0">
						<img
							className=" object-cover h-auto lg:w-72 md:w-40 w-32"
							src={require("../../Assets/HomefiveTimg.png")}
							alt=""
						/>
					</div>
					<div className=" lg:w-3/5">
						<div
							data-Aos="fade-left"
							data-Aos-duration="3000"
							className="flex items-center justify-between">
							<div className=" lg:text-[40px] md:text-[30px] text-[20px] text-white">
								Testimonials
							</div>
							<div className="flex relative lg:right-28">
								<img
									className=" lg:w-10 lg:h-10 md:w-8 w-6"
									src={require("../../Assets/ArrowLeft.png")}
									alt=""
								/>
								<img
									className=" lg:w-10 lg:h-10 md:w-8 w-6"
									src={require("../../Assets/ArrowRight.png")}
									alt=""
								/>
							</div>
						</div>

						<div data-Aos="fade-left" data-Aos-duration="3000" className="flex">
							<div>
								<img
									className=" w-6 h-80"
									src={require("../../Assets/LeftBorder.png")}
									alt=""
								/>
							</div>

							<div className=" relative lg:z-10 bg-white w-full p-10 rounded-2xl space-y-8">
								<div className=" flex justify-between">
									<div className="grid">
										<p className=" lg:text-[24px] md:text-[20px] text-[12px] font-bold">
											Testifier Name
										</p>
										<p className=" font-bold">FinTech</p>
									</div>

									<div>
										<img
											className=" w-20 h-20 object-cover"
											src={require("../../Assets/HomefiveTestimg.png")}
											alt=""
										/>
									</div>
								</div>

								<p>
									Lorem ipsum dolor sit amet consectetur. Porttitor ipsum augue
									lorem orci adipiscing. Volutpat purus dolor sem aliquet ut.
									Nunc arcu risus justo lacus dignissim porttitor proin sagittis
									condimentum. Praesent eu egestas at arcu.
								</p>
							</div>
							<div className="relative top-48 lg:right-20">
								<img
									className=" object-cover lg:w-32 lg:h-32 md:w-10 md:h-32 w-10 h-32"
									src={require("../../Assets/RectangleT.png")}
									alt=""
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="md:px-16 lg:px-28 p-8 py-20  justify-center w-full h-full">
				<div className="space-y-5 grid justify-center items-center">
					<p
						data-Aos="fade-right"
						data-Aos-duration="3000"
						className=" lg:text-[28px] md:text-[20] text-[12px] text-center">
						Trusted by 4,000+ companies
					</p>
					<div className="overflow-hidden">
						<div className="flex animate-marquee items-center">
							<img
								className=" lg:h-[48px] lg:w-[110px] md:h-[30px] md:w-[70px] h-[20px] w-[60px]"
								src={require("../../Assets/Netflix.png")}
								alt=""
							/>
							<img
								className=" lg:h-[48px] lg:w-[110px] md:h-[38px] md:w-[100px] h-[28px] w-[80px]"
								src={require("../../Assets/Canva.png")}
								alt=""
							/>
							<img
								className=" lg:h-[48px] lg:w-[110px] md:h-[38px] md:w-[100px] h-[28px] w-[80px]"
								src={require("../../Assets/Adobe.png")}
								alt=""
							/>
							<img
								className=" lg:h-[48px] lg:w-[110px] md:h-[38px] md:w-[100px] h-[28px] w-[80px]"
								src={require("../../Assets/Grammaly.png")}
								alt=""
							/>
							<img
								className=" lg:h-[48px] lg:w-[110px] md:h-[38px] md:w-[100px] h-[28px] w-[80px]"
								src={require("../../Assets/Airbnb.png")}
								alt=""
							/>
							<img
								className=" lg:h-[48px] lg:w-[110px] md:h-[38px] md:w-[100px] h-[28px] w-[80px]"
								src={require("../../Assets/Amazon.png")}
								alt=""
							/>
						</div>
					</div>
				</div>
			</div>

			<div className="md:px-24 lg:px-48 p-8 justify-center w-full h-full">
				<div className=" text-white bg-btncol p-16 rounded-2xl ">
					<div>
						<p className=" lg:text-[45px] md:text-[30px] text-[15px] text-center">
							Subscribe to Our Newsletter to stay updated!
						</p>
					</div>

					<div className="flex items-center justify-center">
						<button className=" transition-transform hover:scale-110 duration-300 ease-in text-btncol bg-white lg:w-[170px] lg:h-[42px] md:w-[130px] md:h-[38px] w-[120px] h-[30px] rounded-3xl">
							Get Started
						</button>
					</div>
				</div>
			</div>

			<div className="md:px-16 lg:px-28 p-8 py-20  justify-center w-full h-full">
				<div className=" lg:flex md:grid grid lg:space-y-0 md:space-y-0 space-y-10">
					<div className=" lg:w-1/3 grid">
						<p className=" lg:text-[22px] md:text-[20px] text-[20px] font-bold text-btncol">
							DataBusiness
						</p>
						<p>Lorem ipsum dolor sit amet, consectetur </p>
						<div className="flex items-center space-x-5">
							<img
								className=" object-cover w-6 h-6"
								src={require("../../Assets/HFlinkedin.png")}
								alt=""
							/>
							<img
								className=" object-cover w-6 h-6"
								src={require("../../Assets/HFmessenger.png")}
								alt=""
							/>
							<img
								className=" object-cover w-6 h-6"
								src={require("../../Assets/HFtwitter.png")}
								alt=""
							/>
							<img
								className=" object-cover w-6 h-6"
								src={require("../../Assets/HFfacebook.png")}
								alt=""
							/>
						</div>
					</div>

					<div className=" lg:w-1/5 grid lg:space-y-0 md:space-y-0 space-y-5">
						<p className="lg:text-[22px] md:text-[20px] text-[20px] font-bold">
							Company
						</p>
						<Link
							to="about"
							duration={500}
							className=" cursor-pointer no-underline text-black">
							About us
						</Link>
						<Link
							to="Product"
							duration={500}
							className=" cursor-pointer no-underline text-black">
							Product
						</Link>

						<Link
							to="contact"
							duration={500}
							className=" cursor-pointer no-underline text-black">
							Contact Us
						</Link>
						<Link
							to=""
							duration={500}
							className=" cursor-pointer no-underline text-black">
							Pricing
						</Link>
					</div>

					<div className=" lg:w-1/5 grid">
						<p className="lg:text-[22px] md:text-[20px] text-[20px] font-bold">
							Terms of Service
						</p>
						<p>Policy</p>
						<p>Terms and Conditions</p>
						<p>Terms of Agreement</p>
						<p>Privacy Policy</p>
					</div>

					<div className=" lg:w-1/3 grid">
						<p className="lg:text-[22px] md:text-[20px] text-[20px] font-bold">
							Join Our Newsletter
						</p>
						<div className="flex">
							<div className="">
								<input
									className="h-[52px] bg-slate-900 text-white px-2"
									placeholder="Your email address"
									type="text"
								/>
							</div>
							<div className="">
								<button className="bg-btncol w-[100px] h-[52px] font-bold">
									Subscribe
								</button>
							</div>
						</div>
						<p className=" text-slate-900">
							* Will send you weekly updates for your better finance management.
						</p>
					</div>
				</div>

				<hr className="text-3xl" />
				<div className="text-center lg:text-[18px] md:text-[15px] text-[10px]">
					Copyright @ {process.env.REACT_APP_AGENT_NAME} 2023. All Rights
					Reserved.
				</div>
			</div>
		</div>
	);
};

export default HomeFive;
