"use client";

import React, { useEffect, useState } from "react";

import faqsData from "./data/faqsData.json";
import { IoIosArrowDown } from "react-icons/io";
import FaqListItem from "./FaqListItem";

const Faqs = () => {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    setFaqs(faqsData);
  }, []);
  //   console.log(faqsData);
  return (
    <main className="faq-bg">
      <h1>Frequently Asked Questions</h1>
      <hr className="separator-faqs" />
      <ul className="faqs-list">
        {faqs.map((faq, index) => {
          return (
            <>
              <FaqListItem faq={faq} key={faq.id} />
              {index < faqs.length - 1 && <hr />}
            </>
          );
        })}
      </ul>
    </main>
  );
};

export default Faqs;
