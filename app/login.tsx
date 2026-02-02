import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { ArrowRight, Beer, Chrome, Lock, Mail, User } from 'lucide-react-native';
import { MotiView } from 'moti';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../scripts/firebaseConfig';

export default function LoginScreen() {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();


  const handleAuth = async () => {
    if (!email || !password) return Alert.alert('Error', 'Rellena todos los campos');
    setLoading(true);
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      console.log('Sesión iniciada por:', userCred.user.uid);
      Alert.alert('Sesión iniciada', `Has iniciado sesión como ${email}`);
    } catch (error: any) {
      console.error('Error al iniciar sesión:', error);
      Alert.alert('Error', 'Correo o contraseña incorrectos');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword) {
      return Alert.alert('Error', 'Por favor completa todos los campos');
    }
    if (password !== confirmPassword) {
      return Alert.alert('Error', 'Las contraseñas no coinciden');
    }

    setLoading(true);
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Usuario registrado:', userCred.user.uid);

      // Guardar nombre de usuario en Firestore
      await setDoc(doc(db, 'usuarios', userCred.user.uid), {
        username,
        email,
        createdAt: new Date(),
      });

      Alert.alert('Cuenta creada', 'Tu cuenta ha sido creada correctamente');
      setIsRegister(false);
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      console.error('Error al crear la cuenta', error);
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Fondo decorativo */}
      <View style={styles.bgTop} />
      <View style={styles.bgCircle} />

      <MotiView from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }} style={styles.card}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Beer size={28} color="#fff" />
          </View>
          <Text style={styles.title}>{isRegister ? 'Create Account' : 'Welcome Back'}</Text>
          <Text style={styles.subtitle}>
            {isRegister ? 'Join the fun 🍻' : 'Log in to sync your rounds 🍺'}
          </Text>
        </View>

        {/* Campos */}
        {isRegister && (
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.label}>Username</Text>
            <View style={styles.inputWrapper}>
              <User size={18} color="#aaa" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#999"
                value={username}
                onChangeText={setUsername}
              />
            </View>
          </View>
        )}

        <View style={{ marginBottom: 10 }}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputWrapper}>
            <Mail size={18} color="#aaa" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="cheers@example.com"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWrapper}>
            <Lock size={18} color="#aaa" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="#999"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
        </View>

        {isRegister && (
          <View style={{ marginBottom: 16 }}>
            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.inputWrapper}>
              <Lock size={18} color="#aaa" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#999"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>
          </View>
        )}

        {/* Botón principal */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={isRegister ? handleRegister : handleAuth}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Text style={styles.loginText}>{isRegister ? 'Sign Up' : 'Login'}</Text>
              <ArrowRight size={18} color="#fff" />
            </>
          )}
        </TouchableOpacity>

        {/* Divider */}
        {!isRegister && (
          <>
            <View style={styles.divider}>
              <View style={styles.line} />
              <Text style={styles.dividerText}>Or continue with</Text>
              <View style={styles.line} />
            </View>

            {/* 🔥 Solo botón de Google */}
            <View style={styles.socialRow}>
              <TouchableOpacity style={styles.socialButton}>
                <Chrome size={18} color="#444" />
                <Text style={styles.socialText}>Google</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {/* Registro / Login toggle */}
        <TouchableOpacity onPress={() => setIsRegister(!isRegister)}>
          <Text style={styles.signupText}>
            {isRegister ? (
              <>
                Already have an account?{' '}
                <Text style={styles.signupHighlight}>Login</Text>
              </>
            ) : (
              <>
                Don’t have an account?{' '}
                <Text style={styles.signupHighlight}>Sign Up</Text>
              </>
            )}
          </Text>
        </TouchableOpacity>
      </MotiView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#faf7f4', alignItems: 'center', justifyContent: 'center' },
  bgTop: { position: 'absolute', top: 0, left: 0, width: '100%', height: '50%', backgroundColor: '#1C1917', borderBottomLeftRadius: 40, borderBottomRightRadius: 40 },
  bgCircle: { position: 'absolute', top: 100, left: -80, width: 200, height: 200, backgroundColor: 'rgba(245,158,11,0.15)', borderRadius: 100 },
  card: { width: '85%', backgroundColor: '#fff', borderRadius: 24, padding: 24, shadowColor: '#000', shadowOpacity: 0.08, shadowOffset: { width: 0, height: 6 }, shadowRadius: 12, elevation: 8 },
  logoContainer: { alignItems: 'center', marginBottom: 28 },
  logo: { backgroundColor: '#f59e0b', borderRadius: 16, width: 60, height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  title: { fontSize: 22, fontWeight: '900', color: '#1C1917' },
  subtitle: { fontSize: 13, color: '#78716c', fontWeight: '500' },
  label: { color: '#78716c', fontSize: 12, fontWeight: '700', marginBottom: 4, textTransform: 'uppercase' },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f5f5f4', borderRadius: 12, borderWidth: 1, borderColor: '#e7e5e4', paddingHorizontal: 10 },
  inputIcon: { marginRight: 6 },
  input: { flex: 1, height: 44, color: '#111' },
  loginButton: { backgroundColor: '#1C1917', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6, paddingVertical: 14, borderRadius: 12, marginTop: 10, marginBottom: 20, shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 10, elevation: 5 },
  loginText: { color: '#fff', fontSize: 16, fontWeight: '700', marginRight: 6 },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: 18 },
  line: { flex: 1, height: 1, backgroundColor: '#e7e5e4' },
  dividerText: { color: '#a8a29e', fontSize: 12, fontWeight: '700', marginHorizontal: 8, textTransform: 'uppercase' },
  socialRow: { flexDirection: 'row', gap: 12, justifyContent: 'center', marginBottom: 18 },
  socialButton: { flexDirection: 'row', alignItems: 'center', gap: 6, borderWidth: 1, borderColor: '#e7e5e4', borderRadius: 12, paddingVertical: 10, paddingHorizontal: 20, backgroundColor: '#fff' },
  socialText: { fontWeight: '700', color: '#444' },
  signupText: { textAlign: 'center', color: '#78716c', fontSize: 13 },
  signupHighlight: { color: '#1C1917', fontWeight: '900' },
});
