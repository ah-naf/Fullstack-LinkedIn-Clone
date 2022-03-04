
import {  useDispatch } from "react-redux";
import { setTopBarPage } from "../../store/authSlice";
import styles from "./Topbar.module.css";

export default function Topbar({ page }: { page: string }) {
  const pageActive = page.split('_')
  const dispatch = useDispatch()

  const changeTopBar = (type: string) => {
    dispatch(setTopBarPage(type))
  }
  return (
    <div className={styles.topbar}>
      <div className={styles.topbar__link}>
        {pageActive[0] === "Home" ? (
          <>
            <p className={page === 'Home_posts' ? styles.active__link : ''} onClick={() => changeTopBar('Home_posts')}>Posts</p>
            <p className={page === 'Home_articles' ? styles.active__link : ''} onClick={() => changeTopBar('Home_articles')}>Articles</p>
            <p className={page === 'Home_company' ? styles.active__link : ''} onClick={() => changeTopBar('Home_company')}>Companies</p>
            <p className={page === 'Home_jobs' ? styles.active__link : ''} onClick={() => changeTopBar('Home_jobs')}>Jobs</p>
          </>
        ) : (
          <>
            <p className={page === 'details' ? styles.active__link : ''} onClick={() => changeTopBar('details')}>Details</p>
            <p className={page === 'posts' ? styles.active__link : ''} onClick={() => changeTopBar('posts')}>Posts</p>
            <p className={page === 'contacts' ? styles.active__link : ''} onClick={() => changeTopBar('contacts')}>Contacts</p>
            <p className={page === 'improve' ? styles.active__link : ''} >Improve</p>
          </>
        )}
      </div>
    </div>
  );
}
