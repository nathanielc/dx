
import React, { FC } from 'react';
import { Button, View, StyleSheet, Text } from 'react-native';
import { createStack } from './stack';
import { useTheme } from '@react-navigation/native';

const Stack = createStack();


const Index = ({ navigation }) => {
    const theme = useTheme();
    return (
        <View style={styles.view}>
            <Text style={{ color: theme.colors.primary }}>Welcome to dx</Text>
        </View>
    );
};

export const Home = ({ navigation }) => {
    return (
        <Stack.Navigator
            initialRouteName="Index"
        >
            <Stack.Screen name='dx' component={Index} />
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
