import {
	GET_PENDING_HISTORY,
	GET_PENDING_HISTORY_CARD,
	GET_PENDING_HISTORY_CARD_FAIL,
	GET_PENDING_HISTORY_FAIL,
	GET_PENDING_HISTORY_VIRTUAL,
	GET_PENDING_HISTORY_VIRTUAL_FAIL,
	LOGOUT,
	SEARCH_PENDING_HISTORY,
	SEARCH_PENDING_HISTORY_CARD,
	SEARCH_PENDING_HISTORY_CARD_FAIL,
	SEARCH_PENDING_HISTORY_CARD_LOADING,
	SEARCH_PENDING_HISTORY_CARD_RELOAD,
	SEARCH_PENDING_HISTORY_FAIL,
	SEARCH_PENDING_HISTORY_LOADING,
	SEARCH_PENDING_HISTORY_RELOAD,
	SEARCH_PENDING_HISTORY_VIRTUAL,
	SEARCH_PENDING_HISTORY_VIRTUAL_FAIL,
	SEARCH_PENDING_HISTORY_VIRTUAL_LOADING,
	SEARCH_PENDING_HISTORY_VIRTUAL_RELOAD,
	UPDATE_PENDING_HISTORY,
	UPDATE_PENDING_HISTORY_FAIL,
} from "../Actions/ActionTypes";
import { EditData } from "./DataReducer";

let init = {
	wallet: [],
	paginate: null,
	isUpdated: null,
	isFound: null,
	searchLoading: null,
	mainSearch: [],
	search: "",
	search_paginate: null,
};

const ManualReducer = (state = init, action) => {
	let { type, payload } = action;
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case SEARCH_PENDING_HISTORY:
			return {
				...state,
				isFound: true,
				searchLoading: false,
				mainSearch: data,
				search: action.search,
				search_paginate: payload?.paginate,
			};
		case SEARCH_PENDING_HISTORY_FAIL:
			return {
				...state,
				isFound: false,
				searchLoading: false,
				mainSearch: null,
				search: "",
				search_paginate: null,
			};
		case SEARCH_PENDING_HISTORY_LOADING:
			return {
				...state,
				searchLoading: true,
			};
		case SEARCH_PENDING_HISTORY_RELOAD:
			return {
				...state,
				isFound: false,
				searchLoading: false,
			};
		case GET_PENDING_HISTORY:
			return { ...state, wallet: data, paginate: payload?.paginate };
		case GET_PENDING_HISTORY_FAIL:
			return { ...state, wallet: state?.wallet };
		case UPDATE_PENDING_HISTORY:
			return {
				...state,
				isUpdated: true,
				wallet: EditData(state.wallet, data),
				mainSearch: EditData(state.mainSearch, data),
			};
		case UPDATE_PENDING_HISTORY_FAIL:
			return { ...state, isUpdated: false };
		case LOGOUT:
			return init;
		default:
			return state;
	}
};

export default ManualReducer;

let init2 = {
	virtual: [],
	paginate: null,
	isUpdated: null,
	isFound: null,
	searchLoading: null,
	mainSearch: [],
	search: "",
	search_paginate: null,
};

export const ManualVirtualReducer = (state = init2, action) => {
	let { type, payload } = action;
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case SEARCH_PENDING_HISTORY_VIRTUAL:
			return {
				...state,
				isFound: true,
				searchLoading: false,
				mainSearch: data,
				search: action.search,
				search_paginate: payload?.paginate,
			};
		case SEARCH_PENDING_HISTORY_VIRTUAL_FAIL:
			return {
				...state,
				isFound: false,
				searchLoading: false,
				mainSearch: null,
				search: "",
				search_paginate: null,
			};
		case SEARCH_PENDING_HISTORY_VIRTUAL_LOADING:
			return {
				...state,
				searchLoading: true,
			};
		case SEARCH_PENDING_HISTORY_VIRTUAL_RELOAD:
			return {
				...state,
				isFound: false,
				searchLoading: false,
			};
		case GET_PENDING_HISTORY_VIRTUAL:
			return { ...state, virtual: data, paginate: payload?.paginate };
		case GET_PENDING_HISTORY_VIRTUAL_FAIL:
			return { ...state, virtual: state?.virtual };
		case UPDATE_PENDING_HISTORY:
			return {
				...state,
				isUpdated: true,
				virtual: EditData(state.virtual, data),
				mainSearch: EditData(state.mainSearch, data),
			};
		case UPDATE_PENDING_HISTORY_FAIL:
			return { ...state, isUpdated: false };
		case LOGOUT:
			return init2;
		default:
			return state;
	}
};

let init3 = {
	card: [],
	paginate: null,
	isUpdated: null,
	isFound: null,
	searchLoading: null,
	mainSearch: [],
	search: "",
	search_paginate: null,
};

export const ManualCardReducer = (state = init3, action) => {
	let { type, payload } = action;
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case SEARCH_PENDING_HISTORY_CARD:
			return {
				...state,
				isFound: true,
				searchLoading: false,
				mainSearch: data,
				search: action.search,
				search_paginate: payload?.paginate,
			};
		case SEARCH_PENDING_HISTORY_CARD_FAIL:
			return {
				...state,
				isFound: false,
				searchLoading: false,
				mainSearch: null,
				search: "",
				search_paginate: null,
			};
		case SEARCH_PENDING_HISTORY_CARD_LOADING:
			return {
				...state,
				searchLoading: true,
			};
		case SEARCH_PENDING_HISTORY_CARD_RELOAD:
			return {
				...state,
				isFound: false,
				searchLoading: false,
			};
		case GET_PENDING_HISTORY_CARD:
			return { ...state, card: data, paginate: payload?.paginate };
		case GET_PENDING_HISTORY_CARD_FAIL:
			return { ...state, card: state?.card };
		case UPDATE_PENDING_HISTORY:
			return {
				...state,
				isUpdated: true,
				card: EditData(state.card, data),
				mainSearch: EditData(state.mainSearch, data),
			};
		case UPDATE_PENDING_HISTORY_FAIL:
			return { ...state, isUpdated: false };
		case LOGOUT:
			return init3;
		default:
			return state;
	}
};
