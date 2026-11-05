
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  // Load saved dark mode
  useEffect(() => {
    loadTheme();
  }, []);

  const loadTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('tasks');

      if (savedTasks !== null) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (error) {
      console.log('Error loading tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load theme from storage
  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('darkMode');

      if (savedTheme !== null) {
        setDarkMode(JSON.parse(savedTheme));
      }
    } catch (error) {
      console.log('Error loading theme:', error);
    }
  };

  const saveTasks = async (updatedTasks) => {
    setTasks(updatedTasks);

    try {
      await AsyncStorage.setItem(
        'tasks',
        JSON.stringify(updatedTasks)
      );
    } catch (error) {
      console.log('Error saving tasks:', error);
    }
  };

  const addTask = async (task) => {
    const updatedTasks = [task, ...tasks];
    await saveTasks(updatedTasks);
  };

  const updateTask = async (updatedTask) => {
    const updatedTasks = tasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );

    await saveTasks(updatedTasks);
  };

  const deleteTask = async (taskId) => {
    const updatedTasks = tasks.filter(
      task => task.id !== taskId
    );

    await saveTasks(updatedTasks);
  };

  // Toggle and save dark mode
  const toggleDarkMode = async () => {
    const newMode = !darkMode;
    setDarkMode(newMode);

    try {
      await AsyncStorage.setItem(
        'darkMode',
        JSON.stringify(newMode)
      );
    } catch (error) {
      console.log('Error saving theme:', error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        tasks,
        loading,
        addTask,
        updateTask,
        deleteTask,
        darkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
