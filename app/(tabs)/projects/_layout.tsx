import { Link, Stack } from "expo-router";
import React from "react";
import { t } from "@/i18n/t";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Pressable } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";

export default function ProjectsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: t("projects.index.title"),
          headerRight: () => (
            <Link href="/projects/new" asChild>
              <Pressable style={styles.button}>
                <FontAwesome name="plus" size={24} color="black" />
              </Pressable>
            </Link>
          ),
        }}
      />
      <Stack.Screen name="new" options={{ title: t("projects.new.title") }} />
    </Stack>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
  },
});
