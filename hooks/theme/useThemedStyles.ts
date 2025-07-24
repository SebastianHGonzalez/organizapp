import { DependencyList, useMemo } from "react";
import { ColorSchemeName, StyleSheet, useColorScheme } from "react-native";

import { ThemedColors } from "@/constants/Colors";
import { ThemedSizes } from "@/constants/Sizes";
import { useThemeColors } from "./useThemedColors";
import { useThemeSizes } from "./useThemedSize";

export type ThemedStylesGetter<
  T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>,
> = (ctx: { colors: ThemedColors; sizes: ThemedSizes }) => T;

export function useThemedStyles<
  T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>,
>(fn: ThemedStylesGetter<T>, deps: DependencyList = []): T {
  const colors = useThemeColors();
  const sizes = useThemeSizes();

  return useMemo(
    () => StyleSheet.create(fn({ colors, sizes })),
    [colors, sizes, ...deps]
  );
}
