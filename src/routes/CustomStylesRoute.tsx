import { Box, Callout, Code, ExternalLink, Header } from "react-lib-tools";
import { html as htmlCssVariables } from "../../public/generated/examples/CssVariables.json";
import { html as htmlCssOverrides } from "../../public/generated/examples/CssOverrides.json";
import { html as htmlCssDataAttributes } from "../../public/generated/examples/CssDataAttributes.json";
import { html as htmlImportStyles } from "../../public/generated/examples/ImportStyles.json";

export default function CustomStylesRoute() {
  return (
    <Box direction="column" gap={4}>
      <Header section="Examples" title="Custom styles" />
      <div>
        The recommended way to customize styles is to use{" "}
        <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties">
          CSS variables
        </ExternalLink>
        . Begin by customizing any of the variables below:
      </div>
      <Code html={htmlCssVariables} />
      <div>
        Then just be sure to import the library styles once somewhere in your
        application.
      </div>
      <Code html={htmlImportStyles} />
      <Callout intent="primary">
        Default values are provided for any variables that are not defined.
      </Callout>
      <div className="text-lg font-bold">Global class names</div>
      <div>
        You can also bypass the included{" "}
        <code>use-context-menu/styles.css</code> file and define your own
        styles.
      </div>
      <Code html={htmlCssOverrides} />
      <div className="text-lg font-bold">Data selectors</div>
      <div>
        Lastly, data attribute selectors can be used to customize styles
        (although these are primarily intended for e2e testing purposes).
      </div>
      <Code html={htmlCssDataAttributes} />
    </Box>
  );
}
