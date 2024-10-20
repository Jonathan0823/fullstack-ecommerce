"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

const userNavigation = [
  { name: "Your Profile", href: "/dashboard" },
  { name: "Settings", href: "#" },
];

const Signinoutbutton = () => {
  const { data: session } = useSession();
  console.log(session);
  const { user } = session || {};

  const handleSignOut = async () => {
    await signOut();
  };

  const handleSignIn = async () => {
    window.location.href = "/login";
  };

  const userImage = user?.image || "/images/defaultProfile.svg";
  return (
    <div>
      <Menu as="div" className="relative ml-3">
        <div>
          <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-300 text-sm ">
            <span className="absolute -inset-1.5" />
            <span className="sr-only">Open user menu</span>
            <Image width={60} height={60} alt="" src={userImage} className="h-8 w-8 rounded-full" />
          </MenuButton>
        </div>
        <MenuItems
          transition
          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        >
          {userNavigation.map((item) => (
            <MenuItem key={item.name}>
              <a
                href={item.href}
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
              >
                {item.name}
              </a>
            </MenuItem>
          ))}
          <MenuItem>
            <div className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
              <button onClick={session ? handleSignOut : handleSignIn}>
                {session ? "Sign out" : "Sign in"}
              </button>
            </div>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
};

export default Signinoutbutton;
