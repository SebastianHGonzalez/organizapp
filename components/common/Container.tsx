import { Text as DefaultText, View as DefaultView } from "react-native";

import { useThemeColors } from "@/hooks/theme/useThemedColors";
import { useThemeSizes } from "@/hooks/theme/useThemedSize";

type ContainerProps = DefaultView["props"] & {
  /** Remove top border radius when merging with container above */
  mergeTop?: boolean;
  /** Remove bottom border radius when merging with container below */
  mergeBottom?: boolean;
  /** Remove left border radius when merging with container to the left */
  mergeLeft?: boolean;
  /** Remove right border radius when merging with container to the right */
  mergeRight?: boolean;
};

export function Container(props: ContainerProps) {
  const { style, mergeTop, mergeBottom, mergeLeft, mergeRight, ...otherProps } =
    props;
  const colors = useThemeColors();
  const sizes = useThemeSizes();

  return (
    <DefaultView
      style={[
        {
          backgroundColor: colors.containerBackground,
          borderWidth: 0,
          borderColor: colors.border,
          borderTopLeftRadius: mergeTop || mergeLeft ? 0 : sizes.xs,
          borderTopRightRadius: mergeTop || mergeRight ? 0 : sizes.xs,
          borderBottomLeftRadius: mergeBottom || mergeLeft ? 0 : sizes.xs,
          borderBottomRightRadius: mergeBottom || mergeRight ? 0 : sizes.xs,
          marginBottom: mergeBottom ? 0 : sizes.sm,
          marginTop: mergeTop ? 0 : sizes.sm,
          marginLeft: mergeLeft ? 0 : sizes.sm,
          marginRight: mergeRight ? 0 : sizes.sm,
          elevation: 1,
          padding: sizes.md,
          gap: sizes.sm,
          flexDirection: "column",
        },
        style,
      ]}
      {...otherProps}
    />
  );
}
