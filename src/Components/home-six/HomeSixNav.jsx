import React, { useState } from "react";
import { FaHamburger } from "react-icons/fa";
import { Link } from "react-scroll";
import AppLogo from "../app-logo";

const HomeSixNav = () => {
	const [menuOpen, setMenuOpen] = useState(false);

	const closeMenu = () => {
		setMenuOpen(false);
	};
	return (
		<nav className="fixed top-[-3px] left-0 right-0 z-20 bg-transparent p-8 shadow-md md:px-16 lg:px-28 flex items-center justify-between">
			<div className="text-white text-lg font-semibold">
				<AppLogo type="dark" height="50px" />
			</div>
			<div className="hidden md:flex space-x-10">
				<Link
					to="product"
					smooth={true}
					className="text-white cursor-pointer no-underline">
					Product
				</Link>
				<Link
					to="about"
					smooth={true}
					className="text-white cursor-pointer no-underline">
					About Us
				</Link>
				<Link
					to="contact"
					smooth={true}
					className="text-white cursor-pointer no-underline">
					Contact Us
				</Link>
			</div>
			<div className="md:hidden">
				<button
					onClick={() => setMenuOpen(!menuOpen)}
					className="text-white focus:outline-none">
					<FaHamburger />
				</button>
			</div>
			{menuOpen && (
				<div className="md:hidden absolute top-16 left-0 w-full bg-transparent p-4 space-y-8">
					<Link
						to="/"
						onClick={closeMenu}
						className="text-white block cursor-pointer no-underline">
						Product
					</Link>
					<Link
						to="/about"
						onClick={closeMenu}
						className="text-white block cursor-pointer no-underline">
						About Us
					</Link>
					<Link
						to="/contact"
						onClick={closeMenu}
						className="text-white block cursor-pointer no-underline">
						Contact Us
					</Link>
				</div>
			)}
			<div className="hidden md:block cursor-pointer">
				<Link
					to="/register"
					className="px-4 py-2 bg-homeSixCol rounded-3xl text-white no-underline">
					Register
				</Link>
			</div>
		</nav>
	);
};

export default HomeSixNav;
