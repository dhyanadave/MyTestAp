import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CountryPicker, {
  Country,
  CountryCode,
} from 'react-native-country-picker-modal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../context/ThemeContext';
import AppHeader from '../components/AppHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { sizeFont, sizeHeight, sizeWidth } from '../utils/utils';
import strings from '../constants/strings';

const SettingScreen = () => {
  const { colors } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [country, setCountry] = useState<Country | null>(null);
  const [countryCode, setCountryCode] = useState<CountryCode>('IN');
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const formattedDate = birthDate.toLocaleDateString('en-GB');
  const handleCountrySelect = (selectedCountry: Country) => {
    setCountry(selectedCountry);
    setCountryCode(selectedCountry.cca2);
    setShowCountryPicker(false);
  };
  const countryName =
    typeof country?.name === 'string' ? country.name : strings.settings.countryPlaceholder;
    
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <AppHeader title={strings.settings.title} />
      <View style={styles.subContainer}>
        <View style={styles.fieldContainer}>
          <Text style={[styles.label, { color: colors.text }]}>
            {strings.settings.name}
          </Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder={strings.settings.namePlaceholder}
            placeholderTextColor={colors.placeholder}
            style={[
              styles.input,
              {
                color: colors.text,
                backgroundColor: colors.background,
                borderColor: colors.border,
              },
            ]}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={[styles.label, { color: colors.text }]}>
            {strings.settings.email}
          </Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder={strings.settings.emailPlaceholder}
            placeholderTextColor={colors.placeholder}
            keyboardType="email-address"
            autoCapitalize="none"
            style={[
              styles.input,
              {
                color: colors.text,
                backgroundColor: colors.background,
                borderColor: colors.border,
              },
            ]}
          />
        </View>
        <View style={styles.fieldContainer}>
          <Text style={[styles.label, { color: colors.text }]}>
            {strings.settings.birthdate}
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowDatePicker(true)}
            style={[
              styles.input,
              styles.dateInput,
              {
                backgroundColor: colors.background,
                borderColor: colors.border,
              },
            ]}
          >
            <Text style={{ color: colors.text }}>{formattedDate}</Text>
            <MaterialCommunityIcons
              name="calendar-month-outline"
              size={sizeFont(21)}
              color={colors.text}
            />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={birthDate}
              mode="date"
              display="default"
              maximumDate={new Date()}
              onValueChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  setBirthDate(selectedDate);
                }
              }}
            />
          )}
        </View>
        <View style={styles.fieldContainer}>
          <Text style={[styles.label, { color: colors.text }]}>
            {strings.settings.country}
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowCountryPicker(true)}
            style={[
              styles.input,
              styles.countryInput,
              {
                backgroundColor: colors.background,
                borderColor: colors.border,
              },
            ]}
          >
            <View style={styles.countryLeft}>
              {country ? (
                <CountryPicker
                  countryCode={countryCode}
                  withFlag
                  withFilter={false}
                  withCountryNameButton={false}
                  withAlphaFilter={false}
                  visible={false}
                  onSelect={handleCountrySelect}
                />
              ) : null}
              <Text
                style={{ color: country ? colors.text : colors.placeholder }}
              >
                {countryName}
              </Text>
            </View>
            <MaterialCommunityIcons
              name="chevron-down"
              size={sizeFont(24)}
              color={colors.text}
            />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: colors.text }}>{strings.settings.selectedCountry}</Text>
            <CountryPicker
              countryCode={countryCode}
              visible={showCountryPicker}
              withFlag
              withFilter
              withCountryNameButton={false}
              withCallingCode
              onSelect={handleCountrySelect}
              onClose={() => setShowCountryPicker(false)}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default SettingScreen;
const styles = StyleSheet.create({
  container: { flex: 1 },
  subContainer: { paddingHorizontal: sizeWidth(20) },
  fieldContainer: { marginBottom: sizeHeight(20) },
  label: {
    fontSize: sizeFont(14),
    fontWeight: '600',
    marginBottom: sizeHeight(8),
  },
  input: {
    height: sizeHeight(50),
    borderWidth: sizeWidth(1),
    borderRadius: sizeWidth(10),
    paddingHorizontal: sizeWidth(14),
    fontSize: sizeFont(15),
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  countryInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  countryLeft: { flexDirection: 'row', alignItems: 'center' },
});
