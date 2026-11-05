
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from 'react-native';

import { useApp } from '../context/AppContext';

export default function TaskListScreen({ navigation }) {
  const { tasks, loading } = useApp();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');
  const [refreshing, setRefreshing] = useState(false);

  const filteredTasks = useMemo(() => {
    let result = tasks.filter(task => {
      const matchesSearch =
        task.title.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === 'All' || task.status === statusFilter;

      const matchesPriority =
        priorityFilter === 'All' || task.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });

    result.sort((a, b) => {
      if (sortBy === 'Due Date') {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }

      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });

    return result;
  }, [tasks, search, statusFilter, priorityFilter, sortBy]);

  const renderTask = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('TaskDetails', { task: item })}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>
        {item.description || 'No description'}
      </Text>

      <Text>Priority: {item.priority}</Text>
      <Text>Status: {item.status}</Text>
      <Text>Due Date: {item.dueDate}</Text>
    </TouchableOpacity>
  );

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 500);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Tasks</Text>

      <TextInput
        style={styles.search}
        placeholder="Search tasks..."
        value={search}
        onChangeText={setSearch}
      />

      <Text style={styles.label}>Filter by Status</Text>

      <View style={styles.filters}>
        {['All', 'Pending', 'In Progress', 'Completed'].map(item => (
          <TouchableOpacity
            key={item}
            style={[
              styles.filterButton,
              statusFilter === item && styles.selected,
            ]}
            onPress={() => setStatusFilter(item)}
          >
            <Text style={styles.filterText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Filter by Priority</Text>

      <View style={styles.filters}>
        {['All', 'Low', 'Medium', 'High'].map(item => (
          <TouchableOpacity
            key={item}
            style={[
              styles.filterButton,
              priorityFilter === item && styles.selected,
            ]}
            onPress={() => setPriorityFilter(item)}
          >
            <Text style={styles.filterText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.sortButton}
        onPress={() =>
          setSortBy(sortBy === 'Newest' ? 'Due Date' : 'Newest')
        }
      >
        <Text>Sort: {sortBy} (Tap to change)</Text>
      </TouchableOpacity>

      {loading ? (
        <Text style={styles.empty}>Loading tasks...</Text>
      ) : (
        <FlatList
          data={filteredTasks}
          keyExtractor={item => item.id}
          renderItem={renderTask}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
            />
          }
          ListEmptyComponent={
            <Text style={styles.empty}>No tasks found. Add a new task!</Text>
          }
        />
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddEditTask')}
      >
        <Text style={styles.addText}>+ Add New Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F6FC', padding: 15 },
  heading: { fontSize: 26, fontWeight: 'bold', marginBottom: 15 },
  search: {
    backgroundColor: 'white',
    padding: 13,
    borderRadius: 10,
    marginBottom: 12,
  },
  label: { fontWeight: 'bold', marginVertical: 6 },
  filters: { flexDirection: 'row', flexWrap: 'wrap' },
  filterButton: {
    backgroundColor: '#E2E8F0',
    padding: 9,
    borderRadius: 8,
    marginRight: 5,
    marginBottom: 5,
  },
  selected: { backgroundColor: '#4F46E5' },
  filterText: { color: '#1E293B', fontSize: 12 },
  sortButton: {
    backgroundColor: '#E0E7FF',
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginVertical: 7,
  },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  description: { color: '#64748B', marginBottom: 8 },
  empty: { textAlign: 'center', marginTop: 25, color: '#64748B' },
  addButton: {
    backgroundColor: '#4F46E5',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  addText: { color: 'white', fontWeight: 'bold' },
});
