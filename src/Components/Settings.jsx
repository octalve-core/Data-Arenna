import React, { useContext, useEffect, useState } from "react";
import { Container } from "reactstrap";
import { GlobalState } from "../Data/Context";
import user from "../Assets/avatar3.png";
import { toast } from "react-toastify";
import { BsImage } from "react-icons/bs";
import { Buttons } from "../Utils";
import { ModalComponents } from "./DefaultHeader";
import { useParams } from "react-router-dom";
import axios from "axios";

const MainSettings = () => {
  const { auth, updateUser, setStateName } = useContext(GlobalState);

  useEffect(() => {
    setStateName("settings");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let [state, setState] = useState(null),
    [logo, setLogo] = useState(false),
    [isOpen, setIsOpen] = useState(false),
    [loading, setLoading] = useState(false),
    toggle = () => {
      setIsOpen(!isOpen);
    },
    [active, setActive] = useState(0);

  useEffect(() => {
    setState(auth?.user);
  }, [auth?.user]);

  let handleChangeImage = (e) => {
      const file = e.target.files[0];
      let err = "";

      if (!file) return (err = `File, ${file?.name} does not exist`);
      if (!file.type.includes("image"))
        return (err = `File, ${file?.name} format not supported`);

      if (err) {
        return toast.error(err);
      } else {
        setLogo(file);
      }
    },
    handleSubmit = (type) => async (e) => {
      if (e) e.preventDefault();
      if (type === "profile-image") {
        if (!logo) return toast.info("Image required", { auth: 10000 });
        setLoading(true);
        await updateUser({ logo }, "profile-image");
        setLoading(false);
      } else {
        if (!state?.gender && !state?.bio)
          return toast.info("Gender or bio required", { auth: 10000 });
        setLoading(true);
        await updateUser(state);
        setLoading(false);
      }
    };

  let textChange =
    (name) =>
    ({ target: { value } }) => {
      setState({ ...state, [name]: value });
    };

  // if (!state) return;

  return (
    <div className="py-4 bg-white aboutScreen">
      <Container className="py-5">
        <div className="d-flex justify-content-between align-items-center mb-3 px-md-4 px-2">
          <div>
            <h4 className="Lexend fw-600 fontReduceBig">My Account settings</h4>
            <div>
              <button
                onClick={() => setActive(0)}
                className={`btn ${
                  active !== 0 ? "btn-light" : "btn-outline-primary1"
                }
								text-capitalize px-md-4 px-2 mx-1 mx-md-3 py-1 py-md-2 fontReduce2 text-dark`}
              >
                profile
              </button>
              {auth?.user?.privilege === "agent" && (
                <>
                  <button
                    onClick={() => setActive(1)}
                    className={`btn ${
                      active !== 1 ? "btn-light" : "btn-outline-primary1"
                    }
								text-capitalize px-md-4 px-2 mx-1 mx-md-3 py-1 py-md-2 fontReduce2 text-dark`}
                  >
                    settings
                  </button>
                  <button
                    onClick={() => setActive(2)}
                    className={`btn ${
                      active !== 2 ? "btn-light" : "btn-outline-primary1"
                    }
								text-capitalize px-md-4 px-2 mx-1 mx-md-3 py-1 py-md-2 fontReduce2 text-dark`}
                  >
                    enabler
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="d-flex align-items-center">
            <img
              src={auth?.user?.avatar?.url || user}
              alt={`img`}
              style={{
                height: "7rem",
                width: "7rem",
                objectFit: "cover",
                objectPosition: "center 15%",
              }}
              className="rounded-circle img-fluid mx-3"
            />
            <div className="d-none d-md-block">
              <h5 className="Lexend">
                {auth?.user?.firstName} {auth?.user?.lastName}
              </h5>
              <small className="text-uppercase">
                {auth?.user?.privilege === "agent"
                  ? "admin"
                  : auth?.user?.privilege}
              </small>
            </div>
          </div>
        </div>
        {active === 2 ? (
          <EnablerSettings />
        ) : active === 1 ? (
          <GeneralSettings />
        ) : (
          <ProfileSetup
            state={state}
            textChange={textChange}
            handleChangeImage={handleChangeImage}
            handleSubmit={handleSubmit}
            toggle={toggle}
            logo={logo}
            loading={loading}
            isOpen={isOpen}
          />
        )}
      </Container>
    </div>
  );
};

export default MainSettings;

const ProfileSetup = ({
  state,
  textChange,
  isOpen,
  toggle,
  logo,
  handleChangeImage,
  handleSubmit,
  loading,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { auth, usecase } = useContext(GlobalState);

  let [isRequest, setIsRequest] = useState(""),
    closeRequest = () => {
      setIsRequest("");
    };

  return (
    <>
      <div className="px-md-4 px-2 mb-5">
        <h5 className="Lexend fw-600 fontReduceBig">Profile</h5>
        <p className="fontReduce2">Upload phone and personal details here</p>
        <h5 className="mt-3 Lexend fw-600 fontReduceBig">Photos</h5>
        <div className="d-flex align-items-center">
          <img
            src={state?.avatar?.url || user}
            alt={`img`}
            style={{
              height: "4rem",
              width: "4rem",
              objectFit: "cover",
              objectPosition: "center 15%",
            }}
            className="rounded-circle img-fluid mx-3"
          />
          <div className="d-flex align-items-center">
            {/* <button
							className={`btn btn-outline-primary1 text-capitalize px-md-4 px-2 mx-1 mx-md-3 py-1 py-md-2 fontReduce2 text-dark`}>
							remove
						</button> */}
            <button
              onClick={toggle}
              className={`btn btn-light text-capitalize px-md-4 px-2 mx-1 mx-md-3 py-1 py-md-2 fontReduce2 text-dark`}
            >
              change
            </button>
            <ModalComponents
              isOpen={isOpen}
              back={toggle}
              title="Update profile image"
            >
              <div className="d-flex">
                <div className="mx-auto position-relative">
                  <img
                    src={
                      logo
                        ? URL.createObjectURL(logo)
                        : state?.avatar?.url
                        ? state?.avatar.url
                        : user
                    }
                    alt={state?.firstName}
                    style={{
                      height: "15rem",
                      width: "15rem",
                    }}
                    className="rounded-circle img-fluid mx-auto"
                  />
                  <div className="file_upload d-flex myCursor mt-auto ms-auto justify-content-end">
                    <BsImage
                      size={22}
                      title="Upload image"
                      className="mx-2 myCursor statusIcon"
                    />
                    <input
                      title="Upload file"
                      type="file"
                      name="file"
                      id="file"
                      multiple
                      className="myCursor"
                      accept="image/*"
                      onChange={handleChangeImage}
                    />
                  </div>
                  {logo && (
                    <Buttons
                      onClick={handleSubmit("profile-image")}
                      loading={logo && loading}
                      css="btn btn-primary1 text-capitalize py-3 my-4"
                      title={"Update profile image"}
                    />
                  )}
                </div>
              </div>
            </ModalComponents>
          </div>
        </div>
      </div>
      <ProfileForm state={state} textChange={textChange} />
      <div className="d-flex justify-content-end my-3">
        <div className="d-flex align-items-center">
          <Buttons
            onClick={handleSubmit("update")}
            loading={!logo && loading}
            width=""
            css="btn-primary1 text-capitalize px-md-4 px-2 mx-1 mx-md-3 py-1 py-md-2 fontReduce2 text-white"
            title={"save"}
          />
          <button
            className={`btn btn-outline-primary1 text-capitalize px-md-4 px-2 mx-1 mx-md-3 py-1 py-md-2 fontReduce2 text-primary1`}
          >
            cancel
          </button>
        </div>
      </div>
      {auth?.user?.privilege !== "agent" && (
        <div>
          {auth?.user?.privilege !== "reseller" &&
            usecase?.usecase?.resellerUpgrade === "enable" && (
              <button
                onClick={() => setIsRequest("reseller")}
                className="btn btn-primary1
								text-capitalize px-md-4 px-2 mx-1 mx-md-3 py-1 py-md-3 fontReduce2 text-white"
              >
                become a reseller
              </button>
            )}
          {auth?.user?.privilege !== "topuser" &&
            usecase?.usecase?.topuserUpgrade === "enable" && (
              <button
                onClick={() => setIsRequest("topuser")}
                className="btn btn-primary1
								text-capitalize px-md-4 px-2 mx-1 mx-md-3 py-1 py-md-3 fontReduce2 text-white"
              >
                become a topuser
              </button>
            )}
        </div>
      )}
      <WalletPinBox />
      <BVNAddForm />
      <PasswordBox />
      <BecomeAgent isOpen={isRequest} back={closeRequest} />
    </>
  );
};

export const BecomeAgent = ({ isOpen, back }) => {
  let {
    usecase,
    upgrade,
    numberWithCommas,
    manageUpgrade,
    returnErrors,
    nairaSignNeutral,
  } = useContext(GlobalState);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let init = {
      privilege: isOpen,
      // websiteURL: "",
      businessName: "",
      stateOfResidence: "",
      // dateOfBirth: "",
      // ninNumber: "",
    },
    [state, setState] = useState(init),
    textChange =
      (name) =>
      ({ target: { value } }) => {
        setState({ ...state, [name]: value });
      },
    [loading, setLoading] = useState(false),
    [submit, setSubmit] = useState(false),
    handleSubmit = async () => {
      let errArr = [];

      if (!state?.businessName)
        errArr.push({
          msg: "Business name is required",
          param: "businessName",
        });
      if (!state?.stateOfResidence)
        errArr.push({
          msg: "State of residence is required",
          param: "stateOfResidence",
        });
      if (errArr?.length > 0)
        return returnErrors({
          error: errArr,
        });

      setLoading(true);
      await manageUpgrade({ ...state, privilege: isOpen });
      setLoading(false);
      setSubmit(true);
    };

  useEffect(() => {
    if (submit && upgrade?.isAdded) {
      back();
      setSubmit(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submit, upgrade]);

  return (
    <>
      <ModalComponents
        isOpen={isOpen ? true : false}
        back={back}
        title={`Become a ${isOpen}`}
      >
        <div>
          <div className="mb-3">
            <label htmlFor="businessName">Business name</label>
            <input
              type="text"
              name="businessName"
              value={state?.businessName}
              onChange={textChange("businessName")}
              placeholder="Your Business Name"
              className="form-control py-3"
            />
          </div>
          {/* <div className="mb-3">
						<label htmlFor="websiteURL">Website URL</label>
						<input
							type="url"
							name="websiteURL"
							value={state?.websiteURL}
							onChange={textChange("websiteURL")}
							placeholder="Your Website URL"
							className="form-control py-3"
						/>
					</div> */}
          <div className="mb-3">
            <label htmlFor="stateOfResidence">State of Residence</label>
            <input
              type="text"
              name="stateOfResidence"
              value={state?.stateOfResidence}
              onChange={textChange("stateOfResidence")}
              placeholder="Your State of Residence"
              className="form-control py-3"
            />
          </div>
          <Buttons
            title={`Proceed ${nairaSignNeutral} ${
              isOpen === "reseller"
                ? numberWithCommas(
                    Number(usecase?.usecase?.resellerUpgradeFee).toFixed()
                  )
                : numberWithCommas(
                    Number(usecase?.usecase?.topuserUpgradeFee).toFixed(2)
                  )
            } `}
            css="btn-primary1 text-capitalize py-3 w-50 my-4 mx-auto"
            width={"w-50"}
            style={{ borderRadius: "30px" }}
            loading={loading}
            onClick={handleSubmit}
          />
        </div>
      </ModalComponents>
    </>
  );
};

const GeneralSettings = () => {
  const { settings, getSettings } = useContext(GlobalState);

  let [mtnCommission, setMTNCommission] = useState(""),
    [gloCommission, setGLOCommission] = useState(""),
    [airtelCommission, setAIRTELCommission] = useState(""),
    [mobile9Commission, set9MobileCommission] = useState(""),
    [mtnCardCommission, setMTNCardCommission] = useState(""),
    [gloCardCommission, setGLOCardCommission] = useState(""),
    [airtelCardCommission, setAIRTELCardCommission] = useState(""),
    [mobile9CardCommission, set9MobileCardCommission] = useState(""),
    [cablesCommission, setCablesCommission] = useState(""),
    [educationCommission, setEducationCommission] = useState(""),
    [electricityCommission, setElectricityCommission] = useState(""),
    [airtimeToCashCommission, setAirtimeToCashCommission] = useState(""),
    [stateData, setStateData] = useState(null),
    [loading, setLoading] = useState(false),
    [loadingType, setLoadingType] = useState(false),
    [submit, setSubmit] = useState(false);

  useEffect(() => {
    setStateData(settings?.settings);
  }, [settings?.settings]);
  useEffect(() => {
    if (stateData) {
      setMTNCommission(stateData?.mtnCommission);
      setGLOCommission(stateData?.gloCommission);
      setAIRTELCommission(stateData?.airtelCommission);
      set9MobileCommission(stateData?.mobile9Commission);
      setMTNCardCommission(stateData?.mtnCardCommission);
      setGLOCardCommission(stateData?.gloCardCommission);
      setAIRTELCardCommission(stateData?.airtelCardCommission);
      set9MobileCardCommission(stateData?.mobile9CardCommission);
      setCablesCommission(stateData?.cablesCommission);
      setEducationCommission(stateData?.educationCommission);
      setElectricityCommission(stateData?.electricityCommission);
      setAirtimeToCashCommission(stateData?.airtimeToCashCommission);
    }
  }, [stateData]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (submit && settings?.isUpdated) {
      setSubmit(false);
    }
  }, [settings?.isUpdated, submit]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // console.log({ settings });

  let handleSubmit = (type) => async () => {
    if (type === "mtnCommission") if (!mtnCommission) return;
    if (type === "gloCommission") if (!gloCommission) return;
    if (type === "airtelCommission") if (!airtelCommission) return;
    if (type === "mobile9Commission") if (!mobile9Commission) return;
    if (type === "mtnCardCommission") if (!mtnCardCommission) return;
    if (type === "gloCardCommission") if (!gloCardCommission) return;
    if (type === "airtelCardCommission") if (!airtelCardCommission) return;
    if (type === "mobile9CardCommission") if (!mobile9CardCommission) return;
    if (type === "cablesCommission") if (!cablesCommission) return;
    if (type === "electricityCommission") if (!electricityCommission) return;
    if (type === "airtimeToCashCommission")
      if (!airtimeToCashCommission) return;
    if (type === "educationCommission") if (!educationCommission) return;

    let data;
    if (type === "mtnCommission")
      data = {
        mtnCommission: mtnCommission ? mtnCommission : stateData?.mtnCommission,
      };
    if (type === "gloCommission")
      data = {
        gloCommission: gloCommission ? gloCommission : stateData?.gloCommission,
      };
    if (type === "airtelCommission")
      data = {
        airtelCommission: airtelCommission
          ? airtelCommission
          : stateData?.airtelCommission,
      };
    if (type === "mobile9Commission")
      data = {
        mobile9Commission: mobile9Commission
          ? mobile9Commission
          : stateData?.mobile9Commission,
      };
    if (type === "mtnCardCommission")
      data = {
        mtnCardCommission: mtnCardCommission
          ? mtnCardCommission
          : stateData?.mtnCardCommission,
      };
    if (type === "gloCardCommission")
      data = {
        gloCardCommission: gloCardCommission
          ? gloCardCommission
          : stateData?.gloCardCommission,
      };
    if (type === "airtelCardCommission")
      data = {
        airtelCardCommission: airtelCardCommission
          ? airtelCardCommission
          : stateData?.airtelCardCommission,
      };
    if (type === "mobile9CardCommission")
      data = {
        mobile9CardCommission: mobile9CardCommission
          ? mobile9CardCommission
          : stateData?.mobile9CardCommission,
      };
    if (type === "cablesCommission")
      data = {
        cablesCommission: cablesCommission
          ? cablesCommission
          : stateData?.cablesCommission,
      };
    if (type === "educationCommission")
      data = {
        educationCommission: educationCommission
          ? educationCommission
          : stateData?.educationCommission,
      };
    if (type === "electricityCommission")
      data = {
        electricityCommission: electricityCommission
          ? electricityCommission
          : stateData?.electricityCommission,
      };
    if (type === "airtimeToCashCommission")
      data = {
        airtimeToCashCommission: airtimeToCashCommission
          ? airtimeToCashCommission
          : stateData?.airtimeToCashCommission,
      };
    // console.log({ data, state });
    setLoadingType(type);
    setLoading(true);
    await getSettings(data);
    setLoading(false);
    setLoadingType(false);
    setSubmit(false);
  };

  return (
    <Container className="px-lg-5  pt-3 pt-lg-0">
      <div className="mb-5">
        <h5 className="Lexend fw-600 fontReduceBig">General settings</h5>
      </div>
      <div>
        <p className="fontReduce">
          MTN commission: {stateData?.mtnCommission}%
        </p>
        <p className="fontReduce">
          GLO commission: {stateData?.gloCommission}%
        </p>
        <p className="fontReduce">
          AIRTEL commission: {stateData?.airtelCommission}%
        </p>
        <p className="fontReduce">
          9MOBILE commission: {stateData?.mobile9Commission}%
        </p>
        {["Spike Mobile", "Teetop Digital"]?.includes(
          process.env.REACT_APP_PROVIDER_NAME
        ) && (
          <>
            <p className="fontReduce col-md-6">
              MTN Card commission: {stateData?.mtnCardCommission}%
            </p>
            <p className="fontReduce col-md-6">
              GLO Card commission: {stateData?.gloCardCommission}%
            </p>
            <p className="fontReduce col-md-6">
              AIRTEL Card commission: {stateData?.airtelCardCommission}%
            </p>
            <p className="fontReduce col-md-6">
              9MOBILE Card commission: {stateData?.mobile9CardCommission}%
            </p>
          </>
        )}
        <p className="fontReduce">
          Electricity commission: {stateData?.electricityCommission}%
        </p>
        <p className="fontReduce">
          Cables commission: {stateData?.cablesCommission}%
        </p>
        <p className="fontReduce">
          Education commission: {stateData?.educationCommission}%
        </p>
        {/* <p className="fontReduce">
					Airtime to cash return: {stateData?.airtimeToCashCommission}%
				</p> */}
      </div>
      <div className="row mx-0 g-4 pt-5">
        <GenCheck
          state={mtnCommission}
          setState={setMTNCommission}
          type={"mtnCommission"}
          label="MTN commission"
          loading={loading}
          loadingType={loadingType}
          handleSubmit={handleSubmit}
          input
          percentage
        />
        <GenCheck
          state={gloCommission}
          setState={setGLOCommission}
          type={"gloCommission"}
          label="GLO commission"
          loading={loading}
          loadingType={loadingType}
          handleSubmit={handleSubmit}
          input
          percentage
        />
        <GenCheck
          state={airtelCommission}
          setState={setAIRTELCommission}
          type={"airtelCommission"}
          label="AIRTEL commission"
          loading={loading}
          loadingType={loadingType}
          handleSubmit={handleSubmit}
          input
          percentage
        />
        <GenCheck
          state={mobile9Commission}
          setState={set9MobileCommission}
          type={"mobile9Commission"}
          label="9MOBILE commission"
          loading={loading}
          loadingType={loadingType}
          handleSubmit={handleSubmit}
          input
          percentage
        />
        {["Spike Mobile", "Teetop Digital"]?.includes(
          process.env.REACT_APP_PROVIDER_NAME
        ) && (
          <>
            <GenCheck
              state={mtnCardCommission}
              setState={setMTNCardCommission}
              type={"mtnCardCommission"}
              label="MTN Card commission"
              loading={loading}
              loadingType={loadingType}
              handleSubmit={handleSubmit}
              input
              percentage
            />
            <GenCheck
              state={gloCardCommission}
              setState={setGLOCardCommission}
              type={"gloCardCommission"}
              label="GLO Card commission"
              loading={loading}
              loadingType={loadingType}
              handleSubmit={handleSubmit}
              input
              percentage
            />
            <GenCheck
              state={airtelCardCommission}
              setState={setAIRTELCardCommission}
              type={"airtelCardCommission"}
              label="AIRTEL Card commission"
              loading={loading}
              loadingType={loadingType}
              handleSubmit={handleSubmit}
              input
              percentage
            />
            x
            <GenCheck
              state={mobile9CardCommission}
              setState={set9MobileCardCommission}
              type={"mobile9CardCommission"}
              label="9MOBILE Card commission"
              loading={loading}
              loadingType={loadingType}
              handleSubmit={handleSubmit}
              input
              percentage
            />
          </>
        )}
        <GenCheck
          state={cablesCommission}
          setState={setCablesCommission}
          type={"cablesCommission"}
          label="CABLES commission"
          loading={loading}
          loadingType={loadingType}
          handleSubmit={handleSubmit}
          input
          percentage
        />
        <GenCheck
          state={electricityCommission}
          setState={setElectricityCommission}
          type={"electricityCommission"}
          label="ELECTRICITY commission"
          loading={loading}
          loadingType={loadingType}
          handleSubmit={handleSubmit}
          input
          percentage
        />
        <GenCheck
          state={educationCommission}
          setState={setEducationCommission}
          type={"educationCommission"}
          label="Education commission"
          loading={loading}
          loadingType={loadingType}
          handleSubmit={handleSubmit}
          input
          percentage
        />
        {/* <GenCheck
					state={airtimeToCashCommission}
					setState={setAirtimeToCashCommission}
					type={"airtimeToCashCommission"}
					label="Airtime to return percentage"
					loading={loading}
					loadingType={loadingType}
					handleSubmit={handleSubmit}
					input
					percentage
				/> */}
      </div>
    </Container>
  );
};

export const EnablerSettings = () => {
  const { usecase, getUseCase, numberWithCommas, nairaSign } =
    useContext(GlobalState);
  // console.log({ usecase });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let [cables, setCables] = useState(""),
    [education, setEducation] = useState(""),
    [electricity, setElectricity] = useState(""),
    [data, setData] = useState(""),
    [registration, setRegistration] = useState(""),
    [otpRegistration, setOtpRegistration] = useState(""),
    [fundWallet, setFundWallet] = useState(""),
    [transferFund, setTransferFund] = useState(""),
    [autoFund, setAutoFund] = useState(""),
    [airtimeToCash, setAirtimeToCash] = useState(""),
    [airtime, setAirtime] = useState(""),
    [airtimeMini, setAirtimeMini] = useState(""),
    [airtimeMax, setAirtimeMax] = useState(""),
    [airtimeToCashMini, setAirtimeToCashMini] = useState(""),
    [airtimeToCashMax, setAirtimeToCashMax] = useState(""),
    [cardFundingMini, setcardFundingMini] = useState(""),
    [cardFundingMax, setcardFundingMax] = useState(""),
    [stateData, setStateData] = useState(null),
    [loading, setLoading] = useState(false),
    [loadingType, setLoadingType] = useState(false),
    [resellerUpgrade, setResellerUpgrade] = useState(""),
    [resellerUpgradeFee, setResellerUpgradeFee] = useState(""),
    [topuserUpgrade, setTopUserUpgrade] = useState(""),
    [topuserUpgradeFee, setTopUserUpgradeFee] = useState(""),
    [fundWalletFlutterwave, setfundWalletFlutterwave] = useState(""),
    [fundWalletPaystack, setfundWalletPaystack] = useState(""),
    [fundWalletMonnify, setfundWalletMonnify] = useState(""),
    [fundWalletMonnifyCard, setfundWalletMonnifyCard] = useState(""),
    [fundWalletCebiz, setfundWalletCebiz] = useState(""),
    [mtnSme, setmtnSme] = useState(""),
    [mtnSme2, setmtnSme2] = useState(""),
    [mtnDg, setmtnDg] = useState(""),
    [mtnCg, setmtnCg] = useState(""),
    [airtelSme, setairtelSme] = useState(""),
    [airtelCg, setairtelCg] = useState(""),
    [airtelDg, setairtelDg] = useState(""),
    [gloCg, setgloCg] = useState(""),
    [gloDg, setgloDg] = useState(""),
    [gloSme, setgloSme] = useState(""),
    [gloNormal, setgloNormal] = useState(""),
    [mobile9Normal, setmobile9Normal] = useState(""),
    [mobile9CG, setmobile9CG] = useState(""),
    [mobile9DG, setmobile9DG] = useState(""),
    [mobile9Sme, setmobile9Sme] = useState(""),
    [referralBonus, setreferralBonus] = useState(""),
    [referralBonusType, setreferralBonusType] = useState(""),
    [referralBonusLimit, setreferralBonusLimit] = useState(""),
    [referralBonusValue, setreferralBonusValue] = useState(""),
    [referralBonusFixed, setreferralBonusFixed] = useState(""),
    [referralCommission, setreferralCommission] = useState(""),
    [submit, setSubmit] = useState(false);

  useEffect(() => {
    setStateData(usecase?.usecase);
  }, [usecase?.usecase]);

  useEffect(() => {
    if (stateData) {
      setCables(stateData?.cables);
      setEducation(stateData?.education);
      setElectricity(stateData?.electricity);
      setData(stateData?.data);
      setRegistration(stateData?.registration);
      setOtpRegistration(stateData?.otpRegistration);
      setFundWallet(stateData?.fundWallet);
      setTransferFund(stateData?.transferFund);
      setAutoFund(stateData?.autoFund);
      setAirtimeToCash(stateData?.airtimeToCash);
      setAirtime(stateData?.airtime);
      setAirtimeMini(stateData?.airtimeMini);
      setAirtimeMax(stateData?.airtimeMax);
      setAirtimeToCashMini(stateData?.airtimeToCashMini);
      setAirtimeToCashMax(stateData?.airtimeToCashMax);
      setcardFundingMini(stateData?.cardFundingMini);
      setcardFundingMax(stateData?.cardFundingMax);
      setResellerUpgrade(stateData?.resellerUpgrade);
      setResellerUpgradeFee(stateData?.resellerUpgradeFee);
      setTopUserUpgrade(stateData?.topuserUpgrade);
      setTopUserUpgradeFee(stateData?.topuserUpgradeFee);
      setfundWalletFlutterwave(stateData?.fundWalletFlutterwave);
      setfundWalletPaystack(stateData?.fundWalletPaystack);
      setfundWalletMonnify(stateData?.fundWalletMonnify);
      setfundWalletMonnifyCard(stateData?.fundWalletMonnifyCard);
      setfundWalletCebiz(stateData?.fundWalletCebiz);
      setmtnSme(stateData?.mtnSme);
      setmtnSme2(stateData?.mtnSme2);
      setmtnDg(stateData?.mtnDg);
      setmtnCg(stateData?.mtnCg);
      setgloCg(stateData?.gloCg);
      setgloDg(stateData?.gloDg);
      setgloSme(stateData?.gloSme);
      setgloNormal(stateData?.gloNormal);
      setmobile9Normal(stateData?.mobile9Normal);
      setmobile9CG(stateData?.mobile9CG);
      setmobile9DG(stateData?.mobile9DG);
      setmobile9Sme(stateData?.mobile9Sme);
      setairtelCg(stateData?.airtelCg);
      setairtelDg(stateData?.airtelDg);
      setairtelSme(stateData?.airtelSme);
      setreferralBonus(stateData?.referralBonus);
      setreferralBonusType(stateData?.referralBonusType);
      setreferralBonusFixed(stateData?.referralBonusFixed);
      setreferralBonusValue(stateData?.referralBonusValue);
      setreferralBonusLimit(stateData?.referralBonusLimit);
      setreferralCommission(stateData?.referralCommission);
    }
  }, [stateData]);

  useEffect(() => {
    if (submit && usecase?.isUpdated) {
      setSubmit(false);
    }
  }, [usecase?.isUpdated, submit]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // console.log({ usecase });

  let handleSubmit = (type) => async () => {
    if (type === "cables") if (!cables) return;
    if (type === "education") if (!education) return;
    if (type === "electricity") if (!electricity) return;
    if (type === "airtime") if (!airtime) return;
    if (type === "data") if (!data) return;
    if (type === "registration") if (!registration) return;
    if (type === "otpRegistration") if (!otpRegistration) return;
    if (type === "transferFund") if (!transferFund) return;
    if (type === "airtimeToCash") if (!airtimeToCash) return;
    if (type === "fundWallet") if (!fundWallet) return;
    if (type === "airtimeMini") if (!airtimeMini) return;
    if (type === "airtimeMax") if (!airtimeMax) return;
    if (type === "airtimeToCashMini") if (!airtimeToCashMini) return;
    if (type === "airtimeToCashMax") if (!airtimeToCashMax) return;
    if (type === "cardFundingMini") if (!cardFundingMini) return;
    if (type === "cardFundingMax") if (!cardFundingMax) return;
    if (type === "autoFund") if (!autoFund) return;
    if (type === "resellerUpgrade") if (!resellerUpgrade) return;
    if (type === "resellerUpgradeFee") if (!resellerUpgradeFee) return;
    if (type === "topuserUpgrade") if (!topuserUpgrade) return;
    if (type === "topuserUpgradeFee") if (!topuserUpgradeFee) return;
    if (type === "fundWalletFlutterwave") if (!fundWalletFlutterwave) return;
    if (type === "fundWalletPaystack") if (!fundWalletPaystack) return;
    if (type === "fundWalletMonnify") if (!fundWalletMonnify) return;
    if (type === "fundWalletMonnifyCard") if (!fundWalletMonnifyCard) return;
    if (type === "fundWalletCebiz") if (!fundWalletCebiz) return;
    if (type === "mtnSme") if (!mtnSme) return;
    if (type === "mtnDg") if (!mtnDg) return;
    if (type === "mtnCg") if (!mtnCg) return;
    if (type === "airtelCg") if (!airtelCg) return;
    if (type === "airtelDg") if (!airtelDg) return;
    if (type === "gloCg") if (!gloCg) return;
    if (type === "gloNormal") if (!gloNormal) return;
    if (type === "mobile9Normal") if (!mobile9Normal) return;
    if (type === "mobile9CG") if (!mobile9CG) return;
    if (type === "mobile9DG") if (!mobile9DG) return;
    if (type === "mobile9Sme") if (!mobile9Sme) return;
    if (type === "referralBonus") if (!referralBonus) return;
    if (type === "referralBonusType") if (!referralBonusType) return;
    if (type === "referralBonusFixed") if (!referralBonusFixed) return;
    if (type === "referralBonusLimit") if (!referralBonusLimit) return;
    if (type === "referralBonusValue") if (!referralBonusValue) return;
    if (type === "referralCommission") if (!referralCommission) return;

    let datum;
    if (type === "cables")
      datum = {
        cables: cables ? cables : stateData?.cables,
      };
    if (type === "resellerUpgrade")
      datum = {
        resellerUpgrade: resellerUpgrade
          ? resellerUpgrade
          : stateData?.resellerUpgrade,
      };
    if (type === "resellerUpgradeFee")
      datum = {
        resellerUpgradeFee: resellerUpgradeFee
          ? resellerUpgradeFee
          : stateData?.resellerUpgradeFee,
      };
    if (type === "topuserUpgrade")
      datum = {
        topuserUpgrade: topuserUpgrade
          ? topuserUpgrade
          : stateData?.topuserUpgrade,
      };
    if (type === "topuserUpgradeFee")
      datum = {
        topuserUpgradeFee: topuserUpgradeFee
          ? topuserUpgradeFee
          : stateData?.topuserUpgradeFee,
      };
    if (type === "airtime")
      datum = {
        airtime: airtime ? airtime : stateData?.airtime,
      };
    if (type === "education")
      datum = {
        education: education ? education : stateData?.education,
      };
    if (type === "electricity")
      datum = {
        electricity: electricity ? electricity : stateData?.electricity,
      };
    if (type === "data")
      datum = {
        data: data ? data : stateData?.data,
      };
    if (type === "otpRegistration")
      datum = {
        otpRegistration: otpRegistration
          ? otpRegistration
          : stateData?.otpRegistration,
      };
    if (type === "registration")
      datum = {
        registration: registration ? registration : stateData?.registration,
      };
    if (type === "fundWallet")
      datum = {
        fundWallet: fundWallet ? fundWallet : stateData?.fundWallet,
      };
    if (type === "transferFund")
      datum = {
        transferFund: transferFund ? transferFund : stateData?.transferFund,
      };
    if (type === "airtimeMini")
      datum = {
        airtimeMini: airtimeMini ? airtimeMini : stateData?.airtimeMini,
      };
    if (type === "airtimeMax")
      datum = {
        airtimeMax: airtimeMax ? airtimeMax : stateData?.airtimeMax,
      };
    if (type === "airtimeToCashMini")
      datum = {
        airtimeToCashMini: airtimeToCashMini
          ? airtimeToCashMini
          : stateData?.airtimeToCashMini,
      };
    if (type === "airtimeToCashMax")
      datum = {
        airtimeToCashMax: airtimeToCashMax
          ? airtimeToCashMax
          : stateData?.airtimeToCashMax,
      };
    if (type === "cardFundingMini")
      datum = {
        cardFundingMini: cardFundingMini
          ? cardFundingMini
          : stateData?.cardFundingMini,
      };
    if (type === "cardFundingMax")
      datum = {
        cardFundingMax: cardFundingMax
          ? cardFundingMax
          : stateData?.cardFundingMax,
      };
    if (type === "airtimeToCash")
      datum = {
        airtimeToCash: airtimeToCash ? airtimeToCash : stateData?.airtimeToCash,
      };
    if (type === "autoFund")
      datum = {
        autoFund: autoFund ? autoFund : stateData?.autoFund,
      };
    if (type === "fundWalletFlutterwave")
      datum = {
        fundWalletFlutterwave: fundWalletFlutterwave
          ? fundWalletFlutterwave
          : stateData?.fundWalletFlutterwave,
      };
    if (type === "fundWalletPaystack")
      datum = {
        fundWalletPaystack: fundWalletPaystack
          ? fundWalletPaystack
          : stateData?.fundWalletPaystack,
      };
    if (type === "fundWalletMonnify")
      datum = {
        fundWalletMonnify: fundWalletMonnify
          ? fundWalletMonnify
          : stateData?.fundWalletMonnify,
      };
    if (type === "fundWalletMonnifyCard")
      datum = {
        fundWalletMonnifyCard: fundWalletMonnifyCard
          ? fundWalletMonnifyCard
          : stateData?.fundWalletMonnifyCard,
      };
    if (type === "fundWalletCebiz")
      datum = {
        fundWalletCebiz: fundWalletCebiz
          ? fundWalletCebiz
          : stateData?.fundWalletCebiz,
      };
    if (type === "mtnSme")
      datum = {
        mtnSme: mtnSme ? mtnSme : stateData?.mtnSme,
      };
    if (type === "mtnSme2")
      datum = {
        mtnSme2: mtnSme2 ? mtnSme2 : stateData?.mtnSme2,
      };
    if (type === "mtnDg")
      datum = {
        mtnDg: mtnDg ? mtnDg : stateData?.mtnDg,
      };
    if (type === "mtnCg")
      datum = {
        mtnCg: mtnCg ? mtnCg : stateData?.mtnCg,
      };
    if (type === "airtelDg")
      datum = {
        airtelDg: airtelDg ? airtelDg : stateData?.airtelDg,
      };
    if (type === "airtelCg")
      datum = {
        airtelCg: airtelCg ? airtelCg : stateData?.airtelCg,
      };
    if (type === "airtelSme")
      datum = {
        airtelSme: airtelSme ? airtelSme : stateData?.airtelSme,
      };
    if (type === "gloCg")
      datum = {
        gloCg: gloCg ? gloCg : stateData?.gloCg,
      };
    if (type === "gloDg")
      datum = {
        gloDg: gloDg ? gloDg : stateData?.gloDg,
      };
    if (type === "gloSme")
      datum = {
        gloSme: gloSme ? gloSme : stateData?.gloSme,
      };
    if (type === "gloNormal")
      datum = {
        gloNormal: gloNormal ? gloNormal : stateData?.gloNormal,
      };
    if (type === "mobile9Normal")
      datum = {
        mobile9Normal: mobile9Normal ? mobile9Normal : stateData?.mobile9Normal,
      };
    if (type === "mobile9CG")
      datum = {
        mobile9CG: mobile9CG ? mobile9CG : stateData?.mobile9CG,
      };
    if (type === "mobile9DG")
      datum = {
        mobile9DG: mobile9DG ? mobile9DG : stateData?.mobile9DG,
      };
    if (type === "mobile9Sme")
      datum = {
        mobile9Sme: mobile9Sme ? mobile9Sme : stateData?.mobile9Sme,
      };
    if (type === "referralBonus")
      datum = {
        referralBonus: referralBonus ? referralBonus : stateData?.referralBonus,
      };
    if (type === "referralBonusType")
      datum = {
        referralBonusType: referralBonusType
          ? referralBonusType
          : stateData?.referralBonusType,
      };
    if (type === "referralBonusFixed")
      datum = {
        referralBonusFixed: referralBonusFixed
          ? referralBonusFixed
          : stateData?.referralBonusFixed,
      };
    if (type === "referralBonusLimit")
      datum = {
        referralBonusLimit: referralBonusLimit
          ? referralBonusLimit
          : stateData?.referralBonusLimit,
      };
    if (type === "referralBonusValue")
      datum = {
        referralBonusValue: referralBonusValue
          ? referralBonusValue
          : stateData?.referralBonusValue,
      };
    if (type === "referralCommission")
      datum = {
        referralCommission: referralCommission
          ? referralCommission
          : stateData?.referralCommission,
      };
    // console.log({ data, state });
    setLoadingType(type);
    setLoading(true);
    await getUseCase(datum);
    setLoading(false);
    setLoadingType(false);
    setSubmit(false);
  };

  return (
    <Container className="px-lg-5  pt-3 pt-lg-0">
      <div className="mb-5">
        <h5 className="Lexend fw-600 fontReduceBig">General Usecase</h5>
      </div>
      {stateData && (
        <div className="row mx-0">
          <p
            className={`col-md-6 fontReduce text-capitalize ${
              stateData?.airtime === "enable"
                ? "text-success2 text-success-2 text-success"
                : "text-danger2"
            } `}
          >
            Airtime: {`${stateData?.airtime}d`}
          </p>
          <p
            className={`col-md-6 fontReduce text-capitalize ${
              stateData?.cables === "enable"
                ? "text-success2 text-success-2 text-success"
                : "text-danger2"
            } `}
          >
            Cables: {`${stateData?.cables}d`}
          </p>
          <p
            className={`col-md-6 fontReduce text-capitalize ${
              stateData?.education === "enable"
                ? "text-success2 text-success-2 text-success"
                : "text-danger2"
            } `}
          >
            Education: {`${stateData?.education}d`}
          </p>
          <p
            className={`col-md-6 fontReduce text-capitalize ${
              stateData?.electricity === "enable"
                ? "text-success2 text-success-2 text-success"
                : "text-danger2"
            } `}
          >
            Electricity: {`${stateData?.electricity}d`}
          </p>
          <p
            className={`col-md-6 fontReduce text-capitalize ${
              stateData?.data === "enable"
                ? "text-success2 text-success-2 text-success"
                : "text-danger2"
            } `}
          >
            Data: {`${stateData?.data}d`}
          </p>
          <p
            className={`col-md-6 fontReduce text-capitalize ${
              stateData?.transferFund === "enable"
                ? "text-success2 text-success-2 text-success"
                : "text-danger2"
            } `}
          >
            wallet to wallet Transfer fund: {`${stateData?.transferFund}d`}
          </p>
          <p
            className={`col-md-6 fontReduce text-capitalize ${
              stateData?.registration === "enable"
                ? "text-success2 text-success-2 text-success"
                : "text-danger2"
            } `}
          >
            Registration: {`${stateData?.registration}d`}
          </p>
          <p
            className={`col-md-6 fontReduce text-capitalize ${
              stateData?.otpRegistration === "enable"
                ? "text-success2 text-success-2 text-success"
                : "text-danger2"
            } `}
          >
            Use OTP for Registration: {`${stateData?.otpRegistration}d`}
          </p>
          <p
            className={`col-md-6 fontReduce text-capitalize ${
              stateData?.fundWallet === "enable"
                ? "text-success2 text-success-2 text-success"
                : "text-danger2"
            } `}
          >
            card Fund wallet: {`${stateData?.fundWallet}d`}
          </p>
          <p
            className={`col-md-6 fontReduce text-capitalize ${
              stateData?.autoFund === "enable"
                ? "text-success2 text-success-2 text-success"
                : "text-danger2"
            } `}
          >
            Automatic wallet funding: {`${stateData?.autoFund}d`}
          </p>
          <p
            className={`col-md-6 fontReduce text-capitalize ${
              stateData?.airtimeToCash === "enable"
                ? "text-success2 text-success-2 text-success"
                : "text-danger2"
            } `}
          >
            Airtime to cash: {`${stateData?.airtimeToCash}d`}
          </p>
          <p className="col-md-6 fontReduce text-capitalize">
            Minimum airtime purchase: NGN{" "}
            {numberWithCommas(Number(stateData?.airtimeMini).toFixed(2))}
          </p>
          <p className="col-md-6 fontReduce text-capitalize">
            Maximum airtime purchase: NGN{" "}
            {numberWithCommas(Number(stateData?.airtimeMax).toFixed(2))}
          </p>
          <p className="col-md-6 fontReduce text-capitalize">
            Minimum Card funding: NGN{" "}
            {numberWithCommas(Number(stateData?.cardFundingMini).toFixed(2))}
          </p>
          <p className="col-md-6 fontReduce text-capitalize">
            Maximum Card funding: NGN{" "}
            {numberWithCommas(Number(stateData?.cardFundingMax).toFixed(2))}
          </p>
          <p className="col-md-6 fontReduce text-capitalize">
            Minimum airtime to cash conversion: NGN{" "}
            {numberWithCommas(Number(stateData?.airtimeToCashMini).toFixed(2))}
          </p>
          <p className="col-md-6 fontReduce text-capitalize">
            Maximum airtime to cash conversion: NGN{" "}
            {numberWithCommas(Number(stateData?.airtimeToCashMax).toFixed(2))}
          </p>
          <p
            className={`col-md-6 fontReduce text-capitalize ${
              stateData?.resellerUpgrade === "enable"
                ? "text-success2 text-success-2 text-success"
                : "text-danger2"
            } `}
          >
            Reseller upgrade: {`${stateData?.resellerUpgrade}d`}
          </p>
          <p className="col-md-6 fontReduce text-capitalize">
            Reseller upgrade fee: NGN{" "}
            {numberWithCommas(Number(stateData?.resellerUpgradeFee).toFixed(2))}
          </p>
          <p
            className={`col-md-6 fontReduce text-capitalize ${
              stateData?.topuserUpgrade === "enable"
                ? "text-success2 text-success-2 text-success"
                : "text-danger2"
            } `}
          >
            Topuser upgrade: {`${stateData?.topuserUpgrade}d`}
          </p>
          <p className="col-md-6 fontReduce text-capitalize">
            Topuser upgrade fee: NGN{" "}
            {numberWithCommas(Number(stateData?.topuserUpgradeFee).toFixed(2))}
          </p>
          <p
            className={`col-md-6 fontReduce text-capitalize ${
              stateData?.fundWalletFlutterwave === "enable"
                ? "text-success2 text-success-2 text-success"
                : "text-danger2"
            } `}
          >
            Fund wallet through Flutterwave:{" "}
            {`${stateData?.fundWalletFlutterwave}d`}
          </p>
          <p
            className={`col-md-6 fontReduce text-capitalize ${
              stateData?.fundWalletPaystack === "enable"
                ? "text-success2 text-success-2 text-success"
                : "text-danger2"
            } `}
          >
            Fund wallet through Paystack: {`${stateData?.fundWalletPaystack}d`}
          </p>
          <p
            className={`col-md-6 fontReduce text-capitalize ${
              stateData?.fundWalletMonnify === "enable"
                ? "text-success2 text-success-2 text-success"
                : "text-danger2"
            } `}
          >
            Monnify Visibility: {`${stateData?.fundWalletMonnify}d`}
          </p>
          <p
            className={`col-md-6 fontReduce text-capitalize ${
              stateData?.fundWalletMonnifyCard === "enable"
                ? "text-success2 text-success-2 text-success"
                : "text-danger2"
            } `}
          >
            Monnify Card: {`${stateData?.fundWalletMonnifyCard}d`}
          </p>
          {process.env.REACT_APP_AGENT_NAME === "Cebizpay" && (
            <p
              className={`col-md-6 fontReduce text-capitalize ${
                stateData?.fundWalletCebiz === "enable"
                  ? "text-success2 text-success-2 text-success"
                  : "text-danger2"
              } `}
            >
              Cebiz visibility: {`${stateData?.fundWalletCebiz}d`}
            </p>
          )}
          <p
            className={`col-md-6 fontReduce text-capitalize ${
              stateData?.mtnSme === "enable"
                ? "text-success2 text-success-2 text-success"
                : "text-danger2"
            } `}
          >
            MTN SME Data purchase: {`${stateData?.mtnSme}d`}
          </p>
          <p
            className={`col-md-6 fontReduce text-capitalize ${
              stateData?.mtnSme2 === "enable"
                ? "text-success2 text-success-2 text-success"
                : "text-danger2"
            } `}
          >
            MTN SME 2 Data purchase: {`${stateData?.mtnSme2}d`}
          </p>
          <p
            className={`col-md-6 fontReduce text-capitalize ${
              stateData?.mtnDg === "enable"
                ? "text-success2 text-success-2 text-success"
                : "text-danger2"
            } `}
          >
            MTN DG Data purchase: {`${stateData?.mtnDg}d`}
          </p>
          <p
            className={`col-md-6 fontReduce text-capitalize ${
              stateData?.mtnCg === "enable"
                ? "text-success2 text-success-2 text-success"
                : "text-danger2"
            } `}
          >
            MTN CG Data purchase: {`${stateData?.mtnCg}d`}
          </p>
          <p
            className={`col-md-6 fontReduce text-capitalize ${
              stateData?.airtelCg === "enable"
                ? "text-success2 text-success-2 text-success"
                : "text-danger2"
            } `}
          >
            AIRTEL CG Data purchase: {`${stateData?.airtelCg}d`}
          </p>
          <p
            className={`col-md-6 fontReduce text-capitalize ${
              stateData?.airtelDg === "enable"
                ? "text-success2 text-success-2 text-success"
                : "text-danger2"
            } `}
          >
            AIRTEL DG Data purchase: {`${stateData?.airtelDg}d`}
          </p>
          <p
            className={`col-md-6 fontReduce text-capitalize ${
              stateData?.airtelSme === "enable"
                ? "text-success2 text-success-2 text-success"
                : "text-danger2"
            } `}
          >
            AIRTEL SME Data purchase: {`${stateData?.airtelSme}d`}
          </p>
          <p
            className={`col-md-6 fontReduce text-capitalize ${
              stateData?.gloCg === "enable"
                ? "text-success2 text-success-2 text-success"
                : "text-danger2"
            } `}
          >
            GLO CG Data purchase: {`${stateData?.gloCg}d`}
          </p>
          <p
            className={`col-md-6 fontReduce text-capitalize ${
              stateData?.gloDg === "enable"
                ? "text-success2 text-success-2 text-success"
                : "text-danger2"
            } `}
          >
            GLO DG Data purchase: {`${stateData?.gloDg}d`}
          </p>
          <p
            className={`col-md-6 fontReduce text-capitalize ${
              stateData?.gloSme === "enable"
                ? "text-success2 text-success-2 text-success"
                : "text-danger2"
            } `}
          >
            GLO SME Data purchase: {`${stateData?.gloSme}d`}
          </p>
          <p
            className={`col-md-6 fontReduce text-capitalize ${
              stateData?.gloNormal === "enable"
                ? "text-success2 text-success-2 text-success"
                : "text-danger2"
            } `}
          >
            GLO Normal Data purchase: {`${stateData?.gloNormal}d`}
          </p>
          <p
            className={`col-md-6 fontReduce text-capitalize ${
              stateData?.mobile9Normal === "enable"
                ? "text-success2 text-success-2 text-success"
                : "text-danger2"
            } `}
          >
            9MOBILE Normal Data purchase: {`${stateData?.mobile9Normal}d`}
          </p>
          <p
            className={`col-md-6 fontReduce text-capitalize ${
              stateData?.mobile9CG === "enable"
                ? "text-success2 text-success-2 text-success"
                : "text-danger2"
            } `}
          >
            9MOBILE CG purchase: {`${stateData?.mobile9CG}d`}
          </p>
          <p
            className={`col-md-6 fontReduce text-capitalize ${
              stateData?.mobile9DG === "enable"
                ? "text-success2 text-success-2 text-success"
                : "text-danger2"
            } `}
          >
            9MOBILE DG purchase: {`${stateData?.mobile9DG}d`}
          </p>
          <p
            className={`col-md-6 fontReduce text-capitalize ${
              stateData?.mobile9Sme === "enable"
                ? "text-success2 text-success-2 text-success"
                : "text-danger2"
            } `}
          >
            9MOBILE SME purchase: {`${stateData?.mobile9Sme}d`}
          </p>
          <p
            className={`col-md-6 fontReduce text-capitalize ${
              stateData?.referralBonus === "enable"
                ? "text-success2 text-success-2 text-success"
                : "text-danger2"
            } `}
          >
            Referral Bonus: {`${stateData?.referralBonus}d`}
          </p>
          <p className="col-md-6 fontReduce text-capitalize">
            Referral bonus means: {stateData?.referralBonusType}
          </p>
          <p className="col-md-6 fontReduce text-capitalize">
            Referral bonus type: {stateData?.referralBonusFixed}
          </p>
          <p className="col-md-6 fontReduce text-capitalize">
            Referral bonus amount:{" "}
            {stateData?.referralBonusFixed === "fixed" ? nairaSign : null}{" "}
            {numberWithCommas(Number(stateData?.referralBonusValue).toFixed(2))}{" "}
            {stateData?.referralBonusFixed === "percentage" ? "%" : null}
          </p>
          <p className="col-md-6 fontReduce text-capitalize">
            Referral bonus limit:{" "}
            {numberWithCommas(Number(stateData?.referralBonusLimit))}
          </p>
          <p className="col-md-6 fontReduce text-capitalize">
            Referral upgrade bonus percentage:{" "}
            {numberWithCommas(Number(stateData?.referralCommission))}%
          </p>
        </div>
      )}
      <div className="row mx-0 g-4 pt-5">
        <GenCheck
          state={airtime}
          setState={setAirtime}
          type={"airtime"}
          label="airtime"
          loading={loading}
          loadingType={loadingType}
          handleSubmit={handleSubmit}
        />
        <GenCheck
          state={cables}
          setState={setCables}
          type={"cables"}
          label="cables"
          loading={loading}
          loadingType={loadingType}
          handleSubmit={handleSubmit}
        />
        <GenCheck
          state={education}
          setState={setEducation}
          type={"education"}
          label="education"
          loading={loading}
          loadingType={loadingType}
          handleSubmit={handleSubmit}
        />
        <GenCheck
          state={electricity}
          setState={setElectricity}
          type={"electricity"}
          label="electricity"
          loading={loading}
          loadingType={loadingType}
          handleSubmit={handleSubmit}
        />
        <GenCheck
          state={data}
          setState={setData}
          type={"data"}
          label="data"
          loading={loading}
          loadingType={loadingType}
          handleSubmit={handleSubmit}
        />
        <GenCheck
          state={registration}
          setState={setRegistration}
          type={"registration"}
          label="registration"
          loading={loading}
          loadingType={loadingType}
          handleSubmit={handleSubmit}
        />
        <GenCheck
          state={otpRegistration}
          setState={setOtpRegistration}
          type={"otpRegistration"}
          label="Otp registration"
          loading={loading}
          loadingType={loadingType}
          handleSubmit={handleSubmit}
        />
        <GenCheck
          state={fundWallet}
          setState={setFundWallet}
          type={"fundWallet"}
          label="Card Fund Wallet"
          loading={loading}
          loadingType={loadingType}
          handleSubmit={handleSubmit}
        />
        <GenCheck
          state={transferFund}
          setState={setTransferFund}
          type={"transferFund"}
          label="wallet to wallet Transfer fund"
          loading={loading}
          loadingType={loadingType}
          handleSubmit={handleSubmit}
        />
        <GenCheck
          state={autoFund}
          setState={setAutoFund}
          type={"autoFund"}
          label="automatic wallet funding"
          loading={loading}
          loadingType={loadingType}
          handleSubmit={handleSubmit}
        />
        <GenCheck
          state={airtimeToCash}
          setState={setAirtimeToCash}
          type={"airtimeToCash"}
          label="Airtime to cash"
          loading={loading}
          loadingType={loadingType}
          handleSubmit={handleSubmit}
        />
        <GenCheck
          state={airtimeMini}
          setState={setAirtimeMini}
          type={"airtimeMini"}
          label="Minimum Airtime purchase"
          loading={loading}
          loadingType={loadingType}
          handleSubmit={handleSubmit}
          input
        />
        <GenCheck
          state={airtimeMax}
          setState={setAirtimeMax}
          type={"airtimeMax"}
          label="Maximum Airtime purchase"
          loading={loading}
          loadingType={loadingType}
          handleSubmit={handleSubmit}
          input
        />
        <GenCheck
          state={airtimeToCashMini}
          setState={setAirtimeToCashMini}
          type={"airtimeToCashMini"}
          label="Minimum Airtime to cash conversion"
          loading={loading}
          loadingType={loadingType}
          handleSubmit={handleSubmit}
          input
        />
        <GenCheck
          state={airtimeToCashMax}
          setState={setAirtimeToCashMax}
          type={"airtimeToCashMax"}
          label="Maximum Airtime to cash conversion"
          loading={loading}
          loadingType={loadingType}
          handleSubmit={handleSubmit}
          input
        />
        <GenCheck
          state={cardFundingMini}
          setState={setcardFundingMini}
          type={"cardFundingMini"}
          label="Minimum Card Funding"
          loading={loading}
          loadingType={loadingType}
          handleSubmit={handleSubmit}
          input
        />
        <GenCheck
          state={cardFundingMax}
          setState={setcardFundingMax}
          type={"cardFundingMax"}
          label="Maximum Card Funding"
          loading={loading}
          loadingType={loadingType}
          handleSubmit={handleSubmit}
          input
        />
        <GenCheck
          state={resellerUpgrade}
          setState={setResellerUpgrade}
          type={"resellerUpgrade"}
          label="Reseller upgrade"
          loading={loading}
          loadingType={loadingType}
          handleSubmit={handleSubmit}
        />
        <GenCheck
          state={resellerUpgradeFee}
          setState={setResellerUpgradeFee}
          type={"resellerUpgradeFee"}
          label="Reseller upgrade fee"
          loading={loading}
          loadingType={loadingType}
          handleSubmit={handleSubmit}
          input
        />
        <GenCheck
          state={topuserUpgrade}
          setState={setTopUserUpgrade}
          type={"topuserUpgrade"}
          label="Topuser upgrade"
          loading={loading}
          loadingType={loadingType}
          handleSubmit={handleSubmit}
        />
        <GenCheck
          state={topuserUpgradeFee}
          setState={setTopUserUpgradeFee}
          type={"topuserUpgradeFee"}
          label="Topuser upgrade fee"
          loading={loading}
          loadingType={loadingType}
          handleSubmit={handleSubmit}
          input
        />
        <GenCheck
          state={fundWalletFlutterwave}
          setState={setfundWalletFlutterwave}
          type={"fundWalletFlutterwave"}
          label="Fund wallet through Flutterwave"
          loading={loading}
          loadingType={loadingType}
          handleSubmit={handleSubmit}
        />
        <GenCheck
          state={fundWalletPaystack}
          setState={setfundWalletPaystack}
          type={"fundWalletPaystack"}
          label="Fund wallet through Paystack"
          loading={loading}
          loadingType={loadingType}
          handleSubmit={handleSubmit}
        />
        <GenCheck
          state={fundWalletMonnify}
          setState={setfundWalletMonnify}
          type={"fundWalletMonnify"}
          label="Monnify visibility"
          loading={loading}
          loadingType={loadingType}
          handleSubmit={handleSubmit}
        />
        <GenCheck
          state={fundWalletMonnifyCard}
          setState={setfundWalletMonnifyCard}
          type={"fundWalletMonnifyCard"}
          label="Monnify Card"
          loading={loading}
          loadingType={loadingType}
          handleSubmit={handleSubmit}
        />
        {process.env.REACT_APP_AGENT_NAME === "Cebizpay" && (
          <GenCheck
            state={fundWalletCebiz}
            setState={setfundWalletCebiz}
            type={"fundWalletCebiz"}
            label="Cebiz visibility"
            loading={loading}
            loadingType={loadingType}
            handleSubmit={handleSubmit}
          />
        )}
        <GenCheck
          state={mtnSme}
          setState={setmtnSme}
          type={"mtnSme"}
          label="MTN SME Data Purchase"
          loading={loading}
          loadingType={loadingType}
          handleSubmit={handleSubmit}
        />
        <GenCheck
          state={mtnSme2}
          setState={setmtnSme2}
          type={"mtnSme2"}
          label="MTN SME2 Data Purchase"
          loading={loading}
          loadingType={loadingType}
          handleSubmit={handleSubmit}
        />
        <GenCheck
          state={mtnDg}
          setState={setmtnDg}
          type={"mtnDg"}
          label="MTN DG Data Purchase"
          loading={loading}
          loadingType={loadingType}
          handleSubmit={handleSubmit}
        />
        <GenCheck
          state={mtnCg}
          setState={setmtnCg}
          type={"mtnCg"}
          label="MTN CG Data Purchase"
          loading={loading}
          loadingType={loadingType}
          handleSubmit={handleSubmit}
        />
        <GenCheck
          state={airtelDg}
          setState={setairtelDg}
          type={"airtelDg"}
          label="AIRTEL DG Data Purchase"
          loading={loading}
          loadingType={loadingType}
          handleSubmit={handleSubmit}
        />
        <GenCheck
          state={airtelCg}
          setState={setairtelCg}
          type={"airtelCg"}
          label="AIRTEL CG Data Purchase"
          loading={loading}
          loadingType={loadingType}
          handleSubmit={handleSubmit}
        />
        <GenCheck
          state={airtelSme}
          setState={setairtelSme}
          type={"airtelSme"}
          label="AIRTEL SME Data Purchase"
          loading={loading}
          loadingType={loadingType}
          handleSubmit={handleSubmit}
        />
        <GenCheck
          state={gloCg}
          setState={setgloCg}
          type={"gloCg"}
          label="GLO CG Data Purchase"
          loading={loading}
          loadingType={loadingType}
          handleSubmit={handleSubmit}
        />
        <GenCheck
          state={gloDg}
          setState={setgloDg}
          type={"gloDg"}
          label="GLO DG Data Purchase"
          loading={loading}
          loadingType={loadingType}
          handleSubmit={handleSubmit}
        />
        <GenCheck
          state={gloSme}
          setState={setgloSme}
          type={"gloSme"}
          label="GLO SME Data Purchase"
          loading={loading}
          loadingType={loadingType}
          handleSubmit={handleSubmit}
        />
        <GenCheck
          state={gloNormal}
          setState={setgloNormal}
          type={"gloNormal"}
          label="GLO Normal Data Purchase"
          loading={loading}
          loadingType={loadingType}
          handleSubmit={handleSubmit}
        />
        <GenCheck
          state={mobile9Normal}
          setState={setmobile9Normal}
          type={"mobile9Normal"}
          label="9MOBILE Normal Data Purchase"
          loading={loading}
          loadingType={loadingType}
          handleSubmit={handleSubmit}
        />
        <GenCheck
          state={mobile9CG}
          setState={setmobile9CG}
          type={"mobile9CG"}
          label="9MOBILE CG Data Purchase"
          loading={loading}
          loadingType={loadingType}
          handleSubmit={handleSubmit}
        />
        <GenCheck
          state={mobile9DG}
          setState={setmobile9DG}
          type={"mobile9DG"}
          label="9MOBILE DG Data Purchase"
          loading={loading}
          loadingType={loadingType}
          handleSubmit={handleSubmit}
        />
        <GenCheck
          state={mobile9Sme}
          setState={setmobile9Sme}
          type={"mobile9Sme"}
          label="9MOBILE SME Data Purchase"
          loading={loading}
          loadingType={loadingType}
          handleSubmit={handleSubmit}
        />
        <GenCheck
          state={referralBonus}
          setState={setreferralBonus}
          type={"referralBonus"}
          label="Referral Bonus"
          loading={loading}
          loadingType={loadingType}
          handleSubmit={handleSubmit}
        />
        <GenCheck
          state={referralBonusType}
          setState={setreferralBonusType}
          type={"referralBonusType"}
          label="Referral Bonus Means"
          loading={loading}
          loadingType={loadingType}
          handleSubmit={handleSubmit}
          arr={[
            { value: "wallet", title: "Wallet" },
            { value: "transaction", title: "Transaction" },
          ]}
        />
        <GenCheck
          state={referralBonusFixed}
          setState={setreferralBonusFixed}
          type={"referralBonusFixed"}
          label="Referral Bonus Type"
          loading={loading}
          loadingType={loadingType}
          handleSubmit={handleSubmit}
          arr={[
            { value: "fixed", title: "Fixed" },
            { value: "percentage", title: "Percentage" },
          ]}
        />
        <GenCheck
          state={referralBonusValue}
          setState={setreferralBonusValue}
          type={"referralBonusValue"}
          label="Referral bonus Value"
          loading={loading}
          loadingType={loadingType}
          handleSubmit={handleSubmit}
          input
        />
        <GenCheck
          state={referralBonusLimit}
          setState={setreferralBonusLimit}
          type={"referralBonusLimit"}
          label="Referral bonus limit"
          loading={loading}
          loadingType={loadingType}
          handleSubmit={handleSubmit}
          input
        />
        <GenCheck
          state={referralCommission}
          setState={setreferralCommission}
          type={"referralCommission"}
          label="Referral upgrade bonus percentage"
          loading={loading}
          loadingType={loadingType}
          handleSubmit={handleSubmit}
          input
          percentage
        />
      </div>
    </Container>
  );
};

let GenCheck = ({
  state,
  setState,
  type,
  loading,
  loadingType,
  label,
  handleSubmit,
  input,
  percentage,
  arr,
}) => {
  return (
    <div className="mb-3 d-flex justify-content-center col-md-6">
      <div className="w-75 w75">
        <label
          htmlFor="Price"
          className="mb-3 textColor2 text-capitalize fontReduce"
        >
          {label}
        </label>
        {input ? (
          <input
            type="number"
            name="Price"
            className="form-control w-100 py-3 borderColor"
            placeholder={percentage ? "2%" : "2,000"}
            value={state}
            onChange={(e) => setState(e.target.value)}
            min={0}
          />
        ) : (
          <select
            type="number"
            name="Price"
            className="form-control w-100 py-3 borderColor form-select"
            placeholder="Enable"
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            <option value="">Select one</option>
            {arr ? (
              arr?.map((item, i) => (
                <option value={item?.value} key={i}>
                  {item?.title}
                </option>
              ))
            ) : (
              <>
                <option value="enable">Enabled</option>
                <option value="disable">Disabled</option>
              </>
            )}
          </select>
        )}
        <Buttons
          loading={loadingType === type && loading}
          title="update"
          css="btn btn-primary1 text-capitalize py-3 w-75 w75 d-block mx-auto my-4"
          width={"w-75 w75"}
          onClick={handleSubmit(type)}
        />
      </div>
    </div>
  );
};

export const ProfileForm = ({ state, textChange }) => {
  let params = useParams();
  return (
    <div className="row mx-0 g-3 g-md-5">
      <div className="col-md-6">
        <label className="dmMonoFont text-uppercase" htmlFor="firstName">
          First Name
        </label>
        <input
          type="text"
          className="form-control py-3 dmMonoFont"
          name="firstName"
          value={state?.firstName}
          onChange={textChange("firstName")}
          readOnly={params?.page === "users"}
        />
      </div>
      <div className="col-md-6">
        <label className="dmMonoFont text-uppercase" htmlFor="lastName">
          Last Name
        </label>
        <input
          type="text"
          className="form-control py-3 dmMonoFont"
          name="lastName"
          value={state?.lastName}
          onChange={textChange("lastName")}
          readOnly={params?.page === "users"}
        />
      </div>
      <div className="col-md-6">
        <label className="dmMonoFont text-uppercase" htmlFor="gender">
          Gender
        </label>
        <input
          type="text"
          className="form-control py-3 dmMonoFont"
          name="gender"
          value={state?.gender}
          onChange={textChange("gender")}
          placeholder="Gender"
          readOnly={params?.page === "users"}
        />
      </div>
      <div className="col-md-6">
        <label className="dmMonoFont text-uppercase" htmlFor="bio">
          Bio
        </label>
        <textarea
          style={{
            height: "10rem",
            resize: "none",
          }}
          className="form-control py-3 dmMonoFont"
          name="bio"
          placeholder="Brief description"
          value={state?.bio}
          onChange={textChange("bio")}
          readOnly={params?.page === "users"}
        />
      </div>
    </div>
  );
};

export const BVNAddForm = () => {
	const [bvn, setBVN] = useState("");
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
  
	const handleInput = (e) => {
	  setBVN(e?.target?.value)
	  
	};
  
	const handleSubmit = async (e) => {
	  
	  e?.preventDefault();
  
	  try {
		setLoading(true);
		const res = await axios.put(`/api/v1/user/updateBvn`, {bvn});
		if (res?.data?.msg) {
		  setSuccessMessage(res?.data?.msg);
		}
		setBVN("");
		setErrorMessage("");
	  } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrorMessage(err.response.data.msg); // Set error message from server response
      } else {
        setErrorMessage("An error occurred."); // Set a generic error message for other errors
      }
	  } finally {
		setLoading(false);
	  }
	};
  
	return (
	  <div className="py-4 py-md-5">
		<h6 className="Lexend fw-600 fontReduceBig text-uppercase mt-3 mt-md-5">
		  Update BVN
		</h6>
		<small className="mt-3 mt-md-5">
		  As required by CBN for account verification, ensure all details are
		  correctly filled and corresponds with your BVN registration details for
		  quick verification. Thank You
		</small>
		<div className="row mx-0 g-5 col-md-8 mt-3">
		  {/* <div className="col-md-6">
			<label className="dmMonoFont text-uppercase" htmlFor="name">
			  Name
			</label>
			<input
			  type="name"
			  className="form-control py-3 dmMonoFont"
			  name="name"
			  placeholder="Enter Full Name"
			  value={name}
			  onChange={handleInput}
			/>
			  <small>Input name registerd with your bvn</small>
  
		  </div> */}
		  {/* <div className="col-md-6">
			<label className="dmMonoFont text-uppercase" htmlFor="dateOfBirth">
			  Date Of Birth
			</label>
			<input
			  type="dob"
			  className="form-control py-3 dmMonoFont"
			  name="dob"
			  placeholder="DD/MM/YYYY"
			  value={dateOfBirth}
			  onChange={handleInput}
			/>
			  <small>Input in correct format e.g DD/MM/YYYY </small>
		  </div> */}
		  {/* <div className="col-md-6">
			<label className="dmMonoFont text-uppercase" htmlFor="mobileNumber">
			  Phone Number
			</label>
			<input
			  type="mobileNumber"
			  className="form-control py-3 dmMonoFont"
			  name="mobileNo"
			  placeholder="Enter Phone Number"
			  value={mobileNo}
			  onChange={handleInput}
			/>
			  <small>Input the number linked to your BVN</small>
		  </div> */}
  
		  <div className="col-md-6">
			<label className="dmMonoFont text-uppercase" htmlFor="bvn">
			  Bvn
			</label>
			<input
			  type="bvn"
			  className="form-control py-3 dmMonoFont"
			  name="bvn"
			  placeholder="Enter Bvn"
			  value={bvn}
			  onChange={handleInput}
			/>
			  <small>Input your 11 digit BVN</small>
		  </div>
		</div>
		{errorMessage && <p className="text-red">{errorMessage}</p>}
		{successMessage && <p className="text-green">{successMessage}</p>}
		<div className="d-flex align-items-center my-3">
		  <Buttons
			onClick={handleSubmit}
			loading={loading}
			css="btn-primary1 text-capitalize px-md-4 px-3 fontReduce mx-md-3 mx-2 py-2 text-white"
			title={"Update Bvn"}
			width="w-auto"
		  />
		</div>
	  </div>
	);
  };

export const PasswordBox = () => {
  let { updatePassword, auth } = useContext(GlobalState);
  let init = {
      oldPassword: "",
      newPassword: "",
    },
    [state, setState] = useState(init),
    [loading, setLoading] = useState(false),
    [submit, setSubmit] = useState(false),
    textChange =
      (name) =>
      ({ target: { value } }) => {
        setState({ ...state, [name]: value });
      },
    handleSubmit = async (e) => {
      e.preventDefault();
      if (!state?.oldPassword || !state?.newPassword) return;
      setLoading(true);
      await updatePassword(state);
      setLoading(false);
      setSubmit(true);
    };

  useEffect(() => {
    if (submit && auth?.isPassword) {
      setState(init);
      setSubmit(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submit, auth?.isPassword]);

  return (
    <div className="py-4 py-md-5">
      <h6 className="Lexend fw-600 fontReduceBig text-uppercase mt-3 mt-md-5">
        change password
      </h6>
      <small className="">
        Please enter your current password to change your password.
      </small>
      <div className="row mx-0 g-5 col-md-8 mt-3">
        <div className="col-md-6">
          <label className="dmMonoFont text-uppercase" htmlFor="password">
            old Password
          </label>
          <input
            type="password"
            className="form-control py-3 dmMonoFont"
            name="password"
            placeholder="Old Password"
            value={state?.oldPassword}
            onChange={textChange("oldPassword")}
          />
        </div>
        <div className="col-md-6">
          <label className="dmMonoFont text-uppercase" htmlFor="password">
            new Password
          </label>
          <input
            type="password"
            className="form-control py-3 dmMonoFont"
            name="password"
            placeholder="New Password"
            value={state?.newPassword}
            onChange={textChange("newPassword")}
          />
        </div>
      </div>
      <div className="d-flex align-items-center my-3">
        <Buttons
          onClick={handleSubmit}
          loading={loading}
          css="btn-primary1 text-capitalize px-md-4 px-3 fontReduce mx-md-3 mx-2 py-2 text-white"
          title={"save"}
          width="w-auto"
        />
        <button
          onClick={() => setState(init)}
          type="button"
          className={`btn btn-outline-primary1 text-capitalize px-md-4 px-3 fontReduce mx-md-3 mx-2 py-2 text-primary1`}
        >
          cancel
        </button>
      </div>
    </div>
  );
};

export const WalletPinBox = () => {
  let { manageWalletPin, wallet } = useContext(GlobalState);
  let init = {
      pin: "",
      oldPin: "",
    },
    [state, setState] = useState(init),
    [loading, setLoading] = useState(false),
    [submit, setSubmit] = useState(false),
    textChange =
      (name) =>
      ({ target: { value } }) => {
        setState({ ...state, [name]: value });
      },
    handleSubmit = async (e) => {
      e.preventDefault();
      if (wallet?.balance?.wallet_pin)
        if (!state?.pin || !state?.oldPin) return;
        else if (!state?.pin) return;
      setLoading(true);
      await manageWalletPin(
        wallet?.balance?.wallet_pin ? "put" : "post",
        state
      );
      setLoading(false);
      setSubmit(true);
    };

  useEffect(() => {
    if (submit && wallet?.isWalletPin) {
      setState(init);
      setSubmit(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submit, wallet?.isWalletPin]);

  return (
    <form
      onSubmit={handleSubmit}
      className="py-4 py-md-5 border-top border-bottom"
    >
      <h6 className="Lexend fw-600 fontReduceBig text-uppercase mt-3 mt-md-5">
        manage transaction pin
      </h6>
      <small className="">
        {wallet?.balance?.wallet_pin
          ? `Please enter your current pin to change your pin.`
          : `Add transaction pin`}
      </small>
      <div className="row mx-0 g-5 col-md-8 mt-3">
        {wallet?.balance?.wallet_pin && (
          <div className="col-md-6">
            <label className="dmMonoFont text-uppercase" htmlFor="password">
              old pin <small className="text-muted">4 digits</small>
            </label>
            <input
              type="number"
              className="form-control py-3 dmMonoFont"
              name="password"
              placeholder="Old pin"
              value={state?.oldPin}
              onChange={textChange("oldPin")}
              maxLength={4}
            />
          </div>
        )}
        <div className="col-md-6">
          <label className="dmMonoFont text-uppercase" htmlFor="password">
            Pin<small className="text-muted">4 digits</small>
          </label>
          <input
            type="number"
            className="form-control py-3 dmMonoFont"
            name="password"
            placeholder="Pin"
            value={state?.pin}
            onChange={textChange("pin")}
            maxLength={4}
          />
        </div>
      </div>
      <div className="d-flex align-items-center my-3">
        <Buttons
          onClick={handleSubmit}
          loading={loading}
          css="btn-primary1 text-capitalize px-md-4 px-3 fontReduce mx-md-3 mx-2 py-2 text-white"
          title={"save"}
          width="w-auto"
        />
        <button
          onClick={() => setState(init)}
          type="button"
          className={`btn btn-outline-primary1 text-capitalize px-md-4 px-3 fontReduce mx-md-3 mx-2 py-2 text-primary1`}
        >
          cancel
        </button>
      </div>
    </form>
  );
};
