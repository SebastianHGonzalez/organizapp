import { Text } from "@/components/common/Text";
import { Color, ThemedColors } from "@/constants/Colors";
import { ThemedSizes } from "@/constants/Sizes";
import { useThemedStyles } from "@/hooks/theme/useThemedStyles";
import {
  StyleProp,
  StyleSheet,
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
  variant?: "primary" | "outline" | "text";
  color?: Color;
  style?: StyleProp<ViewStyle>;
};

export function Button(props: ButtonProps) {
  const themedStyles = useButtonThemedStyles(props);

  return (
    <TouchableOpacity
      accessibilityRole="button"
      {...props}
      style={[themedStyles.button, props.style]}
    >
      {props.icon && (
        <Text
          accessibilityRole="image"
          variant="button"
          style={themedStyles.icon}
        >
          {props.icon}
        </Text>
      )}

      {props.title && (
        <Text variant="button" style={themedStyles.text}>
          {props.title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

export function useButtonThemedStyles({
  mergeTop,
  mergeBottom,
  mergeLeft,
  mergeRight,
  variant = "primary",
  color = "malachite",
}: Pick<
  ButtonProps,
  "mergeTop" | "mergeBottom" | "mergeLeft" | "mergeRight" | "variant" | "color"
>) {
  return useThemedStyles(
    ({ colors, sizes }) => {
      let btnColor: string = colors[color];
      let borderColor: string = colors[`${color}Border`];
      let txtColor: string = colors[`${color}Contrast`];
      let elevation: number = 3;

      if (variant === "outline") {
        btnColor = "transparent";
        txtColor = colors.text;
        elevation = 0;
      }

      if (variant === "text") {
        btnColor = "tansparent";
        txtColor = colors.text;
        borderColor = "transparent";
        elevation = 0;
      }

      return {
        text: {
          color: txtColor,
        },
        icon: {
          color: txtColor,
          lineHeight: 0,
        },
        button: {
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          color: txtColor,

          backgroundColor: btnColor,
          borderColor: borderColor,
          borderWidth: 1,
          borderTopLeftRadius: mergeTop || mergeLeft ? undefined : sizes.xs,
          borderTopRightRadius: mergeTop || mergeRight ? undefined : sizes.xs,
          borderBottomLeftRadius:
            mergeBottom || mergeLeft ? undefined : sizes.xs,
          borderBottomRightRadius:
            mergeBottom || mergeRight ? undefined : sizes.xs,
          paddingVertical: sizes.xs,
          paddingHorizontal: sizes.sm,
          elevation,
          gap: sizes.xs,
        },
      };
    },
    [mergeTop, mergeBottom, mergeLeft, mergeRight, variant],
  );
}
