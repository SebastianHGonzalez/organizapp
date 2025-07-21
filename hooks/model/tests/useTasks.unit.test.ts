import { act, renderHook } from "@testing-library/react-native";
import { useTasks } from "../useTasks";
import type { Task } from "../../../model/Task";
import { storeResetFns } from "../../../__mocks__/zustand";

describe(useTasks, () => {
  beforeEach(() => {
    // Reset zustand stores to avoid state leakage between tests
    storeResetFns.forEach((resetFn) => resetFn());
  });

  it("should return a list of tasks", () => {
    const screen = renderHook(useTasks);
    expect(screen.result.current.tasks).toHaveLength(0);
  });

  it("should create a task with only required fields", () => {
    const screen = renderHook(useTasks);
    act(() => {
      const result = screen.result.current.createTask({ name: "myTask" });
      expect(result.success).toBe(true);
      expect(result.data!.name).toBe("myTask");
    });
    expect(screen.result.current.tasks).toHaveLength(1);
    expect(screen.result.current.tasks[0].name).toBe("myTask");
  });

  it("should create a task with all fields", () => {
    const screen = renderHook(useTasks);
    const now = new Date();
    act(() => {
      const result = screen.result.current.createTask({
        name: "fullTask",
        description: "desc",
        priority: "high",
        startDate: now,
        endDate: now,
      });
      expect(result.success).toBe(true);
      expect(result.data!.name).toBe("fullTask");
      expect(result.data!.description).toBe("desc");
      expect(result.data!.priority).toBe("high");
      expect(result.data!.startDate).toEqual(now);
      expect(result.data!.endDate).toEqual(now);
    });
    expect(screen.result.current.tasks).toHaveLength(1);
  });

  it("should not create a task with invalid data", () => {
    const screen = renderHook(useTasks);
    act(() => {
      // @ts-expect-error: missing name
      const result = screen.result.current.createTask({});
      expect(result.success).toBe(false);
      expect(result.error!.type).toBe("ValidationError");
    });
    expect(screen.result.current.tasks).toHaveLength(0);
  });

  it("should update an existing task", () => {
    const screen = renderHook(useTasks);
    let id: Task["id"];
    act(() => {
      const createResult = screen.result.current.createTask({
        name: "toUpdate",
      });
      id = createResult.success ? createResult.data.id : ("" as Task["id"]);
    });
    act(() => {
      const updateResult = screen.result.current.updateTask({
        id,
        name: "updated",
      });
      expect(updateResult.success).toBe(true);
      expect(updateResult.data!.name).toBe("updated");
    });
    expect(screen.result.current.tasks[0].name).toBe("updated");
  });

  it("should not update a non-existent task", () => {
    const screen = renderHook(useTasks);
    act(() => {
      const result = screen.result.current.updateTask({
        id: "bb679230-9ee8-4e7d-a08e-999999999999" as Task["id"],
        name: "fail",
      });
      expect(result.success).toBe(false);
      expect(result.error!.type).toBe("NotFoundError");
    });
  });

  it("should not update with invalid data", () => {
    const screen = renderHook(useTasks);
    let id: Task["id"];
    act(() => {
      const createResult = screen.result.current.createTask({
        name: "toUpdate",
      });
      id = createResult.success ? createResult.data.id : ("" as Task["id"]);
    });
    act(() => {
      // purposely using an invalid priority
      const result = screen.result.current.updateTask({
        id,
        priority: "invalid" as any,
      });
      expect(result.success).toBe(false);
      expect(result.error!.type).toBe("ValidationError");
    });
  });

  it("should delete an existing task", () => {
    const screen = renderHook(useTasks);
    let id: Task["id"];
    act(() => {
      const createResult = screen.result.current.createTask({
        name: "toDelete",
      });
      id = createResult.success ? createResult.data.id : ("" as Task["id"]);
    });
    act(() => {
      const deleteResult = screen.result.current.deleteTask({ id });
      expect(deleteResult.success).toBe(true);
    });
    expect(screen.result.current.tasks).toHaveLength(0);
  });

  it("should not delete a non-existent task", () => {
    const screen = renderHook(useTasks);
    act(() => {
      const result = screen.result.current.deleteTask({
        id: "bb679230-9ee8-4e7d-a08e-999999999999" as Task["id"],
      });
      expect(result.success).toBe(false);
      expect(result.error!.type).toBe("NotFoundError");
    });
  });

  it("should not delete with invalid id format", () => {
    const screen = renderHook(useTasks);
    act(() => {
      const result = screen.result.current.deleteTask({
        id: "not-a-uuid" as Task["id"],
      });

      expect(result.success).toBe(false);
      expect(result.error!.type).toBe("ValidationError");
    });
  });

  it("should mark a task as completed, skipped, and not_completed", () => {
    const screen = renderHook(useTasks);
    let id: Task["id"];
    act(() => {
      const createResult = screen.result.current.createTask({ name: "toMark" });
      id = createResult.success ? createResult.data.id : ("" as Task["id"]);
    });
    ["completed", "skipped", "not_completed"].forEach((status) => {
      expect(() => {
        act(() => {
          screen.result.current.markTask({ id, status: status as any });
        });
      }).toThrow(/InvariantError/);
    });
  });

  it("should not mark a non-existent task", () => {
    const screen = renderHook(useTasks);

    act(() => {
      const result = screen.result.current.markTask({
        id: "bb679230-9ee8-4e7d-a08e-999999999999" as Task["id"],
        status: "completed",
      });

      expect(result.success).toBe(false);
      expect(result.error!.type).toEqual("NotFoundError");
    });
  });

  it("should not mark with invalid status", () => {
    const screen = renderHook(useTasks);
    let id: Task["id"];
    act(() => {
      const createResult = screen.result.current.createTask({ name: "toMark" });
      id = createResult.success ? createResult.data.id : ("" as Task["id"]);
    });
    act(() => {
      const result = screen.result.current.markTask({
        id,
        status: "invalid" as any,
      });

      expect(result.success).toBe(false);
      expect(result.error!.type).toBe("ValidationError");
    });
  });

  it("should handle multiple tasks and preserve all", () => {
    const screen = renderHook(useTasks);
    act(() => {
      screen.result.current.createTask({ name: "task1" });
      screen.result.current.createTask({ name: "task2" });
      screen.result.current.createTask({ name: "task3" });
    });
    expect(screen.result.current.tasks).toHaveLength(3);
    expect(screen.result.current.tasks.map((t) => t.name)).toEqual([
      "task1",
      "task2",
      "task3",
    ]);
  });

  it("should update and delete tasks in sequence", () => {
    const screen = renderHook(useTasks);
    let id1: Task["id"];
    let id2: Task["id"];
    act(() => {
      const res1 = screen.result.current.createTask({ name: "first" });
      const res2 = screen.result.current.createTask({ name: "second" });
      id1 = res1.success ? res1.data.id : ("" as Task["id"]);
      id2 = res2.success ? res2.data.id : ("" as Task["id"]);
    });
    act(() => {
      screen.result.current.updateTask({ id: id1, name: "first-updated" });
      screen.result.current.deleteTask({ id: id2 });
    });
    expect(screen.result.current.tasks).toHaveLength(1);
    expect(screen.result.current.tasks[0].name).toBe("first-updated");
  });

  it("should create a task with schedule fields", () => {
    const screen = renderHook(useTasks);
    const now = new Date();
    act(() => {
      const result = screen.result.current.createTask({
        name: "scheduled",
        startDate: now,
        endDate: now,
      });
      expect(result.success).toBe(true);
      expect(result.data!.startDate).toEqual(now);
      expect(result.data!.endDate).toEqual(now);
    });
  });

  it("should create and update tags", () => {
    const screen = renderHook(useTasks);
    let id: Task["id"];
    act(() => {
      const res = screen.result.current.createTask({ name: "tagged" });
      id = res.success ? res.data.id : ("" as Task["id"]);
    });
    act(() => {
      const updateResult = screen.result.current.updateTask({
        id,
        tags: ["work", "urgent"],
      });
      expect(updateResult.error).toBeFalsy();
      expect(updateResult.success).toBe(true);
      expect(updateResult.data!.tags).toEqual(["work", "urgent"]);
    });
  });

  it("should set and update timestamps", () => {
    const screen = renderHook(useTasks);
    let id: Task["id"];
    let createdAt: Date = new Date();
    act(() => {
      const result = screen.result.current.createTask({ name: "timed" });
      id = result.data!.id;
      createdAt = result.data!.createdAt;
    });
    act(() => {
      const updateResult = screen.result.current.updateTask({
        id,
        name: "timed-updated",
      });
      expect(updateResult.error).toBeFalsy();
      expect(updateResult.success).toBe(true);
      expect(updateResult.data!.updatedAt.getTime()).toBeGreaterThanOrEqual(
        createdAt.getTime()
      );
    });
  });
});
