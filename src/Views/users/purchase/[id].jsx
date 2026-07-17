import React, { useContext, useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Container } from "reactstrap";
import { GlobalState } from "../../../Data/Context";
import {
	TransactionDetails,
	NewPaginate,
} from "../../../Components/Transactions";
import { Loader } from "../../../Utils";

const UserPurchase = () => {
	const { users, setStateName, manageUserActiveness } = useContext(GlobalState),
		[state, setState] = useState(null),
		params = useParams(),
		[getSearch] = useSearchParams(),
		[thisData, setThisData] = useState(null);

	useEffect(() => {
		setStateName(
			`${
				getSearch?.get("name")
					? getSearch?.get("name")?.split("_")?.join(" ")
					: ""
			}'s purchase history`
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	useEffect(() => {
		let getUserDetails = async () => {
			await manageUserActiveness(params?.step, "purchase", "", "get");
		};
		getUserDetails();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params?.step]);

	useEffect(() => {
		if (users?.isFoundPurchase) setState(users?.purchaseHistory);
	}, [users?.purchaseHistory, params?.step, users?.isFoundPurchase]);

	if (!state) return;

	return (
		<div className="py-4 bg-white aboutScreen">
			{users?.isFoundPurchaseLoading ? (
				<Loader />
			) : (
				<Container className="py-5">
					<NewPaginate
						state={state}
						setState={setState}
						setThisData={setThisData}
						type={"purchase"}
						criteria={{
							id: params?.step,
						}}
					/>
					<TransactionDetails
						thisData={thisData}
						setThisData={setThisData}
						type={"purchase"}
						criteria={{
							id: params?.step,
						}}
					/>
				</Container>
			)}
		</div>
	);
};

export default UserPurchase;
