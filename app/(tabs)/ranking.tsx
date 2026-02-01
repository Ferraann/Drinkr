import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function RankingScreen() {
    return (
        <ThemedView style={styles.container}>
            <ThemedText type="title">Ranking</ThemedText>
            <ThemedText>Aquí irá la lista de clasificación.</ThemedText>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});