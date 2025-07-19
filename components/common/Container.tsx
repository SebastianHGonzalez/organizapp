import { View as DefaultView } from "react-native";

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
          borderTopLeftRadius: mergeTop || mergeLeft ? undefined : sizes.xs,
          borderTopRightRadius: mergeTop || mergeRight ? undefined : sizes.xs,
          borderBottomLeftRadius:
            mergeBottom || mergeLeft ? undefined : sizes.xs,
          borderBottomRightRadius:
            mergeBottom || mergeRight ? undefined : sizes.xs,
          marginBottom: mergeBottom ? undefined : sizes.sm,
          marginTop: mergeTop ? undefined : sizes.sm,
          marginLeft: mergeLeft ? undefined : sizes.xs,
          marginRight: mergeRight ? undefined : sizes.xs,
          elevation: 1,
          paddingHorizontal: sizes.sm,
          paddingVertical: sizes.md,
          gap: sizes.sm,
          flexDirection: "column",
        },
        style,
      ]}
      {...otherProps}
    />
  );
}
