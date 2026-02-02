import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Stack, useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function ProfileEditScreen() {
    const router = useRouter();
    const backgroundColor = useThemeColor({}, 'background');
    const textColor = useThemeColor({}, 'text');
    const inputBg = useThemeColor({ light: '#F0F0F0', dark: '#333' }, 'background');

    // Estado del formulario
    const [name, setName] = useState('Javi');
    const [email, setEmail] = useState('javi@ejemplo.com');
    const [weight, setWeight] = useState('75');
    const [age, setAge] = useState('24');

    const handleSave = () => {
        Alert.alert("Guardado", "Tus datos se han actualizado correctamente.", [
            { text: "OK", onPress: () => router.back() }
        ]);
    };

    return (
        <ThemedView style={{ flex: 1 }}>
            <Stack.Screen
                options={{
                    title: 'Editar Perfil',
                    headerBackTitle: 'Ajustes',
                    headerTintColor: '#FF9F1C',
                    headerStyle: { backgroundColor },
                    headerTitleStyle: { color: textColor },
                }}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.content}>

                    {/* Avatar */}
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatarCircle}>
                            <ThemedText style={styles.avatarText}>
                                {name.charAt(0)}
                            </ThemedText>
                        </View>
                        <TouchableOpacity onPress={() => Alert.alert("Cambiar Foto", "Abrir galería...")}>
                            <ThemedText style={{ color: '#FF9F1C', marginTop: 10, fontWeight: 'bold' }}>
                                Cambiar foto
                            </ThemedText>
                        </TouchableOpacity>
                    </View>

                    {/* Formulario */}
                    <View style={styles.formGroup}>

                        <View>
                            <ThemedText style={styles.label}>Nombre</ThemedText>
                            <TextInput
                                style={[styles.input, { backgroundColor: inputBg, color: textColor }]}
                                value={name}
                                onChangeText={setName}
                            />
                        </View>

                        <View>
                            <ThemedText style={styles.label}>Correo Electrónico</ThemedText>
                            <TextInput
                                style={[styles.input, { backgroundColor: inputBg, color: textColor }]}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={{ flexDirection: 'row', gap: 15 }}>
                            <View style={{ flex: 1 }}>
                                <ThemedText style={styles.label}>Peso (kg)</ThemedText>
                                <TextInput
                                    style={[styles.input, { backgroundColor: inputBg, color: textColor }]}
                                    value={weight}
                                    onChangeText={setWeight}
                                    keyboardType="numeric"
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <ThemedText style={styles.label}>Edad</ThemedText>
                                <TextInput
                                    style={[styles.input, { backgroundColor: inputBg, color: textColor }]}
                                    value={age}
                                    onChangeText={setAge}
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>

                    </View>

                    {/* Botón Guardar */}
                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <ThemedText style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
                            Guardar Cambios
                        </ThemedText>
                    </TouchableOpacity>

                </ScrollView>
            </KeyboardAvoidingView>
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
    input: {
        padding: 16,
        borderRadius: 16,
        fontSize: 16,
    },
    saveButton: {
        backgroundColor: '#FF9F1C',
        padding: 18,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 30,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    }
});