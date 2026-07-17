import React, { useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container } from "reactstrap";
import { GlobalState } from "../../../Data/Context";

const ManageWallet = () => {
	let { setStateName } = useContext(GlobalState);
	useEffect(() => {
		setStateName("Manage Provider Funding");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	let navigate = useNavigate(),
		params = useParams(),
		controlsTab = [
			{
				name: "Monnify",
				type: "link",
				link: `/${params?.page}/${params?.id}/monnify`,
				color: "linear-gradient(90deg, #DE0DE2 16.14%, #0E102D 101.45%)",
				textColor: "white",
			},
			{
				name: "Flutterwave",
				type: "link",
				link: `/${params?.page}/${params?.id}/flutterwave`,
				color: "linear-gradient(90deg, #F45F83 16.14%, #9E1A2A 101.45%)",
				textColor: "white",
			},
			{
				name: "Paystack",
				type: "link",
				link: `/${params?.page}/${params?.id}/paystack`,
				color: "linear-gradient(96.86deg, #F2E553 18.88%, #FF9900 125.77%)",
			},
			{
				name: "Manual",
				type: "link",
				link: `/${params?.page}/${params?.id}/manual`,
				color: "linear-gradient(90.18deg, #3199B7 -52.19%, #144468 81.92%)",
				textColor: "white",
			},
			// {
			// 	name: "manage transaction stat",
			// 	type: "link",
			// 	link: `/${params?.page}/${params?.id}/find-transactions`,
			// 	color:
			// 		"linear-gradient(96.86deg, rgba(83, 242, 147, 0.8) 18.88%, rgba(158, 255, 0, 0.8) 125.77%)",
			// },
			// {
			// 	name: "Data profit",
			// 	type: "link",
			// 	link: `/${params?.page}/${params?.id}/bonus-data`,
			// 	color:
			// 		"linear-gradient(90deg, rgba(228, 51, 105, 0.7) 16.14%, rgba(194, 14, 25, 0.7) 101.45%)",
			// 	textColor: "white",
			// },
			// {
			// 	name: "give bonus",
			// 	type: "link",
			// 	link: `/${params?.page}/${params?.id}/give-bonus`,
			// 	color: "linear-gradient(90.18deg, #6CB731 -52.19%, #0F5A16 81.92%)",
			// 	textColor: "white",
			// },
			// {
			// 	name: "manual top up",
			// 	type: "link",
			// 	link: `/${params?.page}/${params?.id}/manual`,
			// 	color: "linear-gradient(90deg, #E43369 16.14%, #C20E19 101.45%)",
			// 	textColor: "white",
			// },
			// {
			// 	textColor: "white",
			// 	name: "direct debit",
			// 	type: "button",
			// 	link: `debit`,
			// 	color: "linear-gradient(90.18deg, #3199B7 -52.19%, #144468 81.92%)",
			// },
			// {
			// 	name: "Wallet funding",
			// 	type: "link",
			// 	link: `/${params?.page}/${params?.id}/wallet-funding`,
			// 	color: "linear-gradient(96.86deg, #F2E553 18.88%, #FF9900 125.77%)",
			// },
		];

	return (
		<div className="bg-white aboutScreen">
			<Container>
				<div className="row mx-0 g-2 g-md-4 py-4 py-md-5">
					{controlsTab?.map((item, i) => (
						<div className="col-6 col-md-4 productCard" key={i}>
							<span
								onClick={() => {
									if (item?.type === "link") {
										navigate(item?.link);
									}
								}}
								className="d-flex align-items-center justify-content-center text2 myCursor text-decoration-none h-100 eachProduct fontReduceBig textTrunc p-2 p-md-0 py-3 py-md-0 h-100"
								style={{
									background: item?.color,
									borderRadius: "30px",
									color: item?.textColor ? item?.textColor : "#000",
								}}>
								<span className="textTrunc fontInherit">{item?.name}</span>
							</span>
						</div>
					))}
				</div>
			</Container>
		</div>
	);
};

export default ManageWallet;
