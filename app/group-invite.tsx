import { StyleSheet, View, TouchableOpacity, Share, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard'; // Opcional, si tienes expo-clipboard instalado, si no usamos Alert

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function GroupInviteScreen() {
    const backgroundColor = useThemeColor({}, 'background');
    const textColor = useThemeColor({}, 'text');
    const cardColor = useThemeColor({ light: '#F5F5F5', dark: '#2A2A2A' }, 'background');

    const GROUP_CODE = "DRINK-92X";

    // Función para compartir nativamente (WhatsApp, Telegram, etc)
    const onShare = async () => {
        try {
            await Share.share({
                message: `¡Únete a mi grupo en Drinkr! Usa el código: ${GROUP_CODE} o descarga la app aquí: https://drinkr.app`,
            });
        } catch (error) {
            alert(error.message);
        }
    };

    const copyToClipboard = () => {
        // Si tienes 'expo-clipboard' instalado: await Clipboard.setStringAsync(GROUP_CODE);
        Alert.alert("Copiado", "Código copiado al portapapeles.");
    };

    return (
        <ThemedView style={{ flex: 1 }}>
            <Stack.Screen
                options={{
                    title: 'Invitar Amigos',
                    headerBackTitle: 'Ajustes',
                    headerTintColor: '#FF9F1C',
                    headerStyle: { backgroundColor },
                    headerTitleStyle: { color: textColor },
                }}
            />

            <View style={styles.container}>

                <View style={styles.centerContent}>
                    <ThemedText type="title" style={{textAlign: 'center', marginBottom: 10}}>
                        ¡Haz crecer la fiesta!
                    </ThemedText>
                    <ThemedText style={{textAlign: 'center', opacity: 0.7, marginBottom: 30}}>
                        Comparte este código con tus amigos para que se unan a tu grupo y compitan en el ranking.
                    </ThemedText>

                    {/* Simulación QR */}
                    <View style={styles.qrPlaceholder}>
                        <Ionicons name="qr-code" size={150} color="#333" />
                    </View>

                    {/* Código de Grupo */}
                    <View style={[styles.codeBox, { backgroundColor: cardColor }]}>
                        <View>
                            <ThemedText style={{fontSize: 12, opacity: 0.5, textTransform: 'uppercase'}}>
                                Código de Grupo
                            </ThemedText>
                            <ThemedText type="title" style={{color: '#FF9F1C', letterSpacing: 2}}>
                                {GROUP_CODE}
                            </ThemedText>
                        </View>
                        <TouchableOpacity onPress={copyToClipboard} style={styles.copyBtn}>
                            <Ionicons name="copy-outline" size={24} color={textColor} />
                        </TouchableOpacity>
                    </View>

                </View>

                {/* Botón Compartir */}
                <TouchableOpacity style={styles.shareButton} onPress={onShare}>
                    <Ionicons name="share-outline" size={24} color="white" style={{marginRight: 10}} />
                    <ThemedText style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>
                        Compartir Enlace
                    </ThemedText>
                </TouchableOpacity>

            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-between', // Separa contenido del botón abajo
        paddingBottom: 40,
    },
    centerContent: {
        alignItems: 'center',
        marginTop: 20,
    },
    qrPlaceholder: {
        width: 220,
        height: 220,
        backgroundColor: 'white',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    codeBox: {
        flexDirection: 'row',
        width: '100%',
        padding: 20,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    copyBtn: {
        padding: 10,
        backgroundColor: 'rgba(150,150,150,0.1)',
        borderRadius: 10,
    },
    shareButton: {
        backgroundColor: '#FF9F1C',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 18,
        borderRadius: 20,
        shadowColor: "#FF9F1C",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    }
});