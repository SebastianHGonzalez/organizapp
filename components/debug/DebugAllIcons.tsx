import { StyleSheet } from "react-native";
import { View } from "@/components/common/View";
import { Text } from "@/components/common/Text";
import BrainIcon from "@/assets/svg/brain-icon.svg";
import CalendarIcon from "@/assets/svg/calendar-icon.svg";
import CheckCircleIcon from "@/assets/svg/check-circle-icon.svg";
import CheckIcon from "@/assets/svg/check-icon.svg";
import CopyIcon from "@/assets/svg/copy-icon.svg";
import CrossCircleIcon from "@/assets/svg/cross-circle-icon.svg";
import CrossIcon from "@/assets/svg/cross-icon.svg";
import EventIcon from "@/assets/svg/event-icon.svg";
import ExclamationIcon from "@/assets/svg/exclamation-icon.svg";
import EyeCrossIcon from "@/assets/svg/eye-cross-icon.svg";
import EyeIcon from "@/assets/svg/eye-icon.svg";
import FemaleIcon from "@/assets/svg/female-icon.svg";
import FileIcon from "@/assets/svg/file-icon.svg";
import FinanceIcon from "@/assets/svg/finance-icon.svg";
import FolderIcon from "@/assets/svg/folder-icon.svg";
import GoalIcon from "@/assets/svg/goal-icon.svg";
import HappyFaceIcon from "@/assets/svg/happy-face-icon.svg";
import HorizontalLineIcon from "@/assets/svg/horizontal-line-icon.svg";
import IdeaIcon from "@/assets/svg/idea-icon.svg";
import ImageIcon from "@/assets/svg/image-icon.svg";
import InfoIcon from "@/assets/svg/info-icon.svg";
import InversionArrowsIcon from "@/assets/svg/inversion-arrows-icon.svg";
import LenguaIcon from "@/assets/svg/lengua-icon.svg";
import LinkIcon from "@/assets/svg/link-icon.svg";
import MinusCircleIcon from "@/assets/svg/minus-circle-icon.svg";
import NeutralFaceIcon from "@/assets/svg/neutral-face-icon.svg";
import NextDayIcon from "@/assets/svg/next-day-icon.svg";
import NoteIcon from "@/assets/svg/note-icon.svg";
import OrderIcon from "@/assets/svg/order-icon.svg";
import PauseIcon from "@/assets/svg/pause-icon.svg";
import PenIcon from "@/assets/svg/pen-icon.svg";
import PlusIcon from "@/assets/svg/plus-icon.svg";
import PuzzleIcon from "@/assets/svg/puzzle-icon.svg";
import RedirectIcon from "@/assets/svg/redirect-icon.svg";
import RepetitionIcon from "@/assets/svg/repetition-icon.svg";
import RoutineIcon from "@/assets/svg/routine-icon.svg";
import SadFaceIcon from "@/assets/svg/sad-face-icon.svg";
import SearchIcon from "@/assets/svg/search-icon.svg";
import SortAlphabeticalAscendingIcon from "@/assets/svg/sort-alphabetical-ascending-icon.svg";
import SortAlphabeticalDescendingIcon from "@/assets/svg/sort-alphabetical-descending-icon.svg";
import SortIcon from "@/assets/svg/sort-icon.svg";
import StarIcon from "@/assets/svg/star-icon.svg";
import TickIcon from "@/assets/svg/tick-icon.svg";
import TomatoIcon from "@/assets/svg/tomato-icon.svg";
import TrashIcon from "@/assets/svg/trash-icon.svg";
import VerticalDotsIcon from "@/assets/svg/vertical-dots-icon.svg";
import VeryHappyFaceIcon from "@/assets/svg/very-happy-face-icon.svg";
import PlusOutlineIcon from "@/assets/svg/plus-outline-icon.svg";

