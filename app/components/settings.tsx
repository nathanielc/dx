import React, { FC } from 'react';

import { ThemeSwitch } from './theme';
import { createStack } from './stack';

const Stack = createStack();


const Index = ({ navigation }) => {
    return (
        <>
            <ThemeSwitch />
        </>
    );
};

export const Settings = ({ navigation }) => {
    return (
        <Stack.Navigator
            initialRouteName="SettingsMain"
        >
            <Stack.Screen name='SettingsMain' options={{ headerTitle: 'Settings' }} component={Index} />
        </Stack.Navigator>
    );
};
