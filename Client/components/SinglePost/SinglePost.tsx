import { PostType, SendCommentType } from "../../utils/type";
import styles from "./SinglePost.module.css";
import { Heart2, Message, MoreSquare, Delete, Send } from "react-iconly";
import { Button, Tooltip } from "@nextui-org/react";
import { FiMoreHorizontal } from "react-icons/fi";
import { IconButton } from "@mui/material";
import AvatarCard from "../AvatarCard/AvatarCard";
import React, { useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import {
  asyncComment,
  asyncCommentDelete,
  asyncGetPost,
  asyncLike,
} from "../../store/postSlice";
import Router from "next/router";

export default function SinglePost({ post }: { post: PostType }) {

  const user = useSelector((state: RootStateOrAny) => state.auth.user);
  const userDetails = useSelector(
    (state: RootStateOrAny) => state.auth.userDetails
  );
  const [totalComments, setTotalComments] = useState<SendCommentType[]>([]);
  const [totalLikes, setTotalLikes] = useState<string[]>([]);
  const [liked, setLiked] = useState<boolean>(false);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setTotalLikes(JSON.parse(post.total_likes));
    setLiked(JSON.parse(post.total_likes).includes(user.id));
    setTotalComments(JSON.parse(post.comments));
  }, []);

  const likePost = () => {
    const tempLike = !liked;
    setLiked(tempLike);
    let temp = totalLikes;
    if (tempLike) {
      if (!temp.includes(user.id)) temp.push(user.id);
    } else temp = temp.filter((id) => id !== user.id);
    setTotalLikes(temp);
    dispatch(asyncLike({ post_id: post.post_id, likes: JSON.stringify(temp) }));
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const temp = [...totalComments];
    temp.push({
      post_id: post.post_id,
      full_name: user.full_name,
      bio: userDetails.bio,
      username: user.username,
      comment,
      avatar: user.avatar,
    });
    setTotalComments(temp);
    dispatch(
      asyncComment({
        comment: temp,
        currentComment: {
          post_id: post.post_id,
        },
      })
    );
    setComment("");
  };

  const handlePostDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(asyncCommentDelete({ post_id: post.post_id }));
    dispatch(asyncGetPost());
    setTimeout(() => {
      Router.reload();
    }, 1000);
  };

  const handleCommentDelete = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    const temp = totalComments.filter((item, idx) => idx !== index);
    setTotalComments(temp);
    dispatch(
      asyncComment({
        comment: temp,
        currentComment: {
          post_id: post.post_id,
        },
      })
    );
  };

  const moreBtn = (type: string, index: number) => {
    return (
      <div className={styles.moreBtn__container}>
        {type === "post" && (
          <Button style={{ borderRadius: 0 }} color={"primary"} light>
            Share Post
          </Button>
        )}
        <Button
          style={{ borderRadius: "inherit" }}
          color={"error"}
          flat
          iconRight={<Delete />}
          onClick={(e) => {
            type === "post"
              ? handlePostDelete(e)
              : handleCommentDelete(e, index);
          }}
        >
          Delete {type === "post" ? "Post" : "Comment"}
        </Button>
      </div>
    );
  };

  return (
    <div className={styles.singlePost__container}>
      <div className={styles.singlePost__header}>
        <Tooltip
          content={
            <AvatarCard
              id={post.user_id}
              avatar={post.avatar}
              username={post.username}
              full_name={post.full_name}
              bio={post.bio}
            />
          }
          placement="topStart"
          hideArrow
        >
          <div
            className={styles.singlePost__header}
            style={{ padding: 0, border: "none" }}
          >
            <img src={post.avatar} alt="" />
            <div>
              <h3>{post.full_name}</h3>
              <p>{post.bio}</p>
            </div>
          </div>
        </Tooltip>
        {/* <p>{post.post_time}</p> */}
      </div>
      <div className={styles.singlePost__body}>
        {post.post && <p>{post.post}</p>}
        {post.img && <img src={post.img} />}
        <div>
          <div className={styles.like} onClick={likePost}>
            <Heart2
              set={liked ? "bold" : "light"}
              size={"large"}
              primaryColor={liked ? "red" : "#00000099"}
              style={{ cursor: "pointer" }}
            />
            <p>{totalLikes.length}</p>
          </div>
          <div className={styles.comment}>
            <label htmlFor="comment">
              <Message
                set="curved"
                size={"large"}
                primaryColor="#00000099"
                style={{ cursor: "pointer" }}
              />
              <p>{totalComments.length}</p>
            </label>
          </div>
          <Tooltip
            content={moreBtn("post", -1)}
            trigger="click"
            placement="right"
          >
            <MoreSquare
              set="curved"
              size={"large"}
              primaryColor="#00000099"
              style={{ cursor: "pointer" }}
            />
          </Tooltip>
        </div>
      </div>
      <div className={styles.singlePost__footer}>
        {totalComments &&
          totalComments.map((item, index) => (
            <div className={styles.commentBox} key={index}>
              <img
                src={item.avatar}
                alt=""
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
              />
              <div className={styles.comment__user}>
                <h3>{item.username}</h3>
                <p>{item.comment}</p>
              </div>
              <div className={styles.comment__more}>
                {/* <p>4 hours</p> */}
                <IconButton>
                  <Tooltip
                    content={moreBtn("comment", index)}
                    placement="right"
                    trigger="click"
                  >
                    <FiMoreHorizontal size={25} />
                  </Tooltip>
                </IconButton>
              </div>
            </div>
          ))}
      </div>
      <div className={styles.textarea}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          // onKeyPress={handlePress}
          name="comment"
          rows={1}
          placeholder="Add comment"
        ></textarea>
        <Button
          disabled={comment.length === 0}
          onClick={handleClick}
          auto
          icon={<Send primaryColor="white" filled />}
        />
      </div>
    </div>
  );
}
