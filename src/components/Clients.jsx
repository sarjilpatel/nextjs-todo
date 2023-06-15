"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, createContext, useContext, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";

export const Context = createContext({
  user: {},
});

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    await fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.user);
        if (data.success) setUser(data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Context.Provider value={{ user, setUser }}>
      {children}
      <Toaster position="bottom-center" />
    </Context.Provider>
  );
};

//Logout button

export const LogoutBtn = () => {
  const { user, setUser } = useContext(Context);

  const logoutHandler = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "GET",
      });

      const data = await res.json();
      if (!data.success) {
        return toast.error(data.message);
      }

      setUser({});
      toast.success(data.message);
    } catch (error) {
      return toast.error(error);
    }
  };

  return user._id ? (
    <button className="btn" onClick={logoutHandler}>
      Logout
    </button>
  ) : (
    <Link href={"/login"}>Login</Link>
  );
};

//Todo button

export const TodoButton = ({ id, completed }) => {
  const router = useRouter();
  const deleteHandler = async (id) => {
    try {
      const res = await fetch(`/api/task/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!data.success) return toast.error(data.message);
      toast.success(data.message);
      router.refresh();
    } catch (error) {
      return toast.error(error);
    }
  };
  const updateHandler = async (id) => {
    try {
      const res = await fetch(`/api/task/${id}`, {
        method: "PUT",
      });
      const data = await res.json();
      if (!data.success) return toast.error(data.message);
      toast.success(data.message);
      router.refresh();
    } catch (error) {
      return toast.error(error);
    }
  };

  return (
    <>
      <input
        type="checkbox"
        onChange={() => updateHandler(id)}
        checked={completed}
      />
      <button className="btn" onClick={() => deleteHandler(id)}>
        Delete
      </button>
    </>
  );
};
