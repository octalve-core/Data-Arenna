import { clearErrors, returnErrors } from "../Reducer/ErrorReducer";
import axios from "axios";
import { toast } from "react-toastify";
import {
	ACTIVATE_USER,
	ACTIVATE_USER_FAIL,
	ADD_NOTIFICATONS,
	ADD_NOTIFICATONS_FAIL,
	DELETE_NOTIFICATONS,
	GET_ALL_USERS,
	GET_ALL_USERS_FAIL,
	GET_ALL_USERS_LOADING,
	GET_FULL_USERS,
	GET_FULL_USERS_FAIL,
	GET_PROVIDER_BALANCE,
	GET_PROVIDER_BALANCE_FAIL,
	GET_MY_NOTIFICATONS,
	GET_MY_NOTIFICATONS_FAIL,
	GET_NOTIFICATONS,
	GET_NOTIFICATONS_FAIL,
	GET_PENDING_HISTORY,
	GET_PENDING_HISTORY_CARD,
	GET_PENDING_HISTORY_CARD_FAIL,
	GET_PENDING_HISTORY_FAIL,
	GET_PENDING_HISTORY_VIRTUAL,
	GET_PENDING_HISTORY_VIRTUAL_FAIL,
	PURCHASE_HISTORY_USER,
	PURCHASE_HISTORY_USER_FAIL,
	PURCHASE_HISTORY_USER_LOADING,
	SEARCH_ALL_USERS,
	SEARCH_ALL_USERS_FAIL,
	SEARCH_ALL_USERS_LOADING,
	SEARCH_PENDING_HISTORY,
	SEARCH_PENDING_HISTORY_CARD,
	SEARCH_PENDING_HISTORY_CARD_FAIL,
	SEARCH_PENDING_HISTORY_FAIL,
	SEARCH_PENDING_HISTORY_LOADING,
	SEARCH_PENDING_HISTORY_VIRTUAL,
	SEARCH_PENDING_HISTORY_VIRTUAL_FAIL,
	SET_SUCCESS,
	UPDATE_NOTIFICATONS,
	UPDATE_PENDING_HISTORY,
	UPDATE_PENDING_HISTORY_FAIL,
	WALLET_HISTORY_USER,
	WALLET_HISTORY_USER_FAIL,
	WALLET_HISTORY_USER_LOADING,
	MANAGE_WALLET_PIN,
	TRANSFER_FUND_FAIL,
	SEARCH_PROVIDER_LOADING,
	SEARCH_PROVIDER,
	GET_MONNIFY,
	GET_FLUTTERWAVE,
	GET_PAYSTACK,
	GET_MANUAL,
	SEARCH_PROVIDER_FAIL,
	GET_PROVIDER_FAIL,
	DELETE_USER,
	TRANSACTION_DETAILS,
} from "./ActionTypes";
import { getWalletBalance } from "./GeneralAction";

export const loadFullUser = () => async dispatch => {
	dispatch(clearErrors());
	try {
		let res = await axios.get(`/api/v1/user/manage-users/all-users`);
		dispatch({
			type: GET_FULL_USERS,
			payload: res.data,
		});
	} catch (err) {
		if (err) console.log(err.response?.data?.error, { err });
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
		dispatch({
			type: GET_FULL_USERS_FAIL,
		});
	}
};

export const loadAllUser = (data, load) => async dispatch => {
	dispatch(clearErrors());
	if (data?.search) dispatch({ type: SEARCH_ALL_USERS_LOADING });
	else if (load) dispatch({ type: GET_ALL_USERS_LOADING });
	try {
		let res = await axios.get(
			`/api/v1/user/manage-users?type=user
			${data?.limit ? `&limit=${data?.limit}` : ""}
			${data?.search ? `&search=${data?.search}` : ""}
			`
		);
		dispatch({
			type: data?.search ? SEARCH_ALL_USERS : GET_ALL_USERS,
			payload: res.data,
			search: data?.search ? data?.search : "",
		});
	} catch (err) {
		if (err) console.log(err.response?.data?.error, { err });
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
		dispatch({
			type: data?.search ? SEARCH_ALL_USERS_FAIL : GET_ALL_USERS_FAIL,
		});
	}
};

export const getProviderBalance = () => async dispatch => {
	dispatch(clearErrors());
	try {
		let res = await axios.get(`/api/v1/wallet/get-provider-balance`);
		dispatch({
			type: GET_PROVIDER_BALANCE,
			payload: res.data,
		});
	} catch (err) {
		if (err) console.log(err.response?.data?.error, { err });
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
		dispatch({ type: GET_PROVIDER_BALANCE_FAIL });
	}
};

