import {
  AccessibilityRole,
  Text as DefaultText,
  StyleSheet,
} from "react-native";

import Fonts from "@/constants/Fonts";
import { useThemeColors } from "@/hooks/theme/useThemedColors";
import { useThemedStyles } from "@/hooks/theme/useThemedStyles";

export type TextProps = DefaultText["props"] & {
  variant: keyof typeof Fonts;
};

const roleMap: Record<keyof typeof Fonts, AccessibilityRole> = {
  display: "header",
  hero: "header",
  heading1: "header",
  heading2: "header",
  heading3: "header",
  subtitle: "header",
  body: "text",
  bodyBold: "text",
  monospace: "text",
  caption: "text",
  label: "text",
  button: "text",
  input: "text",
  overline: "text",
  mono: "text",
} as const;

export function Text(props: TextProps) {
  const { style, variant, accessibilityRole, ...otherProps } = props;
  const themedStyle = useThemedStyles(
    ({ colors }) => ({
      text: {
        ...Fonts[variant],
        color: colors.text,
      },
    }),
    [variant],
  );

  return (
    <DefaultText
      accessibilityRole={accessibilityRole || roleMap[variant]}
      style={[themedStyle.text, style]}
      {...otherProps}
    />
  );
}
