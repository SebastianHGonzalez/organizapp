import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
  useAnimatedGestureHandler,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import { useThemeColors } from "@/hooks/theme/useThemedColors";
import { useThemeSizes } from "@/hooks/theme/useThemedSize";
import { t } from "@/i18n/t";
import EventIcon from "@/assets/svg/event-icon.svg";
import GoalIcon from "@/assets/svg/goal-icon.svg";
import RoutineIcon from "@/assets/svg/routine-icon.svg";
import FinanceIcon from "@/assets/svg/finance-icon.svg";
import NoteIcon from "@/assets/svg/note-icon.svg";
import CrossIcon from "@/assets/svg/cross-icon.svg";

const { height: screenHeight } = Dimensions.get("window");
const MIN_HEIGHT = screenHeight * 0.4;
const MAX_HEIGHT = screenHeight * 0.95;
const SNAP_POINTS = [MIN_HEIGHT, MAX_HEIGHT];

interface DrawerProps {
  visible: boolean;
  onClose: () => void;
  onOptionPress: (option: string) => void;
}

interface DrawerOption {
  id: string;
  label: string;
  icon: React.ComponentType<{ color: string; width?: number; height?: number }>;
  color: string;
}

const drawerOptions: DrawerOption[] = [
  {
    id: "event",
    label: t("drawer.options.event"),
    icon: EventIcon,
    color: "#FF6B6B",
  },
  {
    id: "goal",
    label: t("drawer.options.goal"),
    icon: GoalIcon,
    color: "#4ECDC4",
  },
  {
    id: "routine",
    label: t("drawer.options.routine"),
    icon: RoutineIcon,
    color: "#45B7D1",
  },
  {
    id: "finance",
    label: t("drawer.options.finance"),
    icon: FinanceIcon,
    color: "#96CEB4",
  },
  {
    id: "note",
    label: t("drawer.options.note"),
    icon: NoteIcon,
    color: "#FFEAA7",
  },
];

export function Drawer({ visible, onClose, onOptionPress }: DrawerProps) {
  const colors = useThemeColors();
  const sizes = useThemeSizes();
  const insets = useSafeAreaInsets();

  // Animation values
  const translateY = useSharedValue(screenHeight);
  const overlayOpacity = useSharedValue(0);
  const expanded = useSharedValue(false);

  // Show/hide effect
  React.useEffect(() => {
    if (visible) {
      translateY.value = withSpring(SNAP_POINTS[0], { damping: 20 });
      overlayOpacity.value = withTiming(1, { duration: 200 });
      expanded.value = false;
    } else {
      translateY.value = withTiming(screenHeight, { duration: 250 });
      overlayOpacity.value = withTiming(0, { duration: 200 });
    }
  }, [visible]);

  // Animated styles
  const animatedDrawerStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));
  const animatedOverlayStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
    pointerEvents: overlayOpacity.value > 0.1 ? "auto" : "none",
  }));

  // Gesture handler
  const panGesture = Gesture.Pan()
    .onStart((event, ctx) => {
      ctx.startY = translateY.value;
    })
    .onUpdate((event, ctx) => {
      const newY = ctx.startY + event.translationY;
      if (!expanded.value) {
        translateY.value = Math.max(
          SNAP_POINTS[0],
          Math.min(newY, screenHeight),
        );
      } else {
        translateY.value = Math.max(
          SNAP_POINTS[1],
          Math.min(newY, screenHeight),
        );
      }
    })
    .onEnd((event, ctx) => {
      const { translationY, velocityY } = event;
      let toValue = SNAP_POINTS[0];
      if (!expanded.value) {
        if (translationY > 80 || velocityY > 800) {
          // Close
          toValue = screenHeight;
          overlayOpacity.value = withTiming(0, { duration: 200 });
          translateY.value = withTiming(
            screenHeight,
            { duration: 250 },
            (finished) => {
              if (finished) runOnJS(onClose)();
            },
          );
          return;
        } else if (translationY < -80 || velocityY < -800) {
          // Expand
          toValue = SNAP_POINTS[1];
          expanded.value = true;
        }
      } else {
        if (translationY > 80 || velocityY > 800) {
          // Collapse
          toValue = SNAP_POINTS[0];
          expanded.value = false;
        }
      }
      translateY.value = withSpring(toValue, { damping: 20 });
    });

  if (!visible) return null;

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={StyleSheet.absoluteFill}>
        <Animated.View
          style={[styles.overlay, animatedOverlayStyle]}
          onTouchEnd={onClose}
        />
        <Animated.View
          style={[
            styles.drawer,
            {
              backgroundColor: colors.containerBackground,
              paddingBottom: insets.bottom + sizes.md,
              minHeight: MIN_HEIGHT,
              maxHeight: MAX_HEIGHT,
            },
            animatedDrawerStyle,
          ]}
        >
          <View style={styles.handleContainer}>
            <View style={[styles.handle, { backgroundColor: colors.border }]} />
          </View>
          <View style={styles.header}>
            <Text
              style={[
                styles.title,
                {
                  color: colors.text,
                  fontSize: sizes.lg,
                  fontWeight: "600",
                },
              ]}
            >
              {t("drawer.title")}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <CrossIcon color={colors.text} width={24} height={24} />
            </TouchableOpacity>
          </View>
          <View style={styles.optionsGrid}>
            {drawerOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={styles.optionItem}
                onPress={() => {
                  onOptionPress(option.id);
                  onClose();
                }}
              >
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: option.color },
                  ]}
                >
                  <option.icon color="#fff" width={32} height={32} />
                </View>
                <Text
                  style={[
                    styles.optionLabel,
                    {
                      color: colors.text,
                      fontSize: sizes.sm,
                      marginTop: sizes.xs,
                    },
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  drawer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: screenHeight * 0.4,
    maxHeight: screenHeight * 0.7,
  },
  handleContainer: {
    alignItems: "center",
    paddingVertical: 12,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontWeight: "600",
  },
  closeButton: {
    padding: 4,
  },
  optionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    gap: 20,
  },
  optionItem: {
    alignItems: "center",
    width: "30%",
    minWidth: 100,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  optionLabel: {
    textAlign: "center",
    fontWeight: "500",
  },
});
