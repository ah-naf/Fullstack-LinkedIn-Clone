import { Avatar, Button } from "@nextui-org/react";
import React from "react";
import styles from "./AvatarCard.module.css";

export default function AvatarCard({
  id,
  avatar,
  full_name,
  username,
  bio,
}: {
  id: string;
  avatar: string;
  full_name: string;
  username: string;
  bio: string;
}) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = `/profile/${id}`;
  };

  return (
    <div className={styles.avatarCard}>
      <div className={styles.row1}>
        <Avatar size="lg" src={avatar} color="primary" bordered />
        <div>
          <h3>{full_name}</h3>
          <p>@{username}</p>
        </div>
      </div>
      <div className={styles.row2}>
        <p>{bio}</p>
        <p>
          <span>4</span> followers | <span>4</span> following
        </p>
      </div>
      <Button onClick={handleClick}>View Profile</Button>
      <Button
        auto
        color="primary"
        rounded
        style={{ alignSelf: "center" }}
        light
      >
        Follow
      </Button>
    </div>
  );
}
