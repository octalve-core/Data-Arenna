import React, { useState } from "react";
import { Container } from "reactstrap";
import TransactionsFolder, { TopFolder } from "../../Components/Transactions";

const MainTransactions = () => {
	let [subActive, setSubActive] = useState(0);
	return (
		<div className="bg-white">
			<Container>
				<TopFolder setSubActive={setSubActive} />
				<TransactionsFolder subActive={subActive} />
			</Container>
		</div>
	);
};

export default MainTransactions;
