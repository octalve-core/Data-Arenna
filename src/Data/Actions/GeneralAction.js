import axios from "axios";
import { toast } from "react-toastify";
import { returnErrors } from "../Reducer/ErrorReducer";
import {
	ADD_AIRTIME,
	ADD_AIRTIME_CONVERTER,
	ADD_AIRTIME_CONVERTER_FAIL,
	ADD_AIRTIME_FAIL,
	ADD_AIRTIME_PIN,
	ADD_AIRTIME_PIN_FAIL,
	ADD_CABLE,
	ADD_CABLE_FAIL,
	ADD_CONVERTER_NUMBER,
	ADD_CONVERTER_NUMBER_FAIL,
	ADD_DATA,
	ADD_DATA_FAIL,
	ADD_EDUCATION,
	ADD_EDUCATION_FAIL,
	ADD_ELECTRICITY,
	ADD_ELECTRICITY_FAIL,
	ADD_FAQS,
	ADD_FAQS_FAIL,
	ADD_FUND,
	ADD_FUND_FAIL,
	ADD_MANUAL_BANKS,
	ADD_MANUAL_BANKS_FAIL,
	CREATE_DATA,
	CREATE_DATA_FAIL,
	DATA_TRANSACTIONS_STAT,
	DELETE_DATA,
	DELETE_FAQS,
	DELETE_MANUAL_BANKS,
	DELETE_MULTIPLE_TRANSACTION,
	DELETE_TRANSACTION,
	DELETE_TRANSACTION_FAIL,
	FIND_TRANSACTIONS_STAT,
	FUND_WALLET,
	FUND_WALLET_FAIL,
	FUND_WALLET_FLUTTERWAVE,
	FUND_WALLET_FLUTTERWAVE_FAIL,
	GENERATE_VIRTUAL,
	GENERATE_VIRTUAL_CEBIZ,
	GENERATE_VIRTUAL_CEBIZ_FAIL,
	GENERATE_VIRTUAL_FAIL,
	GET_AIRTIME,
	GET_AIRTIME_CONVERTER,
	GET_AIRTIME_CONVERTER_FAIL,
	GET_AIRTIME_FAIL,
	GET_AIRTIME_PIN,
	GET_AIRTIME_PIN_FAIL,
	GET_ALL_BONUS,
	GET_ALL_MANUAL,
	GET_ALL_TRANSACTIONS,
	GET_ALL_TRANSACTIONS_FAIL,
	GET_BANKS,
	GET_BANKS_FAIL,
	GET_BONUS,
	GET_CABLE,
	GET_CABLE_DIRECT_PACKAGE,
	GET_CABLE_DIRECT_PACKAGE_FAIL,
	GET_CABLE_DIRECT_TYPE,
	GET_CABLE_DIRECT_TYPE_FAIL,
	GET_CABLE_FAIL,
	GET_CARDS,
	GET_CARDS_FAIL,
	GET_COMMISSION,
	GET_CONVERTER_NUMBER,
	GET_CONVERTER_NUMBER_FAIL,
	GET_CREATE_DATA,
	GET_CREATE_DATA_FAIL,
	GET_DATA,
	GET_DATA_DIRECT,
	GET_DATA_DIRECT_FAIL,
	GET_DATA_FAIL,
	GET_DATA_TRANSACTIONS,
	GET_DATA_TRANSACTIONS_FAIL,
	GET_DAY_TRANSACTIONS,
	GET_DAY_TRANSACTIONS_FAIL,
	GET_EDUCATION,
	GET_EDUCATION_FAIL,
	GET_EDUCATION_TO_BUY,
	GET_EDUCATION_TO_BUY_FAIL,
	GET_ELECTRICITY,
	GET_ELECTRICITY_DIRECT,
	GET_ELECTRICITY_DIRECT_FAIL,
	GET_ELECTRICITY_FAIL,
	GET_FAQS,
	GET_GENERAL_REFERRAL,
	GET_ALL_REFERRAL,
	GET_MANUAL_BANKS,
	GET_MONTH_TRANSACTIONS,
	GET_MONTH_TRANSACTIONS_FAIL,
	GET_MY_DAY_TRANSACTIONS,
	GET_MY_DAY_TRANSACTIONS_FAIL,
	GET_MY_MONTH_TRANSACTIONS,
	GET_MY_MONTH_TRANSACTIONS_FAIL,
	GET_MY_TRANSACTIONS,
	GET_MY_TRANSACTIONS_FAIL,
	GET_NETWORK,
	GET_NETWORK_FAIL,
	GET_NETWORK_LOADING,
	GET_REFERRAL,
	GET_WALLET,
	GET_WALLET_BALANCE,
	GET_WALLET_BALANCE_FAIL,
	GET_WALLET_DETAILS,
	GET_WALLET_FAIL,
	GIVE_BONUS,
	GIVE_BONUS_FAIL,
	MANUAL_DEBIT,
	MANUAL_DEBIT_FAIL,
	MANUAL_TRANSACTION,
	MANUAL_TRANSACTION_FAIL,
	MOVE_BONUS,
	MOVE_BONUS_FAIL,
	MOVE_COMMISSION,
	MOVE_COMMISSION_FAIL,
	MOVE_REFERRAL,
	MOVE_REFERRAL_FAIL,
	SEARCH_AIRTIME,
	SEARCH_AIRTIME_FAIL,
	SEARCH_AIRTIME_LOADING,
	SEARCH_AIRTIME_PIN,
	SEARCH_AIRTIME_PIN_FAIL,
	SEARCH_AIRTIME_PIN_LOADING,
	SEARCH_AIRTIME_RELOAD,
	SEARCH_ALL_USERS_RELOAD,
	SEARCH_CABLE,
	SEARCH_CABLE_FAIL,
	SEARCH_CABLE_LOADING,
	SEARCH_CABLE_RELOAD,
	SEARCH_CONVERTER_RELOAD,
	SEARCH_DATA,
	SEARCH_DATA_FAIL,
	SEARCH_DATA_LOADING,
	SEARCH_DATA_RELOAD,
	SEARCH_EDUCATION,
	SEARCH_EDUCATION_FAIL,
	SEARCH_EDUCATION_LOADING,
	SEARCH_EDUCATION_RELOAD,
	SEARCH_ELECTRICITY,
	SEARCH_ELECTRICITY_FAIL,
	SEARCH_ELECTRICITY_LOADING,
	SEARCH_ELECTRICITY_RELOAD,
	SEARCH_MY_TRANSACTION,
	SEARCH_MY_TRANSACTION_FAIL,
	SEARCH_MY_TRANSACTION_LOADING,
	SEARCH_MY_TRANSACTION_RELOAD,
	SEARCH_PENDING_HISTORY_CARD_RELOAD,
	SEARCH_PENDING_HISTORY_RELOAD,
	SEARCH_PENDING_HISTORY_VIRTUAL_RELOAD,
	SEARCH_RELOAD,
	SEARCH_TRANSACTION,
	SEARCH_TRANSACTION_FAIL,
	SEARCH_TRANSACTION_LOADING,
	SEARCH_TRANSACTION_RELOAD,
	SEARCH_WALLET,
	SEARCH_WALLET_FAIL,
	SEARCH_WALLET_LOADING,
	SEARCH_WALLET_RELOAD,
	SET_SUCCESS,
	TRANSACTIONS_STAT,
	TRANSFER_FUND,
	TRANSFER_FUND_FAIL,
	UPDATE_CONVERTER_DETAIL,
	UPDATE_CONVERTER_DETAIL_FAIL,
	UPDATE_CONVERTER_NUMBER,
	UPDATE_CONVERTER_NUMBER_FAIL,
	UPDATE_DATA,
	UPDATE_FAQS,
	UPDATE_MULTIPLE_TRANSACTION,
	UPDATE_TRANSACTION,
	UPDATE_TRANSACTION_FAIL,
	UPDATE_WALLET,
	UPDATE_WALLET_FAIL,
	WALLET_PROVIDER_STAT,
	DELETE_EDUCATION_BUNDLE,
	UPDATE_EDUCATION_BUNDLE,
	ADD_EDUCATION_BUNDLE,
	ADD_EDUCATION_BUNDLE_FAIL,
} from "./ActionTypes";
import {
	loadAllPending,
	loadAllUser,
	loadFullUser,
	manageUserActiveness,
} from "./UserActions";
import { imageUpload } from "./AuthActions";

