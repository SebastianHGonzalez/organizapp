import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render as renderNative } from "@testing-library/react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export const render: typeof renderNative = (component, options) => {
  const queryClient = new QueryClient();
  return renderNative(component, {
    wrapper: ({ children }) => (
      <GestureHandlerRootView>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider value={DefaultTheme}>{children}</ThemeProvider>
        </QueryClientProvider>
      </GestureHandlerRootView>
    ),
    ...options,
  });
};
