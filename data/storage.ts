import AsyncStorage from '@react-native-async-storage/async-storage';
import { AnimalType } from './animals';

export interface CaughtAnimal {
  id: string;
  animal: AnimalType;
  caughtAt: string;
  location: {
    latitude: number;
    longitude: number;
    address?: string;
  } | null;
  nickname?: string;
}

const STORAGE_KEY = '@animal_pokedex_collection';

export async function saveAnimal(caughtAnimal: CaughtAnimal): Promise<void> {
  try {
    const existing = await getCollection();
    const updated = [...existing, caughtAnimal];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error saving animal:', error);
    throw error;
  }
}

export async function getCollection(): Promise<CaughtAnimal[]> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading collection:', error);
    return [];
  }
}

export async function deleteAnimal(id: string): Promise<void> {
  try {
    const existing = await getCollection();
    const updated = existing.filter(a => a.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error deleting animal:', error);
    throw error;
  }
}

export async function clearCollection(): Promise<void> {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing collection:', error);
    throw error;
  }
}

export function generateUniqueId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
