import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View, Image, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function GroupLandingScreen() {
    const router = useRouter();
    const backgroundColor = useThemeColor({}, 'background');
    const textColor = useThemeColor({}, 'text');
    const inputBg = useThemeColor({ light: '#F0F0F0', dark: '#333' }, 'background');
    const cardColor = useThemeColor({ light: '#fff', dark: '#1E1E1E' }, 'background');

    const [code, setCode] = useState('');

    const handleJoin = () => {
        if (code.length < 3) {
            Alert.alert("Código inválido", "Por favor introduce un código de grupo válido.");
            return;
        }
        // TODO: Lógica Firestore para unirse
        Alert.alert("¡Éxito!", `Te has unido al grupo con código ${code}`, [
            { text: "Continuar", onPress: () => router.dismissAll() } // Vuelve al inicio
        ]);
    };

    return (
        <ThemedView style={{ flex: 1 }}>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 1}}>
                <ScrollView contentContainerStyle={styles.container}>

                    <View style={{alignItems: 'center', marginTop: 40, marginBottom: 40}}>
                        <Image source={require('@/assets/images/isotipo.png')} style={{width: 60, height: 60, marginBottom: 20}} resizeMode="contain" />
                        <ThemedText type="title" style={{fontSize: 28}}>Drinkr</ThemedText>
                        <ThemedText style={{opacity: 0.6, textAlign: 'center', marginTop: 10}}>
                            Necesitas un grupo para empezar a jugar.
                        </ThemedText>
                    </View>

                    {/* --- SECCIÓN 1: UNIRSE --- */}
                    <View style={[styles.card, {backgroundColor: cardColor}]}>
                        <ThemedText type="subtitle" style={{marginBottom: 15}}>Tengo un código</ThemedText>

                        <View style={styles.inputRow}>
                            <TextInput
                                style={[styles.input, { backgroundColor: inputBg, color: textColor }]}
                                placeholder="CÓDIGO (Ej: A1B2)"
                                placeholderTextColor="#999"
                                autoCapitalize="characters"
                                value={code}
                                onChangeText={setCode}
                            />
                            <TouchableOpacity style={styles.joinButton} onPress={handleJoin}>
                                <Ionicons name="arrow-forward" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Separador */}
                    <View style={styles.separator}>
                        <View style={{flex: 1, height: 1, backgroundColor: textColor, opacity: 0.1}} />
                        <ThemedText style={{marginHorizontal: 10, opacity: 0.4, fontSize: 12}}>O SI PREFIERES</ThemedText>
                        <View style={{flex: 1, height: 1, backgroundColor: textColor, opacity: 0.1}} />
                    </View>

                    {/* --- SECCIÓN 2: CREAR --- */}
                    <View style={[styles.card, {backgroundColor: cardColor}]}>
                        <ThemedText type="subtitle" style={{marginBottom: 5}}>Crear Grupo Nuevo</ThemedText>
                        <ThemedText style={{fontSize: 12, opacity: 0.5, marginBottom: 15}}>
                            Sé el administrador, invita a tus amigos y gestiona la partida.
                        </ThemedText>

                        <TouchableOpacity
                            style={styles.createButton}
                            onPress={() => router.push('/group-create')} // Reutilizamos la pantalla de crear que hicimos antes
                        >
                            <ThemedText style={{color: '#FF9F1C', fontWeight: 'bold'}}>Crear un Grupo</ThemedText>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        paddingTop: 60,
    },
    closeButton: {
        position: 'absolute',
        top: 50,
        right: 20,
        zIndex: 10,
        padding: 10,
    },
    card: {
        padding: 20,
        borderRadius: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    inputRow: {
        flexDirection: 'row',
        gap: 10,
    },
    input: {
        flex: 1,
        padding: 16,
        borderRadius: 16,
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    joinButton: {
        backgroundColor: '#FF9F1C',
        width: 56,
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    separator: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 30,
    },
    createButton: {
        padding: 16,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#FF9F1C',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 159, 28, 0.05)',
    }
});