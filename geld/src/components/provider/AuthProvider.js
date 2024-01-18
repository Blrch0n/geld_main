"use client";

import { api } from "@/common/axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const [isReadyCategory, setIsReadyCategory] = useState(false);
  const [isReadyRecord, setIsReadyRecord] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [categoryData, setCategoryData] = useState();
  const [recordData, setRecordData] = useState();
  const [refresh, setRefresh] = useState(1);
  const [days, setDays] = useState(90);
  const [sort, setSort] = useState("Recently");
  const [checked, setChecked] = useState(true);

  const router = useRouter();

  const signIn = async (email, password) => {
    setIsLoading(true);

    try {
      const { data } = await api.post("/sign-in", {
        email,
        password,
      });

      const { token } = data;

      localStorage.setItem("token", token);

      console.log(token);

      setIsLoggedIn(true);

      useRefresh(refresh + 1);

      router.push("/dashboard");
      // showOn();
    } catch (error) {
      // toast.error(error.response.data.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (name, email, password) => {
    setIsLoading(true);

    try {
      const { data } = await api.post("/sign-up", {
        name,
        email,
        password,
      });

      const { token } = data;

      localStorage.setItem("token", token);

      setIsLoggedIn(true);

      useRefresh(refresh + 1);

      router.push("/dashboard");
      // showOn();
    } catch (error) {
      // toast.error(error.response.data.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const signOut = () => {
    localStorage.removeItem("token");

    setIsLoggedIn(false);

    router.push("/");
  };
  const addCategory = async (categoryName, IconColor, selectedIcon) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await api.post(
        "/category",
        {
          categoryName,
          IconColor,
          selectedIcon,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      useRefresh(refresh + 1);
    } catch (err) {
      console.log(err);
    }
  };
  const addRecord_ = async (
    amount,
    date,
    isExpense,
    selectedCategory,
    time,
    IconColor,
    selectedIcon
  ) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await api.post(
        "/records",
        {
          amount,
          date,
          isExpense,
          selectedCategory,
          time,
          IconColor,
          selectedIcon,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      useRefresh(refresh + 1);
    } catch (err) {
      console.log(err);
    }
  };
  const showCategory = async () => {
    setIsReadyCategory(false);
    try {
      const token = localStorage.getItem("token");
      const { data } = await api.get("/category", {
        headers: {
          Authorization: token,
        },
      });
      const { userCategory } = data;

      setCategoryData(userCategory.reverse());
      setIsReadyCategory(true);
    } catch (err) {
      console.log(err);
    }
  };
  const showRecords = async () => {
    setIsReadyRecord(false);
    try {
      const token = localStorage.getItem("token");
      const { data } = await api.get("/records", {
        headers: {
          Authorization: token,
        },
        params: {
          days: days,
          sort: sort,
        },
      });
      const { records } = data;
      console.log(records);

      setRecordData(records);
      setIsReadyRecord(true);
    } catch (err) {
      console.log(err);
    }
  };
  const addDays = () => {
    if (days == 7) {
      setDays(14);
    }
    if (days == 14) {
      setDays(30);
    }
    if (days == 30) {
      setDays(60);
    }
    if (days == 60) {
      setDays(90);
    }
    if (days == 90) {
      setDays(7);
    }
    setRefresh(refresh + 1);
  };

  useEffect(() => {
    setIsReady(false);
    showCategory();

    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    }

    setIsReady(true);

    // showOn();
  }, []);

  useEffect(() => {
    // showCategory();
    showRecords();
  }, [refresh]);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signUp,
        signOut,
        showRecords,
        addCategory,
        addRecord_,
        addDays,
        checked,
        setChecked,
        days,
        setSort,
        recordData,
        isReadyRecord,
        isReadyCategory,
        categoryData,
        isLoggedIn,
        isLoading,
      }}
    >
      {isReady && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
