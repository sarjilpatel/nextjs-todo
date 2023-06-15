"use client";

import { Context } from "@/components/Clients";
import { redirect } from "next/navigation";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(Context);
  console.log(user);

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });

      const data = await res.json();
      if (!data.success) {
        return toast.error(data.message);
      }
      setUser(data.user);
      toast.success(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  if (user._id) return redirect("/");
  return (
    <div className="login">
      <section>
        <form action="">
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" onClick={loginHandler}>
            Login
          </button>
          <p>OR</p>
          <Link href={"/register"}>New User</Link>
        </form>
      </section>
    </div>
  );
};

export const metadata = {
  title: "Login",
  description: "This is the login page of TODO app project by Sarjil Patel",
};

export default Page;
