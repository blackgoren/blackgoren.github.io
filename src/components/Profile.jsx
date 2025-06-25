// src/components/Profile.jsx
import React, { useState } from 'react';
import SplitText from './animations/SplitText';
import BlurText from './animations/BlurText';

export default function Profile({ avatar, name, bio }) {
  const [isHovered, setIsHovered] = useState(false);
  const handleNameAnimationComplete = () => {
    console.log('Name animation completed!');
  };

  const handleBioAnimationComplete = () => {
    console.log('Bio animation completed!');
  };

  return (
    <div className="group animate-slideUp px-2">
      {/* Profile Image with blue blur glow */}
      <div className="flex justify-center">
        <div className="relative w-32 h-32">
          <span className="block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-[#0081FB] opacity-80 blur-[72px] z-0 pointer-events-none"></span>
          
          {/* Instagram Style 3D Flip Container */}
          <div 
            className="relative w-32 h-32 cursor-pointer"
            style={{ 
              perspective: '1000px',
              transformStyle: 'preserve-3d'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Front Image (Avatar) */}
            <img
              src={avatar}
              alt={name}
              className="absolute w-32 h-32 rounded-full object-cover shadow-lg"
              style={{ 
                backfaceVisibility: 'hidden',
                transform: isHovered ? 'rotateY(-180deg) scale(0.95)' : 'rotateY(0deg) scale(1)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                transformOrigin: 'center center'
              }}
            />
            
            {/* Back Image (Intelbus) */}
            <img
              src="/images/Intelbus.svg"
              alt="Intelbus"
              className="absolute w-32 h-32 rounded-full object-cover shadow-lg"
              style={{ 
                backfaceVisibility: 'hidden',
                transform: isHovered ? 'rotateY(0deg) scale(1)' : 'rotateY(180deg) scale(0.95)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                transformOrigin: 'center center'
              }}
            />
          </div>
        </div>
      </div>

      {/* Animasyon için ek CSS: */}
      <style jsx>{`
        .animate-spin-slower {
          animation: spin 12s linear infinite;
        }
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
      `}</style>

      {/* Name with simple text */}
      <div className="mt-6 text-center">
        <div className="relative overflow-hidden flex items-center justify-center">
          <span className="block text-3xl font-bold text-white tracking-wide font-display">Harun GÖREN</span>
        </div>
        
        {/* Username */}
        <div className="mt-2 text-center">
          <div className="relative overflow-hidden flex items-center justify-center">
            <span className="text-base text-gray-300 font-medium tracking-wide">@blackgoren</span>
            {/* Meta Verified Badge */}
            <img src="/images/verified.png" alt="Verified" className="w-4 h-4 ml-1.5 align-middle" style={{ transform: 'translateY(1px)' }} />
          </div>
        </div>

        {/* Decorative separator */}
        <div className="mt-4 flex justify-center">
          <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        </div>

        {/* Bio with colored @intelbus */}
        <div className="mt-6 text-sm text-white leading-snug font-light tracking-wide max-w-md mx-auto">
          Co-Founder <a href="http://teknobus.com/" target="_blank" rel="noopener noreferrer" className="text-[#0081FB] font-semibold hover:text-[#0066CC] transition-colors duration-200">@intelbus</a> I Innovating Smart Transportation Systems | Passionate About Urban Mobility & Technology
        </div>
      </div>
    </div>
  );
}