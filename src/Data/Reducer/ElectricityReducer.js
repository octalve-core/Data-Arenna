import {
	ADD_ELECTRICITY,
	ADD_ELECTRICITY_FAIL,
	DELETE_TRANSACTION,
	DELETE_TRANSACTION_FAIL,
	GET_ELECTRICITY,
	GET_ELECTRICITY_DIRECT,
	GET_ELECTRICITY_FAIL,
	GET_ELECTRICITY_LOADING,
	LOGOUT,
	SEARCH_ELECTRICITY,
	SEARCH_ELECTRICITY_FAIL,
	SEARCH_ELECTRICITY_LOADING,
	SEARCH_ELECTRICITY_RELOAD,
} from "../Actions/ActionTypes";
import { DeleteData } from "./DataReducer";

const initialState = {
	isLoading: false,
	electricity: [],
	electricity_direct: [],
	isAdded: false,
	isDeleted: false,
	isFound: null,
	searchLoading: null,
	mainSearch: [],
	search: "",
	search_paginate: null,
};
const ElectricityReducer = (state = initialState, action) => {
	const { type, payload } = action;
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case SEARCH_ELECTRICITY:
			return {
				...state,
				isFound: true,
				searchLoading: false,
				mainSearch: data,
				search: action.search,
				search_paginate: payload?.paginate,
			};
		case SEARCH_ELECTRICITY_FAIL:
			return {
				...state,
				isFound: false,
				searchLoading: false,
				mainSearch: null,
				search: "",
				search_paginate: null,
			};
		case SEARCH_ELECTRICITY_LOADING:
			return {
				...state,
				searchLoading: true,
			};
		case SEARCH_ELECTRICITY_RELOAD:
			return {
				...state,
				isFound: false,
				searchLoading: false,
			};
		case ADD_ELECTRICITY:
			return {
				...state,
				isAdded: true,
				electricity: [data, ...state.electricity],
				paginate: {
					...state?.paginate,
					result: state?.paginate?.result + 1,
					total: state?.paginate?.total + 1,
				},
			};
		case ADD_ELECTRICITY_FAIL:
			return {
				...state,
				isAdded: false,
				isDeleted: false,
			};
		case GET_ELECTRICITY:
			return {
				...state,
				isLoading: false,
				electricity: data,
				paginate: payload?.paginate,
			};
		case DELETE_TRANSACTION:
			return {
				...state,
				mainSearch: DeleteData(state.mainSearch, payload),
				electricity: DeleteData(state.electricity, payload),
				isDeleted: true,
			};
		case DELETE_TRANSACTION_FAIL:
			return {
				...state,
				isDeleted: false,
			};
		case GET_ELECTRICITY_DIRECT:
			return {
				...state,
				electricity_direct: data,
			};
		case GET_ELECTRICITY_FAIL:
			return {
				...state,
				isLoading: false,
			};
		case GET_ELECTRICITY_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case LOGOUT:
			return initialState;
		default:
			return state;
	}
};

export default ElectricityReducer;
