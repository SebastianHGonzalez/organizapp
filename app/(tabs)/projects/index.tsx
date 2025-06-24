import { Text, View } from "@/components/Themed";
import { useGetAllProjects } from "@/hooks/useGetAllProjects";

export default function ProjectsScreen() {
  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useGetAllProjects({ offset: 0, limit: 10 });

  return (
    <View>
      <Text>Projects</Text>
    </View>
  );
}
