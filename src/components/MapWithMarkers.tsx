import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Linking, StyleSheet, Text, View } from 'react-native';
import type { MapLocation } from '../services/wordpress';
import { fetchMapLocations } from '../services/wordpress';

const DEFAULT_REGION = {
  latitude: -12.9777,
  longitude: -38.5016,
  latitudeDelta: 0.2,
  longitudeDelta: 0.2
};

export function MapWithMarkers() {
  const [locations, setLocations] = useState<MapLocation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      const data = await fetchMapLocations();
      if (isMounted) {
        setLocations(data);
        setLoading(false);
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff6600" />
        <Text style={styles.loadingText}>Carregando mapa…</Text>
      </View>
    );
  }

  return (
    <MapView style={StyleSheet.absoluteFill} provider={PROVIDER_GOOGLE} initialRegion={DEFAULT_REGION}>
      {locations.map((location) => (
        <Marker
          key={location.id}
          coordinate={{ latitude: location.latitude, longitude: location.longitude }}
          title={location.title}
          description={location.address ?? location.excerpt?.replace(/<[^>]+>/g, '')}
          onCalloutPress={() => {
            if (location.link) {
              Linking.openURL(location.link).catch(console.error);
            }
          }}
        />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#444'
  }
});
