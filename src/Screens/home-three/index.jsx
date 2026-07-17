import HomeThreeNav from "../../Components/home-three/home-three-nav";
import { FaFacebookF, FaInstagramSquare } from "react-icons/fa";
import { SiX } from "react-icons/si";
// import HomeThreeServiceCard from "../../Components/home-three/service-card";
import AppLogo from "../../Components/app-logo";
import { useNavigate } from "react-router-dom";

const HomeThree = () => {
	let navigate = useNavigate();

	return (
		<div
			className="home-three"
			style={{
				overflowX: "hidden",
			}}>
			<header className="bg-[#ECEBF9]">
				<HomeThreeNav />
				<div className="container mx-auto py-10">
					<div className="grid md:grid-cols-2 gap-8">
						<div className="text-[#0C111F]  self-center text-[#475467]">
							<p className="text-4xl md:text-6xl font-bold leading-snug">
								Fast & Reliable VTU Services in Nigeria
							</p>
							<p className="mt-8">
								Buy airtime, data, pay bills, and subscribe to TV instantly at the best rates.
							</p>
							<div className="py-2">
								<button
									className="bg-white px-12 h-12 rounded rounded-full text-[#0C111F] font-medium"
									onClick={() => navigate("/login")}>
									Get Started
								</button>
							</div>
						</div>
						<div data-aos="zoom-in-up">
							<img src={require("../../Assets/home-three-hero.png")} alt="" />
						</div>
					</div>
					<div className="flex justify-center">
						<img
							src={require("../../Assets/home-three-cta.png")}
							alt=""
							className="h-20"
						/>
					</div>
				</div>
			</header>
			<section id="services" className="py-10 bg-[#ECEBF9]">
				<div className="container mx-auto">
					<p
						data-aos="fade-up"
						data-aos-duration="3000"
						className="text-2xl font-light text-[#0C111F] mb-1">
						Services
					</p>
					<p
						data-aos="fade-up"
						data-aos-duration="3000"
						className="text-4xl font-bold text-[#0C111F]">
						Our featured Services
					</p>
					{/* <div className="grid md:grid-cols-3 mt-12 gap-8">
						<HomeThreeServiceCard icon="home-three-serv1.png" />
						<HomeThreeServiceCard icon="home-three-serv2.png" />
						<HomeThreeServiceCard icon="home-three-serv1.png" />
					</div> */}
					<div className="grid md:grid-cols-3 gap-x-8 gap-y-10 mt-10">

						<Card
							img="ico-2.png"
							title="Airtime Top-Up"
							text={`Instant recharge for all networks in Nigeria.`}
						/>
						<Card
							img="ico-1.png"
							title="Data Subscription"
							text="Cheap data bundles for MTN, Airtel, Glo, and 9mobile."
						/>
						
						<Card
							img="ico-3.png"
							title="Electricity Bills"
							text="Pay your electricity bills and receive tokens instantly."
						/>
						{/* <Card
							img="ico-4.png"
							title="Education"
							text="Generate WAEC and NECO Result Checker PINs and Tokens at unbeatable prices"
						/> */}
						<Card
							img="ico-5.png"
							title="Tv Subscription"
							text="Renew your DStv, GOtv, and Startimes without stress."
						/>
						<Card
							img="ico-6.png"
							title="Bulk SMS (Optional)"
							text="Reach your customers with affordable SMS campaigns."
						/>
						{/* <Card
							img="ico-6.png"
							title="Airtime 2 Cash"
							text="Convert excess MTN, GLO, AIRTEL and 9MOBILE Airtime to Cash at Superb rates."
						/> */}
					</div>
				</div>
			</section>
			<section id="about-us">
				<div className="container mx-auto py-10">
					<div className="grid md:grid-cols-2 gap-8">
						<div className="self-center">
							<p
								data-aos="fade-up"
								data-aos-duration="3000"
								className="text-2xl font-light text-[#0C111F] mb-1">
								Benefits
							</p>
							<p
								data-aos="fade-up"
								data-aos-duration="3000"
								className="text-4xl font-bold text-[#0C111F]">
								Our Featured <br /> Services
							</p>
							<p data-aos="fade-up" data-aos-duration="3000" className="mt-8">
								DataArena is a trusted VTU platform in Nigeria providing fast, 
								secure, and affordable digital services.
							</p>
							<p data-aos="fade-up" data-aos-duration="3000" className="mt-8">
								We help individuals and businesses easily purchase airtime, 
								data bundles, electricity tokens, and TV subscriptions — all in 
								one place.
							</p>
							
						</div>
						<div data-aos="zoom-in-up">
							<img
								src={require("../../Assets/hime-three-benefit.png")}
								alt=""
								className="h-[300px] md:h-[500px] mx-auto"
							/>
						</div>
					</div>
				</div>
			</section>
			<section className="bg-[#ECEBF9] text-[#006400]  py-10">
				<div className="container">
					<div className="grid md:grid-cols-2 gap-8">
						<div
							data-aos="fade-right"
							data-aos-duration="2000"
							className="text-light self-center">
							<p
								data-aos="fade-up"
								data-aos-duration="3000"
								className="text-2xl font-bold mb-8 text-[#006400]">
								How It Works
							</p>
							<div
								data-aos="fade-up"
								data-aos-duration="3000"
								className="flex gap-4 items-center">
								<div className="font-black text-2xl text-[#FFC107] bg-white h-16 w-16 rounded-full flex items-center justify-center">
									1
								</div>
								<div>
									<p className="font-bold text-lg mb-1 text-[#006400]">Create an account</p>
								</div>
							</div>
							<div
								data-aos="fade-up"
								data-aos-duration="3000"
								className="flex gap-4 items-center mt-8">
								<div className="font-black text-2xl text-[#FFC107] bg-white h-16 w-16 rounded-full flex items-center justify-center">
									2
								</div>
								<div>
									<p className="font-bold text-lg mb-1 text-[#006400]">Fund your wallet</p>
									
								</div>
							</div>
							<div
								data-aos="fade-up"
								data-aos-duration="3000"
								className="flex gap-4 items-center mt-8">
								<div className="font-black text-2xl text-[#FFC107] bg-white h-16 w-16 rounded-full flex items-center justify-center">
									3
								</div>
								<div>
									<p className="font-bold text-lg mb-1 text-[#006400]">Select a service</p>
								</div>
							</div>
							<div
								data-aos="fade-up"
								data-aos-duration="3000"
								className="flex gap-4 items-center mt-8">
								<div className="font-black text-2xl text-[#FFC107] bg-white h-16 w-16 rounded-full flex items-center justify-center">
									4
								</div>
								<div>
									<p className="font-bold text-lg mb-1 text-[#006400]">Complete payment</p>
								</div>
							</div>
							<div
								data-aos="fade-up"
								data-aos-duration="3000"
								className="flex gap-4 items-center mt-8">
								<div className="font-black text-2xl text-[#FFC107] bg-white h-16 w-16 rounded-full flex items-center justify-center">
									5
								</div>
								<div>
									<p className="font-bold text-lg mb-1 text-[#006400]">Get instant delivery</p>
								</div>
							</div>
						</div>
						<div data-aos="zoom-in-up">
							<img
								src={require("../../Assets/get-started.png")}
								alt=""
								className="md:h-[300px]"
							/>
						</div>
					</div>
				</div>
			</section>
			{/* <section className="py-10 bg-[#ECEBF9] text-center">
				<div className="container">
					<p
						data-aos="fade-up"
						data-aos-duration="3000"
						className="text-4xl font-bold text-[#0C111F] m-0">
						Subscribe to Our Newsletter
					</p>
					<p data-aos="fade-up" data-aos-duration="3000" className="mt-8">
						small heading
					</p>
					<div
						data-aos="fade-up"
						data-aos-duration="3000"
						className="flex bg-white p-1 rounded-md max-w-sm mx-auto">
						<input
							type="text"
							className="bg-transparent h-12 px-4 w-full"
						/>
						<button className="h-12 w-40 rounded-md bg-[#0C03B6] text-light">
							Join Now
						</button>
					</div>
				</div>
			</section> */}
			<section id="faq" className="py-10 bg-white">
				<div className="container mx-auto px-4">
					<p
						data-aos="fade-up"
						data-aos-duration="3000"
						className="text-2xl font-light text-[#0C111F] mb-1">
						FAQ
					</p>
					<p
						data-aos="fade-up"
						data-aos-duration="3000"
						className="text-4xl font-bold text-[#0C111F] mb-8">
						Frequently Asked Questions
					</p>
					<div className="max-w-3xl mx-auto space-y-4">
						<details className="rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] p-4 shadow-sm" open>
							<summary className="cursor-pointer list-none font-semibold text-[#0C111F] flex items-center justify-between">
								<span>Is DataArena reliable?</span>
								<span className="text-xl text-[#006400]">+</span>
							</summary>
							<p className="mt-3 text-[#475467]">
								Yes, we provide fast and secure transactions 24/7.
							</p>
						</details>
						<details className="rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] p-4 shadow-sm">
							<summary className="cursor-pointer list-none font-semibold text-[#0C111F] flex items-center justify-between">
								<span>How fast is delivery?</span>
								<span className="text-xl text-[#006400]">+</span>
							</summary>
							<p className="mt-3 text-[#475467]">
								All services are delivered instantly after payment.
							</p>
						</details>
						<details className="rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] p-4 shadow-sm">
							<summary className="cursor-pointer list-none font-semibold text-[#0C111F] flex items-center justify-between">
								<span>What payment methods are available?</span>
								<span className="text-xl text-[#006400]">+</span>
							</summary>
							<p className="mt-3 text-[#475467]">
								Bank transfer and online payment options are supported.
							</p>
						</details>
					</div>
				</div>
			</section>
			<section className="py-10">
				<div
					data-aos="fade-up"
					data-aos-duration="3000"
					className="container flex items-center gap-8">
					<div className="w-1/5">
						<img src={require("../../Assets/home-three-customer.png")} alt="" />
					</div>
					<div>
						<div>
							<p className="text-4xl font-bold text-[#0C111F] m-0">
								Testimonials
							</p>
						</div>
						<div className="max-w-lg border-l-4 p-4 relative border-[#040D24] bg-light shadow mt-8">
							<p className="font-bold text-md capitalize m-0">Joy Doe</p>
							<p className="text-xs text-[#102F81]"></p>
							<p className="text-md text-[#102F81]">
								I enjoy excellent customer service and affordable telecom
								services with swift delivery daily while using this platform. If
								you ever think of making more profits in your data reselling
								business, think of {process.env.REACT_APP_AGENT_NAME}
							</p>
							<div className="absolute h-32 w-32 -bottom-6 -right-6 bg-[#102F81] -z-[1]"></div>
						</div>
					</div>
				</div>
			</section>
			<footer className="bg-[#F8FAFC] px-6 py-14 text-slate-900">
				<div className="container mx-auto">
					<div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
						<div className="flex-1">
							<div className="mb-6">
								<AppLogo height={50} />
								<p className="mt-4 max-w-md text-sm leading-7 text-slate-600">
									Your One-Stop VTU Platform in Nigeria
								</p>
							</div>
							<div className="flex items-center gap-4 text-slate-500">
							<button className="transition hover:text-slate-900" aria-label="Instagram"><FaInstagramSquare size={24} /></button>
							<button className="transition hover:text-slate-900" aria-label="X (Twitter)"><SiX size={24} /></button>
							<button className="transition hover:text-slate-900" aria-label="Facebook"><FaFacebookF size={24} /></button>
							</div>
						</div>

						<div className="flex-1 md:flex md:justify-end">
							<div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
								<p className="text-sm font-semibold text-slate-900">Need help? Reach out to us anytime.</p>
								<ul className="mt-3 space-y-2 text-sm text-slate-600">
									<li>📧 Email: support@dataarena.com.ng</li>
									<li>📞 Phone: 09016216604</li>
									<li>📍 Location: Nigeria</li>
								</ul>
							</div>
						</div>
					</div>

					<div className="mt-12 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex sm:items-center sm:justify-between">
						<p>© 2026 {process.env.REACT_APP_AGENT_NAME || "DataArena"}</p>
						<p>All Rights Reserved</p>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default HomeThree;

const Card = ({ img, title, text }) => {
	return (
		<div
			data-aos="zoom-in-up"
			data-aos-duration="2000"
			className="text-center bg-white rounded-lg p-8 shadow-md">
			<img
				src={require(`../../Assets/${img}`)}
				className="mx-auto h-10"
				alt=""
			/>
			<p className="font-bold mt-8">{title}</p>
			<p className="font-light mt-4">{text}</p>
		</div>
	);
};
