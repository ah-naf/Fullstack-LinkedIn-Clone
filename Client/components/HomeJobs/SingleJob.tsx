import { useRouter } from "next/router";
import { useState } from "react";
import { Bookmark } from "react-iconly";
import { JobType } from "../../utils/type";
import styles from "./HomeJob.module.css";

export default function SingleJob({job}: {job: JobType}) {
  const [bookmark, setBookmark] = useState(false);
  const router = useRouter()
  
  return (
    <div className={styles.job__container}>
      <div className={styles.col_1} onClick={e => router.push(`/jobs/${job.id}`)}>
        <h3>{job.position}</h3>
        <p style={{ fontWeight: "bold" }}>{job.company}</p>
        <p>{job.location}</p>
      </div>
      <div className={styles.col_1}>
        <span onClick={() => setBookmark(!bookmark)}>
          <Bookmark set={!bookmark ? 'broken' : 'bold'} size={"large"} primaryColor="#0058a2" />
        </span>
      </div>
    </div>
  );
}
