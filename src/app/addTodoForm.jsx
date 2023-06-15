"use client";

import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";
import { Context } from "@/components/Clients";

const AddTodoForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  const { user } = useContext(Context);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/newtask", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      const data = await res.json();

      if (!data.success) return toast.error(data.message);

      toast.success(data.message);
      router.refresh();
      setTitle("");
      setDescription("");
    } catch (error) {}
  };

  if (!user._id) return redirect("/login");

  return (
    <div className="login">
      <section>
        <form action="">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task Title"
            id=""
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task Description"
            id=""
          />
          <button type="submit" onClick={submitHandler}>
            Add Task
          </button>
        </form>
      </section>
    </div>
  );
};

export default AddTodoForm;
