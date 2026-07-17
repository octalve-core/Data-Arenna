import React, { createContext, useState } from "react";
import { connect, useSelector } from "react-redux";
import { BiHomeAlt } from "react-icons/bi";
import { TbUsers } from "react-icons/tb";
import { VscBellDot } from "react-icons/vsc";
import { AiOutlineSwap } from "react-icons/ai";
import {
	GiChart,
	GiWallet,
	//  GiHumanPyramid
} from "react-icons/gi";
import { IoCardOutline } from "react-icons/io5";
import { FaQuestionCircle } from "react-icons/fa";
// import { CgController } from "react-icons/cg";
import { BsCodeSlash } from "react-icons/bs";

import {
	registerUser,
	loginUser,
	updateUser,
	logoutUser,
	updatePassword,
} from "./Actions/AuthActions";

import {
	getServicesHistory,
	buyServices,
	converterServices,
	dataServices,
	manageWallet,
	manageFundWallet,
	manageFundWalletFlutterwave,
	manageFundWalletPaystack,
	generateVirtual,
	getManualBonusHistory,
	getDataHistory,
	getReload,
	getWalletHistory,
	manageTransaction,
	manualTransactions,
	generateVirtualCebiz,
	findProviderStat,
	manualDirectDebit,
	manageManualBanks,
	manageFaqs,
	getReferrals,
	getDataTransactionStat,
	getProviderStat,
	manageEducationBundle,
} from "./Actions/GeneralAction";
import { clearErrors, restoreMsg, returnErrors } from "./Reducer/ErrorReducer";
import { getSettings, manageDocumentation } from "./Reducer/SettingsReducer";
import { getUseCase, manageUpgrade } from "./Reducer/UseCaseReducer";

import {
	getNotify,
	manageNotify,
	manageUserActiveness,
	loadAllUser,
	loadAllPending,
	updatePending,
	manageWalletPin,
	findProviderFunding,
	getAllUserTransactionAmount,
} from "./Actions/UserActions";

export const GlobalState = createContext();