export const getNotify = (type, data) => async dispatch => {
	dispatch(clearErrors());
	try {
		let res = await axios.get(
			`/api/v1/notification?type=${type}${
				data?.limit ? `&limit=${data?.limit}` : ""
			}`
		);
		dispatch({
			type: type !== "incoming" ? GET_MY_NOTIFICATONS : GET_NOTIFICATONS,
			payload: res.data,
		});
	} catch (err) {
		if (err) console.log(err.response?.data?.error, { err });
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
		dispatch({
			type:
				type !== "incoming" ? GET_MY_NOTIFICATONS_FAIL : GET_NOTIFICATONS_FAIL,
		});
	}
};

export const manageNotify = (data, id, prior) => async dispatch => {
	try {
		let res;
		if (!id) res = await axios.post(`/api/v1/notification`, { ...data });
		else if (prior === "delete")
			res = await axios.delete(`/api/v1/notification/${id}`);
		else if (prior) res = await axios.put(`/api/v1/notification/${id}`);
		else res = await axios.post(`/api/v1/notification/${id}`);
		dispatch({
			type: id
				? prior === "delete"
					? DELETE_NOTIFICATONS
					: UPDATE_NOTIFICATONS
				: ADD_NOTIFICATONS,
			payload: prior === "delete" ? data : res.data,
		});
		if (!id || prior === "delete")
			dispatch({ type: SET_SUCCESS, payload: res?.data?.msg });
	} catch (err) {
		if (err) console.log(err.response?.data?.error, { err });
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
		let error = err.response?.data?.error;
		if (error) dispatch(returnErrors({ error, status: err?.response?.status }));
		// error.forEach(error =>
		// 	error?.param
		// 		? error?.param !== "suggestion" &&
		// 		  toast.error(error.msg, { autoClose: false })
		// 		: toast.error(error.msg, { autoClose: false })
		// );
		dispatch({ type: ADD_NOTIFICATONS_FAIL });
	}
};

export const manageUserActiveness =
	(id, action, change, get, data) => async dispatch => {
		console.log({ id, action, change, get, data });
		try {
			if (get) {
				if (action === "wallet")
					dispatch({ type: WALLET_HISTORY_USER_LOADING });
				if (action === "purchase")
					dispatch({ type: PURCHASE_HISTORY_USER_LOADING });
			}
			let res;
			if (get)
				res = await axios.get(`/api/v1/user/manage-users/${id}?type=${action}`);
			else if (data && action === "delete")
				res = await axios.delete(`/api/v1/user/manage-users/${id}`);
			else if (data)
				res = await axios.patch(
					`/api/v1/user/manage-users/${id}?type=${action}`,
					{ ...data }
				);
			else if (!change)
				res = await axios.post(
					`/api/v1/user/manage-users/${id}?type=${action}`
				);
			else
				res = await axios.put(`/api/v1/user/manage-users/${id}?type=${action}`);
			dispatch({
				type: get
					? action === "wallet"
						? WALLET_HISTORY_USER
						: PURCHASE_HISTORY_USER
					: action === "delete"
					? DELETE_USER
					: ACTIVATE_USER,
				payload: action === "delete" ? data : res.data,
			});
			if (!get) dispatch({ type: SET_SUCCESS, payload: res?.data?.msg });
		} catch (err) {
			if (err) console.log(err.response?.data?.error, { err });
			if (err?.response?.status === 429 || err?.response?.status === 405)
				toast.error(err?.response?.data ? err?.response?.data : err?.message);
			if (!get) {
				let error = err.response?.data?.error;
				if (error)
					dispatch(returnErrors({ error, status: err?.response?.status }));
			}
			dispatch({
				type: get
					? action === "wallet"
						? WALLET_HISTORY_USER_FAIL
						: PURCHASE_HISTORY_USER_FAIL
					: ACTIVATE_USER_FAIL,
			});
		}
	};

