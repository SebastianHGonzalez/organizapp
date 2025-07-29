import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import { Link } from "expo-router";
import { ReactNode } from "react";
import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

import EventIcon from "@/assets/svg/event-icon.svg";
import FinanceIcon from "@/assets/svg/finance-icon.svg";
import GoalIcon from "@/assets/svg/goal-icon.svg";
import IdeaIcon from "@/assets/svg/idea-icon.svg";
import LinkIcon from "@/assets/svg/link-icon.svg";
import PuzzleIcon from "@/assets/svg/puzzle-icon.svg";
import RoutineIcon from "@/assets/svg/routine-icon.svg";
import { ActionButton } from "@/components/common/ActionButton";
import { Drawer } from "@/components/common/Drawer";
import { Text } from "@/components/common/Text";
import { Color } from "@/constants/Colors";
import { useThemedStyles } from "@/hooks/theme/useThemedStyles";
import { t } from "@/i18n/t";
import { TaskLogType, TaskType } from "@/model/Task";

interface NewTaskDrawerStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const newTaskDrawerStoreCreator: StateCreator<NewTaskDrawerStore> = (set) => ({
  isOpen: false,
  open() {
    set({ isOpen: true });
  },
  close() {
    set({ isOpen: false });
  },
});

export const useNewTaskDrawer = create<NewTaskDrawerStore>()(
  devtools(newTaskDrawerStoreCreator),
);

export function NewTaskDrawer() {
  const themedStyle = useNewTaskDrawerThemedStyles();
  const { isOpen, close } = useNewTaskDrawer();

  return (
    <Drawer onClose={close} isOpen={isOpen}>
      <Text variant="heading3" style={themedStyle.heading}>
        {t("newTaskDrawer.header")}
      </Text>

      <FlashList
        data={
          [
            {
              label: t("newTaskDrawer.event.label"),
              color: "lavenderMagentaLight",
              icon: <EventIcon width="100%" height="100%" />,
              taskType: "event",
            },
            {
              label: t("newTaskDrawer.routine.label"),
              color: "bittersweetLight",
              icon: <RoutineIcon width="100%" height="100%" />,
              taskType: "routine",
            },
            {
              label: t("newTaskDrawer.goal.label"),
              color: "seagullLight",
              icon: <GoalIcon width="100%" height="100%" />,
              taskType: "goal",
            },
            {
              label: t("newTaskDrawer.project.label"),
              color: "malachiteLight",
              icon: <PuzzleIcon width="100%" height="100%" />,
              taskType: "project",
            },
            {
              label: t("newTaskDrawer.idea.label"),
              color: "ripeLemonLight",
              icon: <IdeaIcon width="100%" height="100%" />,
              taskType: "task", // TODO: fix new idea
            },
            {
              label: t("newTaskDrawer.expense.label"),
              color: "zincLight",
              icon: <FinanceIcon width="100%" height="100%" />,
              taskLogType: "expense",
            },
            {
              label: t("newTaskDrawer.income.label"),
              color: "zincLight",
              icon: <FinanceIcon width="100%" height="100%" />,
              taskLogType: "income",
            },
            {
              label: t("newTaskDrawer.link.label"),
              color: "pictonBlueLight",
              icon: <LinkIcon width="100%" height="100%" />,
              taskType: "task", // TODO: fix new link
            },
          ] as const
        }
        numColumns={5}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </Drawer>
  );
}

function keyExtractor(item: NewTaskDrawerButtonProps) {
  return item.label;
}

function renderItem({ item }: ListRenderItemInfo<NewTaskDrawerButtonProps>) {
  return <NewTaskDrawerButton {...item} />;
}

interface NewTaskDrawerButtonProps {
  label: string;
  color: Color;
  icon: ReactNode;
  taskType?: TaskType;
  taskLogType?: TaskLogType;
}

function NewTaskDrawerButton({
  color,
  icon,
  label,
  taskType,
  taskLogType,
}: NewTaskDrawerButtonProps) {
  const themedStyles = useNewTaskDrawerThemedStyles();
  const pathname = taskLogType ? "/(tabs)/new-task-log" : "/(tabs)/new-task";

  return (
    <Link
      asChild
      href={{
        pathname,
        params: { taskType, taskLogType },
      }}
    >
      <ActionButton
        label={label}
        color={color}
        buttonStyle={themedStyles.button}
        style={themedStyles.listItem}
      >
        {icon}
      </ActionButton>
    </Link>
  );
}

function useNewTaskDrawerThemedStyles() {
  return useThemedStyles(({ sizes }) => ({
    heading: {
      marginBlockStart: sizes.xs,
      marginBlockEnd: sizes.lg,
    },
    listItem: {
      marginBlockEnd: sizes.xl,
    },
    button: {
      marginInline: sizes.xs * -1,
    },
  }));
}