export const getDirectDatas = type => async dispatch => {
	try {
		if (type === "network") dispatch({ type: GET_NETWORK_LOADING });
		let res = await axios.get(`/api/v1/direct/${type}`);

		dispatch({
			type:
				type === "cables-packages"
					? GET_CABLE_DIRECT_PACKAGE
					: type === "cables-types"
					? GET_CABLE_DIRECT_TYPE
					: type === "data"
					? GET_DATA_DIRECT
					: type === "electricity"
					? GET_ELECTRICITY_DIRECT
					: type === "education"
					? GET_EDUCATION_TO_BUY
					: type === "network"
					? GET_NETWORK
					: null,
			payload: res.data,
		});
	} catch (err) {
		if (err) console.log({ err });
		if (err) console.log(err?.response ? err?.response?.data : err?.message);
		dispatch({
			type:
				type === "cables-packages"
					? GET_CABLE_DIRECT_PACKAGE_FAIL
					: type === "cables-types"
					? GET_CABLE_DIRECT_TYPE_FAIL
					: type === "data"
					? GET_DATA_DIRECT_FAIL
					: type === "electricity"
					? GET_ELECTRICITY_DIRECT_FAIL
					: type === "education"
					? GET_EDUCATION_TO_BUY_FAIL
					: type === "network"
					? GET_NETWORK_FAIL
					: null,
		});
	}
};

