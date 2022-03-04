import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useEffect } from "react";
import { People, Work } from "react-iconly";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { setCurPage, setTopBarPage, setUser } from "../../store/authSlice";
import { JobType, UserDetailsType, UserType } from "../../utils/type";
import styles from "./jobs.module.css";
import { HiOutlineLightBulb } from "react-icons/hi";
import { Button } from "@nextui-org/react";
import { RiShareForwardBoxFill } from "react-icons/ri";
import { useRouter } from "next/router";
import Head from "next/head";

interface ThisPropsType {
  current_user: UserType;
  user_details: UserDetailsType;
  job: JobType;
}

export default function JobPage({
  current_user,
  user_details,
  job,
}: ThisPropsType) {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(setUser({ current_user, user_details }));
    dispatch(setCurPage("Job"));
    dispatch(setTopBarPage('details'))
  }, []);

  return (
    <div className={styles.job__wrapper}>
      <Head>
        <title>Job | LinkedIn</title>
      </Head>
      <div className={styles.job__container}>
        <h1>{job.position}</h1>
        <p>
          <span style={{ color: "#005a82", fontWeight: "bold" }}>
            {job.company}
          </span>{" "}
          <span>{job.location}</span>
        </p>
        <div className={styles.icon__container}>
          <Work set="bold" primaryColor="grey" size={35} />
          <p>{job.type}</p>
        </div>
        <div className={styles.icon__container}>
          <People set="bold" primaryColor="grey" size={35} />
          <p>11-50 employees</p>
        </div>
        <div className={styles.icon__container}>
          <HiOutlineLightBulb size={35} color="gray" />
          <p>See how you compare to others</p>
        </div>
        <div className={styles.button__container}>
          <Button
            auto
            color="primary"
            rounded
            iconRight={<RiShareForwardBoxFill />}
          >
            Apply
          </Button>
          <Button rounded color="primary" auto ghost>
            Save
          </Button>
        </div>
        <div className={styles.postedBy}>
          <p>Posted By</p>
          <div className={styles.user__container}>
            <img
              className={styles.image}

              src={job.avatar}
              alt=""
            />
            <div
              className={styles.col}
              onClick={(e) => router.push(`/profile/${job.user_id}`)}
            >
              <h3>{job.full_name}</h3>
              <p>{job.bio}</p>
            </div>
          </div>
        </div>
        <p className={styles.desc}>{job.desc}</p>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const cookie = ctx.req?.headers.cookie;
  const id = ctx.params?.id;

  const res = await fetch("http://localhost:5000/api/auth", {
    headers: {
      "Content-Type": "application/json",
      cookie: cookie!,
    },
    credentials: "include",
  });

  const data = await res.json();

  const jobRes = await fetch(`http://localhost:5000/api/job/${id}`, {
    headers: {
      "Content-Type": "application/json",
      cookie: cookie!,
    },
    credentials: "include",
  });

  const jobData = await jobRes.json();

  if (res.status === 403 || jobRes.status === 403) {
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
      job: jobData,
    },
  };
};
