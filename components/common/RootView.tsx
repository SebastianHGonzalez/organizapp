import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useThemeColors } from "@/hooks/theme/useThemedColors";

type RootViewProps = ScrollView["props"];

export function RootView(props: RootViewProps) {
  const inset = useSafeAreaInsets();
  const colors = useThemeColors();

  return (
    <ScrollView
      {...props}
      contentContainerStyle={{
        backgroundColor: colors.background,
        minHeight: "100%",
        paddingTop: inset.top,
        paddingBottom: inset.bottom,
        paddingLeft: inset.left,
        paddingRight: inset.right,
      }}
    />
  );
}
