<template>
  <div class="transaction flex" style="height: 100%;min-height: 274px;">
    <!-- 买入卖出组件的展示区域 -->
    <div class="cont">
      <!-- 买入卖出组件顶部下拉选择框展示区域 -->
      <div class="top flex">
        <!-- 左边下拉选择框 -->
        <el-select
          class="select"
          v-model="heyue.heyueClass"
          placeholder="请选择交易所"
          @change="heyueChange"
        >
          <el-option
            v-for="(item, index) in heyueClassOptions"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <!-- 右边下拉选择框 -->
        <el-select class="select" v-model="heyue.heyueName" placeholder="请选择合约代码" @change="heyueNameCh">
          <el-option
            v-for="(item, index) in heyueNameOptions"
            :key="index"
            :label="item.name+' '+item.code"
            :value="item.code"
          ></el-option>
        </el-select>
      </div>
      <!-- 合约名字展示框 -->
      <div class="heyue flex">
        <span>合约：</span>
        <input class="heyueInput" type="text" readonly='true' :value="heyue.heyueCode" />
        <!-- <input class="heyueInput" type="text" readonly='true' v-model="code"/> -->
        <!-- <span class="span">{{heyue.heyueName}}</span> -->
      </div>
      <!-- 相关操作展示区域 -->
      <div class="input flex">
        <div class="cl flex">
          <span @click="setPrice()">{{setPriceName}}<i class="el-icon-d-caret"></i></span>
          <el-input class="inner" placeholder v-model="gen" clearable :disabled="setPriceName == '市价'?true:false" type="number"></el-input>
        </div>
        <div class="cl flex">
          <span>数量:</span>
          <el-input class="inner" placeholder v-model="num" clearable></el-input>
        </div>
        <div class="cl flex">
          <span>止盈:</span>
          <el-input class="inner" placeholder v-model="stopPrint" clearable></el-input>
        </div>
        <div class="cl flex">
          <span>止损:</span>
          <el-input class="inner" placeholder v-model="stopLoss" clearable></el-input>
        </div>
      </div>
      <!-- 底部买入卖出按键展示区域 -->
      <div class="button flex">
        <div class="buttonChildL">
          <el-button type="danger" @click="shijia(1)">买入</el-button>
        </div>
        <div class="buttonChildR">
          <el-button type="primary" @click="shijia(2)">卖出</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "transaction",
  props:{
    hangqingData:{
      type:Array,
      default:() => []
    },
    inputVal:{
      type:Array,
      default:() => []
    },
    chicangselect:{
      type:Object,
      default:() => {}
    }
  },
  data() {
    return {
      gen: 0,
      num: 1,
      stopPrint: 0,
      stopLoss: 0,
      setPriceName:'市价',
      // genTemporary:"",//跟盘最新暂存数据 
      isTransaction:false,
      heyue: {
        heyueClass: "",
        heyueName: "",
        heyueCode: ""
      },
      heyueClassOptions: [
        {
          name: "交易所一",
          id:1,
          item: [
            { name: 11 ,code:"111"},
            { name: 12 ,code:"111"},
            { name: 13 ,code:"111"},
            { name: 14 ,code:"111"},
            { name: 15 ,code:"111"}
          ]
        },
        {
          name: "交易所一",
          id:2,
          item: [
            { name: 11 ,code:"111"},
            { name: 12 ,code:"111"},
            { name: 13 ,code:"111"},
            { name: 14 ,code:"111"},
            { name: 15 ,code:"111"}
          ]
        },
        {
          name: "交易所一",
          id:3,
          item: [
            { name: 11 ,code:"111"},
            { name: 12 ,code:"111"},
            { name: 13 ,code:"111"},
            { name: 14 ,code:"111"},
            { name: 15 ,code:"111"}
          ]
        },
       
      ],
      heyueNameOptions: []
    };
  },
  methods: {
    setPrice(){
      if(this.setPriceName == '市价'){
        this.setPriceName = '限价'
      }else if(this.setPriceName == '限价'){
        this.setPriceName = '市价'
        
      }
      
    },
    shijia(type){
      let _this = this
      // localStorage.setItem('buycode',_this.heyue.heyueCode)//用户(买卖)操作的合约存一个,继续展示到页面上
      if(localStorage.getItem('ycxUserLoginState_QXJF')){
         if(type == 1){
           if(this.heyue.heyueCode == ''){
             this.$message.error('请输入正确合约参数');
           }else{
              this.$confirm(this.heyue.heyueCode+' , '+this.num+'手'+' , '+this.setPriceName+' '+'确定买入?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                  var msg = JSON.stringify({
                    userID: JSON.parse(localStorage.getItem(this.$store.state.localStorageUid)).userId,
                    tradeNum: _this.num,
                    tradePrice: _this.gen,
                    futuresCode: _this.heyue.heyueCode,
                    updown: 1,
                    priceType: this.setPriceName == '市价'?1:2,
                    stopLoss: Number(_this.stopLoss),
                    stopProfit: Number(_this.stopPrint)
                  })
                  console.log(msg)
                  _this.$pro.post('buy_sale_order', msg).then((res) => {
                    console.log(res)
                    if (res.result == 1) {
                      _this.$message({
                        type: 'success',
                        message:'买入成功'
                      });
                    }else{
                      this.$message.error(res.message);
                    }
                  })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消买入'
                });          
              });
           }
          
        }else{
           if(this.heyue.heyueCode == ''){
             this.$message.error('请输入正确合约参数');
           }else{
              this.$confirm(this.heyue.heyueCode+' , '+this.num+'手'+' , '+this.setPriceName+' '+'确定卖出?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                
                  var msg = JSON.stringify({
                    userID: JSON.parse(localStorage.getItem(this.$store.state.localStorageUid)).userId,
                    tradeNum: _this.num,
                    tradePrice: _this.gen,
                    futuresCode: _this.heyue.heyueCode,
                    updown: 2,
                    priceType: this.setPriceName == '市价'?1:2,
                    stopLoss: Number(_this.stopLoss),
                    stopProfit: Number(_this.stopProfit)
                  })
                  _this.$pro.post('buy_sale_order', msg).then((res) => {
                    console.log(res)
                    if (res.result == 1) {
                      _this.$message({
                        type: 'success',
                        message:'卖出成功'
                      });
                    }else{
                      this.$message.error(res.message);
                    }
                  })
              
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消卖出'
                });          
              });
           }
          
        }
      }else{
        	this.$confirm('未登录,请登录后操作~', '温馨提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					
				})
      }
     
    },
    heyueChange(value) {
      for (var i = 0; i < this.heyueClassOptions.length; i++) {
        if (value === this.heyueClassOptions[i].id) {
          this.indexNum = i;
          break;
        }
      }
      this.heyueNameOptions = this.heyueClassOptions[this.indexNum].item;
      this.heyue.heyueClass = value;
      this.heyue.heyueName = this.heyueClassOptions[this.indexNum].item[0].name + ' ' +this.heyueClassOptions[this.indexNum].item[0].code;
      this.heyue.heyueCode = this.heyueClassOptions[
        this.indexNum
      ].item[0].code;
    },
    heyueNameCh(value) {
      this.heyue.heyueCode = value;
    }
  },
  created(){
    this.heyueClassOptions = JSON.parse(localStorage.getItem(this.$store.state.localStorageHq))
    this.heyue.heyueCode = this.$store.state.chanpinInfo
  },
  computed:{
    changeQuoteData(){
      return this.$store.state.market.quoteData
    },
    changeIsTransaction(){
      return this.$store.state.isTransaction
    },
    changeInfo(){
      return this.$store.state.chanpinInfo
    }
  },
  watch:{
    'heyue.heyueCode'(val){
      this.$store.state.chanpinInfo = val
      for(let i=0;i<this.hangqingData.length;i++){
        if(this.hangqingData[i].code == val){
          // let time = eval(hangqingData[i].tradeTime)
          this.gen = this.hangqingData[i].buyPoint
        }
      }
    },
    changeInfo(val){
       this.heyue.heyueCode = val
    },
    inputVal(val){
      // console.log(val)
      // this.heyue.heyueCode = val[1]
    },
    chicangselect(val){
      console.log(val)
      this.heyue.heyueCode = val.futures_code
    },
    hangqingData:function(val){
      // console.log(val)
      for (let i = 0; i < val.length; i++) {
        if(val[i].code == this.heyue.heyueCode){
          // let time = eval(hangqingData[i].tradeTime)
          if(this.setPriceName == '市价'){
            this.gen = val[i].point
          }
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.transaction::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    // -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.7);
    background: rgb(29,33,37);
}
.transaction::-webkit-scrollbar-track {/*滚动条里面轨道*/
    // -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: rgb(39,44,50);
}
.transaction::-webkit-scrollbar{
  height: 8px;
  width: 8px;
}
.transaction {
  overflow-x: auto;
  .flex {
    display: flex;
  }
  .cont {
    width: 85%;
    margin: 0 auto;
    height: 100%;
    min-width: 300px;
    color:#b7b7b7;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .top {
      padding: 5% 0;
      .select {
        flex: 1;
        margin-right: 10px;
      }
    }
    .heyue {
      color: #b7b7b7;
      span:first-child {
        color:#b7b7b7;
        width: 13.5%;
        height: 37px;
        line-height: 37px;
        font-size: 12px;
      }
      .heyueInput {
        flex:1;
        height: 37px;
        line-height: 37px;
        background: #191B1F;
        color: #b7b7b7;
        font-size: 14px;
        text-indent: 10px;
        margin-right: 10px;
        border:1px solid rgba(67,67,67,1);
        border-radius: 2px;
      }
    }
    .input {
      display: flex;
      flex-wrap: wrap;
      margin-right: 10px;
      justify-content:space-between;
      .cl {
        width: 45%;
        padding: 2% 0;
        :first-child:hover{
          background-color: rgba(80, 80, 80, 0.788);
          cursor: pointer;
          border-radius: 5px;
        }
        span {
          font-size: 12px;
          line-height: 40px;
          width: 30%;
          color: #b7b7b7;
          flex-shrink: 0;
        }
        input {
          line-height: 100%;
          margin-right: 50px;
          width: 70%;
        }
        .inner{
          width: 70%;
        }
      }
    }
    .button {
      margin: 5% 0;
      padding-top: 1%;
      .buttonChildL {
        flex: 1;
        text-align: right;
        margin-right: 3%;
      }
      .buttonChildR {
        flex: 1;
        text-align: left;
        margin-left: 3%;
      }
      .el-button {
        width: 80%;
        height: width/4;
      }
      .el-button--danger {
        background-color: rgba(230, 38, 21, 0.788);
        border-color: rgba(230, 38, 21, 0.788);
      }
      .el-button--danger:hover{
        background-color: rgba(151, 26, 14, 0.788);
        border-color: rgba(151, 26, 14, 0.788);
      }
      .el-button--primary {
        background-color: #078307;
        border-color: #078307;

      }
      .el-button--primary:hover{
        background-color: #085808;
        border-color: #085808;
      }
    }
  }
}
</style>
