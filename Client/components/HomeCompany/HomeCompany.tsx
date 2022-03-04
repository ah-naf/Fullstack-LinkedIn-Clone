import ProfileConnectionStyles from "../ProfileConnection/ProfileConnection.module.css";
import styles from "../MyProfileContact/MyProfileContact.module.css";
import { RootStateOrAny, useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function HomeCompany() {
  const companyList = useSelector(
    (state: RootStateOrAny) => state.company.companies
  );
  const router = useRouter()

  return (
    <>
      <div className={ProfileConnectionStyles.heading__container} style={{borderBottom: 0, paddingBottom: 0}}>
        <h3>Company</h3>
      </div>
      {companyList &&
        companyList.map((item: CompanyType, index: number) => {
          return (
            <div className={styles.myprofilecontact} key={index} onClick={() => router.push(`/company/${item.id}`)}>
              <img src={item.logo} alt="" />
              <div className={styles.detail__container}>
                <div>
                  <h3>{item.name}</h3>
                  <p style={{ color: "#0058a2", fontWeight: "bold", textTransform: 'uppercase' }}>
                    {item.type}
                  </p>
                  <p style={{ color: "#00000099", marginTop: "0.15rem" }}>
                    {item.location}
                  </p>
                </div>
                <button>Follow </button>
              </div>
            </div>
          );
        })}
    </>
  );
}

interface CompanyType {
  id: string;
  name: string;
  website: string;
  tagline: string;
  logo: string;
  cover_pic: string;
  location: string;
  type: string
}