export const getServicesHistory = (type, data) => async dispatch => {
	try {
		if (data?.search) {
			dispatch({
				type:
					type === "cables"
						? SEARCH_CABLE_LOADING
						: type === "airtime"
						? SEARCH_AIRTIME_LOADING
						: type === "airtime_pin"
						? SEARCH_AIRTIME_PIN_LOADING
						: type === "data"
						? SEARCH_DATA_LOADING
						: type === "electricity"
						? SEARCH_ELECTRICITY_LOADING
						: type === "education"
						? SEARCH_EDUCATION_LOADING
						: type === "all"
						? SEARCH_TRANSACTION_LOADING
						: null,
			});
		}
		let res = await axios.get(
			`/api/v1/transactions?type=${type}${
				data?.limit ? `&limit=${data?.limit}` : ""
			}
			${data?.user ? `&user=${data?.user}` : ""}
			${data?.search ? `&search=${data?.search}` : ""}
			${type === "all" && data?.streamline ? `&streamline=${data?.streamline}` : ""}${
				data?.filter ? data?.filter : ""
			}
			`
		);
		dispatch({
			type:
				type === "cables"
					? data?.search || data?.filter
						? SEARCH_CABLE
						: GET_CABLE
					: type === "airtime"
					? data?.search || data?.filter
						? SEARCH_AIRTIME
						: GET_AIRTIME
					: type === "airtime_pin"
					? data?.search || data?.filter
						? SEARCH_AIRTIME_PIN
						: GET_AIRTIME_PIN
					: type === "data"
					? data?.search || data?.filter
						? SEARCH_DATA
						: GET_DATA
					: type === "electricity"
					? data?.search || data?.filter
						? SEARCH_ELECTRICITY
						: GET_ELECTRICITY
					: type === "education"
					? data?.search || data?.filter
						? SEARCH_EDUCATION
						: GET_EDUCATION
					: type === "all"
					? data?.search || data?.filter
						? SEARCH_TRANSACTION
						: data?.streamline === "day"
						? GET_DAY_TRANSACTIONS
						: data?.streamline === "month"
						? GET_MONTH_TRANSACTIONS
						: GET_ALL_TRANSACTIONS
					: null,
			payload: res.data,
			search: data?.search ? data?.search : "",
		});
	} catch (err) {
		if (err) console.log({ err });
		if (err) console.log(err?.response ? err?.response?.data : err?.message);
		dispatch({
			type:
				type === "cables"
					? data?.search
						? SEARCH_CABLE_FAIL
						: GET_CABLE_FAIL
					: type === "airtime"
					? data?.search
						? SEARCH_AIRTIME_FAIL
						: GET_AIRTIME_FAIL
					: type === "airtime_pin"
					? data?.search
						? SEARCH_AIRTIME_PIN_FAIL
						: GET_AIRTIME_PIN_FAIL
					: type === "data"
					? data?.search
						? SEARCH_DATA_FAIL
						: GET_DATA_FAIL
					: type === "electricity"
					? data?.search
						? SEARCH_ELECTRICITY_FAIL
						: GET_ELECTRICITY_FAIL
					: type === "education"
					? data?.search
						? SEARCH_EDUCATION_FAIL
						: GET_EDUCATION_FAIL
					: type === "all"
					? data?.search
						? SEARCH_TRANSACTION_FAIL
						: data?.streamline === "day"
						? GET_DAY_TRANSACTIONS_FAIL
						: data?.streamline === "month"
						? GET_MONTH_TRANSACTIONS_FAIL
						: GET_ALL_TRANSACTIONS_FAIL
					: null,
		});
	}
};

export const buyServices = (type, data) => async dispatch => {
	try {
		let res = await axios.post(`/api/v1/${type}/buy`, { ...data });

		dispatch({
			type:
				type === "data"
					? ADD_DATA
					: type === "cables"
					? ADD_CABLE
					: type === "airtime"
					? ADD_AIRTIME
					: type === "airtime_pin"
					? ADD_AIRTIME_PIN
					: type === "electricity"
					? ADD_ELECTRICITY
					: type === "education"
					? ADD_EDUCATION
					: null,
			payload: res.data,
		});
		dispatch(getWalletBalance());
		dispatch(getWalletHistory("wallet"));
		dispatch(getWalletHistory("commission"));
		// toast.success(res?.data?.msg);
		dispatch({ type: SET_SUCCESS, payload: res?.data?.msg });
	} catch (err) {
		if (err) console.log({ err });
		if (err) console.log(err?.response ? err?.response?.data : err?.message);
		let error = err.response?.data?.error;
		if (error) dispatch(returnErrors({ error, status: err?.response?.status }));
		// error.forEach(error =>
		// 	error?.param
		// 		? error?.param !== "suggestion" &&
		// 		  toast.error(error.msg, { autoClose: false })
		// 		: toast.error(error.msg, { autoClose: false })
		// );
		dispatch({
			type:
				type === "data"
					? ADD_DATA_FAIL
					: type === "cables"
					? ADD_CABLE_FAIL
					: type === "airtime"
					? ADD_AIRTIME_FAIL
					: type === "airtime"
					? ADD_AIRTIME_PIN_FAIL
					: type === "electricity"
					? ADD_ELECTRICITY_FAIL
					: type === "education"
					? ADD_EDUCATION_FAIL
					: null,
		});
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
	}
};

