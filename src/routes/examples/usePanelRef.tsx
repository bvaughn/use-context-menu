import type { ComponentProps } from "react";
import { Panel } from "use-context-menu";

declare const props: ComponentProps<typeof Panel>;

// <begin>

import { usePanelRef } from "use-context-menu";

// eslint-disable-next-line react-hooks/rules-of-hooks
const ref = usePanelRef();

<Panel panelRef={ref} {...props} />;
