import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Alert } from 'react-native';
import { auth } from '../../scripts/firebaseConfig';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);

  const handleAuth = async () => {
    if (!email || !password) return Alert.alert('Error', 'Rellena todos los campos');
    setLoading(true);
    try {
        const userCred = await signInWithEmailAndPassword(auth, email, password);
        console.log('Sesión iniciada por: ', userCred.user.uid);
        Alert.alert('Sesión iniciada como: ${email}');     
    } catch (error: any) {
        console.error('Error al iniciar sesión: ', error);
        Alert.alert('Error', 'Correo o contraseña incorrectos')
    } finally {
        setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!email || !password) return Alert.alert('Error', 'Rellena todos los campos');
    setLoading(true);
    try {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        console.log('Usuario registrado correctamente: ', userCred.user.uid);
        Alert.alert('Cuenta creada correctamente');
    } catch (error: any) {
        console.error('Error al crear la cuenta', error);
        Alert.alert('Error', error.message);
    } finally {
        setLoading(false);
    }
  };
}