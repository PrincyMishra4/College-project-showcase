'use client';

import { useState, useEffect } from 'react';

// Check if code is running on client-side
export const isClient = typeof window !== 'undefined';

/**
 * Generate a consistent position based on id/seed for server-side rendering
 * @param {string|number} id - Seed/identifier for the position
 * @param {number} min - Minimum range value
 * @param {number} max - Maximum range value
 */
export function generateConsistentPosition(id, min = 0, max = 100) {
  // Generate a deterministic value from id string or number
  let seed;
  if (typeof id === 'string') {
    // Convert string to a number representation
    seed = [...id].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  } else {
    seed = id;
  }

  // Use a simple but consistent pseudo-random algorithm
  const x = Math.sin(seed * 9999) * 10000;
  const value = Math.abs(x - Math.floor(x));
  
  // Scale to range
  return min + value * (max - min);
}

/**
 * Hook to create a set of consistent random positions for particles or elements
 * @param {number} count - Number of particles to generate
 * @param {number} seed - Base seed value to ensure consistency
 */
export function useConsistentParticlePositions(count, seed = 42) {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const generatedPositions = Array.from({ length: count }, (_, i) => ({
      left: generateConsistentPosition(seed + i * 3 + 1, 1, 99),
      top: generateConsistentPosition(seed + i * 3 + 2, 1, 99),
      delay: generateConsistentPosition(seed + i * 3 + 3, 0, 2),
      duration: generateConsistentPosition(seed + i * 3 + 4, 2, 5)
    }));
    
    setPositions(generatedPositions);
  }, [count, seed]);

  return positions;
}

/**
 * Component that only renders on client-side
 * Use this to wrap components that have animation or random values
 */
export function ClientOnly({ children, fallback = null }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) {
    return fallback;
  }

  return children;
}

/**
 * Hook that returns a stable reference to window-dependent values
 */
export function useWindowSize() {
  const [size, setSize] = useState({
    width: isClient ? window.innerWidth : 0,
    height: isClient ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (!isClient) return;
    
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}
