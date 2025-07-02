import { Text } from "@/components/common/Text";
import { useThemeColors } from "@/hooks/theme/useThemedColors";
import { useThemeSizes } from "@/hooks/theme/useThemedSize";
import { Pressable, PressableProps } from "react-native";

type ButtonProps = {
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
};

export function Button({
  title,
  icon,
  mergeTop,
  mergeBottom,
  mergeLeft,
  mergeRight,
  variant = "primary",
  ...props
}: ButtonProps & PressableProps) {
  const colors = useThemeColors();
  const sizes = useThemeSizes();

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
          borderTopLeftRadius: mergeTop || mergeLeft ? 0 : sizes.xs,
          borderTopRightRadius: mergeTop || mergeRight ? 0 : sizes.xs,
          borderBottomLeftRadius: mergeBottom || mergeLeft ? 0 : sizes.xs,
          borderBottomRightRadius: mergeBottom || mergeRight ? 0 : sizes.xs,
          paddingVertical: sizes.xs,
          paddingHorizontal: sizes.sm,
          elevation: variant === "text" ? 0 : 1,
        },
      ]}
    >
      {icon}

      {title && (
        <Text
          variant="button"
          style={[
            {
              color:
                variant === "primary"
                  ? colors.containerBackground
                  : variant === "secondary"
                    ? colors.text
                    : colors.text,
            },
          ]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}
