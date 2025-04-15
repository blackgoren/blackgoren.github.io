<template>
  <div class="cursor" aria-hidden="true"></div>
  <div class="ripple" v-if="showRipple" :style="rippleStyle"></div>
  <!-- Outer container for the profile section -->
  <main class="common" role="main" aria-label="Ana içerik">
    <div class="gradient-overlay" :style="gradientStyle" aria-hidden="true"></div>
    <!-- Wrapper for all the content -->
    <div class="wraper" role="region" aria-label="Profil bilgileri">
      <!-- Avatar section -->
      <div class="avatar" role="img" aria-label="Profil fotoğrafı">
        <img :src="avatarPath" alt="Harun GÖREN profil fotoğrafı" loading="lazy" draggable="false" oncontextmenu="return false;" />
      </div>

      <!-- Displaying user's name, job title, MBTI, and description -->
      <h1 class="username">
        blackgoren
        <span class="verified-badge">
          <img src="./assets/logos/VerificationBadge.svg" alt="Doğrulanmış hesap" />
        </span>
      </h1>
      <div class="jobtitle">Co-Founder <span class="company">INTELBUS</span></div>
      <div class="MBTI">Entrepreneur</div>
      <div class="description">
        Hi, I'm Harun GÖREN, a tech entrepreneur based in Türkiye. I led teams on various innovative projects and continue to build tech-driven solutions that make a difference. If you'd like to stay updated on what I'm working on or follow my journey, you're in the right place.
      </div>

      <div class="divider" role="separator" aria-hidden="true"></div>

      <!-- Social links section -->
      <nav class="sociallinks" aria-label="Sosyal medya bağlantıları">
        <div class="link" v-for="item of socialLinks" @click="openLink(item.link)" role="link" :aria-label="item.title + ' profiline git'" tabindex="0" @keydown.enter="openLink(item.link)" :class="{ disabled: !item.isPersonal }">
          <img :src="item.icon" :alt="item.title + ' ikonu'" class="mx-8px text-20px" loading="lazy" />
          <div class="linkTitle">{{ item.title }}</div>
          <div class="linkIcon">
            <img v-if="item.isPersonal" src="./assets/logos/external-link.svg" alt="Dış bağlantı" class="icon-white" loading="lazy" />
            <img v-else src="./assets/logos/hideSvgrepo.svg" alt="Gizli profil" class="icon-white" loading="lazy" />
          </div>
        </div>
      </nav>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import CrunchbaseLogo from './assets/logos/CrunchbaseLogo.svg'
import LinkedinLogo from './assets/logos/Linkedin.svg'
import InstagramLogo from './assets/logos/Instagram.svg'
import TwitterLogo from './assets/logos/Twitter.svg'
import YoutubeLogo from './assets/logos/Youtube.svg'
import GithubLogo from './assets/logos/GitHub.svg'

// Function to open a new window when a link is clicked
const openLink = (link: string) => {
  window.open(link, "__blank");
};

const showRipple = ref(false);
const rippleStyle = ref({});

// Function to create water ripple effect
const createRipple = (e: MouseEvent) => {
  const x = e.clientX;
  const y = e.clientY;
  rippleStyle.value = {
    left: `${x}px`,
    top: `${y}px`,
  };
  showRipple.value = true;
  setTimeout(() => {
    showRipple.value = false;
  }, 600);
};

const avatarPath = computed(() => {
  return new URL('./assets/avatar.png', import.meta.url).href;
});

const gradientStyle = ref({
  backgroundPosition: '50% 50%'
});

const handleMouseMove = (e: MouseEvent) => {
  const x = (e.clientX / window.innerWidth) * 100;
  const y = (e.clientY / window.innerHeight) * 100;
  
  gradientStyle.value = {
    backgroundPosition: `${x}% ${y}%`
  };
};

// Sosyal medya linklerini tanımlayalım
const socialLinks = [
  {
    title: 'Crunchbase',
    icon: CrunchbaseLogo,
    link: 'https://www.crunchbase.com/',
    isPersonal: false
  },
  {
    title: 'LinkedIn',
    icon: LinkedinLogo,
    link: 'https://www.linkedin.com/in/harun-g%C3%B6ren-b50109254/',
    isPersonal: true
  },
  {
    title: 'Instagram',
    icon: InstagramLogo,
    link: 'https://www.instagram.com/blackgoren/',
    isPersonal: true
  },
  {
    title: 'X (Twitter)',
    icon: TwitterLogo,
    link: 'https://twitter.com/',
    isPersonal: false
  },
  {
    title: 'YouTube',
    icon: YoutubeLogo,
    link: 'https://www.youtube.com/',
    isPersonal: false
  },
  {
    title: 'GitHub',
    icon: GithubLogo,
    link: 'https://github.com/',
    isPersonal: false
  }
];

