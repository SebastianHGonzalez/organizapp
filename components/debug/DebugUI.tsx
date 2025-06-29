import { Text, View } from "@/components/Themed";
import { Container } from "@/components/common/Container";
import Fonts from "@/constants/Fonts";
import { Button } from "@/components/common/Button";

export function DebugUI() {
  return (
    <View>
      <Text>DebugUI</Text>

      <Container mergeBottom>
        <Text style={[Fonts.heading]}>Test heading</Text>
        <Text style={[Fonts.body]}>Test body</Text>
        <Text style={[Fonts.caption]}>Test caption</Text>
        <Text style={[Fonts.label]}>Test label</Text>
        <Text style={[Fonts.input]}>Test input</Text>
      </Container>
      <Container mergeTop>
        <Text>Test container</Text>
        <Button title="Test Button" onPress={() => {}} />
        <Button title="Test Button" onPress={() => {}} variant="secondary" />
        <Button title="Test Button" onPress={() => {}} variant="text" />
      </Container>
    </View>
  );
}
