import { useState } from 'react';
import { StyleSheet, Image, View, TouchableOpacity, ScrollView, Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function HomeScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const boxBackgroundColor = useThemeColor({ light: '#F5F5F5', dark: '#2A2A2A' }, 'background');

  const [myPoints, setMyPoints] = useState(0);

  const addPoints = (amount: number) => {
    setMyPoints(myPoints + amount);
  };

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
            <TouchableOpacity style={styles.blackButton} onPress={() => alert('Menú')}>
              <Ionicons name="add-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* --- BODY --- */}
        <ThemedView style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.scrollContent}>

            {/* CAJAS PEQUEÑAS */}
            <View style={styles.boxesContainer}>
              <View style={[styles.box, { backgroundColor: boxBackgroundColor }]}>
                <View style={styles.boxHeader}>
                  <Ionicons name="people" size={18} color={textColor} />
                  <ThemedText type="defaultSemiBold" style={{fontSize: 14}}>Grupo</ThemedText>
                </View>
                <ThemedText type="title" style={{fontSize: 28}}>450</ThemedText>
              </View>

              <View style={[styles.box, { backgroundColor: boxBackgroundColor }]}>
                <View style={styles.boxHeader}>
                  <Ionicons name="trophy" size={18} color="#FF9F1C" />
                  <ThemedText type="defaultSemiBold" style={{fontSize: 14}}>Líder</ThemedText>
                </View>
                <ThemedText type="title" style={{fontSize: 22}} numberOfLines={1}>Javi</ThemedText>
              </View>
            </View>

            {/* --- CAJA GRANDE --- */}
            <View style={[styles.bigBox, { backgroundColor: boxBackgroundColor }]}>

              <View style={styles.bigBoxHeader}>
                <View style={{justifyContent: 'center'}}>
                  <ThemedText type="subtitle" style={{color: '#FF9F1C'}}>Tu Marcador</ThemedText>
                  <ThemedText type="defaultSemiBold" style={{opacity: 0.6}}>Javi</ThemedText>
                </View>

                {/* AQUI ESTABA EL PROBLEMA */}
                <ThemedText style={styles.score}>{myPoints}</ThemedText>
              </View>

              <View style={{height: 1, backgroundColor: textColor, opacity: 0.1, marginVertical: 15}} />

              <ThemedText style={{marginBottom: 10, opacity: 0.7}}>¿Qué te tomas?</ThemedText>

              <View style={styles.drinkButtonsRow}>
                <TouchableOpacity style={styles.drinkBtn} onPress={() => addPoints(1)}>
                  <View style={styles.drinkIconCircle}>
                    <Ionicons name="beer" size={24} color="#FF9F1C" />
                  </View>
                  <ThemedText style={{fontSize: 12, marginTop: 5}}>Caña (+1)</ThemedText>
                </TouchableOpacity>

                <TouchableOpacity style={styles.drinkBtn} onPress={() => addPoints(2)}>
                  <View style={styles.drinkIconCircle}>
                    <Ionicons name="wine" size={24} color="#A020F0" />
                  </View>
                  <ThemedText style={{fontSize: 12, marginTop: 5}}>Copa (+2)</ThemedText>
                </TouchableOpacity>

                <TouchableOpacity style={styles.drinkBtn} onPress={() => addPoints(3)}>
                  <View style={styles.drinkIconCircle}>
                    <Ionicons name="flame" size={24} color="#FF4500" />
                  </View>
                  <ThemedText style={{fontSize: 12, marginTop: 5}}>Shot (+3)</ThemedText>
                </TouchableOpacity>
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
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  blackButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  scrollContent: {
    padding: 20,
  },
  boxesContainer: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 20,
  },
  box: {
    flex: 1,
    padding: 16,
    borderRadius: 20,
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
  bigBox: {
    width: '100%',
    padding: 20,
    borderRadius: 24,
    marginBottom: 20,
  },
  bigBoxHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
  },
  drinkButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  drinkBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  drinkIconCircle: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  // ESTILO ARREGLADO
  score: {
    fontSize: 48,
    fontWeight: 'bold',
    lineHeight: 56,
    includeFontPadding: false,
    textAlignVertical: 'center',
  }
});