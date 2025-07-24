import React from "react";
import { StyleSheet } from "react-native";

import PlusOutlineIcon from "@/assets/svg/plus-outline-icon.svg";
import { Button } from "@/components/common/Button";
import { useNewTaskDrawer } from "./NewTaskDrawer";

export function NewTaskButton() {
  const { open } = useNewTaskDrawer();

  return (
    <Button
      variant="primary"
      onPress={open}
      style={styles.button}
      icon={<PlusOutlineIcon width={32} height={32} strokeWidth={50} />}
    />
  );
}

const styles = StyleSheet.create({
  button: {},
});
