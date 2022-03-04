
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
} from "next";
import Head from "next/head";
import { useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import HomeCompany from "../components/HomeCompany/HomeCompany";
import HomeJobs from "../components/HomeJobs/HomeJobs";
import Topbar from "../components/HomeTopbar/Topbar";
import PostList from "../components/PostList/PostList";
import ProfileCard from "../components/ProfileCard/ProfileCard";
import PYMKList from "../components/PYMKList/PYMKList";
import Widgets from "../components/Widgets/Widgets";
import WritePost from "../components/WritePost/WritePost";
import { setCurPage, setTopBarPage, setUser } from "../store/authSlice";
import { setCompany } from "../store/companySlice";
import { setJob } from "../store/jobSlice";
import { setPost } from "../store/postSlice";
import styles from "../styles/index.module.css";
import { JobType, PropsType, PymkType, SendCompanyType } from "../utils/type";

interface ThisPropsType extends PropsType {
  company: SendCompanyType;
  jobs: JobType;
  pymk: PymkType
}

const Home = ({
  current_user,
  user_details,
  posts,
  company,
  jobs,
  pymk
}: ThisPropsType) => {
  const dispatch = useDispatch();
  const topbarPage = useSelector(
    (state: RootStateOrAny) => state.auth.topBar_page
  );

  useEffect(() => {
    dispatch(setUser({ current_user, user_details, pymk }));
    dispatch(setCurPage("Home"));
    dispatch(setPost(posts));
    dispatch(setTopBarPage("Home_posts"));
    dispatch(setCompany({ company }));
    dispatch(setJob(jobs))
  }, []);

  return (
    <>
      <Head>
        <title>LinkedIn 2.0</title>
      </Head>

      <Topbar page={topbarPage} />
      <div className={styles.homepage}>
        <div className={styles.left__sidebar}>
          <ProfileCard edit={false} type={false} hide={false}  />
        </div>

        <div
          className={styles.middle__sidebar}
          style={topbarPage === "Home_company" ? CompanyStyles : {}}
        >
          {topbarPage === "Home_posts" && (
            <>
              <WritePost />
              <PostList />
            </>
          )}
          {topbarPage === "Home_company" && <HomeCompany />}
          {topbarPage === "Home_jobs" && <HomeJobs />}
        </div>

        {topbarPage !== "Home_company" && (
          <div className={styles.right__sidebar}>
            <Widgets />
            <PYMKList />
          </div>
        )}
      </div>
    </>
  );
};

export default Home;

const CompanyStyles = {
  flex: 0.75,
  backgroundColor: "white",
  width: "100%",
  marginTop: "1rem",
  borderRadius: "0.5rem",
  boxShadow: "1px 1px 15px 3px rgb(0 0 0 / 5%)",
  padding: "2rem",
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const cookie = ctx.req?.headers.cookie;

  const res = await fetch("http://localhost:5000/api/auth", {
    headers: {
      "Content-Type": "application/json",
      cookie: cookie!,
    },
    credentials: "include",
  });

  const data = await res.json();

  const postRes = await fetch("http://localhost:5000/api/post", {
    headers: {
      "Content-Type": "application/json",
      cookie: cookie!,
    },
    credentials: "include",
  });

  const postData = await postRes.json();

  const companyRes = await fetch("http://localhost:5000/api/company", {
    headers: {
      "Content-Type": "application/json",
      cookie: cookie!,
    },
    credentials: "include",
  });

  const companyData = await companyRes.json();

  const jobRes = await fetch("http://localhost:5000/api/job", {
    headers: {
      "Content-Type": "application/json",
      cookie: cookie!,
    },
    credentials: "include",
  });

  const jobData = await jobRes.json();

  const pymkRes = await fetch("http://localhost:5000/api/auth/people/get", {
    headers: {
      "Content-Type": "application/json",
      cookie: cookie!,
    },
    credentials: "include",
  });

  const pymkData = await pymkRes.json()

  if (
    jobRes.status === 403 ||
    res.status === 403 ||
    postRes.status === 403 ||
    companyRes.status === 403 ||
    pymkRes.status === 403
  ) {
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
      posts: postData,
      company: companyData.company,
      jobs: jobData,
      pymk: pymkData
    },
  };
};
