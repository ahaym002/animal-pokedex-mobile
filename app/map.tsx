import React, { useState, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Modal, ScrollView, Platform } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { useFocusEffect } from 'expo-router';
import * as Location from 'expo-location';
import { getCollection, CaughtAnimal } from '../data/storage';
import { AnimalCard } from '../components/AnimalCard';
import { RARITY_COLORS } from '../data/animals';

const { width, height } = Dimensions.get('window');

export default function MapScreen() {
  const [collection, setCollection] = useState<CaughtAnimal[]>([]);
  const [selectedAnimal, setSelectedAnimal] = useState<CaughtAnimal | null>(null);
  const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);
  const mapRef = useRef<MapView>(null);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const loadData = async () => {
    const data = await getCollection();
    setCollection(data);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        setUserLocation(location);
      }
    } catch (e) {
      console.log('Location error:', e);
    }
  };

  const animalsWithLocation = collection.filter(c => c.location !== null);

  const getInitialRegion = () => {
    if (animalsWithLocation.length > 0) {
      const lats = animalsWithLocation.map(a => a.location!.latitude);
      const lngs = animalsWithLocation.map(a => a.location!.longitude);
      const minLat = Math.min(...lats);
      const maxLat = Math.max(...lats);
      const minLng = Math.min(...lngs);
      const maxLng = Math.max(...lngs);
      
      return {
        latitude: (minLat + maxLat) / 2,
        longitude: (minLng + maxLng) / 2,
        latitudeDelta: Math.max(0.05, (maxLat - minLat) * 1.5),
        longitudeDelta: Math.max(0.05, (maxLng - minLng) * 1.5),
      };
    }
    
    if (userLocation) {
      return {
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };
    }
    
    // Default to Sydney if nothing else
    return {
      latitude: -33.8688,
      longitude: 151.2093,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    };
  };

  const centerOnUser = async () => {
    if (userLocation && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 500);
    }
  };

  const fitToMarkers = () => {
    if (animalsWithLocation.length > 0 && mapRef.current) {
      const coordinates = animalsWithLocation.map(a => ({
        latitude: a.location!.latitude,
        longitude: a.location!.longitude,
      }));
      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  };

  if (animalsWithLocation.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyEmoji}>🗺️</Text>
        <Text style={styles.emptyTitle}>No Locations Yet!</Text>
        <Text style={styles.emptyText}>
          Catch some animals with location tracking enabled to see them on the map!
        </Text>
        <View style={styles.tipBox}>
          <Text style={styles.tipTitle}>💡 Tip</Text>
          <Text style={styles.tipText}>
            Make sure location permissions are enabled when catching animals.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
        initialRegion={getInitialRegion()}
        showsUserLocation
        showsMyLocationButton={false}
      >
        {animalsWithLocation.map((animal) => (
          <Marker
            key={animal.id}
            coordinate={{
              latitude: animal.location!.latitude,
              longitude: animal.location!.longitude,
            }}
            onPress={() => setSelectedAnimal(animal)}
          >
            <View style={[styles.markerContainer, { borderColor: RARITY_COLORS[animal.animal.rarity] }]}>
              <Text style={styles.markerEmoji}>{animal.animal.emoji}</Text>
            </View>
            <Callout tooltip>
              <View style={styles.callout}>
                <Text style={styles.calloutName}>{animal.animal.name}</Text>
                <Text style={styles.calloutRarity}>{animal.animal.rarity.toUpperCase()}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      {/* Map controls */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton} onPress={centerOnUser}>
          <Text style={styles.controlIcon}>📍</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={fitToMarkers}>
          <Text style={styles.controlIcon}>🔍</Text>
        </TouchableOpacity>
      </View>

      {/* Stats overlay */}
      <View style={styles.statsOverlay}>
        <Text style={styles.statsText}>
          {animalsWithLocation.length} location{animalsWithLocation.length !== 1 ? 's' : ''} mapped
        </Text>
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Rarity</Text>
        <View style={styles.legendItems}>
          {Object.entries(RARITY_COLORS).map(([rarity, color]) => (
            <View key={rarity} style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: color }]} />
              <Text style={styles.legendLabel}>{rarity.charAt(0).toUpperCase()}</Text>
            </View>
          ))}
        </View>
      </View>

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
  map: {
    width,
    height: height,
  },
  markerContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1E1E2E',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  markerEmoji: {
    fontSize: 24,
  },
  callout: {
    backgroundColor: '#1E1E2E',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
    minWidth: 100,
  },
  calloutName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFF',
  },
  calloutRarity: {
    fontSize: 10,
    fontWeight: '600',
    color: '#9CA3AF',
    marginTop: 2,
  },
  controls: {
    position: 'absolute',
    right: 16,
    top: 100,
    gap: 10,
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1E1E2E',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 10,
  },
  controlIcon: {
    fontSize: 22,
  },
  statsOverlay: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(30, 30, 46, 0.9)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
  },
  legend: {
    position: 'absolute',
    bottom: 100,
    left: 16,
    backgroundColor: 'rgba(30, 30, 46, 0.9)',
    padding: 12,
    borderRadius: 12,
  },
  legendTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: '#9CA3AF',
    marginBottom: 8,
  },
  legendItems: {
    flexDirection: 'row',
    gap: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendLabel: {
    fontSize: 10,
    color: '#FFF',
    fontWeight: '600',
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
    marginBottom: 20,
  },
  tipBox: {
    backgroundColor: '#1E1E2E',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#F59E0B',
    marginBottom: 4,
  },
  tipText: {
    fontSize: 13,
    color: '#9CA3AF',
    lineHeight: 18,
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
});
