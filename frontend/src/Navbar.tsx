import React, { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAuth } from "./context/AuthContex";
import { Link, useNavigate } from "react-router-dom";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Transactions", href: "/transaction" },
  { name: "Dispute Resolution", href: "/dispute-resolution" },
  // { name: "Login", href: "/login" },

  // { name: 'Signup', href: '#' },
];

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { token, setAuthData } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuthData("", "");
    navigate("/login");
  };

  const callHref: any = (href: string) => {
    navigate(href);
  };

  return (
    <div className="bg-white">
      <header className=" inset-x-  top-0 z-50">
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-6 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <Link to="/signup" className="-m-1.5 p-1.5 text-bold text-3xl  ">
              <span className="sr-only "></span>
              <span className="text-black-500 "> SECURE </span>{" "}
              <span className="z-40 absolute  text-blue-700 ">XPAY</span>
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-sm/6 text-xl font-semibold text-gray-900"
              >
                {item.name}
              </Link>
            ))}

            {!token ? (
              <>
                <Link
                  to="/login"
                  className=" text-xl font-semibold text-gray-700"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className=" text-xl font-semibold text-gray-700 bg-blue-300 border px-4 py-1 hover:bg-blue-600 hover:text-black rounded-full"
                >
                  Signup
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className=" text-xl font-semibold text-gray-700 bg-green-300 border px-4 py-1 hover:bg-green-600 hover:text-white rounded-full"
              >
                Logout
              </button>
            )}
          </div>
        </nav>
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link to="/signup" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <span className="text-black-500 "> SECURE </span>{" "}
                <span className="z-40 absolute  text-blue-700 ">XPAY</span>
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </Link>
                  ))}
                  {!token ? (
                    <>
                      <Link
                        to="/login"
                        className="block rounded-lg px-3 py-2 sm:hidden text-base font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        Signup
                      </Link>
                    </>
                  ) : (
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left rounded-lg px-3 py-2 text-base font-semibold text-red-600 hover:bg-red-100"
                    >
                      Logout
                    </button>
                  )}
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </div>
  );
};

export default Navbar;
