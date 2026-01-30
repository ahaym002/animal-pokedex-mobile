import React from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native';
import { CaughtAnimal } from '../data/storage';
import { RARITY_COLORS, TYPE_COLORS } from '../data/animals';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.85;

interface AnimalCardProps {
  caughtAnimal: CaughtAnimal;
  onPress?: () => void;
  compact?: boolean;
}

export function AnimalCard({ caughtAnimal, onPress, compact = false }: AnimalCardProps) {
  const { animal, caughtAt, location } = caughtAnimal;
  const rarityColor = RARITY_COLORS[animal.rarity];
  const typeColor = TYPE_COLORS[animal.type];
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const StatBar = ({ value, label, color }: { value: number; label: string; color: string }) => (
    <View style={styles.statRow}>
      <Text style={styles.statLabel}>{label}</Text>
      <View style={styles.statBarContainer}>
        <View style={[styles.statBarFill, { width: `${value}%`, backgroundColor: color }]} />
      </View>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );

  if (compact) {
    return (
      <Pressable onPress={onPress} style={[styles.compactCard, { borderColor: rarityColor }]}>
        <View style={[styles.compactEmoji, { backgroundColor: animal.colors.primary }]}>
          <Text style={styles.emojiText}>{animal.emoji}</Text>
        </View>
        <View style={styles.compactInfo}>
          <Text style={styles.compactName}>{animal.name}</Text>
          <View style={styles.compactTags}>
            <View style={[styles.miniTag, { backgroundColor: rarityColor }]}>
              <Text style={styles.miniTagText}>{animal.rarity.toUpperCase()}</Text>
            </View>
            <View style={[styles.miniTag, { backgroundColor: typeColor }]}>
              <Text style={styles.miniTagText}>{animal.type.toUpperCase()}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.compactEmojiBig}>{animal.emoji}</Text>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={onPress} style={styles.cardContainer}>
      <View style={[styles.card, { borderColor: rarityColor }]}>
        {/* Header with rarity glow */}
        <View style={[styles.cardHeader, { backgroundColor: rarityColor }]}>
          <View style={styles.headerTop}>
            <Text style={styles.animalId}>#{String(animal.id).padStart(3, '0')}</Text>
            <View style={[styles.typeTag, { backgroundColor: typeColor }]}>
              <Text style={styles.typeText}>{animal.type.toUpperCase()}</Text>
            </View>
          </View>
          <Text style={styles.animalName}>{animal.name}</Text>
          <Text style={styles.species}>{animal.species}</Text>
        </View>

        {/* Emoji Display */}
        <View style={[styles.emojiContainer, { backgroundColor: animal.colors.primary }]}>
          <View style={[styles.emojiGlow, { backgroundColor: animal.colors.secondary }]} />
          <Text style={styles.mainEmoji}>{animal.emoji}</Text>
        </View>

        {/* Rarity Badge */}
        <View style={[styles.rarityBadge, { backgroundColor: rarityColor }]}>
          <Text style={styles.rarityText}>✦ {animal.rarity.toUpperCase()} ✦</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <StatBar value={animal.stats.speed} label="SPD" color="#EF4444" />
          <StatBar value={animal.stats.strength} label="STR" color="#F59E0B" />
          <StatBar value={animal.stats.cuteness} label="CUTE" color="#EC4899" />
          <StatBar value={animal.stats.intelligence} label="INT" color="#3B82F6" />
          <StatBar value={animal.stats.stealth} label="STL" color="#10B981" />
        </View>

        {/* Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>"{animal.description}"</Text>
        </View>

        {/* Catch Info */}
        <View style={styles.catchInfo}>
          <View style={styles.catchDetail}>
            <Text style={styles.catchIcon}>📅</Text>
            <Text style={styles.catchText}>{formatDate(caughtAt)}</Text>
          </View>
          {location && (
            <View style={styles.catchDetail}>
              <Text style={styles.catchIcon}>📍</Text>
              <Text style={styles.catchText} numberOfLines={1}>
                {location.address || `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`}
              </Text>
            </View>
          )}
        </View>

        {/* Habitat */}
        <View style={styles.habitat}>
          <Text style={styles.habitatLabel}>HABITAT</Text>
          <Text style={styles.habitatText}>{animal.habitat}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#1E1E2E',
    borderRadius: 20,
    borderWidth: 3,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  cardHeader: {
    padding: 16,
    paddingBottom: 12,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  animalId: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.8)',
  },
  typeTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFF',
  },
  animalName: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFF',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  species: {
    fontSize: 12,
    fontStyle: 'italic',
    color: 'rgba(255,255,255,0.7)',
  },
  emojiContainer: {
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  emojiGlow: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    opacity: 0.5,
  },
  mainEmoji: {
    fontSize: 80,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  rarityBadge: {
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 15,
    marginTop: -15,
    marginBottom: 10,
  },
  rarityText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFF',
    letterSpacing: 2,
  },
  statsContainer: {
    padding: 16,
    paddingTop: 8,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statLabel: {
    width: 45,
    fontSize: 11,
    fontWeight: '700',
    color: '#9CA3AF',
  },
  statBarContainer: {
    flex: 1,
    height: 10,
    backgroundColor: '#374151',
    borderRadius: 5,
    marginHorizontal: 8,
    overflow: 'hidden',
  },
  statBarFill: {
    height: '100%',
    borderRadius: 5,
  },
  statValue: {
    width: 30,
    fontSize: 12,
    fontWeight: '600',
    color: '#E5E7EB',
    textAlign: 'right',
  },
  descriptionContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  description: {
    fontSize: 13,
    fontStyle: 'italic',
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 18,
  },
  catchInfo: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  catchDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  catchIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  catchText: {
    fontSize: 12,
    color: '#6B7280',
    flex: 1,
  },
  habitat: {
    backgroundColor: '#111827',
    padding: 12,
    alignItems: 'center',
  },
  habitatLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#6B7280',
    letterSpacing: 1,
  },
  habitatText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  // Compact styles
  compactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E2E',
    borderRadius: 16,
    borderWidth: 2,
    padding: 12,
    marginBottom: 10,
    marginHorizontal: 16,
  },
  compactEmoji: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emojiText: {
    fontSize: 28,
  },
  compactInfo: {
    flex: 1,
    marginLeft: 12,
  },
  compactName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 4,
  },
  compactTags: {
    flexDirection: 'row',
    gap: 6,
  },
  miniTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  miniTagText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#FFF',
  },
  compactEmojiBig: {
    fontSize: 36,
    opacity: 0.3,
    position: 'absolute',
    right: 10,
  },
});
