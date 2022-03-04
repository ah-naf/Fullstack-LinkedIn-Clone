import styles from './PYMKList.module.css'
import {BsFillInfoSquareFill, BsArrowRight} from 'react-icons/bs'
import PYMK from '../PYMK/PYMK';
import { RootStateOrAny, useSelector } from 'react-redux';
import { PymkType } from '../../utils/type';


export default function PYMKList() {
  const pymkList = useSelector((state: RootStateOrAny) => state.auth.pymk)

  return <div className={styles.pymkList}>
      <div className={styles.top}>
          <h3>Add to your feed</h3>
          <BsFillInfoSquareFill style={{cursor: 'pointer'}} />
      </div>
      <div className={styles.pymkContainer}>
        {pymkList && pymkList.map((item: PymkType, index: number) => (
          <PYMK key={index} pymk={item} />
        ))}
      </div>
      <div className={styles.bottom}>
      <h3>View all recommendations </h3>
      <BsArrowRight color='#00000099' size={20} style={{marginLeft: '0.5rem', cursor: 'pointer'}} />
      </div>
  </div>;
}