export const loadAllPending = data => async dispatch => {
	dispatch(clearErrors());
	if (data?.search) dispatch({ type: SEARCH_PENDING_HISTORY_LOADING });
	try {
		let res = await axios.get(
			`/api/v1/wallet/manage-pending-history?type=${data?.type}
			${data?.limit ? `&limit=${data?.limit}` : ""}
			${data?.search ? `&search=${data?.search}` : ""}
			`
		);
		dispatch({
			type:
				data?.type === "virtual"
					? data?.search
						? SEARCH_PENDING_HISTORY_VIRTUAL
						: GET_PENDING_HISTORY_VIRTUAL
					: data?.type === "card"
					? data?.search
						? SEARCH_PENDING_HISTORY_CARD
						: GET_PENDING_HISTORY_CARD
					: data?.type === "transfer"
					? data?.search
						? SEARCH_PENDING_HISTORY
						: GET_PENDING_HISTORY
					: "",
			payload: res.data,
			search: data?.search ? data?.search : "",
		});
	} catch (err) {
		if (err) console.log(err.response?.data?.error, { err });
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
		dispatch({
			type:
				data?.type === "virtual"
					? data?.search
						? SEARCH_PENDING_HISTORY_VIRTUAL_FAIL
						: GET_PENDING_HISTORY_VIRTUAL_FAIL
					: data?.type === "card"
					? data?.search
						? SEARCH_PENDING_HISTORY_CARD_FAIL
						: GET_PENDING_HISTORY_CARD_FAIL
					: data?.type === "transfer"
					? data?.search
						? SEARCH_PENDING_HISTORY_FAIL
						: GET_PENDING_HISTORY_FAIL
					: "",
		});
	}
};

export const updatePending = (data, decline) => async dispatch => {
	dispatch(clearErrors());
	try {
		let res = await axios.put(
			`/api/v1/wallet/manage-pending-history/${data?._id}${
				decline ? `?decline=${decline}` : ""
			}
			`,
			{ ...data }
		);
		dispatch({
			type: UPDATE_PENDING_HISTORY,
			payload: res.data,
		});
		dispatch(getWalletBalance());
		dispatch(loadAllUser());
		dispatch({ type: SET_SUCCESS, payload: res?.data?.msg });
	} catch (err) {
		if (err) console.log(err.response?.data?.error, { err });
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
		let error = err.response?.data?.error;
		if (error) dispatch(returnErrors({ error, status: err?.response?.status }));
		dispatch({
			type: UPDATE_PENDING_HISTORY_FAIL,
		});
	}
};

export const manageWalletPin = (method, data) => async dispatch => {
	try {
		let res;
		if (method === "post")
			res = await axios.post(`/api/v1/wallet/manage-wallet-pin`, { ...data });
		else res = await axios.put(`/api/v1/wallet/manage-wallet-pin`, { ...data });
		dispatch({
			type: MANAGE_WALLET_PIN,
			payload: res.data,
		});
		dispatch(getWalletBalance());
		dispatch({ type: SET_SUCCESS, payload: res?.data?.msg });
	} catch (err) {
		if (err) console.log(err.response?.data?.error, { err });
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
		let error = err.response?.data?.error;
		if (error) dispatch(returnErrors({ error, status: err?.response?.status }));
		dispatch({ type: TRANSFER_FUND_FAIL });
	}
};

export const findProviderFunding = data => async dispatch => {
	if (data?.search)
		dispatch({ type: SEARCH_PROVIDER_LOADING, search: data?.search });
	try {
		let res = await axios.post(
			`/api/v1/wallet/manage-wallet-provider
			${data?.provider ? `?provider=${data?.provider}` : ""}
			${data?.search ? `&search=${data?.search}` : ""}
			${data?.limit ? `&limit=${data?.limit}` : ""}
			`,
			{ ...data }
		);

		dispatch({
			type: data?.search
				? SEARCH_PROVIDER
				: data?.provider === "monnify"
				? GET_MONNIFY
				: data?.provider === "flutterwave"
				? GET_FLUTTERWAVE
				: data?.provider === "paystack"
				? GET_PAYSTACK
				: data?.provider === "manual"
				? GET_MANUAL
				: null,
			payload: res.data,
			data,
			search: data?.search
				? res?.data?.search
					? res?.data?.search
					: data?.search
				: "",
		});
	} catch (err) {
		if (err) console.log(err.response?.data?.error, { err });
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
		let error = err.response?.data?.error;
		if (error && data?.search) {
			dispatch(returnErrors({ error, status: err?.response?.status }));
		}
		dispatch({ type: data?.search ? SEARCH_PROVIDER_FAIL : GET_PROVIDER_FAIL });
	}
};

export const getAllUserTransactionAmount = notransact => async dispatch => {
	try {
		let res = await axios.put(
			`/api/v1/user/manage-users/all-users?type=all${
				notransact ? `&notransact=notransact` : ""
			}`
		);

		dispatch({
			type: TRANSACTION_DETAILS,
			payload: res.data,
		});
	} catch (err) {
		if (err) console.log({ err });
		if (err) console.log(err?.response ? err?.response?.data : err?.message);
	}
};