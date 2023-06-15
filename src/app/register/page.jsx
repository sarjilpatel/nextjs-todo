"use client";
import { Context } from "@/components/Clients";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";

const Page = () => {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(Context);

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name,
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
      return toast.error(data.message);
    }
  };

  if (user._id) return redirect("/");
  return (
    <div className="login">
      <section>
        <form action="">
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" onClick={registerHandler}>
            Sign up
          </button>
          <p>OR</p>
          <Link href={"/login"}>Login</Link>
        </form>
      </section>
    </div>
  );
};

export default Page;
