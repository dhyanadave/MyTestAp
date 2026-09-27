import React, {createContext, useContext, useState} from 'react';
import {lightColors, darkColors} from '../theme/colors';

type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
  colors: typeof lightColors;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({children}: {children: React.ReactNode}) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const colors = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{isDark, toggleTheme, colors}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }

  return context;
};