export const converterServices = (method, type, data, id) => async dispatch => {
	try {
		let res;
		// console.log({ data });
		if (method === "put") {
			res = await axios.put(`/api/v1/airtime/${type}${id ? `/${id}` : ""}`, {
				...data,
			});

			dispatch({
				type:
					type === "converter"
						? id
							? UPDATE_CONVERTER_DETAIL
							: ADD_AIRTIME_CONVERTER
						: type === "converter-number"
						? id
							? UPDATE_CONVERTER_NUMBER
							: ADD_CONVERTER_NUMBER
						: null,
				payload: res.data,
			});
		} else if (method === "post") {
			res = await axios.post(`/api/v1/airtime/${type}${id ? `/${id}` : ""}`, {
				...data,
			});

			dispatch({
				type:
					type === "converter"
						? id
							? UPDATE_CONVERTER_DETAIL
							: ADD_AIRTIME_CONVERTER
						: type === "converter-number"
						? id
							? UPDATE_CONVERTER_NUMBER
							: ADD_CONVERTER_NUMBER
						: null,
				payload: res.data,
			});
		} else {
			res = await axios.get(
				`/api/v1/airtime/${type}${data?.limit ? `?limit=${data?.limit}` : ""}`
			);

			dispatch({
				type:
					type === "converter"
						? GET_AIRTIME_CONVERTER
						: type === "banks"
						? GET_BANKS
						: type === "converter-number"
						? GET_CONVERTER_NUMBER
						: null,
				payload: res.data,
			});
		}
		// console.log({ data: res?.data });
		if (method === "post" || method === "put") {
			// toast.success(res?.data?.msg);
			dispatch({ type: SET_SUCCESS, payload: res?.data?.msg });
		}
	} catch (err) {
		if (err) console.log({ err });
		if (err) console.log(err?.response ? err?.response?.data : err?.message);
		let error = err.response?.data?.error;
		if (method === "post" || method === "put") {
			if (error)
				dispatch(returnErrors({ error, status: err?.response?.status }));
			// error.forEach(error =>
			// 	error?.param
			// 		? error?.param !== "suggestion" &&
			// 		  toast.error(error.msg, { autoClose: false })
			// 		: toast.error(error.msg, { autoClose: false })
			// );
		}
		dispatch({
			type:
				method === "post" || method === "put"
					? type === "converter"
						? id
							? UPDATE_CONVERTER_DETAIL_FAIL
							: ADD_AIRTIME_CONVERTER_FAIL
						: type === "converter-number"
						? id
							? UPDATE_CONVERTER_NUMBER_FAIL
							: ADD_CONVERTER_NUMBER_FAIL
						: type === "converter"
						? GET_AIRTIME_CONVERTER_FAIL
						: type === "banks"
						? GET_BANKS_FAIL
						: type === "converter-number"
						? GET_CONVERTER_NUMBER_FAIL
						: null
					: null,
		});
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
	}
};

export const dataServices = (method, data) => async dispatch => {
	try {
		let res;
		if (method === "post") {
			res = await axios.post(`/api/v1/data`, { ...data });
		} else if (method === "put") {
			res = await axios.put(`/api/v1/data/${data?._id}`, { ...data });
		} else if (method === "delete") {
			res = await axios.delete(`/api/v1/data/${data?._id}`);
		} else {
			res = await axios.get(`/api/v1/data`);
		}

		dispatch({
			type:
				method === "post"
					? CREATE_DATA
					: method === "put"
					? UPDATE_DATA
					: method === "delete"
					? DELETE_DATA
					: GET_CREATE_DATA,
			payload: method === "delete" ? data : res.data,
		});

		if (method !== "get") {
			// toast.success(res?.data?.msg);
			dispatch({ type: SET_SUCCESS, payload: res?.data?.msg });
		}
	} catch (err) {
		if (err) console.log({ err });
		if (err) console.log(err?.response ? err?.response?.data : err?.message);
		let error = err.response?.data?.error;
		if (method !== "get") {
			if (error)
				dispatch(returnErrors({ error, status: err?.response?.status }));
			// error.forEach(error =>
			// 	error?.param
			// 		? error?.param !== "suggestion" &&
			// 		  toast.error(error.msg, { autoClose: false })
			// 		: toast.error(error.msg, { autoClose: false })
			// );
		}
		dispatch({
			type: method !== "get" ? CREATE_DATA_FAIL : GET_CREATE_DATA_FAIL,
		});
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
	}
};

export const getManualBonusHistory = (type, data) => async dispatch => {
	try {
		let res = await axios.get(
			`/api/v1/wallet/${type}
			${data?.limit ? `?limit=${data?.limit}` : ""}
				`
		);

		dispatch({
			type:
				type === "manual-funding"
					? GET_ALL_MANUAL
					: type === "manage-bonus"
					? GET_ALL_BONUS
					: null,
			payload: res.data,
		});
	} catch (err) {
		if (err) console.log({ err });
		if (err) console.log(err?.response ? err?.response?.data : err?.message);
		dispatch({
			type: GET_WALLET_FAIL,
		});
	}
};

export const getWalletHistory = (type, data) => async dispatch => {
	try {
		if (data?.search) dispatch({ type: SEARCH_WALLET_LOADING });
		let res = await axios.get(
			`/api/v1/wallet?type=${type}
			${data?.limit ? `&limit=${data?.limit}` : ""}
			${data?.user ? `&user=${data?.user}` : ""}
			${data?.search ? `&search=${data?.search}` : ""}
				`
		);

		dispatch({
			type:
				type === "wallet"
					? data?.search
						? SEARCH_WALLET
						: GET_WALLET
					: type === "bonus"
					? GET_BONUS
					: type === "referral"
					? GET_REFERRAL
					: type === "commission"
					? GET_COMMISSION
					: null,
			payload: res.data,
			search: data?.search ? data?.search : "",
		});
	} catch (err) {
		if (err) console.log({ err });
		if (err) console.log(err?.response ? err?.response?.data : err?.message);
		dispatch({
			type: data?.search ? SEARCH_WALLET_FAIL : GET_WALLET_FAIL,
		});
	}
};