export function DebugAllIcons() {
  const color = "red";
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
      <View style={styles.iconContainer}>
        <EyeIcon color={color} width={24} height={24} />
        <Text variant="label">EyeIcon</Text>
      </View>
      <View style={styles.iconContainer}>
        <CalendarIcon color={color} width={24} height={24} />
        <Text variant="label">CalendarIcon</Text>
      </View>
      <View style={styles.iconContainer}>
        <BrainIcon color={color} width={24} height={24} />
        <Text variant="label">BrainIcon</Text>
      </View>
      <View style={styles.iconContainer}>
        <CheckCircleIcon color={color} width={24} height={24} />
        <Text variant="label">CheckCircleIcon</Text>
      </View>
      <View style={styles.iconContainer}>
        <CheckIcon color={color} width={24} height={24} />
        <Text variant="label">CheckIcon</Text>
      </View>
      <View style={styles.iconContainer}>
        <CopyIcon color={color} width={24} height={24} />
        <Text variant="label">CopyIcon</Text>
      </View>
      <View style={styles.iconContainer}>
        <CrossCircleIcon color={color} width={24} height={24} />
        <Text variant="label">CrossCircleIcon</Text>
      </View>
      <View style={styles.iconContainer}>
        <CrossIcon color={color} width={24} height={24} />
        <Text variant="label">CrossIcon</Text>
      </View>
      <View style={styles.iconContainer}>
        <EventIcon color={color} width={24} height={24} />
        <Text variant="label">EventIcon</Text>
      </View>
      <View style={styles.iconContainer}>
        <ExclamationIcon color={color} width={24} height={24} />
        <Text variant="label">ExclamationIcon</Text>
      </View>
      <View style={styles.iconContainer}>
        <EyeCrossIcon color={color} width={24} height={24} />
        <Text variant="label">EyeCrossIcon</Text>
      </View>
      <View style={styles.iconContainer}>
        <FemaleIcon color={color} width={24} height={24} />
        <Text variant="label">FemaleIcon</Text>
      </View>
      <View style={styles.iconContainer}>
        <FileIcon color={color} width={24} height={24} />
        <Text variant="label">FileIcon</Text>
      </View>
      <View style={styles.iconContainer}>
        <FinanceIcon color={color} width={24} height={24} />
        <Text variant="label">FinanceIcon</Text>
      </View>
      <View style={styles.iconContainer}>
        <FolderIcon color={color} width={24} height={24} />
        <Text variant="label">FolderIcon</Text>
      </View>
      <View style={styles.iconContainer}>
        <GoalIcon color={color} width={24} height={24} />
        <Text variant="label">GoalIcon</Text>
      </View>
      <View style={styles.iconContainer}>
        <HappyFaceIcon color={color} width={24} height={24} />
        <Text variant="label">HappyFaceIcon</Text>
      </View>
      <View style={styles.iconContainer}>
        <HorizontalLineIcon color={color} width={24} height={24} />
        <Text variant="label">HorizontalLineIcon</Text>
      </View>
      <View style={styles.iconContainer}>
        <IdeaIcon color={color} width={24} height={24} />
        <Text variant="label">IdeaIcon</Text>
      </View>
      <View style={styles.iconContainer}>
        <ImageIcon color={color} width={24} height={24} />
        <Text variant="label">ImageIcon</Text>
      </View>
      <View style={styles.iconContainer}>
        <InfoIcon color={color} width={24} height={24} />
        <Text variant="label">InfoIcon</Text>
      </View>
      <View style={styles.iconContainer}>
        <InversionArrowsIcon color={color} width={24} height={24} />
        <Text variant="label">InversionArrowsIcon</Text>
      </View>
      <View style={styles.iconContainer}>
        <LenguaIcon color={color} width={24} height={24} />
        <Text variant="label">LenguaIcon</Text>
      </View>
      <View style={styles.iconContainer}>
        <LinkIcon color={color} width={24} height={24} />
        <Text variant="label">LinkIcon</Text>
      </View>
      <View style={styles.iconContainer}>
        <MinusCircleIcon color={color} width={24} height={24} />
        <Text variant="label">MinusCircleIcon</Text>
      </View>
      <View style={styles.iconContainer}>
        <NeutralFaceIcon color={color} width={24} height={24} />
        <Text variant="label">NeutralFaceIcon</Text>
      </View>
      <View style={styles.iconContainer}>
        <NextDayIcon color={color} width={24} height={24} />
        <Text variant="label">NextDayIcon</Text>
      </View>
      <View style={styles.iconContainer}>
        <NoteIcon color={color} width={24} height={24} />
        <Text variant="label">NoteIcon</Text>
      </View>
      <View style={styles.iconContainer}>
        <OrderIcon color={color} width={24} height={24} />
        <Text variant="label">OrderIcon</Text>
      </View>
      <View style={styles.iconContainer}>
        <PauseIcon color={color} width={24} height={24} />
        <Text variant="label">PauseIcon</Text>
      </View>
      <View style={styles.iconContainer}>
        <PenIcon color={color} width={24} height={24} />
        <Text variant="label">PenIcon</Text>
      </View>
      <View style={styles.iconContainer}>
        <PlusIcon color={color} width={24} height={24} />
        <Text variant="label">PlusIcon</Text>
      </View>
      <View style={styles.iconContainer}>
        <PlusOutlineIcon color={color} width={24} height={24} />
        <Text variant="label">PlusOutlineIcon</Text>
      </View>
      <View style={styles.iconContainer}>
        <PuzzleIcon color={color} width={24} height={24} />
        <Text variant="label">PuzzleIcon</Text>
      </View>
      <View style={styles.iconContainer}>
        <RedirectIcon color={color} width={24} height={24} />
        <Text variant="label">RedirectIcon</Text>
      </View>
      <View style={styles.iconContainer}>
        <RepetitionIcon color={color} width={24} height={24} />
        <Text variant="label">RepetitionIcon</Text>
      </View>
      <View style={styles.iconContainer}>
        <RoutineIcon color={color} width={24} height={24} />
        <Text variant="label">RoutineIcon</Text>
      </View>
      <View style={styles.iconContainer}>
        <SadFaceIcon color={color} width={24} height={24} />
        <Text variant="label">SadFaceIcon</Text>
      </View>
      <View style={styles.iconContainer}>
        <SearchIcon color={color} width={24} height={24} />
        <Text variant="label">SearchIcon</Text>
      </View>
      <View style={styles.iconContainer}>
        <SortAlphabeticalAscendingIcon color={color} width={24} height={24} />
        <Text variant="label">SortAlphabeticalAscendingIcon</Text>
      </View>
      <View style={styles.iconContainer}>
        <SortAlphabeticalDescendingIcon color={color} width={24} height={24} />
        <Text variant="label">SortAlphabeticalDescendingIcon</Text>
      </View>
      <View style={styles.iconContainer}>
        <SortIcon color={color} width={24} height={24} />
        <Text variant="label">SortIcon</Text>
      </View>
      <View style={styles.iconContainer}>
        <StarIcon color={color} width={24} height={24} />
        <Text variant="label">StarIcon</Text>
      </View>
      <View style={styles.iconContainer}>
        <TickIcon color={color} width={24} height={24} />
        <Text variant="label">TickIcon</Text>
      </View>
      <View style={styles.iconContainer}>
        <TomatoIcon color={color} width={24} height={24} />
        <Text variant="label">TomatoIcon</Text>
      </View>
      <View style={styles.iconContainer}>
        <TrashIcon color={color} width={24} height={24} />
        <Text variant="label">TrashIcon</Text>
      </View>
      <View style={styles.iconContainer}>
        <VerticalDotsIcon color={color} width={24} height={24} />
        <Text variant="label">VerticalDotsIcon</Text>
      </View>
      <View style={styles.iconContainer}>
        <VeryHappyFaceIcon color={color} width={24} height={24} />
        <Text variant="label">VeryHappyFaceIcon</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: "column",
    alignItems: "center",
    padding: 8,
    margin: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
});
