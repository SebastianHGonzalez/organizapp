import { useState } from "react";
import { View } from "@/components/common/View";
import { Text } from "@/components/common/Text";
import { TextInput } from "@/components/common/TextInput";
import { Button } from "@/components/common/Button";

import { t } from "@/i18n/t";
import { Task } from "@/model/Task";
import { RootView } from "@/components/common/RootView";

export default function NewTask() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [priority, setPriority] = useState<Task["priority"]>();
  const [daysOfWeek, setDaysOfWeek] = useState<Task["daysOfWeek"]>([
    0, 1, 2, 3, 4, 5, 6,
  ]);
  const [timesOfDay, setTimesOfDay] = useState<Task["timesOfDay"]>([]);
  const [daysOfMonth, setDaysOfMonth] = useState<Task["daysOfMonth"]>([]);
  const [monthsOfYear, setMonthsOfYear] = useState<Task["monthsOfYear"]>([]);
  const [tags, setTags] = useState<Task["tags"]>([]);

  const handleCreateTask = async () => {
    // await createTaskMutation.mutateAsync({
    //   id: crypto.randomUUID() as Task["id"],
    //   name,
    //   description,
    //   startDate: startDate ? new Date(startDate) : undefined,
    //   endDate: endDate ? new Date(endDate) : undefined,
    //   priority,
    //   taskType: "task",
    //   status: "active",
    //   daysOfWeek,
    //   createdAt: new Date(),
    //   timesOfDay,
    //   daysOfMonth,
    //   monthsOfYear,
    //   tags,
    //   updatedAt: new Date(),
    // });
  };

  return (
    <RootView>
      <Text variant="heading1" accessibilityRole="header">
        {t("newTask.title")}
      </Text>

      <View style={{ gap: 12 }}>
        <Text variant="label">{t("newTask.name.label")}</Text>
        <TextInput
          placeholder={t("newTask.name.placeholder")}
          value={name}
          onChangeText={setName}
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 6,
            padding: 8,
            marginBottom: 8,
          }}
        />
        <Text variant="label">{t("newTask.description.label")}</Text>
        <TextInput
          placeholder={t("newTask.description.placeholder")}
          value={description}
          onChangeText={setDescription}
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 6,
            padding: 8,
            marginBottom: 8,
          }}
          multiline
        />
        <Text variant="label">{t("newTask.startDate.label")}</Text>
        <TextInput
          placeholder={t("newTask.startDate.placeholder")}
          value={startDate}
          onChangeText={setStartDate}
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 6,
            padding: 8,
            marginBottom: 8,
          }}
        />
        <Text variant="label">{t("newTask.endDate.label")}</Text>
        <TextInput
          placeholder={t("newTask.endDate.placeholder")}
          value={endDate}
          onChangeText={setEndDate}
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 6,
            padding: 8,
            marginBottom: 8,
          }}
        />

        {/* Days of Week Picker */}
        <Text variant="label">{t("newTask.daysOfWeek.label")}</Text>
        <View
          style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 8 }}
        >
          {["0", "1", "2", "3", "4", "5", "6"].map((day) => (
            <View
              key={day}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: 12,
                marginBottom: 4,
              }}
            >
              <Button
                title={t(`newTask.daysOfWeek.${day}`)}
                onPress={() => {
                  setDaysOfWeek((prev: number[] = []) =>
                    prev.includes(Number(day))
                      ? prev.filter((d) => d !== Number(day))
                      : [...prev, Number(day)],
                  );
                }}
              />
            </View>
          ))}
        </View>

        <Text variant="label">{t("newTask.priority.label")}</Text>

        <Button
          title={t("newTask.create.label")}
          onPress={handleCreateTask}
          disabled={createTaskMutation.isPending}
        />
      </View>
    </RootView>
  );
}
