'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

// Add sun position calculation helper
function calculateSunPosition() {
  const date = new Date();
  const time = date.getUTCHours() + (date.getUTCMinutes() / 60);
  // Approximate sun's longitude based on time (rough calculation)
  const sunLng = ((time - 12) * 15) - 180;
  // Approximate sun's latitude based on day of year and season
  const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  const sunLat = 23.5 * Math.sin((dayOfYear - 172) * (2 * Math.PI / 365));
  return [sunLng, sunLat];
}

// Define locations data
const locations = {
  lived: [
    {
      name: "Mentor, Ohio",
      coordinates: [-81.6944, 41.4993],
      type: "lived"
    },
    {
      name: "Ocean Beach, New Jersey",
      coordinates: [-74.1679, 39.9454],
      type: "lived"
    },
    {
      name: "Glenmoore, PA",
      coordinates: [-75.7327, 40.0537],
      type: "lived"
    },
    {
      name: "Oakland, PA",
      coordinates: [-79.9959, 40.4406],
      type: "lived"
    },
    {
      name: "Ann Arbor, Michigan",
      coordinates: [-83.7430, 42.2808],
      type: "lived"
    },
    {
      name: "London, UK",
      coordinates: [-0.1276, 51.5072],
      type: "lived"
    },
    {
      name: "Singapore",
      coordinates: [103.8198, 1.3521],
      type: "lived"
    },
    {
      name: "Kuala Lumpur, Malaysia",
      coordinates: [101.6869, 3.1390],
      type: "lived"
    },
    {
      name: "Shanghai, China",
      coordinates: [121.4737, 31.2304],
      type: "lived"
    }
  ]
};

