import { Container } from "@/components/common/Container";
import { Text } from "@/components/common/Text";
import { View } from "@/components/common/View";
import { TextInput } from "@/components/common/TextInput";
import { Button } from "@/components/common/Button";
import { useThemeColors } from "@/hooks/theme/useThemedColors";
import { useThemeSizes } from "@/hooks/theme/useThemedSize";
import { Code } from "../common/Code";
import { ActionButton } from "../common/ActionButton";
import EventIcon from "@/assets/svg/event-icon.svg";
import { FlashList } from "@shopify/flash-list";
import GoalIcon from "@/assets/svg/goal-icon.svg";
import RoutineIcon from "@/assets/svg/routine-icon.svg";
import FinanceIcon from "@/assets/svg/finance-icon.svg";
import NoteIcon from "@/assets/svg/note-icon.svg";

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
        <Button title="Test Button" onPress={() => {}} />
        <Button title="Test Button" onPress={() => {}} variant="secondary" />
        <Button title="Test Button" onPress={() => {}} variant="text" />
      </Container>

      <Container>
        <Text variant="heading2">Action buttons</Text>

        <FlashList
          data={[
            {
              label: "Event",
              color: "#7a1572",
              backgroundColor: "#fff3ff",
              borderColor: "#ffa7ff",
              icon: <EventIcon width={24} height={24} />,
            },
            {
              label: "Goal",
              color: "#7a1572",
              backgroundColor: "#fff3ff",
              borderColor: "#ffa7ff",
              icon: <GoalIcon width={24} height={24} />,
            },
            {
              label: "Routine",
              color: "#7a1572",
              backgroundColor: "#fff3ff",
              borderColor: "#ffa7ff",
              icon: <RoutineIcon width={24} height={24} />,
            },
            {
              label: "Expense",
              color: "#7a1572",
              backgroundColor: "#fff3ff",
              borderColor: "#ffa7ff",
              icon: <FinanceIcon width={24} height={24} />,
            },
            {
              label: "Income",
              color: "#7a1572",
              backgroundColor: "#fff3ff",
              borderColor: "#ffa7ff",
              icon: <FinanceIcon width={24} height={24} />,
            },
            {
              label: "Note",
              color: "#7a1572",
              backgroundColor: "#fff3ff",
              borderColor: "#ffa7ff",
              icon: <NoteIcon width={24} height={24} />,
            },
          ]}
          numColumns={6}
          renderItem={({ item, index }) => (
            <ActionButton
              label={item.label}
              onPress={() => {}}
              color={item.color}
              backgroundColor={item.backgroundColor}
              borderColor={item.borderColor}
              labelColor={colors.text}
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
