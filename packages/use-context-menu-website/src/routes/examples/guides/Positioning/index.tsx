import Block from "../../../../components/Block";
import Code from "../../../../components/Code";
import Container from "../../../../components/Container";
import SubPageHeading from "../../../../components/SubPageHeading";
import { examples } from "../../../../examples";
import { Demo } from "../../../../examples/guides/positioning";

export default function PositioningRoute() {
  return (
    <Container>
      <Block>
        <SubPageHeading title="Positioning" />
      </Block>
      <Block>
        <Demo />
      </Block>
      <Code code={examples.positioning} />
    </Container>
  );
}
