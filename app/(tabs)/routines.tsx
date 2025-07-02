import { Text } from "@/components/common/Text";
import { useGetAllTasks } from "@/hooks/data/tasks/useGetAllTasks";
import { FlashList } from "@shopify/flash-list";
import { ScrollView } from "react-native-gesture-handler";
import { DebugAllIcons } from "@/components/debug/DebugAllIcons";

export default function Routines() {
  const { data, isLoading, isError, fetchNextPage } = useGetAllTasks({
    date: new Date(),
  });
  const tasks = data?.pages.flatMap((page) => page);

  return (
    <ScrollView>
      <Text variant="heading1" accessibilityRole="header">
        Routines Screen
      </Text>

      <DebugAllIcons />

      <FlashList
        data={tasks}
        renderItem={({ item }) => <Text variant="body">{item.name}</Text>}
        keyExtractor={(item) => item.id}
        estimatedItemSize={200}
        onEndReached={() => {
          fetchNextPage();
        }}
      />
    </ScrollView>
  );
}