export const manageWallet = (type, data, add) => async dispatch => {
	try {
		let res;
		if (add)
			res = await axios.post(`/api/v1/wallet/manage-${type}`, { ...data });
		else res = await axios.put(`/api/v1/wallet/manage-${type}`, { ...data });
		let newType;
		if (add) {
			if (type === "bonus") newType = GIVE_BONUS;
			if (type === "wallet") newType = ADD_FUND;
		} else {
			if (type === "bonus") newType = MOVE_BONUS;
			if (type === "wallet") newType = TRANSFER_FUND;
			if (type === "commission") newType = MOVE_COMMISSION;
			if (type === "referral") newType = MOVE_REFERRAL;
		}

		dispatch({
			type: newType,
			payload: res.data,
		});
		dispatch(getWalletHistory("wallet"));
		dispatch(getWalletHistory("bonus"));
		dispatch(getWalletHistory("commission"));
		dispatch(getWalletHistory("referral"));
		dispatch(getWalletBalance());
		if (add) dispatch(loadAllUser());
		if (type === "wallet") {
			dispatch(loadAllPending());
		}
		// toast?.success(res?.data?.msg, { autoClose: 5000 });
		dispatch({ type: SET_SUCCESS, payload: res?.data?.msg });
	} catch (err) {
		if (err) console.log({ err });
		if (err) console.log(err?.response ? err?.response?.data : err?.message);
		let error = err.response?.data?.error;
		if (error) dispatch(returnErrors({ error, status: err?.response?.status }));

		let newType;
		if (add) {
			if (type === "bonus") newType = GIVE_BONUS_FAIL;
			if (type === "wallet") newType = ADD_FUND_FAIL;
		} else {
			if (type === "bonus") newType = MOVE_BONUS_FAIL;
			if (type === "wallet") newType = TRANSFER_FUND_FAIL;
			if (type === "commission") newType = MOVE_COMMISSION_FAIL;
			if (type === "referral") newType = MOVE_REFERRAL_FAIL;
		}
		dispatch({
			type: newType,
		});
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
	}
};

export const manageFundWallet = (data, update) => async dispatch => {
	try {
		let res;
		if (data)
			if (update)
				res = await axios.put(`/api/v1/wallet/manage-paystack`, { ...data });
			else
				res = await axios.post(`/api/v1/wallet/manage-paystack`, { ...data });

		let newType;
		if (data) {
			dispatch(getWalletBalance());
			dispatch(getCards());
			if (update) newType = UPDATE_WALLET;
			else newType = FUND_WALLET;
		}
		let dataNew = res?.data?.data?._id
			? res?.data?.data?.data
			: res?.data?.data;
		// console.log({ balance: res.data, dataNew });
		dispatch({
			type: newType,
			payload: data ? res?.data : res?.data?.data ? res?.data?.data : res?.data,
			data: dataNew,
		});
		if (data) {
			if (dataNew?.status === "success")
				dispatch({ type: SET_SUCCESS, payload: res?.data?.msg });
			else toast?.success(res?.data?.msg, { autoClose: 5000 });
		}
	} catch (err) {
		if (err) console.log({ err });
		if (err) console.log(err?.response ? err?.response?.data : err?.message);
		let newType;
		let error = err.response?.data?.error;
		if (data) {
			if (error)
				dispatch(returnErrors({ error, status: err?.response?.status }));
			if (update) newType = UPDATE_WALLET_FAIL;
			else newType = FUND_WALLET_FAIL;
		}
		dispatch({
			type: newType,
		});
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
	}
};

export const getReferrals = data => async dispatch => {
	try {
		let res = await axios.get(
			`/api/v1/user/manage-referral?type=all${
				data?.limit ? `&limit=${data?.limit}` : ""
			}${data?.general ? `&allCases=${data?.general}` : ""}`
		);
		dispatch({
			type: data?.general ? GET_ALL_REFERRAL : GET_GENERAL_REFERRAL,
			payload: res?.data,
		});
	} catch (err) {
		if (err) console.log({ err });
		if (err) console.log(err?.response ? err?.response?.data : err?.message);

		dispatch({
			type: MOVE_REFERRAL_FAIL,
		});
	}
};

export const getWalletBalance = () => async dispatch => {
	try {
		let res = await axios.get(`/api/v1/wallet/manage-wallet-balance`);
		dispatch({
			type: GET_WALLET_BALANCE,
			payload: res?.data,
		});
		let res2 = await axios.get(`/api/v1/wallet/manage-wallet`);

		dispatch({
			type: GET_WALLET_DETAILS,
			payload: res2?.data,
		});
	} catch (err) {
		if (err) console.log({ err });
		if (err) console.log(err?.response ? err?.response?.data : err?.message);
		dispatch({
			type: GET_WALLET_BALANCE_FAIL,
		});
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
	}
};

