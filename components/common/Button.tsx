import { Text } from "@/components/common/Text";
import { useThemedStyles } from "@/hooks/theme/useThemedStyles";
import {
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";

type ButtonProps = Omit<TouchableOpacityProps, "style"> & {
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
  const themedStyles = useThemedStyles(({ colors, sizes }) => ({
    text: {
      color:
        variant === "primary"
          ? colors.containerBackground
          : variant === "secondary"
            ? colors.text
            : colors.text,
    },
    button: {
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
      borderBottomLeftRadius: mergeBottom || mergeLeft ? undefined : sizes.xs,
      borderBottomRightRadius: mergeBottom || mergeRight ? undefined : sizes.xs,
      paddingVertical: sizes.xs,
      paddingHorizontal: sizes.sm,
      elevation: variant === "text" ? 0 : 3,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: sizes.xs,
    },
  }));

  return (
    <TouchableOpacity
      accessibilityRole="button"
      {...props}
      style={[themedStyles.button, style]}
    >
      {icon && (
        <Text
          accessibilityRole="image"
          variant="button"
          style={[themedStyles.text, { lineHeight: 0 }]}
        >
          {icon}
        </Text>
      )}

      {title && (
        <Text variant="button" style={themedStyles.text}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
