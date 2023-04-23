import { ExternalLink } from "../../components/ExternalLink";
import Icon from "../../components/Icon";
import styles from "./GitHubLink.module.css";

export default function GitHubLink() {
  return (
    <ExternalLink
      className={styles.Link}
      to="https://github.com/bvaughn/use-context-menu/"
    >
      <div className={styles.Label}>use-context-menu</div>
      <Icon className={styles.Icon} type="github" />
    </ExternalLink>
  );
}
