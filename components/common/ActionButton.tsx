import { useThemeColors } from "@/hooks/theme/useThemedColors";
import { useThemeSizes } from "@/hooks/theme/useThemedSize";
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  ViewStyle,
  Text as DefaultText,
} from "react-native";
import { View } from "./View";
import { Text } from "./Text";

type ActionButtonProps = Omit<PressableProps, "style"> & {
  label?: string;
  children?: React.ReactNode;

  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  labelColor?: string;

  style?: StyleProp<ViewStyle>;
};

export function ActionButton({
  label,
  children,
  style,
  color,
  backgroundColor,
  borderColor,
  labelColor,
  ...props
}: ActionButtonProps) {
  const colors = useThemeColors();
  const sizes = useThemeSizes();

  return (
    <Pressable
      accessibilityRole="button"
      {...props}
      style={[
        styles.wrapper,
        {
          gap: sizes.xs,
        },
        style,
      ]}
    >
      <View
        style={StyleSheet.flatten([
          {
            backgroundColor: backgroundColor || colors.tint,
            padding: sizes.xs,
            borderRadius: sizes.xs,
            borderWidth: 1,
            borderColor: borderColor || colors.tintBorder,
          },
        ])}
      >
        <DefaultText style={{ color: color || colors.text }}>
          {children}
        </DefaultText>
      </View>
      {label && <Text variant="label">{label}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});
