import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { loginUser } from "../../store/authSlice";
import { EventType } from "../../utils/type";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import styles from "./Login.module.css";
import Router from "next/router";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { Button, Loading } from "@nextui-org/react";

const Login: NextPage = () => {
  const [loginDetails, setLoginDetails] = useState({
    password: "",
    email: "",
  });
  const dispatch = useDispatch();
  const isAuth = useSelector((state: RootStateOrAny) => state.auth.isAuth);
  const isLoading = useSelector((state: RootStateOrAny) => state.auth.isLoading);
  
  useEffect(() => {
    if (isAuth) {
      Router.replace("/");
    }
  }, [isAuth]);


  const handleSubmit = (e: EventType) => {
    e.preventDefault();
    dispatch(loginUser(loginDetails));
  };

  return (
    <div className={styles.login__container}>
      <Head>
        <title>Sign In | LinkedIn</title>
      </Head>
      <Image src={"/logo.png"} width="350px" height={80} />
      <form className={styles.login__form} onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter Email Address..."
          value={loginDetails.email}
          required
          onChange={(e) =>
            setLoginDetails({ ...loginDetails, email: e.target.value })
          }
        />
        <label htmlFor="">Password</label>
        <input
          type="password"
          placeholder="Enter Password"
          value={loginDetails.password}
          required
          onChange={(e) =>
            setLoginDetails({ ...loginDetails, password: e.target.value })
          }
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <Loading type="points" color="white" size="sm" /> : 'Sign In'}
        </Button>
      </form>
      <p>
        Don't have an account?{" "}
        <Link href={"/register"}>
          <a>Register Now</a>
        </Link>
      </p>
    </div>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const cookie = ctx.req?.headers.cookie;
  const res = await fetch("http://localhost:5000/api/auth", {
    headers: {
      "Content-Type": "application/json",
      cookie: cookie!,
    },
    credentials: "include",
  });

  
  if (res.status >= 200 && res.status < 300) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      } 
    }
  } 

  return { props: {
    data: ''
  } };
}
