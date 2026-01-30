import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { getCollection, clearCollection, CaughtAnimal } from '../data/storage';
import { ProgressTracker } from '../components/ProgressTracker';
import { ANIMALS, RARITY_COLORS, TYPE_COLORS } from '../data/animals';

export default function ProgressScreen() {
  const [collection, setCollection] = useState<CaughtAnimal[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadCollection();
    }, [])
  );

  const loadCollection = async () => {
    const data = await getCollection();
    setCollection(data);
  };

  const handleReset = () => {
    Alert.alert(
      'Reset Pokédex',
      'Are you sure you want to release ALL animals? This cannot be undone!',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset Everything',
          style: 'destructive',
          onPress: async () => {
            await clearCollection();
            setCollection([]);
          },
        },
      ]
    );
  };

  const getUniqueCaughtIds = () => new Set(collection.map(c => c.animal.id));
  const caughtIds = getUniqueCaughtIds();

  const getMissingByRarity = () => {
    const missing: Record<string, typeof ANIMALS> = {
      common: [],
      uncommon: [],
      rare: [],
      epic: [],
      legendary: [],
    };

    ANIMALS.forEach(animal => {
      if (!caughtIds.has(animal.id)) {
        missing[animal.rarity].push(animal);
      }
    });

    return missing;
  };

  const missing = getMissingByRarity();

  const getTypeStats = () => {
    const stats: Record<string, { caught: number; total: number }> = {};
    
    ANIMALS.forEach(animal => {
      if (!stats[animal.type]) {
        stats[animal.type] = { caught: 0, total: 0 };
      }
      stats[animal.type].total++;
      if (caughtIds.has(animal.id)) {
        stats[animal.type].caught++;
      }
    });

    return stats;
  };

  const typeStats = getTypeStats();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ProgressTracker collection={collection} />

      {/* Type Progress */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 Progress by Type</Text>
        <View style={styles.typeGrid}>
          {Object.entries(typeStats).map(([type, { caught, total }]) => (
            <View 
              key={type} 
              style={[styles.typeCard, { borderColor: TYPE_COLORS[type as keyof typeof TYPE_COLORS] }]}
            >
              <View style={[styles.typeIcon, { backgroundColor: TYPE_COLORS[type as keyof typeof TYPE_COLORS] }]}>
                <Text style={styles.typeEmoji}>
                  {type === 'mammal' ? '🐾' : 
                   type === 'bird' ? '🐦' : 
                   type === 'reptile' ? '🦎' : 
                   type === 'amphibian' ? '🐸' : 
                   type === 'fish' ? '🐠' : 
                   type === 'insect' ? '🦋' : '🕷️'}
                </Text>
              </View>
              <Text style={styles.typeName}>{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
              <Text style={styles.typeProgress}>{caught}/{total}</Text>
              <View style={styles.typeMiniBar}>
                <View 
                  style={[
                    styles.typeMiniBarFill, 
                    { 
                      width: `${(caught / total) * 100}%`,
                      backgroundColor: TYPE_COLORS[type as keyof typeof TYPE_COLORS]
                    }
                  ]} 
                />
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Missing Animals */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔍 Missing Species</Text>
        
        {Object.entries(missing).map(([rarity, animals]) => {
          if (animals.length === 0) return null;
          
          return (
            <View key={rarity} style={styles.missingSection}>
              <View style={styles.missingHeader}>
                <View style={[styles.rarityBadge, { backgroundColor: RARITY_COLORS[rarity as keyof typeof RARITY_COLORS] }]}>
                  <Text style={styles.rarityBadgeText}>{rarity.toUpperCase()}</Text>
                </View>
                <Text style={styles.missingCount}>{animals.length} to find</Text>
              </View>
              <View style={styles.missingGrid}>
                {animals.map(animal => (
                  <View key={animal.id} style={styles.missingCard}>
                    <Text style={styles.missingEmoji}>{animal.emoji}</Text>
                    <Text style={styles.missingName}>???</Text>
                    <Text style={styles.missingHint}>#{String(animal.id).padStart(3, '0')}</Text>
                  </View>
                ))}
              </View>
            </View>
          );
        })}

        {Object.values(missing).every(arr => arr.length === 0) && (
          <View style={styles.completeBox}>
            <Text style={styles.completeEmoji}>🏆</Text>
            <Text style={styles.completeText}>Pokédex Complete!</Text>
            <Text style={styles.completeSubtext}>You've caught them all!</Text>
          </View>
        )}
      </View>

      {/* Achievements */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🏅 Achievements</Text>
        <View style={styles.achievementGrid}>
          <AchievementBadge 
            icon="🌱" 
            title="First Catch" 
            unlocked={collection.length >= 1}
            description="Catch your first animal"
          />
          <AchievementBadge 
            icon="🔟" 
            title="Collector" 
            unlocked={collection.length >= 10}
            description="Catch 10 animals"
          />
          <AchievementBadge 
            icon="💯" 
            title="Enthusiast" 
            unlocked={collection.length >= 100}
            description="Catch 100 animals"
          />
          <AchievementBadge 
            icon="⭐" 
            title="Rare Find" 
            unlocked={collection.some(c => c.animal.rarity === 'rare')}
            description="Catch a rare animal"
          />
          <AchievementBadge 
            icon="💎" 
            title="Epic Discovery" 
            unlocked={collection.some(c => c.animal.rarity === 'epic')}
            description="Catch an epic animal"
          />
          <AchievementBadge 
            icon="👑" 
            title="Legendary" 
            unlocked={collection.some(c => c.animal.rarity === 'legendary')}
            description="Catch a legendary animal"
          />
          <AchievementBadge 
            icon="🗺️" 
            title="Explorer" 
            unlocked={collection.filter(c => c.location).length >= 5}
            description="Catch 5 animals with location"
          />
          <AchievementBadge 
            icon="🎯" 
            title="Completionist" 
            unlocked={caughtIds.size === ANIMALS.length}
            description="Catch all unique species"
          />
        </View>
      </View>

      {/* Reset Button */}
      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Text style={styles.resetText}>🔄 Reset Pokédex</Text>
      </TouchableOpacity>

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}

function AchievementBadge({ icon, title, unlocked, description }: { 
  icon: string; 
  title: string; 
  unlocked: boolean;
  description: string;
}) {
  return (
    <View style={[styles.achievementCard, !unlocked && styles.achievementLocked]}>
      <Text style={[styles.achievementIcon, !unlocked && styles.achievementIconLocked]}>
        {unlocked ? icon : '🔒'}
      </Text>
      <Text style={[styles.achievementTitle, !unlocked && styles.achievementTitleLocked]}>
        {title}
      </Text>
      <Text style={styles.achievementDesc}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F1A',
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 12,
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  typeCard: {
    width: '31%',
    backgroundColor: '#1E1E2E',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    borderWidth: 2,
  },
  typeIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  typeEmoji: {
    fontSize: 18,
  },
  typeName: {
    fontSize: 11,
    fontWeight: '600',
    color: '#E5E7EB',
    marginBottom: 2,
  },
  typeProgress: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 4,
  },
  typeMiniBar: {
    width: '100%',
    height: 4,
    backgroundColor: '#374151',
    borderRadius: 2,
    overflow: 'hidden',
  },
  typeMiniBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  missingSection: {
    marginBottom: 16,
  },
  missingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  rarityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 10,
    marginRight: 10,
  },
  rarityBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFF',
  },
  missingCount: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  missingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  missingCard: {
    width: 70,
    backgroundColor: '#1E1E2E',
    borderRadius: 10,
    padding: 8,
    alignItems: 'center',
    opacity: 0.6,
  },
  missingEmoji: {
    fontSize: 24,
    opacity: 0.3,
  },
  missingName: {
    fontSize: 10,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 4,
  },
  missingHint: {
    fontSize: 8,
    color: '#4B5563',
    marginTop: 2,
  },
  completeBox: {
    backgroundColor: '#1E1E2E',
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F59E0B',
  },
  completeEmoji: {
    fontSize: 60,
    marginBottom: 10,
  },
  completeText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#F59E0B',
  },
  completeSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 4,
  },
  achievementGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  achievementCard: {
    width: '48%',
    backgroundColor: '#1E1E2E',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F59E0B',
  },
  achievementLocked: {
    borderColor: '#374151',
    opacity: 0.6,
  },
  achievementIcon: {
    fontSize: 32,
    marginBottom: 6,
  },
  achievementIconLocked: {
    opacity: 0.5,
  },
  achievementTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFF',
    textAlign: 'center',
  },
  achievementTitleLocked: {
    color: '#6B7280',
  },
  achievementDesc: {
    fontSize: 10,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 2,
  },
  resetButton: {
    marginHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#374151',
    borderRadius: 12,
    alignItems: 'center',
  },
  resetText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  bottomPadding: {
    height: 40,
  },
});
