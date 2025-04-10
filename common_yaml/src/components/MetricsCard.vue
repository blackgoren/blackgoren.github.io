<template>
  <div class="metrics-card" :class="trend">
    <div class="card-content">
      <h3 class="title">{{ title }}</h3>
      <div class="value-container">
        <span class="value">{{ formattedValue }}</span>
        <span v-if="trend" class="trend-indicator">
          <svg v-if="trend === 'pozitif'" viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M7 14l5-5 5 5H7z"/>
          </svg>
          <svg v-else-if="trend === 'negatif'" viewBox="0 0 24 24" width="24" height="24">
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

<script setup>
import { computed } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  trend: {
    type: String,
    default: 'nötr',
    validator: (value) => ['pozitif', 'negatif', 'nötr'].includes(value)
  },
  format: {
    type: String,
    default: 'metin',
    validator: (value) => ['yüzde', 'para', 'oran', 'metin'].includes(value)
  }
});

const formattedValue = computed(() => {
  if (props.format === 'yüzde' && !props.value.includes('%')) {
    return props.value + '%';
  }
  return props.value;
});
</script>

<style scoped>
.metrics-card {
  background: rgba(22, 27, 34, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 1.5rem;
  transition: transform 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(255, 255, 255, 0.3);
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
}

.trend-indicator {
  display: flex;
  align-items: center;
}

.pozitif {
  border-left: 4px solid #4CAF50;
  
  .trend-indicator {
    color: #4CAF50;
  }
}

.negatif {
  border-left: 4px solid #EF4444;
  
  .trend-indicator {
    color: #EF4444;
  }
}

.nötr {
  border-left: 4px solid #64748b;
  
  .trend-indicator {
    color: #64748b;
  }
}
</style>