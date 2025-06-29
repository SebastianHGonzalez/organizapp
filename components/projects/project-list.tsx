import { Task } from "@/model/Task";
import { FlashList } from "@shopify/flash-list";
import { Suspense, use, useMemo } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Text } from "@/components/Themed";

export function ProjectList() {
  const projectsPromise = useMemo(() => Promise.resolve([]), []);

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
  projectsPromise: Promise<Task[]>;
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
