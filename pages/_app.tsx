import "../styles/globals.css";
import type { AppProps } from "next/app";
import AppLayout from "../layout/AppLayout";
import "antd/dist/antd.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthServiceApi from "../api/AuthServiceApi";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const getUserProfile = () => {
    AuthServiceApi.getProfile()
      .then((res) => {
        // console.log(res);
        localStorage.setItem("user", res.data.id);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const passTokenGetProfile = (token: string) => {
    axios.defaults.headers.common["authorization"] = "Bearer " + token; // Token pass to jwt header
    getUserProfile();
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token && token != null) {
        passTokenGetProfile(token);
      } else {
        router.push("login");
      }
    }
  }, []);

  // localStorage.getItem("token") !=null && console.log(localStorage.getItem("token"));

  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  );
}

export default MyApp;
