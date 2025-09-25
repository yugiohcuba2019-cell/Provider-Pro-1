import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { mockProviderServices } from '@/data/mockData';

export default function ServicesScreen() {
  const [services, setServices] = useState(mockProviderServices);

  const handleToggleService = (serviceId: string) => {
    setServices(prev => 
      prev.map(service => 
        service.id === serviceId 
          ? { ...service, active: !service.active }
          : service
      )
    );
  };

  const handleDeleteService = (serviceId: string) => {
    Alert.alert(
      'Eliminar Servicio',
      '¿Estás seguro de que quieres eliminar este servicio?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Eliminar', 
          style: 'destructive',
          onPress: () => {
            setServices(prev => prev.filter(service => service.id !== serviceId));
          }
        },
      ]
    );
  };

  const renderService = ({ item }: { item: any }) => (
    <View style={styles.serviceCard}>
      <Image source={{ uri: item.image }} style={styles.serviceImage} />
      <View style={styles.serviceContent}>
        <View style={styles.serviceHeader}>
          <Text style={styles.serviceTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <View style={styles.serviceActions}>
            <TouchableOpacity 
              style={styles.toggleButton}
              onPress={() => handleToggleService(item.id)}
            >
              <Ionicons 
                name={item.active ? 'eye' : 'eye-off'} 
                size={20} 
                color={item.active ? '#00AA55' : '#8E8E93'} 
              />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => console.log('Edit service', item.id)}
            >
              <Ionicons name="pencil" size={16} color="#0066CC" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.deleteButton}
              onPress={() => handleDeleteService(item.id)}
            >
              <Ionicons name="trash" size={16} color="#FF3B30" />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.serviceDescription} numberOfLines={2}>
          {item.description}
        </Text>

        <View style={styles.serviceStats}>
          <View style={styles.statItem}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.statText}>{item.rating}</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="time" size={14} color="#8E8E93" />
            <Text style={styles.statText}>{item.duration}</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="calendar" size={14} color="#8E8E93" />
            <Text style={styles.statText}>{item.bookings} reservas</Text>
          </View>
        </View>

        <View style={styles.serviceFooter}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${item.price}</Text>
            <Text style={styles.priceUnit}>/{item.unit}</Text>
          </View>
          <View style={styles.statusContainer}>
            <View 
              style={[
                styles.statusDot,
                { backgroundColor: item.active ? '#00AA55' : '#8E8E93' }
              ]} 
            />
            <Text style={[
              styles.statusText,
              { color: item.active ? '#00AA55' : '#8E8E93' }
            ]}>
              {item.active ? 'Activo' : 'Inactivo'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Mis Servicios</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => console.log('Add new service')}
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Stats Overview */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{services.length}</Text>
          <Text style={styles.statLabel}>Total Servicios</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {services.filter(s => s.active).length}
          </Text>
          <Text style={styles.statLabel}>Activos</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {services.reduce((sum, s) => sum + s.bookings, 0)}
          </Text>
          <Text style={styles.statLabel}>Reservas Totales</Text>
        </View>
      </View>

      {/* Services List */}
      <FlatList
        data={services}
        renderItem={renderService}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.servicesList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="construct-outline" size={64} color="#8E8E93" />
            <Text style={styles.emptyStateTitle}>No hay servicios</Text>
            <Text style={styles.emptyStateSubtitle}>
              Agrega tu primer servicio para comenzar
            </Text>
            <TouchableOpacity 
              style={styles.emptyStateButton}
              onPress={() => console.log('Add first service')}
            >
              <Text style={styles.emptyStateButtonText}>Agregar Servicio</Text>
            </TouchableOpacity>
          </View>
        }
      />
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
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#0066CC',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    marginHorizontal: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0066CC',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#8E8E93',
    textAlign: 'center',
  },
  servicesList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  serviceCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  serviceImage: {
    width: '100%',
    height: 120,
  },
  serviceContent: {
    padding: 15,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  serviceTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginRight: 10,
  },
  serviceActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleButton: {
    padding: 5,
    marginHorizontal: 2,
  },
  editButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0, 102, 204, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
  },
  deleteButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 12,
    lineHeight: 20,
  },
  serviceStats: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  statText: {
    fontSize: 12,
    color: '#8E8E93',
    marginLeft: 4,
  },
  serviceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0066CC',
  },
  priceUnit: {
    fontSize: 14,
    color: '#8E8E93',
    marginLeft: 2,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  emptyStateSubtitle: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    paddingHorizontal: 40,
    marginBottom: 30,
  },
  emptyStateButton: {
    backgroundColor: '#0066CC',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  emptyStateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});