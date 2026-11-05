
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';

import { useApp } from '../context/AppContext';

export default function AddEditTaskScreen({ navigation, route }) {
  const { addTask, updateTask } = useApp();

  const existingTask = route.params?.task;

  const [title, setTitle] = useState(existingTask?.title || '');
  const [description, setDescription] = useState(existingTask?.description || '');
  const [priority, setPriority] = useState(existingTask?.priority || 'Medium');
  const [status, setStatus] = useState(existingTask?.status || 'Pending');
  const [dueDate, setDueDate] = useState(existingTask?.dueDate || '');

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter task title');
      return;
    }

    if (!dueDate.trim()) {
      Alert.alert('Error', 'Please enter due date');
      return;
    }

    const task = {
      id: existingTask?.id || Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      priority,
      status,
      dueDate,
      createdAt: existingTask?.createdAt || new Date().toISOString(),
    };

    try {
      if (existingTask) {
        await updateTask(task);
      } else {
        await addTask(task);
      }

      Alert.alert(
        'Success',
        existingTask ? 'Task updated successfully' : 'Task added successfully'
      );

      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Unable to save task');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>
        {existingTask ? 'Edit Task' : 'Create New Task'}
      </Text>

      <Text style={styles.label}>Task Title *</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter task title"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.description]}
        placeholder="Enter description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Priority</Text>
      <View style={styles.options}>
        {['Low', 'Medium', 'High'].map(item => (
          <TouchableOpacity
            key={item}
            style={[styles.option, priority === item && styles.selected]}
            onPress={() => setPriority(item)}
          >
            <Text style={styles.optionText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Status</Text>
      <View style={styles.options}>
        {['Pending', 'In Progress', 'Completed'].map(item => (
          <TouchableOpacity
            key={item}
            style={[styles.option, status === item && styles.selected]}
            onPress={() => setStatus(item)}
          >
            <Text style={styles.optionText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Due Date (YYYY-MM-DD)</Text>
      <TextInput
        style={styles.input}
        placeholder="2026-11-10"
        value={dueDate}
        onChangeText={setDueDate}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>
          {existingTask ? 'Update Task' : 'Save Task'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F6FC', padding: 20 },
  heading: { fontSize: 25, fontWeight: 'bold', marginBottom: 25 },
  label: { fontSize: 15, fontWeight: '600', marginBottom: 8, marginTop: 12 },
  input: {
    backgroundColor: 'white',
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  description: { height: 100, textAlignVertical: 'top' },
  options: { flexDirection: 'row', flexWrap: 'wrap' },
  option: {
    backgroundColor: '#E2E8F0',
    padding: 12,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 5,
  },
  selected: { backgroundColor: '#4F46E5' },
  optionText: { color: '#1E293B' },
  saveButton: {
    backgroundColor: '#4F46E5',
    padding: 16,
    borderRadius: 10,
    marginTop: 30,
    alignItems: 'center',
  },
  saveText: { color: 'white', fontWeight: 'bold' },
  cancelButton: { padding: 15, alignItems: 'center' },
  cancelText: { color: '#64748B' },
});
