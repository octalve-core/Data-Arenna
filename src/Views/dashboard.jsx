import React, { useContext } from "react";
import Dashboard from "../Components/Dashboard";
import { GlobalState } from "../Data/Context";
import icon1 from "../Assets/Group (4).png";
import icon2 from "../Assets/Hands Give.png";
import icon3 from "../Assets/Group (3).png";
import icon4 from "../Assets/Group (5).png";

const MainDashboard = () => {
	const { wallet, users, numberWithCommas, nairaSignNeutral } =
		useContext(GlobalState);
	let usersArr = [
		{
			name: "total users",
			number: users?.paginate?.total
				? numberWithCommas(users?.paginate?.total)
				: users?.all_users?.length
				? numberWithCommas(users?.all_users?.length)
				: 0,
			color: "linear-gradient(90deg, #DE0DE2 16.14%, #0E102D 101.45%)",
			link: "/users",
			icon: icon1,
		},
		{
			name: "wallet balance",
			number: `${nairaSignNeutral}${
				wallet?.balance?.available
					? numberWithCommas(Number(wallet?.balance?.available).toFixed(2))
					: 0
			}`,
			color: "linear-gradient(90deg, #F45F83 16.14%, #9E1A2A 101.45%)",
			link: "/wallets/my-wallet",
			type: "amount",
			icon: icon2,
		},
		{
			name: "total commission",
			number: `${nairaSignNeutral}${
				wallet?.wallet_details?.commissionTotal
					? numberWithCommas(
							Number(wallet?.wallet_details?.commissionTotal).toFixed(2)
					  )
					: 0
			}`,
			color: "linear-gradient(90.18deg, #3199B7 -52.19%, #144468 81.92%)",
			link: "/wallets/commissions",
			icon: icon3,
		},
		{
			name: "total expenses",
			number: `${nairaSignNeutral}${
				wallet?.wallet_details?.purchase
					? numberWithCommas(
							Number(wallet?.wallet_details?.purchase).toFixed(2)
					  )
					: 0
			}`,
			color: "linear-gradient(90.18deg, #84C7DB -52.19%, #377FB6 81.92%)",
			link: "/transactions",
			icon: icon4,
		},
		{
			name: "today's successful transaction count",
			number: wallet?.wallet_details?.transactions?.dayCount
				? numberWithCommas(
						Number(wallet?.wallet_details?.transactions?.dayCount)
				  )
				: 0,
			color: "linear-gradient(90.18deg, #6CB731 -52.19%, #0F5A16 81.92%)",
			icon: icon2,
			button: true,
		},
	];

	return <Dashboard usersArr={usersArr} />;
};

export default MainDashboard;
