import { useState } from 'react';
import { useRouter } from 'expo-router';
import { StyleSheet, Image, View, ScrollView, TouchableOpacity, Switch, Platform, StatusBar, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function SettingsScreen() {
    const router = useRouter();
    const backgroundColor = useThemeColor({}, 'background');
    const textColor = useThemeColor({}, 'text');
    const cardColor = useThemeColor({ light: '#F5F5F5', dark: '#2A2A2A' }, 'background');

    // Estado simulado (Notifications, Dark Mode se controla automático por sistema, pero podrías forzarlo aquí)
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    // --- ACCIONES (TODO: FIRESTORE / AUTH) ---
    const handleLogout = () => {
        Alert.alert(
            "Cerrar Sesión",
            "¿Seguro que quieres salir?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Salir",
                    style: "destructive",
                    onPress: () => {
                        console.log("Cerrando sesión...");
                        // TODO: auth.signOut();
                    }
                }
            ]
        );
    };

    const handleDeleteAccount = () => {
        Alert.alert(
            "Eliminar Cuenta",
            "Esta acción es irreversible. Perderás todos tus puntos y el historial.",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: () => {
                        console.log("Eliminando cuenta...");
                        // TODO: deleteUser(auth.currentUser);
                    }
                }
            ]
        );
    };

    // Componente auxiliar para las filas de opciones
    const SettingItem = ({ icon, title, subtitle, color, isDestructive, onPress, showChevron = true }: any) => (
        <TouchableOpacity
            style={[styles.itemRow, { backgroundColor: cardColor }]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={[styles.iconBox, { backgroundColor: isDestructive ? '#FFEBEE' : (color + '20') }]}>
                {/* @ts-ignore */}
                <Ionicons name={icon} size={22} color={isDestructive ? '#D32F2F' : color} />
            </View>

            <View style={{ flex: 1 }}>
                <ThemedText type="defaultSemiBold" style={{ color: isDestructive ? '#D32F2F' : textColor }}>
                    {title}
                </ThemedText>
                {subtitle && <ThemedText style={{ fontSize: 12, opacity: 0.6 }}>{subtitle}</ThemedText>}
            </View>

            {showChevron && (
                <Ionicons name="chevron-forward" size={20} color={textColor} style={{ opacity: 0.3 }} />
            )}
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>

            {/* --- HEADER --- */}
            <View style={[styles.headerContainer, { backgroundColor }]}>
                <View style={styles.leftGroup}>
                    <Image source={require('@/assets/images/isotipo.png')} style={styles.logo} />
                    <ThemedText type="title" style={{ fontSize: 24, lineHeight: 32 }}>Ajustes</ThemedText>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* --- 1. TARJETA DE PERFIL --- */}
                <View style={[styles.profileCard, { backgroundColor: cardColor }]}>
                    <View style={styles.avatarLarge}>
                        <ThemedText style={{ fontSize: 32, fontWeight: 'bold', color: '#555' }}>J</ThemedText>
                    </View>
                    <View style={{ marginTop: 10, alignItems: 'center' }}>
                        <ThemedText type="subtitle">Javi</ThemedText>
                        <ThemedText style={{ opacity: 0.6 }}>javi@ejemplo.com</ThemedText>
                    </View>

                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => router.push('/profile-edit')}
                    >
                        <ThemedText style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>Editar Perfil</ThemedText>
                    </TouchableOpacity>
                </View>


                {/* --- 2. SECCIÓN CUENTA --- */}
                <ThemedText style={styles.sectionTitle}>Mi Cuenta</ThemedText>

                <View style={styles.sectionGroup}>
                    <SettingItem
                        icon="person"
                        title="Datos Personales"
                        subtitle="Nombre, edad, peso"
                        color="#FF9F1C"
                        onPress={() => router.push('/profile')}
                    />
                    <SettingItem
                        icon="shield-checkmark"
                        title="Seguridad"
                        subtitle="Contraseña y autenticación"
                        color="#4CAF50"
                        onPress={() => router.push('/security')}
                    />
                </View>

                {/* --- 3. SECCIÓN GRUPO --- */}
                <ThemedText style={styles.sectionTitle}>Grupo</ThemedText>

                <View style={styles.sectionGroup}>
                    <SettingItem
                        icon="people"
                        title="Gestionar Grupo"
                        subtitle="Ver miembros: 8 amigos"
                        color="#2196F3"
                        onPress={() => router.push('/group-manage')}
                    />
                    <SettingItem
                        icon="qr-code"
                        title="Invitar Amigos"
                        subtitle="Compartir código de grupo"
                        color="#9C27B0"
                        onPress={() => router.push('/group-invite')}
                    />
                </View>

                {/* --- 4. ZONA DE PELIGRO --- */}
                <ThemedText style={styles.sectionTitle}>Sesión</ThemedText>

                <View style={styles.sectionGroup}>
                    <SettingItem
                        icon="log-out"
                        title="Cerrar Sesión"
                        color="#555"
                        onPress={handleLogout}
                    />

                    <View style={{ height: 10 }} />

                    <SettingItem
                        icon="trash"
                        title="Eliminar Cuenta"
                        subtitle="Acción permanente"
                        color="#D32F2F"
                        isDestructive={true}
                        onPress={handleDeleteAccount}
                        showChevron={false}
                    />
                </View>

                {/* --- FOOTER VERSION --- */}
                <View style={styles.footer}>
                    <ThemedText style={{ fontSize: 12, opacity: 0.4 }}>Drinkr App v1.0.0</ThemedText>
                </View>

                {/* Espacio final para el tab bar */}
                <View style={{ height: 100 }} />

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    leftGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    logo: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },

    // --- PERFIL ---
    profileCard: {
        alignItems: 'center',
        padding: 24,
        borderRadius: 24,
        marginBottom: 25,
    },
    avatarLarge: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 4,
        borderColor: '#fff', // Borde blanco para resaltar sobre gris
    },
    editButton: {
        marginTop: 15,
        backgroundColor: '#333',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
    },

    // --- SECCIONES ---
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 5,
        opacity: 0.6,
        textTransform: 'uppercase',
    },
    sectionGroup: {
        marginBottom: 25,
        gap: 12,
    },

    // --- ITEM ROW ---
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 20,
        gap: 15,
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },

    // --- FOOTER ---
    footer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    }
});