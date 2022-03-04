import { Button, Loading } from "@nextui-org/react";
import { GetServerSideProps, GetServerSidePropsContext, NextPage, NextPageContext } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import { useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../store/authSlice";
import { EventType } from "../../utils/type";
import styles from "../login/Login.module.css";

const Register: NextPage = () => {
  const [regDetails, setRegDetails] = useState({
    fullName: "",
    username: "",
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
    dispatch(registerUser(regDetails));
  };

  return (
    <div className={styles.login__container}>
      <Head>
        <title>Sign Up | LinkedIn</title>
      </Head>
      <Image src={"/logo.png"} width="350px" height={80} />
      <form className={styles.login__form} onSubmit={handleSubmit}>
        <label htmlFor="">Full Name</label>
        <input
          required
          type="text"
          placeholder="Enter Your Name"
          value={regDetails.fullName}
          onChange={(e) =>
            setRegDetails({ ...regDetails, fullName: e.target.value })
          }
        />
        <label htmlFor="">Username</label>
        <input
          required
          type="text"
          placeholder="Enter a Username"
          value={regDetails.username}
          onChange={(e) =>
            setRegDetails({ ...regDetails, username: e.target.value })
          }
        />
        <label htmlFor="">Email</label>
        <input
          required
          type="email"
          placeholder="Enter Email Address..."
          value={regDetails.email}
          onChange={(e) =>
            setRegDetails({ ...regDetails, email: e.target.value })
          }
        />
        <label htmlFor="">Password</label>
        <input
          required
          type="password"
          placeholder="Enter Password"
          value={regDetails.password}
          onChange={(e) =>
            setRegDetails({ ...regDetails, password: e.target.value })
          }
        />
        <p>
          By clicking Agree & Join, you agree to the LinkedIn{" "}
          <span>User Agreement</span>, <span>Privacy Policy</span>, and{" "}
          <span>Cookie Policy</span>
        </p>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <Loading type="points" color="white" size="sm" /> : 'Sign Up'}
        </Button>
      </form>
      <p>
        Already have an account?{" "}
        <Link href={"/login"}>
          <a>Sign in Now</a>
        </Link>
      </p>
    </div>
  );
}

export default Register;

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