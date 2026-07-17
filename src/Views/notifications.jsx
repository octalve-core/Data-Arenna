import React, { useContext, useEffect } from "react";
import Notification from "../Components/Notification";
import { GlobalState } from "../Data/Context";

const MainNotifications = () => {
	let { setStateName } = useContext(GlobalState);
	useEffect(() => {
		setStateName("notifications");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return <Notification />;
};

export default MainNotifications;
