import { createContext, use } from "react";

import sizes from "@/constants/Sizes";

const layoutSchemeContext = createContext<keyof typeof sizes>("comfortable");

export function useLayoutScheme() {
    return use(layoutSchemeContext);
}

export const LayoutSchemeProvider = layoutSchemeContext.Provider;
