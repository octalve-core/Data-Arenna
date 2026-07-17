import { Link } from "react-router-dom";
// import whiteLogo from "../Assets/brand-white.png";
// import darkLogo from "../Assets/brand-dark.png";
import dataarena1 from "../Assets/dataarena1.png";

const AppLogo = ({ height, type }) => {
	return (
		<Link to="/" className="">
			{type === "dark" ? (
				<img
					src={dataarena1}
					alt=""
					style={{ height: height }}
				/>
			) : (
				<img
					src={dataarena1}
					alt=""
					style={{ height: height }}
				/>
			)}
		</Link>
	);
};

export default AppLogo;
