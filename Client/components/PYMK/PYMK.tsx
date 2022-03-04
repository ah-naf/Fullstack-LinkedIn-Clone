import styles from "./PYMK.module.css";
import { IoAdd } from "react-icons/io5";
import { PymkType } from "../../utils/type";

export default function PYMK({ pymk }: { pymk: PymkType }) {
  return (
    <div className={styles.pymk}>
      <div className={styles.col1}>
        <img src={pymk.avatar} alt="" />
      </div>
      <div
        className={styles.col2}
        onClick={(e) => window.location.replace(`/profile/${pymk.id}`)}
      >
        <h4>{pymk.full_name}</h4>
        <p>{pymk.bio}</p>
        <button>
          <IoAdd fontWeight={600} /> Follow
        </button>
      </div>
    </div>
  );
}
