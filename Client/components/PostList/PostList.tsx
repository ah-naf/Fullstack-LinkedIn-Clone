import { useEffect, useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import { PostType } from "../../utils/type";
import SinglePost from "../SinglePost/SinglePost";
import styles from "./PostList.module.css";

export default function PostList() {
  const allPost = useSelector((state: RootStateOrAny) => state.post.allPost);
  const [postList, setPostList] = useState<PostType[]>([]);

  useEffect(() => {
    const temp = [...allPost];
    temp.sort((a: PostType, b: PostType) => {
      let fa = a.post_time.toLowerCase(),
        fb = b.post_time.toLowerCase();

      if (fa < fb) {
        return 1;
      }
      if (fa > fb) {
        return -1;
      }
      return 0;
    });
    setPostList(temp)
  }, [allPost]);

  return (
    <div className={styles.postList__container}>
      {
        postList.map((item: PostType, index: number) => (
          <SinglePost key={index} post={item} />
        ))}
    </div>
  );
}
