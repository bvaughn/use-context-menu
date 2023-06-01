import { readFileSync } from "fs";
import { join } from "path";

export const examples = {
  cssDataSelectors: processExample(
    readFileSync(
      join(__dirname, "guides", "custom-css", "dataSelectors.css"),
      "utf8"
    )
  ),
  cssVariables: processExample(
    readFileSync(
      join(__dirname, "guides", "custom-css", "cssVariables.css"),
      "utf8"
    )
  ),
  customStyles: processExample(
    readFileSync(
      join(__dirname, "guides", "custom-css", "customStyles.css"),
      "utf8"
    )
  ),
  leftClick: processExample(
    readFileSync(join(__dirname, "guides", "left-click", "index.tsx"), "utf8")
  ),
  rightClick: processExample(
    readFileSync(join(__dirname, "guides", "right-click", "index.tsx"), "utf8")
  ),
};

function processExample(text: string): string {
  let index = text.indexOf("// REMOVE_BEFORE");
  if (index >= 0) {
    text = text.substring(index + "// REMOVE_BEFORE".length);
  }

  index = text.indexOf("// REMOVE_AFTER");
  if (index >= 0) {
    text = text.substring(0, index);
  }

  return text.trim();
}
