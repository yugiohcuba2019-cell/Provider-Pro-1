import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useUserContext } from '@/contexts/UserContext';

export default function AuthScreen() {
  const { login } = useUserContext();
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<'client' | 'provider'>('client');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      Alert.alert('Error', 'Por favor completa todos los campos requeridos');
      return;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    setIsLoading(true);

    try {
      // Simular autenticación
      const userData = {
        id: '1',
        name: formData.name || 'Usuario Demo',
        email: formData.email,
        phone: formData.phone,
        avatar: userType === 'provider' 
          ? 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150'
          : 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=150',
      };

      await login(userData, userType);
    } catch (error) {
      Alert.alert('Error', 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = async (type: 'client' | 'provider') => {
    const userData = {
      id: '1',
      name: type === 'provider' ? 'Juan Pérez' : 'María García',
      email: type === 'provider' ? 'proveedor@example.com' : 'cliente@example.com',
      phone: '+1 234 567 8900',
      avatar: type === 'provider' 
        ? 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150'
        : 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=150',
    };

    await login(userData, type);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <LinearGradient
            colors={['#0066CC', '#4A90E2']}
            style={styles.header}
          >
            <Image
              source={{ uri: 'https://images.pexels.com/photos/3825584/pexels-photo-3825584.jpeg?auto=compress&cs=tinysrgb&w=200' }}
              style={styles.logo}
            />
            <Text style={styles.appTitle}>ServiceMarket</Text>
            <Text style={styles.appSubtitle}>
              Conectamos servicios con clientes
            </Text>
          </LinearGradient>

          <View style={styles.formContainer}>
            {/* User Type Selector */}
            <View style={styles.userTypeContainer}>
              <Text style={styles.userTypeTitle}>Soy un:</Text>
              <View style={styles.userTypeButtons}>
                <TouchableOpacity
                  style={[
                    styles.userTypeButton,
                    userType === 'client' && styles.activeUserTypeButton
                  ]}
                  onPress={() => setUserType('client')}
                >
                  <Ionicons 
                    name="person" 
                    size={20} 
                    color={userType === 'client' ? 'white' : '#0066CC'} 
                  />
                  <Text style={[
                    styles.userTypeButtonText,
                    userType === 'client' && styles.activeUserTypeButtonText
                  ]}>
                    Cliente
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.userTypeButton,
                    userType === 'provider' && styles.activeUserTypeButton
                  ]}
                  onPress={() => setUserType('provider')}
                >
                  <Ionicons 
                    name="construct" 
                    size={20} 
                    color={userType === 'provider' ? 'white' : '#0066CC'} 
                  />
                  <Text style={[
                    styles.userTypeButtonText,
                    userType === 'provider' && styles.activeUserTypeButtonText
                  ]}>
                    Proveedor
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Auth Toggle */}
            <View style={styles.authToggle}>
              <TouchableOpacity
                style={[
                  styles.authToggleButton,
                  isLogin && styles.activeAuthToggleButton
                ]}
                onPress={() => setIsLogin(true)}
              >
                <Text style={[
                  styles.authToggleText,
                  isLogin && styles.activeAuthToggleText
                ]}>
                  Iniciar Sesión
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.authToggleButton,
                  !isLogin && styles.activeAuthToggleButton
                ]}
                onPress={() => setIsLogin(false)}
              >
                <Text style={[
                  styles.authToggleText,
                  !isLogin && styles.activeAuthToggleText
                ]}>
                  Registrarse
                </Text>
              </TouchableOpacity>
            </View>

            {/* Form */}
            <View style={styles.form}>
              {!isLogin && (
                <View style={styles.inputContainer}>
                  <Ionicons name="person-outline" size={20} color="#8E8E93" />
                  <TextInput
                    style={styles.input}
                    placeholder="Nombre completo"
                    value={formData.name}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
                  />
                </View>
              )}

              <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={20} color="#8E8E93" />
                <TextInput
                  style={styles.input}
                  placeholder="Correo electrónico"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={formData.email}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
                />
              </View>

              {!isLogin && (
                <View style={styles.inputContainer}>
                  <Ionicons name="call-outline" size={20} color="#8E8E93" />
                  <TextInput
                    style={styles.input}
                    placeholder="Teléfono"
                    keyboardType="phone-pad"
                    value={formData.phone}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, phone: text }))}
                  />
                </View>
              )}

              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color="#8E8E93" />
                <TextInput
                  style={styles.input}
                  placeholder="Contraseña"
                  secureTextEntry
                  value={formData.password}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, password: text }))}
                />
              </View>

              {!isLogin && (
                <View style={styles.inputContainer}>
                  <Ionicons name="lock-closed-outline" size={20} color="#8E8E93" />
                  <TextInput
                    style={styles.input}
                    placeholder="Confirmar contraseña"
                    secureTextEntry
                    value={formData.confirmPassword}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, confirmPassword: text }))}
                  />
                </View>
              )}

              <TouchableOpacity
                style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
                onPress={handleSubmit}
                disabled={isLoading}
              >
                <Text style={styles.submitButtonText}>
                  {isLoading ? 'Cargando...' : isLogin ? 'Iniciar Sesión' : 'Registrarse'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Demo Login Buttons */}
            <View style={styles.demoSection}>
              <Text style={styles.demoTitle}>Acceso Demo:</Text>
              <TouchableOpacity
                style={styles.demoButton}
                onPress={() => handleQuickLogin('client')}
              >
                <Ionicons name="person" size={20} color="#0066CC" />
                <Text style={styles.demoButtonText}>Ingresar como Cliente</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.demoButton}
                onPress={() => handleQuickLogin('provider')}
              >
                <Ionicons name="construct" size={20} color="#0066CC" />
                <Text style={styles.demoButtonText}>Ingresar como Proveedor</Text>
              </TouchableOpacity>
            </View>

            {/* Terms */}
            <Text style={styles.termsText}>
              Al continuar, aceptas nuestros{' '}
              <Text style={styles.termsLink}>Términos de Servicio</Text>{' '}
              y{' '}
              <Text style={styles.termsLink}>Política de Privacidad</Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 40,
    paddingTop: 60,
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 20,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
    marginBottom: 8,
  },
  appSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -20,
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  userTypeContainer: {
    marginBottom: 30,
  },
  userTypeTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  userTypeButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  userTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: '#0066CC',
    minWidth: 120,
    justifyContent: 'center',
  },
  activeUserTypeButton: {
    backgroundColor: '#0066CC',
  },
  userTypeButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#0066CC',
  },
  activeUserTypeButtonText: {
    color: 'white',
  },
  authToggle: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F7',
    borderRadius: 25,
    padding: 4,
    marginBottom: 30,
  },
  authToggleButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 21,
    alignItems: 'center',
  },
  activeAuthToggleButton: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  authToggleText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#8E8E93',
  },
  activeAuthToggleText: {
    color: '#333',
    fontWeight: '600',
  },
  form: {
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
    paddingVertical: 15,
  },
  submitButton: {
    backgroundColor: '#0066CC',
    borderRadius: 15,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  submitButtonDisabled: {
    backgroundColor: '#8E8E93',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  demoSection: {
    borderTopWidth: 1,
    borderTopColor: '#E5E5E7',
    paddingTop: 20,
    marginBottom: 30,
  },
  demoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  demoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 102, 204, 0.1)',
    borderRadius: 15,
    paddingVertical: 12,
    marginBottom: 10,
  },
  demoButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#0066CC',
  },
  termsText: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 20,
  },
  termsLink: {
    color: '#0066CC',
    textDecorationLine: 'underline',
  },
});