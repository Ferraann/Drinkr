import { StyleSheet, Image, View, TouchableOpacity, ScrollView, SafeAreaView, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HelloWave } from '@/components/hello-wave';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function HomeScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  // Creamos un color específico para las cajas:
  // Un gris muy clarito en modo claro, y un gris oscuro en modo oscuro
  const boxBackgroundColor = useThemeColor({ light: '#F5F5F5', dark: '#2A2A2A' }, 'background');

  return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>

        {/* --- HEADER --- */}
        <View style={[styles.headerContainer, { backgroundColor }]}>
          <View style={styles.leftGroup}>
            <Image
                source={require('@/assets/images/isotipo.png')}
                style={styles.logo}
            />
            <ThemedText type="title" style={{ fontSize: 24, lineHeight: 32 }}>Drinkr</ThemedText>
          </View>

          <View style={styles.rightGroup}>
            <TouchableOpacity style={styles.orangeButton} onPress={() => alert('Etiqueta')}>
              <Ionicons name="pricetag" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.blackButton} onPress={() => alert('Añadir')}>
              <Ionicons name="add" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* --- BODY --- */}
        <ThemedView style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.scrollContent}>

            {/* CONTENEDOR DE LAS CAJAS */}
            <View style={styles.boxesContainer}>

              {/* --- CAJA 1: Puntos --- */}
              <View style={[styles.box, { backgroundColor: boxBackgroundColor }]}>
                <View style={styles.boxHeader}>
                  {/* Icono de estadísticas en el color del texto */}
                  <Ionicons name="stats-chart" size={18} color={textColor} />
                  <ThemedText type="defaultSemiBold" style={{fontSize: 14}}>Puntos</ThemedText>
                </View>
                {/* Número grande */}
                <ThemedText type="title" style={{fontSize: 28}}>120</ThemedText>
              </View>

              {/* --- CAJA 2: Líder --- */}
              <View style={[styles.box, { backgroundColor: boxBackgroundColor }]}>
                <View style={styles.boxHeader}>
                  {/* Icono Trofeo Naranja */}
                  <Ionicons name="trophy" size={18} color="#FF9F1C" />
                  <ThemedText type="defaultSemiBold" style={{fontSize: 14}}>Líder</ThemedText>
                </View>
                {/* Nombre del líder */}
                <ThemedText type="title" style={{fontSize: 22}} numberOfLines={1}>Javi</ThemedText>
              </View>

            </View>

          </ScrollView>
        </ThemedView>
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
  rightGroup: {
    flexDirection: 'row',
    gap: 12,
  },
  orangeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF9F1C',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  blackButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#333',
  },
  scrollContent: {
    padding: 20,
  },

  // --- NUEVOS ESTILOS PARA LAS CAJAS ---
  boxesContainer: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 20,
  },
  box: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    justifyContent: 'space-between',
    minHeight: 100,
  },
  boxHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
    opacity: 0.8,
  },
});