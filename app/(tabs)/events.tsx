import { Text } from "@/components/common/Text";
import { DebugUI } from "@/components/debug/DebugUI";
import { RootView } from "@/components/common/RootView";

export default function Events() {
  return (
    <RootView>
      <Text variant="heading1">Events Screen</Text>

      <DebugUI />
    </RootView>
  );
}
