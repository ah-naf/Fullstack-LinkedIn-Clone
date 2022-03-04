import { Button, Input, Tooltip } from "@nextui-org/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { asyncSkill } from "../../store/profileSlice";

import styles from "./ProfileSkill.module.css";

export default function ProfileSkill() {
  const user = useSelector((state: RootStateOrAny) => state.auth.user);
  const vis_user = useSelector(
    (state: RootStateOrAny) => state.auth.visited_user
  );
  const vis_userDetails = useSelector(
    (state: RootStateOrAny) => state.auth.visited_userDetails
  );
  const [skillList, setSkillList] = useState<string[] | []>([]);
  const [skill, setSkill] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (vis_userDetails) {
      if (Object.keys(vis_userDetails).length) {
        if(vis_userDetails.skill)
          setSkillList(JSON.parse(vis_userDetails.skill));
        else setSkillList([])
      }
    }
  }, [vis_userDetails]);

  const handleDelete = (e: React.MouseEvent, index: number) => {
    const temp = skillList.filter((item, ind) => ind !== index);
    setSkillList(temp);
    dispatch(asyncSkill({ id: vis_user.id, skill: temp }));
  };

  const handleAdd = (e: React.MouseEvent) => {
    const temp = [...skillList, skill];
    setSkillList(temp);
    dispatch(asyncSkill({ id: vis_user.id, skill: temp }));
    setSkill("");
  };

  const addSkill = () => {
    return (
      <div className={styles.add}>
        <Input
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          underlined
          color="primary"
          clearable
          placeholder="Skill"
        />
        <Button auto onClick={handleAdd}>
          Add
        </Button>
      </div>
    );
  };
  return (
    <div className={styles.profileSkill}>
      <h3>
        Skills{" "}
        {user.id === router.query.id && (
          <Tooltip content={addSkill()} trigger="click">
            <span style={{ cursor: "pointer" }}>
              <AiOutlinePlusCircle size={30} />
            </span>
          </Tooltip>
        )}
      </h3>
      <div className={styles.skill}>
        {skillList.map((item, index) => (
          <Button auto key={index}>
            {item}{" "}
            {user.id === router.query.id && (
              <BsFillTrashFill
                style={{ marginLeft: "0.5rem", cursor: "pointer" }}
                onClick={(e) => handleDelete(e, index)}
              />
            )}
          </Button>
        ))}
      </div>
    </div>
  );
}
