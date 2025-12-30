import { Box, ComponentProps, type ComponentMetadata } from "react-lib-tools";
import json from "../../public/generated/docs/ContextMenuCategory.json";

export default function ContextMenuCategoryRoute() {
  return (
    <Box direction="column" gap={4}>
      <ComponentProps
        json={json as ComponentMetadata}
        section="ContextMenuCategory"
      />
    </Box>
  );
}
