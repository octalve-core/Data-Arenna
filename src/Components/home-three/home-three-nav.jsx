import { useNavigate } from "react-router-dom";
import AppLogo from "../app-logo";
import { FiMenu } from "react-icons/fi";

const HomeThreeNav = () => {
  const navigate = useNavigate()
  return (
		<nav className="navbar navbar-expand-lg navbar-dark">
			<div className="container">
				<AppLogo height="30px" />
				<button
					className="navbar-toggler p-15" 
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation">
					{/* <span className="navbar-toggler-icon w-10 h-10 !bg-[#006400]  p-15"></span> */}
					<FiMenu size={36} color="#006400" />
				</button>
				<div
					className="collapse navbar-collapse justify-content-between ms-0 ms-md-4"
					id="navbarNav">
					<ul className="navbar-nav mx-auto !text-[#0C111F] font-bold font-2xl">
						<li className="nav-item">
							<a
								className="nav-link active !text-[#0C111F]"
								aria-current="page"
								href="#services">
								Services
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link !text-[#0C111F]" href="#about-us">
								About
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link !text-[#0C111F]" href="#top">
								Contact Us
							</a>
						</li>
					</ul>
					<div className="-ml-auto">
						<button
							className="bg-white px-12 h-12 rounded rounded-full text-[#0C111F] font-medium"
							onClick={() => navigate("/register")}>
							Get Started
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default HomeThreeNav;
