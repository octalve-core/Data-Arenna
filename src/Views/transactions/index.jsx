import React, { useContext, useState } from "react";
import { Container } from "reactstrap";
import TransactionsFolder, { TopFolder } from "../../Components/Transactions";
import { GlobalState } from "../../Data/Context";
// import { Link } from "react-router-dom";

const MainTransactions = () => {
	let { auth } = useContext(GlobalState),
		[active, setActive] = useState(0),
		[subActive, setSubActive] = useState(0);

	return (
		<div className="bg-white">
			<Container>
				{auth?.user?.privilege === "agent" && (
					<div className="btn-group w-100 py-3">
						<button
							className={`btn py-3 text-capitalize fw-bold ${
								active === 0 ? "border-bottom textColor" : ""
							} rounded-0`}
							onClick={() => setActive(0)}>
							general transactions
						</button>
						<button
							className={`btn py-3 text-capitalize fw-bold ${
								active === 1 ? "border-bottom textColor" : ""
							} rounded-0`}
							onClick={() => setActive(1)}>
							my transactions
						</button>
					</div>
				)}
				<TopFolder active={active} setSubActive={setSubActive} />
				<TransactionsFolder active={active} subActive={subActive} />
			</Container>
		</div>
	);
};

export default MainTransactions;
