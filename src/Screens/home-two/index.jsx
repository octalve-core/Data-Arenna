import HomeOneNav from "../../Components/home-one/home-one-nav.component";

import {
	FaArrowUp,
	//  FaQuoteLeft,
	FaQuoteRight,
} from "react-icons/fa";

import "./home-two.style.css";
import HomeFooter from "../../Components/home-footer/home-footer";
// import HomeSubscription from "../../Components/home-subscription/home-subscription.style";
import { useNavigate } from "react-router-dom";

export const features = [
	{
		title: "Secure Transactions",
		text: "We take the security of your account seriously, we are committed to preventing data loss or leak.",
		icon: "vic1.png",
	},
	{
		title: "Fast Delivery/Response",
		text: "Our data delivery is super-fast. We understand that you need data and you need it NOW!",
		icon: "vic2.png",
	},
	{
		title: "Optimum Satisfaction",
		text: `Periodically, ${process.env.REACT_APP_AGENT_NAME} offers the best discounts and special deals on all of our services, including data, airtime, and cable subscriptions. Stay tuned for updates on our special offers and take advantage of the opportunity to save on these services.`,
		icon: "vic3.png",
	},
	{
		title: "24/7 Customer Support",
		text: `${process.env.REACT_APP_AGENT_NAME} has a team of well-trained customer support agents available 24/7 to assist you with any issues you may have. We offer multiple channels of communication to ensure that you can easily reach us and receive prompt assistance.`,
		icon: "vic4.png",
	},
];

