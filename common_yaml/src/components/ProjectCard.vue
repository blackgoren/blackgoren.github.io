<template>
  <div class="project-card" :style="cardStyle" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
    <div class="content">
      <div class="header">
        <div class="title-area">
          <i class="startup-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.12v4.92c0 4.78-3.22 9.1-7 10.32-3.78-1.23-7-5.54-7-10.32V6.3l7-3.12z"/>
            </svg>
          </i>
          <h3>{{ project.name }}</h3>
        </div>
        <span :class="['status', project.status.toLowerCase()]">{{ project.status }}</span>
      </div>
      <p class="description">{{ project.description }}</p>
      <div class="highlights">
        <div v-for="highlight in project.highlights" :key="highlight" class="highlight-item">
          <i class="highlight-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
              <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"></path>
            </svg>
          </i>
          <span>{{ highlight }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  project: {
    name: string;
    description: string;
    status: string;
    highlights: string[];
  }
}>();

const cardStyle = ref({
  transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
  transition: 'transform 0.1s ease'
});

const handleMouseMove = (e: MouseEvent) => {
  const card = e.currentTarget as HTMLElement;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  
  const rotateY = ((x - centerX) / centerX) * 10;
  const rotateX = -((y - centerY) / centerY) * 10;

  cardStyle.value.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
};

const handleMouseLeave = () => {
  cardStyle.value.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
};
</script>

<style scoped lang="scss">
.project-card {
  background: rgba(22, 27, 34, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
  color: #ffffff;
  backdrop-filter: blur(10px);
  transform-style: preserve-3d;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }

  .content {
    transform: translateZ(20px);
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    .title-area {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .startup-icon {
      color: #58a6ff;
    }

    h3 {
      margin: 0;
      font-size: 20px;
      font-weight: 600;
      color: #ffffff;
    }

    .status {
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 500;

      &.active {
        background: rgba(46, 213, 115, 0.15);
        color: #2ed573;
      }

      &.beta {
        background: rgba(255, 171, 0, 0.15);
        color: #ffab00;
      }

      &.development {
        background: rgba(84, 160, 255, 0.15);
        color: #54a0ff;
      }

      &.aktif {
        background: rgba(46, 213, 115, 0.15);
        color: #2ed573;
      }

      &.geliştirme {
        background: rgba(84, 160, 255, 0.15);
        color: #54a0ff;
      }
    }
  }

  .description {
    color: rgba(255, 255, 255, 0.7);
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 20px;
  }

  .highlights {
    display: flex;
    flex-direction: column;
    gap: 12px;

    .highlight-item {
      display: flex;
      align-items: center;
      gap: 8px;
      color: rgba(255, 255, 255, 0.9);
      font-size: 14px;

      .highlight-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        color: #54a0ff;
      }
    }
  }
}
</style>