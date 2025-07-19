import { useMemo } from "react";

import { useThemeColors } from "./useThemedColors";
import { useThemeSizes } from "./useThemedSize";
import { ThemedColors } from "@/constants/Colors";
import { ThemedSizes } from "@/constants/Sizes";


type StylesGetter<S> = (ctx: { colors: ThemedColors, sizes: ThemedSizes }) => S;

export function useThemedStyles<const S>(fn: StylesGetter<S>): S {
  const colors = useThemeColors();
  const sizes = useThemeSizes();

  return useMemo(() => fn({ colors, sizes }), [colors, sizes])
}
