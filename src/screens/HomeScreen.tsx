import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Alert,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../components/AppHeader';
import { useTheme } from '../context/ThemeContext';
import DeviceInfo from 'react-native-device-info';
import { launchImageLibrary } from 'react-native-image-picker';
import { sizeFont, sizeHeight, sizeWidth } from '../utils/utils';
import strings from '../constants/strings';

const HomeScreen = () => {
  const { colors } = useTheme();

  const handleOpenGallery = async () => {
    try {
      if (Platform.OS === 'android') {
        const permission =
          Platform.Version >= 33
            ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
            : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

        const result = await PermissionsAndroid.request(permission);

        if (result !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert(
            strings.common.permissionRequired,
            strings.common.allowPhotoAccess,
          );
          return;
        }
      }

      const result = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 1,
      });

      if (result.didCancel) {
        return;
      }

      if (result.errorCode) {
        Alert.alert(
          strings.common.galleryError,
          result.errorMessage || strings.common.unableToOpenGallery,
        );
        return;
      }

      console.log('Selected image:', result.assets?.[0]);
    } catch (error) {
      console.log('Gallery permission error:', error);
    }
  };
  const deviceDetails = [
    {
      label: strings.home.operatingSystem,
      value: `Android ${DeviceInfo.getSystemVersion()}`,
    },
    {
      label: strings.home.deviceModel,
      value: DeviceInfo.getModel(),
    },
    {
      label: strings.home.deviceBrand,
      value: DeviceInfo.getBrand(),
    },
    {
      label: strings.home.deviceId,
      value: DeviceInfo.getDeviceId(),
    },
    {
      label: strings.home.appVersion,
      value: DeviceInfo.getVersion(),
    },
  ];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <StatusBar hidden />
      <AppHeader title={strings.home.title} />
      <FlatList
        data={deviceDetails}
        keyExtractor={item => item.label}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>
              {strings.home.deviceInformation}
            </Text>

            <Text style={[styles.subtitle, { color: colors.secondaryText }]}>
              {strings.home.deviceDescription}
            </Text>
          </View>
        }
        renderItem={({ item, index }) => (
          <View>
            <View style={styles.row}>
              <View style={styles.info}>
                <Text style={[styles.label, { color: colors.secondaryText }]}>
                  {item.label}
                </Text>

                <Text style={[styles.value, { color: colors.text }]}>
                  {item.value}
                </Text>
              </View>
            </View>

            {index !== deviceDetails.length - 1 && (
              <View
                style={[styles.divider, { backgroundColor: colors.border }]}
              />
            )}
          </View>
        )}
      />
      <TouchableOpacity
        style={[styles.photoButton, { backgroundColor: colors.primary }]}
        onPress={handleOpenGallery}
      >
        <Text style={[styles.photoButtonText, { color: colors.white }]}>
          {strings.home.photos}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: sizeWidth(20),
    paddingBottom: sizeHeight(40),
  },

  header: {
    marginBottom: sizeHeight(24),
  },

  title: {
    fontSize: sizeFont(26),
    fontWeight: '700',
  },

  subtitle: {
    fontSize: sizeFont(14),
    marginTop: sizeHeight(6),
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: sizeHeight(15),
  },

  iconContainer: {
    width: sizeWidth(44),
    height: sizeHeight(44),
    borderRadius: sizeWidth(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: sizeWidth(14),
  },

  icon: {
    fontSize: sizeFont(20),
  },

  info: {
    flex: 1,
  },

  label: {
    fontSize: sizeFont(12),
    marginBottom: sizeHeight(4),
  },

  value: {
    fontSize: sizeFont(16),
    fontWeight: '600',
  },

  divider: {
    height: sizeHeight(1),
  },

  infoBox: {
    marginTop: sizeHeight(20),
    padding: sizeWidth(16),
    borderRadius: sizeWidth(16),
    borderWidth: sizeWidth(1),
  },

  infoTitle: {
    fontSize: sizeFont(15),
    fontWeight: '700',
    marginBottom: sizeHeight(6),
  },

  infoText: {
    fontSize: sizeFont(13),
    lineHeight: sizeHeight(19),
  },
  photoButton: {
    height: sizeHeight(52),
    borderRadius: sizeWidth(14),
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },

  photoButtonText: {
    fontSize: sizeFont(16),
    fontWeight: '700',
  },
});
