import styles from "./InstallationPanel.module.css";

export function InstallationPanel() {
  return (
    <code className={styles.Code}>
      <span className="tok-comment"># npm</span>
      <br />
      <span className="tok-operator">npm install </span>
      <span className="tok-variableName">use-context-menu</span>
      <br />
      <br />
      <span className="tok-comment"># yarn</span>
      <br />
      <span className="tok-operator">yarn add </span>
      <span className="tok-variableName">use-context-menu</span>
    </code>
  );
}
