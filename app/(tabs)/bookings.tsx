import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { mockBookings } from '@/data/mockData';

export default function BookingsScreen() {
  const [selectedTab, setSelectedTab] = useState('upcoming');

  const filterBookings = () => {
    return mockBookings.filter(booking => {
      switch (selectedTab) {
        case 'upcoming':
          return booking.status === 'confirmed' || booking.status === 'pending';
        case 'completed':
          return booking.status === 'completed';
        case 'cancelled':
          return booking.status === 'cancelled';
        default:
          return true;
      }
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return '#00AA55';
      case 'pending': return '#FF6B35';
      case 'completed': return '#0066CC';
      case 'cancelled': return '#FF3B30';
      default: return '#8E8E93';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmado';
      case 'pending': return 'Pendiente';
      case 'completed': return 'Completado';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  const renderBooking = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.bookingCard}>
      <Image source={{ uri: item.serviceImage }} style={styles.serviceImage} />
      <View style={styles.bookingContent}>
        <View style={styles.bookingHeader}>
          <Text style={styles.serviceTitle} numberOfLines={2}>
            {item.serviceTitle}
          </Text>
          <View 
            style={[
              styles.statusBadge, 
              { backgroundColor: getStatusColor(item.status) }
            ]}
          >
            <Text style={styles.statusText}>
              {getStatusText(item.status)}
            </Text>
          </View>
        </View>
        
        <Text style={styles.providerName}>{item.providerName}</Text>
        
        <View style={styles.bookingDetails}>
          <View style={styles.detailRow}>
            <Ionicons name="calendar-outline" size={16} color="#8E8E93" />
            <Text style={styles.detailText}>{item.date}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="time-outline" size={16} color="#8E8E93" />
            <Text style={styles.detailText}>{item.time}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="location-outline" size={16} color="#8E8E93" />
            <Text style={styles.detailText} numberOfLines={1}>
              {item.location}
            </Text>
          </View>
        </View>

        <View style={styles.bookingFooter}>
          <Text style={styles.price}>${item.price}</Text>
          <View style={styles.actionButtons}>
            {item.status === 'pending' && (
              <>
                <TouchableOpacity style={styles.cancelButton}>
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.contactButton}>
                  <Ionicons name="chatbubble-outline" size={16} color="#0066CC" />
                </TouchableOpacity>
              </>
            )}
            {item.status === 'confirmed' && (
              <TouchableOpacity style={styles.contactButton}>
                <Ionicons name="chatbubble-outline" size={16} color="#0066CC" />
              </TouchableOpacity>
            )}
            {item.status === 'completed' && (
              <TouchableOpacity style={styles.reviewButton}>
                <Text style={styles.reviewButtonText}>Calificar</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const tabs = [
    { id: 'upcoming', title: 'Próximas', count: filterBookings().length },
    { id: 'completed', title: 'Completadas', count: 0 },
    { id: 'cancelled', title: 'Canceladas', count: 0 },
  ];

  // Update counts for each tab
  tabs[0].count = mockBookings.filter(b => b.status === 'confirmed' || b.status === 'pending').length;
  tabs[1].count = mockBookings.filter(b => b.status === 'completed').length;
  tabs[2].count = mockBookings.filter(b => b.status === 'cancelled').length;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Mis Reservas</Text>
        <TouchableOpacity style={styles.calendarButton}>
          <Ionicons name="calendar-outline" size={24} color="#0066CC" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.tabsContainer}
      >
        <View style={styles.tabs}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tab,
                selectedTab === tab.id && styles.activeTab
              ]}
              onPress={() => setSelectedTab(tab.id)}
            >
              <Text style={[
                styles.tabText,
                selectedTab === tab.id && styles.activeTabText
              ]}>
                {tab.title} ({tab.count})
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bookings List */}
      <FlatList
        data={filterBookings()}
        renderItem={renderBooking}
        keyExtractor={(item) => item.id}
        style={styles.bookingsList}
        contentContainerStyle={styles.bookingsContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons 
              name={
                selectedTab === 'upcoming' ? 'calendar-outline' :
                selectedTab === 'completed' ? 'checkmark-circle-outline' :
                'close-circle-outline'
              } 
              size={64} 
              color="#8E8E93" 
            />
            <Text style={styles.emptyStateTitle}>
              No hay reservas {selectedTab === 'upcoming' ? 'próximas' : selectedTab}
            </Text>
            <Text style={styles.emptyStateSubtitle}>
              {selectedTab === 'upcoming' 
                ? 'Reserva un servicio para verlo aquí'
                : `Las reservas ${selectedTab} aparecerán en esta sección`
              }
            </Text>
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
  calendarButton: {
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
  tabsContainer: {
    marginBottom: 15,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  tab: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#E5E5E7',
  },
  activeTab: {
    backgroundColor: '#0066CC',
    borderColor: '#0066CC',
  },
  tabText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  activeTabText: {
    color: 'white',
    fontWeight: '600',
  },
  bookingsList: {
    flex: 1,
  },
  bookingsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  bookingCard: {
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
  bookingContent: {
    padding: 15,
  },
  bookingHeader: {
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
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  providerName: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 12,
  },
  bookingDetails: {
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
    flex: 1,
  },
  bookingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0066CC',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  contactButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 102, 204, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewButton: {
    backgroundColor: '#0066CC',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  reviewButtonText: {
    color: 'white',
    fontSize: 14,
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
  },
});