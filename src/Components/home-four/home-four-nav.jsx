import React from "react";
import { useState } from "react";
import HomeFourBtn from "./home-four-btn";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
// import HwLogo from "../../Assets/HwLogo.png";

const HomeFourNav = () => {
  const buttonVariants = {
    hidden: { y: "100%" },
    visible: { y: 0, transition: { duration: 0.7 } },
  };

  let Links = [
    { name: "Products", link: "product" },
    { name: "About Us", link: "about" },
    { name: "Contact Us", link: "contact" },
  ];

  let [open, setOpen] = useState(false);

  const handleMenuItemClick = () => {
    setOpen(false);
  };

  return (
		<nav className="  w-full fixed top-0 left-0 z-20">
			<div className=" shadow-md md:flex items-center pt-2 lg:h-20 md:h-20 h-12 justify-between bg-white px-7 md:px-28">
				<div className="object-cover cursor-pointer flex items-center">
					<img
						className="  w-12"
						src={process.env.REACT_APP_IMAGE_URL}
						alt={process.env.REACT_APP_AGENT_NAME}
					/>
				</div>

				<div
					onClick={() => setOpen(!open)}
					className=" hidden absolute right-7 top-4 font-bold cursor-pointer md:hidden">
					<ion-icon name={open ? "close" : "menu"}></ion-icon>
				</div>

				<motion.ul
					variants={buttonVariants}
					initial="hidden"
					animate="visible"
					className={`md:flex md:items-center items-center bg-white md:pb-0 pb-10 absolute md:static  md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
						open ? "top-8" : "top-[-490px]"
					} `}>
					{Links.map(link => (
						<li
							key={link.name}
							className="md:ml-8 text-2xl md:items-center md:my-0 my-7">
							<Link
								to={link.name}
								spy={true}
								offset={-70}
								smooth
								duration={100}
								className="text-black cursor-pointer no-underline hover:text-red-600 ease-in duration-200"
								onClick={handleMenuItemClick}>
								{link.name}
							</Link>
						</li>
					))}
					<HomeFourBtn></HomeFourBtn>
				</motion.ul>
			</div>
		</nav>
	);
};

export default HomeFourNav;
