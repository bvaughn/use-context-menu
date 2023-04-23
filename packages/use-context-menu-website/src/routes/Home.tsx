import { Link } from "react-router-dom";

import Block from "../components/Block";
import Container from "../components/Container";
import {} from "./config";

import styles from "./Home.module.css";
import { PropsWithChildren } from "react";

export default function Route() {
  return (
    <Container>
      <Block>TODO</Block>
      <Block>
        <InstallationPanel />
      </Block>
    </Container>
  );
}

function LinkListItem({
  children,
  to,
  type,
}: PropsWithChildren & { to: string; type: "code" | "plaintext" }) {
  return (
    <li className={styles.ListItem} data-type={type}>
      <Link className={styles.Link} to={to}>
        {children}
      </Link>
    </li>
  );
}

function InstallationPanel() {
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
