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
          The recommended way to customize styles for this package is to use{" "}
          <ExternalLink to="https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties">
            CSS variables
          </ExternalLink>
          :
        </p>
        <Code code={examples.cssVariables} language="css" />
        <p>
          Default values are provided for any variables that are not defined.
        </p>
      </Block>
      <Block>
        <p>
          You can also bypass the included{" "}
          <code>use-context-menu/styles.css</code> file and define your own
          styles:
        </p>
        <Code code={examples.customStyles} language="css" />
      </Block>
      <Block>
        <p>
          Lastly, data attribute selectors can be used to customize styles
          (although these are primarily intended for e2e testing purposes):
        </p>
        <Code code={examples.cssDataSelectors} language="css" />
      </Block>
    </Container>
  );
}
