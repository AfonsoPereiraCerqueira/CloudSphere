import React, { useState, useEffect } from "react";
import axios from "axios";
import { navItems } from "../constants/constants";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import { useAuthStore } from "../store/authStore";

const Navbar = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { isAuthenticated, user, checkActiveSubscription, haveSubscription } = useAuthStore();

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toggleNavBar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  useEffect(() => {
    if (isAuthenticated) {
      checkActiveSubscription(user._id);
    }
  }, [isAuthenticated]);

  return (
    <>
      <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
        <div className="container px-4 mx-auto relative text-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center flex-shrink-0">
              <a href="/" className="text-xl tracking-tight">
                <i className="fa-duotone fa-server"></i> - CloudSphere
              </a>
            </div>
            <ul className="hidden lg:flex ml-15 space-x-12">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
            {isAuthenticated ? (
              <div className="flex space-x-6">
                <Popover>
                  <PopoverButton className="py-2 px-3 border rounded-md text-sm/6 font-semibold text-white focus:outline-none data-[active]:text-white data-[hover]:text-white data-[focus]:outline-1 data-[focus]:outline-white">
                    {user.name}
                    {"   "}
                    <i className="fa-duotone fa-caret-down"></i>
                  </PopoverButton>
                  <Transition
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-5"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-5"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <PopoverPanel
                      anchor="bottom"
                      className="divide-y divide-white rounded-xl bg-neutral-900 text-sm/6 [--anchor-gap:var(--spacing-10)]"
                    >
                      <div className="p-5">
                        <a
                          className="block rounded-lg py-2 px-3 transition hover:bg-white/5"
                          href="profile"
                        >
                          <p className="font-semibold text-white">Profile</p>
                          <p className="text-white/50">
                            See your profile and settings.
                          </p>
                        </a>
                        <a
                          className="block rounded-lg py-2 px-3 transition hover:bg-white/5"
                          href="/cart"
                        >
                          <p className="font-semibold text-white">Cart</p>
                          <p className="text-white/50">
                            See your shopping cart.
                          </p>
                        </a>
                        {haveSubscription && (
                          <a
                            className="block rounded-lg py-2 px-3 transition hover:bg-white/5"
                            href="/clientArea"
                          >
                            <p className="font-semibold text-white">
                              Client Dashboard
                            </p>
                            <p className="text-white/50">
                              Manage your subscription.
                            </p>
                          </a>
                        )}
                      </div>
                    </PopoverPanel>
                  </Transition>
                </Popover>
              </div>
            ) : (
              <div>
                <a
                  href="/login"
                  className="bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 mx-3 rounded-md"
                >
                  Login
                </a>

                <a href="/register" className="py-2 px-3 rounded-md border">
                  Register
                </a>
              </div>
            )}
            <div className="lg:hidden md:flex flex-col justify-end">
              <button onClick={toggleNavBar}>
                {mobileDrawerOpen ? (
                  <i className="fa-duotone fa-xmark"></i>
                ) : (
                  <i className="fa-duotone fa-bars"></i>
                )}
              </button>
            </div>
          </div>
          {mobileDrawerOpen && (
            <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
              <ul>
                {navItems.map((item, index) => (
                  <li key={index} className="py-4">
                    <a href={item.href}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
