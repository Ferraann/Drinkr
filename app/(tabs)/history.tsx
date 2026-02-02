import { useState, useEffect } from 'react';
import { StyleSheet, Image, View, SectionList, TouchableOpacity, Platform, StatusBar, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

// Estructura de un evento en el historial
interface HistoryEvent {
    id: string;
    userName: string;
    action: string;      // "se tomó una Caña"
    drinkType: 'beer' | 'wine' | 'shot' | 'other';
    points: number;
    time: string;        // "14:30"
}

// Estructura para la SectionList (Agrupado por fechas)
interface HistorySection {
    title: string;       // "Hoy", "Ayer", "24 Oct"
    data: HistoryEvent[];
}

export default function HistoryScreen() {
    const backgroundColor = useThemeColor({}, 'background');
    const textColor = useThemeColor({}, 'text');
    const cardColor = useThemeColor({ light: '#F5F5F5', dark: '#2A2A2A' }, 'background');

    const [historyData, setHistoryData] = useState<HistorySection[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const [filter, setFilter] = useState<'all' | 'mine'>('all'); // Filtro visual

    // --- FUNCIÓN DE CARGA (FIRESTORE) ---
    const fetchHistory = async () => {
        /* TODO: FIRESTORE INTEGRATION
          1. Query a la colección "history" o "drinks_log".
          2. orderBy("timestamp", "desc").
          3. Procesar los datos para agruparlos por día (Hoy, Ayer, etc).
        */

        setRefreshing(true);
        setTimeout(() => {
            // DATOS FALSOS
            const mockSections: HistorySection[] = [
                {
                    title: 'Hoy',
                    data: [
                        { id: '1', userName: 'Javi', action: 'Caña', drinkType: 'beer', points: 1, time: 'Hace 5 min' },
                        { id: '2', userName: 'Lucía', action: 'Copa', drinkType: 'wine', points: 2, time: 'Hace 20 min' },
                        { id: '3', userName: 'Javi', action: 'Shot', drinkType: 'shot', points: 3, time: '14:30' },
                    ]
                },
                {
                    title: 'Ayer',
                    data: [
                        { id: '4', userName: 'Marcos', action: 'Caña', drinkType: 'beer', points: 1, time: '23:45' },
                        { id: '5', userName: 'Elena', action: 'Copa', drinkType: 'wine', points: 2, time: '22:15' },
                        { id: '6', userName: 'Javi', action: 'Caña', drinkType: 'beer', points: 1, time: '21:00' },
                    ]
                },
                {
                    title: 'Semana Pasada',
                    data: [
                        { id: '7', userName: 'Diego', action: 'Jarra', drinkType: 'beer', points: 2, time: 'Viernes' },
                    ]
                }
            ];
            setHistoryData(mockSections);
            setRefreshing(false);
        }, 1000);
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    // Función auxiliar para obtener icono y color según bebida
    const getDrinkIcon = (type: string) => {
        switch(type) {
            case 'beer': return { icon: 'beer', color: '#FF9F1C' };
            case 'wine': return { icon: 'wine', color: '#A020F0' };
            case 'shot': return { icon: 'flame', color: '#FF4500' };
            default: return { icon: 'water', color: '#555' };
        }
    };

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>

            {/* --- HEADER --- */}
            <View style={[styles.headerContainer, { backgroundColor }]}>
                <View style={styles.leftGroup}>
                    <Image source={require('@/assets/images/isotipo.png')} style={styles.logo} />
                    <ThemedText type="title" style={{ fontSize: 24, lineHeight: 32 }}>Historial</ThemedText>
                </View>

                {/* Botón de Filtro (Visual) */}
                <TouchableOpacity onPress={() => setFilter(filter === 'all' ? 'mine' : 'all')}>
                    <Ionicons
                        name={filter === 'all' ? "people" : "person"}
                        size={24}
                        color={textColor}
                    />
                </TouchableOpacity>
            </View>

            {/* --- LISTA DE EVENTOS --- */}
            <SectionList
                sections={historyData}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={fetchHistory} tintColor="#FF9F1C" />
                }

                // Añadimos un pie de página invisible de 100px para dar espacio al final
                ListFooterComponent={<View style={{ height: 100 }} />}

                // Cabecera de Sección (Hoy, Ayer...)
                renderSectionHeader={({ section: { title } }) => (
                    <View style={[styles.sectionHeader, { backgroundColor }]}>
                        <ThemedText type="defaultSemiBold" style={{ opacity: 0.5, fontSize: 13, textTransform: 'uppercase' }}>
                            {title}
                        </ThemedText>
                    </View>
                )}

                // Ítem de la lista
                renderItem={({ item }) => {
                    const { icon, color } = getDrinkIcon(item.drinkType);
                    return (
                        <View style={[styles.historyRow, { backgroundColor: cardColor }]}>
                            {/* Icono Bebida */}
                            <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
                                {/* El +'20' añade transparencia al hex en algunos sistemas, o usa rgba */}
                                {/* @ts-ignore */}
                                <Ionicons name={icon} size={20} color={color} />
                            </View>

                            {/* Info */}
                            <View style={{ flex: 1 }}>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <ThemedText type="defaultSemiBold">{item.userName}</ThemedText>
                                    <ThemedText style={{fontSize: 12, opacity: 0.5}}>{item.time}</ThemedText>
                                </View>
                                <ThemedText style={{fontSize: 14, opacity: 0.7}}>
                                    Se tomó una <ThemedText style={{fontWeight: 'bold', color}}>{item.action}</ThemedText>
                                </ThemedText>
                            </View>

                            {/* Puntos */}
                            <View style={styles.pointsBadge}>
                                <ThemedText style={{ fontSize: 14, fontWeight: 'bold', color: textColor }}>
                                    +{item.points}
                                </ThemedText>
                            </View>
                        </View>
                    );
                }}

                // Si la lista está vacía
                ListEmptyComponent={
                    !refreshing ? (
                        <View style={{ alignItems: 'center', marginTop: 50, opacity: 0.5 }}>
                            <Ionicons name="time-outline" size={50} color={textColor} />
                            <ThemedText>No hay actividad reciente</ThemedText>
                        </View>
                    ) : null
                }
            />

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
        justifyContent: 'space-between',
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
    listContent: {
        paddingHorizontal: 20,
    },
    sectionHeader: {
        paddingVertical: 10,
        marginBottom: 5,
        paddingTop: 10,
    },

    // Estilos de Fila
    historyRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        marginBottom: 10,
        borderRadius: 16,
        gap: 15,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pointsBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        backgroundColor: 'rgba(150,150,150, 0.1)',
    }
});