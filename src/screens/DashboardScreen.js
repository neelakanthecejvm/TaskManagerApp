
import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { useApp } from '../context/AppContext';

export default function DashboardScreen({ navigation }) {
  const { tasks } = useApp();

  const statistics = useMemo(() => {
    return {
      total: tasks.length,
      pending: tasks.filter(task => task.status === 'Pending').length,
      completed: tasks.filter(task => task.status === 'Completed').length,
    };
  }, [tasks]);

  const recentTasks = tasks.slice(0, 3);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Hello, Welcome! 👋</Text>
      <Text style={styles.subtitle}>Manage your daily tasks</Text>

      <View style={styles.cards}>
        <View style={styles.card}>
          <Text style={styles.number}>{statistics.total}</Text>
          <Text>Total Tasks</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.number}>{statistics.pending}</Text>
          <Text>Pending</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.number}>{statistics.completed}</Text>
          <Text>Completed</Text>
        </View>
      </View>

      <Text style={styles.section}>Recent Tasks</Text>

      {recentTasks.length === 0 ? (
        <Text style={styles.empty}>No tasks available yet.</Text>
      ) : (
        recentTasks.map(task => (
          <TouchableOpacity
            key={task.id}
            style={styles.taskCard}
            onPress={() => navigation.navigate('TaskDetails', { task })}
          >
            <Text style={styles.taskTitle}>{task.title}</Text>
            <Text style={styles.taskStatus}>{task.status}</Text>
            <Text style={styles.taskDate}>Due: {task.dueDate}</Text>
          </TouchableOpacity>
        ))
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AddEditTask')}
      >
        <Text style={styles.buttonText}>+ Create New Task</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F6FC', padding: 20 },
  heading: { fontSize: 26, fontWeight: 'bold', color: '#1E293B', marginTop: 20 },
  subtitle: { color: '#64748B', marginTop: 8, marginBottom: 25 },
  cards: { flexDirection: 'row', justifyContent: 'space-between' },
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    width: '31%',
  },
  number: { fontSize: 25, fontWeight: 'bold', color: '#4F46E5', marginBottom: 8 },
  section: { fontSize: 20, fontWeight: 'bold', marginTop: 30, marginBottom: 12 },
  empty: { color: '#64748B', marginTop: 20, textAlign: 'center' },
  taskCard: { backgroundColor: 'white', padding: 15, borderRadius: 10, marginBottom: 10 },
  taskTitle: { fontSize: 17, fontWeight: 'bold' },
  taskStatus: { color: '#4F46E5', marginTop: 5 },
  taskDate: { color: '#64748B', marginTop: 5 },
  button: {
    backgroundColor: '#4F46E5',
    padding: 16,
    borderRadius: 12,
    marginTop: 25,
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});
