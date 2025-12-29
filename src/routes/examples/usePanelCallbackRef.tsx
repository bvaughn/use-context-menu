import type { ComponentProps } from "react";
import { Panel } from "use-context-menu";

declare const props: ComponentProps<typeof Panel>;

// <begin>

import { usePanelCallbackRef } from "use-context-menu";

// @ts-expect-error Unused variable
// eslint-disable-next-line react-hooks/rules-of-hooks, @typescript-eslint/no-unused-vars
const [panelRef, setPanelRef] = usePanelCallbackRef();

<Panel panelRef={setPanelRef} {...props} />;
