import { Task } from "@/model/Task";
import { FlashList } from "@shopify/flash-list";
import { Suspense, use, useMemo } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Text } from "@/components/common/Text";

export function ProjectList() {
  const projectsPromise = useMemo(() => Promise.resolve([]), []);

  return (
    <ErrorBoundary FallbackComponent={Error}>
      <Suspense fallback={<Text variant="body">Loading projects...</Text>}>
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
      renderItem={({ item }) => <Text variant="body">{item.name}</Text>}
    />
  );
}

function Error({ error }: { error: Error }) {
  return <Text variant="body">Error loading projects</Text>;
}
