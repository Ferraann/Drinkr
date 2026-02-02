import { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function ProfileViewScreen() {
    const router = useRouter();
    const backgroundColor = useThemeColor({}, 'background');
    const textColor = useThemeColor({}, 'text');
    const fieldBg = useThemeColor({ light: '#F0F0F0', dark: '#333' }, 'background');

    const [name] = useState('Javi');
    const [email] = useState('javi@ejemplo.com');
    const [weight] = useState('75');
    const [age] = useState('24');

    return (
        <ThemedView style={{ flex: 1 }}>
            <Stack.Screen
                options={{
                    title: 'Mis Datos',
                    headerBackTitle: 'Ajustes',
                    headerTintColor: '#FF9F1C',
                    headerStyle: { backgroundColor },
                    headerTitleStyle: { color: textColor },
                }}
            />

            <ScrollView contentContainerStyle={styles.content}>

                {/* Avatar */}
                <View style={styles.avatarContainer}>
                    <View style={styles.avatarCircle}>
                        <ThemedText style={styles.avatarText}>
                            {name.charAt(0)}
                        </ThemedText>
                    </View>
                </View>

                {/* Grupo de Datos (Solo Lectura) */}
                <View style={styles.formGroup}>

                    <View>
                        <ThemedText style={styles.label}>Nombre</ThemedText>
                        <View style={[styles.readOnlyField, { backgroundColor: fieldBg }]}>
                            <ThemedText style={{ fontSize: 16 }}>{name}</ThemedText>
                        </View>
                    </View>

                    <View>
                        <ThemedText style={styles.label}>Correo Electrónico</ThemedText>
                        <View style={[styles.readOnlyField, { backgroundColor: fieldBg }]}>
                            <ThemedText style={{ fontSize: 16 }}>{email}</ThemedText>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', gap: 15 }}>
                        <View style={{ flex: 1 }}>
                            <ThemedText style={styles.label}>Peso (kg)</ThemedText>
                            <View style={[styles.readOnlyField, { backgroundColor: fieldBg }]}>
                                <ThemedText style={{ fontSize: 16 }}>{weight}</ThemedText>
                            </View>
                        </View>
                        <View style={{ flex: 1 }}>
                            <ThemedText style={styles.label}>Edad</ThemedText>
                            <View style={[styles.readOnlyField, { backgroundColor: fieldBg }]}>
                                <ThemedText style={{ fontSize: 16 }}>{age}</ThemedText>
                            </View>
                        </View>
                    </View>

                </View>

            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    content: {
        padding: 20,
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 10,
    },
    avatarCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: '#F5F5F5',
    },
    avatarText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#555',
        lineHeight: 45,
        includeFontPadding: false,
        textAlignVertical: 'center',
    },
    formGroup: {
        gap: 15,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        opacity: 0.7,
        marginBottom: 8,
        marginLeft: 4,
    },
    readOnlyField: {
        padding: 16,
        borderRadius: 16,
        justifyContent: 'center',
    }
});