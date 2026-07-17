import {
	LOGIN_USER,
	LOGIN_USER_FAIL,
	LOGOUT,
	TOKEN,
	GET_USER,
	GET_USER_LOADING,
	GET_USER_FAIL,
	GET_ERRORS_TEXT,
	REGISTER_USER,
	UPDATE_USER,
	REGISTER_USER_FAIL,
	UPDATE_USER_FAIL,
	UPDATE_PASSWORD,
	UPDATE_PASSWORD_FAIL,
} from "./ActionTypes";
import { SetAuthToken } from "../Config";
import axios from "axios";
import { toast } from "react-toastify";
import { clearErrors, returnErrors } from "../Reducer/ErrorReducer";
import {
	dataServices,
	getDirectDatas,
	getServicesHistory,
	getWalletBalance,
	manageManualBanks,
} from "./GeneralAction";
import {
	getAllUserTransactionAmount,
	getNotify,
	getProviderBalance,
	loadAllUser,
	loadFullUser,
} from "./UserActions";
import { getSettings } from "../Reducer/SettingsReducer";
import { getUseCase } from "../Reducer/UseCaseReducer";

// LOGOUT
export const logoutUser = () => async dispatch => {
	dispatch({ type: LOGOUT });
	dispatch(clearErrors());
};

// GET USER INFO
export const loadUser = () => async dispatch => {
	let token = localStorage.getItem(TOKEN);
	if (token) SetAuthToken(token);

	dispatch({ type: GET_USER_LOADING });
	dispatch(clearErrors());
	try {
		let res = await axios.get(`/api/v1/user/register`);
		if (res?.data?.data) {
			dispatch({
				type: GET_USER,
				payload: res.data,
			});
			dispatch(getWalletBalance());
			dispatch(getDirectDatas("network"));
			dispatch(getNotify("incoming"));
			dispatch(getUseCase());
			dispatch(getSettings());
			dispatch(dataServices("get"));
			dispatch(getDirectDatas("data"));
			dispatch(getDirectDatas("education"));
			dispatch(manageManualBanks("get"));
			dispatch(getDirectDatas("electricity"));
			dispatch(getDirectDatas("cables-packages"));
			dispatch(getDirectDatas("cables-types"));
			dispatch(getServicesHistory("all", { streamline: "month" }));
			dispatch(getServicesHistory("all", { streamline: "day" }));
			dispatch(getServicesHistory("all"));
			if (res?.data?.data?.privilege === "agent") {
				dispatch(getAllUserTransactionAmount("notransact"));
				dispatch(loadAllUser(null, "load"));
				dispatch(loadFullUser());
				dispatch(getProviderBalance());
			}
		} else {
			dispatch({ type: GET_USER_FAIL });
		}
	} catch (err) {
		if (err) console.log(err.response?.data?.error, { err });
		if (err?.response?.status === 429) toast.error(err?.response?.data);
		dispatch({ type: GET_USER_FAIL });
		dispatch({
			type: GET_ERRORS_TEXT,
			payload: err?.response?.data?.error
				? err?.response?.data?.error?.[0]?.msg
				: err?.response?.data
				? err?.response?.data
				: err?.message,
		});
	}
};

// LOGIN ACTION
export const loginUser = userData => async dispatch => {
	try {
		let res = await axios.post(`/api/v1/user/login`, { ...userData });
		dispatch(clearErrors());

		dispatch({
			type: LOGIN_USER,
			payload: res.data,
		});
		dispatch(loadUser());
		toast.success(res.data.msg, { autoClose: 5000 });
	} catch (err) {
		console.log({ err });
		let error = err.response?.data?.error;
		dispatch({ type: LOGIN_USER_FAIL });
		if (error) {
			dispatch(returnErrors({ error, status: err?.response?.status }));
			// error.forEach(
			// 	error =>
			// 		error?.param &&
			// 		error?.param !== "suggestion" &&
			// 		toast.error(error.msg)
			// );
		}
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
	}
};

// REGISTER ACTION
export const registerUser = userData => async dispatch => {
	dispatch(clearErrors());
	console.log({ userData });
	try {
		var res = await axios.post("/api/v1/user/register", { ...userData });

		dispatch({
			type: REGISTER_USER,
			payload: res.data,
		});
		toast.success(res.data.msg, { autoClose: 5000 });
	} catch (err) {
		console.log({ err });
		let error = err.response?.data?.error;
		console.log({ error });
		if (error) {
			dispatch(returnErrors({ error, status: err?.response?.status }));
			// error.forEach(
			// 	error =>
			// 		error?.param &&
			// 		error?.param !== "suggestion" &&
			// 		toast.error(error.msg)
			// );
		}
		dispatch({ type: REGISTER_USER_FAIL });

		if (err?.response?.status === 429) toast.error(err?.response?.data);
	}
};

export const updatePassword = userData => async dispatch => {
	dispatch(clearErrors());

	try {
		var res = await axios.put(`/api/v1/user/update-password`, { ...userData });

		dispatch({
			type: UPDATE_PASSWORD,
			payload: res.data,
		});
		toast.success(res.data.msg, { autoClose: 5000 });
	} catch (err) {
		console.log({ err });
		let error = err.response?.data?.error;
		dispatch({ type: UPDATE_PASSWORD_FAIL });
		if (error) {
			dispatch(returnErrors({ error, status: err?.response?.status }));
			// error.forEach(error =>
			// 	error?.param
			// 		? error?.param !== "suggestion" &&
			// 		  toast.error(error.msg, { autoClose: false })
			// 		: toast.error(error.msg, { autoClose: false })
			// );
		}
		if (err?.response?.status === 429) toast.error(err?.response?.data);
	}
};
export const updateUser = (userData, type) => async dispatch => {
	dispatch(clearErrors());

	try {
		var avatar, res;
		if (type === "profile-image") {
			let media = await imageUpload([userData.logo]);
			avatar = media[0];
			// console.log({ avatar, media, userData });
			res = await axios.put(`/api/v1/user/update-avatar`, {
				...userData,
				avatar,
			});
		} else {
			res = await axios.put(`/api/v1/user`, { ...userData });
		}

		dispatch({
			type: UPDATE_USER,
			payload: res.data,
		});
		toast.success(res.data.msg, { autoClose: 5000 });
	} catch (err) {
		console.log({ err });
		let error = err.response?.data?.error;
		dispatch({ type: UPDATE_USER_FAIL });
		if (error) {
			dispatch(returnErrors({ error, status: err?.response?.status }));
			// error.forEach(error =>
			// 	error?.param
			// 		? error?.param !== "suggestion" &&
			// 		  toast.error(error.msg, { autoClose: false })
			// 		: toast.error(error.msg, { autoClose: false })
			// );
		}
		if (err?.response?.status === 429) toast.error(err?.response?.data);
	}
};

export const imageUpload = async images => {
	let imgArr = [];
	for (const item of images) {
		// console.log({ item });
		let post = new FormData();
		post.append(`file`, item);

		let res = await axios.post(`/api/v1/file`, post, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		const data = await res.data?.data;
		// console.log({ data });
		Array.isArray(data) ? (imgArr = [...imgArr, ...data]) : imgArr.push(data);
	}
	return imgArr;
};
