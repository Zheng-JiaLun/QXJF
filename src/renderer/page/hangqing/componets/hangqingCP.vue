<template>
  <div class="hangqing">
      <div class="tianchong"></div>
        <table cellspacing=0>
            <thead>
                <th v-for="(item,index) in headList" :key="index">{{item.title}}</th>
            </thead>
            <tbody>
                <!-- <router-link to="/kline"> -->
                <!-- :style="{border:isactive == index ? '1px solid #A4A4A4' : ''}" -->
                <tr v-for="(item,index) in childMsg" :key="index" @click="hangqingbg(index,item.code);"  
                    :style="{background:isactive == index?'#22304C':''}"
                  
                    :class="item.changePoint?(item.changePoint>0?'changeUp':'changeDown'):' '"
                    >
                    <!-- :class="classUp?'changeUp':''" :class="{'changeUp':currentIndex == index}"-->
                     
                    <td style="color:#B3B3B3;">{{index+1}}</td>
                    <td style="color:#DCDC0A;min-width:80px" :title="item.name">{{item.name}}</td>
                    <td style="color:#DCDC0A;">{{item.code}}</td>
                    <!-- 最新价 -->
                    <td :style="item.buyPoint >=60?'color:#FF3322;':'color:#00BD00;'">{{item.buyPoint}}</td>
                    <!-- 买价 -->
                    <td style="color:#FF3322;">{{item.buyPoint}}</td>
                    <!-- 买量 -->
                    <td >{{item.buyNum?item.buyNum:"暂无数据"}}</td>
                    <!-- 卖价 -->
                    <td>{{item.salePoint}}</td>
                    <!-- 卖量 -->
                    <td>{{item.sellNum?item.sellNum:"暂无数据"}}</td>
                    <!-- 成交总量 -->
                    <td>{{item.num}}</td>
                    <!-- 涨跌 -->
                    <td :style="item.changePoint >0?'color:#FF3322;':'color:#00BD00;'">{{item.changePoint?item.changePoint:0}}</td>
                    <!-- 涨幅 -->
                    <td :style="item.changeRate >0?'color:rgba(255,51,34,1);':'color:rgba(0,189,0,1);'">{{item.changeRate?item.changeRate:0}}%</td>
                    <!-- 开盘 -->
                    <td style="color:#00BD00;">{{item.openPoint?'0':item.openPoint}}</td>
                    <td>{{item.point}}</td>
                    <td style="color:#FF3322;">{{item.point}}</td>
                    <td style="color:#00BD00;">{{item.point}}</td>
                    <td>{{item.point}}</td>
                    <td style="color:#3071E8;">{{item.point}}</td>
                    <td>{{item.point}}</td>
                    <td>{{item.point}}</td>
                    <td>{{item.point}}</td>
                    <td style="color:#DCDC0A;">{{item.point}}</td>
                    <td>{{item.point}}</td>

                </tr>
                <!-- </router-link> -->
            </tbody>
        </table>
        
  </div>
</template>

