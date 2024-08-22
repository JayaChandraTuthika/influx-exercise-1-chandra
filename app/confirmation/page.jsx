"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiCalendar } from "react-icons/ci";
import billingData from "@/components/data/billingCycle.json";
import { useAppContext } from "@/store/appContext";
import { useRouter } from "next/navigation";

const ConfirmationPage = () => {
  const { subscriptionDetails } = useAppContext();
  const router = useRouter();
  const { theatre, billingCycle, loginEmail, checkoutDetails } =
    subscriptionDetails;

  if (
    !subscriptionDetails.billingCycle ||
    subscriptionDetails.billingCycle === "Test"
  ) {
    router.replace("/");
    // return null;
  }

  let priceFinal = 0;
  let selectedBill = billingData.find((b) => b.name === billingCycle);
  if (billingCycle !== "") {
    if (billingCycle === "Annual") {
      priceFinal = (selectedBill.price_per_month * 12).toFixed(2);
    } else if (billingCycle === "Monthly") {
      priceFinal = selectedBill.price_per_month;
    }
  }
  let convenienceFee = process.env.CONVENIENCE_FEE;
  let totalCost = (Number(priceFinal) + Number(convenienceFee)).toFixed(2);
  // console.log(totalCost);

  function formatDate(date) {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const dayOfWeek = daysOfWeek[date.getDay()];
    const dayOfMonth = date.getDate();
    const month = months[date.getMonth()];

    return `${dayOfWeek} ${dayOfMonth} ${month}`;
  }
  return (
    <div className="confirmation-bg ">
      <div className="left-half">
        <Image src="/Asset-1.png" height={240} width={360} alt="movie" />
        <div className="details-1">
          <h2>MVP Subscription</h2>
          <hr className="dotted-line" />
          <p className="billing-cycle">
            <Image
              src="/icons/Icon-3.svg"
              className="icons"
              height={15}
              width={15}
              alt="icon"
            />
            {billingCycle}
          </p>
          <p className="billing-cycle">
            <Image
              src="/icons/Icon-8.svg"
              className="icons"
              height={15}
              width={15}
              alt="icon"
            />
            {theatre}
          </p>
          <p className="billing-cycle">
            <CiCalendar className="icons" />
            {formatDate(checkoutDetails.time)}
          </p>
          <hr className="dotted-line" />
          <div className="email-mmr row">
            <div className="email col-6">
              <p className="label">EMAIL</p>
              <p className="text">{loginEmail}</p>
            </div>
            <div className="mmr col-6">
              <p className="label">MMR NUMBER</p>
              <p className="text">28002001339169</p>
            </div>
          </div>
        </div>
        <div className="footer-text">
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
        </div>
      </div>
      <div className="right-half">
        <div className="d-flex payment-details">
          <Image
            src="/icons/Icon-5.svg"
            className="icon-1"
            width={23}
            height={23}
            alt="icon"
          />
          <div>
            <h2 className="heading">MVP SUBSCRIPTION ACTIVE</h2>
            <p className="orderid">ORDER #WK3JH8K</p>
          </div>
        </div>
        <div className="checkout-bill-container">
          <p className="menu">BILLING CYCLE</p>
          <div className="detail-1">
            <p>{billingCycle}</p>
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
        <div className="payment-summary p-4 mt-4">
          <h3>PAYMENT SUMMARY</h3>
          <p className="label">Credit card</p>
          <p className="d-flex justify-content-between mb-0">
            <span className="card-number">
              XXXXXXXXXXXX
              {subscriptionDetails.checkoutDetails.cardNumber.substring(
                subscriptionDetails.checkoutDetails.cardNumber.length - 4,
                subscriptionDetails.checkoutDetails.cardNumber.length
              )}
            </span>
            <span className="cost">${totalCost}</span>
          </p>
        </div>
        <Link href="/" className="home-link">
          Back to homepage
        </Link>
      </div>
    </div>
  );
};

export default ConfirmationPage;
