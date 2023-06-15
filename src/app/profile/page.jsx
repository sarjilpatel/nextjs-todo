"use client";

import { Context } from "@/components/Clients";
import { redirect } from "next/navigation";
import React, { useContext } from "react";

const Page = () => {
  const { user } = useContext(Context);

  if (!user._id) return redirect("/login");
  return (
    <div
      className="container"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
};

export default Page;
