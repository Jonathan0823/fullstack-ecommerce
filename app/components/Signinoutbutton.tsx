"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";

const Signinoutbutton = () => {
  const { data: session } = useSession();
  console.log(session);


  const handleSignOut = async () => {
    await signOut();
  };

  const handleSignIn = async () => {
    window.location.href = "/login";
  };

  

  return (
    <div>
      <div>
        {session ? (
          <button onClick={handleSignOut}>Sign Out</button>
        ) : (
          <button onClick={handleSignIn}>Sign In</button>
        )}
      </div>
    </div>
  );
};

export default Signinoutbutton;
