import { View as DefaultView } from "react-native";

import { useThemeColors } from "@/hooks/theme/useThemedColors";

export type ViewProps = DefaultView["props"];

export function View(props: ViewProps) {
  const { style, ...otherProps } = props;
  const colors = useThemeColors();

  return (
    <DefaultView
      style={[{ backgroundColor: colors.background }, style]}
      {...otherProps}
    />
  );
}
