import { Tabs } from "expo-router";
import React from "react";

import EventIcon from "@/assets/svg/event-icon.svg";
import FinanceIcon from "@/assets/svg/finance-icon.svg";
import GoalIcon from "@/assets/svg/goal-icon.svg";
import RoutineIcon from "@/assets/svg/routine-icon.svg";
import { NewTaskButton } from "@/components/tasks/NewTaskButton";
import {
  NewTaskDrawer,
  useNewTaskDrawer,
} from "@/components/tasks/NewTaskDrawer";
import { useThemeColors } from "@/hooks/theme/useThemedColors";
import { useClientOnlyValue } from "@/hooks/useClientOnlyValue";
import { t } from "@/i18n/t";

export default function TabLayout() {
  const colors = useThemeColors();
  const { close } = useNewTaskDrawer();

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colors.tint,
          tabBarInactiveTintColor: colors.tabIconDefault,
          headerShown: useClientOnlyValue(false, true),
          animation: "shift",
        }}
        screenListeners={{
          tabPress: () => {
            close();
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarLabel: t("tabs.events.label"),
            tabBarIcon: ({ color }) => <EventIcon color={color} />,
          }}
        />
        <Tabs.Screen
          name="goals"
          options={{
            tabBarLabel: t("tabs.goals.label"),
            tabBarIcon: ({ color }) => <GoalIcon color={color} />,
          }}
        />
        <Tabs.Screen
          name="new-task"
          options={{
            title: t("tabs.newTask.label"),
            tabBarLabel: t("tabs.newTask.label"),
            tabBarButton: NewTaskButton,
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
            },
          }}
        />
        <Tabs.Screen
          name="routines"
          options={{
            tabBarLabel: t("tabs.routines.label"),
            tabBarIcon: ({ color }) => <RoutineIcon color={color} />,
          }}
        />
        <Tabs.Screen
          name="finances"
          options={{
            tabBarLabel: t("tabs.finances.label"),
            tabBarIcon: ({ color }) => <FinanceIcon color={color} />,
          }}
        />
      </Tabs>

      <NewTaskDrawer />
    </>
  );
}
