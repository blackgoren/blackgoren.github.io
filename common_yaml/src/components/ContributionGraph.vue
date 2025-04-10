<template>
  <div class="contribution-graph">
    <h3 class="section-title">Contributions</h3>
    <div class="graph">
      <div v-for="(week, weekIndex) in contributions" 
           :key="weekIndex" 
           class="week">
        <div v-for="(day, dayIndex) in week" 
             :key="`${weekIndex}-${dayIndex}`" 
             class="day"
             :class="`level-${day}`"
             :title="`${day} contributions`">
        </div>
      </div>
    </div>
    <div class="legend">
      <span>Less</span>
      <div class="level-squares">
        <div class="day level-0"></div>
        <div class="day level-1"></div>
        <div class="day level-2"></div>
        <div class="day level-3"></div>
        <div class="day level-4"></div>
      </div>
      <span>More</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const contributions = [
  [4,2,1,3,2,4,0],
  [1,3,4,2,0,2,1],
  [0,2,3,1,4,2,3],
  [2,1,0,3,2,4,1],
  [3,4,2,0,1,2,3],
  [1,2,4,3,0,2,1],
  [4,2,1,0,3,2,4],
];
</script>

<style scoped lang="scss">
.contribution-graph {
  background: rgba(13, 17, 23, 0.7);
  border-radius: 12px;
  padding: 20px;
  margin: 20px 0;
  backdrop-filter: blur(10px);

  .section-title {
    color: #fff;
    margin-bottom: 15px;
    font-size: 18px;
  }

  .graph {
    display: flex;
    gap: 3px;

    .week {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    .day {
      width: 10px;
      height: 10px;
      border-radius: 2px;
      transition: transform 0.2s ease;

      &:hover {
        transform: scale(1.2);
      }

      &.level-0 { background-color: #161b22; }
      &.level-1 { background-color: #0e4429; }
      &.level-2 { background-color: #006d32; }
      &.level-3 { background-color: #26a641; }
      &.level-4 { background-color: #39d353; }
    }
  }

  .legend {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 15px;
    justify-content: flex-end;
    color: rgba(255, 255, 255, 0.7);
    font-size: 12px;

    .level-squares {
      display: flex;
      gap: 3px;

      .day {
        width: 10px;
        height: 10px;
        border-radius: 2px;
      }
    }
  }
}
</style>