"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import billingData from "./data/billingCycle.json";

const initialSteps = [
  {
    id: 1,
    title: "STEP 1",
    value: "Pick your theatre",
    selectedvalue: "",
    active: true,
    completed: false,
  },
  {
    id: 2,
    title: "STEP 2",
    value: "Select billing cycle",
    selectedvalue: "",
    active: false,
    completed: false,
  },
  {
    id: 3,
    title: "LOGIN",
    value: "Login or Sign up",
    selectedvalue: "",
    active: false,
    completed: false,
  },
  {
    id: 4,
    title: "CHECKOUT",
    value: "Select payment method",
    selectedvalue: "",
    active: false,
    completed: false,
  },
];

const SubscriptionSteps = ({ currentStep, subscriptionDetails }) => {
  const [allSteps, setAllSteps] = useState(initialSteps);

  useEffect(() => {
    const newSteps = allSteps.map((each) => {
      if (each.id === currentStep) {
        return { ...each, active: true, completed: false };
      } else if (each.id < currentStep) {
        return { ...each, active: false, completed: true };
      } else {
        return { ...each, active: false, completed: false };
      }
    });
    if (subscriptionDetails.theatre !== "") {
      newSteps[0].selectedvalue = subscriptionDetails.theatre;
    }
    if (subscriptionDetails.billingCycle !== "") {
      newSteps[1].selectedvalue = subscriptionDetails.billingCycle;
    }
    if (subscriptionDetails.loginEmail !== "") {
      newSteps[2].selectedvalue = subscriptionDetails.loginEmail;
    }
    // console.log(newSteps);
    setAllSteps(newSteps);
  }, [currentStep]);
  const stepsComponents = () => {
    return (
      <div className="steps-list-container">
        {allSteps.map((step, index) => {
          return (
            <div className="step-item" key={index}>
              <div
                className={`circle ${step.active ? "active" : ""} ${
                  step.completed ? "completed" : ""
                }`}
              >
                {step.completed && (
                  <Image
                    src="/icons/icon-7.svg"
                    className="completed-tick"
                    height={20}
                    width={20}
                    alt="icon"
                  />
                )}
                {step.active && <span className="filled-circle"></span>}
              </div>
              {index < allSteps.length - 1 && (
                <span
                  className={`connecting-line ${
                    step.completed ? "completed" : ""
                  }`}
                ></span>
              )}

              <div className="text-container">
                <p className="title">
                  {step.id === 1 || step.id === 2
                    ? step.selectedvalue !== ""
                      ? step.value
                      : step.title
                    : step.title}
                </p>
                <p
                  className="value"
                  style={{
                    color: `${
                      step.selectedvalue === ""
                        ? "rgba(255, 255, 255, 0.342)"
                        : "rgba(255, 255, 255, 0.781)"
                    }`,
                  }}
                >
                  {step.selectedvalue === "" ? step.value : step.selectedvalue}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  let priceFinal = 0;
  let selectedBill = billingData.find(
    (b) => b.name === subscriptionDetails.billingCycle
  );
  if (subscriptionDetails.billingCycle !== "") {
    if (subscriptionDetails.billingCycle === "Annual") {
      priceFinal = (selectedBill.price_per_month * 12).toFixed(2);
    } else if (subscriptionDetails.billingCycle === "Monthly") {
      priceFinal = selectedBill.price_per_month;
    }
  }
  let convenienceFee = process.env.CONVENIENCE_FEE;
  let totalCost = (Number(priceFinal) + Number(convenienceFee)).toFixed(2);

  return (
    <div className="steps-column-1">
      <h2>MVP Subscription</h2>
      <p>Your go-to Movie Membership Program</p>
      {stepsComponents()}
      {currentStep === 4 && (
        <div className="checkout-bill-container-2">
          <p className="menu">BILLING CYCLE</p>
          <div className="detail-1">
            <p>{subscriptionDetails.billingCycle}</p>
            <p>${priceFinal}</p>
          </div>
          <hr className="sep-1" />
          <div className="detail-2">
            <p>Convenience fee</p>
            <p>${convenienceFee}</p>
          </div>
          <p className="small-text">Tax applied wherever applicable</p>
          <hr className="sep-2" />
          <p className="total">
            <span className="text">TOTAL</span>
            <span className="price">${totalCost}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default SubscriptionSteps;
