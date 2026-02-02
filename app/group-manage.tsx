import { useState } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Alert, Platform } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

// Estructura de un miembro
interface Member {
    id: string;
    name: string;
    role: 'admin' | 'member';
}

export default function GroupManageScreen() {
    const router = useRouter();
    const backgroundColor = useThemeColor({}, 'background');
    const cardColor = useThemeColor({ light: '#F5F5F5', dark: '#2A2A2A' }, 'background');
    const textColor = useThemeColor({}, 'text');

    // Datos simulados del grupo
    const [members, setMembers] = useState<Member[]>([
        { id: '1', name: 'Javi (Tú)', role: 'admin' },
        { id: '2', name: 'Lucía', role: 'member' },
        { id: '3', name: 'Marcos', role: 'member' },
        { id: '4', name: 'Elena', role: 'member' },
        { id: '5', name: 'Pablo', role: 'member' },
    ]);

    const handleRemoveMember = (id: string, name: string) => {
        Alert.alert(
            "Expulsar miembro",
            `¿Seguro que quieres echar a ${name} del grupo?`,
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Expulsar",
                    style: "destructive",
                    onPress: () => {
                        // TODO: Firestore delete logic
                        setMembers(members.filter(m => m.id !== id));
                    }
                }
            ]
        );
    };

    const handleLeaveGroup = () => {
        Alert.alert("Salir del Grupo", "¿Estás seguro? Tendrás que unirte de nuevo para ver los datos.", [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Salir",
                style: "destructive",
                onPress: () => {
                    // 1. Aquí iría la lógica de Firebase para salir: await leaveGroup(...)
                    router.replace('/group-landing');
                }
            }
        ]);
    };

    return (
        <ThemedView style={{ flex: 1 }}>
            <Stack.Screen
                options={{
                    title: 'Gestionar Grupo',
                    headerBackTitle: 'Ajustes',
                    headerTintColor: '#FF9F1C',
                    headerStyle: { backgroundColor },
                    headerTitleStyle: { color: textColor },
                }}
            />

            <View style={styles.container}>

                {/* Cabecera del grupo */}
                <View style={styles.groupHeader}>
                    <ThemedText type="subtitle">Los Borrachos 🍻</ThemedText>
                    <ThemedText style={{opacity: 0.6}}>{members.length} Miembros</ThemedText>
                </View>

                <FlatList
                    data={members}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{ gap: 10, paddingBottom: 100 }}
                    renderItem={({ item }) => (
                        <View style={[styles.memberRow, { backgroundColor: cardColor }]}>

                            {/* Avatar e Info */}
                            <View style={styles.leftInfo}>
                                <View style={styles.avatar}>
                                    <ThemedText style={{fontWeight: 'bold', color: '#555'}}>{item.name.charAt(0)}</ThemedText>
                                </View>
                                <View>
                                    <ThemedText type="defaultSemiBold">{item.name}</ThemedText>
                                    {item.role === 'admin' && (
                                        <ThemedText style={{fontSize: 10, color: '#FF9F1C', fontWeight: 'bold'}}>ADMIN</ThemedText>
                                    )}
                                </View>
                            </View>

                            {/* Botón Eliminar (Solo si no soy yo) */}
                            {item.role !== 'admin' && (
                                <TouchableOpacity onPress={() => handleRemoveMember(item.id, item.name)} style={styles.deleteBtn}>
                                    <Ionicons name="close-circle" size={24} color="#D32F2F" opacity={0.6} />
                                </TouchableOpacity>
                            )}
                        </View>
                    )}
                />

                {/* Botón Salir del Grupo (Sticky en el fondo) */}
                <View style={[styles.footer, { backgroundColor }]}>
                    <TouchableOpacity style={styles.leaveButton} onPress={handleLeaveGroup}>
                        <ThemedText style={{color: '#D32F2F', fontWeight: 'bold'}}>Salir del Grupo</ThemedText>
                    </TouchableOpacity>
                </View>

            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    groupHeader: {
        marginVertical: 20,
        alignItems: 'center',
    },
    memberRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 12,
        borderRadius: 16,
    },
    leftInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteBtn: {
        padding: 5,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: 'rgba(150,150,150,0.1)',
    },
    leaveButton: {
        padding: 15,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#D32F2F',
        alignItems: 'center',
        backgroundColor: 'rgba(211, 47, 47, 0.05)',
    }
});