export const manageFundWalletFlutterwave = (data, type) => async dispatch => {
	try {
		let res = await axios.post(`/api/v1/wallet/manage-${type}`, {
			...data,
		});

		let newType;

		dispatch(getWalletBalance());
		dispatch(getCards());
		newType = FUND_WALLET_FLUTTERWAVE;

		let dataNew = res?.data?.data?._id
			? res?.data?.data?.data
			: res?.data?.data;

		dispatch({
			type: newType,
			payload: res?.data,
			data: dataNew,
		});

		if (dataNew?.status === "successful")
			dispatch({ type: SET_SUCCESS, payload: res?.data?.msg });
		else toast?.success(res?.data?.msg, { autoClose: 5000 });
	} catch (err) {
		if (err) console.log({ err });
		if (err) console.log(err?.response ? err?.response?.data : err?.message);
		let newType;
		let error = err.response?.data?.error;

		if (error) dispatch(returnErrors({ error, status: err?.response?.status }));
		newType = FUND_WALLET_FLUTTERWAVE_FAIL;

		dispatch({
			type: newType,
		});
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
	}
};

export const manageFundWalletPaystack = data => async dispatch => {
	try {
		let res = await axios.post(`/api/v1/wallet/manage-paystack`, {
			...data,
		});

		let newType;

		dispatch(getWalletBalance());
		dispatch(getCards());
		newType = FUND_WALLET_FLUTTERWAVE;

		let dataNew = res?.data?.data?._id
			? res?.data?.data?.data
			: res?.data?.data;

		dispatch({
			type: newType,
			payload: res?.data,
			data: dataNew,
		});

		if (dataNew?.status === "success")
			dispatch({ type: SET_SUCCESS, payload: res?.data?.msg });
		else toast?.success(res?.data?.msg, { autoClose: 5000 });
	} catch (err) {
		if (err) console.log({ err });
		if (err) console.log(err?.response ? err?.response?.data : err?.message);
		let newType;
		let error = err.response?.data?.error;

		if (error) dispatch(returnErrors({ error, status: err?.response?.status }));
		// error.forEach(error =>
		// 	error?.param
		// 		? error?.param !== "suggestion" &&
		// 		  toast.error(error.msg, { autoClose: false })
		// 		: toast.error(error.msg, { autoClose: false })
		// );
		newType = FUND_WALLET_FLUTTERWAVE_FAIL;

		dispatch({
			type: newType,
		});
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
	}
};

export const generateVirtual = () => async dispatch => {
	try {
		let res = await axios.post(`/api/v1/wallet/generate-virtual-account`);
		dispatch({
			type: GENERATE_VIRTUAL,
			payload: res?.data,
		});
		// toast?.success(res?.data?.msg, { autoClose: 5000 });
		dispatch({ type: SET_SUCCESS, payload: res?.data?.msg });
		dispatch(getWalletBalance());
	} catch (err) {
		if (err) console.log({ err });
		if (err) console.log(err?.response ? err?.response?.data : err?.message);
		let error = err.response?.data?.error;
		if (error) dispatch(returnErrors({ error, status: err?.response?.status }));
		// error.forEach(error =>
		// 	error?.param
		// 		? error?.param !== "suggestion" &&
		// 		  toast.error(error.msg, { autoClose: false })
		// 		: toast.error(error.msg, { autoClose: false })
		// );

		dispatch({
			type: GENERATE_VIRTUAL_FAIL,
		});
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
	}
};

export const generateVirtualCebiz = () => async dispatch => {
	try {
		let res = await axios.post(`/api/v1/wallet/generate-virtual-account-cebiz`);
		dispatch({
			type: GENERATE_VIRTUAL_CEBIZ,
			payload: res?.data,
		});
		// toast?.success(res?.data?.msg, { autoClose: 5000 });
		dispatch({ type: SET_SUCCESS, payload: res?.data?.msg });
		dispatch(getWalletBalance());
	} catch (err) {
		if (err) console.log({ err });
		if (err) console.log(err?.response ? err?.response?.data : err?.message);
		let error = err.response?.data?.error;
		if (error) dispatch(returnErrors({ error, status: err?.response?.status }));

		dispatch({
			type: GENERATE_VIRTUAL_CEBIZ_FAIL,
		});
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
	}
};

export const getCards = () => async dispatch => {
	try {
		let res = await axios.get(`/api/v1/wallet/manage-card`);
		dispatch({
			type: GET_CARDS,
			payload: res?.data,
		});
	} catch (err) {
		if (err) console.log({ err });
		if (err) console.log(err?.response ? err?.response?.data : err?.message);

		dispatch({
			type: GET_CARDS_FAIL,
		});
	}
};

