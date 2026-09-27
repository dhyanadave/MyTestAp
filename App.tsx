import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AppRouter from './src/router/AppRouter';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/context/ThemeContext';

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppRouter />
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
