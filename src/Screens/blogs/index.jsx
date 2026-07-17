import React from "react";
import { MiddleHeader } from "../../Utils";
import { Container } from "reactstrap";
import imgDown1 from "../../Assets/Frame 5.png";
import imgDown2 from "../../Assets/Frame 5 (1).png";
import imgDown3 from "../../Assets/Frame 5 (2).png";
import imgDown4 from "../../Assets/Frame 5 (3).png";
import imgDown5 from "../../Assets/Frame 5 (4).png";

const ServicesManagement = () => {
	let type = [
		{
			name: "Tech",
			description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida vitae lacus, in porta. Faucibus porttitor commodo volutpat in tincidunt bibendum. Adipiscing amet sem eget mauris ultricies porttitor quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida vitae lacus, in porta. Faucibus porttitor commodo volutpat in tincidunt bibendum. Adipiscing amet sem eget mauris ultricies porttitor quis.`,
			image: imgDown1,
		},
		{
			name: "Business",
			description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida vitae lacus, in porta. Faucibus porttitor commodo volutpat in tincidunt bibendum. Adipiscing amet sem eget mauris ultricies porttitor quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida vitae lacus, in porta. Faucibus porttitor commodo volutpat in tincidunt bibendum. Adipiscing amet sem eget mauris ultricies porttitor quis.`,
			image: imgDown2,
		},
		{
			name: "Fashion",
			description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida vitae lacus, in porta. Faucibus porttitor commodo volutpat in tincidunt bibendum. Adipiscing amet sem eget mauris ultricies porttitor quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida vitae lacus, in porta. Faucibus porttitor commodo volutpat in tincidunt bibendum. Adipiscing amet sem eget mauris ultricies porttitor quis.`,
			image: imgDown3,
		},
		{
			name: "Travel",
			description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida vitae lacus, in porta. Faucibus porttitor commodo volutpat in tincidunt bibendum. Adipiscing amet sem eget mauris ultricies porttitor quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida vitae lacus, in porta. Faucibus porttitor commodo volutpat in tincidunt bibendum. Adipiscing amet sem eget mauris ultricies porttitor quis.`,
			image: imgDown4,
		},
		{
			name: "Politics",
			description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida vitae lacus, in porta. Faucibus porttitor commodo volutpat in tincidunt bibendum. Adipiscing amet sem eget mauris ultricies porttitor quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida vitae lacus, in porta. Faucibus porttitor commodo volutpat in tincidunt bibendum. Adipiscing amet sem eget mauris ultricies porttitor quis.`,
			image: imgDown5,
		},
	];

	return (
		<div className="aboutScreen">
			<Container>
				<MiddleHeader text={"Our blog"} css2="j" />
				{type?.map((item, i) => (
					<div className="d-grid py-5 blogGrid" key={i}>
						<img
							src={item?.image}
							alt="Bg"
							className="img-fluild rounded w-100"
						/>
						<div className="border-top border-bottom py-5 d-flex flex-column">
							<h2 className="textColor">{item?.name}</h2>
							<p className="fontReduce">{item?.description}</p>
							<button className="btn textColor me-auto mt-auto">
								{" "}
								Read more...
							</button>
						</div>
					</div>
				))}
			</Container>
		</div>
	);
};

export default ServicesManagement;
