<template>
  <div class="particles-container">
    <div v-for="n in particlesCount" 
         :key="n" 
         class="particle"
         :style="getParticleStyle()">
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const particlesCount = 50;
const particles = ref<Array<{ style: any }>>([]);

const getParticleStyle = () => {
  const size = Math.random() * 4 + 2; // 2-6px
  const animationDuration = Math.random() * 20 + 10; // 10-30s
  const startPosition = Math.random() * 100;
  const delay = Math.random() * -20;

  return {
    width: `${size}px`,
    height: `${size}px`,
    opacity: Math.random() * 0.5 + 0.1,
    left: `${startPosition}%`,
    animationDuration: `${animationDuration}s`,
    animationDelay: `${delay}s`
  };
};

onMounted(() => {
  particles.value = Array.from({ length: particlesCount }, () => ({
    style: getParticleStyle()
  }));
});
</script>

<style scoped lang="scss">
.particles-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
}

.particle {
  position: absolute;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  animation: float infinite linear;
  
  @keyframes float {
    0% {
      transform: translateY(100vh) scale(0);
    }
    100% {
      transform: translateY(-100px) scale(1);
    }
  }
}
</style> 