import React from "react";
import { Tabs } from "expo-router";
import { View } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { t } from "@/i18n/t";
import RoutineIcon from "@/assets/svg/routine-icon.svg";
import GoalIcon from "@/assets/svg/goal-icon.svg";
import EventIcon from "@/assets/svg/event-icon.svg";
import FinanceIcon from "@/assets/svg/finance-icon.svg";
import PlusOutlineIcon from "@/assets/svg/plus-outline-icon.svg";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      initialRouteName="events"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="events"
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
          tabBarLabel: "",
          tabBarIcon: ({ focused, color }) => (
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                aspectRatio: 1,
                backgroundColor: "#A259FF",
                marginBottom: 25,
                borderRadius: 1000,
                padding: 20,
              }}
            >
              <PlusOutlineIcon
                width={56}
                height={56}
                color="#fff"
                strokeWidth={50}
              />
            </View>
          ),
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
