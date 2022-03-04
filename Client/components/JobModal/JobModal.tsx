import { Button, Modal, Text } from "@nextui-org/react";
import React, { useState } from "react";
import { FaBriefcase } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { asyncJob } from "../../store/jobSlice";
import styles from "./JobModal.module.css";

export default function JobModal() {
  const dispatch = useDispatch();
  const [visible, setVisible] = React.useState(false);
  const [job, setJob] = useState({
    position: "",
    company: "",
    type: "",
    location: "",
    workplace_type: "",
    desc: "",
  });

  const handler = () => {
    setVisible(true);
  };
  const closeHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(asyncJob({ job }));
    setJob({
      position: "",
      company: "",
      type: "",
      location: "",
      workplace_type: "",
      desc: "",
    });
    setVisible(false);
    window.location.href = window.location.href
  };
  return (
    <>
      <div className={styles.icon_container} onClick={handler}>
        <FaBriefcase size={30} color="#a8d4ff" /> <span>Job</span>
      </div>
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
            Create a Free Job
          </Text>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "20rem", overflow: "auto" }}>
          <div className={styles.modal_body}>
            <label htmlFor="title">Job Title *</label>
            <input
              value={job.position}
              onChange={(e) => setJob({ ...job, position: e.target.value })}
              type="text"
              id="title"
              placeholder="Add the title you are hiring for"
            />
            <label htmlFor="company">Company *</label>
            <input
              value={job.company}
              onChange={(e) => setJob({ ...job, company: e.target.value })}
              type="text"
              id="company"
              placeholder="Your company name"
            />
            <label htmlFor="workplace">Workplace Type *</label>
            <input
              value={job.workplace_type}
              onChange={(e) =>
                setJob({ ...job, workplace_type: e.target.value })
              }
              type="text"
              id="workplace"
              placeholder="On-site"
            />
            <label htmlFor="location">Job Location *</label>
            <input
              value={job.location}
              onChange={(e) => setJob({ ...job, location: e.target.value })}
              type="text"
              id="location"
              placeholder="Your current location"
            />
            <label htmlFor="Type">Job Type *</label>
            <input
              value={job.type}
              onChange={(e) => setJob({ ...job, type: e.target.value })}
              type="text"
              id="Type"
              placeholder="Full-Time"
            />
            <label htmlFor="desc">Description *</label>
            <textarea
              value={job.desc}
              onChange={(e) => setJob({ ...job, desc: e.target.value })}
              name="desc"
              id="desc"
              rows={5}
              placeholder="Add the skills and requirements you're looking for"
            ></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={() => setVisible(false)}>
            Close
          </Button>
          <Button auto onClick={closeHandler}>
            Post
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
