import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../Data/Context";
import { Buttons } from "../../Utils";
import { ModalComponents } from "../../Components";

const Products = () => {
	let { setStateName } = useContext(GlobalState);
	useEffect(() => {
		setStateName("manage users");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	let productArr = [
		{
			name: "Manage Admins",
			link: "/admins",
			color: "linear-gradient(90.18deg, #3199B7 -52.19%, #144468 81.92%)",
			textColor: "white",
		},
		{
			name: "Assign Role",
			link: "/assign-role",
			color: "linear-gradient(90deg, #DE0DE2 16.14%, #880EC2 101.45%)",
			textColor: "white",
			type: "button",
		},
		{
			name: "Manage Employees",
			link: "/employees",
			color: "linear-gradient(96.86deg, #F2E553 18.88%, #FF9900 125.77%)",
		},
		// {
		// 	name: "Manage Billers",
		// 	link: "/billers",
		// 	color: "linear-gradient(96.86deg, #53F293 18.88%, #9EFF00 125.77%)",
		// 	textColor: "black",
		// },
	];

	let params = useParams();
	let [isOpen, setIsOpen] = useState(false),
		toggle = () => {
			setIsOpen(!isOpen);
		};

	return (
		<Container>
			<div className="row mx-0 g-2 g-md-4 py-4 py-md-5">
				{productArr?.map((item, i) => (
					<div className="col-6 col-md-4 productCard" key={i}>
						<Link
							to={
								item?.type === "button" ? "#" : `/${params?.page}${item?.link}`
							}
							className="d-flex align-items-center justify-content-center text2 myCursor text-decoration-none h-100 eachProduct fontReduceBig textTrunc p-2 p-md-0 py-3 py-md-0 h-100"
							style={{
								background: item?.color,
								borderRadius: "30px",
								color: item?.textColor ? item?.textColor : "#000",
							}}>
							<span className="textTrunc fontInherit">{item?.name}</span>
						</Link>
					</div>
				))}
			</div>
			<ModalComponents title="assign role" isOpen={isOpen} back={toggle}>
				<div className="downH2 d-flex">
					<form className="w-100">
						<div className="form mb-3">
							<label htmlFor="bundle">Choose user</label>
							<select className="form-control rounded10 py-3 form-select">
								<option value="ringo">John Doe</option>
							</select>
						</div>
						<div className="form mb-3">
							<label htmlFor="bundle">Role</label>
							<select className="form-control rounded10 py-3 form-select">
								<option value="ringo">Marketter</option>
							</select>
						</div>
						<Buttons
							title={"assign"}
							css="btn-primary1 text-capitalize py-3 px-4 px-lg-5 mx-auto my-4"
							width={"w-50 w50"}
							onClick={toggle}
							style={{ borderRadius: "30px" }}
						/>
					</form>
				</div>
			</ModalComponents>
		</Container>
	);
};

export default Products;
