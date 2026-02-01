import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarStyle: Platform.select({
                    ios: {
                        position: 'absolute',
                        paddingTop: 10,
                    },
                    default: {
                        height: 70,
                        paddingTop: 12,
                        paddingBottom: 12,
                    },
                }),
            }}>

            {/* 1. INICIO */}
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Inicio',
                    tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
                }}
            />

            {/* 2. RANKING (Trofeo) */}
            <Tabs.Screen
                name="ranking"
                options={{
                    title: 'Ranking',
                    tabBarIcon: ({ color }) => <IconSymbol size={28} name="trophy.fill" color={color} />,
                }}
            />

            {/* 3. HISTORIAL (Reloj) */}
            <Tabs.Screen
                name="history"
                options={{
                    title: 'Historial',
                    tabBarIcon: ({ color }) => <IconSymbol size={28} name="clock.fill" color={color} />,
                }}
            />

            {/* 4. AJUSTES (Engranaje) - Asegúrate de haber creado settings.tsx */}
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Ajustes',
                    tabBarIcon: ({ color }) => <IconSymbol size={28} name="gearshape.fill" color={color} />,
                }}
            />
        </Tabs>
    );
}