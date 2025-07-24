import React, { ReactNode, useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useThemeColors } from "@/hooks/theme/useThemedColors";
import { useThemeSizes } from "@/hooks/theme/useThemedSize";

interface DrawerProps {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
}

export function Drawer({ isOpen, onClose, children }: DrawerProps) {
  const insets = useSafeAreaInsets();
  const colors = useThemeColors();
  const sizes = useThemeSizes();

  const screenHeight = Dimensions.get("window").height;
  const drawerHeight = screenHeight * 0.6; // Drawer covers 60% of screen

  // Animated value for translateY
  const translateY = useSharedValue(drawerHeight);

  // Internal state to keep the drawer mounted during close animation
  const [isMounted, setIsMounted] = useState(isOpen);

  // Animate drawer in/out when visible changes
  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      // Use withTiming for a fast, non-bouncy open animation
      translateY.value = withTiming(0, { duration: 120 });
    } else if (isMounted) {
      // Animate out, then unmount after animation
      translateY.value = withTiming(
        drawerHeight,
        { duration: 250 },
        (finished) => {
          if (finished) runOnJS(setIsMounted)(false);
        },
      );
    }
  }, [isOpen, drawerHeight, translateY]);

  // Animated style for the drawer
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  // Animated style for the overlay opacity
  const animatedOverlayStyle = useAnimatedStyle(() => {
    const progress =
      1 - Math.min(Math.max(translateY.value / drawerHeight, 0), 1);
    return { opacity: progress * 0.3 };
  });

  // Pan gesture for dragging down to close
  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (e.translationY > 0) {
        translateY.value = e.translationY;
      }
    })
    .onEnd((e) => {
      if (e.translationY > drawerHeight * 0.25 || e.velocityY > 800) {
        // If dragged down enough or with enough velocity, close
        translateY.value = withTiming(
          drawerHeight,
          { duration: 200 },
          (finished) => {
            if (finished) runOnJS(onClose)();
          },
        );
      } else {
        // Otherwise, snap back up (non-bouncy)
        translateY.value = withTiming(0, { duration: 120 });
      }
    });

  // Handle overlay press: animate out, then call onClose
  const handleOverlayPress = () => {
    translateY.value = withTiming(
      drawerHeight,
      { duration: 200 },
      (finished) => {
        if (finished) runOnJS(onClose)();
      },
    );
  };

  if (!isMounted) return null;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      {/* Overlay */}
      <TouchableWithoutFeedback onPress={handleOverlayPress}>
        <Animated.View
          style={[
            styles.overlay,
            { backgroundColor: colors.overlayBackground },
            animatedOverlayStyle,
          ]}
          pointerEvents="auto"
        />
      </TouchableWithoutFeedback>

      {/* Drawer */}
      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={[
            styles.drawer,
            animatedStyle,
            {
              height: drawerHeight,
              backgroundColor: colors.containerBackground,
              borderTopLeftRadius: sizes.md * 2,
              borderTopRightRadius: sizes.md * 2,
              paddingBottom: insets.bottom + sizes.md * 2,
              elevation: 7,
            },
          ]}
        >
          <DragHandle />
          {children}
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

function DragHandle() {
  const colors = useThemeColors();

  return (
    <View style={styles.handleContainer}>
      <View style={[styles.handle, { backgroundColor: colors.zinc }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  drawer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
    paddingTop: 12,
    paddingHorizontal: 20,
    // height is set dynamically
  },
  handleContainer: {
    alignItems: "center",
    marginBottom: 12,
  },
  handle: {
    width: 100,
    height: 5,
    borderRadius: 3,
    marginBottom: 4,
    opacity: 0.3,
  },
});
