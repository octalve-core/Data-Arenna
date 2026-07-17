import axios from "axios";
import { toast } from "react-toastify";
import {
	GENERATE_DOC,
	GENERATE_DOC_FAIL,
	GET_DOC,
	GET_SETTINGS,
	LOGOUT,
	SET_SUCCESS,
	UPDATE_SETTINGS,
	UPDATE_SETTINGS_FAIL,
} from "../Actions/ActionTypes";
import { returnErrors } from "./ErrorReducer";

let initialState = {
	settings: null,
	isUpdated: null,
};

const SettingsReducer = (state = initialState, action) => {
	let { type, payload } = action;
	switch (type) {
		case GET_SETTINGS:
			// console.log({ payload });
			return { ...state, settings: payload };
		case UPDATE_SETTINGS:
			return { ...state, settings: payload, isUpdated: true };
		case UPDATE_SETTINGS_FAIL:
			return { ...state, isUpdated: false };
		case LOGOUT:
			return initialState;
		default:
			return state;
	}
};

export default SettingsReducer;

export const getSettings = data => async dispatch => {
	try {
		let res;
		if (!data) res = await axios.get(`api/v1/settings`);
		else res = await axios.post(`api/v1/settings`, { ...data });
		// console.log({ data: res?.data });
		dispatch({
			type: !data ? GET_SETTINGS : UPDATE_SETTINGS,
			payload: res.data.data,
		});
		if (data) dispatch({ type: SET_SUCCESS, payload: res?.data?.msg });
	} catch (err) {
		if (err) console.log(err.response?.data?.error, { err });
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
		let error = err.response?.data?.error;
		if (error) dispatch(returnErrors({ error, status: err?.response?.status }));
		dispatch({ type: UPDATE_SETTINGS_FAIL });
	}
};


const initialDoc = {
	doc: null,
	isGen: false,
};

export const docReducer = (state = initialDoc, { type, payload }) => {
	let data = payload?.data || payload;
	switch (type) {
		case GET_DOC:
			return {
				...state,
				doc: data,
			};
		case GENERATE_DOC:
			return { ...state, doc: data, isGen: true };
		case GENERATE_DOC_FAIL:
			return { ...state, isGen: false };
		case LOGOUT:
			return initialDoc;
		default:
			return state;
	}
};

export const manageDocumentation = data => async dispatch => {
	try {
		let res;
		if (data === "post") res = await axios.post(`/api/v1/keys`, { ...data });
		else res = await axios.get(`/api/v1/keys`, { ...data });
		dispatch({
			type: data === "post" ? GENERATE_DOC : GET_DOC,
			payload: res.data,
		});
		if (data === "post")
			dispatch({ type: SET_SUCCESS, payload: res?.data?.msg });
	} catch (err) {
		if (err) console.log(err.response?.data?.error, { err });
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
		let error = err.response?.data?.error;
		if (error && data === "post")
			dispatch(returnErrors({ error, status: err?.response?.status }));
		dispatch({ type: GENERATE_DOC_FAIL });
	}
};