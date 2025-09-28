import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const cardWidth = (width - 60) / 2;

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  category: string;
  provider: {
    name: string;
    avatar: string;
  };
}

interface ServiceCardProps {
  service: Service;
  horizontal?: boolean;
}

export default function ServiceCard({ service, horizontal = false }: ServiceCardProps) {
  const cardStyle = horizontal ? styles.horizontalCard : styles.verticalCard;
  const imageStyle = horizontal ? styles.horizontalImage : styles.verticalImage;
  const contentStyle = horizontal ? styles.horizontalContent : styles.verticalContent;

  return (
    <TouchableOpacity style={[styles.card, cardStyle]}>
      <Image source={{ uri: service.image }} style={[styles.image, imageStyle]} />
      <View style={[styles.content, contentStyle]}>
        <Text style={styles.title} numberOfLines={2}>
          {service.title}
        </Text>
        
        <View style={styles.providerRow}>
          <Image source={{ uri: service.provider.avatar }} style={styles.providerAvatar} />
          <Text style={styles.providerName} numberOfLines={1}>
            {service.provider.name}
          </Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.rating}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>{service.rating}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${service.price}</Text>
            {service.location && (
              <Text style={styles.distance}>{service.location.distance} km</Text>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  verticalCard: {
    width: cardWidth,
    marginBottom: 15,
  },
  horizontalCard: {
    flexDirection: 'row',
    width: '100%',
    height: 120,
  },
  image: {
    backgroundColor: '#F2F2F7',
  },
  verticalImage: {
    width: '100%',
    height: 120,
  },
  horizontalImage: {
    width: 120,
    height: '100%',
  },
  content: {
    padding: 12,
  },
  verticalContent: {
    flex: 1,
  },
  horizontalContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    lineHeight: 20,
  },
  providerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  providerAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 6,
  },
  providerName: {
    fontSize: 12,
    color: '#8E8E93',
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#333',
    marginLeft: 4,
    fontWeight: '500',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0066CC',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  distance: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 2,
  },
});