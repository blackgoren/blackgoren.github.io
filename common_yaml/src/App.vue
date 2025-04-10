<template>
  <!-- Outer container for the profile section -->
  <div class="common">
    <BackgroundParticles />
    <!-- Wrapper for all the content -->
    <div class="wraper">
      <!-- Profile Card with Glass Morphism -->
      <div class="profile-card">
        <div class="avatar">
          <img src="./assets/avatar.png" alt="" />
        </div>
        <div class="username">{{ profile?.name }}</div>
        <div class="jobtitle">{{ profile?.job }}</div>
        <div class="MBTI">{{ profile?.mbti }}</div>
        <div class="description">{{ profile?.description }}</div>
        <div class="detailwrap">
          <div class="email">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
              <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM20 7.23792L12.0718 14.338L4 7.21594V19H20V7.23792ZM4.51146 5L12.0619 11.662L19.501 5H4.51146Z"></path>
            </svg>
            <span>{{ profile?.email }}</span>
          </div>
          <div class="phone">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
              <path d="M9.36556 10.6821C10.302 12.3288 11.6712 13.698 13.3179 14.6344L14.2024 13.3961C14.4965 12.9845 15.0516 12.8573 15.4956 13.0998C16.9024 13.8683 18.4571 14.3353 20.0789 14.4637C20.599 14.5049 21 14.9389 21 15.4606V19.9234C21 20.4361 20.6122 20.8657 20.1022 20.9181C19.5723 20.9726 19.0377 21 18.5 21C9.93959 21 3 14.0604 3 5.5C3 4.96227 3.02742 4.42771 3.08189 3.89776C3.1343 3.38775 3.56394 3 4.07665 3H8.53942C9.0611 3 9.49513 3.40104 9.5363 3.92109C9.66467 5.54288 10.1317 7.09764 10.9002 8.50444C11.1427 8.9484 11.0155 9.50354 10.6039 9.79757L9.36556 10.6821ZM6.84425 10.0252L8.7442 8.66809C8.20547 7.50514 7.83628 6.27183 7.64727 5H5.00907C5.00303 5.16632 5 5.333 5 5.5C5 12.9558 11.0442 19 18.5 19C18.667 19 18.8337 18.997 19 18.9909V16.3527C17.7282 16.1637 16.4949 15.7945 15.3319 15.2558L13.9748 17.1558C13.4258 16.9425 12.8956 16.6915 12.3874 16.4061L12.3293 16.373C10.3697 15.2587 8.74134 13.6303 7.627 11.6707L7.59394 11.6126C7.30849 11.1044 7.05754 10.5742 6.84425 10.0252Z"></path>
            </svg>
            {{ profile?.phone }}
          </div>
        </div>
      </div>

      <!-- Social links section (moved above Skills) -->
      <div class="sociallinks">
        <div class="link" v-for="item of profile?.links" @click="openLink(item.link)">
          <div class="icon-wrapper">
            <FontAwesomeIcon :icon="item.icon" class="mx-8px text-20px icon-animate" />
          </div>
          <div class="linkTitle">{{ item.title }}</div>
          <div class="linkIcon">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
              <path d="M5.16667 0V1.33333H1.83333V10.6667H11.1667V7.33333H12.5V11.3333C12.5 11.7015 12.2015 12 11.8333 12H1.16667C0.79848 12 0.5 11.7015 0.5 11.3333V0.666667C0.5 0.29848 0.79848 0 1.16667 0H5.16667ZM10.2239 1.33333H7.16667V0H12.5V5.33333H11.1667V2.27614L6.5 6.9428L5.5572 6L10.2239 1.33333Z" fill="white" fill-opacity="0.7"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- Skills Section -->
      <SkillsBar />

      <!-- Business Impact Section with Data Visualizations -->
      <BusinessImpact />

      <!-- Projects Section -->
      <div class="projects-section">
        <h3 class="section-title">Featured Projects</h3>
        <div class="projects-grid">
          <ProjectCard
            v-for="project in projects"
            :key="project.name"
            :project="project"
          />
        </div>
      </div>

      <!-- Activity Timeline -->
      <GithubTimeline />


    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import yaml from "js-yaml";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import BackgroundParticles from './components/BackgroundParticles.vue';
import ProjectCard from './components/ProjectCard.vue';
import SkillsBar from './components/SkillsBar.vue';
import GithubTimeline from './components/GithubTimeline.vue';
import BusinessImpact from './components/BusinessImpact.vue';

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

