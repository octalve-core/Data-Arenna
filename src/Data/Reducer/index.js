// Root reducer to combine all reducers in the app

import AuthReducer from "./AuthReducer";

import { combineReducers } from "redux";
import CableReducer from "./CableReducer";
import DataReducer from "./DataReducer";
import GeneralReducer from "./GeneralReducer";
import ElectricityReducer from "./ElectricityReducer";
import AirtimeReducer, {
	AirtimeConverterReducer,
	AirtimePinReducer,
} from "./AirtimeReducer";
import ErrorReducer, { SuccessReducer } from "./ErrorReducer";
import WalletReducer, {
	BonusReducer,
	CommissionReducer,
	ReferralReducer,
} from "./WalletReducer";
import UsersReducer, { NotificationReducer } from "./UserReducer";
import SettingsReducer, { docReducer } from "./SettingsReducer";
import EducationReducer from "./EducationReducer";
import UseCaseReducer, { UpgradeReducer } from "./UseCaseReducer";
import ManualReducer, {
	ManualCardReducer,
	ManualVirtualReducer,
} from "./ManualReducer";
import {
	FaqsReducer,
	ProviderFundingReducer,
	ProviderStateReducer,
} from "./StatReducer";

export default combineReducers({
	auth: AuthReducer,
	cables: CableReducer,
	data: DataReducer,
	general: GeneralReducer,
	electricity: ElectricityReducer,
	airtimes: AirtimeReducer,
	airtimes_pin: AirtimePinReducer,
	errors: ErrorReducer,
	converter: AirtimeConverterReducer,
	wallet: WalletReducer,
	bonus: BonusReducer,
	commission: CommissionReducer,
	users: UsersReducer,
	settings: SettingsReducer,
	notifications: NotificationReducer,
	education: EducationReducer,
	success: SuccessReducer,
	usecase: UseCaseReducer,
	pending_wallet: ManualReducer,
	pending_card: ManualCardReducer,
	pending_virtual: ManualVirtualReducer,
	upgrade: UpgradeReducer,
	stat: ProviderStateReducer,
	faqs: FaqsReducer,
	referral: ReferralReducer,
	funding: ProviderFundingReducer,
	documentation: docReducer,
});
