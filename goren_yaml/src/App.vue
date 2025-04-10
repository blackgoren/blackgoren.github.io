<template>
  <div class="cursor"></div>
  <div class="cursor-dot"></div>
  <div class="ripple" v-if="showRipple" :style="rippleStyle"></div>
  <!-- Outer container for the profile section -->
  <div class="common">
    <!-- Wrapper for all the content -->
    <div class="wraper">
      <!-- Avatar section -->
      <div class="avatar">
        <!-- User avatar link -->
        <img :src="avatarPath" alt="avatar" @error="(e) => console.error('Failed to load avatar:', e)" />
      </div>

      <!-- Displaying user's name, job title, MBTI, and description -->
      <div class="username">{{ profile?.name }}</div>
      <div class="jobtitle">{{ profile?.job }}</div>
      <div class="MBTI">{{ profile?.mbti }}</div>
      <div class="description">{{ profile?.description }}</div>

      <!-- Wrapper for email and phone details -->
      <div class="detailwrap">
        <!-- Email section with icon -->
        <div class="email">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
            <path
              d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM20 7.23792L12.0718 14.338L4 7.21594V19H20V7.23792ZM4.51146 5L12.0619 11.662L19.501 5H4.51146Z"
            ></path>
          </svg>
          <span>{{ profile?.email }}</span>
        </div>

        <!-- Phone section with icon -->
        <div class="phone">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
            <path
              d="M9.36556 10.6821C10.302 12.3288 11.6712 13.698 13.3179 14.6344L14.2024 13.3961C14.4965 12.9845 15.0516 12.8573 15.4956 13.0998C16.9024 13.8683 18.4571 14.3353 20.0789 14.4637C20.599 14.5049 21 14.9389 21 15.4606V19.9234C21 20.4361 20.6122 20.8657 20.1022 20.9181C19.5723 20.9726 19.0377 21 18.5 21C9.93959 21 3 14.0604 3 5.5C3 4.96227 3.02742 4.42771 3.08189 3.89776C3.1343 3.38775 3.56394 3 4.07665 3H8.53942C9.0611 3 9.49513 3.40104 9.5363 3.92109C9.66467 5.54288 10.1317 7.09764 10.9002 8.50444C11.1427 8.9484 11.0155 9.50354 10.6039 9.79757L9.36556 10.6821ZM6.84425 10.0252L8.7442 8.66809C8.20547 7.50514 7.83628 6.27183 7.64727 5H5.00907C5.00303 5.16632 5 5.333 5 5.5C5 12.9558 11.0442 19 18.5 19C18.667 19 18.8337 18.997 19 18.9909V16.3527C17.7282 16.1637 16.4949 15.7945 15.3319 15.2558L13.9748 17.1558C13.4258 16.9425 12.8956 16.6915 12.3874 16.4061L12.3293 16.373C10.3697 15.2587 8.74134 13.6303 7.627 11.6707L7.59394 11.6126C7.30849 11.1044 7.05754 10.5742 6.84425 10.0252Z"
            ></path>
          </svg>
          {{ profile?.phone }}
        </div>
      </div>

      <!-- Social links section -->
      <div class="sociallinks">
        <!-- Loop through the links array and render each link with icon and title -->
        <div class="link" v-for="item of profile?.links" @click="openLink(item.link)">
          <!-- Font Awesome component to display logo icon -->
          <FontAwesomeIcon :icon="item.icon" class="mx-8px text-20px" />
          <div class="linkTitle">{{ item.title }}</div>

          <!-- Icon indicating external link -->
          <div class="linkIcon">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
              <path
                d="M5.16667 0V1.33333H1.83333V10.6667H11.1667V7.33333H12.5V11.3333C12.5 11.7015 12.2015 12 11.8333 12H1.16667C0.79848 12 0.5 11.7015 0.5 11.3333V0.666667C0.5 0.29848 0.79848 0 1.16667 0H5.16667ZM10.2239 1.33333H7.16667V0H12.5V5.33333H11.1667V2.27614L6.5 6.9428L5.5572 6L10.2239 1.33333Z"
                fill="white"
                fill-opacity="0.7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import yaml from "js-yaml";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// Function to open a new window when a link is clicked
const openLink = (link: string) => {
  window.open(link, "__blank");
};

// User's profile data type
type TProfile = {
  name: string;
  job: string;
  mbti: string;
  description: string;
  email: string;
  phone: string;
  links: {
    link: string;
    title: string;
    icon: string;
  }[];
};

// User's profile data
const profile = ref<TProfile>();
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

// Compute base URL and avatar path for debugging
const baseUrl = computed(() => {
  const url = import.meta.env.BASE_URL;
  console.log('Base URL:', url);
  return url;
});

const avatarPath = computed(() => {
  const path = `${baseUrl.value}assets/avatar.png`;
  console.log('Avatar path:', path);
  return path;
});

// Function to load YAML data from the config file
const loadYaml = async () => {
  const response = await fetch(baseUrl.value + "config.yaml");
  const text = await response.text();
  profile.value = yaml.load(text) as TProfile;
};

