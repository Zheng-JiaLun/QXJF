<template>
  <div class="zhisunTanchuang">
    <div class="top">
      <h3>客户端止损止盈</h3>
    </div>
    <div class="center">
      <p style="color: #CCCCCC;padding-bottom: 5px;">正在修改（合约:{{stopProLoss.futures_code}} 方向:{{stopProLoss.down == 1?"买":"卖"}}）持仓对应的止损止盈单信息</p>
      <div
        class="flex flex-align-items-center flex-justify-content-sb"
        style="padding-bottom: 10px;"
      >
        <p style="color: #CCCCCC;">
          <span style="padding-right: 10px;">最小变动单位: {{stopProLoss.price_unit}}</span>
          <span>持仓量: {{stopProLoss.futures_num}}</span>
          <span style="color: #00BD00;float:right;">{{stopProLoss.buyPoint}}</span>
          <span style="color: #00BD00;float:right;">最新价:</span>
        </p>
      </div>
      <!-- <el-table :data="stopProLoss" border tooltip-effect="light" @row-click="c">
        <el-table-column prop="addtime" label="进仓时间"  show-overflow-tooltip></el-table-column>
        <el-table-column prop="futures_num" label="数量" show-overflow-tooltip></el-table-column>
        <el-table-column prop="stoploss" label="止损价" show-overflow-tooltip></el-table-column>
        <el-table-column prop="stopLossLive" label="活动止损价差" width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="stopprofit" label="止盈价" show-overflow-tooltip></el-table-column>
        <el-table-column prop="myPrice" label="保本价" show-overflow-tooltip></el-table-column>
      </el-table> -->
      <div class="stopcontent">
        <div class="stop-zhi">
          <span>当前止盈：{{nowstopProLoss.stopprofit}}</span>
          <span>
            <span><i class="el-icon-remove-outline" @click="stopReduce(1)"></i></span>
            <input type="text"  v-model="msgStop.stopprofit">
            <span><i class="el-icon-circle-plus-outline" @click="stopPlus(1)"></i></span>
          </span>
        </div>
        <div class="stop-zhi">
          <span>当前止损：{{nowstopProLoss.stoploss}}</span>
          <span>
            <span><i class="el-icon-remove-outline" @click="stopReduce(2)"></i></span>
            <input type="text" v-model="msgStop.stoploss">
            <span><i class="el-icon-circle-plus-outline" @click="stopPlus(2)"></i></span>
          </span>
        </div>
      </div>
      <p
        style="font-size: 12px;color: #4176D8;padding: 10px 0;"
      >窗口关闭前此合约对应的止损止盈单不会出发（客户端止损止盈，不是交易所指令，只对在本地程序运行时有效）</p>
    </div>
    <div class="footer">
      <el-button @click="postBtn()">确 定</el-button>
      <el-button @click="close()">取 消</el-button>
    </div>
    <span slot="footer" class="dialog-footer"></span>
    <!-- </el-dialog> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      zuixinjia: "暂无数据",
      stopProLoss: {},
      nowstopProLoss:{
        stopprofit:'',
        stoploss:''
      },
      msgStop:{
        stoploss:0,
        stopprofit:0
      }
    };
  },
  methods: {
    
    c(row) {
      // this.zuixinjia = row.myPrice;
    },
    close() {
      let win = this.$Win.getWinByName("zhiyingzhisun");
      this.$Win.closeWin(win);
    },
    initMsg(){
      let data = this.$Win.getParameter()
      // data.addtime = data.addtime.replace("T"," ")
      this.stopProLoss = data.id
      this.nowstopProLoss.stopprofit = data.id.stopprofit
      this.nowstopProLoss.stoploss = data.id.stoploss
      
      this.msgStop.stoploss = (Number(data.id.buyPoint?data.id.buyPoint:data.id.lastprice)*1000 - 5*1000)/1000

      this.msgStop.stopprofit = (Number(data.id.buyPoint?data.id.buyPoint:data.id.lastprice)*1000 + 5*1000)/1000
      this.zuixinjia = data.id.buyPoint
      console.log(data)
      console.log(data.id)
    },
    //减
    stopReduce(e){
      //止盈
      if(e == 1){
        
         this.msgStop.stopprofit = (this.msgStop.stopprofit*1000 - this.stopProLoss.price_unit*1000)/1000
        
        this.$set(this.msgStop,this.msgStop.stopprofit,this.msgStop.stopprofit)
      //止损
      }else{
        this.msgStop.stoploss = (this.msgStop.stoploss*1000 - this.stopProLoss.price_unit*1000)/1000
        this.$set(this.msgStop,this.msgStop.stoploss,this.msgStop.stoploss)
      }
    },
    //加
    stopPlus(e){
      //止盈
      if(e == 1){
        this.msgStop.stopprofit = (this.msgStop.stopprofit*1000 + this.stopProLoss.price_unit*1000)/1000
        this.$set(this.msgStop,this.msgStop.stopprofit,this.msgStop.stopprofit)
      //止损
      }else{
        this.msgStop.stoploss = (this.msgStop.stoploss*1000 + this.stopProLoss.price_unit*1000)/1000
        this.$set(this.msgStop,this.msgStop.stoploss,this.msgStop.stoploss)
      }
    },
    postBtn(){
      let _this = this
      var msg = JSON.stringify({
        userID:JSON.parse(localStorage.getItem(this.$store.state.localStorageUid)).userId,
        serialNum:_this.stopProLoss.serialnum,
        stopLoss:_this.msgStop.stoploss,
        stopProfit:_this.msgStop.stopprofit
      })
      _this.$post('set_stop_loss',msg).then(function(res){
        console.log(res)
        if(res.result == 1){
          _this.$message({
            message: '设置成功',
            type: 'success'
          });
          setTimeout(function(){
            // _this.close()
            let data = {value: true}
            _this.$Win.closeWin(data)
          },1500)
          
        }else{
          _this.$message.error('错误:'+res.message);
        }
      })
    },

  },
  computed:{
    changeStopProLoss(){
      return this.stopProLoss
    },
    changekDataSocket(){
      return this.$store.getters.kDataSocket
    }
  },
  mounted(){
    this.initMsg()
    
  },
  watch:{
    changekDataSocket:function(val){
      // console.log(val)
      if(val.code==this.stopProLoss.futures_code){
        this.stopProLoss.buyPoint = val.point
        this.$set(this.stopProLoss,this.stopProLoss.buyPoint,val.point)
        // console.log(this.stopProLoss.buyPoint)
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.zhisunTanchuang {
  height: 100vh;
  background: rgba(42, 47, 56, 1);
  font-family: Microsoft YaHei;
  p {
    margin: 0px;
  }
  .top {
    padding: 1px;
    text-align: center;
    background: rgba(47, 52, 59, 1);
    color: #9b9999;
  }
  .center {
    padding: 10px 3%;
    background: rgba(42, 47, 56, 1);
    .stopcontent{
      .stop-zhi{
        width: 500px;
        margin: 20px auto;

        display: flex;
        justify-content: space-between;
        color: #9b9999;
        font-size: 20px;
        input{
          background: none;
          border: none;
          outline: none;
          width: 80px;
          height: 30px;
          vertical-align: top;
          font-size: 20px;
          color: #b8b8b8;
        }
        i{
          font-size: 28px;
          cursor: pointer;
        }
        
      }
    }
  }
  .footer {
    padding: 10px 3%;
    background: rgba(42, 47, 56, 1);
    text-align: right;
  }
}
</style>
