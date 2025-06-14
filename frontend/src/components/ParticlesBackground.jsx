'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useConsistentParticlePositions, ClientOnly } from '@/utils/clientUtils';

/**
 * A background component with animated particles
 * @param {Object} props - Component props
 * @param {string} props.className - Additional className for container
 * @param {number} props.particleCount - Number of particles to render
 * @param {number} props.seed - Seed for consistent positioning
 * @param {string} props.particleClassName - Class for particles (small/large)
 */
const ParticlesBackground = ({ 
  className = "", 
  particleCount = 10, 
  seed = 42,
  particleClassName = "bg-white/30",
  particleSize = "w-2 h-2"
}) => {
  // Get consistent positions for server and client
  const positions = useConsistentParticlePositions(particleCount, seed);
  
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Background gradient orbs - These are okay as they're just decorative and position isn't critical */}
      <ClientOnly>
        <motion.div
          className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-primary-400/10 to-accent-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 90, 180],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-tr from-accent-400/10 to-primary-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [180, 90, 0],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </ClientOnly>

      {/* Particles with consistent positions */}
      {positions.map((pos, i) => (
        <ClientOnly key={i}>
          <motion.div
            className={`absolute ${particleSize} ${particleClassName} rounded-full`}
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
            }}
            initial={{ opacity: 0.3, scale: 0.6 }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.6, 1, 0.6],
            }}
            transition={{
              duration: pos.duration,
              repeat: Infinity,
              repeatType: "mirror",
              delay: pos.delay,
            }}
          />
        </ClientOnly>
      ))}
    </div>
  );
};

// Export both the component and a client-side only version
export default ParticlesBackground;

// Use this when you need to ensure the component only runs on client
export const ClientParticlesBackground = (props) => (
  <ClientOnly>
    <ParticlesBackground {...props} />
  </ClientOnly>
);
