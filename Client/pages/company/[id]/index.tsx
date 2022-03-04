import { Avatar, Button, Grid } from "@nextui-org/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import {  useDispatch } from "react-redux";
import { setCurPage, setUser } from "../../../store/authSlice";
import { UserDetailsType, UserType } from "../../../utils/type";
import styles from "./company.module.css";

interface ThisPropsType {
  company: {
    id: string;
    name: string;
    website: string;
    type: string;
    tagline: string;
    logo: string;
    cover_pic: string;
    location: string;
  };
  current_user: UserType;
  user_details: UserDetailsType;
}

export default function Index({
  company,
  current_user,
  user_details,
}: ThisPropsType) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUser({ current_user, user_details }));
    dispatch(setCurPage("Company"));
  }, []);

  return (
    <>
      <Head>
        <title>{company.name}</title>
      </Head>
      <div className={styles.company__container}>
        <div className={styles.company__header}>
          <div
            className={styles.company__pic}
            style={{ backgroundImage: `url(${company.cover_pic})` }}
          >
            <div>
              <Image
                src={company.logo}
                width={100}
                height={100}
                className={styles.image}
              ></Image>
              <h3>{company.name}</h3>
              <p style={{ textTransform: "capitalize" }}>{company.type}</p>
              <hr />
            </div>
            <div>
              <p>
                <span>10,000+</span> <br /> Employees
              </p>
              <p>
                <span>103,000</span> <br /> Followers
              </p>
            </div>
          </div>
          <div>
            <Button color={"primary"} ghost rounded>
              Follow Company
            </Button>
          </div>
        </div>
        <div className={styles.company__body}>
          <div className={styles.left}>
            <h2>About</h2>
            <p>Industry</p>
            <h3 style={{ textTransform: "capitalize" }}>{company.type}</h3>
            <p>Type</p>
            <h3>Privately Held</h3>
            <p>Founded</p>
            <h3>1993</h3>
            <p>Location</p>
            <h3>{company.location}</h3>
          </div>
          <div className={styles.middle}>
            <h2>Description</h2>
            <p>{company.tagline}</p>
          </div>
          <div className={styles.right}>
            <div className={styles.connected}>
              <h3>How you're connected</h3>
              <Grid.Container gap={2} alignItems="center">
                <Grid>
                  <Avatar
                    style={{ opacity: "0.5", cursor: "pointer" }}
                    size={"md"}
                    src="/no-user.jpg"
                    zoomed
                  ></Avatar>
                </Grid>
                <Grid>
                  <Avatar
                    style={{ cursor: "pointer" }}
                    size={"lg"}
                    src="/no-user.jpg"
                    zoomed
                  ></Avatar>
                </Grid>
                <Grid>
                  <Avatar
                    style={{ opacity: "0.5", cursor: "pointer" }}
                    size={"md"}
                    src="/no-user.jpg"
                    zoomed
                  ></Avatar>
                </Grid>
              </Grid.Container>
            </div>
            <div className={styles.viewed}>
              <h3>People also viewed</h3>
              <div>
                <Image src={"/logo-nav.png"} width={45} height={45}></Image>
                <h4>British Airways</h4>
              </div>
              <div>
                <Image src={"/logo-nav.png"} width={45} height={45}></Image>
                <h4>British Airways</h4>
              </div>
              <div>
                <Image src={"/logo-nav.png"} width={45} height={45}></Image>
                <h4>British Airways</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const cookie = ctx.req?.headers.cookie;
  const id = ctx.params?.id;

  const res = await fetch(`http://localhost:5000/api/auth`, {
    headers: {
      "Content-Type": "application/json",
      cookie: cookie!,
    },
    credentials: "include",
  });

  const data = await res.json();

  const companyRes = await fetch(`http://localhost:5000/api/company/${id}`, {
    headers: {
      "Content-Type": "application/json",
      cookie: cookie!,
    },
    credentials: "include",
  });

  const companyData = await companyRes.json();

  if (res.status === 403 || companyRes.status === 403) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      current_user: data.user,
      user_details: data.details,
      company: companyData,
    },
  };
};
