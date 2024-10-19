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
        <p>Hello {session?.user.name}</p>
      <div>
        {session ? (
          <button onClick={handleSignOut}>sign out</button>
        ) : (
          <button onClick={handleSignIn}>sign in</button>
        )}
      </div>
    </div>
  );
};

export default Signinoutbutton;
