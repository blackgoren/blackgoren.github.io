<template>
  <div class="skills-section">
    <h3 class="section-title">Skills & Expertise</h3>
    <div class="skills-container">
      <div v-for="skill in skills" :key="skill.name" class="skill-bar">
        <div class="skill-info">
          <span class="skill-name">{{ skill.name }}</span>
          <span class="skill-percentage">{{ skill.level }}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress" :style="{ width: `${skill.level}%` }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const skills = [
  { name: 'JavaScript', level: 95 },
  { name: 'Vue.js', level: 90 },
  { name: 'TypeScript', level: 85 },
  { name: 'Node.js', level: 80 },
  { name: 'Python', level: 75 },
  { name: 'DevOps', level: 70 }
];
</script>

<style scoped lang="scss">
.skills-section {
  background: rgba(13, 17, 23, 0.7);
  border-radius: 12px;
  padding: 20px;
  margin: 20px 0;
  backdrop-filter: blur(10px);

  .section-title {
    color: #fff;
    margin-bottom: 20px;
    font-size: 18px;
  }

  .skills-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .skill-bar {
    .skill-info {
      display: flex;
      justify-content: space-between;
      margin-bottom: 6px;
      color: rgba(255, 255, 255, 0.9);
      font-size: 14px;
    }

    .progress-bar {
      height: 8px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 4px;
      overflow: hidden;

      .progress {
        height: 100%;
        background: linear-gradient(90deg, #238636, #2ea043);
        width: 0;
        border-radius: 4px;
        animation: progressAnimation 1.5s ease-out forwards;
        transform-origin: left;
      }
    }
  }
}

@keyframes progressAnimation {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}
</style>