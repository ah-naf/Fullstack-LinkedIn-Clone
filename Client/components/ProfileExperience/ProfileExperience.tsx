import {
  Button,
  Checkbox,
  Input,
  Modal,
  Text,
  Textarea,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import React, { useState, useRef, useEffect } from "react";
import {  AiOutlinePlusCircle } from "react-icons/ai";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { asyncExperience } from "../../store/profileSlice";
import {  OnlyExperienceType } from "../../utils/type";
import styles from "./ProfileExperience.module.css";
import SingleProfileExperience from "./SingleProfileExperience";

export default function ProfileExperience() {
  const user = useSelector((state: RootStateOrAny) => state.auth.user);
  const vis_user = useSelector(
    (state: RootStateOrAny) => state.auth.visited_user
  );
  const vis_userDetails = useSelector(
    (state: RootStateOrAny) => state.auth.visited_userDetails
  );
  const [experienceList, setExperienceList] = useState<
    OnlyExperienceType[] | []
  >([]);
  const [experience, setExperience] = useState({
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
        if (vis_userDetails.experience)
          setExperienceList(JSON.parse(vis_userDetails.experience));
        else setExperienceList([]);
      }
    }
  }, [vis_userDetails]);

  const ExperienceHandler = () => setVisible(true);

  const closeExperienceHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    const temp = [...experienceList, experience];
    setExperienceList(temp);
    dispatch(asyncExperience({ id: vis_user.id, experience: temp }));
    setVisible(false);
  };

  const editHandler = (index: number, item: OnlyExperienceType) => {
    const temp = [
      ...experienceList.splice(0, index),
      item,
      ...experienceList.splice(index + 1, experienceList.length),
    ];
    setExperienceList(temp);
    dispatch(asyncExperience({ id: vis_user.id, experience: temp }));
  };

  const deleteHandler = (index: number) => {
    const temp = experienceList.filter((item, ind) => ind !== index);
    setExperienceList(temp);
    dispatch(asyncExperience({ id: vis_user.id, experience: temp }));
  };

  return (
    <div className={styles.experience}>
      <h3>
        Experience{" "}
        {user.id === router?.query.id && (
          <span style={{ cursor: "pointer" }} onClick={ExperienceHandler}>
            <AiOutlinePlusCircle size={30} />
          </span>
        )}
      </h3>
      {experienceList.map((item, index) => (
        <SingleProfileExperience
          item={item}
          key={index}
          index={index}
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
              Add Experience
            </Text>
          </Modal.Header>
          <Modal.Body>
            <div className={styles.add}>
              <Input
                required
                label="Position"
                placeholder="Jr. Software Engineer"
                onChange={(e) =>
                  setExperience({ ...experience, position: e.target.value })
                }
              />
              <Input
                required
                label="Company Name"
                placeholder="Google"
                onChange={(e) =>
                  setExperience({ ...experience, company: e.target.value })
                }
              />
              <Input
                required
                label="Location"
                placeholder="Chittagong, Bangladesh"
                onChange={(e) =>
                  setExperience({ ...experience, location: e.target.value })
                }
              />
              <Textarea
                required
                label="Short Description"
                rows={6}
                onChange={(e) =>
                  setExperience({ ...experience, desc: e.target.value })
                }
              ></Textarea>
              <Checkbox
                color="primary"
                labelColor="primary"
                checked={true}
                onChange={(e) => {
                  setChecked(e.target.checked);
                  setExperience({
                    ...experience,
                    endDate: checked ? "Present" : "",
                  });
                }}
              >
                <Text>I am currently working in this role</Text>
              </Checkbox>
              <div className={styles.date}>
                <Input
                  required
                  width="50%"
                  label="Start Date"
                  type="date"
                  onChange={(e) =>
                    setExperience({ ...experience, startDate: e.target.value })
                  }
                />
                <Input
                  required
                  width="50%"
                  disabled={checked}
                  label="End Date"
                  type="date"
                  onChange={(e) =>
                    setExperience({ ...experience, endDate: e.target.value })
                  }
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
