"use client";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const FaqListItem = ({ faq }) => {
  const [expanded, setExpanded] = useState(false);
  const expandToggle = () => {
    setExpanded(!expanded);
  };
  return (
    <li className="faq-list-item" key={faq.id} onClick={expandToggle}>
      <IoIosArrowDown className={`arrow ${expanded ? "" : "rotate"}`} />
      <p className="question">{faq.question}</p>
      <p className={`answer ${expanded ? "expand" : ""}`}>{faq.answer}</p>
    </li>
  );
};

export default FaqListItem;
