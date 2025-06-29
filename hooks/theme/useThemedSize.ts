import Sizes from "@/constants/Sizes";
import { useLayoutScheme } from "./useLayoutScheme";

export function useThemeSizes(
) {
    const theme = useLayoutScheme();
    return Sizes[theme];
}
