import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { render as renderNative } from "@testing-library/react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export const render: typeof renderNative = (component, options) => {
  return renderNative(component, {
    wrapper: ({ children }) => (
      <GestureHandlerRootView>
        <ThemeProvider value={DefaultTheme}>{children}</ThemeProvider>
      </GestureHandlerRootView>
    ),
    ...options,
  });
};
