import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';

import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';

import {
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';

import { PreferencesContext } from '../context/preferences';

export const LightTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: { ...PaperDefaultTheme.colors, ...NavigationDefaultTheme.colors },
};
export const DarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: { ...PaperDarkTheme.colors, ...NavigationDarkTheme.colors },
};




export const ThemeSwitch = () => {
  const { theme, toggleTheme } = React.useContext(
    PreferencesContext
  );

  return (
    <TouchableRipple onPress={toggleTheme}>
      <View  style={styles.preference}>
        <Text>Dark Theme</Text>
        <View pointerEvents="none">
          <Switch value={theme === 'dark'} />
        </View>
      </View>
    </TouchableRipple>
  );
}


const styles = StyleSheet.create({
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});