onMounted(() => {
  const cursor = document.querySelector('.cursor');
  
  if (cursor) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      handleMouseMove(e);
    });

    // Fare imlecinin görünürlüğünü kontrol et
    document.addEventListener('mouseenter', () => {
      cursor.style.display = 'block';
    });

    document.addEventListener('mouseleave', () => {
      cursor.style.display = 'none';
    });
  }
});
</script>

<style scoped lang="scss">
@keyframes gradientBackground {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes glow {
  0% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.3); }
  50% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.5); }
  100% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.3); }
}

@keyframes ripple {
  0% {
    transform: scale(0);
    opacity: 0.5;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
}

.ripple {
  position: fixed;
  width: 10px;
  height: 10px;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  animation: ripple 0.6s linear;
}

/* Global scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

/* Smooth scroll behavior */
:root {
  scroll-behavior: smooth;
}

/* Custom cursor styles */
* {
  cursor: none !important;
}

.cursor {
  position: fixed;
  width: 16px;
  height: 16px;
  border: 1.5px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  animation: pulse 1s ease-in-out infinite;
  display: block !important;
  user-select: none;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  pointer-events: none;
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 4px;
    height: 4px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }
}

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 0.7;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
}

.common {
  min-height: 100vh;
  width: 100%;
  background: radial-gradient(circle at 50% 50%, #003949, #010219, #010219);
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  
  .gradient-overlay {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 50%, #003949, #010219, #010219);
    background-size: 200% 200%;
    filter: blur(80px);
    opacity: 0.7;
    transition: background-position 0.1s ease-out;
    z-index: 0;
    pointer-events: none;
  }

  .wraper {
    position: relative;
    z-index: 2;
    max-width: 800px;
    width: 100%;
    padding: 48px 32px;
    margin: 48px auto;
    box-sizing: border-box;
    text-align: center;
    animation: fadeIn 1s ease-out;
    background: rgba(11, 5, 25, 0.4);
    backdrop-filter: blur(20px);
    border-radius: 24px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    height: auto;
    min-height: calc(100vh - 96px);

    @media (max-width: 768px) {
      margin: 24px 16px;
      padding: 32px 20px;
    }

    @media (max-width: 480px) {
      margin: 16px 12px;
      padding: 24px 16px;
    }

    .avatar {
      height: 96px;
      width: 96px;
      border-radius: 50%;
      overflow: hidden;
      margin: 0 auto;
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      
      @media (max-width: 480px) {
        height: 80px;
        width: 80px;
      }
      
      &:hover {
        transform: scale(1.1);
        box-shadow: 
          0 0 30px rgba(0, 247, 255, 0.2),
          0 0 60px rgba(255, 0, 221, 0.2),
          0 0 90px rgba(0, 247, 255, 0.2);
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
      }
    }
    .username {
      font-size: 24px;
      font-weight: 600;
      margin-top: 20px;
      background: linear-gradient(120deg, #fff, #e0e0e0);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: fadeIn 0.8s ease-out;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      letter-spacing: 0.5px;
      line-height: 1.4;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;

      @media (max-width: 480px) {
        font-size: 20px;
      }

      .verified-badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        transform: translateY(1px);
        
        @media (max-width: 480px) {
          width: 18px;
          height: 18px;
        }
        
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
    }
    .jobtitle {
      color: rgba(255, 255, 255, 0.8);
      font-size: 15px;
      font-weight: 400;
      margin-top: 12px;
      animation: fadeIn 0.8s ease-out;
      animation-delay: 0.1s;
      animation-fill-mode: both;
      letter-spacing: 0.5px;

      @media (max-width: 480px) {
        font-size: 14px;
        margin-top: 8px;
      }

      .company {
        font-weight: 600;
        background: linear-gradient(120deg, #fff, #e0e0e0);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        margin-left: 4px;
      }
    }
    .MBTI {
      margin: 20px auto;
      padding: 4px 12px;
      width: max-content;
      height: auto;
      line-height: 20px;
      color: rgba(255, 255, 255, 0.9);
      font-size: 12px;
      font-weight: 500;
      border-radius: 20px;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
      backdrop-filter: blur(5px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      animation: fadeIn 0.8s ease-out;
      animation-delay: 0.2s;
      animation-fill-mode: both;
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-2px);
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.15));
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }
    }
    .description {
      color: rgba(255, 255, 255, 0.8);
      margin: 24px auto 48px;
      text-align: center;
      font-size: 14px;
      font-weight: 400;
      line-height: 1.7;
      max-width: 720px;
      animation: fadeIn 0.8s ease-out;
      animation-delay: 0.3s;
      animation-fill-mode: both;
      letter-spacing: 0.3px;
      padding: 0 20px;

      @media (max-width: 768px) {
        margin: 20px auto 40px;
        padding: 0 16px;
      }

      @media (max-width: 480px) {
        font-size: 13px;
        margin: 16px auto 32px;
        padding: 0 12px;
        line-height: 1.6;
      }
    }
    .divider {
      width: 60%;
      height: 1px;
      margin: 0 auto 48px;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.3) 20%,
        rgba(255, 255, 255, 0.5) 50%,
        rgba(255, 255, 255, 0.3) 80%,
        transparent
      );
      animation: fadeIn 0.8s ease-out;
      animation-delay: 0.4s;
      animation-fill-mode: both;

      @media (max-width: 768px) {
        width: 70%;
        margin-bottom: 40px;
      }

      @media (max-width: 480px) {
        width: 80%;
        margin-bottom: 32px;
      }
    }
    .sociallinks {
      margin: 0 0 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;

      @media (max-width: 480px) {
        gap: 12px;
        margin: 0 0 20px;
      }

      .link {
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(10px);
        padding: 12px 16px;
        display: flex;
        gap: 12px;
        align-items: center;
        height: 54px;
        box-sizing: border-box;
        transition: all 0.3s ease;
        transform-origin: center;
        animation: fadeIn 0.5s ease-out;
        animation-fill-mode: both;
        outline: none;
        position: relative;
        
        @media (max-width: 480px) {
          height: 48px;
          padding: 10px 14px;
          gap: 10px;
        }
        
        @for $i from 1 through 10 {
          &:nth-child(#{$i}) {
            animation-delay: #{$i * 0.1}s;
          }
        }
        
        &:not(.disabled) {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          
          .linkTitle {
            color: rgba(255, 255, 255, 0.95);
            font-weight: 500;
          }
          
          .mx-8px {
            opacity: 1;
            filter: brightness(0) invert(1);
          }
          
          &:hover {
            background: rgba(255, 255, 255, 0.15);
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            border-color: rgba(255, 255, 255, 0.25);
            cursor: pointer;
            
            .linkTitle {
              color: #fff;
            }
            
            .mx-8px {
              opacity: 1;
            }
          }
        }

        &.disabled {
          opacity: 0.4;
          cursor: not-allowed;
          pointer-events: none;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          
          .linkTitle {
            color: rgba(255, 255, 255, 0.4);
          }
          
          .mx-8px {
            opacity: 0.4;
            filter: brightness(0) invert(1);
          }
          
          .linkIcon {
            opacity: 0.3;
          }
        }

        &:focus {
          outline: none;
        }

        .mx-8px {
          width: 24px;
          height: 24px;
          object-fit: contain;
          filter: brightness(0) invert(1);
          opacity: 0.9;
          
          @media (max-width: 480px) {
            width: 20px;
            height: 20px;
          }
        }

        &:first-child {
          .mx-8px {
            filter: none;
          }
        }

        &:hover {
          .mx-8px {
            opacity: 1;
          }
        }

        .linkTitle {
          flex: 1;
          text-align: left;
          color: rgba(255, 255, 255, 0.9);
          font-size: 15px;
          font-weight: 500;

          @media (max-width: 480px) {
            font-size: 14px;
          }
        }

        .linkIcon {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 44px;
          width: 44px;
          opacity: 0.7;
          transition: opacity 0.3s ease;

          @media (max-width: 480px) {
            height: 38px;
            width: 38px;
          }

          .icon-white {
            width: 13px;
            height: 12px;
            filter: brightness(0) invert(1);
            opacity: 0.7;
          }
        }

        &:hover .linkIcon {
          opacity: 1;
        }
      }
    }
  }
}

@keyframes gradientMove {
  0% {
    background-position: 0% 0%;
  }
  25% {
    background-position: 100% 0%;
  }
  50% {
    background-position: 100% 100%;
  }
  75% {
    background-position: 0% 100%;
  }
  100% {
    background-position: 0% 0%;
  }
}

/* Accessibility Styles */
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Focus Styles */
.link:focus,
.name:focus,
.title:focus,
.description:focus {
  outline: none;
}

/* High Contrast Mode Support */
@media (forced-colors: active) {
  .link {
    border: 2px solid currentColor;
  }
  
  .avatar {
    border: 2px solid currentColor;
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
</style>
