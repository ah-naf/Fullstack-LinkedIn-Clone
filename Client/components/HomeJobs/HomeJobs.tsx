
import { RootStateOrAny, useSelector } from "react-redux";
import { JobType } from "../../utils/type";
import styles from "./HomeJob.module.css";
import SingleJob from "./SingleJob";

export default function HomeJobs() {
  const jobList = useSelector((state: RootStateOrAny) => state.job.jobs);
  return (
    <div className={styles.Homejobs__container}>
      <div className={styles.header}>
        <h1>Recommended for you</h1>
        <p>Based on your profile and search history.</p>
      </div>
      <div className={styles.body}>
        {jobList.map((item: JobType, index: number) => {
          return <SingleJob key={index} job={item} />;
        })}
      </div>
    </div>
  );
}
