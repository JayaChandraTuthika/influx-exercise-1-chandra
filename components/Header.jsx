"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

//icons
import { IoIosArrowDown } from "react-icons/io";
import { BsPersonCheck } from "react-icons/bs";
import Image from "next/image";

const Header = () => {
  const router = useRouter();
  const expandNavMenu = (e) => {
    const menuGroup = e.target.parentNode;
    menuGroup.classList.toggle("close");
  };

  const handleClickMenuItem = (e) => {
    const menuGroup = e.target.parentNode.parentNode;
    menuGroup.classList.toggle("close");
    //sample task for each nav link button
    router.push("/"); //navigating to home for example
  };

  return (
    <>
      <nav className="navbar-desktop">
        <div className="links-wrapper">
          <div className="accordion-group close">
            <button className="nav-link" onClick={expandNavMenu}>
              Dropdown 1 <IoIosArrowDown className="arrow" />
            </button>
            <div className="menu">
              <button onClick={handleClickMenuItem}>Test menu Item 1</button>
              <button onClick={handleClickMenuItem}>Test menu Item 2</button>
              <button onClick={handleClickMenuItem}>Test menu Item 3</button>
              <button onClick={handleClickMenuItem}>Test menu Item 4</button>
            </div>
          </div>
          <div className="accordion-group close">
            <button className="nav-link" onClick={expandNavMenu}>
              Dropdown 2 <IoIosArrowDown className="arrow" />
            </button>
            <div className="menu">
              <button onClick={handleClickMenuItem}>Test menu Item 1</button>
              <button onClick={handleClickMenuItem}>Test menu Item 2</button>
              <button onClick={handleClickMenuItem}>Test menu Item 3</button>
              <button onClick={handleClickMenuItem}>Test menu Item 4</button>
            </div>
          </div>
          <div className="accordion-group close">
            <button className="nav-link" onClick={expandNavMenu}>
              Dropdown 3 <IoIosArrowDown className="arrow" />
            </button>
            <div className="menu">
              <button onClick={handleClickMenuItem}>Test menu Item 1</button>
              <button onClick={handleClickMenuItem}>Test menu Item 2</button>
              <button onClick={handleClickMenuItem}>Test menu Item 3</button>
              <button onClick={handleClickMenuItem}>Test menu Item 4</button>
            </div>
          </div>
          <button className="sign-in-btn">
            <BsPersonCheck className="icon" /> Sign in
          </button>
        </div>
        <div className="links-wrapper-2">
          <Link href="/" className="link">
            Placehoder title
          </Link>
          <Link href="/" className="link">
            Placehoder title
          </Link>
          <Link href="/" className="link">
            Placehoder title
          </Link>
          <Link href="/" className="link">
            Placehoder title
          </Link>
        </div>
      </nav>
      <nav className="navbar-mobile">
        <div className="links-wrapper">
          <button className="home-btn">
            <Image src="/images/Home.svg" width={30} height={30} alt="icon" />
          </button>
        </div>
      </nav>
    </>
  );
};

export default Header;
