import React from 'react';

export default function GlassBox({ children, className = '', isLink = false }) {
  const isDisabled = isLink && (
    className.includes('cursor-not-allowed') || 
    children.props?.url === "https://example.com/support" || 
    children.props?.url === "https://example.com/crunchbase"
  );

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-white/10 bg-white/5 dark:bg-black/5 backdrop-blur-sm shadow-sm ${className} ${isLink ? 'glass-box-glow' : ''} ${isDisabled ? 'opacity-60' : ''}`}
      style={{
        boxShadow: isLink 
          ? '0 2px 8px 0 rgba(0,0,0,0.08), 0 1px 0 0 rgba(255,255,255,0.02) inset'
          : '0 4px 32px 0 rgba(0,0,0,0.10), 0 1px 0 0 rgba(255,255,255,0.05) inset',
        backdropFilter: isLink ? (isDisabled ? 'blur(6px)' : 'blur(12px)') : undefined,
        backgroundColor: isLink ? (isDisabled ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 0.08)') : undefined,
      }}
    >
      {/* Minimal gradient overlay for depth - sadece profil kutucuğu için */}
      {!isLink && (
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 50%, rgba(0,0,0,0.02) 100%)'
          }}
        />
      )}
      {/* İçerik */}
      <div className={`relative ${isLink ? 'glass-box-content' : 'z-10'}`}>{children}</div>
    </div>
  );
} 