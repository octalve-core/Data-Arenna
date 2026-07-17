import { socials } from "../Footer";
import { details } from "../Footer";
import AppLogo from "../app-logo";

import "./home-footer.style.css";

const HomeFooter = () => {
	return (
		<footer className="py-5 home-footer">
			<div className="container text-white">
				<div className="row">
					<div className="col-md-3">
						<AppLogo type="white" height="60px" />
						{/* <p className="small my-2">Address here</p> */}
						<p className="small">
							You can start reselling by having access to all our services such
							as: DATA BUNDLES, AIRTIME VTU, BULK SMS, AIRTIME TO CASH, CABLE TV
							SUBSCRIPTIONS, ELECTRICITY BILLS PAYMENT, DATA CARDS, RECHARGE
							CARDS PRINTING etc at affordable prices.
						</p>
					</div>
					<div className="col-md-7">
						<div className="row">
							<div className="col">
								<div className="w-fit py-4">
									<p className="h5 fw-semibold text-capitalize">explore</p>
									<ul className="p-0">
										<li className="list-group">About</li>
										<li className="list-group">Contact</li>
										<li className="list-group">Services</li>
									</ul>
								</div>
							</div>
							<div className="col">
								<div className="w-fit py-4">
									<p className="h5 fw-semibold text-capitalize">our services</p>
									<ul className="p-0">
										<li className="list-group">Airtime Services</li>
										<li className="list-group">Data Services</li>
										<li className="list-group">Cable Subscription</li>
										{/* <li className="list-group">Tv Subscription</li> */}
										<li className="list-group">Bill Payments</li>
									</ul>
								</div>
							</div>
							<div className="col">
								<div className="w-fit py-4">
									<p className="h5 fw-semibold text-capitalize">Contact Us</p>
									<ul className="p-0">
										<ul className="list-group border-0 px-0 mx-0">
											{details.map((item, index) =>
												item?.text ? (
													<li
														key={index}
														className="list-group-item border-0 bg-transparent text-white d-flex align-items-center py-0">
														{item.icon}
														<p className="ms-3 w-100">
															{item?.type === "tel" ? (
																<>
																	<a
																		className="text-white text-decoration-none fontReduce"
																		href={
																			!item?.text ? "#" : `tel:${item?.text}`
																		}>
																		{item?.text ? item?.text : ""}
																	</a>
																</>
															) : item?.type === "mail" ? (
																<>
																	<a
																		className="text-white text-decoration-none fontReduce"
																		href={
																			!item?.text ? "#" : `mailto:${item?.text}`
																		}>
																		{item?.text}
																	</a>
																</>
															) : item?.type === "address" ? (
																<>
																	<a
																		className="text-white text-decoration-none fontReduce w-100"
																		target={"_blank"}
																		rel="noreferrer"
																		href={
																			!item?.text
																				? "#"
																				: `https://www.google.com/maps/place/?q=place_id=${
																						details?.[details?.length - 1]?.text
																				  }`
																		}>
																		{item?.text}
																	</a>
																</>
															) : (
																<></>
															)}
														</p>
													</li>
												) : (
													""
												)
											)}
										</ul>
									</ul>
								</div>
							</div>
						</div>
					</div>
					<div className="col-md-2">
						<div className="w-fit py-4">
							<p className="h5 fw-semibold text-capitalize">Contact Us</p>
							<div>Socials</div>
							<ul className="list-group border-0 list-group-horizontal">
								{socials.map((item, index) => (
									<li
										key={index}
										className="list-group-item border-0 bg-transparent text-white d-flex align-items-center">
										<a
											className="text-white text-decoration-none fontReduce"
											target={"_blank"}
											rel="noreferrer"
											href={item?.url ? item?.url : "#"}>
											{item?.icon}
										</a>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default HomeFooter;
