import Block from "../../../../components/Block";
import Code from "../../../../components/Code";
import Container from "../../../../components/Container";
import SubPageHeading from "../../../../components/SubPageHeading";
import { examples } from "../../../../examples";
import { Demo } from "../../../../examples/guides/left-click";
import styles from "./styles.module.css";

export default function LeftClickRoute() {
  return (
    <Container>
      <Block>
        <SubPageHeading title="Left-click menu" />
        <p>
          To try the context menu, right-click on the following text:{" "}
          <Demo className={styles.Trigger} />
        </p>
      </Block>
      <Code code={examples.leftClick} />
    </Container>
  );
}