const HomeTwo = () => {
	let navigate = useNavigate();
	return (
		<div className="home-two">
			<header>
				<div className="hero-section">
					<div className="bg-rectangle"></div>
					<HomeOneNav />
					<div className="container py-4 position-relative mt-5 mt-md-0">
						<div className="row g-4">
							<div
								data-aos="fade-right"
								data-aos-duration="2000"
								className="hero-texts text-white col-md-6 align-self-center">
								{" "}
								<p className="fs-1 text-4xl text-capitalize fw-bold mb-0">
									Tired of Paying bills in Frustration?
								</p>
								<p
									data-aos="fade-in"
									data-aos-easing="ease-in-out"
									className="fw-bold fs-3 text-xl">
									Then, {process.env.REACT_APP_AGENT_NAME} is the right choice
									for you!{" "}
								</p>
								<p className="m3  -5">
									You can now buy data, airtime, pay electricity bills, Cable TV
									and other payments with ease using{" "}
									{process.env.REACT_APP_AGENT_NAME}.
								</p>
								<div className="mt-5">
									<button
										type="button"
										onClick={() => navigate("/login")}
										class="btn btn-light me-4 fw-semibold"
										style={{ height: "40px", padding: "0 40px" }}>
										<p className="gradient-text m-0  text-uppercase">
											get started
										</p>
									</button>
								</div>
							</div>
							<div data-aos="zoom-in-up" className="hero-img col-md-6">
								<img
									src={require("../../Assets/home-two-hero.png")}
									className="w-100 mx-auto"
									alt=""
								/>
							</div>
						</div>
					</div>
				</div>
			</header>
			<section id="about" className="py-5">
				<div className="container">
					<div className="row g-4">
						<div className="col-md-6 order-md-2 align-self-center">
							<div
								data-aos="zoom-in-up"
								className="d-flex align-items-center mt-5">
								<img
									src={require("../../Assets/home-two-feature.png")}
									alt=""
									className="mx-auto"
									style={{ height: "300px", width: "auto" }}
								/>
							</div>
						</div>
						<div className="col-md-6 align-self-center order-md-1">
							<div className="container mb-4">
								<span
									data-aos="fade-up"
									data-aos-duration="3000"
									className="gradient-text h1 fw-bold text-capitalize">
									Why us?
								</span>
							</div>
							<div
								data-aos="fade-up"
								data-aos-duration="3000"
								className="row g-4">
								{features.map((feature, idx) => (
									<div
										className="col-sm-6 d-flex justify-content-center"
										key={idx}>
										<div
											class="card mx-auto border-0"
											style={{ width: "18rem" }}>
											<div className="card-body mb-4">
												<img
													src={require(`../../Assets/${feature.icon}`)}
													alt=""
													style={{ height: "32px" }}
												/>
											</div>
											<div class="card-body">
												<h5 class="card-title fw-bold mb-2">{feature.title}</h5>
												<p class="card-text small">{feature.text}</p>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>
			<section id="services" className="services py-5">
				<div
					data-aos="fade-up"
					data-aos-duration="3000"
					className="text-center mb-4">
					<span className="gradient-text h1 fw-bold">Our services</span>
					<p className="text-white mt-3 fs-5 small">
						Yes, we got you covered, With {process.env.REACT_APP_AGENT_NAME}{" "}
						Enjoy a easy and fast data delivery with Optimal security <br /> and
						also enjoy the best offers and discount sales on all our products
						periodically.
					</p>
				</div>
				<div className="container mt-5">
					<div className="row g-4">
						<div
							data-aos="fade-up"
							data-aos-duration="3000"
							className="col-sm-6 col-md-4">
							<div
								class="card bg-transparent border-0 text-white mx-auto"
								style={{ maxWidth: "24rem" }}>
								<div class="card-body">
									<div className="d-flex justify-content-between align-items-center mb-2">
										<div>
											<div className="border border-white w-25"></div>
											<h5 class="card-title mt-5">Airtime Services</h5>
										</div>
										<span className="me-4">
											<img
												src={require("../../Assets/vec1.png")}
												alt=""
												style={{ height: "20px" }}
											/>
										</span>
									</div>
									<p class="card-text">
										{process.env.REACT_APP_AGENT_NAME} offers convenient and
										rapid airtime top-up services at competitive rates. Our low
										charges and quick recharge services make it easy for
										customers to top up their airtime.
									</p>
									<div className="d-flex justify-content-end">
										<FaArrowUp size="18px" />
									</div>
								</div>
							</div>
						</div>
						<div
							data-aos="fade-up"
							data-aos-duration="3000"
							className="col-sm-6 col-md-4">
							<div
								class="card bg-transparent border-0 text-white mx-auto"
								style={{ maxWidth: "24rem" }}>
								<div class="card-body">
									<div className="d-flex justify-content-between align-items-center mb-2">
										<div>
											<div className="border border-white w-25"></div>
											<h5 class="card-title mt-5">Data Services</h5>
										</div>
										<span className="me-4">
											<img
												src={require("../../Assets/vec2.png")}
												alt=""
												style={{ height: "20px" }}
											/>
										</span>
									</div>
									<p class="card-text">
										{process.env.REACT_APP_AGENT_NAME} is a reliable and
										affordable platform for purchasing affordable data bundles
										and airtime top-ups for any Nigerian network. We offer
										competitive pricing for data plans from Airtel, MTN,
										9mobile, and Glo.
									</p>
									<div className="d-flex justify-content-end">
										<FaArrowUp size="18px" />
									</div>
								</div>
							</div>
						</div>
						<div
							data-aos="fade-up"
							data-aos-duration="3000"
							className="col-sm-6 col-md-4">
							<div
								class="card bg-transparent border-0 text-white mx-auto"
								style={{ maxWidth: "24rem" }}>
								<div class="card-body">
									<div className="d-flex justify-content-between align-items-center mb-2">
										<div>
											<div className="border border-white w-25"></div>
											<h5 class="card-title mt-5">Education</h5>
										</div>
										<span className="me-4">
											<img
												src={require("../../Assets/vec3.png")}
												alt=""
												style={{ height: "20px" }}
											/>
										</span>
									</div>
									<p class="card-text">
										{process.env.REACT_APP_AGENT_NAME} is your go-to source for
										various examination scratch cards, including those for Waec,
										Neco, and Nabteb. We take pride in providing top-quality
										service and aim to make our website your go-to destination
										after your first experience with us.
									</p>
									<div className="d-flex justify-content-end">
										<FaArrowUp size="18px" />
									</div>
								</div>
							</div>
						</div>
						<div
							data-aos="fade-up"
							data-aos-duration="3000"
							className="col-sm-6 col-md-4">
							<div
								class="card bg-transparent border-0 text-white mx-auto"
								style={{ maxWidth: "24rem" }}>
								<div class="card-body">
									<div className="d-flex justify-content-between align-items-center mb-2">
										<div>
											<div className="border border-white w-25"></div>
											<h5 class="card-title mt-5">Cable Subscriptions</h5>
										</div>
										<span className="me-4">
											<img
												src={require("../../Assets/vec5.png")}
												alt=""
												style={{ height: "20px" }}
											/>
										</span>
									</div>
									<p class="card-text">
										At {process.env.REACT_APP_AGENT_NAME}, we offer discounted
										rates for renewing your DSTV, GOTV, and Startimes
										subscriptions, allowing you to save money on your cable
										service. Our convenient access to subscription renewal saves
										you time and effort in obtaining your cable service.
									</p>
									<div className="d-flex justify-content-end">
										<FaArrowUp size="18px" />
									</div>
								</div>
							</div>
						</div>
						<div
							data-aos="fade-up"
							data-aos-duration="3000"
							className="col-sm-6 col-md-4">
							<div
								class="card bg-transparent border-0 text-white mx-auto"
								style={{ maxWidth: "24rem" }}>
								<div class="card-body">
									<div className="d-flex justify-content-between align-items-center mb-2">
										<div>
											<div className="border border-white w-25"></div>
											<h5 class="card-title mt-5">TV Subscriptions</h5>
										</div>
										<span className="me-4">
											<img
												src={require("../../Assets/vec6.png")}
												alt=""
												style={{ height: "20px" }}
											/>
										</span>
									</div>
									<p class="card-text">
										At {process.env.REACT_APP_AGENT_NAME}, we offer discounted
										rates for renewing your DSTV, GOTV, and Startimes
										subscriptions, allowing you to save money on your cable
										service. Our convenient access to subscription renewal saves
										you time and effort in obtaining your cable service.
									</p>
									<div className="d-flex justify-content-end">
										<FaArrowUp size="18px" />
									</div>
								</div>
							</div>
						</div>
						<div
							data-aos="fade-up"
							data-aos-duration="3000"
							className="col-sm-6 col-md-4">
							<div
								class="card bg-transparent border-0 text-white mx-auto"
								style={{ maxWidth: "24rem" }}>
								<div class="card-body">
									<div className="d-flex justify-content-between align-items-center mb-2">
										<div>
											<div className="border border-white w-25"></div>
											<h5 class="card-title mt-5">Electricity Payment</h5>
										</div>
										<span className="me-4">
											<img
												src={require("../../Assets/vec7.png")}
												alt=""
												style={{ height: "20px" }}
											/>
										</span>
									</div>
									<p class="card-text">
										Do you want to stay on top of your finances, then make you
										can make use of our pocket-friendly electricity payment
										feature. It saves more time and money with our streamlined
										payment tools.
									</p>
									<div className="d-flex justify-content-end">
										<FaArrowUp size="18px" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="py-5 about">
				<div className="container">
					<div className="row g-5">
						<div className="col-md-6 align-self-center">
							<img src={require("../../Assets/map.png")} alt="" width="100%" />
						</div>
						<div
							data-aos="fade-up"
							data-aos-duration="3000"
							className="col-md-6 align-self-center">
							<p className="gradient-text h1 fw-bold">
								Benefits you gain withus
							</p>
							<p className="small">
								Take control of your financial future with our easy-to-use
								budgeting and friendly tools. Enjoy peace of mind with our 24/7
								customer support and expert guidance.
							</p>
							<ul className="p-0">
								<li className="list-group">best price on the market</li>
								<li className="list-group">best price on the market</li>
								<li className="list-group">best price on the market</li>
								<li className="list-group">best price on the market</li>
							</ul>
						</div>
					</div>
				</div>
			</section>
			<section className="py-5">
				<div
					data-aos="fade-up"
					data-aos-duration="3000"
					className="text-center">
					<span className="gradient-text h1 fw-bold">Testimonials</span>
					<p className="mt-3 fs-5">Hear Our Customers Speak</p>
				</div>
				<div className="container">
					<div className="row g-5 mt-4">
						<div className="col-md-6">
							<div
								data-aos="zoom-in-up"
								className="testimony text-white p-4 rounded-3">
								<div className="icon">
									<div className="d-flex text-white gap-2 align-items-center px-3 mb-4">
										<img
											src={require("../../Assets/testimony-img-1.png")}
											alt=""
										/>
										<div>
											<p className="mb-0 text-capitalize fw-semibold">user</p>
											<p className="text-mute mb-0 text-uppercase">ceo</p>
										</div>
									</div>
								</div>
								<div className="px-3">
									<p className="text-white">
										Ever since i started business with{" "}
										{process.env.REACT_APP_AGENT_NAME} it has been all
										smiles...they have the best customer service team
										ever...prompt and fast response to issues.{" "}
										{process.env.REACT_APP_AGENT_NAME} thanks for always being
										true.
									</p>
								</div>
								<div className="d-flex justify-content-end">
									<FaQuoteRight />
								</div>
							</div>
						</div>
						<div className="col-md-6">
							<div
								data-aos="zoom-in-up"
								className="testimony text-white p-4 rounded-3">
								<div className="icon">
									<div className="d-flex text-white gap-2 align-items-center px-3 mb-4">
										<img
											src={require("../../Assets/testimony-img-1.png")}
											alt=""
										/>
										<div>
											<p className="mb-0 text-capitalize fw-semibold">user</p>
											<p className="text-mute mb-0 text-uppercase">ceo</p>
										</div>
									</div>
								</div>
								<div className="px-3">
									<p className="text-white">
										Ever since i started business with{" "}
										{process.env.REACT_APP_AGENT_NAME} it has been all
										smiles...they have the best customer service team
										ever...prompt and fast response to issues.{" "}
										{process.env.REACT_APP_AGENT_NAME} thanks for always being
										true.
									</p>
								</div>
								<div className="d-flex justify-content-end">
									<FaQuoteRight />
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* <HomeSubscription /> */}
			<HomeFooter />
		</div>
	);
};

export default HomeTwo;
