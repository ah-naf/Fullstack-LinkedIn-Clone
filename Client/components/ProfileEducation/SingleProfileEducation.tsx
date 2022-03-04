import {
  Button,
  Checkbox,
  Input,
  Modal,
  Text,
  Textarea,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { RootStateOrAny, useSelector } from "react-redux";
import { OnlyExperienceType } from "../../utils/type";
import styles from "../ProfileExperience/ProfileExperience.module.css";

export default function SingleProfileEducation({
  item,
  index,
  editHandler,
  deleteHandler,
}: PropsType) {
  const user = useSelector((state: RootStateOrAny) => state.auth.user);
  const [education, setEducation] = useState(item);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [checked, setChecked] = useState(item.endDate === "Present");
  const router = useRouter();

  const EditHandler = (e: React.MouseEvent, item: OnlyExperienceType) => {
    setEducation(item);
    setVisibleEdit(true);
  };

  const closeEditHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    editHandler(index, education);
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
        {item.company}
        <br />
        {item.location}
      </p>
      <p>
        ({item.startDate}) - ({item.endDate})
      </p>
      {item.desc && <p>{item.desc}</p>}

      {/* Edit Experience Modal */}
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
              Edit Education
            </Text>
          </Modal.Header>
          <Modal.Body>
            <div className={styles.add}>
              <Input
                onChange={(e) =>
                  setEducation({ ...education, company: e.target.value })
                }
                value={education.company}
                label="Degree"
                placeholder="B.Sc in C.S.E"
              />
              <Input
                onChange={(e) =>
                  setEducation({ ...education, position: e.target.value })
                }
                value={education.position}
                label="School"
                placeholder="Comilla University"
              />
              <Input
                onChange={(e) =>
                  setEducation({ ...education, location: e.target.value })
                }
                value={education.location}
                label="Location"
                placeholder="Comilla, Bangladesh"
              />
              <Textarea
                onChange={(e) =>
                  setEducation({ ...education, desc: e.target.value })
                }
                value={education.desc}
                label="Short Description"
                rows={6}
              ></Textarea>
              <Checkbox
                color="primary"
                labelColor="primary"
                checked={education.endDate === "Present"}
                onChange={(e) => {
                  setChecked(e.target.checked);
                  setEducation({ ...education, endDate: "Present" });
                }}
              >
                <Text>I am currently studying in this institution</Text>
              </Checkbox>
              <div className={styles.date}>
                <Input
                  onChange={(e) =>
                    setEducation({ ...education, startDate: e.target.value })
                  }
                  value={education.startDate}
                  width="50%"
                  label="Start Date"
                  type="date"
                />
                <Input
                  onChange={(e) =>
                    setEducation({ ...education, endDate: e.target.value })
                  }
                  width="50%"
                  disabled={checked}
                  label="End Date"
                  type="date"
                  value={
                    education.endDate !== "Present" ? education.endDate : ""
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
