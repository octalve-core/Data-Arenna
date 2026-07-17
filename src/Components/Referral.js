import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../Data/Context";
import { Container } from "reactstrap";
import moment from "moment";
import { Buttons, EmptyComponent } from "../Utils";
import { BonusCommission } from "./Wallets";
import LoadMore, { BottomTab } from "./LoadMore";
import { MainPaginate, MainRanger } from "./Transactions";
import { toast } from "react-toastify";
import { BiCopy } from "react-icons/bi";
import { useParams, useNavigate } from "react-router-dom";

const MainReferral = () => {
	let { setStateName, auth, wallet } = useContext(GlobalState),
		[active, setActive] = useState(0),
		{ page, id } = useParams(),
		navigate = useNavigate();

	useEffect(() => {
		setStateName("Referral history");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="bg-white aboutScreen">
			<Container className="py-3 py-md-5">
				<h5 className="Lexend">Referral History</h5>
				<small>
					<p
						// href={`${window?.location?.origin}/register?referral=${auth?.user?.referralCode}`}
						// target="_blank"
						className="text-decoration-none text-dark text-lg tw-mt-8 tw-font-bold"
						// rel="noopener noreferrer"
					>
						{/* Referral Code: {auth?.user?.referralCode} */}
						Referral link:{" "}
						<span className="tw-text-md tw-font-semibold tw-flex tw-items-center tw-gap-4 tw-p-2 tw-border tw-rounded-md tw-w-fit tw-border-black">
							{window?.location?.origin}/register?referral=$
							{auth?.user?.referralCode}{" "}
							<span
								className="mt-auto myCursor force-d-flex tw-px-2 tw-border-l tw-border-black"
								onClick={
									wallet?.balance?.wallet_id
										? () => {
												navigator.clipboard
													.writeText(
														`${window?.location?.origin}/register?referral=${auth?.user?.referralCode}`
													)
													.then(
														() => {
															toast.info("Copied", { autoClose: 2000 });
														},
														err => {
															toast.warn(`Could not copy: ${err}`, {
																autoClose: 2000,
															});
														}
													);
										  }
										: null
								}>
								<BiCopy />
							</span>
						</span>
					</p>
				</small>
				{auth?.user?.isAdmin && (
					<Buttons
						title={"All Referred User"}
						css="btn-primary1 text-capitalize py-3 px-4 px-lg-5 my-3 ms-auto"
						width={"w-25 w25"}
						onClick={() => navigate(`/${page}/${id}/all-referral`)}
						style={{ borderRadius: "30px" }}
					/>
				)}
				<div className="btn-group w-100 py-3">
					<button
						className={`btn py-3 text-capitalize fw-bold ${
							active === 0 ? "border-bottom textColor" : ""
						} rounded-0`}
						onClick={() => setActive(0)}>
						Referral Bonus
					</button>
					<button
						className={`btn py-3 text-capitalize fw-bold ${
							active === 1 ? "border-bottom textColor" : ""
						} rounded-0`}
						onClick={() => setActive(1)}>
						Refered User
					</button>
				</div>
				{active === 1 ? <ReferedUser /> : <BonusCommission type={"referral"} />}{" "}
			</Container>{" "}
		</div>
	);
};

export default MainReferral;

const ReferedUser = () => {
  const { getReferrals, referral } = useContext(GlobalState);

  let [state, setState] = useState(null);

  useEffect(() => {
		getReferrals();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

  let [loading, setLoading] = useState(false);
  let handleLoadMore = async () => {
    setLoading(true);

    await getReferrals({
      limit: Number(
        referral?.general_paginate?.nextPage * referral?.general_paginate?.limit
      ),
    });
    setLoading(false);
  };

  useEffect(() => {
    setState(referral?.general_referral);
  }, [referral]);

  let [range, setRange] = useState(10);

  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + range;
  if (!state) return;

  const currentItems = state.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(state.length / range);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * range) % state.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="py-5">
      <MainRanger setRange={setRange} range={range} />
      <div className="bland row mx-0 py-3 px-0 text-capitalize">
        <div className="col textTrunc fontReduce fw-bold Lexend">S/N</div>
        <div className="col textTrunc fontReduce fw-bold Lexend">date</div>
        <div className="col textTrunc fontReduce fw-bold Lexend">User</div>
      </div>
      <div className="bland2 row mx-0">
        {currentItems?.length === 0 ? (
          <EmptyComponent subtitle={`Referral list is empty`} />
        ) : (
          currentItems?.map((item, index) => (
            <div key={index} className="row mx-0 py-3 px-0">
              <div className="col textTrunc fontReduce2 my-auto textTrunc textTrunc3 d-none d-md-flex">
                {index + 1}
              </div>
              <div className="col textTrunc fontReduce2 my-auto">
                {moment(item?.createdAt).format("DD/MM/YYYY hh:mm A")}
              </div>
              <div className="col textTrunc fontReduce2 my-auto">
                {item?.user?.firstName} {item?.user?.lastName}
              </div>
            </div>
          ))
        )}
      </div>
      <MainPaginate handlePageClick={handlePageClick} pageCount={pageCount} />
      <BottomTab state={state} paginate={referral?.general_paginate} />
      <LoadMore
        next={referral?.general_paginate?.next}
        handleLoadMore={handleLoadMore}
        loading={loading}
      />
    </div>
  );
};