// Create a dynamic Map component that only loads on the client side
function MapComponent() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [mapboxgl, setMapboxgl] = useState(null);
  const sunPosition = useRef(calculateSunPosition());
  const animationFrame = useRef(null);

  useEffect(() => {
    // Dynamically import mapbox-gl
    import('mapbox-gl').then((mapboxModule) => {
      setMapboxgl(mapboxModule.default);
    });
  }, []);

  useEffect(() => {
    if (!mapboxgl || !process.env.NEXT_PUBLIC_MAPBOX_TOKEN) return;
    if (map.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    
    // Use light style
    const styleUrl = 'mapbox://styles/mapbox/light-v11';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: styleUrl,
      center: [20, 30],
      zoom: 1.8,
      projection: 'globe'
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.current.on('style.load', () => {
      // Enhanced atmosphere effect with space-like background
      map.current.setFog({
        color: 'rgb(16, 24, 40)', // deep space color
        'high-color': 'rgb(23, 36, 84)', // dark blue space
        'horizon-blend': 0.1,
        'space-color': 'rgb(0, 0, 15)', // deep space black/blue
        'star-intensity': 0.8 // more visible stars
      });

      // Add sun layer
      map.current.addSource('sun', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: sunPosition.current
          }
        }
      });

      // Add glow source for locations
      map.current.addSource('glow-source', {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': locations.lived.map(location => ({
            'type': 'Feature',
            'geometry': {
              'type': 'Point',
              'coordinates': location.coordinates
            }
          }))
        }
      });

      // Add glow layer correctly
      map.current.addLayer({
        'id': 'glow',
        'type': 'circle',
        'source': 'glow-source',
        'minzoom': 0,
        'maxzoom': 22,
        'paint': {
          'circle-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            0, 20,  // Size at zoom level 0
            2, 20,  // Size at zoom level 2
            4, 20,  // Size at zoom level 4
            22, 20  // Size at max zoom
          ],
          'circle-color': '#FF3C00',
          'circle-opacity': 0.4,
          'circle-blur': 1
        }
      });

      // Add city lights effect for lived locations
      locations.lived.forEach((location, index) => {
        map.current.addSource(`city-light-${index}`, {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Point',
              coordinates: location.coordinates
            }
          }
        });

        // Add city light glow
        map.current.addLayer({
          id: `city-glow-${index}`,
          type: 'circle',
          source: `city-light-${index}`,
          minzoom: 0,
          maxzoom: 22,
          paint: {
            'circle-radius': [
              'interpolate',
              ['linear'],
              ['zoom'],
              0, 20,  // Size at zoom level 0
              2, 20,  // Size at zoom level 2
              4, 20,  // Size at zoom level 4
              22, 20  // Size at max zoom
            ],
            'circle-color': '#ffeb3b',
            'circle-opacity': 0.15,
            'circle-blur': 1
          }
        });
      });
    });

    // Update sun position and lighting
    const updateSunPosition = () => {
      if (!map.current || !map.current.isStyleLoaded()) {
        // If style isn't loaded yet, try again in the next frame
        animationFrame.current = requestAnimationFrame(updateSunPosition);
        return;
      }
      
      const newSunPosition = calculateSunPosition();
      sunPosition.current = newSunPosition;

      try {
        if (map.current.getSource('sun')) {
          map.current.getSource('sun').setData({
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Point',
              coordinates: newSunPosition
            }
          });
        }

        // Update atmosphere - space-like appearance
        map.current.setFog({
          'color': 'rgb(16, 24, 40)', // deep space color
          'high-color': 'rgb(23, 36, 84)', // dark blue space
          'horizon-blend': 0.1,
          'space-color': 'rgb(0, 0, 15)', // deep space black/blue
          'star-intensity': 0.8 // more visible stars
        });
      } catch (error) {
        console.warn('Error updating map:', error);
      }

      animationFrame.current = requestAnimationFrame(updateSunPosition);
    };

    // Start sun position updates
    updateSunPosition();

    // Add gentle rotation animation - now eastward and faster
    const startTime = Date.now();
    const rotateGlobe = () => {
      if (!map.current) return;
      
      // Calculate elapsed time
      const elapsed = Date.now() - startTime;
      
      // Complete rotation in 15 seconds
      const rotationProgress = (elapsed % 15000) / 15000;
      
      // Start and end at US view (-95 is roughly central US longitude)
      const startLng = -95;
      // Calculate longitude based on progress (rotate eastward)
      const newLng = startLng + (rotationProgress * 360);
      
      map.current.setCenter([newLng, map.current.getCenter().lat]);
      
      // Stop rotation after one full spin
      if (elapsed < 15000) {
        requestAnimationFrame(rotateGlobe);
      } else {
        // Ensure we end exactly at the US view
        map.current.setCenter([startLng, map.current.getCenter().lat]);
      }
    };

    map.current.on('load', () => {
      // Start the rotation
      rotateGlobe();

      // Calculate bounds that include all locations
      const bounds = new mapboxgl.LngLatBounds();
      
      // Extend bounds with all locations
      locations.lived.forEach(location => {
        bounds.extend(location.coordinates);
      });

      // Fit map to show all locations with padding
      map.current.fitBounds(bounds, {
        padding: 50,
        duration: 2000
      });

      // Create the pulsing dot image ONCE before the loop
      const size = 150; // Larger radius for general areas
      const pulsingDot = {
        width: size,
        height: size,
        data: new Uint8Array(size * size * 4),
        
        onAdd: function() {
          const canvas = document.createElement('canvas');
          canvas.width = this.width;
          canvas.height = this.height;
          this.context = canvas.getContext('2d');
        },
        
        render: function() {
          const duration = 1000;
          const t = (performance.now() % duration) / duration;
          
          const radius = (size / 2) * 0.3;
          const outerRadius = (size / 2) * 0.7 * t + radius;
          const context = this.context;
          
          context.clearRect(0, 0, this.width, this.height);
          context.beginPath();
          context.arc(
            this.width / 2,
            this.height / 2,
            outerRadius,
            0,
            Math.PI * 2
          );
          context.fillStyle = `rgba(255, 60, 0, ${1 - t})`;
          context.fill();
          
          context.beginPath();
          context.arc(
            this.width / 2,
            this.height / 2,
            radius,
            0,
            Math.PI * 2
          );
          context.fillStyle = 'rgba(255, 60, 0, 1)';
          context.strokeStyle = 'white';
          context.lineWidth = 2 + 4 * (1 - t);
          context.fill();
          context.stroke();
          
          this.data = context.getImageData(
            0,
            0,
            this.width,
            this.height
          ).data;
          
          map.current.triggerRepaint();
          return true;
        }
      };

      // Add the image ONCE before the loop
      map.current.addImage('pulsing-dot-lived', pulsingDot, { pixelRatio: 2 });

      // Now add sources and layers for each location
      locations.lived.forEach(location => {
        // Add a layer for the larger radius area
        map.current.addSource(`area-lived-${location.name}`, {
          'type': 'geojson',
          'data': {
            'type': 'Feature',
            'geometry': {
              'type': 'Point',
              'coordinates': location.coordinates
            }
          }
        });

        map.current.addLayer({
          'id': `area-lived-${location.name}`,
          'type': 'symbol',
          'source': `area-lived-${location.name}`,
          'minzoom': 0,
          'maxzoom': 22,
          'layout': {
            'icon-image': 'pulsing-dot-lived',
            'icon-size': [
              'interpolate',
              ['linear'],
              ['zoom'],
              0, 1,    // Size at zoom level 0
              2, 1,    // Size at zoom level 2
              4, 1,    // Size at zoom level 4
              22, 1    // Size at max zoom
            ],
            'icon-allow-overlap': true,
            'icon-ignore-placement': true
          }
        });

        // Add popup
        const popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false
        });

        map.current.on('mouseenter', `area-lived-${location.name}`, () => {
          popup.setLngLat(location.coordinates)
            .setHTML(`<h3 class="font-bold">${location.name}</h3>`)
            .addTo(map.current);
        });

        map.current.on('mouseleave', `area-lived-${location.name}`, () => {
          popup.remove();
        });
      });

      // Add space-like atmosphere effect
      map.current.setFog({
        'range': [0.8, 8],
        'color': 'rgb(16, 24, 40)', // deep space color
        'high-color': 'rgb(23, 36, 84)', // dark blue space
        'horizon-blend': 0.1,
        'space-color': 'rgb(0, 0, 15)', // deep space black/blue
        'star-intensity': 0.8 // more visible stars
      });
    });

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      map.current?.remove();
    };
  }, [mapboxgl]);

  // No style change effect needed anymore

  return (
    <div 
      ref={mapContainer} 
      className="w-full h-[700px] rounded-lg overflow-hidden border border-foreground/10 shadow-lg"
    />
  );
}

// Dynamically import the CSS
const MapWithNoSSR = dynamic(
  () => Promise.resolve(MapComponent),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-[700px] rounded-lg overflow-hidden border border-foreground/10 bg-foreground/5 flex items-center justify-center">
        <div className="text-foreground/70">Loading map...</div>
      </div>
    )
  }
);

export default function Travel() {
  return (
<div className="container mx-auto">
<section className="pt-24 pb-20 bg-background">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-mono)]">Places I&apos;ve Called Home</h1>
          <p className="text-foreground/70 mb-8">
            From Philadelphia to Asia to Cleveland, here&apos;s a map of the places I&apos;ve lived and called home.
          </p>
          
          <div className="mb-8 flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#FF3C00]"></div>
              <span className="text-sm">Places I&apos;ve Lived</span>
            </div>
          </div>

          <MapWithNoSSR />
        </div>
      </section>
    </div>
  );
}