import { FlashList } from "@shopify/flash-list";
import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

import EventIcon from "@/assets/svg/event-icon.svg";
import FinanceIcon from "@/assets/svg/finance-icon.svg";
import GoalIcon from "@/assets/svg/goal-icon.svg";
import NoteIcon from "@/assets/svg/note-icon.svg";
import RoutineIcon from "@/assets/svg/routine-icon.svg";
import { ActionButton } from "@/components/common/ActionButton";
import { Drawer } from "@/components/common/Drawer";
import { Text } from "@/components/common/Text";

interface NewTaskDrawerStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const newTaskDrawerStoreCreator: StateCreator<NewTaskDrawerStore> = (
  set,
  get,
) => ({
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
  const { isOpen, close } = useNewTaskDrawer();

  return (
    <Drawer onClose={close} isOpen={isOpen}>
      <Text variant="body">NewTaskDrawer</Text>

      <FlashList
        data={
          [
            {
              label: "Event",
              color: "lavenderMagentaLight",
              icon: <EventIcon width={24} height={24} />,
            },
            {
              label: "Goal",
              color: "bittersweetLight",
              icon: <GoalIcon width={24} height={24} />,
            },
            {
              label: "Routine",
              color: "seagullLight",
              icon: <RoutineIcon width={24} height={24} />,
            },
            {
              label: "Expense",
              color: "malachiteLight",
              icon: <FinanceIcon width={24} height={24} />,
            },
            {
              label: "Income",
              color: "ripeLemonLight",
              icon: <FinanceIcon width={24} height={24} />,
            },
            {
              label: "Note",
              color: "zincLight",
              icon: <NoteIcon width={24} height={24} />,
            },
          ] as const
        }
        numColumns={5}
        renderItem={({ item }) => (
          <ActionButton
            key={item.label}
            label={item.label}
            onPress={() => {}}
            color={item.color}
            style={{ margin: 15 }}
          >
            {item.icon}
          </ActionButton>
        )}
      />
    </Drawer>
  );
}