// Sample projects data
const projects = [
  {
    name: 'StartupVision',
    description: 'Innovative startup management and analytics platform',
    status: 'Active',
    highlights: ['500+ Active Users', '$2M Revenue', '4.8/5 Rating']
  },
  {
    name: 'InvestorConnect',
    description: 'AI-powered platform connecting startups with investors',
    status: 'Beta',
    highlights: ['50+ Investors', '$5M+ Deals', '30+ Startups']
  },
  {
    name: 'GrowthMetrics',
    description: 'Real-time startup growth and performance tracking',
    status: 'Development',
    highlights: ['Market Analysis', 'KPI Tracking', 'Predictive Analytics']
  }
];

// User's profile data
const profile = ref<TProfile>();

// Function to load YAML data from the config file
const loadYaml = async () => {
  const response = await fetch("/config.yaml");
  const text = await response.text();
  profile.value = yaml.load(text) as TProfile;
};

onMounted(() => {
  loadYaml();
});
</script>

<style scoped lang="scss">
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
}

@keyframes shine {
  0% {
    transform: rotate(45deg) translateX(-100%);
  }
  100% {
    transform: rotate(45deg) translateX(100%);
  }
}

@keyframes ripple {
  to {
    transform: scale(2);
    opacity: 0;
  }
}

@keyframes iconBounce {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

.icon-animate {
  transition: transform 0.3s ease;
}

.link:hover .icon-animate {
  animation: iconBounce 1s ease infinite;
}

.common {
  position: relative;
  min-height: 100vh;
  width: 100%;
  background-image: url("./assets/background.png");
  background-size: cover;
  background-position: center center;
  color: rgba(255, 255, 255, 0.9);
  background-color: #0d1117;
  overflow-x: hidden;
  overflow-y: auto;
  padding-bottom: 40px;
  .wraper {
    max-width: 800px;
    padding: 48px 16px 16px;
    margin: 0 auto;
    box-sizing: border-box;
    text-align: center;
    position: relative;
    z-index: 2;

    .profile-card {
      padding: 32px;
      margin-bottom: 40px;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }
    }


    .avatar {
      height: 96px;
      width: 96px;
      margin: 0 auto;
      border-radius: 100px;
      border: 2px solid rgba(255, 255, 255, 0.7);
      overflow: hidden;
      position: relative;
      animation: pulse 2s infinite;
      &::after {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent);
        transform: rotate(45deg);
        animation: shine 3s infinite;
      }
      img {
        height: 100%;
        width: 100%;
        transition: transform 0.3s ease;
      }
      &:hover img {
        transform: scale(1.1);
      }
    }
    .username {
      font-size: 24px;
      font-weight: 500;
      margin-top: 16px;
    }
    .jobtitle {
      color: rgba(255, 255, 255, 0.7);
      font-size: 14px;
      font-weight: 400;
      margin-top: 8px;
    }
    .MBTI {
      margin: 16px auto;
      padding: 0 8px;
      width: max-content;
      height: 20px;
      line-height: 20px;
      color: rgba(255, 255, 255, 0.7);
      font-size: 12px;
      font-weight: 500;
      border-radius: 5px;
      background: rgba(22, 27, 34, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    .description {
      color: rgba(255, 255, 255, 0.7);
      margin-bottom: 24px;
      text-align: center;
      font-size: 14px;
      font-weight: 400;
      line-height: 150%; /* 21px */
    }
    .detailwrap {
      width: max-content;
      margin: auto;
    }
    .email,
    .phone {
      display: flex;
      align-items: center;
      gap: 8px;
      color: rgba(255, 255, 255, 0.9);
      font-size: 14px;
      font-weight: 400;
    }
    .phone {
      margin-top: 8px;
    }
  }
  .projects-section {
    margin: 20px 0;
    .section-title {
      color: #fff;
      margin-bottom: 20px;
      font-size: 18px;
      text-align: left;
    }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }
  }

  .sociallinks {
    margin: 24px 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
    .link {
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      background: rgba(22, 27, 34, 0.8);
      padding: 8px;
      display: flex;
      gap: 8px;
      align-items: center;
      height: 54px;
      box-sizing: border-box;
      cursor: pointer;
      position: relative;
      transition: all 0.3s ease;

      &:hover {
        background: rgba(22, 27, 34, 1);
        transform: translateY(-2px);
        border-color: rgba(255, 255, 255, 0.3);
      }

      &::after {
        content: '';
        position: absolute;
        width: 50px;
        height: 50px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        transition: transform 0.5s;
        pointer-events: none;
      }

      &:active::after {
        animation: ripple 0.6s ease-out;
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
