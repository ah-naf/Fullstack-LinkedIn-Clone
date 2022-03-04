import { useRouter } from "next/router";
import { RootStateOrAny, useSelector } from "react-redux";
import PostList from "../PostList/PostList";
import WritePost from "../WritePost/WritePost";
import styles from "./ProfilePost.module.css";

export default function ProfilePost() {
  const user = useSelector((state: RootStateOrAny) => state.auth.user);
  const router = useRouter();

  return (
    <div className={styles.profilePost__container}>
      {user.id === router.query.id && <WritePost />}
      <PostList />
    </div>
  );
}
