<template>
    <div class="fenxi">
        <!-- <p>{{tabel}}</p> -->
        <el-tabs type="card" v-model="activeName" @tab-click="handleClick" >
           
            <el-tab-pane :name="item.list" :label="index"  v-for="(item,index) in dataList" :key="index">
                
                
                
                <div v-if="index == '近三个月'" id="yigeyue">
                    我是近一个月的表格数据
                </div>

                <div v-if="index== '近一个月'" class="sangeyue" id="sangeyue">
                    我是近三个月的表格数据
                </div>
            </el-tab-pane>
            
        </el-tabs>
    </div>
</template>

<script>
import { log } from 'util';
import echarts from 'echarts';
export default {
    data() {
      return {
          tabel:'持仓',
        activeName: 'first',
        dataList:{
            '近一个月':{list:'first'},
            '近三个月':{},
            '近一年':{},
            '全部':{},
        }
      };
    },
     methods: {
      handleClick(tab,event,index) {
          //this.tabel=index
          //console.log(event.target.getAttribute('id'))   
      },
        sangeyue(){
           let this_ = this;
            let myChart3 = echarts.init(document.getElementById('sangeyue'));
            //console.log(myChart3)
            let option = {
                color: ['#f44'],
                tooltip : {
                trigger: 'axis',
                axisPointer : {
                    type : 'shadow'
                }
                },
                xAxis : [
                {
                    type : 'category',
                    data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月',],
                    axisTick: {
                    alignWithLabel: true
                    }
                }
                ],
                yAxis : [
                {
                    type : 'value'
                }
                ],
                series : [
                {
                    name:'每月花费',
                    type:'bar',
                    barWidth: '60%',
                    data:[995,666,444,858,654,236,645,546,846,225,547,356]
                }
                ]

            }
      
            myChart3.setOption(option);
            //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
            window.addEventListener('resize',function() {myChart.resize()});
        },
        yigeyue(){
            let myChart1=echarts.init(document.getElementById('yigeyue'))
            let option ={
                title:{
                    text:'K线练习实例'
                },
                legend:{
                    data:['销量01','销量02','销量03'],
                },
                tooltip:{
                    
                },
                xAxis:{
                    //type: 'category',
                    data: ['2017-10-24', '2017-10-25', '2017-10-26', '2017-10-27']
                },
                yAxis:{},
                series:[
                    {
                        name: '销量01',
                        type: 'k',
                        data: [
                            [20, 30, 10, 35],
                            [40, 35, 30, 55],
                            [33, 38, 33, 40],
                            [40, 40, 32, 42]
                        ]
                    },
                    
                    
                ],
            }
            myChart1.setOption(option)
        }

      
    },
    mounted(){
           //三个月演示数据
           this.sangeyue()
           this.yigeyue()
            
    },
}
</script>

<style lang="scss" scoped>
.fenxi{
    width: 100%;
    margin-top: 10px;
}
#yigeyue{
    height: 260px;
    width:700px;
    //background: black;
    //color: #fff;
    background: #fff;

}
#sangeyue{
       height: 260px;
       width:700px;
    }
</style>