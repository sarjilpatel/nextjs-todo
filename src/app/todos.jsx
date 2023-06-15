import React from "react";
import { TodoItem } from "@/components/ServerComponents";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const fetchTodo = async () => {
  try {
    const res = await fetch(`${process.env.URL}/api/mytask`, {
      cache: "no-cache",
    });

    const data = await res.json();
    if (!data.success) return [];

    return data.tasks;
  } catch (error) {
    return [];
  }
};

const Todos = async () => {
  const token = cookies().get("token")?.value;

  if (!token) {
    return redirect("/login");
  }

  const tasks = await fetchTodo();
  return (
    <section className="todosContainer">
      {tasks?.map((i) => (
        <TodoItem
          key={i._id}
          title={i.title}
          description={i.description}
          id={i._id}
          completed={i.isCompleted}
        />
      ))}
    </section>
  );
};

export default Todos;
