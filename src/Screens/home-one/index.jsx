import HomeOneNav from "../../Components/home-one/home-one-nav.component";

import { FaArrowUp, FaQuoteRight } from "react-icons/fa";

import "./home-one.style.css";
import { useNavigate } from "react-router-dom";
import { features } from "../home-two";
import HomeFooter from "../../Components/home-footer/home-footer";

const HomeOne = () => {
	let navigate = useNavigate();

	return (
		<div className="home-one">
			<header>
				<div className="hero-section text-white">
					<HomeOneNav />
					<div className="container py-4 position-relative">
						<div className="row g-4">
							<div className="hero-texts text-white col-md-6 align-self-center">
								<p className="fs-1 text-capitalize fw-bold mb-2">
									buy data easily
								</p>
								<p className="fw-bold fs-4">GLO, MTN, 9Mobile, Airtel</p>
								<p className="mt-5">
									You can now buy data, airtime, pay electricity bills, Cable TV
									<br /> and other payments with ease using{" "}
									{process.env.REACT_APP_AGENT_NAME}.
								</p>
								<div className="mt-3">
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
							<div className="hero-img col-md-6">
								<img
									src={require("../../Assets/home-one-hero.png")}
									className="w-100 mx-auto"
									alt=""
								/>
							</div>
						</div>
					</div>
				</div>
			</header>
			<section className="py-5">
				<div className="container">
					<div className="row g-4">
						<div className="col-md-4">
							<span className="gradient-text h1 fw-bold text-capitalize">
								the best features our users are enjoying
							</span>
							{/* <p className="small mt-3">
								Lorem ipsum dolor sit amet consectetur <br /> adipisicing elit.
								Repellendus asperiores tempore iusto voluptatem.
							</p> */}
							<div className="d-flex mt-5">
								<img
									src={require("../../Assets/home-one-feature.png")}
									alt=""
									className="mx-auto"
									style={{ height: "300px", width: "auto" }}
								/>
							</div>
						</div>
						<div className="col-md-8 align-self-center">
							<div className="row g-4">
								{features.map((feature, idx) => (
									<div className="col-sm-6" key={idx}>
										<div
											class="card mx-auto border-0"
											style={{ width: "18rem" }}>
											<div class="card-body">
												<h5 class="card-title fw-bold">{feature.title}</h5>
												<p class="card-text">{feature.text}</p>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="py-5 about" id="about">
				<div className="container">
					<div className="row">
						<div className="col-md-7 align-self-center">
							<p className="h1 fs-1 fw-bold gradient-text">About us</p>
							<div className="p-3 border-start border-3 border-dark">
								<p className="m-0">
									Join our network of outstanding entrepreneurs partnering with{" "}
									{process.env?.REACT_APP_AGENT_NAME}. Bring our 'easy-payments'
									experience closer to your home or office and earn a commission
									for every transaction you perform for yourself or customers.
								</p>
							</div>
						</div>
						<div className="col-md-5 d-flex">
							<img
								src={require("../../Assets/home-one-about-us.png")}
								alt=""
								className="mx-auto"
							/>
						</div>
					</div>
				</div>
			</section>
			<section className="services py-5" id="services">
				<div className="text-center">
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
						<div className="col-sm-6 col-md-4">
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
						<div className="col-sm-6 col-md-4">
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
						<div className="col-sm-6 col-md-4">
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
						<div className="col-sm-6 col-md-4">
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
						<div className="col-sm-6 col-md-4">
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
						<div className="col-md-6">
							<p className="h1">Benefits</p>
							<p className="small">
								Take control of your financial future with our easy-to-use
								budgeting and friendly tools. Enjoy peace of mind with our 24/7
								customer support and expert guidance.
							</p>
							<div
								className="d-flex align-items-center justify-content-between"
								style={{ maxWidth: "400px" }}>
								<div>
									<p className="h3 fw-bold mb-1">
										100k<span>+</span>
									</p>
									<small>user active</small>
								</div>
								<div>
									<p className="h3">10+</p>
									<small>country</small>
								</div>
								<div>
									<p className="h3">$40M+</p>
									<small>transactions</small>
								</div>
							</div>
						</div>
						<div className="col-md-6">
							<img
								src={require("../../Assets/map.png")}
								alt=""
								style={{ height: "300px" }}
							/>
						</div>
					</div>
				</div>
			</section>
			<section className="py-5">
				<div className="text-center">
					<span className="gradient-text h1 fw-bold">Testimonials</span>
					<p className="mt-3 fs-5">Hear Our Customers Speak</p>
				</div>
				<div className="container">
					<div className="row g-5 mt-4">
						<div className="col-md-6">
							<div className="testimony text-white p-4 rounded-3">
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
							<div className="testimony text-white p-4 rounded-3">
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
			{/* <section className="py-5 about">
				<p className="text-center fs-3 fw-bold">Join our newsletter</p>
				<div
					style={{ maxWidth: "400px" }}
					class="input-group mb-3 mx-auto mt-3">
					<input
						type="email"
						class="form-control"
						placeholder="your email address"
						aria-label="Recipient's username"
						aria-describedby="basic-addon2"
					/>
					<button class="input-group-text bg-dark text-white" id="">
						Subscribe
					</button>
				</div>
				<p className="text-center text-muted small mt-5">
					We will send you weekly updates for your better <br /> finance
					management.
				</p>
			</section> */}
			<HomeFooter />
		</div>
	);
};

export default HomeOne;