export const getDataHistory = (data, type) => async dispatch => {
	try {
		if (data?.search) dispatch({ type: SEARCH_MY_TRANSACTION_LOADING });
		let res = await axios.get(
			`/api/v1/transactions/data?type=${type ? type : "data"}
			${data?.limit ? `&limit=${data?.limit}` : ""}
			${data?.search ? `&search=${data?.search}` : ""}
			${type && data?.streamline ? `&streamline=${data?.streamline}` : ""}
			`,
			data?.filter ? { data: data?.filter } : {}
		);
		dispatch({
			type: type
				? data?.search || data?.filter
					? SEARCH_MY_TRANSACTION
					: data?.streamline === "day"
					? GET_MY_DAY_TRANSACTIONS
					: data?.streamline === "month"
					? GET_MY_MONTH_TRANSACTIONS
					: GET_MY_TRANSACTIONS
				: GET_DATA_TRANSACTIONS,
			payload: res?.data,
			search: data?.search ? data?.search : "",
		});

		// console.log({ data: res?.data });
	} catch (err) {
		if (err) console.log({ err });
		if (err) console.log(err?.response ? err?.response?.data : err?.message);

		dispatch({
			type: type
				? data?.search
					? SEARCH_MY_TRANSACTION_FAIL
					: data?.streamline === "day"
					? GET_MY_DAY_TRANSACTIONS_FAIL
					: data?.streamline === "month"
					? GET_MY_MONTH_TRANSACTIONS_FAIL
					: GET_MY_TRANSACTIONS_FAIL
				: GET_DATA_TRANSACTIONS_FAIL,
		});
	}
};

export const getReload = () => async dispatch => {
	dispatch({ type: SEARCH_WALLET_RELOAD });
	dispatch({ type: SEARCH_TRANSACTION_RELOAD });
	dispatch({ type: SEARCH_MY_TRANSACTION_RELOAD });
	dispatch({ type: SEARCH_ALL_USERS_RELOAD });
	dispatch({ type: SEARCH_PENDING_HISTORY_RELOAD });
	dispatch({ type: SEARCH_PENDING_HISTORY_VIRTUAL_RELOAD });
	dispatch({ type: SEARCH_PENDING_HISTORY_CARD_RELOAD });
	dispatch({ type: SEARCH_CONVERTER_RELOAD });
	dispatch({ type: SEARCH_DATA_RELOAD });
	dispatch({ type: SEARCH_AIRTIME_RELOAD });
	dispatch({ type: SEARCH_ELECTRICITY_RELOAD });
	dispatch({ type: SEARCH_CABLE_RELOAD });
	dispatch({ type: SEARCH_EDUCATION_RELOAD });
	dispatch({ type: SEARCH_RELOAD });
};

export const manageTransaction =
	(data, type, criteria, multiple, route) => async dispatch => {
		try {
			let res;
			if (multiple) {
				let datum = [];
				for (let i = 0; i < data.length; i++) {
					datum?.push(data?.[i]?._id);
				}
				res = await axios.put(`/api/v1/transactions/${route}`, { id: datum });
			} else
				res = await axios.put(`/api/v1/transactions/${data?._id}/${route}`);

			dispatch({
				type:
					route === "mark-delete"
						? multiple
							? DELETE_MULTIPLE_TRANSACTION
							: DELETE_TRANSACTION
						: multiple
						? UPDATE_MULTIPLE_TRANSACTION
						: UPDATE_TRANSACTION,
				payload: data,
			});
			if (type === "all") {
				dispatch(
					getServicesHistory("all", {
						limit: criteria?.limit,
						search: criteria?.search,
					})
				);
			} else if (type === "purchase") {
				manageUserActiveness(criteria?.id, "purchase", "", "get");
			}

			dispatch({ type: SET_SUCCESS, payload: res?.data?.msg });
		} catch (err) {
			if (err) console.log({ err });
			if (err) console.log(err?.response ? err?.response?.data : err?.message);

			let error = err.response?.data?.error;
			if (data) {
				if (error)
					dispatch(returnErrors({ error, status: err?.response?.status }));
			}

			dispatch({
				type:
					route === "mark-delete"
						? DELETE_TRANSACTION_FAIL
						: UPDATE_TRANSACTION_FAIL,
			});
		}
	};

export const manualTransactions = data => async dispatch => {
	try {
		let res = await axios.post(`/api/v1/transactions`, { ...data });

		dispatch({
			type: MANUAL_TRANSACTION,
			payload: res.data,
		});
		dispatch(loadFullUser());
		dispatch(loadAllUser());
		dispatch({ type: SET_SUCCESS, payload: res?.data?.msg });
	} catch (err) {
		if (err) console.log({ err });
		if (err) console.log(err?.response ? err?.response?.data : err?.message);
		let error = err.response?.data?.error;
		if (error) dispatch(returnErrors({ error, status: err?.response?.status }));
		dispatch({
			type: MANUAL_TRANSACTION_FAIL,
		});
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
	}
};

export const manualDirectDebit = data => async dispatch => {
	try {
		let res = await axios.post(`/api/v1/wallet/manage-wallet-debit-user`, {
			...data,
		});

		dispatch({
			type: MANUAL_DEBIT,
			payload: res.data,
		});
		dispatch(loadFullUser());
		dispatch(loadAllUser());
		dispatch({ type: SET_SUCCESS, payload: res?.data?.msg });
	} catch (err) {
		if (err) console.log({ err });
		if (err) console.log(err?.response ? err?.response?.data : err?.message);
		let error = err.response?.data?.error;
		if (error) dispatch(returnErrors({ error, status: err?.response?.status }));
		dispatch({
			type: MANUAL_DEBIT_FAIL,
		});
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
	}
};

