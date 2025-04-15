<template>
  <div class="metrics-card" :class="trend">
    <div class="card-content">
      <h3 class="title">{{ title }}</h3>
      <div class="value-container">
        <span class="value">{{ formattedValue }}</span>
        <span v-if="trend" class="trend-indicator">
          <svg v-if="trend === 'positive'" viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M7 14l5-5 5 5H7z"/>
          </svg>
          <svg v-else-if="trend === 'negative'" viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M7 10l5 5 5-5H7z"/>
          </svg>
          <svg v-else viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M5 11h14v2H5z"/>
          </svg>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  title: string;
  value: string | number;
  trend?: 'positive' | 'negative' | 'neutral';
  format?: 'text' | 'percentage' | 'currency';
}

const props = withDefaults(defineProps<Props>(), {
  trend: 'neutral',
  format: 'text'
});

const formattedValue = computed(() => {
  if (props.format === 'percentage') {
    return `${props.value}%`;
  } else if (props.format === 'currency') {
    return `$${props.value}`;
  }
  return props.value;
});
</script>

<style scoped lang="scss">
.metrics-card {
  background: rgba(26, 16, 51, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    background: rgba(26, 16, 51, 0.8);
  }
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.title {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

.value-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.value {
  font-size: 1.5rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  background: linear-gradient(120deg, #fff, #e0e0e0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.trend-indicator {
  display: flex;
  align-items: center;
}

.positive {
  border-left: 4px solid #4CAF50;
  
  .trend-indicator {
    color: #4CAF50;
  }
}

.negative {
  border-left: 4px solid #EF4444;
  
  .trend-indicator {
    color: #EF4444;
  }
}

.neutral {
  border-left: 4px solid #64748b;
  
  .trend-indicator {
    color: #64748b;
  }
}
</style>