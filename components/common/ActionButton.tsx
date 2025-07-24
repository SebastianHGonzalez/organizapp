import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";

import { Color } from "@/constants/Colors";
import { useThemedStyles } from "@/hooks/theme/useThemedStyles";
import { useButtonThemedStyles } from "./Button";
import { Text } from "./Text";
import { View } from "./View";

type ActionButtonProps = Omit<PressableProps, "style"> & {
  label?: string;
  children?: React.ReactNode;

  color?: Color;
  labelColor?: Color;

  style?: StyleProp<ViewStyle>;
};

export function ActionButton(props: ActionButtonProps) {
  const themedStyles = useActioButtonThemedStyles(props);
  const buttonThemedStyles = useButtonThemedStyles({ color: props.color });

  return (
    <Pressable
      accessibilityRole="button"
      {...props}
      style={[styles.wrapper, themedStyles.wrapper, props.style]}
    >
      <View style={buttonThemedStyles.button}>
        <Text
          accessibilityRole="image"
          variant="button"
          style={buttonThemedStyles.icon}
        >
          {props.children}
        </Text>
      </View>

      {props.label && <Text variant="label">{props.label}</Text>}
    </Pressable>
  );
}

function useActioButtonThemedStyles(props: ActionButtonProps) {
  return useThemedStyles(({ colors, sizes }) => {
    return {
      wrapper: {
        gap: sizes.xs,
      },
    };
  });
}

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});
