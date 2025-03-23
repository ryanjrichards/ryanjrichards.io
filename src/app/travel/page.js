'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import './page.css';
// Import the CSS for Mapbox GL JS
import 'mapbox-gl/dist/mapbox-gl.css';

// Create a dynamic Map component that only loads on the client side
function MapComponent() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [mapboxgl, setMapboxgl] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load mapbox-gl
    import('mapbox-gl')
      .then((mapboxModule) => {
        console.log("Mapbox loaded successfully");
        setMapboxgl(mapboxModule.default);
      })
      .catch(error => {
        console.error("Error loading Mapbox:", error);
        setError("Failed to load Mapbox library");
      });
  }, []);

  useEffect(() => {
    if (!mapboxgl) return;
    if (map.current) return;

    try {
      // Get token from environment variable
      const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
      
      if (!token) {
        console.error('Mapbox token is missing! Check your .env.local file');
        setError("Mapbox token is missing. Please check your environment variables.");
        return;
      }

      console.log("Setting up map with token available:", !!token);
      
      // Set access token
      mapboxgl.accessToken = token;
      
      // Create map with a simple style
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11', // Using light-v11 style
        center: [0, 30],
        zoom: 1.5,
        projection: 'mercator', // Use mercator instead of globe for better compatibility
      });

      // Add navigation control
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      
      // Add event listeners for debugging
      map.current.on('load', () => {
        console.log("Map fully loaded!");
        setMapLoaded(true);
        
        // Add markers for the locations
        addLocationMarkers();
      });
      
      map.current.on('error', (e) => {
        console.error('Mapbox map error:', e);
        setError(`Map error: ${e.error?.message || 'Unknown error'}`);
      });
      
    } catch (error) {
      console.error('Error initializing Mapbox:', error);
      setError(`Error initializing map: ${error.message}`);
    }

    // Function to add markers for locations
    const addLocationMarkers = () => {
      if (!map.current) return;
      
      const locations = [
        {
          name: "Mentor, Ohio",
          coordinates: [-81.6944, 41.4993],
        },
        {
          name: "Ocean Beach, New Jersey",
          coordinates: [-74.1679, 39.9454],
        },
        {
          name: "Glenmoore, PA",
          coordinates: [-75.7327, 40.0537],
        },
        {
          name: "Oakland, PA",
          coordinates: [-79.9959, 40.4406],
        },
        {
          name: "Ann Arbor, Michigan",
          coordinates: [-83.7430, 42.2808],
        },
        {
          name: "London, UK",
          coordinates: [-0.1276, 51.5072],
        },
        {
          name: "Singapore",
          coordinates: [103.8198, 1.3521],
        },
        {
          name: "Kuala Lumpur, Malaysia",
          coordinates: [101.6869, 3.1390],
        },
        {
          name: "Shanghai, China",
          coordinates: [121.4737, 31.2304],
        }
      ];
      
      // Calculate bounds that include all locations
      const bounds = new mapboxgl.LngLatBounds();
      
      // Add markers and extend bounds
      locations.forEach(location => {
        // Extend bounds with location
        bounds.extend(location.coordinates);
        
        // Create marker element
        const markerEl = document.createElement('div');
        markerEl.className = 'marker';
        markerEl.style.width = '15px';
        markerEl.style.height = '15px';
        markerEl.style.borderRadius = '50%';
        markerEl.style.backgroundColor = '#FF3C00';
        markerEl.style.border = '2px solid white';
        markerEl.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
        
        // Add marker to map
        new mapboxgl.Marker(markerEl)
          .setLngLat(location.coordinates)
          .setPopup(new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<h3 class="popup-content" style="margin: 0; padding: 5px;">${location.name}</h3>`))
          .addTo(map.current);
      });
      
      // Fit map to show all locations with padding
      map.current.fitBounds(bounds, {
        padding: 50,
        duration: 1000
      });
    };

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [mapboxgl]);

  return (
    <div className="w-full">
      {error && (
        <div className="p-4 mb-4 bg-red-50 border border-red-200 rounded-md text-red-700">
          {error}
          <div className="mt-2 text-sm">
            <p>Please check your Mapbox token:</p>
            <ol className="list-decimal pl-4 mt-1">
              <li>Verify your token is active in your Mapbox account dashboard</li>
              <li>Make sure it has the correct scopes (styles:read, fonts:read, etc.)</li>
              <li>Update your .env.local file with a fresh token</li>
              <li>Ensure the public URL restrictions (if any) include your development URL</li>
            </ol>
          </div>
        </div>
      )}
      
      <div 
        ref={mapContainer} 
        className="w-full h-[500px] rounded-lg overflow-hidden border border-gray-200 shadow-lg"
      />
      
      <div className="mt-2 text-sm text-gray-600 flex items-center">
        <div className="flex items-center gap-2 mr-4">
          <div className="w-3 h-3 rounded-full bg-[#FF3C00] border border-white shadow-sm"></div>
          <span>Places I&apos;ve Lived</span>
        </div>
        
      </div>
    </div>
  );
}

// Dynamically import the component
const MapWithNoSSR = dynamic(
  () => Promise.resolve(MapComponent),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-[500px] bg-gray-100 flex items-center justify-center rounded-lg border border-gray-200">
        <div className="text-gray-500">Loading map component...</div>
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
          
          <MapWithNoSSR />
        </div>
      </section>
    </div>
  );
}