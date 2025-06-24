// src/components/LinkButton.jsx
import React from 'react';

export default function LinkButton({ url, icon: Icon, title }) {
  const isDisabled = url === "https://example.com/support" || url === "https://example.com/crunchbase";
  const isIntelbusLink = title === "INTELBUS" || url.includes("teknobus.com") || url.includes("intelbustr") || url.includes("facebook.com/61571289511657");
  
  if (isDisabled) {
    return (
      <div className="group block w-full cursor-not-allowed opacity-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {Icon && (
              <span className="text-xl text-white/60 transition-all duration-300">
                <Icon />
              </span>
            )}
            <div className="w-px h-3 bg-white/10"></div>
            <span className="text-base font-light tracking-wide text-white/60">
              {title}
            </span>
          </div>
          <svg 
            className="w-3 h-3 text-white/30 flex-shrink-0" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
            />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block w-full"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {Icon && (
            <span className="text-xl text-white transition-all duration-300 group-hover:scale-110">
              <Icon />
            </span>
          )}
          <div className="w-px h-3 bg-white/20"></div>
          <span className="text-base font-light tracking-wide text-white transition-all duration-300 group-hover:text-blue-200">
            {title}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          {isIntelbusLink && (
            <img 
              src="/images/Intelbus.svg" 
              alt="Intelbus" 
              className="w-5 h-5 opacity-80 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110"
            />
          )}
          <svg 
            className="w-3 h-3 text-white/60 transition-all duration-300 group-hover:text-white group-hover:scale-110 flex-shrink-0" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
            />
          </svg>
        </div>
      </div>
    </a>
  );
}