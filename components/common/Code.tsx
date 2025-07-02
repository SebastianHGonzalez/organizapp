import { useThemeColors } from "@/hooks/theme/useThemedColors";
import { useThemeSizes } from "@/hooks/theme/useThemedSize";
import { Text, TextProps } from "./Text";

type CodeProps = Omit<TextProps, "variant">;

export function Code(props: CodeProps) {
  const { style, ...otherProps } = props;
  const colors = useThemeColors();
  const sizes = useThemeSizes();

  return (
    <Text
      variant="mono"
      {...otherProps}
      style={[
        style,
        {
          backgroundColor: colors.containerBackground,
          borderRadius: sizes.xs,
          padding: sizes.sm,
          marginVertical: sizes.sm,
          borderWidth: 1,
          borderColor: colors.border,
        },
      ]}
    />
  );
}
