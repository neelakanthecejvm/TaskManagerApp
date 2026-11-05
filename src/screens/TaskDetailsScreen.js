
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';

import { useApp } from '../context/AppContext';

export default function TaskDetailsScreen({ navigation, route }) {
  const { deleteTask, updateTask } = useApp();
  const task = route.params?.task;

  if (!task) {
    return (
      <View style={styles.container}>
        <Text>Task details not available.</Text>
      </View>
    );
  }

  const handleDelete = () => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteTask(task.id);
            navigation.goBack();
          },
        },
      ]
    );
  };

  const changeStatus = async (newStatus) => {
    await updateTask({
      ...task,
      status: newStatus,
    });

    Alert.alert('Success', 'Task status updated');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Task Details</Text>

      <View style={styles.card}>
        <Text style={styles.title}>{task.title}</Text>

        <Text style={styles.label}>Description</Text>
        <Text style={styles.value}>{task.description || 'No description'}</Text>

        <Text style={styles.label}>Priority</Text>
        <Text style={styles.value}>{task.priority}</Text>

        <Text style={styles.label}>Status</Text>
        <Text style={styles.value}>{task.status}</Text>

        <Text style={styles.label}>Due Date</Text>
        <Text style={styles.value}>{task.dueDate}</Text>
      </View>

      <Text style={styles.label}>Change Status</Text>

      {['Pending', 'In Progress', 'Completed'].map(status => (
        <TouchableOpacity
          key={status}
          style={styles.statusButton}
          onPress={() => changeStatus(status)}
        >
          <Text style={styles.statusText}>{status}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('AddEditTask', { task })}
      >
        <Text style={styles.buttonText}>Edit Task</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.buttonText}>Delete Task</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F6FC', padding: 20 },
  heading: { fontSize: 25, fontWeight: 'bold', marginBottom: 20 },
  card: { backgroundColor: 'white', padding: 20, borderRadius: 12 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  label: { fontSize: 14, color: '#64748B', marginTop: 15 },
  value: { fontSize: 17, color: '#1E293B', marginTop: 5 },
  statusButton: {
    backgroundColor: '#E0E7FF',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  statusText: { color: '#3730A3', textAlign: 'center', fontWeight: '600' },
  editButton: {
    backgroundColor: '#4F46E5',
    padding: 15,
    borderRadius: 10,
    marginTop: 25,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#DC2626',
    padding: 15,
    borderRadius: 10,
    marginTop: 12,
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontWeight: 'bold' },
  backButton: { padding: 15, alignItems: 'center' },
  backText: { color: '#4F46E5', fontWeight: 'bold' },
});
