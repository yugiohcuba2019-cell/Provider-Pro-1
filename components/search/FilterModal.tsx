import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApplyFilters: (filters: { sortBy: string }) => void;
  currentSortBy: string;
}

export default function FilterModal({ 
  visible, 
  onClose, 
  onApplyFilters, 
  currentSortBy 
}: FilterModalProps) {
  const [sortBy, setSortBy] = useState(currentSortBy);

  const sortOptions = [
    { id: 'relevance', title: 'Relevancia', description: 'Más relevantes primero' },
    { id: 'price_low', title: 'Precio: Menor a Mayor', description: 'Precios más bajos primero' },
    { id: 'price_high', title: 'Precio: Mayor a Menor', description: 'Precios más altos primero' },
    { id: 'rating', title: 'Mejor Calificados', description: 'Calificación más alta primero' },
  ];

  const handleApply = () => {
    onApplyFilters({ sortBy });
  };

  const handleReset = () => {
    setSortBy('relevance');
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.title}>Filtros</Text>
          <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
            <Text style={styles.resetText}>Limpiar</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          {/* Sort Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ordenar por</Text>
            {sortOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={styles.optionItem}
                onPress={() => setSortBy(option.id)}
              >
                <View style={styles.optionContent}>
                  <Text style={styles.optionTitle}>{option.title}</Text>
                  <Text style={styles.optionDescription}>{option.description}</Text>
                </View>
                <View style={[
                  styles.radio,
                  sortBy === option.id && styles.radioSelected
                ]}>
                  {sortBy === option.id && (
                    <View style={styles.radioInner} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
            <Text style={styles.applyButtonText}>Aplicar Filtros</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
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
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E7',
    backgroundColor: 'white',
  },
  closeButton: {
    width: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  resetButton: {
    width: 40,
    alignItems: 'flex-end',
  },
  resetText: {
    fontSize: 16,
    color: '#0066CC',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: 'white',
    marginVertical: 10,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  optionContent: {
    flex: 1,
    marginRight: 15,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  optionDescription: {
    fontSize: 14,
    color: '#8E8E93',
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E5E7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: '#0066CC',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#0066CC',
  },
  footer: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E7',
  },
  applyButton: {
    backgroundColor: '#0066CC',
    borderRadius: 15,
    paddingVertical: 16,
    alignItems: 'center',
  },
  applyButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});