onMounted(() => {
  loadYaml();
  
  // Custom cursor movement
  const cursor = document.querySelector('.cursor');
  const cursorDot = document.querySelector('.cursor-dot');
  
  document.addEventListener('mousemove', (e) => {
    createRipple(e);
    if (cursor && cursorDot) {
      cursor.style.left = e.clientX - 10 + 'px';
      cursor.style.top = e.clientY - 10 + 'px';
      cursorDot.style.left = e.clientX - 2 + 'px';
      cursorDot.style.top = e.clientY - 2 + 'px';
    }
  });
  
  // Add hover effect on interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .link, .email, .phone');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (cursor && cursorDot) {
        cursor.style.transform = 'scale(1.5)';
        cursorDot.style.transform = 'scale(1.5)';
        cursor.style.border = '2px solid rgba(255, 255, 255, 0.8)';
      }
    });
    el.addEventListener('mouseleave', () => {
      if (cursor && cursorDot) {
        cursor.style.transform = 'scale(1)';
        cursorDot.style.transform = 'scale(1)';
        cursor.style.border = '2px solid rgba(255, 255, 255, 0.5)';
      }
    });
  });
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
  cursor: none;
}

.cursor {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  transition: all 0.1s ease;
  z-index: 9999;
}

.cursor-dot {
  width: 4px;
  height: 4px;
  background: white;
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  transition: all 0.15s ease-out;
  z-index: 9999;
}

.common {
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(45deg, #0b0519, #1a1033, #2a1b4d, #0b0519);
  background-size: 400% 400%;
  animation: gradientBackground 15s ease infinite;
  color: rgba(255, 255, 255, 0.9);
  overflow: auto;
  position: relative;
  
  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("/common_yaml/assets/background.png");
    background-size: cover;
    background-position: center;
    opacity: 0.4;
    pointer-events: none;
    z-index: 0;
  }
  .wraper {
    position: relative;
    z-index: 1;
    max-width: 800px;
    padding: 48px 32px;
    margin: 48px auto;
    box-sizing: border-box;
    text-align: center;
    animation: fadeIn 1s ease-out;
    background: rgba(11, 5, 25, 0.3);
    backdrop-filter: blur(10px);
    border-radius: 24px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    .avatar {
      height: 96px;
      width: 96px;
      margin: 0 auto;
      border-radius: 100px;
      border: 3px solid rgba(255, 255, 255, 0.7);
      overflow: hidden;
      position: relative;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      animation: fadeIn 0.8s ease-out;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
      
      &:hover {
        transform: scale(1.05);
        border-color: rgba(255, 255, 255, 0.9);
        box-shadow: 0 8px 32px rgba(255, 255, 255, 0.2);
      }
      
      img {
        height: 100%;
        width: 100%;
        transition: transform 0.3s ease;
      }
    }
    .username {
      font-size: 28px;
      font-weight: 600;
      margin-top: 20px;
      background: linear-gradient(120deg, #fff, #e0e0e0);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: fadeIn 0.8s ease-out;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
      margin: 24px auto;
      text-align: center;
      font-size: 15px;
      font-weight: 400;
      line-height: 160%;
      max-width: 480px;
      animation: fadeIn 0.8s ease-out;
      animation-delay: 0.3s;
      animation-fill-mode: both;
      letter-spacing: 0.3px;
    }
    .detailwrap {
      width: 100%;
      max-width: 400px;
      margin: 24px auto;
      padding: 16px;
      border-radius: 16px;
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(5px);
      animation: fadeIn 0.8s ease-out;
      animation-delay: 0.3s;
      animation-fill-mode: both;
    }
    .email,
    .phone {
      display: flex;
      align-items: center;
      gap: 8px;
      color: rgba(255, 255, 255, 0.9);
      font-size: 14px;
      font-weight: 400;
      padding: 8px 16px;
      border-radius: 8px;
      transition: all 0.3s ease;
      cursor: pointer;
      
      &:hover {
        background: rgba(255, 255, 255, 0.1);
        transform: translateX(4px);
        svg {
          transform: scale(1.1);
        }
      }
      
      svg {
        transition: transform 0.3s ease;
      }
    }
    .phone {
      margin-top: 8px;
    }
  }
  .sociallinks {
    margin: 24px 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
    .link {
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.3);
      background: rgba(255, 255, 255, 0.12);
      backdrop-filter: blur(10px);
      padding: 8px;
      display: flex;
      gap: 8px;
      align-items: center;
      height: 54px;
      box-sizing: border-box;
      cursor: pointer;
      transition: all 0.3s ease;
      transform-origin: center;
      animation: fadeIn 0.5s ease-out;
      animation-fill-mode: both;
      
      @for $i from 1 through 10 {
        &:nth-child(#{$i}) {
          animation-delay: #{$i * 0.1}s;
        }
      }
      
      &:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        border-color: rgba(255, 255, 255, 0.5);
      }
      .linkTitle {
        flex: 1;
        text-align: left;
      }
      .linkIcon {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 44px;
        width: 44px;
      }
    }
  }
}
</style>
