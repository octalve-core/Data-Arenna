import {
	ADD_CABLE,
	ADD_CABLE_FAIL,
	DELETE_TRANSACTION,
	DELETE_TRANSACTION_FAIL,
	GET_CABLE,
	GET_CABLE_DIRECT_PACKAGE,
	GET_CABLE_DIRECT_TYPE,
	GET_CABLE_FAIL,
	GET_CABLE_LOADING,
	LOGOUT,
	SEARCH_CABLE,
	SEARCH_CABLE_FAIL,
	SEARCH_CABLE_LOADING,
	SEARCH_CABLE_RELOAD,
} from "../Actions/ActionTypes";
import { DeleteData } from "./DataReducer";

const initialState = {
	isLoading: false,
	cable: [],
	cable_direct: [],
	cable_package: null,
	isAdded: false,
	isDeleted: false,
	isFound: null,
	searchLoading: null,
	mainSearch: [],
	search: "",
	search_paginate: null,
};
const CableReducer = (state = initialState, action) => {
	const { type, payload } = action;
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case SEARCH_CABLE:
			return {
				...state,
				isFound: true,
				searchLoading: false,
				mainSearch: data,
				search: action.search,
				search_paginate: payload?.paginate,
			};
		case SEARCH_CABLE_FAIL:
			return {
				...state,
				isFound: false,
				searchLoading: false,
				mainSearch: null,
				search: "",
				search_paginate: null,
			};
		case SEARCH_CABLE_LOADING:
			return {
				...state,
				searchLoading: true,
			};
		case SEARCH_CABLE_RELOAD:
			return {
				...state,
				isFound: false,
				searchLoading: false,
			};
		case ADD_CABLE:
			return {
				...state,
				isAdded: true,
				cable: [data, ...state.cable],
				paginate: {
					...state?.paginate,
					result: state?.paginate?.result + 1,
					total: state?.paginate?.total + 1,
				},
			};
		case ADD_CABLE_FAIL:
			return {
				...state,
				isAdded: false,
				isDeleted: false,
			};
		case GET_CABLE:
			return {
				...state,
				isLoading: false,
				cable: data,
				paginate: payload?.paginate,
			};
		case DELETE_TRANSACTION:
			return {
				...state,
				mainSearch: DeleteData(state.mainSearch, payload),
				cable: DeleteData(state.cable, payload),
				isDeleted: true,
			};
		case DELETE_TRANSACTION_FAIL:
			return {
				...state,
				isDeleted: false,
			};
		case GET_CABLE_DIRECT_PACKAGE:
			return {
				...state,
				cable_package: data,
			};
		case GET_CABLE_DIRECT_TYPE:
			return {
				...state,
				cable_direct: data,
			};
		case GET_CABLE_FAIL:
			return {
				...state,
				isLoading: false,
			};
		case GET_CABLE_LOADING:
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

export default CableReducer;
