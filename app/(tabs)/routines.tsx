import { Text, View } from "react-native";
import { useGetAllTasks } from "@/hooks/useGetAllTasks";
import { FlashList } from "@shopify/flash-list";

export default function Routines() {
  const { data, isLoading, isError, fetchNextPage } = useGetAllTasks({
    date: new Date(),
  });
  const tasks = data?.pages.flatMap((page) => page);

  return (
    <View>
      <Text>Routines Screen</Text>
      <FlashList
        data={tasks}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        keyExtractor={(item) => item.id}
        estimatedItemSize={200}
        onEndReached={() => {
          fetchNextPage();
        }}
      />
    </View>
  );
}
