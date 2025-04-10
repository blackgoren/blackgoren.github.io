<template>
  <div class="timeline-section">
    <h3 class="section-title">Son Aktiviteler</h3>
    <div class="timeline">
      <div v-for="(activity, index) in activities" 
           :key="index" 
           class="timeline-item"
           :class="{ 'appear': true }">
        <div class="timeline-icon">
          <i v-html="getActivityIcon(activity.type)"></i>
        </div>
        <div class="timeline-content">
          <div class="activity-header">
            <span class="activity-type">{{ activity.title }}</span>
            <span class="activity-date">{{ activity.date }}</span>
          </div>
          <p class="activity-description">{{ activity.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const activities = [
  {
    type: 'commit',
    title: 'Git Kaydı',
    description: 'Kullanıcı kimlik doğrulama için yeni özellik eklendi',
    date: '2 gün önce'
  },
  {
    type: 'pr',
    title: 'Çekme İsteği',
    description: 'Gösterge paneli için kullanıcı arayüzü iyileştirmeleri birleştirildi',
    date: '5 gün önce'
  },
  {
    type: 'issue',
    title: 'Sorun Oluşturuldu',
    description: 'Ödeme işleminde hata bildirildi',
    date: '1 hafta önce'
  }
];

const getActivityIcon = (type: string) => {
  const icons = {
    commit: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
              <path d="M11.93 8.5a4.002 4.002 0 0 1-7.86 0H.75a.75.75 0 0 1 0-1.5h3.32a4.002 4.002 0 0 1 7.86 0h3.32a.75.75 0 0 1 0 1.5Zm-1.43-.75a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z"></path>
            </svg>`,
    pr: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
          <path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z"></path>
        </svg>`,
    issue: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
             <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path>
             <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z"></path>
           </svg>`
  };
  return icons[type as keyof typeof icons] || icons.commit;
};
</script>

<style scoped lang="scss">
.timeline-section {
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

  .timeline {
    position: relative;
    padding-left: 30px;

    &::before {
      content: '';
      position: absolute;
      left: 15px;
      top: 0;
      bottom: 0;
      width: 2px;
      background: rgba(255, 255, 255, 0.1);
    }
  }

  .timeline-item {
    position: relative;
    margin-bottom: 20px;
    opacity: 0;
    transform: translateX(-20px);
    transition: all 0.5s ease;

    &.appear {
      opacity: 1;
      transform: translateX(0);
    }

    .timeline-icon {
      position: absolute;
      left: -30px;
      width: 30px;
      height: 30px;
      background: #238636;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }

    .timeline-content {
      background: rgba(22, 27, 34, 0.7);
      border-radius: 6px;
      padding: 12px;
      border: 1px solid rgba(255, 255, 255, 0.1);

      .activity-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;

        .activity-type {
          color: #58a6ff;
          font-weight: 500;
        }

        .activity-date {
          color: #8b949e;
          font-size: 12px;
        }
      }

      .activity-description {
        color: rgba(255, 255, 255, 0.7);
        font-size: 14px;
        margin: 0;
      }
    }
  }
}
</style>