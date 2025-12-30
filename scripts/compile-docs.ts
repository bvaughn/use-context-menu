import { compileDocs } from "react-lib-tools/scripts/compile-docs.ts";

await compileDocs({
  componentNames: [
    "ContextMenuCategory",
    "ContextMenuDivider",
    "ContextMenuItem"
  ]
});
