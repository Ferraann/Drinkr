import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View, ScrollView, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function SecurityScreen() {
    const router = useRouter();
    const textColor = useThemeColor({}, 'text');
    const inputBg = useThemeColor({ light: '#F0F0F0', dark: '#333' }, 'background');
    const backgroundColor = useThemeColor({}, 'background');

    const [currentPass, setCurrentPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const handleUpdatePassword = () => {
        if (newPass !== confirmPass) {
            Alert.alert("Error", "Las contraseñas nuevas no coinciden.");
            return;
        }
        if (newPass.length < 6) {
            Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        // TODO: auth.updatePassword(newPass)
        Alert.alert("Contraseña Actualizada", "Usa tu nueva contraseña la próxima vez.", [
            { text: "OK", onPress: () => router.back() }
        ]);
    };

    return (
        <ThemedView style={{ flex: 1 }}>
            <Stack.Screen
                options={{
                    title: 'Seguridad',
                    headerBackTitle: 'Ajustes',
                    headerTintColor: '#FF9F1C',
                    headerStyle: { backgroundColor },
                    headerTitleStyle: { color: textColor },
                }}
            />

            <ScrollView contentContainerStyle={styles.content}>

                <View style={styles.infoBox}>
                    <ThemedText style={{fontSize: 14, opacity: 0.7}}>
                        Para tu seguridad, te pediremos la contraseña actual antes de hacer cambios.
                    </ThemedText>
                </View>

                <View style={styles.formGroup}>

                    <View>
                        <ThemedText style={styles.label}>Contraseña Actual</ThemedText>
                        <TextInput
                            style={[styles.input, { backgroundColor: inputBg, color: textColor }]}
                            secureTextEntry
                            placeholder="********"
                            placeholderTextColor="#999"
                            value={currentPass}
                            onChangeText={setCurrentPass}
                        />
                    </View>

                    <View style={{height: 10}} />

                    <View>
                        <ThemedText style={styles.label}>Nueva Contraseña</ThemedText>
                        <TextInput
                            style={[styles.input, { backgroundColor: inputBg, color: textColor }]}
                            secureTextEntry
                            placeholder="Mínimo 6 caracteres"
                            placeholderTextColor="#999"
                            value={newPass}
                            onChangeText={setNewPass}
                        />
                    </View>

                    <View>
                        <ThemedText style={styles.label}>Confirmar Nueva Contraseña</ThemedText>
                        <TextInput
                            style={[styles.input, { backgroundColor: inputBg, color: textColor }]}
                            secureTextEntry
                            placeholder="Repite la contraseña"
                            placeholderTextColor="#999"
                            value={confirmPass}
                            onChangeText={setConfirmPass}
                        />
                    </View>

                </View>

                <TouchableOpacity style={styles.saveButton} onPress={handleUpdatePassword}>
                    <ThemedText style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
                        Actualizar Contraseña
                    </ThemedText>
                </TouchableOpacity>

            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    content: { padding: 20 },
    infoBox: { marginBottom: 20, padding: 15, backgroundColor: 'rgba(255, 159, 28, 0.1)', borderRadius: 12 },
    formGroup: { gap: 15 },
    label: { fontSize: 14, fontWeight: 'bold', marginBottom: 8, opacity: 0.7, marginLeft: 4 },
    input: { padding: 16, borderRadius: 16, fontSize: 16 },
    saveButton: {
        backgroundColor: '#000', // Negro para diferenciar de Editar Perfil
        padding: 18,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 30,
    }
});