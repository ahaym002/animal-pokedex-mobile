export interface AnimalType {
  id: number;
  name: string;
  species: string;
  type: 'mammal' | 'bird' | 'reptile' | 'amphibian' | 'fish' | 'insect' | 'arachnid';
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  habitat: string;
  description: string;
  stats: {
    speed: number;
    strength: number;
    cuteness: number;
    intelligence: number;
    stealth: number;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  emoji: string;
}

export const ANIMALS: AnimalType[] = [
  // COMMON (40%)
  {
    id: 1,
    name: "Sparrow",
    species: "Passer domesticus",
    type: "bird",
    rarity: "common",
    habitat: "Urban areas, gardens",
    description: "A cheerful little bird commonly seen hopping around parks and streets.",
    stats: { speed: 70, strength: 20, cuteness: 65, intelligence: 40, stealth: 50 },
    colors: { primary: "#8B7355", secondary: "#D4C4B0", accent: "#4A4A4A" },
    emoji: "🐦"
  },
  {
    id: 2,
    name: "Pigeon",
    species: "Columba livia",
    type: "bird",
    rarity: "common",
    habitat: "Cities, parks",
    description: "The urban warrior. Masters of navigation and masters of stealing your lunch.",
    stats: { speed: 55, strength: 25, cuteness: 35, intelligence: 60, stealth: 30 },
    colors: { primary: "#708090", secondary: "#C0C0C0", accent: "#9370DB" },
    emoji: "🕊️"
  },
  {
    id: 3,
    name: "Squirrel",
    species: "Sciurus carolinensis",
    type: "mammal",
    rarity: "common",
    habitat: "Parks, forests, backyards",
    description: "Hyperactive acrobat with an obsession for nuts and causing chaos.",
    stats: { speed: 85, strength: 15, cuteness: 80, intelligence: 65, stealth: 60 },
    colors: { primary: "#8B4513", secondary: "#D2691E", accent: "#F5DEB3" },
    emoji: "🐿️"
  },
  {
    id: 4,
    name: "Ant",
    species: "Formicidae",
    type: "insect",
    rarity: "common",
    habitat: "Everywhere",
    description: "Tiny but mighty. Can carry 50x their body weight and never skips leg day.",
    stats: { speed: 40, strength: 95, cuteness: 20, intelligence: 70, stealth: 80 },
    colors: { primary: "#2F1810", secondary: "#4A2C23", accent: "#8B0000" },
    emoji: "🐜"
  },
  {
    id: 5,
    name: "Butterfly",
    species: "Papilionoidea",
    type: "insect",
    rarity: "common",
    habitat: "Gardens, meadows",
    description: "Nature's flying artwork. Starts life as a caterpillar, ends as a masterpiece.",
    stats: { speed: 45, strength: 5, cuteness: 90, intelligence: 15, stealth: 40 },
    colors: { primary: "#FF6B6B", secondary: "#FFE66D", accent: "#4ECDC4" },
    emoji: "🦋"
  },
  {
    id: 6,
    name: "Ladybug",
    species: "Coccinellidae",
    type: "insect",
    rarity: "common",
    habitat: "Gardens, fields",
    description: "Adorable polka-dotted beetle. Lucky charm and aphid destroyer.",
    stats: { speed: 30, strength: 10, cuteness: 95, intelligence: 20, stealth: 45 },
    colors: { primary: "#DC143C", secondary: "#000000", accent: "#FFD700" },
    emoji: "🐞"
  },
  {
    id: 7,
    name: "Robin",
    species: "Erithacus rubecula",
    type: "bird",
    rarity: "common",
    habitat: "Gardens, woodlands",
    description: "The friendly garden companion with a beautiful orange-red breast.",
    stats: { speed: 65, strength: 15, cuteness: 85, intelligence: 45, stealth: 55 },
    colors: { primary: "#CD853F", secondary: "#FF6347", accent: "#F5F5DC" },
    emoji: "🐦"
  },
  {
    id: 8,
    name: "House Spider",
    species: "Tegenaria domestica",
    type: "arachnid",
    rarity: "common",
    habitat: "Homes, buildings",
    description: "Eight-legged roommate. Catches flies for free, just wants appreciation.",
    stats: { speed: 50, strength: 25, cuteness: 15, intelligence: 35, stealth: 90 },
    colors: { primary: "#3D2914", secondary: "#5C4033", accent: "#8B8378" },
    emoji: "🕷️"
  },

  // UNCOMMON (30%)
  {
    id: 9,
    name: "Rabbit",
    species: "Oryctolagus cuniculus",
    type: "mammal",
    rarity: "uncommon",
    habitat: "Meadows, gardens",
    description: "Fluffy hopping machine. Ears like satellite dishes, nose always twitching.",
    stats: { speed: 80, strength: 20, cuteness: 95, intelligence: 50, stealth: 70 },
    colors: { primary: "#D2B48C", secondary: "#FFFFFF", accent: "#FFB6C1" },
    emoji: "🐰"
  },
  {
    id: 10,
    name: "Hedgehog",
    species: "Erinaceus europaeus",
    type: "mammal",
    rarity: "uncommon",
    habitat: "Gardens, hedgerows",
    description: "Spiky ball of adorableness. Rolls into a ball when scared, loves slugs.",
    stats: { speed: 25, strength: 30, cuteness: 90, intelligence: 40, stealth: 65 },
    colors: { primary: "#8B7355", secondary: "#D4C4B0", accent: "#2F1810" },
    emoji: "🦔"
  },
  {
    id: 11,
    name: "Frog",
    species: "Rana temporaria",
    type: "amphibian",
    rarity: "uncommon",
    habitat: "Ponds, wetlands",
    description: "Slimy jumper with a musical croak. Catches flies with lightning-fast tongue.",
    stats: { speed: 65, strength: 20, cuteness: 70, intelligence: 35, stealth: 75 },
    colors: { primary: "#228B22", secondary: "#90EE90", accent: "#FFD700" },
    emoji: "🐸"
  },
  {
    id: 12,
    name: "Dragonfly",
    species: "Anisoptera",
    type: "insect",
    rarity: "uncommon",
    habitat: "Near water, wetlands",
    description: "Ancient aerial predator. Can fly backwards, sideways, and hover like a helicopter.",
    stats: { speed: 95, strength: 15, cuteness: 60, intelligence: 30, stealth: 55 },
    colors: { primary: "#4169E1", secondary: "#00CED1", accent: "#9370DB" },
    emoji: "🪰"
  },
  {
    id: 13,
    name: "Raccoon",
    species: "Procyon lotor",
    type: "mammal",
    rarity: "uncommon",
    habitat: "Forests, suburbs",
    description: "Trash panda extraordinaire. Masked bandit with surprisingly dexterous hands.",
    stats: { speed: 55, strength: 45, cuteness: 75, intelligence: 85, stealth: 80 },
    colors: { primary: "#696969", secondary: "#000000", accent: "#D3D3D3" },
    emoji: "🦝"
  },
  {
    id: 14,
    name: "Blue Jay",
    species: "Cyanocitta cristata",
    type: "bird",
    rarity: "uncommon",
    habitat: "Forests, parks",
    description: "Loud and proud bird with stunning blue feathers. The gossip of the forest.",
    stats: { speed: 70, strength: 30, cuteness: 75, intelligence: 75, stealth: 35 },
    colors: { primary: "#4169E1", secondary: "#FFFFFF", accent: "#000000" },
    emoji: "🐦"
  },
  {
    id: 15,
    name: "Gecko",
    species: "Gekkonidae",
    type: "reptile",
    rarity: "uncommon",
    habitat: "Warm climates, houses",
    description: "Wall-climbing ninja. Can lick its own eyeballs. Yes, really.",
    stats: { speed: 60, strength: 15, cuteness: 80, intelligence: 45, stealth: 85 },
    colors: { primary: "#9ACD32", secondary: "#FFD700", accent: "#FF6347" },
    emoji: "🦎"
  },

  // RARE (20%)
  {
    id: 16,
    name: "Fox",
    species: "Vulpes vulpes",
    type: "mammal",
    rarity: "rare",
    habitat: "Forests, urban edges",
    description: "Cunning and beautiful. Plays, pounces, and looks majestic doing it.",
    stats: { speed: 85, strength: 50, cuteness: 85, intelligence: 90, stealth: 90 },
    colors: { primary: "#FF4500", secondary: "#FFFFFF", accent: "#2F1810" },
    emoji: "🦊"
  },
  {
    id: 17,
    name: "Owl",
    species: "Strigiformes",
    type: "bird",
    rarity: "rare",
    habitat: "Forests, barns",
    description: "Silent night hunter. Can rotate head 270 degrees. Gives sage advice.",
    stats: { speed: 70, strength: 55, cuteness: 80, intelligence: 95, stealth: 95 },
    colors: { primary: "#8B7355", secondary: "#FFFAF0", accent: "#FFD700" },
    emoji: "🦉"
  },
  {
    id: 18,
    name: "Deer",
    species: "Cervidae",
    type: "mammal",
    rarity: "rare",
    habitat: "Forests, meadows",
    description: "Graceful forest dweller. Majestic antlers on the males, bambi eyes on all.",
    stats: { speed: 90, strength: 55, cuteness: 90, intelligence: 60, stealth: 75 },
    colors: { primary: "#CD853F", secondary: "#FFFAF0", accent: "#8B4513" },
    emoji: "🦌"
  },
  {
    id: 19,
    name: "Hummingbird",
    species: "Trochilidae",
    type: "bird",
    rarity: "rare",
    habitat: "Gardens, tropical areas",
    description: "Tiny helicopter bird. Wings beat 80 times per second. Lives on sugar highs.",
    stats: { speed: 100, strength: 5, cuteness: 95, intelligence: 50, stealth: 60 },
    colors: { primary: "#00FF7F", secondary: "#FF1493", accent: "#4169E1" },
    emoji: "🐦"
  },
  {
    id: 20,
    name: "Seahorse",
    species: "Hippocampus",
    type: "fish",
    rarity: "rare",
    habitat: "Coastal waters",
    description: "Tiny ocean unicorn. Males give birth. Worst swimmers but best vibes.",
    stats: { speed: 10, strength: 5, cuteness: 90, intelligence: 30, stealth: 70 },
    colors: { primary: "#FF6B6B", secondary: "#FFE66D", accent: "#4ECDC4" },
    emoji: "🐠"
  },
  {
    id: 21,
    name: "Chameleon",
    species: "Chamaeleonidae",
    type: "reptile",
    rarity: "rare",
    habitat: "Tropical forests",
    description: "Color-changing master of disguise. Eyes move independently. Ultimate spy.",
    stats: { speed: 20, strength: 15, cuteness: 75, intelligence: 60, stealth: 100 },
    colors: { primary: "#32CD32", secondary: "#FFD700", accent: "#9370DB" },
    emoji: "🦎"
  },

  // EPIC (8%)
  {
    id: 22,
    name: "Wolf",
    species: "Canis lupus",
    type: "mammal",
    rarity: "epic",
    habitat: "Wilderness, forests",
    description: "Pack leader of legends. Loyal, powerful, and howls at the moon dramatically.",
    stats: { speed: 85, strength: 85, cuteness: 70, intelligence: 90, stealth: 80 },
    colors: { primary: "#696969", secondary: "#FFFFFF", accent: "#1C1C1C" },
    emoji: "🐺"
  },
  {
    id: 23,
    name: "Eagle",
    species: "Aquila chrysaetos",
    type: "bird",
    rarity: "epic",
    habitat: "Mountains, cliffs",
    description: "Sky ruler with razor-sharp vision. Can spot a mouse from 2 miles away.",
    stats: { speed: 95, strength: 80, cuteness: 60, intelligence: 85, stealth: 70 },
    colors: { primary: "#8B4513", secondary: "#FFD700", accent: "#FFFAF0" },
    emoji: "🦅"
  },
  {
    id: 24,
    name: "Octopus",
    species: "Octopoda",
    type: "fish",
    rarity: "epic",
    habitat: "Ocean depths",
    description: "Eight-armed genius. Changes color, solves puzzles, escapes aquariums.",
    stats: { speed: 50, strength: 60, cuteness: 65, intelligence: 100, stealth: 90 },
    colors: { primary: "#FF6B6B", secondary: "#9370DB", accent: "#4169E1" },
    emoji: "🐙"
  },
  {
    id: 25,
    name: "Peacock",
    species: "Pavo cristatus",
    type: "bird",
    rarity: "epic",
    habitat: "Forests, parks",
    description: "Walking art gallery. Tail feathers are nature's ultimate flex.",
    stats: { speed: 45, strength: 35, cuteness: 85, intelligence: 55, stealth: 20 },
    colors: { primary: "#4169E1", secondary: "#00FF7F", accent: "#FFD700" },
    emoji: "🦚"
  },
  {
    id: 26,
    name: "Polar Bear",
    species: "Ursus maritimus",
    type: "mammal",
    rarity: "epic",
    habitat: "Arctic regions",
    description: "Arctic apex predator. Looks cuddly but can outswim most fish.",
    stats: { speed: 60, strength: 100, cuteness: 75, intelligence: 70, stealth: 65 },
    colors: { primary: "#FFFAFA", secondary: "#F0F8FF", accent: "#000000" },
    emoji: "🐻‍❄️"
  },

  // LEGENDARY (2%)
  {
    id: 27,
    name: "Snow Leopard",
    species: "Panthera uncia",
    type: "mammal",
    rarity: "legendary",
    habitat: "Mountain peaks",
    description: "Ghost of the mountains. So elusive, even scientists rarely see one.",
    stats: { speed: 90, strength: 85, cuteness: 90, intelligence: 85, stealth: 100 },
    colors: { primary: "#C0C0C0", secondary: "#FFFFFF", accent: "#2F2F2F" },
    emoji: "🐆"
  },
  {
    id: 28,
    name: "Phoenix Firefly",
    species: "Lampyridae ignis",
    type: "insect",
    rarity: "legendary",
    habitat: "Enchanted meadows",
    description: "Mythical glowing insect. Said to grant wishes to those who catch it.",
    stats: { speed: 70, strength: 10, cuteness: 100, intelligence: 80, stealth: 85 },
    colors: { primary: "#FF4500", secondary: "#FFD700", accent: "#FF6347" },
    emoji: "✨"
  },
  {
    id: 29,
    name: "Blue Whale",
    species: "Balaenoptera musculus",
    type: "mammal",
    rarity: "legendary",
    habitat: "Deep oceans",
    description: "Largest creature ever. Heart is the size of a car. Songs travel 1000 miles.",
    stats: { speed: 45, strength: 100, cuteness: 70, intelligence: 90, stealth: 30 },
    colors: { primary: "#4169E1", secondary: "#87CEEB", accent: "#191970" },
    emoji: "🐋"
  },
  {
    id: 30,
    name: "Golden Dragon Lizard",
    species: "Draco aureus",
    type: "reptile",
    rarity: "legendary",
    habitat: "Hidden temples",
    description: "Ancient mystical reptile. Scales shimmer like gold. Extremely rare.",
    stats: { speed: 80, strength: 70, cuteness: 85, intelligence: 95, stealth: 90 },
    colors: { primary: "#FFD700", secondary: "#FF4500", accent: "#8B0000" },
    emoji: "🐉"
  }
];

export const RARITY_WEIGHTS = {
  common: 40,
  uncommon: 30,
  rare: 20,
  epic: 8,
  legendary: 2
};

export const RARITY_COLORS = {
  common: '#9CA3AF',
  uncommon: '#22C55E',
  rare: '#3B82F6',
  epic: '#A855F7',
  legendary: '#F59E0B'
};

export const TYPE_COLORS = {
  mammal: '#EF4444',
  bird: '#60A5FA',
  reptile: '#22C55E',
  amphibian: '#14B8A6',
  fish: '#06B6D4',
  insect: '#F59E0B',
  arachnid: '#6B7280'
};

export function getRandomAnimal(): AnimalType {
  const totalWeight = Object.values(RARITY_WEIGHTS).reduce((a, b) => a + b, 0);
  let random = Math.random() * totalWeight;
  
  let selectedRarity: keyof typeof RARITY_WEIGHTS = 'common';
  for (const [rarity, weight] of Object.entries(RARITY_WEIGHTS)) {
    random -= weight;
    if (random <= 0) {
      selectedRarity = rarity as keyof typeof RARITY_WEIGHTS;
      break;
    }
  }
  
  const animalsOfRarity = ANIMALS.filter(a => a.rarity === selectedRarity);
  return animalsOfRarity[Math.floor(Math.random() * animalsOfRarity.length)];
}
