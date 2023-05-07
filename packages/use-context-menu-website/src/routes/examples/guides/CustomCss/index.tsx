import Block from "../../../../components/Block";
import Code from "../../../../components/Code";
import Container from "../../../../components/Container";
import { ExternalLink } from "../../../../components/ExternalLink";
import SubPageHeading from "../../../../components/SubPageHeading";
import { examples } from "../../../../examples";

export default function CustomCssRoute() {
  return (
    <Container>
      <Block>
        <SubPageHeading title="Custom CSS" />
      </Block>
      <Block>
        <p>
          The following{" "}
          <ExternalLink to="https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties">
            CSS variables
          </ExternalLink>{" "}
          can be used to customize context menu styles:
        </p>
        <Code code={examples.cssVariables} language="css" />
        <p>
          Default values are provided for any variables that are not defined.
        </p>
      </Block>
      <Block>
        <p>Data attribute selectors can also be used to customize styles:</p>
        <Code code={examples.cssDataSelectors} language="css" />
      </Block>
    </Container>
  );
}
