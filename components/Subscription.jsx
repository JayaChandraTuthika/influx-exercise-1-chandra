"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
// import { cookies } from "next/headers";

import { IoArrowForward } from "react-icons/io5";
import SubscriptionCard from "./SubscriptionCard";

import subscriptionBenifits from "./data/subscriptionBenifits.json";
import { useRouter } from "next/navigation";

const Subscription = () => {
  const router = useRouter();

  const navigateToSelectionPage = () => {
    router.push("/selection");
  };

  //   const cookie = cookies();
  return (
    <main className="subscription">
      <div className="grid-container">
        <div className="grid-item item-1">
          <div className="stars-wrapper">
            <Image
              src="/images/teenyicons_star-solid.svg"
              height={15}
              width={20}
              alt="icon"
            />
            <Image
              src="/images/teenyicons_star-solid.svg"
              height={25}
              width={20}
              className="mb-1"
              alt="icon"
            />
            <Image
              src="/images/teenyicons_star-solid.svg"
              height={15}
              width={20}
              alt="icon"
            />
          </div>

          <h3>Real Deal Monthly Movies</h3>
          <p>Your flexible monthly membership to the latest movies</p>
        </div>
        <div className="grid-item item-2">
          <h4>What is MVP Subscription?</h4>
          <ul className="list">
            <li className="list-item">
              <div className="number">1</div>
              <div className="line"></div>
              <p className="text">
                MVP Subscription provide the member 1 movie credit per month
              </p>
            </li>
            <li className="list-item">
              <div className="number">2</div>
              <div className="line"></div>
              <p className="text">
                They can avail it at any marcus theatre or Movie tavern
              </p>
            </li>
            <li className="list-item">
              <div className="number">3</div>
              <p className="text">
                Members earn 100 points and get a $5 reward redeemable on food &
                beverages &#43; many more benefits
              </p>
            </li>
          </ul>
          <div className="buttons-container d-none d-md-flex">
            <button className="get-started" onClick={navigateToSelectionPage}>
              Get Started <IoArrowForward className="icon" />
            </button>
            <Link href="/" className="learn-more">
              Learn more
            </Link>
          </div>
        </div>
        <div className="grid-item item-3">
          {subscriptionBenifits.map((each) => {
            return <SubscriptionCard data={each} key={each.title} />;
          })}
          <div className="end-text-benifits">
            <p>
              <sup>1</sup>Excludes IMAX and DBOX formats. No fees apply to
              Passport Credits only. Other fees apply to full-priced ticlets.
            </p>
            <p>
              <sup>2</sup>Excludes alcoholic beverages
            </p>
          </div>
        </div>
        {/* <div className="grid-item item-1">Test</div>
        <div className="grid-item item-1">Test</div>
        <div className="grid-item item-1">Test</div> */}
      </div>
    </main>
  );
};

export default Subscription;
