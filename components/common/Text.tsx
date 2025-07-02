import { AccessibilityRole, Text as DefaultText } from "react-native";

import Fonts from "@/constants/Fonts";
import { useThemeColors } from "@/hooks/theme/useThemedColors";

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
  button: "button",
  input: "text",
  overline: "text",
  mono: "text",
} as const;

export function Text(props: TextProps) {
  const { style, variant, ...otherProps } = props;
  const colors = useThemeColors();

  return (
    <DefaultText
      accessibilityRole={roleMap[variant]}
      style={[
        {
          color: colors.text,
        },
        Fonts[variant],
        style,
      ]}
      {...otherProps}
    />
  );
}
