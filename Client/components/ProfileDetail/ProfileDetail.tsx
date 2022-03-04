import ProfileEducation from '../ProfileEducation/ProfileEducation'
import ProfileExperience from '../ProfileExperience/ProfileExperience'
import ProfileSkill from '../ProfileSkill/ProfileSkill'
import ProfileSummary from '../ProfileSummary/ProfileSummary'
import styles from './ProfileDetail.module.css'


export default function ProfileDetail() {
  return (
    <div className={styles.profileDetail__container}>
        <ProfileSummary />
        <ProfileExperience />
        <ProfileEducation />
        <ProfileSkill />
    </div>
  )
}
