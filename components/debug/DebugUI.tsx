import { Container } from "@/components/common/Container";
import { Text } from "@/components/common/Text";
import { View } from "@/components/common/View";
import { TextInput } from "@/components/common/TextInput";
import { Button } from "@/components/common/Button";
import { useThemeColors } from "@/hooks/theme/useThemedColors";
import { useThemeSizes } from "@/hooks/theme/useThemedSize";
import { Code } from "../common/Code";

export function DebugUI() {
  const colors = useThemeColors();
  const sizes = useThemeSizes();

  return (
    <View>
      <Text variant="display">Display</Text>
      <Text variant="hero">Hero</Text>
      <Text variant="heading1">Heading 1</Text>
      <Text variant="heading2">Heading 2</Text>
      <Text variant="heading3">Heading 3</Text>

      <Container mergeBottom>
        <Text variant="heading1">Heading 1</Text>
        <Text variant="body">Body</Text>
        <Text variant="caption">Caption</Text>
        <Text variant="label">Label</Text>
        <TextInput placeholder="Input" />

        <Code>Mono space</Code>
      </Container>
      <Container mergeTop>
        <Text variant="heading1">Test container</Text>
        <Button title="Test Button" onPress={() => {}} />
        <Button title="Test Button" onPress={() => {}} variant="secondary" />
        <Button title="Test Button" onPress={() => {}} variant="text" />
      </Container>
    </View>
  );
}
