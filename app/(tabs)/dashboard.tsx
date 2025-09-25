import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useUserContext } from '@/contexts/UserContext';

const { width } = Dimensions.get('window');

export default function DashboardScreen() {
  const { user } = useUserContext();
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const stats = {
    revenue: 2450,
    bookings: 12,
    rating: 4.8,
    completedJobs: 45,
  };

  const recentBookings = [
    {
      id: '1',
      service: 'Limpieza Profunda',
      client: 'María García',
      date: 'Hoy, 2:00 PM',
      status: 'confirmed',
      amount: 120,
    },
    {
      id: '2',
      service: 'Reparación Plomería',
      client: 'Carlos Ruiz',
      date: 'Mañana, 10:00 AM',
      status: 'pending',
      amount: 200,
    },
    {
      id: '3',
      service: 'Electricidad Residencial',
      client: 'Ana López',
      date: '15 Dic, 4:00 PM',
      status: 'confirmed',
      amount: 180,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return '#00AA55';
      case 'pending': return '#FF6B35';
      default: return '#8E8E93';
    }
  };

  const periods = [
    { id: 'week', title: 'Semana' },
    { id: 'month', title: 'Mes' },
    { id: 'year', title: 'Año' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>¡Hola, {user?.name || 'Proveedor'}! 👋</Text>
            <Text style={styles.subtitle}>Aquí está tu resumen de hoy</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color="#333" />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>

        {/* Period Selector */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.periodSelector}
        >
          <View style={styles.periodButtons}>
            {periods.map((period) => (
              <TouchableOpacity
                key={period.id}
                style={[
                  styles.periodButton,
                  selectedPeriod === period.id && styles.activePeriodButton
                ]}
                onPress={() => setSelectedPeriod(period.id)}
              >
                <Text style={[
                  styles.periodButtonText,
                  selectedPeriod === period.id && styles.activePeriodButtonText
                ]}>
                  {period.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <LinearGradient
              colors={['#0066CC', '#4A90E2']}
              style={[styles.statCard, styles.largeCard]}
            >
              <Text style={styles.statValue}>${stats.revenue.toLocaleString()}</Text>
              <Text style={styles.statLabel}>Ingresos esta semana</Text>
              <View style={styles.statTrend}>
                <Ionicons name="trending-up" size={16} color="white" />
                <Text style={styles.trendText}>+12%</Text>
              </View>
            </LinearGradient>

            <View style={styles.rightStats}>
              <View style={[styles.statCard, styles.smallCard]}>
                <Text style={styles.smallStatValue}>{stats.bookings}</Text>
                <Text style={styles.smallStatLabel}>Reservas</Text>
              </View>
              
              <View style={[styles.statCard, styles.smallCard, styles.ratingCard]}>
                <View style={styles.ratingRow}>
                  <Text style={styles.smallStatValue}>{stats.rating}</Text>
                  <Ionicons name="star" size={16} color="#FFD700" />
                </View>
                <Text style={styles.smallStatLabel}>Rating</Text>
              </View>
            </View>
          </View>

          <View style={styles.bottomStatsRow}>
            <View style={[styles.statCard, styles.mediumCard]}>
              <Text style={styles.mediumStatValue}>{stats.completedJobs}</Text>
              <Text style={styles.mediumStatLabel}>Trabajos Completados</Text>
              <View style={styles.statIcon}>
                <Ionicons name="checkmark-circle" size={24} color="#00AA55" />
              </View>
            </View>

            <View style={[styles.statCard, styles.mediumCard]}>
              <Text style={styles.mediumStatValue}>$850</Text>
              <Text style={styles.mediumStatLabel}>Promedio por Servicio</Text>
              <View style={styles.statIcon}>
                <Ionicons name="cash" size={24} color="#FF6B35" />
              </View>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionIcon}>
                <Ionicons name="add-circle" size={24} color="#0066CC" />
              </View>
              <Text style={styles.actionText}>Nuevo Servicio</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionIcon}>
                <Ionicons name="calendar" size={24} color="#00AA55" />
              </View>
              <Text style={styles.actionText}>Horarios</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionIcon}>
                <Ionicons name="analytics" size={24} color="#FF6B35" />
              </View>
              <Text style={styles.actionText}>Reportes</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionIcon}>
                <Ionicons name="settings" size={24} color="#8E44AD" />
              </View>
              <Text style={styles.actionText}>Configurar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Bookings */}
        <View style={styles.recentBookings}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Reservas Recientes</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Ver todas</Text>
            </TouchableOpacity>
          </View>

          {recentBookings.map((booking) => (
            <View key={booking.id} style={styles.bookingItem}>
              <View style={styles.bookingInfo}>
                <Text style={styles.bookingService}>{booking.service}</Text>
                <Text style={styles.bookingClient}>{booking.client}</Text>
                <Text style={styles.bookingDate}>{booking.date}</Text>
              </View>
              <View style={styles.bookingRight}>
                <Text style={styles.bookingAmount}>${booking.amount}</Text>
                <View 
                  style={[
                    styles.bookingStatus,
                    { backgroundColor: getStatusColor(booking.status) }
                  ]}
                >
                  <Text style={styles.bookingStatusText}>
                    {booking.status === 'confirmed' ? 'Confirmado' : 'Pendiente'}
                  </Text>
                </View>
              </View>
            </View>
          ))}
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
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    marginTop: 4,
  },
  notificationButton: {
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
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
  },
  periodSelector: {
    marginBottom: 20,
  },
  periodButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  periodButton: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E5E7',
  },
  activePeriodButton: {
    backgroundColor: '#0066CC',
    borderColor: '#0066CC',
  },
  periodButtonText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  activePeriodButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  statsContainer: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  largeCard: {
    flex: 1,
    marginRight: 10,
    height: 120,
  },
  rightStats: {
    width: (width - 60) * 0.4,
  },
  smallCard: {
    height: 55,
    marginBottom: 10,
  },
  ratingCard: {
    height: 55,
  },
  bottomStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mediumCard: {
    width: (width - 50) / 2,
    height: 80,
  },
  statCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
  },
  statTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 15,
    right: 15,
  },
  trendText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  smallStatValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  smallStatLabel: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mediumStatValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 5,
  },
  mediumStatLabel: {
    fontSize: 12,
    color: '#8E8E93',
  },
  statIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  quickActions: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: (width - 55) / 2,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 102, 204, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  recentBookings: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  seeAllText: {
    fontSize: 14,
    color: '#0066CC',
    fontWeight: '600',
  },
  bookingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  bookingInfo: {
    flex: 1,
  },
  bookingService: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  bookingClient: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 2,
  },
  bookingDate: {
    fontSize: 12,
    color: '#8E8E93',
  },
  bookingRight: {
    alignItems: 'flex-end',
  },
  bookingAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0066CC',
    marginBottom: 6,
  },
  bookingStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  bookingStatusText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
});