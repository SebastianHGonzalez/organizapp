import { View as DefaultView } from "react-native";

export type ViewProps = DefaultView["props"];

export function View(props: ViewProps) {
  return <DefaultView {...props} />;
}
