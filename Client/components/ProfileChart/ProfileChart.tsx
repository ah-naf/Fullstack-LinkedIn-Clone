import styles from "./ProfileChart.module.css";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  {
    id: '1',
    name: "",
    Visitors: 0,
  },
  {
    id: '2',
    name: "SAT",
    Visitors: 40,
  },
  {
    id: '3',
    name: "SUN",
    Visitors: 30,
  },
  {
    id: '4',
    name: "MON",
    Visitors: 20,
  },
];

export default function ProfileChart() {
  return (
    <div className={styles.profileChart}>
      <h3>My Stats</h3>
      <div className={styles.view}>
        <div className={styles.col}>
          25
          <br />
          <span>Views</span>
        </div>
        <div className={styles.col}>
          15
          <br />
          <span>Visitors</span>
        </div>
      </div>
      <div className={styles.chart}>
        <AreaChart
          width={325}
          height={150}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="4 4" />
          <XAxis dataKey="name" />
          <Tooltip />
          <Area type="natural" dataKey="Visitors" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </div>
    </div>
  );
}
