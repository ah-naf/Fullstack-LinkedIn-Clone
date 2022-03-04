import {
  Button,
  Checkbox,
  Input,
  Modal,
  Text,
  Textarea,
} from "@nextui-org/react";
import {useRouter} from "next/router";
import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { RootStateOrAny, useSelector } from "react-redux";
import { OnlyExperienceType } from "../../utils/type";
import styles from "./ProfileExperience.module.css";

export default function SingleProfileExperience({
  item,
  index,
  editHandler,
  deleteHandler,
}: PropsType) {
  const user = useSelector((state: RootStateOrAny) => state.auth.user);
  const [experience, setExperience] = useState(item);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [checked, setChecked] = useState(item.endDate === "Present");
  const router = useRouter()

  const EditHandler = (e: React.MouseEvent, item: OnlyExperienceType) => {
    setExperience(item);
    setVisibleEdit(true);
  };

  const closeEditHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    editHandler(index, experience);
    setVisibleEdit(false);
  };

  return (
    <div className={styles.job}>
      <h3>
        {item.position}{" "}
        {user.id === router.query.id && (
          <div>
            <span onClick={(e) => EditHandler(e, item)}>
              <AiOutlineEdit />
            </span>
            <span onClick={(e) => deleteHandler(index)}>
              <BsTrash />
            </span>
          </div>
        )}
      </h3>
      <p style={{ color: "#0058a2" }}>
        {item.company} - {item.location}
      </p>
      <p>
        ({item.startDate}) - ({item.endDate})
      </p>
      {item.desc && <p>{item.desc}</p>}

      <div>
        <Modal
          closeButton
          aria-labelledby="modal-title"
          open={visibleEdit}
          onClose={() => setVisibleEdit(false)}
          width={"30rem"}
        >
          <Modal.Header>
            <Text b size={25}>
              Edit Experience
            </Text>
          </Modal.Header>
          <Modal.Body>
            <div className={styles.add}>
              <Input
                value={experience.position}
                onChange={(e) =>
                  setExperience({ ...experience, position: e.target.value })
                }
                required
                label="Position"
                placeholder="Jr. Software Engineer"
              />
              <Input
                onChange={(e) =>
                  setExperience({ ...experience, company: e.target.value })
                }
                required
                value={experience.company}
                label="Company Name"
                placeholder="Google"
              />
              <Input
                onChange={(e) =>
                  setExperience({ ...experience, location: e.target.value })
                }
                required
                value={experience.location}
                label="Location"
                placeholder="Chittagong, Bangladesh"
              />
              <Textarea
                onChange={(e) =>
                  setExperience({ ...experience, desc: e.target.value })
                }
                required
                value={experience.desc}
                label="Short Description"
                rows={6}
              ></Textarea>
              <Checkbox
                color="primary"
                labelColor="primary"
                checked={experience.endDate === "Present"}
                onChange={(e) => {
                  setChecked(e.target.checked);
                  setExperience({ ...experience, endDate: "Present" });
                }}
              >
                <Text>I am currently working in this role</Text>
              </Checkbox>
              <div className={styles.date}>
                <Input
                  onChange={(e) =>
                    setExperience({ ...experience, startDate: e.target.value })
                  }
                  required
                  value={experience.startDate}
                  width="50%"
                  label="Start Date"
                  type="date"
                />
                <Input
                  onChange={(e) =>
                    setExperience({ ...experience, endDate: e.target.value })
                  }
                  required
                  width="50%"
                  disabled={checked}
                  label="End Date"
                  type="date"
                  value={
                    experience.endDate !== "Present" ? experience.endDate : ""
                  }
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              auto
              flat
              color="error"
              onClick={() => setVisibleEdit(false)}
            >
              Close
            </Button>
            <Button auto onClick={closeEditHandler}>
              Edit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

interface PropsType {
  item: OnlyExperienceType;
  index: number;
  editHandler: (index: number, item: OnlyExperienceType) => void;
  deleteHandler: (index: number) => void;
}
