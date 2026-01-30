import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Alert, ScrollView } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { getCollection, deleteAnimal, CaughtAnimal } from '../data/storage';
import { AnimalCard } from '../components/AnimalCard';
import { RARITY_COLORS } from '../data/animals';

type SortOption = 'recent' | 'rarity' | 'name' | 'type';
type FilterRarity = 'all' | 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export default function CollectionScreen() {
  const [collection, setCollection] = useState<CaughtAnimal[]>([]);
  const [selectedAnimal, setSelectedAnimal] = useState<CaughtAnimal | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const [filterRarity, setFilterRarity] = useState<FilterRarity>('all');

  useFocusEffect(
    useCallback(() => {
      loadCollection();
    }, [])
  );

  const loadCollection = async () => {
    const data = await getCollection();
    setCollection(data);
  };

  const handleDelete = (animal: CaughtAnimal) => {
    Alert.alert(
      'Release Animal',
      `Are you sure you want to release ${animal.animal.name} back into the wild?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Release',
          style: 'destructive',
          onPress: async () => {
            await deleteAnimal(animal.id);
            setSelectedAnimal(null);
            loadCollection();
          },
        },
      ]
    );
  };

  const rarityOrder = { common: 1, uncommon: 2, rare: 3, epic: 4, legendary: 5 };

  const filteredAndSorted = collection
    .filter(c => filterRarity === 'all' || c.animal.rarity === filterRarity)
    .sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.caughtAt).getTime() - new Date(a.caughtAt).getTime();
        case 'rarity':
          return rarityOrder[b.animal.rarity] - rarityOrder[a.animal.rarity];
        case 'name':
          return a.animal.name.localeCompare(b.animal.name);
        case 'type':
          return a.animal.type.localeCompare(b.animal.type);
        default:
          return 0;
      }
    });

  const SortButton = ({ value, label }: { value: SortOption; label: string }) => (
    <TouchableOpacity
      style={[styles.sortButton, sortBy === value && styles.sortButtonActive]}
      onPress={() => setSortBy(value)}
    >
      <Text style={[styles.sortButtonText, sortBy === value && styles.sortButtonTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const FilterButton = ({ value, label, color }: { value: FilterRarity; label: string; color?: string }) => (
    <TouchableOpacity
      style={[
        styles.filterButton, 
        filterRarity === value && styles.filterButtonActive,
        color ? { borderColor: color } : null,
        filterRarity === value && color ? { backgroundColor: color } : null
      ]}
      onPress={() => setFilterRarity(value)}
    >
      <Text style={[styles.filterButtonText, filterRarity === value && styles.filterButtonTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  if (collection.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyEmoji}>🎒</Text>
        <Text style={styles.emptyTitle}>No Animals Yet!</Text>
        <Text style={styles.emptyText}>
          Head to the Catch tab to start building your collection!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Sort options */}
      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Sort:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <SortButton value="recent" label="Recent" />
          <SortButton value="rarity" label="Rarity" />
          <SortButton value="name" label="Name" />
          <SortButton value="type" label="Type" />
        </ScrollView>
      </View>

      {/* Filter options */}
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <FilterButton value="all" label="All" />
          <FilterButton value="common" label="Common" color={RARITY_COLORS.common} />
          <FilterButton value="uncommon" label="Uncommon" color={RARITY_COLORS.uncommon} />
          <FilterButton value="rare" label="Rare" color={RARITY_COLORS.rare} />
          <FilterButton value="epic" label="Epic" color={RARITY_COLORS.epic} />
          <FilterButton value="legendary" label="Legendary" color={RARITY_COLORS.legendary} />
        </ScrollView>
      </View>

      {/* Results count */}
      <Text style={styles.resultsCount}>
        {filteredAndSorted.length} {filteredAndSorted.length === 1 ? 'animal' : 'animals'}
      </Text>

      {/* Collection list */}
      <FlatList
        data={filteredAndSorted}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AnimalCard 
            caughtAnimal={item} 
            onPress={() => setSelectedAnimal(item)}
            compact
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Detail Modal */}
      <Modal
        visible={selectedAnimal !== null}
        animationType="slide"
        transparent
        onRequestClose={() => setSelectedAnimal(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setSelectedAnimal(null)}
            >
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
            
            {selectedAnimal && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <AnimalCard caughtAnimal={selectedAnimal} />
                
                <TouchableOpacity 
                  style={styles.releaseButton}
                  onPress={() => handleDelete(selectedAnimal)}
                >
                  <Text style={styles.releaseText}>🔓 Release to Wild</Text>
                </TouchableOpacity>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F1A',
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2D2D44',
  },
  sortLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9CA3AF',
    marginRight: 10,
  },
  sortButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 15,
    backgroundColor: '#1E1E2E',
    marginRight: 8,
  },
  sortButtonActive: {
    backgroundColor: '#F59E0B',
  },
  sortButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  sortButtonTextActive: {
    color: '#000',
  },
  filterContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#374151',
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: '#374151',
  },
  filterButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  filterButtonTextActive: {
    color: '#FFF',
  },
  resultsCount: {
    fontSize: 12,
    color: '#6B7280',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: '#0F0F1A',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  emptyEmoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 24,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
  },
  modalContent: {
    flex: 1,
    marginTop: 60,
    paddingTop: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  closeText: {
    fontSize: 20,
    color: '#FFF',
  },
  releaseButton: {
    marginHorizontal: 40,
    marginTop: 20,
    marginBottom: 40,
    paddingVertical: 14,
    backgroundColor: '#EF4444',
    borderRadius: 25,
    alignItems: 'center',
  },
  releaseText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
});
