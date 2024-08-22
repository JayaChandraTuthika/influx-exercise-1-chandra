"use client";
import Image from "next/image";
import React, { use, useState } from "react";

import stateCities from "./data/stateCities.json";
import planData from "./data/billingCycle.json";
import { useRouter } from "next/navigation";

const StepActions = ({
  currentStep,
  selectTheatreCity,
  selectBillingCycle,
  selectUserEmail,
  setCheckoutDetails,
}) => {
  const [regionInput, setRegionInput] = useState("");
  const [validInput, setValidInput] = useState(false);
  const [filteredRegions, setFilteredRegions] = useState([]);
  const [activePlan, setActivePlan] = useState(planData[0]);
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [cardError, setCardError] = useState(false);

  const [termsAgreed, setToggleTermsAgree] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const router = useRouter();

  const onChangeRegionInput = (e) => {
    setValidInput(false);
    // console.log(e.target.value);
    setRegionInput(e.target.value);
    let newFilteredCities = [];
    if (e.target.value !== "") {
      newFilteredCities = stateCities.filter(({ city, state }) => {
        if (city.includes(regionInput) || state.includes(regionInput)) {
          return true;
        }
      });
      setFilteredRegions((prev) => {
        newFilteredCities = stateCities.filter(({ city, state }) => {
          if (
            city.toLowerCase().includes(regionInput.toLowerCase()) ||
            state.toLowerCase().includes(regionInput.toLowerCase())
          ) {
            return true;
          }
        });
        return newFilteredCities;
      });
    }
  };

  const selectTheatre = ({ city, state }) => {
    setRegionInput(`${city}, ${state}`);
    setValidInput(true);

    // selectTheatreCity({ city, state });
  };

  const selectPlanItem = (i) => {
    setActivePlan(planData[i]);
  };

  const showStep2 = () => {
    if (validInput) {
      selectTheatreCity(regionInput);
    }
  };

  const showStep3 = () => {
    selectBillingCycle(activePlan.name);
  };

  const submitUserDetails = (e) => {
    e.preventDefault();
    const verified = verifyEmailId();
    if (verified) {
      setEmailError(false);
      if (!password || password == "") {
        setPasswordError(true);
      } else {
        setPasswordError(false);
        selectUserEmail(emailId);
      }
    } else {
      setEmailError(true);
    }
  };

  const verifyEmailId = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(emailId);
  };

  const submitCreditCardDetails = (e) => {
    e.preventDefault();
    if (!cardNumber || cardNumber == "") {
      setCardError(true);
    } else {
      setCheckoutDetails({
        cardNumber: cardNumber,
        time: new Date(),
      });
      router.replace("/confirmation");
    }
  };

  const toggleAgreeTerms = () => {
    setToggleTermsAgree(!termsAgreed);
  };

  const submitPaymentDetails = () => {
    if (!cardNumber || cardNumber == "") {
      setCardError(true);
    } else {
      router.replace("/confirmation");
    }
  };

  const renderActionDiv1 = () => {
    return (
      <div className="black-form action1">
        <p className="step-text">STEP 1/2</p>
        <p className="text-1">Pick your favourite Marcus theatre</p>
        <div className="search-input">
          <Image
            src="/icons/Icon-4.svg"
            className="icon"
            height={14}
            width={14}
            alt="icon"
          />
          <input
            type="text"
            onInput={onChangeRegionInput}
            value={regionInput}
          />
        </div>
        <div className="results-list">
          {regionInput !== "" &&
            filteredRegions.map(({ city, state }) => {
              const selectCity = () => {
                selectTheatre({ city, state });
              };
              return (
                <p className="item" onClick={selectCity} key={city}>
                  {city}, {state}
                </p>
              );
            })}
        </div>
        <div className="buttons-container">
          <button className="back" onClick={() => router.back()}>
            Back
          </button>
          {validInput ? (
            <button className="save" onClick={showStep2}>
              Save & Next
            </button>
          ) : (
            <button className="save" disabled>
              Save & Next
            </button>
          )}
        </div>
      </div>
    );
  };

  const renderActionDiv2 = () => {
    return (
      <div className="black-form action1">
        <p className="step-text">STEP 2/2</p>
        <p className="text-1">Choose your billing cycle</p>
        <div className="plans">
          {planData.map((plan, planIndex) => {
            const selected = plan.name === activePlan.name;
            return (
              <div
                key={planIndex}
                className={`plan-item ${selected ? "selected" : ""}`}
                onClick={() => selectPlanItem(planIndex)}
              >
                {plan.label !== "" && (
                  <span className={`label ${selected ? "selected" : ""}`}>
                    {plan.label}
                  </span>
                )}

                {selected ? (
                  <Image
                    src="/icons/Icon-5.svg"
                    className="icon"
                    width={20}
                    height={20}
                    alt="icon"
                  />
                ) : (
                  <div className="circle"></div>
                )}

                <div className="details">
                  <p className="name">{plan.name}</p>
                  <p className="price">
                    {"$"}
                    {plan.price_per_month}
                    <span>/mo</span>
                  </p>
                  {plan.description !== "" && (
                    <p className="description">{plan.description}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="buttons-container">
          <button className="back" onClick={() => router.back()}>
            Back
          </button>

          <button className="save" onClick={showStep3}>
            Save & Next
          </button>
        </div>
      </div>
    );
  };
  const renderActionDiv3 = () => {
    return (
      <form className="black-form action3" onSubmit={submitUserDetails}>
        <p className="login-text-1">Login to redeem rewards</p>
        <p className="login-text-2">
          Don't have an account? You can enroll in the next step
        </p>
        <label htmlFor="">Email Addresss or MMR number*</label>
        <br />
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          value={emailId}
        />
        <br />
        <label htmlFor="">Password*</label>
        <br />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        {emailError && <p className="login-error">Invalid Email Id</p>}
        {passwordError && <p className="login-error">Enter valid password</p>}

        <button type="submit" className="login-btn">
          Send login code
        </button>
        <p className="signup-text">
          Don't have an account? <span>Sign up</span>
        </p>
      </form>
    );
  };
  const renderActionDiv4 = () => {
    return (
      <>
        <div className="black-form action3">
          <p className="login-text-1 mb-3">Terms & Conditions*</p>
          <div className="signup-text mt-2">
            <input
              type="checkbox"
              className="box"
              onChange={toggleAgreeTerms}
              checked={termsAgreed}
            />
            <p>
              I agree to the
              <span>Terms & Conditions, Privacy Policy</span> &{" "}
              <span>Refund Policy</span>
            </p>
          </div>
        </div>
        <form className="black-form action3" onSubmit={submitCreditCardDetails}>
          <p className="login-text-1 mb-3">
            <Image
              src="/icons/Icon-6.svg"
              className="card-icon"
              height={20}
              width={20}
              alt="icon"
            />
            Credit / Debit card
          </p>

          <label htmlFor="">Cardholder Name*</label>
          <br />
          <input type="text" />
          <br />
          <label htmlFor="">Card Number*</label>
          <br />
          <input
            type="text"
            onChange={(e) => {
              setCardNumber(e.target.value);
            }}
            value={cardNumber}
          />
          <div className="row">
            <div className="col-6">
              <label htmlFor="">Expiration Date*</label>
              <br />
              <input type="text" />
            </div>
            <div className="col-6">
              <label htmlFor="">CVV*</label>
              <br />
              <input type="password" />
            </div>
          </div>
          <div className="signup-text mt-2">
            <input type="checkbox" className="box" />
            <p>
              I agree to consent to use the same card for renewals.{" "}
              <span>Learn more</span>
            </p>
          </div>
          <button type="submit" className="login-btn" disabled={!termsAgreed}>
            Complete payment
          </button>
          {cardError && <p className="login-error">Enter Valid card number</p>}
          <p className="final-text-billing">
            <Image
              src="/icons/Icon-1.svg"
              className="icon"
              height={14}
              width={14}
              alt="icon"
            />
            <span>
              Subscription payment will auto-billed on 25 Oct 2025 for &115.89
              from your credit card. unless cancelled otherwise
            </span>
          </p>
        </form>
      </>
    );
  };

  return (
    <div className="steps-column-2">
      {currentStep === 1
        ? renderActionDiv1()
        : currentStep === 2
        ? renderActionDiv2()
        : currentStep === 3
        ? renderActionDiv3()
        : currentStep === 4
        ? renderActionDiv4()
        : null}
    </div>
  );
};

export default StepActions;
