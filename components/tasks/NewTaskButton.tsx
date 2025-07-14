import React, { useState } from "react";

import PlusOutlineIcon from "@/assets/svg/plus-outline-icon.svg";
import { Drawer } from "@/components/common/Drawer";
import { Button } from "@/components/common/Button";

export function NewTaskButton() {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const handleDrawerOptionPress = (option: string) => {
    console.log("Selected option:", option);
    // TODO: Navigate to appropriate screen or open modal based on option
    switch (option) {
      case "event":
        // Navigate to new event screen
        break;
      case "goal":
        // Navigate to new goal screen
        break;
      case "routine":
        // Navigate to new routine screen
        break;
      case "finance":
        // Navigate to new finance screen
        break;
      case "note":
        // Navigate to new note screen
        break;
    }
  };

  return (
    <>
      <Button
        variant="primary"
        onPress={(e) => {
          console.log("pressed");
          setDrawerVisible(true);
        }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          aspectRatio: 1,

          borderTopLeftRadius: 1000,
          borderTopRightRadius: 1000,
          borderBottomLeftRadius: 1000,
          borderBottomRightRadius: 1000,
          paddingVertical: 12,
          paddingHorizontal: 12,
        }}
        icon={<PlusOutlineIcon width={32} height={32} strokeWidth={50} />}
      />

      <Drawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        onOptionPress={handleDrawerOptionPress}
      />
    </>
  );
}
