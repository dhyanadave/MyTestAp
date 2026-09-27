import { Image, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import { sizeHeight } from '../utils/utils';
import { useTheme } from '../context/ThemeContext';

const SplashScreen = ({ navigation }: { navigation: any }) => {
  const { colors } = useTheme();

  useEffect(() => {
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainTabs' }],
      });
    }, 2000);
  }, []);

  return (
    <View
      style={[
        styles.mainView,
        {
          backgroundColor: colors.primary,
        },
      ]}
    >
      <Image source={require('../assets/logo.png')} style={styles.image} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: sizeHeight(150),
    height: sizeHeight(150),
    resizeMode: 'contain',
  },
});
