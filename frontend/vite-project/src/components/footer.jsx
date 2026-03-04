import React from "react";
import axios from "axios";

const Footer = () => {
  return (
    <footer className="rounded-lg shadow dark:bg-gray-900 m-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap q">
            CloudSphere
            </span>
          </a>
          <ul className="text-white flex flex-wrap items-center mb-6 text-sm font-semibold text-gray-500 sm:mb-0 ">
            <li>
              <a href="/about" className="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-[#F8EDFF] sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="font-semibold text-white block text-sm text-gray-500 sm:text-center">
          <a href="/" className="hover:underline">
            © 2025 CloudSphere™. All Rights Reserved.
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
