import React, { useContext, useEffect } from "react";
import { GlobalState } from "../../Data/Context";

const Admins = () => {
	let { setStateName } = useContext(GlobalState);
	useEffect(() => {
		setStateName("admins");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return <div>Admins</div>;
};

export default Admins;
