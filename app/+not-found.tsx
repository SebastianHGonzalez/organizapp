import React from "react";
import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";

import { Text } from "@/components/common/Text";
import { View } from "@/components/common/View";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View style={styles.container}>
        <Text variant="heading1" accessibilityRole="header">
          This screen doesnt exist.
        </Text>

        <Link href="/(tabs)/events" style={styles.link}>
          <Text variant="body" style={styles.linkText}>
            Go to home screen!
          </Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
