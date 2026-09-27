
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../context/ThemeContext';
import { sizeFont, sizeHeight, sizeWidth } from '../utils/utils';

type Props = {
  title: string;
};

const AppHeader = ({title}: Props) => {
  const {isDark, toggleTheme, colors} = useTheme();

  return (
    <View
      style={{
          backgroundColor: colors.background,
          borderBottomColor: colors.text,
          borderBottomWidth: sizeHeight(0.1)
        }}
      >
      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            {
              color: colors.text,
            },
          ]}>
          {title}
        </Text>

        <TouchableOpacity
          onPress={toggleTheme}
          style={[
            styles.themeButton,
            {
              backgroundColor: colors.surface,
            },
          ]}
          accessibilityRole="button"
          accessibilityLabel={
            isDark
              ? 'Switch to light theme'
              : 'Switch to dark theme'
          }>
          <Icon
            name={isDark ? 'sunny-outline' : 'moon-outline'}
            size={21}
            color={colors.text}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({

  content: {
    height: sizeHeight(60),
    paddingHorizontal: sizeWidth(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: sizeFont(20),
    fontWeight: '700',
  },

  themeButton: {
    width: sizeWidth(40),
    height: sizeHeight(40),
    borderRadius: sizeWidth(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
});