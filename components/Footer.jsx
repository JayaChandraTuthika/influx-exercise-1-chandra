import Link from "next/link";
import React from "react";
import { IoArrowForward } from "react-icons/io5";

const Footer = () => {
  const handleSubmit = () => {
    console.log("submitted");
  };
  return (
    <footer className="mobile-footer">
      <Link href="/selection" className="link">
        Get Started <IoArrowForward className="forward" />
      </Link>
      <p>Marcus MVP is only available for use in our Mobile App.</p>
    </footer>
  );
};

export default Footer;
