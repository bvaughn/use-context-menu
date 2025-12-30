import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import { Box, Code, ExternalLink, Header } from "react-lib-tools";
import packageJSON from "../../package.json";
import { html as htmlReactNode } from "../../public/generated/examples/UseContextMenu.json";

export default function UseContextMenuRoute() {
  return (
    <Box direction="column" gap={4}>
      <Box align="center" direction="row" gap={2} wrap>
        <Header section="API" title="useContextMenu" />
        <ExternalLink
          className="text-sm text-emerald-300 hover:text-white"
          href={`${packageJSON.repository.url.replace("git+", "").replace(".git", "")}/blob/main/lib/hooks/useContextMenu.tsx`}
        >
          <ArrowTopRightOnSquareIcon className="inline-block size-4 fill-current" />
        </ExternalLink>
      </Box>
      <div>
        Create a ready-to-render context menu. The first argument to this hook
        describes the menu:
      </div>
      <Code html={htmlReactNode} />
      <div>
        The second, optional argument allows further customizations of things
        like menu alignment. (See the examples section for more information.)
      </div>
    </Box>
  );
}
