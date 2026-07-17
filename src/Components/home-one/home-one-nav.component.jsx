import AppLogo from "../app-logo";
import { useNavigate } from "react-router-dom";

const routes = [
	{ name: "Home", url: "/" },
	{ name: "About", url: "#about" },
	{ name: "services", url: "#services" },
	{ name: "contact", url: "#contact" },
];

const HomeOneNav = () => {
	let navigate = useNavigate();
	return (
		<header>
			<nav class="navbar navbar-expand-lg navbar-dark">
				<div class="container-fluid">
					<AppLogo type="dark" height="50px" />
					<button
						class="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarNav"
						aria-controls="navbarNav"
						aria-expanded="false"
						aria-label="Toggle navigation">
						<span class="navbar-toggler-icon" style={{color: "#fff"}}></span>
					</button>
					<div class="collapse navbar-collapse" id="navbarNav">
						<ul class="navbar-nav mx-auto">
							{routes.map(route => (
								<li class="nav-item">
									<a
										key={route.name}
										href={route.url}
										className="nav-link text-decoration-none text-white text-uppercase">
										{route.name}
									</a>
								</li>
							))}
						</ul>
						<div className="action">
							<button
								type="button"
								onClick={() => navigate("/login")}
								class="btn btn-outline-secondary me-4 text-white fw-semibold text-uppercase"
								style={{ height: "40px", padding: "0 40px" }}>
								log in
							</button>
							<button
								type="button"
								onClick={() => navigate("/register")}
								class="btn btn-light me-4 fw-semibold"
								style={{ height: "40px", padding: "0 40px" }}>
								<p className="gradient-text m-0 text-uppercase">sign up</p>
							</button>
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default HomeOneNav;
