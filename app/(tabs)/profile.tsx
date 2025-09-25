import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useUserContext } from '@/contexts/UserContext';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const { user, userType, logout } = useUserContext();
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Cerrar Sesión', style: 'destructive', onPress: logout },
      ]
    );
  };

  const menuItems = [
    {
      id: 'edit-profile',
      title: 'Editar Perfil',
      icon: 'person-outline',
      action: () => console.log('Edit profile'),
    },
    {
      id: 'payment-methods',
      title: 'Métodos de Pago',
      icon: 'card-outline',
      action: () => console.log('Payment methods'),
    },
    {
      id: 'addresses',
      title: 'Direcciones',
      icon: 'location-outline',
      action: () => console.log('Addresses'),
    },
    {
      id: 'favorites',
      title: 'Favoritos',
      icon: 'heart-outline',
      action: () => console.log('Favorites'),
    },
    {
      id: 'help',
      title: 'Ayuda y Soporte',
      icon: 'help-circle-outline',
      action: () => console.log('Help'),
    },
    {
      id: 'terms',
      title: 'Términos y Condiciones',
      icon: 'document-text-outline',
      action: () => console.log('Terms'),
    },
    {
      id: 'privacy',
      title: 'Política de Privacidad',
      icon: 'shield-outline',
      action: () => console.log('Privacy'),
    },
  ];

  const providerMenuItems = [
    {
      id: 'business-profile',
      title: 'Perfil de Negocio',
      icon: 'business-outline',
      action: () => console.log('Business profile'),
    },
    {
      id: 'analytics',
      title: 'Analíticas',
      icon: 'analytics-outline',
      action: () => console.log('Analytics'),
    },
    {
      id: 'subscription',
      title: 'Suscripción',
      icon: 'diamond-outline',
      action: () => console.log('Subscription'),
    },
    ...menuItems,
  ];

  const currentMenuItems = userType === 'provider' ? providerMenuItems : menuItems;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Mi Perfil</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Ionicons name="settings-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <Image
            source={{ 
              uri: user?.avatar || 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=150' 
            }}
            style={styles.avatar}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{user?.name || 'Usuario'}</Text>
            <Text style={styles.email}>{user?.email || 'usuario@example.com'}</Text>
            {userType === 'provider' && (
              <View style={styles.providerBadge}>
                <Ionicons name="checkmark-circle" size={16} color="#00AA55" />
                <Text style={styles.providerBadgeText}>Proveedor Verificado</Text>
              </View>
            )}
            <View style={styles.statsContainer}>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>4.8</Text>
                <Text style={styles.statLabel}>Rating</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>
                  {userType === 'provider' ? '127' : '23'}
                </Text>
                <Text style={styles.statLabel}>
                  {userType === 'provider' ? 'Servicios' : 'Reservas'}
                </Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>
                  {userType === 'provider' ? '2.5k' : '45'}
                </Text>
                <Text style={styles.statLabel}>
                  {userType === 'provider' ? 'Clientes' : 'Reseñas'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Configuraciones Rápidas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configuración</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="notifications-outline" size={24} color="#0066CC" />
              <Text style={styles.settingText}>Notificaciones</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#E5E5E7', true: '#0066CC' }}
              thumbColor={notificationsEnabled ? '#fff' : '#f4f3f4'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="moon-outline" size={24} color="#0066CC" />
              <Text style={styles.settingText}>Modo Oscuro</Text>
            </View>
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              trackColor={{ false: '#E5E5E7', true: '#0066CC' }}
              thumbColor={darkModeEnabled ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.section}>
          {currentMenuItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.menuItem} onPress={item.action}>
              <View style={styles.menuLeft}>
                <Ionicons name={item.icon as any} size={24} color="#0066CC" />
                <Text style={styles.menuText}>{item.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>Versión 1.0.0</Text>
          <Text style={styles.copyright}>© 2024 ServiceMarket. Todos los derechos reservados.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileCard: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: 'center',
    marginBottom: 15,
  },
  profileInfo: {
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 10,
  },
  providerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 170, 85, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginBottom: 15,
  },
  providerBadgeText: {
    color: '#00AA55',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#F2F2F7',
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0066CC',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#8E8E93',
  },
  section: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    padding: 20,
    paddingBottom: 10,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutText: {
    fontSize: 16,
    color: '#FF3B30',
    fontWeight: '600',
    marginLeft: 10,
  },
  appInfo: {
    alignItems: 'center',
    paddingBottom: 30,
  },
  appVersion: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 5,
  },
  copyright: {
    fontSize: 12,
    color: '#8E8E93',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});