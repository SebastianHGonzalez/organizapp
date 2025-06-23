import { getAllProjects } from "@/db/projects";
import { Project } from "@/model/Project";
import { FlashList } from "@shopify/flash-list";
import { useSQLiteContext } from "expo-sqlite";
import { Suspense, use, useMemo } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Text } from "react-native";

export function ProjectList() {
  const db = useSQLiteContext();
  const projectsPromise = useMemo(() => getAllProjects(db), [db]);

  return (
    <ErrorBoundary FallbackComponent={Error}>
      <Suspense fallback={<Text>Loading projects...</Text>}>
        <InternalProjectList projectsPromise={projectsPromise} />
      </Suspense>
    </ErrorBoundary>
  );
}

function InternalProjectList({
  projectsPromise,
}: {
  projectsPromise: Promise<Project[]>;
}) {
  const projects = use(projectsPromise);
  return (
    <FlashList
      data={projects}
      renderItem={({ item }) => <Text>{item.name}</Text>}
    />
  );
}

function Error({ error }: { error: Error }) {
  return <Text>Error loading projects</Text>;
}
