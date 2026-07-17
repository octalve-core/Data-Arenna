import {
	ACTIVATE_USER,
	ACTIVATE_USER_FAIL,
	ADD_NOTIFICATONS,
	ADD_NOTIFICATONS_FAIL,
	DELETE_NOTIFICATONS,
	DELETE_USER,
	GET_ALL_USERS,
	GET_ALL_USERS_FAIL,
	GET_ALL_USERS_LOADING,
	GET_FULL_USERS,
	GET_MY_NOTIFICATONS,
	GET_MY_NOTIFICATONS_FAIL,
	GET_NOTIFICATONS,
	GET_NOTIFICATONS_FAIL,
	LOGOUT,
	PURCHASE_HISTORY_USER,
	PURCHASE_HISTORY_USER_FAIL,
	PURCHASE_HISTORY_USER_LOADING,
	SEARCH_ALL_USERS,
	SEARCH_ALL_USERS_FAIL,
	SEARCH_ALL_USERS_LOADING,
	SEARCH_ALL_USERS_RELOAD,
	TRANSACTION_DETAILS,
	UPDATE_NOTIFICATONS,
	WALLET_HISTORY_USER,
	WALLET_HISTORY_USER_FAIL,
	WALLET_HISTORY_USER_LOADING,
} from "../Actions/ActionTypes";
import { DeleteData, EditData } from "./DataReducer";

const initialState = {
	isLoading: false,
	users: [],
	all_users: [],
	isAdded: false,
	isDeleted: false,
	paginate: null,
	wallet: 0,
	transactions: 0,
	isUpdated: false,
	isFound: null,
	searchLoading: null,
	mainSearch: [],
	search: "",
	search_paginate: null,
	isFoundWallet: null,
	isFoundWalletLoading: null,
	walletHistory: [],
	isFoundPurchase: null,
	isFoundPurchaseLoading: null,
	purchaseHistory: [],
};

const UsersReducer = (state = initialState, action) => {
	const { type, payload } = action;
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case SEARCH_ALL_USERS:
			return {
				...state,
				isFound: true,
				searchLoading: false,
				mainSearch: data,
				search: action.search,
				search_paginate: payload?.paginate,
			};
		case SEARCH_ALL_USERS_FAIL:
			return {
				...state,
				isFound: false,
				searchLoading: false,
				mainSearch: null,
				search: "",
				search_paginate: null,
			};
		case SEARCH_ALL_USERS_LOADING:
			return {
				...state,
				searchLoading: true,
			};
		case SEARCH_ALL_USERS_RELOAD:
			return {
				...state,
				isFound: false,
				searchLoading: false,
			};
		case GET_ALL_USERS_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case GET_ALL_USERS:
			return {
				...state,
				isLoading: false,
				users: data,
				paginate: payload?.paginate,
				wallet: payload?.wallet,
				transactions: payload?.transactions,
			};
		case GET_FULL_USERS:
			return {
				...state,
				all_users: data,
			};
		case ACTIVATE_USER:
			return {
				...state,
				users: EditData(state?.users, data),
				all_users: EditData(state?.all_users, data),
				isUpdated: true,
			};
		case DELETE_USER:
			return {
				...state,
				users: DeleteData(state?.users, data),
				all_users: DeleteData(state?.all_users, data),
				isDeleted: true,
			};
		case WALLET_HISTORY_USER_LOADING:
			return {
				...state,
				isFoundWalletLoading: true,
			};
		case PURCHASE_HISTORY_USER_LOADING:
			return {
				...state,
				isFoundPurchaseLoading: true,
			};
		case WALLET_HISTORY_USER:
			return {
				...state,
				walletHistory: data,
				isFoundWallet: true,
				isFoundWalletLoading: false,
			};
		case PURCHASE_HISTORY_USER:
			return {
				...state,
				purchaseHistory: data,
				isFoundPurchase: true,
				isFoundPurchaseLoading: false,
			};
		case PURCHASE_HISTORY_USER_FAIL:
		case WALLET_HISTORY_USER_FAIL:
			return {
				...state,
				isFoundPurchase: false,
				isFoundWallet: false,
				walletHistory: [],
				purchaseHistory: [],
				isFoundPurchaseLoading: false,
				isFoundWalletLoading: false,
			};
		case TRANSACTION_DETAILS:
			return {
				...state,
				details: data,
			};
		case ACTIVATE_USER_FAIL:
		case GET_ALL_USERS_FAIL:
			return {
				...state,
				isLoading: false,
				isUpdated: false,
				isDeleted: false,
			};
		case LOGOUT:
			return initialState;
		default:
			return state;
	}
};

export default UsersReducer;

const initialState2 = {
	isLoading: false,
	outgoing: [],
	incoming: [],
	isAdded: false,
	isUpdated: false,
	paginate: null,
	paginate2: null,
	isDeleted: false,
};

export const NotificationReducer = (state = initialState2, action) => {
	const { type, payload } = action;
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case GET_NOTIFICATONS:
			return {
				...state,
				isLoading: false,
				incoming: data ? data : [],
				paginate: payload?.paginate,
			};
		case GET_MY_NOTIFICATONS:
			return {
				...state,
				isLoading: false,
				outgoing: data ? data : [],
				paginate2: payload?.paginate,
			};
		case GET_NOTIFICATONS_FAIL:
		case GET_MY_NOTIFICATONS_FAIL:
			return {
				...state,
				isLoading: false,
			};
		case ADD_NOTIFICATONS:
			return {
				...state,
				isAdded: true,
				outgoing: [data, ...state?.outgoing],
				paginate: {
					...state?.paginate,
					result: state?.paginate?.result + 1,
					total: state?.paginate?.total + 1,
				},
			};
		case ADD_NOTIFICATONS_FAIL:
			return {
				...state,
				isLoading: false,
				isUpdated: false,
				isAdded: false,
				isDeleted: false,
			};
		case UPDATE_NOTIFICATONS:
			return {
				...state,
				isUpdated: true,
				incoming: EditData(state?.incoming, data),
			};
		case DELETE_NOTIFICATONS:
			return {
				...state,
				isDeleted: true,
				incoming: DeleteData(state?.incoming, payload),
				outgoing: DeleteData(state?.outgoing, payload),
			};
		case LOGOUT:
			return initialState;
		default:
			return state;
	}
};
