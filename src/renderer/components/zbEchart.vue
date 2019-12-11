<template>
  <div class="xiadan">
    <!-- <h1 style="color:red;">{{version}}</h1> -->
    <div id="content"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import echarts from "echarts";
export default {
  props:['klineFlag','proInfo'],
  data() {
    return {
      data() {
        return {
          formKdata: {
            time: 0,
            open: 0,
            high: 0,
            low: 0,
            close: 0,
            totalNum: 0
          },
        }
      },
    };
  },
  computed: mapState(["version"]),
  watch:{
    klineFlag:{
      handler(){
        this.initKline();
      }
    }
  },
  methods: {
    initKline() {
      var maCharts = echarts.init(document.getElementById("content"));
      //数据意义：开盘(open)，收盘(close)，最低(lowest)，最高(highest)
      var data0 = splitData([
        ["07:01", 23206, 23206, 22887, 23624],
        ["07:02", 24300, 23291, 24886, 23088],
        ["07:03", 22955, 23846, 22955, 23462],
        ["07:04", 23472, 23588, 23375, 23063],
        ["07:05", 23605, 23828, 23479, 23836],
        ["07:06", 23833, 23852, 23713, 23912],
        ["07:07", 23771, 24192, 23697, 24215],
        ["07:08", 24252, 24285, 24178, 24408],
        ["07:09", 24011, 24333, 24503, 24372],
        ["07:10", 24328, 24348, 24027, 24413],
        ["07:11", 24309, 24183, 23942, 24339],
        ["07:12", 24162, 24032, 24014, 24433],
        ["07:13", 24411, 24216, 24153, 25444],
        ["07:14", 24206, 23821, 23733, 24277],
        ["07:15", 23839, 23978, 23701, 23974],
        ["07:21", 23782, 23255, 23097, 23782],
        ["07:22", 23224, 23146, 23086, 23308],
        ["07:25", 23202, 23252, 23151, 23388],
        ["07:26", 23134, 22934, 22899, 23401],
        ["07:27", 22977, 23132, 22923, 23243],
        ["07:28", 23222, 23659, 23082, 23666],
        ["07:30", 23644, 23591, 23306, 23695],
        ["07:31", 23328, 22073, 22595, 23334],
        ["07:32", 22741, 23261, 22470, 23284],
        ["07:33", 23331, 23478, 23021, 23514],
        ["07:34", 23404, 23249, 23047, 23522],
        ["07:35", 23262, 23181, 23149, 23337],
        ["07:35", 23148, 23109, 22968, 23206],
        ["07:36", 23096, 22486, 22643, 23339],
        ["07:37", 22827, 22637, 22535, 22863],
        ["07:38", 22557, 22708, 22531, 22762],
        ["07:40", 22691, 22748, 22850, 23128],
        ["07:42", 22679, 22402, 22391, 22765],
        ["07:73", 22446, 22573, 22322, 22611],
        ["08:01", 22574, 23177, 22572, 23176],
        ["08:02", 23181, 23244, 23411, 23301],
        ["08:03", 25321, 23288, 23147, 23232],
        ["08:04", 23344, 23262, 23191, 23449],
        ["08:05", 23188, 22977, 22812, 23199],
        ["08:06", 22998, 23016, 22589, 23238],
        ["08:08", 22735, 22306, 22321, 22735],
        ["09:29", 22389, 22362, 22281, 22467],
        ["09:30", 22296, 24234, 22271, 22435],
        ["09:31", 22734, 22274, 22204, 22532],
        ["09:32", 22329, 22259, 22175, 22414],
        ["10:08", 21964, 22119, 21807, 22129],
        ["10:09", 22157, 22257, 22157, 22343],
        ["10:10", 22243, 22263, 22126, 22334],
        ["10:11", 22368, 22195, 22176, 22428],
        ["10:12", 22189, 22068, 22044, 22266],
        ["10:15", 21991, 21814, 21779, 22049],
        ["10:16", 21693, 21945, 21658, 21963],
        ["10:17", 23953, 24193, 22787, 24971],
        ["10:18", 21812, 21497, 21754, 22063],
        ["10:19", 22012, 22444, 22008, 22501],
        ["10:22", 22346, 22427, 22326, 22452],
        ["10:23", 22422, 21844, 21821, 22422],
        ["10:24", 21875, 22182, 21841, 22262],
        ["10:25", 22139, 21991, 21915, 22243],
        ["10:26", 22039, 21771, 21736, 22108],
        ["11:02", 21708, 21742, 21614, 21795],
        ["11:03", 21795, 22405, 21795, 22221],
        ["11:06", 22812, 22317, 24212, 22367],
        ["11:07", 22276, 22357, 22194, 22406],
        ["11:08", 22429, 22446, 22352, 22551],
        ["11:09", 22466, 22327, 22218, 22476],
        ["11:10", 22282, 22463, 22251, 22477],
        ["11:13", 22478, 22412, 22316, 22505],
        ["11:14", 22308, 22171, 22057, 22393],
        ["11:15", 22179, 22424, 22138, 22259],
        ["11:16", 22214, 22511, 22107, 22527],
        ["11:17", 22491, 22827, 22481, 22889],
        ["11:20", 22863, 22999, 22481, 23099],
        ["11:21", 22971, 23051, 22902, 23405],
        ["11:22", 23035, 23702, 22923, 23148],
        ["11:23", 22931, 22757, 22774, 23045],
        ["11:24", 22815, 22883, 22705, 22929],
        ["11:27", 22866, 22938, 22834, 23501],
        ["11:28", 24293, 23212, 22817, 23522],
        ["11:29", 23234, 23242, 23217, 23343],
        ["11:30", 23165, 23175, 23109, 23252],
        ["11:31", 23204, 23009, 22997, 23253],
        ["12:03", 23001, 22995, 22941, 23133],
        ["12:04", 22970, 22722, 22646, 22970],
        ["12:05", 22701, 22703, 22607, 22766],
        ["12:06", 22643, 22421, 22407, 22669],
        ["12:07", 22426, 23210, 22007, 22503],
        ["12:13", 21900, 21485, 21262, 21940]
      ]);
      //var volumes = [86160000,79330000,102600000,104890000,85230000,115230000,99410000,90120000,79990000,107100000,81020000,91710000,84510000,118160000,89390000,89820000,100210000,102720000,134120000,83770000,92570000,109090000,100920000,136670000,80100000,97060000,95020000,81530000,80020000,85590000,75790000,87390000,88560000,86640000,88440000,103260000,79120000,95530000,111990000,87790000,86480000,79180000,68940000,73190000,147390000,78530000,75560000,82270000,71870000,78750000,71260000,69690000,90540000,101690000,93740000,94130000,91950000,248680000,99380000,85130000,89440000];
      //切割数组，把数组中的日期和数据分离，返回数组中的日期和数据
      function splitData(rawData) {
        var categoryData = [];
        var values = [];
        //var volumes =[];
        for (var i = 0; i < rawData.length; i++) {
          categoryData.push(rawData[i].splice(0, 1));
          values.push(rawData[i]);
          //volumes.push([i, rawData[i][4], rawData[i][0] > rawData[i][1] ? 1 : -1]);
        }
        return {
          categoryData: categoryData, //数组中的日期 x轴对应的日期
          values: values //数组中的数据 y轴对应的数据
          //volumes:volumes
        };
      }

      //计算MA平均线，N日移动平均线=N日收盘价之和/N dayCount要计算的天数(5,10,20,30)
      function calculateMA(dayCount) {
        var result = [];
        for (var i = 0; i < data0.values.length; i++) {
          if (i < dayCount) {
            result.push("-");
            //alert(result);
            continue; //结束单次循环，即不输出本次结果
          }
          var sum = 0;
          for (var j = 0; j < dayCount; j++) {
            sum += data0.values[i - j][1];
            //alert(sum);
          }
          result.push(sum / dayCount);
          // alert(result);
        }
        return result;
        //alert(result)
      }

      let option = {
        //标题
        title: {
          show: true,
          gridIndex: 1,
          text: "VOL(5,10)  VOLUME:4518  MAVOL1:1557.20",
          right: "4%",
          left: "8%",
          top: "56%",
          height: "5%",
          backgroundColor: "#000",
          textStyle: {
            //设置文字
            color: "rgb(206, 198, 198)",
            fontSize: 12
          },
          subtextStyle: {
            //设置整体样式
            textVerticalAlign: "middle"
          }
        },
        //提示框
        tooltip: {
          trigger: "axis",
          xAxisIndex: [0, 1],
          axisPointer: {
            type: "cross"
          },
          textStyle: {
            color: "#999"
          },
          // position:function(pos,params,size){
          //   //console.log(params[0])
          //   var param =params[0];
          //   this.formKdata.time = param.name;
          //   this.formKdata.totalNum = param.data[0];
          //   this.formKdata.open = param.data[1];
          //   this.formKdata.close = param.data[2];
          //   this.formKdata.low = param.data[3];
          //   this.formKdata.high = param.data[4];
            
          // }
          
        },
        //工具栏。内置有导出图片，数据视图，动态类型切换，数据区域缩放，重置五个工具。
        // toolbox:{
        //   feature:{
        //     dataZoom: {
        //             yAxisIndex: false
        //         },
        //         brush: {
        //             type: ['lineX', 'clear']
        //     }
        //   }
        // },
        //图例
        legend: {
          show: false,
          data: ["日线", "MA5", "MA10", "MA20", "MA30"]
        },
        //设置坐标图的位置和样式
        grid: [
          {
            top: "4%",
            right: "4%",
            left: "8%",
            height: "50%",
            gridIndex: 0
          },
          {
            right: "4%",
            left: "8%",
            top: "64%",
            height: "30%",
            gridIndex: 1
          }
        ],
        //设置坐标轴上文字样式，大小等
        textStyle: {
          //color:'red',
        },
        //配置x轴数据，样式和名称
        xAxis: [
          {
            type: "category",
            show: false,
            data: data0.categoryData,
            min: "dataMin",
            max: "dataMax",
            splitNumber: 20,
            axisLabel: {
              show: false,
              color: "#fff"
            },
            axisPointer: {
              z: 100
            }
          },
          {
            type: "category",
            gridIndex: 1,
            data: data0.categoryData,
            min: "dataMin",
            max: "dataMax",
            axisLabel: {
              show: true,
              color: "#fff"
            }
          }
        ],
        //配置y轴样式和名称
        yAxis: [
          {
            type: "value",
            scale: true, //脱离0刻度
            position: "left",
            gridIndex: 0,
            splitArea: {
              show: false,
              backgroundColor: "rgb(131, 37, 37)"
            },
            axisLabel: {
              color: "#fff"
            },
            splitLine: {
              lineStyle: {
                color: ["#999"]
              }
            }
          },
          // {
          //   position: "right",
          //   type: "value",
          //   scale: true, //脱离0刻度
          //   position: "right",
          //   gridIndex: 0,
          //   splitArea: {
          //     show: false,
          //     backgroundColor: "rgb(131, 37, 37)"
          //   },
          //   axisLabel: {
          //     color: "#fff"
          //   },
          //   splitLine: {
          //     lineStyle: {
          //       color: ["#999"]
          //     }
          //   }
          // },

          {
            show: true,
            scale: true, //脱离0刻度
            gridIndex: 1,
            splitArea: {
              show: false,
              backgroundColor: "red"
            },
            axisLabel: {
              show: true,
              color: "#fff"
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: ["#999"]
              }
            }
          }
        ],
        //设置数据缩放
        dataZoom: [
          {
            type: "inside",
            xAxisIndex: [0, 1],
            start: 50,
            end: 100
          }
        ],
        //配置y轴数据
        series: [
          {
            type: "k",
            name: "日线",
            gridIndex: 0,
            data: data0.values,
            itemStyle: {
              normal: {
                //设置阳线
                color: "#2a2d32",
                borderColor: "rgb(131, 37, 37)",
                //设置阴线
                color0: "#05943E",
                borderColor0: "#05943E"
              }
            }
          },
          // {
          //   type: "k",
          //   name: "日线",
          //   gridIndex: 0,
          //   yAxisIndex:2,
          //   data: data0.values,
          // },

          {
            name: "MA5",
            type: "line",
            //gridIndex:[0,1],
            data: calculateMA(5),
            smooth: true,
            lineStyle: {
              normal: { opacity: 0.5 }
            }
          },
          {
            name: "MA10",
            type: "line",
            data: calculateMA(10),
            smooth: true,
            lineStyle: {
              normal: { opacity: 0.8 }
            }
          },
          // {
          //   name: "MA20",
          //   type: "line",
          //   data: calculateMA(20),
          //   smooth: true,
          //   lineStyle: {
          //     normal: { opacity: 0.5 }
          //   }
          // },
          // {
          //   name: "MA30",
          //   type: "line",
          //   data: calculateMA(30),
          //   smooth: true,
          //   lineStyle: {
          //     normal: { opacity: 0.5 }
          //   }
          // },
          {
            name: "Volume",
            type: "bar",
            //gridIndex:1,
            xAxisIndex: 1,
            yAxisIndex: 1,

            //data: data0.volumes,
            barWidth: "50%",
            data: [
              10,
              52,
              200,
              334,
              390,
              330,
              220,
              100,
              10,
              52,
              200,
              334,
              390,
              330,
              220,
              100,
              10,
              52,
              200,
              334,
              390,
              330,
              220,
              100,
              10,
              52,
              200,
              334,
              390,
              330,
              220,
              100,
              10,
              52,
              200,
              334,
              390,
              330,
              220,
              100,
              10,
              52,
              200,
              334,
              390,
              330,
              220,
              100,
              10,
              52,
              200,
              334,
              390,
              330,
              220,
              100,
              10,
              52,
              200,
              334,
              390,
              330,
              220,
              100,
              10,
              52,
              200,
              334,
              390,
              330,
              220,
              100,
              10,
              52,
              200,
              334,
              390,
              330,
              220,
              100,
              10,
              52,
              200,
              334,
              390,
              330,
              220,
              100
            ],
            itemStyle: {
              borderColor: "rgb(131, 37, 37)",
              color: "#2a2d32"
            }
          }
        ]
      };
      maCharts.setOption(option);
    }
  },
  mounted() {
    this.initKline();
  }
};
</script>

<style lang="scss" scoped>
.xiadan {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #2a2d32;
  #content {
    width: 100%;
    height: 100%;
  }
}
</style>