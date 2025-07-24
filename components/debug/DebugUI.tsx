import { FlashList } from "@shopify/flash-list";

import EventIcon from "@/assets/svg/event-icon.svg";
import FinanceIcon from "@/assets/svg/finance-icon.svg";
import GoalIcon from "@/assets/svg/goal-icon.svg";
import NoteIcon from "@/assets/svg/note-icon.svg";
import RoutineIcon from "@/assets/svg/routine-icon.svg";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { Text } from "@/components/common/Text";
import { TextInput } from "@/components/common/TextInput";
import { View } from "@/components/common/View";
import { useThemeColors } from "@/hooks/theme/useThemedColors";
import { ActionButton } from "../common/ActionButton";
import { Code } from "../common/Code";

export function DebugUI() {
  const colors = useThemeColors();

  return (
    <View>
      <Text variant="display">Display</Text>
      <Text variant="hero">Hero</Text>
      <Text variant="heading1">Heading 1</Text>
      <Text variant="heading2">Heading 2</Text>
      <Text variant="heading3">Heading 3</Text>

      <Container mergeBottom>
        <Text variant="heading1">Heading 1</Text>
        <Text variant="body">
          Body: Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Quisquam, quos.
        </Text>
        <Text variant="subtitle">Subtitle</Text>
        <Text variant="caption">Caption</Text>
        <Text variant="label">Label</Text>
        <TextInput placeholder="Input" />

        <Code>Mono space</Code>
      </Container>
      <Container mergeTop>
        <Text variant="heading1">Test container</Text>
        <Button title="Test Button: primary" onPress={() => {}} />
        <Button
          title="Test Button: outline"
          onPress={() => {}}
          variant="outline"
        />
        <Button title="Test Button: text" onPress={() => {}} variant="text" />
      </Container>

      <Container>
        <Text variant="heading1">Test button colors</Text>

        <Button
          title="lavenderMagenta"
          color="lavenderMagenta"
          key="lavenderMagenta"
        />
        <Button title="bittersweet" color="bittersweet" key="bittersweet" />
        <Button title="seagull" color="seagull" key="seagull" />
        <Button title="malachite" color="malachite" key="malachite" />
        <Button title="ripeLemon" color="ripeLemon" key="ripeLemon" />
        <Button
          title="silverChalice"
          color="silverChalice"
          key="silverChalice"
        />
        <Button title="pictonBlue" color="pictonBlue" key="pictonBlue" />
        <Button title="zinc" color="zinc" key="zinc" />
      </Container>

      <Container>
        <Text variant="heading2">Action buttons</Text>

        <FlashList
          data={
            [
              {
                label: "Event",
                color: "lavenderMagentaLight",
                icon: <EventIcon width={24} height={24} />,
              },
              {
                label: "Goal",
                color: "bittersweetLight",
                icon: <GoalIcon width={24} height={24} />,
              },
              {
                label: "Routine",
                color: "seagullLight",
                icon: <RoutineIcon width={24} height={24} />,
              },
              {
                label: "Expense",
                color: "malachiteLight",
                icon: <FinanceIcon width={24} height={24} />,
              },
              {
                label: "Income",
                color: "ripeLemonLight",
                icon: <FinanceIcon width={24} height={24} />,
              },
              {
                label: "Note",
                color: "zincLight",
                icon: <NoteIcon width={24} height={24} />,
              },
            ] as const
          }
          numColumns={5}
          renderItem={({ item }) => (
            <ActionButton
              key={item.label}
              label={item.label}
              onPress={() => {}}
              color={item.color}
              style={{ margin: 15 }}
            >
              {item.icon}
            </ActionButton>
          )}
        />
      </Container>
    </View>
  );
}
