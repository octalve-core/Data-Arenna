import React, { useState } from "react";
import { FaHamburger } from "react-icons/fa";
import { Link } from "react-scroll";
import AppLogo from "../app-logo";

const HomeFiveNav = () => {
	const [menuOpen, setMenuOpen] = useState(false);

	const closeMenu = () => {
		setMenuOpen(false);
	};
	return (
		<nav className="fixed top-[-3px] left-0 right-0 z-20 bg-white p-8 shadow-md md:px-16 lg:px-28 flex items-center justify-between">
			<div className="text-black text-lg font-semibold">
				<AppLogo type="dark" height="50px" />
			</div>
			<div className="hidden md:flex space-x-10">
				<Link
					to="product"
					smooth={true}
					className="text-black cursor-pointer no-underline">
					Product
				</Link>
				<Link
					to="about"
					smooth={true}
					className="text-black cursor-pointer no-underline">
					About Us
				</Link>
				<Link
					to="contact"
					smooth={true}
					className="text-black cursor-pointer no-underline">
					Contact Us
				</Link>
			</div>
			<div className="md:hidden">
				<button
					onClick={() => setMenuOpen(!menuOpen)}
					className="text-black focus:outline-none">
					<FaHamburger />
				</button>
			</div>
			{menuOpen && (
				<div className="md:hidden absolute top-16 left-0 w-full bg-white p-4 space-y-8">
					<Link
						to="/"
						onClick={closeMenu}
						className="text-black block cursor-pointer no-underline">
						Product
					</Link>
					<Link
						to="/about"
						onClick={closeMenu}
						className="text-black block cursor-pointer no-underline">
						About Us
					</Link>
					<Link
						to="/contact"
						onClick={closeMenu}
						className="text-black block cursor-pointer no-underline">
						Contact Us
					</Link>
				</div>
			)}
			<div className="hidden md:block cursor-pointer">
				<Link
					to="/register"
					className="px-4 py-2 bg-btncol rounded-3xl text-white no-underline">
					Register
				</Link>
			</div>
		</nav>
	);
};

export default HomeFiveNav;
