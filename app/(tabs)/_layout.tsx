import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { t } from "@/i18n/t";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

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
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="calendar" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="goals"
        options={{
          tabBarLabel: t("tabs.goals.label"),
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="flag-checkered" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="new-task"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused, color }) => (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                aspectRatio: 1,
                backgroundColor: "#A259FF",
                marginBottom: 25,
                borderRadius: 1000,
                padding: 10,
              }}
            >
              <FontAwesome name="plus" size={56} color="#fff" />
            </div>
          ),
        }}
      />
      <Tabs.Screen
        name="routines"
        options={{
          tabBarLabel: t("tabs.routines.label"),
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="bullseye" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="finances"
        options={{
          tabBarLabel: t("tabs.finances.label"),
          tabBarIcon: ({ color }) => <TabBarIcon name="dollar" color={color} />,
        }}
      />
    </Tabs>
  );
}
