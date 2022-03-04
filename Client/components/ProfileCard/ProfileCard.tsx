import Link from "next/link";
import styles from "./ProfileCard.module.css";
import { Avatar } from "@mui/material";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { AiOutlineCamera, AiOutlineEdit } from "react-icons/ai";
import { Button, Input, Progress, Tooltip } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { asyncAvatar, asyncBio, asyncName } from "../../store/profileSlice";
import  { useRouter } from "next/router";
import { asyncUser, asyncUserSingle } from "../../store/authSlice";
import { asyncGetPostSingle } from "../../store/postSlice";

export default function ProfileCard({
  hide,
  edit,
  type,
}: {
  hide?: boolean;
  edit?: boolean;
  type?: boolean;
}) {
  const vis_user = useSelector(
    (state: RootStateOrAny) => state.auth.visited_user
  );
  const user = useSelector((state: RootStateOrAny) => state.auth.user);
  const userDetails = useSelector(
    (state: RootStateOrAny) => state.auth.userDetails
  );
  const vis_details = useSelector(
    (state: RootStateOrAny) => state.auth.visited_userDetails
  );

  const uploading = useSelector(
    (state: RootStateOrAny) => state.profile.uploading
  );
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();


  useEffect(() => {
    type
      ? edit
        ? setName(user.full_name)
        : setName(vis_user.full_name)
      : setName(user.full_name);

    type
      ? edit
        ? setBio(userDetails.bio)
        : setBio(vis_details.bio)
      : setBio(userDetails.bio);
  }, [user, userDetails, vis_details, vis_user]);

  useEffect(() => {
    !uploading && dispatch(asyncUser());
  }, [uploading]);

  const handleSubmit = (e: React.MouseEvent, typee: number) => {
    if (typee === 1) {
      dispatch(asyncName({ id: vis_user.id, name }));
    } else {
      dispatch(asyncBio({ id: vis_user.id, bio }));
    }
    setTimeout(() => {
      router.reload();
    }, 500);
  };
  
  const fileChange = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const formData = new FormData();
    if (e.currentTarget.files) {
      formData.append("image", e.currentTarget.files[0]);
      dispatch(asyncAvatar(formData));
      setTimeout(() => {
        dispatch(asyncUserSingle({ id: user.id }));
        if (type) {
          dispatch(asyncGetPostSingle({ id: vis_user.id }));
        }
      }, 500);
    }
  };

  const tooltipInput = (type: number) => {
    if (type === 1) {
      return (
        <div className={styles.add}>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            underlined
            color="primary"
            clearable
            placeholder="Change Name"
          />
          <Button auto onClick={(e) => handleSubmit(e, 1)}>
            Change
          </Button>
        </div>
      );
    } else {
      return (
        <div className={styles.add}>
          <Input
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            underlined
            color="primary"
            clearable
            placeholder="Change Bio"
          />
          <Button auto onClick={(e) => handleSubmit(e, 2)}>
            Change
          </Button>
        </div>
      );
    }
  };
  
  return (
    <div className={styles.profileCard}>
      <div className={styles.col__1}>
        {uploading ? (
          <Progress
            indeterminated
            value={50}
            color="primary"
            status="primary"
            style={{ marginBottom: "1rem" }}
            size="sm"
          />
        ) : (
          <label style={{ cursor: "pointer" }} htmlFor="avatar_pic">
            <Avatar
              src={type ? (edit ? user.avatar : vis_user.avatar) : user.avatar}
              sx={{ height: 125, width: 125 }}
              style={{ marginBottom: "1.25rem" }}
            />
            {edit && router.query.id === user.id && (
              <span>
                <AiOutlineCamera size={25} />
              </span>
            )}
          </label>
        )}
        {edit && router.query.id === user.id && (
          <input
            multiple={false}
            type="file"
            name="avatar_pic"
            id="avatar_pic"
            onChange={(e) => fileChange(e)}
            hidden
          />
        )}
        {edit && router.query.id === user.id ? (
          <>
            <Tooltip
              placement="bottom"
              keepMounted={false}
              trigger="click"
              content={tooltipInput(1)}
            >
              <h1
                style={{
                  cursor: "pointer",
                  maxWidth: "12.5rem",
                  margin: "auto",
                }}
              >
                {name}{" "}
                <span>
                  {" "}
                  <AiOutlineEdit size={20} />{" "}
                </span>
              </h1>
            </Tooltip>
            <Tooltip
              trigger="click"
              placement="bottom"
              content={tooltipInput(2)}
            >
              <p
                style={{
                  cursor: "pointer",
                  color: "#00000099",
                  fontWeight: "600",
                  fontSize: "0.85rem",
                  maxWidth: "10rem",
                  margin: "auto",
                  marginTop: "0.25rem",
                }}
              >
                {bio ? bio : "Add Bio"}
                <span>
                  {" "}
                  <AiOutlineEdit size={20} />{" "}
                </span>
              </p>
            </Tooltip>
          </>
        ) : (
          <>
            <h1>{name} </h1>
            <p>{bio} </p>
          </>
        )}
      </div>
      <div className={styles.col__2}>
        <div>
          <h1>358</h1>
          <p>Connections</p>
        </div>
        <div>
          <h1>25</h1>
          <p>Views</p>
        </div>
      </div>
      {!hide && (
        <div className={styles.col__3}>
          <Link href={`/profile/${user.id}`}>
            <a>View my Profile</a>
          </Link>
        </div>
      )}
    </div>
  );
}
