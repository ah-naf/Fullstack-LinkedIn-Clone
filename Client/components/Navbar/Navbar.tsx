import styles from "./Navbar.module.css";
import { AiFillCaretDown, AiOutlineSearch } from "react-icons/ai";
import { FiLogOut, FiMessageCircle } from "react-icons/fi";
import { RiNotification3Line } from "react-icons/ri";
import { IconButton } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import { Button, Grid, Tooltip, Avatar } from "@nextui-org/react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { asyncLogout } from "../../store/authSlice";

export default function Navbar() {
  const [megaBarShow, setMegaBarShow] = useState(false);
  const user = useSelector((state: RootStateOrAny) => state.auth.user);
  const userDetails = useSelector(
    (state: RootStateOrAny) => state.auth.userDetails
  );
  const current_page = useSelector(
    (state: RootStateOrAny) => state.auth.current_page
  );
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(asyncLogout());
    document.cookie = "name" + "=; Max-Age=0";
    window.location.href = '/login'
  };

  // Avatar Option PopUp

  const avatarOption = () => {
    return (
      <div className={styles.avatarOption__container}>
        <div className={styles.avatarOption}>
          <div>
            <img src={user.avatar || "/no-user.jpg"} alt="" />
            <div>
              <h3>{user.full_name}</h3>
              {userDetails.bio && <p>{userDetails.bio}</p>}
            </div>
          </div>
          <Button
            ghost
            style={{ width: "100%" }}
            onClick={(e) => {
              window.location.replace(`/profile/${user.id}`)
            }}
          >
            View Profile
          </Button>
        </div>
        <div className={styles.account}>
          <h3>Account</h3>
          <p>Settings & Privacy</p>
          <p>Help</p>
          <p>Language</p>
        </div>
        <Button
          color="error"
          ghost
          style={{ width: "100%", marginTop: "0.75rem" }}
          iconRight={<FiLogOut />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    );
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.navbar__container}>
        <div className={styles.left__sidebar}>
          <div
            className={styles.logo__container}
            style={{ cursor: "pointer" }}
            onClick={(e) => router.push("/")}
          >
            <img src="/logo-nav.png" alt="" />
          </div>
          <p onClick={() => setMegaBarShow(!megaBarShow)}>
            {current_page}{" "}
            <AiFillCaretDown
              size={15}
              style={{ position: "relative", top: "3px" }}
            />
          </p>
        </div>

        <div className={styles.middle__sidebar}>
          <AiOutlineSearch color="grey" />
          <input type="text" placeholder="Search" />
        </div>

        <div className={styles.right__sidebar}>
          <IconButton>
            <Tooltip
              trigger="click"
              placement="bottom"
              hideArrow
              content={messagePopup()}
            >
              <FiMessageCircle />
            </Tooltip>
          </IconButton>
          <IconButton>
            <Tooltip
              trigger="click"
              placement="bottomEnd"
              hideArrow
              content={notificationPopup()}
            >
              <RiNotification3Line style={{ margin: "0 0.4rem" }} />
            </Tooltip>
          </IconButton>
          <IconButton>
            <Tooltip
              content={avatarOption()}
              trigger="click"
              placement="bottomEnd"
              hideArrow
            >
              <Avatar src={user.avatar || "/no-user.jpg"} />
            </Tooltip>
          </IconButton>
        </div>
      </div>

      {/* Navbar Popup */}
      <div
        className={`${styles.navbar__popup} ${megaBarShow ? styles.show : ""}`}
      >
        <div className={styles.col}>
          <h3>Home</h3>
          <div className={styles.col__items}>
            <Link href={"/messages"}>
              <a>Messages</a>
            </Link>
            <Link href={"/calender"}>
              <a>Calender</a>
            </Link>
            <Link href={"/request"}>
              <a>Request</a>
            </Link>
            <Link href={"/wiki"}>
              <a>Wiki</a>
            </Link>
          </div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.col}>
          <h3>Profile</h3>
          <div className={styles.col__items}>
            <Link href={"/profile"}>
              <a>Edit Profile</a>
            </Link>
            <Link href={"/profile"}>
              <a>My Profile</a>
            </Link>
            <Link href={"/spdate"}>
              <a>Update</a>
            </Link>
            <Link href={"/who-viewed"}>
              <a>Who viewed</a>
            </Link>
          </div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.col}>
          <h3>My Network</h3>
          <div className={styles.col__items}>
            <Link href={"/connections"}>
              <a>Connections</a>
            </Link>
            <Link href={"/people-you-know"}>
              <a>People You Know</a>
            </Link>
            <Link href={"/add-contacts"}>
              <a>Add Contacts</a>
            </Link>
            <Link href={"/statistics"}>
              <a>Statistics</a>
            </Link>
          </div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.col}>
          <h3>Interests</h3>
          <div className={styles.col__items}>
            <Link href={"/companies"}>
              <a>Companies</a>
            </Link>
            <Link href={"/group"}>
              <a>Group</a>
            </Link>
            <Link href={"/slideshare"}>
              <a>Slideshare</a>
            </Link>
            <Link href={"/Learning"}>
              <a>Learning</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Notification PopUp

const notificationPopup = () => {
  const pictureUsers = [
    "/no-user.jpg",
    "/no-user.jpg",
    "/no-user.jpg",
    "/no-user.jpg",
    "/no-user.jpg",
    "/no-user.jpg",
  ];
  return (
    <div className={styles.notificationPopup__container}>
      <h3>Notifications</h3>
      <div className={styles.row1}>
        <h3>8 people viewed your profile</h3>
        <Grid.Container gap={1}>
          <Grid xs={12}>
            <Avatar.Group count={2}>
              {pictureUsers.map((url, index) => (
                <Avatar
                  key={index}
                  size="md"
                  pointer
                  src={url}
                  bordered
                  color="primary"
                  stacked
                />
              ))}
            </Avatar.Group>
          </Grid>
        </Grid.Container>
      </div>
      {[0, 1, 2, 3].map((item) => (
        <div className={styles.row2} key={item}>
          <img src="/no-user.jpg" alt="" />
          <div>
            <h3>Ahnaf Hasan Shifat</h3>
            <p>is now a connection</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// Message PopUp

const messagePopup = () => {
  return (
    <div className={styles.notificationPopup__container}>
      <h3>Messages</h3>
      {[0, 1, 2, 3].map((item) => (
        <div className={styles.row2} key={item}>
          <img src="/no-user.jpg" alt="" />
          <div>
            <h3>Ahnaf Hasan Shifat</h3>
            <p>is now a connection</p>
          </div>
        </div>
      ))}
    </div>
  );
};
