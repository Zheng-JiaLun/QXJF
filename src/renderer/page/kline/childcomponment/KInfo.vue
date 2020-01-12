<template>
  <div id="klineInfo" class="klineInfo">
    <div class="top">
      <div class="infoname">
        <h2>{{proInfo.name+' '+proInfo.code}}</h2>
      </div>
      <p class="flex1">
        <span class="spanL">卖出</span>
        <span class="spanM">{{proInfo.salePoint}}</span>
        <span class="spanR">{{proInfo.soleF?proInfo.soleF:'0'}}</span>
      </p>
      <p class="flex1">
        <span class="spanL">买入</span>
        <span class="spanM">{{proInfo.buyPoint}}</span>
        <span class="spanR">{{proInfo.buyF?proInfo.buyF:'0'}}</span>
      </p>
      <p class="jiaoyi">
        <span>{{isTransaction}}</span>
        <span>{{this.$store.state.nowTime}}</span>
      </p>
    </div>
    <div class="center flex">
      <div class="left">
        <ul>
          <li class="flex flex-align-items-center flex-justify-content-sb">
            <span>最新</span>
            <span :style="proInfo.upDown > '0'?'color: #FF3322;':'color: #00BD00;'">{{proInfo.print?proInfo.print:'0'}}</span>
          </li>
          <li class="flex flex-align-items-center flex-justify-content-sb">
            <span>现手</span>
            <span style="color: #D7B018;">{{proInfo.nowNum?proInfo.nowNum:'0'}}</span>
          </li>
          <li class="flex flex-align-items-center flex-justify-content-sb">
            <span>总手</span>
            <span style="color: #D7B018;">{{proInfo.allNum?proInfo.allNum:'0'}}</span>
          </li>
          <li class="flex flex-align-items-center flex-justify-content-sb">
            <span>持仓</span>
            <span style="color: #3071E8;">{{proInfo.chicang?proInfo.chicang:'0'}}</span>
          </li>
          <li class="flex flex-align-items-center flex-justify-content-sb">
            <span>涨停</span>
            <span style="color: #00BD00;">{{proInfo.upClose?proInfo.upClose:'0'}}</span>
          </li>
          <li class="flex flex-align-items-center flex-justify-content-sb">
            <span>跌停</span>
            <span style="color: #00BD00;">{{proInfo.downClose?proInfo.downClose:'0'}}</span>
          </li>
        </ul>
      </div>
      <div class="right">
        <ul>
          <li class="flex flex-align-items-center flex-justify-content-sb">
            <span>涨跌</span>
            <span :style="proInfo.upDown > '0'?'color: #FF3322;':'color: #00BD00;'">{{proInfo.upDown?proInfo.upDown:'0'}}</span>
          </li>
          <li class="flex flex-align-items-center flex-justify-content-sb">
            <span>涨幅</span>
            <span :style="proInfo.upDown > '0'?'color: #FF3322;':'color: #00BD00;'">{{proInfo.upF?proInfo.upF:'0'}}%</span>
          </li>
          <li class="flex flex-align-items-center flex-justify-content-sb">
            <span>开盘</span>
            <span style="color: #FF3322;">{{proInfo.openPoint}}</span>
          </li>
          <li class="flex flex-align-items-center flex-justify-content-sb">
            <span>最高</span>
            <span style="color: #FF3322;">{{proInfo.higePoint}}</span>
          </li>
          <li class="flex flex-align-items-center flex-justify-content-sb">
            <span>最低</span>
            <span style="color: #00BD00;">{{proInfo.lowPoint}}</span>
          </li>
          <li class="flex flex-align-items-center flex-justify-content-sb">
            <span>昨结</span>
            <span style="color: #00BD00;">{{proInfo.preClosePoint}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="bottom">
      <table>
        <thead>
          <th>时间</th>
          <th>价位</th>
          <th>现手</th>
          <th>开平</th>
        </thead>
        <tbody>
          <tr v-for="(item, index) in list" :key="index">
            <td>{{item.createTime}}</td>
            <td :style="item.changePoint <= 0? 'color:#00BD00;' : 'color:#FF3322;'">{{item.point}}</td>
            <td>{{item.buyNum}}</td>
            <td :style="item.changePoint <= 0? 'color:#00BD00;' : 'color:#FF3322;'">{{item.changePoint >= 0?'多开':'多平'}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isTransaction:"交易中",
      proInfo: {
        name: "恒生1905 HSI1905",
        sole: 123.8,
        soleF: 20,
        buy: 1236.9,
        buyF: 19,
        time: "05-08 14:45",
        print: 2874.9,
        nowNum: 1,
        allNum: 1334,
        chicang: 673333,
        upClose: "-0.34",
        downClose: "-0.34",
        upDown: 0.9,
        upF: "-0.3",
        open: 23334,
        high: 1236.4,
        slow: 123.5,
        old: 1333.4
      },
      list: [
       
      ],
      // proInfos:this.$store.state.klineMsgs
    };
  },
  methods:{
    lodingKinfo(){
      let hqArr = JSON.parse(localStorage.getItem(this.$store.state.localStorageHq))[0].item
      let chanpinInfo = this.$store.state.chanpinInfo
      let date =new Date()
      //  console.log(hqArr)
       for(let i=0;i<hqArr.length;i++){
         if(hqArr[i].code == chanpinInfo){
           hqArr[i].tradeTime = eval(hqArr[i].tradeTime)
           hqArr[i].time = this.$pro.getTime()
           this.proInfo = hqArr[i]
          //  console.log('~~~~~~~~~~~~~~~~~~~~~',this.proInfo)
         }
       }
      
    }
  },
  created(){
    this.lodingKinfo()
  },
  computed:{
    changeNowTime(){
      return this.$store.state.nowTime
    },
    changChanpinInfo(){
      return this.$store.state.chanpinInfo
    },
    changekDataSocket(){
      return this.$store.getters.kDataSocket
    }
  },
  watch:{
     changChanpinInfo:function(val){
      this.lodingKinfo()
    },
    changeNowTime:function(val){
      // console.log(this.isTransaction)
      let dateVal   =   val.replace(/\//g,'-')//吧时间格式 2019/01/01 00:00:00 转换成 2019-01-01 00:00:00 方便后面转化成时间戳进行对比
      
      let nowdata   =   dateVal.slice(0,val.indexOf(' ')+1)//取转换后的时间日期部分，用于拼接开盘得时段，方便转换成时间戳对比
      let flag      = false,
          flag2      = false
      let tradeTime = this.proInfo.tradeTime
      // console.log(this.proInfo,"20202020202020202")
        for(let i=0;i<tradeTime.length;i++){
          if(tradeTime[i].end.slice(0,1) == '0' && tradeTime[i].end.slice(0,2) < tradeTime[i].open.slice(0,2)){//判断是否结束时间是第二天得情况
            let _newdate1 = (new Date().getYear()+1900)+'-'+(new Date().getMonth()+1)+'-'+(new Date().getDate()+1)+' '//当前天数加一天
            let _newdate2 = (new Date().getYear()+1900)+'-'+(new Date().getMonth()+1)+'-'+(new Date().getDate()-1)+' '//当前天数减一天
            if(new Date().getHours() < tradeTime[i].end.slice(0,2)){  //是否是凌晨得情况
              if(new Date(_newdate2+tradeTime[i].open+':00') <= new Date(dateVal) && new Date(dateVal) <= new Date(nowdata+tradeTime[i].end+':00')){
                // console.log("当前为交易时段0")
                flag = true
                break
              }
            }else{
              if(new Date(nowdata+tradeTime[i].open+':00') <= new Date(dateVal) && new Date(dateVal) <= new Date(_newdate1+tradeTime[i].end+':00')){
                // console.log("当前为交易时段1")
                flag = true
                break
              }
            }
          }else{
            if(new Date(nowdata+tradeTime[i].open+':00') <= new Date(dateVal) && new Date(dateVal)  <= new Date(nowdata+tradeTime[i].end+':00')){
              // console.log("当前为交易时段2")
              // console.log(tradeTime)
              flag = true
              break
            }
          }
        }
        if(flag){
          this.isTransaction = '交易中'
          this.$store.state.isTransaction = true
        }else{
          this.isTransaction = '停止交易'
          this.$store.state.isTransaction = false
        }
       
      
    },
     changekDataSocket:function(val){
      // console.log(val)
      if(val.code == this.changChanpinInfo){
        this.proInfo.buyF = val.buyNum
        this.proInfo.soleF = val.sellNum
        this.proInfo.higePoint = val.higePoint
        this.proInfo.openPoint = val.openPoint
        this.proInfo.lowPoint = val.lowPoint
        this.proInfo.allNum = val.totalNum
        this.proInfo.upDown = Number(val.changePoint).toFixed(2)
        this.proInfo.upF = val.changeRate
        this.proInfo.print = val.point
        this.proInfo.chicang = val.positionNum
        this.proInfo.nowNum = val.buyNum
        this.proInfo.upClose = val.limitUp
        this.proInfo.downClose = val.limitDown
        val.createTime = val.createTime.slice(val.createTime.indexOf(' '),val.createTime.lastIndexOf('.'))
        // console.log(val.createTime)
        // val.point
        this.list.push(val)
        // val.
      }

    }
  },
  mounted(){
    // this.$store.state.klineMsg
    // console.log('打印合约详情',this.proInfos)
    // this.$store.state.chanpinInfo
  },
  // methods(){},
};
</script>