<script>
import {mapMutations,mapActions,mapGetters} from 'vuex';
export default {
    name:'hangqingCP',
    props:['msg','panShow'],
    data(){
        return{
            childMsg:this.msg,
            isactive:-1,
            currentIndex:0,
            headList:[
                {
                    id:'0.0001',
                    title:'序号'
                },
                {
                    id:'0.0002',
                    title:'合约名称'
                },
                {
                    id:'0.0003',
                    title:'合约代码'
                }, 
                {
                    id:'0.0004',
                    title:'最新价'
                },
                {
                    id:'0.0005',
                    title:'买价'
                }, 
                {
                    id:'0.0006',
                    title:'买量'
                },
                {
                    id:'0.0006',
                    title:'卖价'
                },
                {
                    id:'0.0006',
                    title:'卖量'
                },
                {
                    id:'0.0007',
                    title:'成交量'
                }, 
                {
                    id:'0.0008',
                    title:'涨跌'
                },
                {
                    id:'0.0009',
                    title:'涨幅%'
                },
                {
                    id:'0.00010',
                    title:'开盘'
                }, 
                {
                    id:'0.00011',
                    title:'昨收盘'
                }, 
                {
                    id:'0.00012',
                    title:'最高'
                }, 
                {
                    id:'0.00013',
                    title:'最低'
                },
                {
                    id:'0.00014',
                    title:'持仓量'
                }, 
                {
                    id:'0.00015',
                    title:'结算价'
                },
                {
                    id:'0.00016',
                    title:'涨停'
                }, 
                {
                    id:'0.00017',
                    title:'跌停'
                },
                {
                    id:'0.00018',
                    title:'昨持仓'
                }, 
                {
                    id:'0.00019',
                    title:'昨结算'
                },
                {
                    id:'0.00020',
                    title:'成交总价'
                },                         
            ],
        }
    },
    mounted(){
    },
     computed:{
        ...mapGetters([
            'quoteDataAC'
        ])
    },
     watch:{
          panShow:function(val){
            if(val){

            }
            console.log(val)

        },
        quoteDataAC:function(val){
            console.log(val)
            let a = this.childMsg
            for(let i=0;i<a.length;i++){
                if(this.childMsg[i].code == val.code){
                    this.childMsg[i].salePoint      = val.salePoint   //卖价
                    this.childMsg[i].buyPoint       = val.buyPoint    //买价
                    this.childMsg[i].num            = val.totalNum    //成交总量
                    this.childMsg[i].buyNum         = val.buyNum      //买量
                    this.childMsg[i].sellNum        = val.sellNum     //卖量
                    this.childMsg[i].openPoint        = val.openPoint     //开盘
                    this.childMsg[i].preClosePoint        = val.preClosePoint     //昨收盘
                    this.childMsg[i].higePoint        = val.higePoint     //最高
                    this.childMsg[i].lowPoint        = val.lowPoint     //最低
                    this.childMsg[i].openPoint        = val.openPoint     //持仓量
                    this.childMsg[i].openPoint        = val.openPoint     //结算价
                    this.childMsg[i].openPoint        = val.limitUp     //涨停
                    this.childMsg[i].openPoint        = val.limitDown     //跌停
                    this.childMsg[i].openPoint        = val.openPoint     //昨持仓
                    this.childMsg[i].openPoint        = val.openPoint     //昨结算
                    this.childMsg[i].openPoint        = val.openPoint     //成交总价
                    // this.childMsg[i].changePoint    = val.changePoint   //涨跌
                    this.childMsg[i].changeRate     = val.changeRate     //涨幅
                    if(val.changePoint.substring(0,1) == "-"){
                        this.childMsg[i].changePoint = -Number(parseFloat(val.changePoint.substring(1)).toFixed(3))
                    }else{
                        this.childMsg[i].changePoint = Number(val.changePoint).toFixed(3)
                    }
                }
            }
        }
    },
    methods:{
       
        hangqingbg(a,code){
           this.isactive=a
           this.$store.state.chanpinInfo = code
           this.$store.state.activeIndex = '/kline'
          
        //    this.$store.dispatch("aCChanpinInfo",code)
        //    this.$store.dispatch("setPath",'/kline')
           this.$router.push('/kline')
        //    this.$store.commit('setChanpinInfo',code)//把当前股票的code赋值给vuex里面的生成K线图需要的参数
        //    this.$store.commit('klineMsgs',code)
        //    this.$store.state.chanpinInfo = b
        //    this.$router.push({name:kline})
        }
    },
   
}
</script>

<style lang="scss" scoped>

.hangqing{
    width: 100%;   
    position: relative;
    // min-width: 1000px;
    .changeDown{
        -webkit-animation: fade-in-down 1.5s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
        animation: fade-in-down 1.5s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
    }
	.changeUp{
		-webkit-animation: fade-in-up 1.5s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
		animation: fade-in-up 1.5s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
	}
    
}


.tianchong{
    position:absolute;
    left: -22px;
    width: 22px;
    height: 44px;
    background: #22272E;
}
table{
    width: 100%;
    margin: 0;
    min-width: 800px;
    
    border-collapse: collapse;
    
    thead{
        width: 100%;
        background: #22272E;
        th{ 
            width: 4%;
            min-width: 56px;
            height:40px;
            font-size:14px;
            font-family:Microsoft YaHei;
            font-weight:400;
            color:rgba(179,179,179,1);
            padding: 2px 0px;   
        }
    
    }
    tbody{
        width: 100%;
        text-align: center;
        
        tr{
            height: 30px;
            cursor: pointer;
            td{
                font-size:14px;
                min-width: 56px;
                font-family:Microsoft YaHei;
                font-weight:400;
                padding: 0;
                color:rgba(153,153,153,1);
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
            td:nth-child(2){
                min-width: 80px;
            }
        }
        tr td:first-child{
            // padding-right: 30px;
            // min-width: 80px;
        }
    }
}
@-webkit-keyframes fade-in-down {
	0% {
		background-color: rgba(61, 198, 119, .8);
	}

	100% {
		background-color: rgba(61, 198, 119, 0);
	}
}

@keyframes fade-in-down {
	0% {
		background-color: rgba(61, 198, 119, .8);
	}

	100% {
		background-color: rgba(61, 198, 119, 0);
	}
}

@-webkit-keyframes fade-in-up {
	0% {
		background-color: rgba(239, 32, 32, .8);
	}

	100% {
		background-color: rgba(239, 32, 32, 0);
	}
}

@keyframes fade-in-up {
	0% {
		background-color: rgba(239, 32, 32, .8);
	}

	100% {
		background-color: rgba(239, 32, 32, 0);
	}
}
</style>