import { Button, Modal, Text, Textarea } from "@nextui-org/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { asyncSummary } from "../../store/profileSlice";
import styles from "./ProfileSummary.module.css";

export default function ProfileSummary() {
  const user = useSelector((state: RootStateOrAny) => state.auth.user);
  const vis_user = useSelector(
    (state: RootStateOrAny) => state.auth.visited_user
  );
  const vis_userDetails = useSelector(
    (state: RootStateOrAny) => state.auth.visited_userDetails
  );
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [summary, setSummary] = useState("");
  const router = useRouter();

  useEffect(() => {
    vis_userDetails && setSummary(vis_userDetails.summary);
  }, [vis_userDetails]);

  const handler = () => {
    setVisible(true);
  };

  const closeHandler = () => {
    setVisible(false);
  };

  const submitHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(asyncSummary({ id: vis_user.id, summary: summary }));
    setVisible(false);
  };

  return (
    <div className={styles.summary}>
      <h3>
        Summary{" "}
        {user.id === router.query.id && (
          <span style={{ cursor: "pointer" }} onClick={handler}>
            <AiOutlineEdit />
          </span>
        )}
      </h3>
      {summary && <p>{summary}</p>}

      {/* Summary Edit Modal */}
      <div>
        <Modal
          closeButton
          aria-labelledby="modal-title"
          open={visible}
          onClose={closeHandler}
          width={"30rem"}
        >
          <Modal.Header>
            <Text b size={25}>
              Edit Summary
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Textarea
              placeholder="Write something about you"
              rows={8}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            ></Textarea>
          </Modal.Body>
          <Modal.Footer>
            <Button auto flat color="error" onClick={closeHandler}>
              Close
            </Button>
            <Button
              auto
              onClick={submitHandler}
            >
              Edit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