<style lang="scss" scoped>
.klineInfo {
  color: #eaeaea;
  // border: 1px solid #323232;
  border: black 1px solid;
  border-top: none;
  // background: rgba(34, 39, 46, 1);
  background: #191B1F;
  height: 100%;
  .top {
    height: 20%;
    // border-bottom: 1px solid #323232;
    border-bottom: black 1px solid;
    white-space:nowrap;
    overflow: hidden;
    .infoname {
      height: 30%;
      // border-bottom: 1px solid #323232;
      // border-bottom: black 1px solid;
      padding-top: 5%;
      padding-left: 5%;
    }
    h2 {
      margin: 0px;
      font-size: 20px;
    }
    p {
      margin: 0px;
      font-size: 18px;
      padding: 1% 5%;
      span {
        padding-right: 30px;
      }
    }
    .flex1 {
      height: 15%;
      display: flex;
      // border-bottom: 1px solid #323232;
      // border-bottom: black 1px solid;
      .spanL {
        flex: 3;
      }
      .spanM {
        flex: 4;
        color: #00bd00;
      }
      .spanR {
        flex: 3;
        color: #3071e8;
      }
    }
    .jiaoyi {
      font-size: 14px;
      display: flex;
      span:first-child {
        color: #b7b7b7;
        flex: 3;
      }
      span:last-child {
        color: #808080;
        flex: 7;
      }
    }
  }
  .center {
    white-space:nowrap;
    overflow: hidden;
    height: 30%;
    margin: 0px;
    display: flex;
    font-size: 14px;
    padding: 0 5%;
    color: #eaeaea;
    // border-bottom: 1px solid #323232;
    border-bottom: black 1px solid;
    .left,
    .right {
      flex: 1;
      ul {
        list-style: none;
        padding: 0px;
      }
      ul li {
        padding: 3% 0;
      }
    }
    .left {
      // border-right: 1px dashed #323232;
      border-right: black 1px dotted;
      ul li {
        padding-right: 8%;
      }
    }
    .right {
      ul li {
        padding-left: 8%;
      }
    }
  }
  .bottom {
    white-space:nowrap;
    overflow-x: hidden;
    height: 49.7%;
    overflow-y: scroll;
    table {
      width: 100%;
      max-height: 63px;
      border-spacing: 0px;
      thead {
        font-size: 15px;
        color: #b7b7b7;

        th {
          background-color: #22304c;
          padding: 5px 0;
          margin: -2px;
        }
        th:first-child {
          text-align: left;
          text-indent: 10%;
          width: 100px;
        }
      }
      tbody {
        tr {
          height: 20px !important;
          td {
            text-align: center;
            color: #b7b7b7;
            font-size: 14px;
            padding: 2px 0;
            height: 20px !important;
          }
          td:first-child {
            text-align: left;
            text-indent: 10%;
          }
          td:nth-child(3) {
            color: #D7B018;
          }
        }
      }
    }
  }
  .bottom::-webkit-scrollbar {
    display: none;
  }
}
</style>
