import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { asyncCompany, asyncCompanyPic } from "../../store/companySlice";
import styles from "./new.module.css";
import { toast } from "react-toastify";
import { PropsType } from "../../utils/type";
import { setCurPage, setUser } from "../../store/authSlice";

toast.configure();

export default function NewCompany({current_user, user_details}: PropsType) {
  const logo_pic = useSelector(
    (state: RootStateOrAny) => state.company.logo_pic
  );
  const cover_pic = useSelector(
    (state: RootStateOrAny) => state.company.cover_pic
  );
  const dispatch = useDispatch();
  const [company, setCompany] = useState({
    name: "",
    website: "",
    type: "",
    tagline: "",
    company_logo: "/no-user.jpg",
    cover_pic: "",
    location: ''
  });

  useEffect(() => {
    setCompany({ ...company, company_logo: logo_pic, cover_pic: cover_pic });
  }, [logo_pic, cover_pic]);

  useEffect(() => {
    dispatch(setUser({ current_user, user_details }));
    dispatch(setCurPage("Create Company"));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(company)
    if (
      !company.name ||
      !company.website ||
      !company.company_logo ||
      !company.type ||
      !company.tagline ||
      !company.cover_pic ||
      !company.location
    ) {
      toast.warning(`Please provide all the data`, {
        position: "bottom-left",
        theme: "dark",
      });
      return;
    }
    dispatch(asyncCompany({ company }));
    setCompany({
      name: "",
      website: "",
      type: "",
      tagline: "",
      company_logo: "/no-user.jpg",
      cover_pic: "",
      location: ''
    });
  };

  const fileChange = async (
    e: React.FormEvent<HTMLInputElement>,
    type: number
  ) => {
    e.preventDefault();
    const formData = new FormData();
    if (e.currentTarget.files) {
      formData.append("image", e.currentTarget.files[0]);
      dispatch(asyncCompanyPic({ formData, type }));
    }
  };

  return (
    <>
      <Head>
        <title>Create a Page</title>
      </Head>
      <div className={styles.CreateCompany__container}>
        <div className={styles.Company__detail}>
          <h3>Page Identity</h3>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Company Name</label>
            <input
              value={company.name}
              onChange={(e) => setCompany({ ...company, name: e.target.value })}
              type="text"
              id="name"
              name="name"
            />
            <label htmlFor="website">Comapany Website</label>
            <input
              value={company.website}
              onChange={(e) =>
                setCompany({ ...company, website: e.target.value })
              }
              type="url"
              name="website"
              id="website"
            />
            <label htmlFor="location">Comapany Location</label>
            <input
              value={company.location}
              onChange={(e) =>
                setCompany({ ...company, location: e.target.value })
              }
              type="text"
              name="location"
              id="location"
            />
            <label htmlFor="type">Company Type</label>
            <select
              value={company.type}
              onChange={(e) => setCompany({ ...company, type: e.target.value })}
              name="type"
              id="type"
            >
              <option value="">Select Type</option>
              <option value="Education">Education</option>
              <option value="NGO">NGO</option>
              <option value="Fashion">Fashion</option>
              <option value="Technology">Technology</option>
            </select>
            <label htmlFor="tagline">Tagline</label>
            <input
              value={company.tagline}
              onChange={(e) =>
                setCompany({ ...company, tagline: e.target.value })
              }
              type="text"
              id="tagline"
              name="tagline"
            />
            <p>Comapny Logo</p>
            <label htmlFor="logo" className={styles.logo__file}>
              {!company.company_logo || company.company_logo === '/no-user.jpg' ? (
                <>
                  <p>Choose File</p>
                  <p>Upload to see preview</p>
                </>
              ) : (
                <img
                  className={styles.logo_pic}
                  src={company.company_logo}
                  alt=""
                />
              )}
            </label>
            <input
              onChange={(e) => fileChange(e, 1)}
              type="file"
              name="logo"
              id="logo"
              hidden
            />
            <p>Cover Picture</p>
            <label htmlFor="cover" className={styles.logo__file}>
              {!company.cover_pic ? (
                <>
                  <p>Choose File</p>
                  <p>Upload to see preview</p>
                </>
              ) : (
                <img
                  className={styles.cover_pic}
                  src={company.cover_pic}
                  alt=""
                />
              )}
            </label>
            <input
              onChange={(e) => fileChange(e, 2)}
              type="file"
              name="cover"
              id="cover"
              hidden
            />
            <button style={{ cursor: "pointer" }} type="submit">
              Create Company
            </button>
          </form>
        </div>
        <div className={styles.Company__preview}>
          <h3>Page Preview</h3>
          <div>
            <div className={styles.preview}>
              <img src={company.company_logo || "/no-user.jpg"} alt="" />
              <h1>{company.name || "Showcase Name"}</h1>
              <h3>{company.tagline || "Tagline"}</h3>
              <p>{company.type || "Industry"}</p>
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

  const res = await fetch(`http://localhost:5000/api/auth`, {
    headers: {
      "Content-Type": "application/json",
      cookie: cookie!,
    },
    credentials: "include",
  });

  const data = await res.json();
  if (res.status === 403) {
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
    },
  };
};
