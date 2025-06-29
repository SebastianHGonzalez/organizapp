import Colors from "@/constants/Colors";
import { useColorScheme } from "./useColorScheme";

export function useThemeColors(
) {
    const theme = useColorScheme() ?? "light";
    return Colors[theme];
}
