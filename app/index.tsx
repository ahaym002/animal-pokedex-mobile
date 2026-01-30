import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions, Platform } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as Location from 'expo-location';
import * as Haptics from 'expo-haptics';
import { getRandomAnimal, RARITY_COLORS } from '../data/animals';
import { saveAnimal, generateUniqueId, CaughtAnimal } from '../data/storage';
import { PokeballAnimation } from '../components/PokeballAnimation';
import { AnimalCard } from '../components/AnimalCard';

const { width, height } = Dimensions.get('window');

export default function CatchScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [locationPermission, setLocationPermission] = useState<boolean | null>(null);
  const [facing, setFacing] = useState<CameraType>('back');
  const [isCatching, setIsCatching] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [caughtAnimal, setCaughtAnimal] = useState<CaughtAnimal | null>(null);
  const [currentLocation, setCurrentLocation] = useState<Location.LocationObject | null>(null);
  const cameraRef = useRef<CameraView>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(status === 'granted');
      
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        setCurrentLocation(location);
      }
    })();
  }, []);

  if (!permission) {
    return <View style={styles.container}><Text style={styles.message}>Loading...</Text></View>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionTitle}>📷 Camera Access Needed</Text>
        <Text style={styles.permissionText}>
          We need your camera to catch animals in the wild!
        </Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Grant Camera Access</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleCatch = async () => {
    if (isCatching) return;
    
    setIsCatching(true);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    // Get current location
    let location = null;
    if (locationPermission) {
      try {
        const loc = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced
        });
        setCurrentLocation(loc);
        
        // Try to get address
        let address: string | undefined;
        try {
          const reverseGeocode = await Location.reverseGeocodeAsync({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude
          });
          if (reverseGeocode.length > 0) {
            const place = reverseGeocode[0];
            address = [place.street, place.city, place.region].filter(Boolean).join(', ');
          }
        } catch (e) {
          console.log('Reverse geocode failed:', e);
        }
        
        location = {
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          address
        };
      } catch (e) {
        console.log('Location fetch failed:', e);
      }
    }
    
    // Get random animal (AI demo mode)
    const animal = getRandomAnimal();
    
    const newCatch: CaughtAnimal = {
      id: generateUniqueId(),
      animal,
      caughtAt: new Date().toISOString(),
      location
    };
    
    setCaughtAnimal(newCatch);
    setShowAnimation(true);
  };

  const handleAnimationComplete = async () => {
    setShowAnimation(false);
    
    if (caughtAnimal) {
      await saveAnimal(caughtAnimal);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  const dismissCard = () => {
    setCaughtAnimal(null);
    setIsCatching(false);
  };

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  return (
    <View style={styles.container}>
      <CameraView 
        ref={cameraRef}
        style={styles.camera} 
        facing={facing}
      >
        {/* Viewfinder overlay */}
        <View style={styles.viewfinder}>
          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />
        </View>

        {/* Location indicator */}
        <View style={styles.locationBadge}>
          <Text style={styles.locationIcon}>
            {locationPermission ? '📍' : '📍❌'}
          </Text>
          <Text style={styles.locationText}>
            {locationPermission 
              ? (currentLocation 
                ? `${currentLocation.coords.latitude.toFixed(4)}, ${currentLocation.coords.longitude.toFixed(4)}`
                : 'Getting location...')
              : 'Location disabled'}
          </Text>
        </View>

        {/* Instructions */}
        <View style={styles.instructions}>
          <Text style={styles.instructionText}>Point at an animal and tap CATCH!</Text>
          <Text style={styles.instructionSubtext}>Demo mode: Random animals for testing</Text>
        </View>

        {/* Controls */}
        <View style={styles.controls}>
          <TouchableOpacity style={styles.flipButton} onPress={toggleCameraFacing}>
            <Text style={styles.flipIcon}>🔄</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.catchButton, isCatching && styles.catchButtonDisabled]} 
            onPress={handleCatch}
            disabled={isCatching}
          >
            <View style={styles.catchButtonInner}>
              <Text style={styles.catchButtonText}>
                {isCatching ? '...' : 'CATCH!'}
              </Text>
            </View>
          </TouchableOpacity>
          
          <View style={styles.flipButton} />
        </View>
      </CameraView>

      {/* Pokeball Animation */}
      {showAnimation && caughtAnimal && (
        <PokeballAnimation 
          onComplete={handleAnimationComplete}
          rarityColor={RARITY_COLORS[caughtAnimal.animal.rarity]}
        />
      )}

      {/* Caught Animal Card */}
      {caughtAnimal && !showAnimation && (
        <View style={styles.cardOverlay}>
          <Text style={styles.caughtTitle}>🎉 CAUGHT! 🎉</Text>
          <AnimalCard caughtAnimal={caughtAnimal} />
          <TouchableOpacity style={styles.dismissButton} onPress={dismissCard}>
            <Text style={styles.dismissText}>TAP TO CONTINUE</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F1A',
  },
  camera: {
    flex: 1,
  },
  message: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: '#0F0F1A',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  permissionTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 16,
  },
  permissionText: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  permissionButton: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 30,
    paddingVertical: 16,
    borderRadius: 30,
  },
  permissionButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  viewfinder: {
    position: 'absolute',
    top: '25%',
    left: '15%',
    right: '15%',
    bottom: '35%',
  },
  corner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: '#F59E0B',
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 8,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 8,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 8,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 8,
  },
  locationBadge: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  locationIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  locationText: {
    fontSize: 12,
    color: '#FFF',
  },
  instructions: {
    position: 'absolute',
    bottom: 180,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  instructionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  instructionSubtext: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },
  controls: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  flipButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flipIcon: {
    fontSize: 28,
  },
  catchButton: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },
  catchButtonDisabled: {
    backgroundColor: '#6B7280',
    opacity: 0.7,
  },
  catchButtonInner: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#DC2626',
    justifyContent: 'center',
    alignItems: 'center',
  },
  catchButtonText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FFF',
    letterSpacing: 1,
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 50,
  },
  caughtTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#F59E0B',
    marginBottom: 20,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  dismissButton: {
    marginTop: 20,
    paddingHorizontal: 30,
    paddingVertical: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  dismissText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9CA3AF',
    letterSpacing: 1,
  },
});
