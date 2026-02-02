import { useState, useEffect } from 'react';
import { StyleSheet, Image, View, ScrollView, Platform, StatusBar, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

// Definimos la estructura de un Usuario (Interface)
interface UserRank {
    id: string;
    name: string;
    points: number;
    avatar?: string; // Opcional
}

export default function RankingScreen() {
    const backgroundColor = useThemeColor({}, 'background');
    const textColor = useThemeColor({}, 'text');
    const cardColor = useThemeColor({ light: '#F5F5F5', dark: '#2A2A2A' }, 'background');

    // Estado para la lista de usuarios
    const [rankingData, setRankingData] = useState<UserRank[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    // --- FUNCIÓN PARA CARGAR DATOS (SIMULACIÓN FIRESTORE) ---
    const fetchRanking = async () => {
        // Aquí es donde harás la llamada a Firebase
        /*
          TODO: FIRESTORE INTEGRATION
          1. const q = query(collection(db, "users"), orderBy("points", "desc"));
          2. const querySnapshot = await getDocs(q);
          3. const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          4. setRankingData(users);
        */

        // --- DATOS FALSOS PARA VER EL DISEÑO ---
        // Simulamos una espera de red
        setRefreshing(true);
        setTimeout(() => {
            const mockData = [
                { id: '1', name: 'Javi', points: 120 },   // 1º
                { id: '2', name: 'Lucía', points: 98 },   // 2º
                { id: '3', name: 'Marcos', points: 85 },  // 3º
                { id: '4', name: 'Elena', points: 60 },
                { id: '5', name: 'Pablo', points: 45 },
                { id: '6', name: 'Ana', points: 32 },
                { id: '7', name: 'Diego', points: 12 },
                { id: '8', name: 'Sofía', points: 5 },
            ];
            setRankingData(mockData);
            setRefreshing(false);
        }, 1000); // 1 segundo de carga falsa
    };

    // Cargar datos al abrir la pantalla
    useEffect(() => {
        fetchRanking();
    }, []);

    // Separamos el Top 3 del resto para diseñarlos diferente
    const topThree = rankingData.slice(0, 3);
    const restOfUsers = rankingData.slice(3);

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>

            {/* --- HEADER (Consistente con Home) --- */}
            <View style={[styles.headerContainer, { backgroundColor }]}>
                <View style={styles.leftGroup}>
                    <Image
                        source={require('@/assets/images/isotipo.png')}
                        style={styles.logo}
                    />
                    <ThemedText type="title" style={{ fontSize: 24, lineHeight: 32 }}>Ranking</ThemedText>
                </View>
                <Ionicons name="trophy-outline" size={24} color={textColor} />
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={fetchRanking} tintColor="#FF9F1C" />
                }
            >

                {/* --- PODIO (TOP 3) --- */}
                {rankingData.length > 0 && (
                    <View style={styles.podiumContainer}>

                        {/* 2º PUESTO (Izquierda) */}
                        {topThree[1] && (
                            <View style={[styles.podiumItem, { marginTop: 40 }]}>
                                <ThemedText style={{fontWeight: 'bold', marginBottom: 5}}>2º</ThemedText>
                                <View style={[styles.avatarCircle, { borderColor: '#C0C0C0', width: 70, height: 70 }]}>
                                    <ThemedText style={{fontSize: 24, fontWeight: 'bold', color: '#555'}}>
                                        {topThree[1].name.charAt(0)}
                                    </ThemedText>
                                </View>
                                <ThemedText type="defaultSemiBold" style={{marginTop: 8}}>{topThree[1].name}</ThemedText>
                                <ThemedText style={{color: '#FF9F1C', fontWeight: 'bold'}}>{topThree[1].points} pts</ThemedText>
                            </View>
                        )}

                        {/* 1º PUESTO (Centro - Más grande y con corona) */}
                        {topThree[0] && (
                            <View style={[styles.podiumItem, { zIndex: 10 }]}>
                                <ThemedText style={{fontWeight: 'bold', marginBottom: 5}}>1º</ThemedText>
                                {/* Nota: Icono 'time' es temporal, usa 'crown' si tienes el pack completo o 'trophy' */}

                                <View style={[styles.avatarCircle, { borderColor: '#FFD700', width: 90, height: 90, borderWidth: 4 }]}>
                                    <ThemedText style={{fontSize: 32, fontWeight: 'bold', color: '#555'}}>
                                        {topThree[0].name.charAt(0)}
                                    </ThemedText>
                                </View>
                                <View style={styles.badge1}>
                                    <ThemedText style={{color: 'white', fontWeight: 'bold', fontSize: 12}}>1º</ThemedText>
                                </View>

                                <ThemedText type="title" style={{marginTop: 8, fontSize: 20}}>{topThree[0].name}</ThemedText>
                                <ThemedText style={{color: '#FF9F1C', fontWeight: 'bold', fontSize: 18}}>{topThree[0].points} pts</ThemedText>
                            </View>
                        )}

                        {/* 3º PUESTO (Derecha) */}
                        {topThree[2] && (
                            <View style={[styles.podiumItem, { marginTop: 60 }]}>
                                <ThemedText style={{fontWeight: 'bold', marginBottom: 5}}>3º</ThemedText>
                                <View style={[styles.avatarCircle, { borderColor: '#CD7F32', width: 60, height: 60 }]}>
                                    <ThemedText style={{fontSize: 20, fontWeight: 'bold', color: '#555'}}>
                                        {topThree[2].name.charAt(0)}
                                    </ThemedText>
                                </View>
                                <ThemedText type="defaultSemiBold" style={{marginTop: 8}}>{topThree[2].name}</ThemedText>
                                <ThemedText style={{color: '#FF9F1C', fontWeight: 'bold'}}>{topThree[2].points} pts</ThemedText>
                            </View>
                        )}
                    </View>
                )}

                {/* --- LISTA DEL RESTO (4º en adelante) --- */}
                <View style={styles.listContainer}>
                    {restOfUsers.map((user, index) => (
                        <View key={user.id} style={[styles.rankRow, { backgroundColor: cardColor }]}>
                            {/* Posición (Índice + 4 porque los 3 primeros están arriba) */}
                            <ThemedText style={styles.rankNumber}>{index + 4}</ThemedText>

                            {/* Avatar Pequeño */}
                            <View style={styles.smallAvatar}>
                                <ThemedText style={{fontSize: 14, fontWeight: 'bold', color: '#555'}}>
                                    {user.name.charAt(0)}
                                </ThemedText>
                            </View>

                            {/* Nombre */}
                            <View style={{flex: 1, paddingHorizontal: 10}}>
                                <ThemedText type="defaultSemiBold">{user.name}</ThemedText>
                            </View>

                            {/* Puntos */}
                            <View style={styles.pointsBadge}>
                                <ThemedText style={{color: '#fff', fontWeight: 'bold', fontSize: 12}}>{user.points} pts</ThemedText>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Espacio final para el tab bar */}
                <View style={{height: 100}} />

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
    scrollContent: {
        paddingBottom: 20,
    },

    // --- PODIUM STYLES ---
    podiumContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start', // Alineamos arriba, luego usamos margins para bajar el 2 y 3
        marginVertical: 20,
        paddingHorizontal: 10,
        gap: 15,
    },
    podiumItem: {
        alignItems: 'center',
        width: 100,
    },
    avatarCircle: {
        borderRadius: 50,
        backgroundColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
    },
    badge1: {
        position: 'absolute',
        bottom: 55, // Ajustar según tamaño
        backgroundColor: '#FFD700',
        paddingHorizontal: 8,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
        zIndex: 25,
    },

    // --- LISTA STYLES ---
    listContainer: {
        paddingHorizontal: 20,
        marginTop: 10,
        gap: 10,
    },
    rankRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 16,
    },
    rankNumber: {
        fontSize: 16,
        fontWeight: 'bold',
        width: 25,
        opacity: 0.5,
    },
    smallAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    pointsBadge: {
        backgroundColor: '#FF9F1C',
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 12,
    }
});