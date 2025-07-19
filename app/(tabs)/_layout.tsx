import React from "react";
import { Tabs } from "expo-router";

import { useClientOnlyValue } from "@/hooks/useClientOnlyValue";
import { t } from "@/i18n/t";
import RoutineIcon from "@/assets/svg/routine-icon.svg";
import GoalIcon from "@/assets/svg/goal-icon.svg";
import EventIcon from "@/assets/svg/event-icon.svg";
import FinanceIcon from "@/assets/svg/finance-icon.svg";
import { useThemeColors } from "@/hooks/theme/useThemedColors";
import { NewTaskButton } from "@/components/tasks/NewTaskButton";

export default function TabLayout() {
  const colors = useThemeColors();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tint,
        tabBarInactiveTintColor: colors.tabIconDefault,
        headerShown: useClientOnlyValue(false, true),
        animation: "shift",
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
          title: t("tabs.new.label"),
          tabBarLabel: t("tabs.new.label"),
          tabBarButton: NewTaskButton,
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            console.log("tabPress");
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
  );
}
