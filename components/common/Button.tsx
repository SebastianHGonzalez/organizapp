import { Text } from "@/components/common/Text";
import { useThemeColors } from "@/hooks/theme/useThemedColors";
import { useThemeSizes } from "@/hooks/theme/useThemedSize";
import { useMemo } from "react";
import { Pressable, PressableProps, StyleProp, ViewStyle } from "react-native";

type ButtonProps = Omit<PressableProps, "style"> & {
  title?: string;
  icon?: React.ReactNode;
  /** Remove top border radius when merging with container above */
  mergeTop?: boolean;
  /** Remove bottom border radius when merging with container below */
  mergeBottom?: boolean;
  /** Remove left border radius when merging with container to the left */
  mergeLeft?: boolean;
  /** Remove right border radius when merging with container to the right */
  mergeRight?: boolean;
  variant?: "primary" | "secondary" | "text";
  style?: StyleProp<ViewStyle>;
};

export function Button({
  title,
  icon,
  mergeTop,
  mergeBottom,
  mergeLeft,
  mergeRight,
  variant = "primary",
  style,
  ...props
}: ButtonProps) {
  const colors = useThemeColors();
  const sizes = useThemeSizes();
  const textStyle = useMemo(() => {
    return {
      color:
        variant === "primary"
          ? colors.containerBackground
          : variant === "secondary"
            ? colors.text
            : colors.text,
    };
  }, [variant, colors]);

  return (
    <Pressable
      accessibilityRole="button"
      {...props}
      style={[
        {
          backgroundColor:
            variant === "primary"
              ? colors.tint
              : variant === "secondary"
                ? colors.containerBackground
                : "transparent",
          borderWidth: 1,
          borderColor:
            variant === "primary"
              ? colors.tintBorder
              : variant === "secondary"
                ? colors.border
                : "transparent",
          borderTopLeftRadius: mergeTop || mergeLeft ? undefined : sizes.xs,
          borderTopRightRadius: mergeTop || mergeRight ? undefined : sizes.xs,
          borderBottomLeftRadius:
            mergeBottom || mergeLeft ? undefined : sizes.xs,
          borderBottomRightRadius:
            mergeBottom || mergeRight ? undefined : sizes.xs,
          paddingVertical: sizes.xs,
          paddingHorizontal: sizes.sm,
          elevation: variant === "text" ? 0 : 3,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: sizes.xs,
        },
        style,
      ]}
    >
      {icon && (
        <Text
          accessibilityRole="image"
          variant="button"
          style={[textStyle, { lineHeight: 0 }]}
        >
          {icon}
        </Text>
      )}

      {title && (
        <Text variant="button" style={textStyle}>
          {title}
        </Text>
      )}
    </Pressable>
  );
}
