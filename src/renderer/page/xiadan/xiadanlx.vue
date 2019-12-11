<template>
  <div class="zbechart">
    <div class id="content"></div>
    <!-- <p>暂无K线数据</p> -->
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
        kData:{
            date:[],
        },
    };
  },

  methods: {
    kline() {
      var maChart = echarts.init(document.getElementById("content"));
      let option = {
        backgroundColor: "rgba(255,255,255,0)",
        animation: false,
        //标题
        title: {
          title: "小恒生1905",
          left: "10%"
        },
        //提示框
        tooltip: {
          show: true,
          trigger: "axis",
          axisPointer: {
            type: "cross"
          },
          backgroundColor: "rgba(0,0,0,0)",
          borderWidth: 0,
          borderColor: "rgba(0,0,0,0)",
          padding: 0,
          textStyle: {
            color: "white"
          }
        },
        //图例
        legend: {
          show: false
        },
        //设置坐标图的位置和样式
        grid: [
          {
            top: "5%",
            left: "0",
            right: "1%",
            height: "80%"
          },
          {
            left: "0",
            right: "1%",
            top: "85%",
            height: "15%"
          }
        ],
        //设置数据缩放
        dataZoom: [],
        //设置x轴数据和样式
        xAxis: [
          {
            type: "category",
            show: false,
            data: this.kData.date,
            scale: true,
            boundaryGap: false,
            axisLine: {
              onZero: false
            },
            splitLine: {
              show: false
            },
            splitNumber: 20,
            min: "dataMin",
            max: "dataMax"
          },
        ]
      };
      maChart.setOption(option);
    }
  },
  created() {
    this.kline();
  }
};
</script>

<style lang="scss" scoped>
.zbechart {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  #content {
    width: 100%;
    height: 100%;
  }
  p {
    margin: 0px;
  }
}
</style>