export const getProviderStat = data => async dispatch => {
	try {
		let res = await axios.get(
			`/api/v1/${
				data?.route === "/manage-wallet-provider" ? "wallet" : "transactions"
			}${data?.route}${data?.year ? `?year=${data?.year}` : ""}`
		);

		dispatch({
			type:
				data?.route === "/manage-transactions"
					? TRANSACTIONS_STAT
					: WALLET_PROVIDER_STAT,
			payload: res.data,
		});
	} catch (err) {
		if (err) console.log(err.response?.data?.error, { err });
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
	}
};

export const findProviderStat = data => async dispatch => {
	try {
		let res = await axios.post(
			`/api/v1/transactions/manage-transactions${
				data?.year ? `?year=${data?.year}` : ""
			}`,
			{ ...data }
		);

		dispatch({
			type: FIND_TRANSACTIONS_STAT,
			payload: res.data,
		});
	} catch (err) {
		if (err) console.log(err.response?.data?.error, { err });
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
		let error = err.response?.data?.error;
		if (error) {
			dispatch(returnErrors({ error, status: err?.response?.status }));
		}
	}
};

export const getDataTransactionStat = data => async dispatch => {
	try {
		let res = await axios.patch(
			`/api/v1/transactions/data${data?.year ? `?year=${data?.year}` : ""}`,
			{ ...data }
		);

		dispatch({
			type: DATA_TRANSACTIONS_STAT,
			payload: res.data,
		});
	} catch (err) {
		if (err) console.log(err.response?.data?.error, { err });
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
		let error = err.response?.data?.error;
		if (error) {
			dispatch(returnErrors({ error, status: err?.response?.status }));
		}
	}
};

export const manageManualBanks = (type, data) => async dispatch => {
	try {
		let res;
		if (type === "post") {
			res = await axios.post(`/api/v1/user/manage-manual-bank`, { ...data });
		} else if (type === "delete")
			res = await axios.delete(
				`/api/v1/user/manage-manual-bank?id=${data?._id}`
			);
		else {
			res = await axios.get(`/api/v1/user/manage-manual-bank`);
		}
		dispatch({
			type:
				type === "delete"
					? DELETE_MANUAL_BANKS
					: type === "post"
					? ADD_MANUAL_BANKS
					: GET_MANUAL_BANKS,
			payload: type === "delete" ? data : res.data?.data,
		});
		if (type !== "get")
			dispatch({ type: SET_SUCCESS, payload: res?.data?.msg });
	} catch (err) {
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
		console.log({ err });
		let error = err.response?.data?.error;
		if (error) {
			dispatch(returnErrors({ error, status: err?.response?.status }));
		}
		dispatch({ type: ADD_MANUAL_BANKS_FAIL });
	}
};

export const manageFaqs = (type, data) => async dispatch => {
	try {
		let res;
		if (type === "post") {
			res = await axios.post(`/api/v1/faqs`, { ...data });
		} else if (type === "put")
			res = await axios.put(`/api/v1/faqs?id=${data?._id}`, { ...data });
		else if (type === "delete")
			res = await axios.delete(`/api/v1/faqs?id=${data?._id}`);
		else {
			res = await axios.get(`/api/v1/faqs`);
		}
		dispatch({
			type:
				type === "delete"
					? DELETE_FAQS
					: type === "post"
					? ADD_FAQS
					: type === "put"
					? UPDATE_FAQS
					: GET_FAQS,
			payload: type === "delete" ? data : res.data?.data,
		});
		if (type !== "get")
			dispatch({ type: SET_SUCCESS, payload: res?.data?.msg });
	} catch (err) {
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
		console.log({ err });
		let error = err.response?.data?.error;
		if (error) {
			dispatch(returnErrors({ error, status: err?.response?.status }));
		}
		dispatch({ type: ADD_FAQS_FAIL });
	}
};

export const manageEducationBundle = (data, id, type) => async dispatch => {
	try {
		let res;
		if (!id) {
			let media = await imageUpload([data?.image]),
				image = media[0];
			res = await axios.post(`/api/v1/education`, { ...data, image });
		} else if (type === "delete")
			res = await axios.delete(`/api/v1/education/${id}`);
		else {
			let image;
			if (data?.image)
				if (!data?.image?._id) {
					let media = await imageUpload([data?.image]);
					image = media[0];
				}
			res = await axios.put(`/api/v1/education/${id}`, {
				...data,
				image: image ? image : data?.image,
			});
		}

		dispatch({
			type: id
				? type === "delete"
					? DELETE_EDUCATION_BUNDLE
					: UPDATE_EDUCATION_BUNDLE
				: ADD_EDUCATION_BUNDLE,
			payload: type === "delete" ? data : res.data?.data,
		});
		dispatch(getDirectDatas("education"));
		dispatch({ type: SET_SUCCESS, payload: res?.data?.msg });
	} catch (err) {
		console.log({ err });
		let error = err.response?.data?.error;
		if (error) {
			dispatch(returnErrors({ error, status: err?.response?.status }));
		}
		if (err?.response?.status === 429) toast.error(err?.response?.data);
		dispatch({ type: ADD_EDUCATION_BUNDLE_FAIL });
	}
};