import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { mockServices, mockUserLocation } from '@/data/mockData';

const { width, height } = Dimensions.get('window');

export default function ServiceDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  const service = mockServices.find(s => s.id === params.serviceId);
  
  if (!service) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Servicio no encontrado</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backText}>Volver</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleBookService = () => {
    Alert.alert(
      'Reservar Servicio',
      `¿Deseas reservar "${service.title}" por $${service.price}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Reservar', 
          onPress: () => {
            Alert.alert('¡Reserva exitosa!', 'Te contactaremos pronto para confirmar los detalles.');
            router.back();
          }
        },
      ]
    );
  };

  const handleContactProvider = () => {
    Alert.alert(
      'Contactar Proveedor',
      `¿Deseas contactar a ${service.provider.name}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Llamar', onPress: () => console.log('Calling...') },
        { text: 'Mensaje', onPress: () => console.log('Messaging...') },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.favoriteButton}>
            <Ionicons name="heart-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Image Gallery */}
        <View style={styles.imageContainer}>
          <ScrollView 
            horizontal 
            pagingEnabled 
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(event.nativeEvent.contentOffset.x / width);
              setSelectedImageIndex(index);
            }}
          >
            {service.gallery.map((image, index) => (
              <Image key={index} source={{ uri: image }} style={styles.serviceImage} />
            ))}
          </ScrollView>
          <View style={styles.imageIndicators}>
            {service.gallery.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  selectedImageIndex === index && styles.activeIndicator
                ]}
              />
            ))}
          </View>
        </View>

        {/* Service Info */}
        <View style={styles.serviceInfo}>
          <View style={styles.serviceHeader}>
            <Text style={styles.serviceTitle}>{service.title}</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>${service.price}</Text>
              <Text style={styles.priceLabel}>por servicio</Text>
            </View>
          </View>

          <View style={styles.ratingContainer}>
            <View style={styles.rating}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>{service.rating}</Text>
              <Text style={styles.reviewCount}>({service.reviewCount} reseñas)</Text>
            </View>
            <View style={styles.availability}>
              <Ionicons name="time" size={16} color="#00AA55" />
              <Text style={styles.availabilityText}>{service.availability}</Text>
            </View>
          </View>

          <Text style={styles.description}>{service.description}</Text>

          {/* Features */}
          <View style={styles.featuresContainer}>
            <Text style={styles.featuresTitle}>Incluye:</Text>
            {service.features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={16} color="#00AA55" />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>

          {/* Service Details */}
          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Ionicons name="time-outline" size={20} color="#0066CC" />
              <Text style={styles.detailText}>Duración: {service.duration}</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="location-outline" size={20} color="#0066CC" />
              <Text style={styles.detailText}>Distancia: {service.location.distance} km</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="pricetag-outline" size={20} color="#0066CC" />
              <Text style={styles.detailText}>Categoría: {service.category}</Text>
            </View>
          </View>
        </View>

        {/* Provider Info */}
        <View style={styles.providerContainer}>
          <Text style={styles.sectionTitle}>Proveedor</Text>
          <View style={styles.providerInfo}>
            <Image source={{ uri: service.provider.avatar }} style={styles.providerAvatar} />
            <View style={styles.providerDetails}>
              <View style={styles.providerHeader}>
                <Text style={styles.providerName}>{service.provider.name}</Text>
                {service.provider.verified && (
                  <Ionicons name="checkmark-circle" size={16} color="#00AA55" />
                )}
              </View>
              <View style={styles.providerStats}>
                <View style={styles.providerStat}>
                  <Ionicons name="star" size={14} color="#FFD700" />
                  <Text style={styles.providerStatText}>{service.provider.rating}</Text>
                </View>
                <View style={styles.providerStat}>
                  <Ionicons name="briefcase" size={14} color="#8E8E93" />
                  <Text style={styles.providerStatText}>{service.provider.completedJobs} trabajos</Text>
                </View>
                <View style={styles.providerStat}>
                  <Ionicons name="time" size={14} color="#8E8E93" />
                  <Text style={styles.providerStatText}>Responde en {service.provider.responseTime}</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.contactButton}
              onPress={handleContactProvider}
            >
              <Ionicons name="chatbubble" size={20} color="#0066CC" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Location Map */}
        <View style={styles.mapContainer}>
          <Text style={styles.sectionTitle}>Ubicación</Text>
          <View style={styles.mapWrapper}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              initialRegion={{
                latitude: service.location.latitude,
                longitude: service.location.longitude,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
              }}
            >
              {/* Provider Marker */}
              <Marker
                coordinate={{
                  latitude: service.location.latitude,
                  longitude: service.location.longitude,
                }}
                title={service.provider.name}
                description={service.location.address}
              >
                <View style={styles.providerMarker}>
                  <Ionicons name="business" size={20} color="white" />
                </View>
              </Marker>

              {/* User Marker */}
              <Marker
                coordinate={{
                  latitude: mockUserLocation.latitude,
                  longitude: mockUserLocation.longitude,
                }}
                title="Tu ubicación"
                description={mockUserLocation.address}
              >
                <View style={styles.userMarker}>
                  <Ionicons name="person" size={16} color="white" />
                </View>
              </Marker>
            </MapView>
            <View style={styles.mapOverlay}>
              <Text style={styles.distanceText}>
                📍 {service.location.distance} km de distancia
              </Text>
              <Text style={styles.addressText}>{service.location.address}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity 
          style={styles.bookButton}
          onPress={handleBookService}
        >
          <Text style={styles.bookButtonText}>Reservar por ${service.price}</Text>
        </TouchableOpacity>
      </View>
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
  },
  serviceImage: {
    width: width,
    height: 300,
  },
  imageIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 15,
    left: 0,
    right: 0,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: 'white',
  },
  serviceInfo: {
    backgroundColor: 'white',
    padding: 20,
    marginTop: -20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  serviceTitle: {
    flex: 1,
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginRight: 15,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0066CC',
  },
  priceLabel: {
    fontSize: 14,
    color: '#8E8E93',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 5,
  },
  reviewCount: {
    fontSize: 14,
    color: '#8E8E93',
    marginLeft: 5,
  },
  availability: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  availabilityText: {
    fontSize: 14,
    color: '#00AA55',
    fontWeight: '600',
    marginLeft: 5,
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 25,
  },
  featuresContainer: {
    marginBottom: 25,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  detailsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#F2F2F7',
    paddingTop: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  detailText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
  providerContainer: {
    backgroundColor: 'white',
    marginTop: 10,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
  },
  providerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  providerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  providerDetails: {
    flex: 1,
  },
  providerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  providerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginRight: 8,
  },
  providerStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  providerStat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  providerStatText: {
    fontSize: 12,
    color: '#8E8E93',
    marginLeft: 4,
  },
  contactButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 102, 204, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    backgroundColor: 'white',
    marginTop: 10,
    padding: 20,
    marginBottom: 100,
  },
  mapWrapper: {
    position: 'relative',
    borderRadius: 15,
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: 200,
  },
  mapOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 15,
  },
  distanceText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  addressText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  providerMarker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0066CC',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'white',
  },
  userMarker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E7',
  },
  bookButton: {
    backgroundColor: '#0066CC',
    borderRadius: 15,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  bookButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
  },
  backText: {
    fontSize: 16,
    color: '#0066CC',
    fontWeight: '600',
  },
});