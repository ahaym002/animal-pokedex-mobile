import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withSpring,
  withRepeat,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');
const BALL_SIZE = 120;

interface PokeballAnimationProps {
  onComplete: () => void;
  rarityColor: string;
}

export function PokeballAnimation({ onComplete, rarityColor }: PokeballAnimationProps) {
  const scale = useSharedValue(0);
  const rotation = useSharedValue(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);

  const triggerHaptic = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

  const triggerLightHaptic = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const triggerSuccessHaptic = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  useEffect(() => {
    // Ball appears and drops
    scale.value = withSpring(1, { damping: 8, stiffness: 100 });
    
    // After initial appearance, shake
    setTimeout(() => {
      runOnJS(triggerHaptic)();
      rotation.value = withSequence(
        withTiming(-15, { duration: 100 }),
        withRepeat(
          withSequence(
            withTiming(15, { duration: 150, easing: Easing.inOut(Easing.ease) }),
            withTiming(-15, { duration: 150, easing: Easing.inOut(Easing.ease) })
          ),
          3,
          true
        ),
        withTiming(0, { duration: 100 })
      );
    }, 400);

    // Shake haptics
    const shakeIntervals = [600, 900, 1200, 1500];
    shakeIntervals.forEach(delay => {
      setTimeout(() => {
        runOnJS(triggerLightHaptic)();
      }, delay);
    });

    // Success animation
    setTimeout(() => {
      runOnJS(triggerSuccessHaptic)();
      scale.value = withSequence(
        withSpring(1.3, { damping: 4, stiffness: 200 }),
        withSpring(1, { damping: 8, stiffness: 100 })
      );
    }, 2000);

    // Fade out and complete
    setTimeout(() => {
      opacity.value = withTiming(0, { duration: 400 }, (finished) => {
        if (finished) {
          runOnJS(onComplete)();
        }
      });
    }, 2800);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` },
      { translateY: translateY.value },
    ],
    opacity: opacity.value,
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.pokeball, animatedStyle]}>
        {/* Top half */}
        <View style={[styles.topHalf, { backgroundColor: rarityColor }]}>
          <View style={styles.shine} />
        </View>
        
        {/* Center band */}
        <View style={styles.centerBand}>
          <View style={styles.buttonOuter}>
            <View style={styles.buttonInner} />
          </View>
        </View>
        
        {/* Bottom half */}
        <View style={styles.bottomHalf} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
    zIndex: 100,
  },
  pokeball: {
    width: BALL_SIZE,
    height: BALL_SIZE,
    borderRadius: BALL_SIZE / 2,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: '#1C1C1C',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 15,
  },
  topHalf: {
    flex: 1,
    position: 'relative',
  },
  shine: {
    position: 'absolute',
    top: 10,
    left: 15,
    width: 25,
    height: 15,
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 10,
    transform: [{ rotate: '-30deg' }],
  },
  centerBand: {
    height: 12,
    backgroundColor: '#1C1C1C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonOuter: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1C1C1C',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -10,
    borderWidth: 3,
    borderColor: '#1C1C1C',
  },
  buttonInner: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  bottomHalf: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
});
