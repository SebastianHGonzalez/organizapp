import { Text } from "@/components/Themed";
import { useGetAllTasks } from "@/hooks/data/tasks/useGetAllTasks";
import { FlashList } from "@shopify/flash-list";
import { ScrollView } from "react-native-gesture-handler";

export default function Routines() {
  const { data, isLoading, isError, fetchNextPage } = useGetAllTasks({
    date: new Date(),
  });
  const tasks = data?.pages.flatMap((page) => page);

  return (
    <ScrollView>
      <Text>Routines Screen222</Text>

      <FlashList
        data={tasks}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        keyExtractor={(item) => item.id}
        estimatedItemSize={200}
        onEndReached={() => {
          fetchNextPage();
        }}
      />
    </ScrollView>
  );
}
