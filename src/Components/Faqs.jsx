import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../Data/Context";
import { Container } from "reactstrap";
import { ModalComponents } from "./DefaultHeader";
import { Buttons, EmptyComponent } from "../Utils";
import { BiEditAlt, BiTrashAlt } from "react-icons/bi";

const MainFaqs = () => {
	let { setStateName, auth, faqs, manageFaqs } = useContext(GlobalState),
		[isOpen, setIsOpen] = useState(false),
		[datum, setDatum] = useState(null),
		toggle = () => {
			if (isOpen) if (datum) setDatum(false);
			setIsOpen(!isOpen);
		},
		[loading, setLoading] = useState(null),
		[state, setState] = useState(null);

	useEffect(() => {
		if (datum) setIsOpen(true);
	}, [datum]);

	useEffect(() => {
		setState(faqs?.data);
	}, [faqs?.data]);

	useEffect(() => {
		setStateName("FAQs");
		manageFaqs("get");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<div className="bg-white aboutScreen">
				<Container className="py-5">
					{auth?.user?.privilege === "agent" && (
						<Buttons
							title={"add faq"}
							css="btn-primary1 text-capitalize py-3 px-4 px-lg-5"
							width={"w-25 w25"}
							onClick={toggle}
							style={{ borderRadius: "30px" }}
						/>
					)}
					<div className="py-3">
						{state?.length === 0 ? (
							<EmptyComponent />
						) : (
							state?.map((item, i) => (
								<div className="py-3" key={i}>
									<details className="rounded p-3">
										<summary>{item?.summary}</summary>
										<div className="d-flex flex-column">
											<pre className="noScroll">{item?.details}</pre>
											{auth?.user?.privilege === "agent" && (
												<div className="d-flex align-items-center ms-auto">
													{loading !== item?._id && (
														<>
															<BiEditAlt
																size={20}
																color="blue"
																className="myCursor"
																onClick={() => setDatum(item)}
															/>
															<BiTrashAlt
																size={20}
																color="red"
																onClick={async () => {
																	if (
																		window.confirm("Do you want to delete this")
																	) {
																		setLoading(item?._id);
																		await manageFaqs("delete", item);
																		setLoading(false);
																	}
																}}
																className="myCursor"
															/>
														</>
													)}
												</div>
											)}
										</div>
									</details>
								</div>
							))
						)}
					</div>
				</Container>
			</div>
			<AddNewFaq isOpen={isOpen} toggle={toggle} datum={datum} />
		</>
	);
};

export default MainFaqs;

let AddNewFaq = ({ isOpen, toggle, datum }) => {
	let { faqs, manageFaqs } = useContext(GlobalState);

	let init = { details: "", summary: "" },
		[loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false),
		[state, setState] = useState(init),
		handleSubmit = async e => {
			if (e) e.preventDefault();
			if (!state?.details && !state?.summary) return;
			setLoading(true);
			await manageFaqs(datum ? "put" : "post", state);
			setLoading(false);
			setSubmit(true);
		};

	useEffect(() => {
		if (datum) setState(datum);
	}, [datum]);

	useEffect(() => {
		if (submit && faqs?.isAdded) {
			setSubmit(false);
			setState(init);
			toggle();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, faqs?.isDeleted, faqs?.isAdded]);

	return (
		<>
			<ModalComponents
				isOpen={isOpen}
				back={toggle}
				title={datum ? `Edit faq` : `Add faq`}>
				<div>
					<div className="mb-3">
						<label htmlFor="Summary">Title</label>
						<input
							type="text"
							className="py-3 form-control"
							value={state?.summary}
							onChange={e => setState({ ...state, summary: e.target.value })}
						/>
					</div>
				</div>
				<div>
					<div className="mb-3">
						<label htmlFor="Details">Explanation</label>
						<textarea
							style={{
								resize: "none",
								height: "10rem",
							}}
							className="py-3 form-control"
							value={state?.details}
							onChange={e => setState({ ...state, details: e.target.value })}
						/>
					</div>
					<Buttons
						title={datum ? "update" : "add"}
						css="btn-primary1 text-capitalize py-3 px-4 px-lg-5 mx-auto"
						width={"w-50 w50"}
						onClick={handleSubmit}
						loading={loading}
						style={{ borderRadius: "30px" }}
					/>
				</div>
			</ModalComponents>
		</>
	);
};
