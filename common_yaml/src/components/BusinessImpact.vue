<template>
  <section class="business-impact">
    <h2>İş Etkisi</h2>
    <div class="metrics-grid">
      <MetricsCard 
        v-for="(metric, index) in metrics" 
        :key="index"
        :title="metric.title"
        :value="metric.value"
        :trend="metric.trend"
        :format="metric.format"
      />
    </div>

    <div class="charts-section">
      <div class="chart-container">
        <h3>Büyüme Trendleri</h3>
        <canvas ref="growthChart"></canvas>
      </div>
      <div class="chart-container">
        <h3>İş Sağlığı</h3>
        <canvas ref="healthChart"></canvas>
      </div>
    </div>

    <div class="insights-section">
      <div class="key-findings">
        <h3>Önemli Bulgular</h3>
        <ul>
          <li v-for="(finding, index) in insights.key_findings" :key="index">
            {{ finding }}
          </li>
        </ul>
      </div>
      <div class="recommendations">
        <h3>Öneriler</h3>
        <ul>
          <li v-for="(rec, index) in insights.recommendations" :key="index">
            {{ rec }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import Chart from 'chart.js/auto';
import MetricsCard from './MetricsCard.vue';

const metrics = computed(() => [
  {
    title: 'Gelir Büyümesi',
    value: '24.9%',
    trend: 'pozitif',
    format: 'yüzde'
  },
  {
    title: 'MÖD/MAM Oranı',
    value: '4.02',
    trend: 'pozitif',
    format: 'oran'
  },
  {
    title: 'Müşteri Tutma Oranı',
    value: '85.7%',
    trend: 'nötr',
    format: 'yüzde'
  },
  {
    title: 'Toplam Yatırım',
    value: '$8,000,000',
    trend: 'pozitif',
    format: 'para'
  }
]);

const insights = {
  key_findings: [
    "Ortalama gelir büyüme oranı: 24.9%",
    "MÖD/MAM oranı: 4.0x (hedef: 3.0x)",
    "Müşteri tutma oranı: %80.8 - %93.1 arasında",
    "Toplam alınan yatırım: $8,000,000.00"
  ],
  recommendations: [
    "MÖD'ü artırmak için müşteri tutma oranını iyileştirmeye odaklanın",
    "Sağlıklı MÖD/MAM oranını korumak için MAM trendlerini izleyin",
    "Büyüme metriklerine göre stratejik yatırım turlarını planlayın",
    "AKK büyüme modellerine göre kullanıcı edinme kanallarını optimize edin"
  ]
};

const growthChart = ref(null);
const healthChart = ref(null);

onMounted(() => {
  // Büyüme Trendleri Grafiği
  new Chart(growthChart.value, {
    type: 'line',
    data: {
      labels: ['Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara', 'Oca', 'Şub', 'Mar'],
      datasets: [
        {
          label: 'Gelir Büyümesi (%)',
          data: [0, 85.12, 51.75, 33.54, 21.28, 19.49, 17.45, 10.14, 9.37, 9.22, 8.32, 8.03],
          borderColor: '#4CAF50',
          tension: 0.4
        },
        {
          label: 'Kullanıcı Büyümesi (%)',
          data: [0, 118.95, 43.05, 38.15, 24.12, 20.03, 18.18, 8.94, 11.41, 11.49, 10.79, 9.62],
          borderColor: '#2196F3',
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: 'rgba(255, 255, 255, 0.9)'
          }
        }
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.7)'
          }
        },
        y: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.7)'
          }
        }
      }
    }
  });

  // İş Sağlığı Radar Grafiği
  new Chart(healthChart.value, {
    type: 'radar',
    data: {
      labels: ['Gelir Büyümesi', 'Kullanıcı Büyümesi', 'MÖD/MAM Oranı', 'Müşteri Tutma', 'Yatırım'],
      datasets: [{
        label: 'Mevcut Performans',
        data: [24.88, 28.61, 4.02, 85.73, 100],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(255, 255, 255, 0.8)',
        pointBackgroundColor: 'rgba(255, 255, 255, 1)',
        pointBorderColor: 'rgba(255, 255, 255, 1)'
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: 'rgba(255, 255, 255, 0.9)',
            boxWidth: 15,
            padding: 15
          }
        }
      },
      scales: {
        r: {
          grid: {
            color: 'rgba(255, 255, 255, 0.3)'
          },
          angleLines: {
            color: 'rgba(255, 255, 255, 0.3)'
          },
          pointLabels: {
            color: 'rgba(255, 255, 255, 0.9)',
            font: {
              size: 12
            }
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.7)',
            backdropColor: 'transparent'
          }
        }
      }
    }
  });
});
</script>

<style scoped>
.business-impact {
  padding: 2rem;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.charts-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.chart-container {
  background: rgba(22, 27, 34, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 1.5rem;
}

.insights-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

h2 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
}

h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.9);
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
  display: flex;
  align-items: flex-start;
  
  &:before {
    content: "•";
    color: #4CAF50;
    margin-right: 0.5rem;
  }
}
</style>