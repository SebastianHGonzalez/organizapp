import { Text } from "@/components/common/Text";
import { useGetAllTasks } from "@/hooks/data/tasks/useGetAllTasks";
import { FlashList } from "@shopify/flash-list";
import { DebugAllIcons } from "@/components/debug/DebugAllIcons";
import { RootView } from "@/components/common/RootView";

export default function Routines() {
  const { data, isLoading, isError, fetchNextPage } = useGetAllTasks({
    date: new Date(),
  });
  const tasks = data?.pages.flatMap((page) => page);

  return (
    <RootView>
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
    </RootView>
  );
}