const DataProvider = ({
	children,
	getServicesHistory,
	buyServices,
	converterServices,
	dataServices,
	manageWallet,
	manageFundWallet,
	manageFundWalletFlutterwave,
	manageFundWalletPaystack,
	generateVirtual,
	registerUser,
	loginUser,
	updateUser,
	clearErrors,
	logoutUser,
	getSettings,
	getNotify,
	manageNotify,
	manageUserActiveness,
	loadAllUser,
	updatePassword,
	getManualBonusHistory,
	getDataHistory,
	getReload,
	getWalletHistory,
	manageTransaction,
	manualTransactions,
	restoreMsg,
	returnErrors,
	getUseCase,
	loadAllPending,
	updatePending,
	manageUpgrade,
	generateVirtualCebiz,
	findProviderStat,
	manualDirectDebit,
	manageManualBanks,
	manageFaqs,
	getReferrals,
	manageWalletPin,
	findProviderFunding,
	getDataTransactionStat,
	getProviderStat,
	manageDocumentation,
	getAllUserTransactionAmount,
	manageEducationBundle,
}) => {
	const {
		auth,
		cables,
		general,
		electricity,
		airtimes,
		data,
		errors,
		wallet,
		bonus,
		commission,
		converter,
		users,
		settings,
		notifications,
		education,
		success,
		usecase,
		pending_wallet,
		pending_card,
		pending_virtual,
		upgrade,
		stat,
		airtimes_pin,
		faqs,
		referral,
		funding,
		documentation,
	} = useSelector(state => state);
	let [stateName, setStateName] = useState("");

	let numberWithCommas = (x, a) => {
		if (!x) return;
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, a ? a : ",");
	};

	let headerList = [
		{
			name: "Home",
			url: "/",
		},
		{
			name: "About us",
			url: "/about",
		},
		{
			name: "Services",
			url: "/services",
		},
		{
			name: "Contact us",
			url: "/contact",
		},
		// {
		// 	name: "Our blog",
		// 	url: "/blogs",
		// },
	];

	let sidebarList = [
		{
			name: "Dashboard",
			url: "/dashboard",
			icon: <BiHomeAlt className="icon" size={24} />,
		},
		{
			name: "Users",
			url: "/users",
			icon: <TbUsers className="icon" size={24} />,
		},
		{
			name: "Transactions",
			url: "/transactions",
			icon: <GiChart className="icon" size={24} />,
		},
		{
			name: "Products",
			url: "/products",
			icon: <IoCardOutline className="icon" size={24} />,
		},
		{
			name: "Converter",
			url: "/converter",
			icon: <AiOutlineSwap className="icon" size={24} />,
		},
		{
			name: "Notification",
			url: "/notifications",
			icon: <VscBellDot className="icon" size={24} />,
		},
		{
			name: "Wallet",
			url: "/wallets",
			icon: <GiWallet className="icon" size={24} />,
		},
		{
			name: "Faqs",
			url: "/faqs",
			icon: <FaQuestionCircle className="icon" size={24} />,
		},
		{
			name: "Api Documentation",
			url: "/documentation",
			icon: <BsCodeSlash className="icon" size={24} />,
		},
	];
	let sidebarListUser = [
		{
			name: "Dashboard",
			url: "/dashboard",
			icon: <BiHomeAlt className="icon" size={24} />,
		},
		{
			name: "Transactions",
			url: "/transactions",
			icon: <GiChart className="icon" size={24} />,
		},
		{
			name: "Products",
			url: "/products",
			icon: <IoCardOutline className="icon" size={24} />,
		},
		{
			name: "Converter",
			url: "/converter",
			icon: <AiOutlineSwap className="icon" size={24} />,
		},
		{
			name: "Notification",
			url: "/notifications",
			icon: <VscBellDot className="icon" size={24} />,
		},
		{
			name: "Wallet",
			url: "/wallets/my-wallet",
			icon: <GiWallet className="icon" size={24} />,
		},
		{
			name: "Faqs",
			url: "/faqs",
			icon: <FaQuestionCircle className="icon" size={24} />,
		},
		{
			name: "Api Documentation",
			url: "/documentation",
			icon: <BsCodeSlash className="icon" size={24} />,
		},
	];

	let nairaSign = <span className="fontInherit">&#8358;</span>;
	let nairaSignNeutral = "₦";

	const state = {
		numberWithCommas,
		headerList,
		sidebarList,
		sidebarListUser,
		stateName,
		setStateName,
		nairaSign,
		nairaSignNeutral,

		auth,
		registerUser,
		loginUser,
		logoutUser,
		updateUser,

		cables,
		general,
		electricity,
		airtimes,
		data,
		converter,

		errors,
		clearErrors,

		getServicesHistory,
		buyServices,
		converterServices,
		dataServices,

		wallet,
		manageWallet,
		manageFundWallet,
		manageFundWalletFlutterwave,
		manageFundWalletPaystack,
		generateVirtual,

		bonus,
		commission,

		users,
		settings,
		getSettings,

		getNotify,
		manageNotify,
		manageUserActiveness,
		loadAllUser,

		notifications,
		updatePassword,
		education,
		getManualBonusHistory,
		getDataHistory,
		getReload,
		getWalletHistory,
		manageTransaction,
		manualTransactions,

		success,
		restoreMsg,
		returnErrors,

		usecase,
		getUseCase,

		pending_wallet,
		pending_card,
		pending_virtual,
		loadAllPending,
		updatePending,

		upgrade,
		manageUpgrade,
		generateVirtualCebiz,
		findProviderStat,
		manualDirectDebit,
		stat,
		airtimes_pin,
		manageManualBanks,
		manageFaqs,
		faqs,
		referral,
		getReferrals,
		manageWalletPin,
		findProviderFunding,
		funding,
		getDataTransactionStat,
		getProviderStat,
		manageDocumentation,
		documentation,
		getAllUserTransactionAmount,
		manageEducationBundle,
	};

	return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};

export default connect(null, {
	getServicesHistory,
	buyServices,
	converterServices,
	dataServices,
	manageWallet,
	manageFundWallet,
	manageFundWalletFlutterwave,
	manageFundWalletPaystack,
	generateVirtual,
	registerUser,
	loginUser,
	updateUser,
	clearErrors,
	logoutUser,
	getSettings,
	getNotify,
	manageNotify,
	manageUserActiveness,
	loadAllUser,
	updatePassword,
	getManualBonusHistory,
	getDataHistory,
	getReload,
	getWalletHistory,
	manageTransaction,
	manualTransactions,
	restoreMsg,
	returnErrors,
	getUseCase,
	loadAllPending,
	updatePending,
	manageUpgrade,
	generateVirtualCebiz,
	findProviderStat,
	manualDirectDebit,
	manageManualBanks,
	manageFaqs,
	getReferrals,
	manageWalletPin,
	findProviderFunding,
	getDataTransactionStat,
	getProviderStat,
	manageDocumentation,
	getAllUserTransactionAmount,
	manageEducationBundle,
})(DataProvider);
