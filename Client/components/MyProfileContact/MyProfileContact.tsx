import styles from "./MyProfileContact.module.css";
import { BsTrashFill } from "react-icons/bs";
import { PymkType } from "../../utils/type";
import { useRouter } from "next/router";

export default function MyProfileContact({pymk}: {pymk: PymkType}) {
  const router = useRouter()
  return (
    <div className={styles.myprofilecontact}>
      <img src={pymk.avatar} alt="" />
      <div className={styles.detail__container}>
        <div>
          <h3 onClick={e => router.push(`/profile/${pymk.id}`)}>{pymk.full_name}</h3>
          <p style={{color: '#0058a2', fontWeight: 'bold'}}>{pymk.bio}</p>
        </div>
        <button>
          Message{" "}
        </button>
      </div>
      <button className={styles.delete} title="Delete Connection"><BsTrashFill color="red" /></button>
    </div>
  );
}
