import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from "react-native";

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export default function HomeScreen() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  // Add a new task
  const addTask = () => {
    if (task.trim() === "") {
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: task.trim(),
      completed: false,
    };

    setTasks((currentTasks) => [...currentTasks, newTask]);
    setTask("");
  };

  // Mark task as completed
  const toggleTask = (id: string) => {
    setTasks((currentTasks) =>
      currentTasks.map((item) =>
        item.id === id
          ? {
              ...item,
              completed: !item.completed,
            }
          : item
      )
    );
  };

  // Delete task
  const deleteTask = (id: string) => {
    setTasks((currentTasks) =>
      currentTasks.filter((item) => item.id !== id)
    );
  };

  // Display each task
  const renderTask = ({ item }: { item: Task }) => {
    return (
      <View style={styles.taskContainer}>

        {/* Task */}
        <TouchableOpacity
          style={styles.taskButton}
          onPress={() => toggleTask(item.id)}
        >
          <View
            style={[
              styles.checkbox,
              item.completed && styles.checkboxCompleted,
            ]}
          >
            {item.completed && (
              <Text style={styles.checkmark}>✓</Text>
            )}
          </View>

          <Text
            style={[
              styles.taskText,
              item.completed && styles.completedText,
            ]}
          >
            {item.title}
          </Text>
        </TouchableOpacity>

        {/* Delete */}
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteTask(item.id)}
        >
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>

      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.heart}>♡</Text>

          <Text style={styles.title}>
            My To-Do List
          </Text>

          <Text style={styles.subtitle}>
            Organize your tasks with love
          </Text>
        </View>

        {/* Input */}
        <View style={styles.inputContainer}>

          <TextInput
            style={styles.input}
            placeholder="Enter a new task..."
            placeholderTextColor="#b88b9b"
            value={task}
            onChangeText={setTask}
            onSubmitEditing={addTask}
            returnKeyType="done"
          />

          <TouchableOpacity
            style={styles.addButton}
            onPress={addTask}
          >
            <Text style={styles.addButtonText}>
              + Add
            </Text>
          </TouchableOpacity>

        </View>

        {/* Task Counter */}
        <View style={styles.counterBox}>
          <Text style={styles.taskCount}>
            ♡ Total Tasks: {tasks.length}
          </Text>
        </View>

        {/* Task List */}
        <FlatList
          data={tasks}
          renderItem={renderTask}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>

              <Text style={styles.emptyHeart}>
                ♡
              </Text>

              <Text style={styles.emptyTitle}>
                No tasks yet
              </Text>

              <Text style={styles.emptyText}>
                Add your first task above.
              </Text>

            </View>
          }
        />

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF5F8",
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 25,
  },

  header: {
    alignItems: "center",
    marginBottom: 25,
  },

  heart: {
    fontSize: 42,
    color: "#E88AA5",
    marginBottom: 5,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#8E4A61",
  },

  subtitle: {
    fontSize: 15,
    color: "#B77C91",
    marginTop: 5,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  input: {
    flex: 1,
    height: 52,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#F0B6C8",
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#6F3A4C",
  },

  addButton: {
    height: 52,
    backgroundColor: "#E88AA5",
    paddingHorizontal: 18,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginLeft: 10,
  },

  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  counterBox: {
    backgroundColor: "#FCE3E9",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#F5C7D4",
  },

  taskCount: {
    fontSize: 15,
    fontWeight: "600",
    color: "#98566D",
  },

  list: {
    paddingBottom: 30,
  },

  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#F3D1DB",
  },

  taskButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: "#E88AA5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  checkboxCompleted: {
    backgroundColor: "#E88AA5",
  },

  checkmark: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  taskText: {
    flex: 1,
    fontSize: 16,
    color: "#6F3A4C",
  },

  completedText: {
    textDecorationLine: "line-through",
    color: "#B9A0AA",
  },

  deleteButton: {
    backgroundColor: "#D97B91",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 10,
  },

  deleteText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 13,
  },

  emptyContainer: {
    alignItems: "center",
    marginTop: 60,
    backgroundColor: "#FFFFFF",
    padding: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#F3D1DB",
  },

  emptyHeart: {
    fontSize: 40,
    color: "#E88AA5",
    marginBottom: 8,
  },

  emptyTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#8E4A61",
  },

  emptyText: {
    fontSize: 14,
    color: "#B77C91",
    marginTop: 5,
  },
});