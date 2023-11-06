<script lang="ts" setup>
import { computed } from "vue";

import {
  Chart,
  LineController,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  ChartOptions,
  Tooltip,
} from "chart.js";
import { LineChart, useLineChart } from "vue-chart-3";

type Props = {
  sparkline: number[];
  labels: string[];
  grid?: boolean;
  win?: boolean;
  tooltip?: boolean;
  animation?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  grid: true,
  win: true,
  tooltip: false,
  animation: false,
});

Chart.register(
  LineController,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
);

if (props.tooltip) Chart.register(Tooltip);

const chartColors = computed(() => {
  if (props.win) {
    return {
      borderColor: "rgba(50,255,150,0.3)",
      pointBackgroundColor: "rgba(50,255,50,1)"
    }
  }
  else {
    return {
      borderColor: "rgba(255,50,50,0.2)",
      pointBackgroundColor: "rgba(255,70,70,1)",
    }
  }
})

const chartData = computed(() => {
  return {
    labels: props.labels,
    datasets: [
      {
        backgroundColor: "hsl(239, 84%, 67%)",
        data: props.sparkline,
        borderColor: chartColors.value.borderColor,
        pointBackgroundColor: chartColors.value.pointBackgroundColor,
        tension: 0.4
      },
    ],
  };
});

const getAnimation = computed(() => {
  if (props.animation) return {
    duration: 1000,
  }
  return false;
})

const options = computed<ChartOptions<"line">>(() => ({
  animation: getAnimation.value,
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      display: props.grid,
      grid: {
        display: props.grid,
      },
    },
    y: {
      display: props.grid,
      grid: {
        display: props.grid,
      },
    },
  },
}));

const { lineChartProps } = useLineChart({
  chartData,
  options,
});
</script>

<template>
  <div class="chart">
    <LineChart class="line" type="line" v-bind="lineChartProps" />
  </div>
</template>

<style lang="scss" scoped>
.chart {
  transition: none;
  width: 100%;
  height: 100%;
  padding: rem(10px);
  border-radius: 0.625rem;
  // background-color: hsl(0, 0%, 100%);

  .line {
    transition: none;
    width: 100%;
    height: 100%;
  }
}
</style>
