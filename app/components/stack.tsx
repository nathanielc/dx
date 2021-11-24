import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { Appbar, useTheme } from 'react-native-paper';

interface Props {
    initialRouteName: string,
    hideHeader?: boolean,
    children: React.ReactNode,
}
export const createStack = () => {
    const Stack = createStackNavigator();

    return {
        Navigator: ({ initialRouteName, hideHeader, children }: Props) => {
            const theme = useTheme();
            const headerShown = hideHeader !== undefined ? !hideHeader : true
            return (
                <Stack.Navigator
                    initialRouteName={initialRouteName}
                    headerMode="screen"
                    screenOptions={{
                        headerShown: headerShown,
                        header: ({ scene, previous, navigation }) => {
                            const { options } = scene.descriptor;
                            const title =
                                options.headerTitle !== undefined
                                    ? options.headerTitle
                                    : options.title !== undefined
                                        ? options.title
                                        : scene.route.name;

                            return (
                                <Appbar.Header
                                    theme={{ colors: { primary: theme.colors.surface } }}
                                >
                                    {previous ? (
                                        <Appbar.BackAction
                                            onPress={navigation.goBack}
                                            color={theme.colors.primary}
                                        />
                                    ) : (
                                            <Appbar.Action icon="menu" onPress={() => { ((navigation as any) as DrawerNavigationProp<{}>).openDrawer(); }} />
                                        )}
                                    <Appbar.Content
                                        title={title}
                                        titleStyle={{
                                            fontSize: 18,
                                            fontWeight: 'bold',
                                            color: theme.colors.primary,
                                        }}
                                    />
                                </Appbar.Header>
                            );
                        },
                    }}
                >
                    {children}
                </Stack.Navigator >
            );
        },
        Screen: Stack.Screen,
        Group: Stack.Group,
    };
}

