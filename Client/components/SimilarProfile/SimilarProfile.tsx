import styles from "./SimilarProfile.module.css";
import React from "react";
import { Avatar, Grid, Tooltip } from "@nextui-org/react";
import AvatarCard from "../AvatarCard/AvatarCard";
import { RootStateOrAny, useSelector } from "react-redux";
import { PymkType } from "../../utils/type";

export default function SimilarProfile() {
  const pymk = useSelector((state: RootStateOrAny) => state.auth.pymk)
  
  return (
    <div className={styles.similarProfile}>
      <h3>Similar Profile</h3>
      <div className={styles.profile}>
        <Grid.Container gap={1}>
          <Grid xs={12}>
            <Avatar.Group count={3}>
              {pymk && pymk.map((item: PymkType, index: number) => (
                <Tooltip placement="top" key={index} content={<AvatarCard avatar={item.avatar} id={item.id} bio={item.bio} username={item.username} full_name={item.full_name} />}>
                  <Avatar
                    key={index}
                    size="xl"
                    pointer
                    src={item.avatar}
                    bordered
                    color="primary"
                    stacked
                  />
                </Tooltip>
              ))}
            </Avatar.Group>
          </Grid>
        </Grid.Container>
      </div>
    </div>
  );
}
