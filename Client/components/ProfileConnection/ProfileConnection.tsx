import { RootStateOrAny, useSelector } from "react-redux";
import { PymkType } from "../../utils/type";
import MyProfileContact from "../MyProfileContact/MyProfileContact";
import styles from "./ProfileConnection.module.css";

export default function ProfileConnection() {
  const pymkList = useSelector((state: RootStateOrAny) => state.auth.pymk);
  return (
    <>
      <div className={styles.heading__container}>
        <h3>People</h3>
        <p>{pymkList.length} connections</p>
      </div>
      {pymkList &&
        pymkList.map((item: PymkType, index: number) => (
          <MyProfileContact key={index} pymk={item} />
        ))}
    </>
  );
}
