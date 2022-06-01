import React from "react";
import { Link } from "react-router-dom";
import { BsInstagram, BsGithub, BsLinkedin } from "react-icons/bs";
const Footer = () => {
  return (
    <div className="bg-slate-200 flex flex-col items-center">
      <div className="flex justify-evenly w-4/5 items-center mx-auto py-8">
        <Link to="/" className="text-gray-800 mx-4">
          HOME
        </Link>
        <Link to="/shop" className="text-gray-800 mx-4">
          SHOP
        </Link>
        <Link to="/wishlist" className="text-gray-800 mx-4">
          WISHLIST
        </Link>
        <Link to="/faq" className="text-gray-800 mx-4">
          FAQ
        </Link>
      </div>
      <hr className="w-3/5 border-black mb-6" />
      <p className="text-center w-4/5 mx-auto">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
        odit omnis praesentium amet doloribus, placeat molestiae ea fugit iure
        beatae nobis illum cum facere ducimus asperiores, maxime dolores, quia
        in!
      </p>
      <div className="flex items-center py-6 justify-evenly w-2/5 mx-auto text-3xl">
        <a href="https://github.com/ReaperKen" rel="noreferrer" target="_blank">
          <BsGithub />
        </a>
        <a
          href="https://www.instagram.com/ken_ukiyo/"
          rel="noreferrer"
          target="_blank"
        >
          <BsInstagram />
        </a>
        <a
          href="https://www.linkedin.com/in/juan-pablo-agudelo-perez-32a2101b1/"
          rel="noreferrer"
          target="_blank"
        >
          <BsLinkedin />
        </a>
      </div>
      <div className="w-full bg-slate-300 text-center py-4 text-xl font-bold">
        &copy; 2022 Copyright: Ken
      </div>
    </div>
  );
};

export default Footer;
