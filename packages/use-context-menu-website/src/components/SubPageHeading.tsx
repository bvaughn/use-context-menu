import { Link } from "react-router-dom";

import { HOME_ROUTE } from "../routes/config";
import SubHeading from "./SubHeading";
import styles from "./SubPageHeading.module.css";

export default function SubPageHeading({ title }: { title: string }) {
  return (
    <div className={styles.Row}>
      <Link to={HOME_ROUTE.path}>{HOME_ROUTE.title}</Link>
      <small className={styles.Divider}>|</small>
      <SubHeading title={title} />
    </div>
  );
}
