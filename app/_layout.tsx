import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

export default function TabLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: '#0F0F1A' }}>
      <StatusBar style="light" />
      <Tabs
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1a1a2e',
          },
          headerTintColor: '#FFF',
          headerTitleStyle: {
            fontWeight: '700',
          },
          tabBarStyle: {
            backgroundColor: '#1a1a2e',
            borderTopColor: '#2D2D44',
            borderTopWidth: 1,
            paddingTop: 5,
            height: 85,
          },
          tabBarActiveTintColor: '#F59E0B',
          tabBarInactiveTintColor: '#6B7280',
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '600',
            marginBottom: 5,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Catch',
            headerTitle: '🎯 Animal Catcher',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="camera" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="collection"
          options={{
            title: 'Pokédex',
            headerTitle: '📚 My Pokédex',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="albums" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="map"
          options={{
            title: 'Map',
            headerTitle: '🗺️ Discovery Map',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="map" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="progress"
          options={{
            title: 'Progress',
            headerTitle: '📊 Progress',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="stats-chart" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
