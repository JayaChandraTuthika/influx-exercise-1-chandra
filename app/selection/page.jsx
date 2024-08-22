"use client";
import ConfirmationPage from "@/components/ConfirmationPage";
import Header from "@/components/Header";
import StepActions from "@/components/StepActions";
import SubscriptionSteps from "@/components/SubscriptionSteps";
import { useAppContext } from "@/store/appContext";
import React, { useState } from "react";

const PlanSelection = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { updateSubscriptionDetails } = useAppContext();
  const [subscriptionDetails, setSubscriptionDetails] = useState({
    theatre: "",
    billingCycle: "",
    loginEmail: "",
    checkoutDetails: "",
  });
  //   console.log(process);

  const selectTheatreCity = (theatreCity) => {
    setSubscriptionDetails({
      ...subscriptionDetails,
      theatre: theatreCity,
    });
    setCurrentStep(2);
  };

  const selectBillingCycle = (cycle) => {
    // console.log(cycle);
    setSubscriptionDetails({
      ...subscriptionDetails,
      billingCycle: cycle,
    });
    setCurrentStep(3);
  };

  const selectUserEmail = (userEmail) => {
    setSubscriptionDetails({
      ...subscriptionDetails,
      loginEmail: userEmail,
    });
    setCurrentStep(4);
  };

  const setCheckoutDetails = (data) => {
    setSubscriptionDetails({
      ...subscriptionDetails,
      checkoutDetails: data,
    });
    updateSubscriptionDetails({
      ...subscriptionDetails,
      checkoutDetails: data,
    });
    setCurrentStep(5);
  };

  return (
    <>
      <main className="selection-bg">
        {currentStep < 5 ? (
          <>
            <Header />
            <div className="selection-content row">
              <div className="col-12 col-md-6 section1">
                <SubscriptionSteps
                  currentStep={currentStep}
                  subscriptionDetails={subscriptionDetails}
                />
              </div>
              <div className="col-12 col-md-6 section2">
                <StepActions
                  currentStep={currentStep}
                  selectTheatreCity={selectTheatreCity}
                  selectBillingCycle={selectBillingCycle}
                  selectUserEmail={selectUserEmail}
                  setCheckoutDetails={setCheckoutDetails}
                />
              </div>
            </div>
          </>
        ) : (
          <ConfirmationPage subscriptionDetails={subscriptionDetails} />
        )}
      </main>
    </>
  );
};

export default PlanSelection;
