import React, { useContext, useEffect } from "react";
import { Container } from "reactstrap";
import { ThreeBoxBar, UserListOne } from "../../Components/Users";
import icon1 from "../../Assets/Analythics.png";
import icon2 from "../../Assets/Сoding.png";
import icon3 from "../../Assets/Money.png";
import { GlobalState } from "../../Data/Context";
import { Link } from "react-router-dom";

const UsersMain = () => {
	let {
		setStateName,
		users,
		numberWithCommas,
		nairaSignNeutral,
		getAllUserTransactionAmount,
	} = useContext(GlobalState);
	useEffect(() => {
		setStateName("users");
		getAllUserTransactionAmount();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	let usersArr = [
		{
			icon: icon1,
			name: "total users",
			number: users?.paginate?.total
				? numberWithCommas(users?.paginate?.total)
				: users?.all_users?.length
				? numberWithCommas(users?.all_users?.length)
				: 0,
			color: "linear-gradient(90.18deg, #84C7DB -52.19%, #377FB6 81.92%)",
		},
		{
			icon: icon2,
			name: "total transactions",
			number: `${nairaSignNeutral}${numberWithCommas(
				Number(
					users?.details?.transactions || users?.transactions || 0
				).toFixed(2)
			)}`,
			link: "/transactions",
			color: "linear-gradient(90deg, #D88ADA 16.14%, #CA64FB 101.45%)",
		},
		{
			icon: icon3,
			name: "total users wallet",
			number: `${nairaSignNeutral}${numberWithCommas(
				Number(users?.details?.wallet || users?.wallet || 0).toFixed(2)
			)}`,
			color: "linear-gradient(96.86deg, #F4EA75 18.88%, #F7BA5E 125.77%)",
		},
	];
	return (
		<div className="bg-white">
			<Container>
				<ThreeBoxBar list={usersArr} />
				<Link
					to={`/users/upgrade`}
					style={{ borderRadius: "30px" }}
					className="btn-primary1 text-capitalize py-3 px-4 px-lg-5 my-4 btn">
					upgrade request
				</Link>
				<UserListOne />
			</Container>
		</div>
	);
};

export default UsersMain;
