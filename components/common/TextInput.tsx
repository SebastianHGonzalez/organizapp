import { TextInput as DefaultTextInput } from "react-native";

import Fonts from "@/constants/Fonts";
import { useThemeColors } from "@/hooks/theme/useThemedColors";
import { useThemeSizes } from "@/hooks/theme/useThemedSize";

export type TextInputProps = DefaultTextInput["props"] & {
  /** Remove top border radius when merging with container above */
  mergeTop?: boolean;
  /** Remove bottom border radius when merging with container below */
  mergeBottom?: boolean;
  /** Remove left border radius when merging with container to the left */
  mergeLeft?: boolean;
  /** Remove right border radius when merging with container to the right */
  mergeRight?: boolean;
};

export function TextInput(props: TextInputProps) {
  const { style, mergeTop, mergeBottom, mergeLeft, mergeRight, ...otherProps } =
    props;
  const colors = useThemeColors();
  const sizes = useThemeSizes();

  return (
    <DefaultTextInput
      style={[
        Fonts.input,
        {
          color: colors.text,
          backgroundColor: colors.inputBackground,
          borderColor: colors.border,
          borderWidth: 1,
          borderTopLeftRadius: mergeTop || mergeLeft ? undefined : sizes.xs,
          borderTopRightRadius: mergeTop || mergeRight ? undefined : sizes.xs,
          borderBottomLeftRadius:
            mergeBottom || mergeLeft ? undefined : sizes.xs,
          borderBottomRightRadius:
            mergeBottom || mergeRight ? undefined : sizes.xs,
          paddingVertical: sizes.xs,
          paddingHorizontal: sizes.sm,
        },
        style,
      ]}
      {...otherProps}
    />
  );
}
