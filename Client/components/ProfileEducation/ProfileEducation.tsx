import {
  Button,
  Checkbox,
  Input,
  Modal,
  Text,
  Textarea,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { asyncEducation } from "../../store/profileSlice";
import { OnlyExperienceType } from "../../utils/type";
import styles from "../ProfileExperience/ProfileExperience.module.css";
import SingleProfileEducation from "./SingleProfileEducation";

export default function ProfileEducation() {
  const user = useSelector((state: RootStateOrAny) => state.auth.user);
  const vis_user = useSelector(
    (state: RootStateOrAny) => state.auth.visited_user
  );
  const vis_userDetails = useSelector(
    (state: RootStateOrAny) => state.auth.visited_userDetails
  );
  const [educationList, setEducationList] = useState<OnlyExperienceType[] | []>(
    []
  );
  const [education, setEducation] = useState({
    position: "",
    company: "",
    startDate: "",
    endDate: "Present",
    desc: "",
    location: "",
  });
  const [visible, setVisible] = useState(false);
  const [checked, setChecked] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (vis_userDetails) {
      if (Object.keys(vis_userDetails).length) {
        if(vis_userDetails.education) {
          setEducationList(JSON.parse(vis_userDetails.education));
        } else setEducationList([])
      }
    }
  }, [vis_userDetails]);

  const ExperienceHandler = () => setVisible(true);

  const closeExperienceHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    const temp = [...educationList, education];
    setEducationList(temp);
    dispatch(asyncEducation({ id: vis_user.id, experience: temp }));
    setVisible(false);
  };

  const editHandler = (index: number, item: OnlyExperienceType) => {
    const temp = [
      ...educationList.splice(0, index),
      item,
      ...educationList.splice(index + 1, educationList.length),
    ];
    setEducationList(temp);
    dispatch(asyncEducation({ id: vis_user.id, experience: temp }));
  };

  const deleteHandler = (index: number) => {
    const temp = educationList.filter((item, ind) => ind !== index);
    setEducationList(temp);
    dispatch(asyncEducation({ id: vis_user.id, experience: temp }));
  };

  return (
    <div className={styles.experience}>
      <h3>
        Education{" "}
        {user.id === router.query.id && (
          <span style={{ cursor: "pointer" }} onClick={ExperienceHandler}>
            <AiOutlinePlusCircle size={30} />
          </span>
        )}
      </h3>
      {educationList.map((item, index) => (
        <SingleProfileEducation
          key={index}
          index={index}
          item={item}
          editHandler={editHandler}
          deleteHandler={deleteHandler}
        />
      ))}

      {/* Add Experience Modal */}
      <div>
        <Modal
          closeButton
          aria-labelledby="modal-title"
          open={visible}
          onClose={() => setVisible(false)}
          width={"30rem"}
        >
          <Modal.Header>
            <Text b size={25}>
              Add Education
            </Text>
          </Modal.Header>
          <Modal.Body>
            <div className={styles.add}>
              <Input
                onChange={(e) =>
                  setEducation({ ...education, company: e.target.value })
                }
                label="Degree"
                placeholder="B.Sc in C.S.E"
              />
              <Input
                onChange={(e) =>
                  setEducation({ ...education, position: e.target.value })
                }
                label="School"
                placeholder="Comilla University"
              />
              <Input
                onChange={(e) =>
                  setEducation({ ...education, location: e.target.value })
                }
                label="Location"
                placeholder="Comilla, Bangladesh"
              />
              <Textarea
                onChange={(e) =>
                  setEducation({ ...education, desc: e.target.value })
                }
                label="Short Description"
                rows={6}
              ></Textarea>
              <Checkbox
                color="primary"
                labelColor="primary"
                checked={true}
                onChange={(e) => {
                  setChecked(e.target.checked);
                  setEducation({
                    ...education,
                    endDate: checked ? "Present" : "",
                  });
                }}
              >
                <Text>I am currently studying in this institution</Text>
              </Checkbox>
              <div className={styles.date}>
                <Input
                  onChange={(e) =>
                    setEducation({ ...education, startDate: e.target.value })
                  }
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
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button auto flat color="error" onClick={() => setVisible(false)}>
              Close
            </Button>
            <Button auto onClick={closeExperienceHandler}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
