import type { ComponentProps } from "react";
import { Group } from "use-context-menu";

declare const props: ComponentProps<typeof Group>;

// <begin>

import { useGroupRef } from "use-context-menu";

// eslint-disable-next-line react-hooks/rules-of-hooks
const ref = useGroupRef();

<Group groupRef={ref} {...props} />;
