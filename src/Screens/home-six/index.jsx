import React from "react";
import HsixRectangle from "../../Assets/HsixRectangle.png";
import HomeSixNav from "../../Components/home-six/HomeSixNav";
import HomeSixCard from "../../Components/home-six/HomeSixCard";
import HsixRectangle1 from "../../Assets/HsixRectangle1.png";
import HsixIcon1 from "../../Assets/HsixIcon1.png";
import HsixArrow1 from "../../Assets/HsixArrow1.png";
import HsixRectangle2 from "../../Assets/HsixRectangle2.png";
import HsixRectangle3 from "../../Assets/HsixRectangle3.png";
import HsixRectangle4 from "../../Assets/HsixRectangle4.png";
import HsixRectangle5 from "../../Assets/HsixRectangle5.png";
import HsixRectangle6 from "../../Assets/HsixRectangle6.png";

const HomeSix = () => {
  const backgroundColors = [
    "#FEEFEA",
    "#FFFBEF",
    "#EFF6FE",
    "#FEEFEA",
    "#FAEFFE",
    "#EFFEF0",
  ];

  const cardData = [
    {
      image: HsixRectangle1,
      imagee: HsixIcon1,
      title: "Data Service",
      text: "is a reliable and affordable platform for purchasing affordable data bundles and airtime top-ups for any Nigerian network. We offer competitive pricing for data plans from Airtel, MTN, 9mobile, and Glo.",
      buttonText: "LEARN MORE",
      arrow: HsixArrow1,
    },
    {
      image: HsixRectangle2,
      imagee: HsixIcon1,
      title: "TV Subscription",
      text: " offers convenient and rapid airtime top-up services at competitive rates. Our low charges and quick recharge services make it easy for customers to top up their airtime.",
      buttonText: "LEARN MORE",
      arrow: HsixArrow1,
    },
    {
      image: HsixRectangle3,
      imagee: HsixIcon1,
      title: "Cable Subscription",
      text: "we offer discounted rates for renewing your DSTV, GOTV, and Startimes subscriptions, allowing you to save money on your cable service. Our convenient access to subscription renewal saves you time and effort in obtaining your cable service.",
      buttonText: "LEARN MORE",
      arrow: HsixArrow1,
    },
    {
      image: HsixRectangle4,
      imagee: HsixIcon1,
      title: "Electricity Payment",
      text: "is a reliable and affordable platform for purchasing affordable data bundles and airtime top-ups for any Nigerian network. We offer competitive pricing for data plans from Airtel, MTN, 9mobile, and Glo.",
      buttonText: "LEARN MORE",
      arrow: HsixArrow1,
    },
    {
      image: HsixRectangle5,
      imagee: HsixIcon1,
      title: "Education E-Payment",
      text: "Do you want to stay on top of your finances, then make you can make use of  our pocket-friendly electricity payment feature. It saves more time and money with our streamlined payment tools.",
      buttonText: "LEARN MORE",
      arrow: HsixArrow1,
    },
    {
      image: HsixRectangle6,
      imagee: HsixIcon1,
      title: "Data Service",
      text: "is your go-to source for various examination scratch cards, including those for Waec, Neco, and Nabteb. We take pride in providing top-quality service and aim to make our website your go-to destination after your first experience with us.",
      buttonText: "LEARN MORE",
      arrow: HsixArrow1,
    },
  ];

  return (
		<div className="w-full overflow-hidden mx-auto">
			<div
				className=" flex bg-cover bg-center bg-no-repeat"
				style={{
					backgroundImage: `url(${HsixRectangle})`,
					backgroundSize: "150% 105%",
				}}>
				<HomeSixNav />
				<div className=" lg:flex md:flex grid md:px-16 lg:px-28 px-8 lg:mt-16 md:mt35 mt-20  justify-center w-full h-full">
					<div className="lg:w-1/2 md:w-1/2 w-full">
						<img
							className=" w-3/4 h-full"
							src={require("../../Assets/HsixHero.png")}
							alt=""
						/>
					</div>

					<div className=" grid lg:w-1/2 md:w-1/2 w-full lg:mt-5">
						<p className=" relative lg:top-5 lg:bottom-0 md:bottom-[-20px] bottom-1 lg:text-[15px] md:text-[15px] text-[8px] font-bold text-homeSixCol">
							WE ARE THE BEST SUBSCRIPTION PLATFORM
						</p>
						<div className="flex">
							<img
								className=" object-cover lg:h-96 md:h-96 lg:flex md:flex hidden relative lg:right-10 lg:top-7 md:right-10 md:bottom-[-38px]"
								src={require("../../Assets/HsixLine.png")}
								alt=""
							/>
							<p className=" relative lg:bottom-0 md:bottom-[-30px] bottom-3 text-white lg:text-[70px] md:text-[50px] text-[30px] ">
								Never run out of data. Stay Connected!
							</p>
						</div>
						<p className="text-white w-96 h-auto relative lg:bottom-8 md:bottom-8 bottom-5">
							In a few clicks, buy data to keep surfing the internet. You can
							buy whatever size of data plan for whichever network you desire.
							Get Started!
						</p>
						<div className="flex lg:justify-start md:justify-start justify-center items-center space-x-5">
							<button className=" mb-5 transition-transform hover:scale-110 duration-300 ease-in text-white bg-transparent border-gray-400 border-4 lg:w-[170px] lg:h-[42px] md:w-[130px] md:h-[38px] w-[120px] h-[30px] rounded-3xl">
								Get Started
							</button>
							<img
								className="lg:w-8 lg:h-8 md:w-6 md:h-6 sm:w-4 h-4"
								src={require("../../Assets/HsixArrow.png")}
								alt=""
							/>
						</div>
					</div>
				</div>
			</div>

			<div className="md:px-16 lg:px-28 px-8 mt-28  justify-center w-full h-full mx-auto">
				<div className="lg:flex md:grid grid lg:space-y-0 md:space-y-10 space-y-10 lg:gap-10">
					<div className="grid  lg:w-1/2 md:w-full w-full ">
						<p className=" text-homeSixCol lg:text-[13px] md:text-[10px] text-[10px] font-bold">
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

					<div className="grid lg:w-1/2 md:w-full w-full space-y-7">
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

						<button className=" transition-transform hover:scale-110 duration-300 ease-in text-white bg-homeSixCol lg:w-[170px] lg:h-[42px] md:w-[130px] md:h-[38px] w-[120px] h-[30px] rounded-3xl">
							Get Started
						</button>
					</div>
				</div>
			</div>

			<div className=" bg-homeSixBgCol">
				<div className=" md:px-16 lg:px-28 px-8 lg:mt-16 md:mt35 mt-20  justify-center w-full h-full mx-auto">
					<div className=" grid justify-center">
						<div className="py-20">
							<p className=" lg:text-[13px] md:text-[10px] text-[10px] text-homeSixCol text-center font-bold ">
								WHAT WE DO
							</p>
							<p className=" lg:text-[24px] md:text-[18px] text-[12px] w-2/3 flex justify-center mx-auto text-center">
								We have the BEST Features For Your Subscriptions. You can trust
								us with your subscriptions.
							</p>
						</div>

						<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 justify-center mx-auto">
							{cardData.map((card, index) => (
								<HomeSixCard
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

			<div className=" bg-homeSixTestiCol mx-auto">
				<div className="md:px-16 lg:px-28 px-8  justify-center w-full h-full mx-auto">
					<div className="lg:flex md:flex grid">
						<div className=" lg:w-1/2 md:w-full w-full">
							<img
								className=" object-cover w-auto h-96 relative lg:right-[-60px] md:right-[-90px] right-[-90px]"
								src={require("../../Assets/HsixSmiling.png")}
								alt=""
							/>
						</div>
						<div className=" lg:w-1/2">
							<div className="grid lg:space-y-5 ml-10 md:space-y-5 relative lg:bottom-[-30px] md:bottom-[-30px] ">
								<div className="flex lg:space-x-10 md:space-x-6 space-x-4  relative lg:left-[-50px] ">
									<img
										className=" w-auto lg:h-28  md:h-14 h-16 "
										src={require("../../Assets/HsixLine7.png")}
										alt=""
									/>
									<p className=" lg:text-[20px] text-white">
										I was hesitant to switch to an online platform for my
										subscriptions initially, but{" "}
										<span className=" text-homeSixCol lg:text-[20px]">
											{process.env.REACT_APP_AGENT_NAME}
										</span>{" "}
										has exceeded my expectations.
									</p>
								</div>

								<div className="grid relative lg:left-[-50px]">
									<p className=" text-[18px] text-white">Latest review</p>
									<div className="flex items-center">
										<img
											className="h-[48px] w-[192px]"
											src={require("../../Assets/HsixAvatar.png")}
											alt=""
										/>
										<span className=" text-[24px] text-white">20K</span>{" "}
										<span className=" text-homeSixCol text-[24px]">+</span>
									</div>
								</div>

								<div className="grid relative lg:left-[-50px]">
									<p className="text-[18px] text-white">Ratings</p>
									<div className=" flex items-center relative lg:top-[-25px] md:top-[-15px] top-[-25px]">
										<img
											className=" w-[152px] h-[24px]"
											src={require("../../Assets/HsixRating.png")}
											alt=""
										/>

										<p className=" text-[24px] text-white mt-[13px]">4.9</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="md:px-16 lg:px-28 px-8 mt-28  justify-center w-full h-full mx-auto">
				<div className=" grid justify-center items-center">
					<p className=" text-homeSixCol text-[13px] text-center">
						HEAR OUR CUSTOMERS SPEAKS
					</p>
					<p className="text-[24px] text-center w-[580px] font-bold">
						We have the BEST Features For Your Subscriptions. You can trust us
						with your subscriptions.
					</p>
				</div>
				{/* rectangles */}
			</div>

			{/* footer */}

			<div className="bg-homeSixTestiCol mx-auto py-10">
				<div className="md:px-16 lg:px-28 px-8  justify-center w-full h-full mx-auto">
					<div className=" flex space-x-10">
						<img
							className="w-auto h-20 relative bottom-[-20px]"
							src={require("../../Assets/HsixLine7.png")}
							alt=""
						/>
						<div className="grid">
							<p className=" text-[16px] text-homeSixCol">JOIN OUR COMMUNITY</p>
							<p className="text-[24px] text-white w-80">
								{" "}
								Subscribe to Get Our Latest Updates
							</p>
						</div>

						{/* input and button */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomeSix;
