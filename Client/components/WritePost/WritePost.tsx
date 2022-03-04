import styles from "./WritePost.module.css";
import { BsImage } from "react-icons/bs";
import { AiFillFile, AiFillYoutube, AiOutlineCaretDown } from "react-icons/ai";
import { FaGlobeAfrica, FaTrash } from "react-icons/fa";
import { MdArticle } from "react-icons/md";
import React, { useState } from "react";
import { Button, Modal, Text } from "@nextui-org/react";
import { GiPerson } from "react-icons/gi";
import JobModal from "../JobModal/JobModal";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { asyncGetPost, asyncPost } from "../../store/postSlice";
import Router, { useRouter } from "next/router";

toast.configure();

export default function WritePost() {
  const user = useSelector((state: RootStateOrAny) => state.auth.user);
  const [postDesc, setPostDesc] = useState("");
  const [postImg, setPostImg] = useState("");
  const [visible, setVisible] = React.useState(false);
  const dispatch = useDispatch();
  const router = useRouter()

  const handler = () => {
    setVisible(true);
  };
  const closeHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(
      asyncPost({
        post: {
          id: user.id,
          desc: postDesc,
          image: postImg,
          post_time: new Date().toUTCString()
        },
      })
    );
    setPostDesc('');setPostImg('');
    setVisible(false);
    dispatch(asyncGetPost())
    setTimeout(() => {
      Router.reload()
    }, 1000)
  };

  const fileChange = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const formData = new FormData();
    if (e.currentTarget.files) {
      formData.append("image", e.currentTarget.files[0]);
      const res = await fetch("http://localhost:5000/api/post/upload", {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(`${data.msg}`, {
          position: "bottom-left",
          theme: "dark",
        });
        return;
      }
      setPostImg(data.image);
      setVisible(true);
    }
  };

  return (
    <>
      <div className={styles.writePost}>
        <div className={styles.row1}>
          <img src={user.avatar} alt="" />
          <div onClick={() => handler()}>Share Your Thoughts...</div>
        </div>
        <div className={styles.row2}>
          <div>
            <label htmlFor="image">
              <BsImage size={30} color="#70b5f9" />
              <span>Photo</span>
            </label>
            <input
              onChange={(e) => fileChange(e)}
              type="file"
              multiple={false}
              name="image"
              id="image"
              hidden
            />
          </div>

          <div>
            <label htmlFor="video">
              <AiFillYoutube size={30} color="#7fc15e" />
              <span>Video</span>
            </label>
            <input
              type="file"
              multiple={false}
              name="video"
              id="video"
              hidden
            />
          </div>

          <div>
            <JobModal />
          </div>

          <div onClick={e => router.push('/company/new')}>
            <label htmlFor="">
              <MdArticle size={30} color="#fc9295" /> <span>Create Page</span>
            </label>
          </div>
        </div>
      </div>

      {/* POST MODAL */}

      <Modal
        closeButton
        width="30rem"
        preventClose
        aria-labelledby="modal-title"
        open={visible}
        onClose={() => setVisible(false)}
      >
        <Modal.Header
          noPadding
          justify="flex-start"
          style={{
            padding: "0 1.8rem 1rem",
            borderBottom: "1px solid rgba(0,0,0,0.15)",
          }}
        >
          <Text weight={"bold"} size={26}>
            Create a Post
          </Text>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "20rem", overflow: "auto" }}>
          <div className={styles.modal_row1}>
            <img src={user.avatar} alt="" />
            <button>
              <GiPerson />
              <span>{user.full_name}</span>
              <AiOutlineCaretDown />
            </button>
            <button>
              <FaGlobeAfrica />
              <span>Anyone</span>
            </button>
          </div>
          <textarea
            placeholder="Write something that is on your mind..."
            value={postDesc}
            onChange={(e) => setPostDesc(e.target.value)}
            rows={5}
          ></textarea>

          {postImg && (
            <div className={styles.modal_media}>
              <img src={postImg} alt="" />
              <FaTrash
                className={styles.remove_icon}
                onClick={(e) => setPostImg("")}
              />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer justify="space-between">
          <div
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <label htmlFor="image" style={{ cursor: "pointer" }}>
              <BsImage size={30} title="Upload an Image" color="#00000099" />
            </label>
            <input
              onChange={(e) => fileChange(e)}
              type="file"
              multiple={false}
              name="image"
              id="image"
              hidden
            />
            <label style={{ cursor: "pointer" }} htmlFor="video">
              <AiFillYoutube
                size={35}
                title="Upload a Video"
                color="#00000099"
              />
            </label>
            <input
              onChange={(e) => fileChange(e)}
              type="file"
              multiple={false}
              name="video"
              id="video"
              hidden
            />
            <AiFillFile size={30} title="Upload a File" color="#00000099" />
          </div>
          <Button rounded auto onClick={(e) => closeHandler(e)} disabled={(postDesc.length === 0) && (postImg.length === 0)}>
            Post
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
