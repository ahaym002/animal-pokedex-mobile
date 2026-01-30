import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ANIMALS, RARITY_COLORS } from '../data/animals';
import { CaughtAnimal } from '../data/storage';

interface ProgressTrackerProps {
  collection: CaughtAnimal[];
}

export function ProgressTracker({ collection }: ProgressTrackerProps) {
  const totalAnimals = ANIMALS.length;
  const uniqueCaught = new Set(collection.map(c => c.animal.id)).size;
  const progress = (uniqueCaught / totalAnimals) * 100;

  const getRarityCounts = () => {
    const counts: Record<string, { caught: number; total: number }> = {
      common: { caught: 0, total: 0 },
      uncommon: { caught: 0, total: 0 },
      rare: { caught: 0, total: 0 },
      epic: { caught: 0, total: 0 },
      legendary: { caught: 0, total: 0 },
    };

    ANIMALS.forEach(animal => {
      counts[animal.rarity].total++;
    });

    const caughtIds = new Set(collection.map(c => c.animal.id));
    ANIMALS.forEach(animal => {
      if (caughtIds.has(animal.id)) {
        counts[animal.rarity].caught++;
      }
    });

    return counts;
  };

  const rarityCounts = getRarityCounts();

  return (
    <View style={styles.container}>
      <View style={styles.mainProgress}>
        <View style={styles.progressHeader}>
          <Text style={styles.title}>Pokédex Progress</Text>
          <Text style={styles.percentage}>{progress.toFixed(1)}%</Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.caught}>{uniqueCaught} / {totalAnimals} Species Discovered</Text>
      </View>

      <View style={styles.raritySection}>
        {Object.entries(rarityCounts).map(([rarity, { caught, total }]) => (
          <View key={rarity} style={styles.rarityRow}>
            <View style={[styles.rarityDot, { backgroundColor: RARITY_COLORS[rarity as keyof typeof RARITY_COLORS] }]} />
            <Text style={styles.rarityLabel}>{rarity.charAt(0).toUpperCase() + rarity.slice(1)}</Text>
            <Text style={styles.rarityCount}>{caught}/{total}</Text>
            <View style={styles.miniBar}>
              <View 
                style={[
                  styles.miniBarFill, 
                  { 
                    width: `${(caught / total) * 100}%`,
                    backgroundColor: RARITY_COLORS[rarity as keyof typeof RARITY_COLORS]
                  }
                ]} 
              />
            </View>
          </View>
        ))}
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{collection.length}</Text>
          <Text style={styles.statLabel}>Total Catches</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{uniqueCaught}</Text>
          <Text style={styles.statLabel}>Unique Species</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>
            {collection.filter(c => c.location).length}
          </Text>
          <Text style={styles.statLabel}>With Location</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E1E2E',
    borderRadius: 20,
    padding: 20,
    margin: 16,
  },
  mainProgress: {
    marginBottom: 20,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
  },
  percentage: {
    fontSize: 20,
    fontWeight: '800',
    color: '#F59E0B',
  },
  progressBarContainer: {
    height: 12,
    backgroundColor: '#374151',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#F59E0B',
    borderRadius: 6,
  },
  caught: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 6,
    textAlign: 'center',
  },
  raritySection: {
    marginBottom: 20,
  },
  rarityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rarityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  rarityLabel: {
    width: 80,
    fontSize: 13,
    color: '#E5E7EB',
  },
  rarityCount: {
    width: 40,
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  miniBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#374151',
    borderRadius: 3,
    marginLeft: 8,
    overflow: 'hidden',
  },
  miniBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#111827',
    padding: 12,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFF',
  },
  statLabel: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 2,
    textAlign: 'center',
  },
});
