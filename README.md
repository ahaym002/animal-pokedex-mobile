# 🎯 Animal Pokédex Mobile

A Pokemon-style animal catching game built with React Native and Expo! Catch animals using your camera, track where you found them on a map, and build your collection.

![Expo](https://img.shields.io/badge/Expo-SDK%2052-blue)
![React Native](https://img.shields.io/badge/React%20Native-0.76-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178c6)

## ✨ Features

- 📷 **Camera Capture** - Point your camera and catch animals!
- 🎲 **AI Identification** (Demo Mode) - Random animals with weighted rarity system
- 🃏 **Pokemon-style Cards** - Beautiful cards with stats, rarity, and types
- ⚡ **Pokeball Animation** - Satisfying catch animation with haptic feedback
- 📚 **Collection Gallery** - Browse, sort, and filter your catches
- 📍 **GPS Location Tracking** - Records where each animal was spotted
- 🗺️ **Map View** - See all your catches pinned on a map
- 📊 **Progress Tracking** - Track completion by rarity and type
- 🏅 **Achievements** - Unlock badges for your accomplishments

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Expo Go](https://expo.dev/client) app on your phone (iOS/Android)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ahaym002/animal-pokedex-mobile.git
cd animal-pokedex-mobile
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npx expo start
```

4. Scan the QR code with Expo Go (Android) or Camera app (iOS)

## 📱 Running with Expo Go

1. Download **Expo Go** from App Store (iOS) or Play Store (Android)
2. Run `npx expo start` in the project directory
3. Scan the QR code that appears in your terminal
4. The app will load on your device!

### Permissions

The app will request:
- **Camera** - Required for the catch feature
- **Location** - Optional but recommended for map tracking

## 🎮 How to Play

1. **Catch Tab** - Point your camera at anything and tap CATCH!
2. **Pokédex Tab** - View your collection, sort by rarity/name/type
3. **Map Tab** - See where you caught each animal
4. **Progress Tab** - Track your completion and achievements

## 🦁 Animals & Rarity

| Rarity | Drop Rate | Count |
|--------|-----------|-------|
| Common | 40% | 8 species |
| Uncommon | 30% | 7 species |
| Rare | 20% | 6 species |
| Epic | 8% | 5 species |
| Legendary | 2% | 4 species |

**Total: 30 unique species to collect!**

## 🛠️ Tech Stack

- **Expo SDK 52** - React Native framework
- **expo-camera** - Camera access
- **expo-location** - GPS tracking
- **expo-haptics** - Haptic feedback
- **react-native-maps** - Map integration
- **react-native-reanimated** - Smooth animations
- **AsyncStorage** - Local data persistence

## 📁 Project Structure

```
animal-pokedex-mobile/
├── app/                    # Expo Router pages
│   ├── _layout.tsx        # Tab navigation
│   ├── index.tsx          # Camera/Catch screen
│   ├── collection.tsx     # Pokédex gallery
│   ├── map.tsx            # Map view
│   └── progress.tsx       # Progress tracking
├── components/            # Reusable components
│   ├── AnimalCard.tsx     # Pokemon-style card
│   ├── PokeballAnimation.tsx
│   └── ProgressTracker.tsx
├── data/                  # Data layer
│   ├── animals.ts         # Animal definitions
│   └── storage.ts         # AsyncStorage helpers
└── assets/                # Images and icons
```

## 🔮 Future Enhancements

- [ ] Real AI animal identification with image recognition
- [ ] Social features - trade with friends
- [ ] Daily challenges
- [ ] Seasonal/regional exclusive animals
- [ ] AR mode with animal overlays
- [ ] Custom nicknames for caught animals

## 📄 License

MIT License - feel free to use this for learning or as a base for your own projects!

## 🙏 Credits

Built with ❤️ using Expo and React Native.

---

**Happy Catching!** 🎯🦊🦁🐸
