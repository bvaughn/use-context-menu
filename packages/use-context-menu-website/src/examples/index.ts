import { readFileSync } from "fs";
import { join } from "path";

export const examples = {
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
