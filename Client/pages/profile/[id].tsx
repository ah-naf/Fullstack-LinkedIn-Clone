import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import Topbar from "../../components/HomeTopbar/Topbar";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import ProfileChart from "../../components/ProfileChart/ProfileChart";
import ProfileConnection from "../../components/ProfileConnection/ProfileConnection";
import ProfileDetail from "../../components/ProfileDetail/ProfileDetail";
import ProfilePost from "../../components/ProfilePost/ProfilePost";
import SimilarProfile from "../../components/SimilarProfile/SimilarProfile";
import {
  setCurPage,
  setTopBarPage,
  setUser,
  setVisitedUser,
} from "../../store/authSlice";
import { setPost } from "../../store/postSlice";
import HomeStyles from "../../styles/index.module.css";
import { PropsType, PymkType, UserDetailsType, UserType } from "../../utils/type";
import styles from "./profile.module.css";

interface ThisPropsType extends PropsType {
  visited_user: UserType;
  visited_details: UserDetailsType;
  pymk: PymkType
}

export default function Profile({
  current_user,
  user_details,
  visited_user,
  visited_details,
  posts,
  pymk
}: ThisPropsType) {
  const user = useSelector((state: RootStateOrAny) => state.auth.user);
  const dispatch = useDispatch();
  const topbarPage = useSelector(
    (state: RootStateOrAny) => state.auth.topBar_page
  );
  const router = useRouter()

  useEffect(() => {
    dispatch(setUser({ current_user, user_details, pymk }));
    dispatch(setCurPage("Profile"));
    dispatch(setTopBarPage("details"));
    dispatch(setVisitedUser({ visited_user, visited_details }));
    dispatch(setPost(posts));
  }, []);

  return (
    <>
      <Head>
        <title>{visited_user.full_name}</title>
      </Head>
      <Topbar page={topbarPage} />

      {/* Delete if doesnt work */}
      <div className={HomeStyles.homepage}>
        <div className={HomeStyles.left__sidebar}>
          <ProfileCard
            hide={true}
            edit={router.query.id === user.id}
            type={true}
          />
        </div>
        <div
          className={styles.middle__sidebar}
          style={topbarPage === "contacts" ? ProfileConnectionStyle : {}}
        >
          {topbarPage === "posts" && <ProfilePost />}
          {topbarPage === "contacts" && <ProfileConnection />}
          {topbarPage === "details" && <ProfileDetail />}
        </div>

        {topbarPage !== "contacts" && (
          <div className={styles.right__sidebar}>
            <ProfileChart />
            <SimilarProfile />
          </div>
        )}
      </div>
    </>
  );
}

const ProfileConnectionStyle = {
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

  const { id } = ctx.params as { id: string };

  const res = await fetch(`http://localhost:5000/api/auth`, {
    headers: {
      "Content-Type": "application/json",
      cookie: cookie!,
    },
    credentials: "include",
  });

  const data = await res.json();

  const profileRes = await fetch(`http://localhost:5000/api/auth/${id}`, {
    headers: {
      "Content-Type": "application/json",
      cookie: cookie!,
    },
    credentials: "include",
  });

  const profileData = await profileRes.json();

  // console.log(profileData)

  const postRes = await fetch(`http://localhost:5000/api/post/${id}`, {
    headers: {
      "Content-Type": "application/json",
      cookie: cookie!,
    },
    credentials: "include",
  });

  const postData = await postRes.json();

  const pymkRes = await fetch("http://localhost:5000/api/auth/people/get", {
    headers: {
      "Content-Type": "application/json",
      cookie: cookie!,
    },
    credentials: "include",
  });

  const pymkData = await pymkRes.json()

  if (pymkRes.status === 403 || res.status === 403 || profileRes.status === 403 || postRes.status === 403) {
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
      visited_user: profileData.user,
      visited_details: profileData.details,
      posts: postData,
      pymk: pymkData
    },
  };
};
