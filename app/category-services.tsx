import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import ServiceCard from '@/components/services/ServiceCard';
import { mockServices } from '@/data/mockData';

export default function CategoryServicesScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredServices, setFilteredServices] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState('relevance');

  const categoryName = params.categoryName as string;
  const categoryColor = params.categoryColor as string;

  useEffect(() => {
    filterServices();
  }, [searchQuery, sortBy]);

  const filterServices = () => {
    let filtered = mockServices.filter(service => 
      service.category === categoryName
    );

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(service =>
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort services
    switch (sortBy) {
      case 'price_low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'distance':
        filtered.sort((a, b) => a.location.distance - b.location.distance);
        break;
      default:
        // Keep original order for relevance
        break;
    }

    setFilteredServices(filtered);
  };

  const sortOptions = [
    { id: 'relevance', title: 'Relevancia' },
    { id: 'price_low', title: 'Precio: Menor' },
    { id: 'price_high', title: 'Precio: Mayor' },
    { id: 'rating', title: 'Mejor Calificados' },
    { id: 'distance', title: 'Más Cercanos' },
  ];

  const renderService = ({ item }: { item: any }) => (
    <TouchableOpacity
      onPress={() => router.push({
        pathname: '/service-details',
        params: { serviceId: item.id }
      })}
    >
      <ServiceCard service={item} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.title}>{categoryName}</Text>
          <Text style={styles.subtitle}>{filteredServices.length} servicios disponibles</Text>
        </View>
        <View style={[styles.categoryIcon, { backgroundColor: categoryColor }]}>
          <Ionicons name="construct" size={20} color="white" />
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#8E8E93" />
          <TextInput
            style={styles.searchInput}
            placeholder={`Buscar en ${categoryName}...`}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#8E8E93" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Sort Options */}
      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Ordenar por:</Text>
        <View style={styles.sortOptions}>
          {sortOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.sortOption,
                sortBy === option.id && styles.activeSortOption
              ]}
              onPress={() => setSortBy(option.id)}
            >
              <Text style={[
                styles.sortOptionText,
                sortBy === option.id && styles.activeSortOptionText
              ]}>
                {option.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Services List */}
      <FlatList
        data={filteredServices}
        renderItem={renderService}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.servicesRow}
        contentContainerStyle={styles.servicesList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="search" size={64} color="#8E8E93" />
            <Text style={styles.emptyStateTitle}>No se encontraron servicios</Text>
            <Text style={styles.emptyStateSubtitle}>
              Intenta ajustar tu búsqueda o filtros
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E7',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 2,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  sortContainer: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sortLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  sortOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sortOption: {
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E5E7',
  },
  activeSortOption: {
    backgroundColor: '#0066CC',
    borderColor: '#0066CC',
  },
  sortOptionText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  activeSortOptionText: {
    color: 'white',
  },
  servicesList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  servicesRow: {
    justifyContent: 'space-between',
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