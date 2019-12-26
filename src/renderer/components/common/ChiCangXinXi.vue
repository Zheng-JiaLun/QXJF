<template>
  <div class="chicang">
    <div id="chicangTable">
      <el-table :data="tableData" class="table01" highlight-current-row @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="45" v-if="selector">
        </el-table-column>
        <el-table-column width="45px" v-if="pinChang">
          <template slot-scope="scope" >
            <i class="el-icon-remove" @click="setPingchang(scope.row)" style="font-size: 18px;color: #4176D8;cursor: pointer;"></i>
          </template>
        </el-table-column>
        <el-table-column prop="futures_code" label="编号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="futures_name" label="合约" show-overflow-tooltip></el-table-column>
        <el-table-column label="买卖" show-overflow-tooltip>
          <template slot-scope="scope">
            <span
              :style="scope.row.updown == '1' ? 'color:#FF3322;' : 'color:#00BD00;'"
            >{{scope.row.updown == 1?"买":"卖"}}</span>
          </template>
        </el-table-column>
        <el-table-column label="总持仓" show-overflow-tooltip>
          <template slot-scope="scope">
            <span style="color: #DCDC0A;">{{scope.row.futures_num}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="futures_price" label="持仓价格" show-overflow-tooltip></el-table-column>
        <el-table-column prop="price_unit" label="变动单位" show-overflow-tooltip></el-table-column>
        <el-table-column label="最新价格" show-overflow-tooltip>
           <template slot-scope="scope">
            <span :style="scope.row.buyPoint >scope.row.futures_price?'color:#FF3322;':'color:#00BD00;'">{{scope.row.buyPoint}}</span>
          </template>
        </el-table-column>
        <el-table-column  label="盈亏" show-overflow-tooltip>
           <template slot-scope="scope">
            <span :style="scope.row.buyPoint - scope.row.futures_price >= 0 ? 'color:#FF3322;' : 'color:#00BD00;'"
            >{{(scope.row.buyPoint*1000 - scope.row.futures_price*1000)*scope.row.futures_num/1000}}</span>
          </template>
        </el-table-column>
        <el-table-column  label="本币盈亏" show-overflow-tooltip>
            <template slot-scope="scope">
              <span :style="scope.row.buyPoint - scope.row.futures_price >= 0 ? 'color:#FF3322;' : 'color:#00BD00;'"
              >{{(scope.row.buyPoint*1000 - scope.row.futures_price*1000)*scope.row.futures_num/1000*scope.row.cs}}元</span>
            </template>
        </el-table-column>
        <el-table-column label="止盈止亏" show-overflow-tooltip>
          <template slot-scope="scope">
            <span style="cursor: pointer;color:#fff;" @click="setPrLoss()">{{'点击设置'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="orderType" label="类型" show-overflow-tooltip></el-table-column>
      </el-table>
    </div>
    <div class="determineBtn" v-show="selector">
      <button @click="determineBtn()">确定反手</button>
    </div>
  </div>
</template>
<script>
import { setInterval } from 'timers';
export default {
  name: "chicang",
  props: ["Listheight","pinChang","selector"],
  data() {
    return {
      dialogVisible: false,
      zuixinjia: "暂无数据",
      equity:null,
      count:0,
      multipleSelection:[],
      tableData: [
        {
          number: "MHI1905",
          name: "小恒生1905",
          business: "买",
          position: 2,
          position_price: 73644,
          price_untile: 1,
          contract_multiplier: 10,
          pro_loss: "700",
          this_pro_loss: "1100",
          stop_pro_loss: "点击设置",
          type: "市价成交"
        },
        {
          number: "MHI1905",
          name: "小恒生1905",
          business: "买",
          position: 2,
          position_price: 73644,
          price_untile: 1,
          contract_multiplier: 10,
          pro_loss: "700",
          this_pro_loss: "1100",
          stop_pro_loss: "0/1",
          type: "市价成交"
        },
        {
          number: "MHI1905",
          name: "小恒生1905",
          business: "卖",
          position: 2,
          position_price: 73644,
          price_untile: 1,
          contract_multiplier: 10,
          pro_loss: "700",
          this_pro_loss: "-1100",
          stop_pro_loss: "点击设置",
          type: "市价成交"
        },
        {
          number: "MHI1905",
          name: "小恒生1905",
          business: "卖",
          position: 2,
          position_price: 73644,
          price_untile: 1,
          contract_multiplier: 10,
          pro_loss: "-700",
          this_pro_loss: "-1100",
          stop_pro_loss: "0/1",
          type: "市价成交"
        },
        {
          number: "MHI1905",
          name: "小恒生1905",
          business: "卖",
          position: 2,
          position_price: 73644,
          price_untile: 1,
          contract_multiplier: 10,
          pro_loss: "-700",
          this_pro_loss: "-1100",
          stop_pro_loss: "点击设置",
          type: "市价成交"
        }
      ],
      stopProLoss: [
        {
          time: "2019-05-10 09:22:55",
          num: 12,
          stopLoss: 5692,
          stopLossLive: 533246,
          stopPro: 12336,
          myPrice: 1601
        },
        {
          time: "2019-05-10 09:22:55",
          num: 12,
          stopLoss: 5692,
          stopLossLive: 533246,
          stopPro: 12336,
          myPrice: 1236
        },
        {
          time: "2019-05-10 09:22:55",
          num: 12,
          stopLoss: 5692,
          stopLossLive: 533246,
          stopPro: 12336,
          myPrice: 1740
        },
        {
          time: "2019-05-10 09:22:55",
          num: 12,
          stopLoss: 5692,
          stopLossLive: 533246,
          stopPro: 12336,
          myPrice: 1556
        }
      ]
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection)
    },
    determineBtn(){

    },
    async setPrLoss() {
      let data = await this.$Win.openWin({
        // browserwindow原生属性
        width: 900, // 窗口宽
        height: 476, // 窗口高

        // electron-vue-windows自定义的属性
        windowConfig: {
          router: "/zyzsTanchuang", // 路由 *必填
          data: {
            id: 1
          }, // 传送数据
          name: "zhiyingzhisun", // 窗口名称
          animation: "none"
        }
      });
    },
    axiosChiCang(){
      let _this = this
     
       if (!localStorage.getItem(this.$store.state.localStorageLogin)) { //判断是否为登录状态
        // console.log('未登录状态');
       
      } else {
        // console.log('登录状态');
       let msg = JSON.stringify({
        userID:JSON.parse(localStorage.getItem(this.$store.state.localStorageUid)).userId
        })
        this.$pro.post('get_position_list_new', msg).then((res) => {
          // console.log(res)
          _this.tableData = res.msg.data
         
          let hqMsg = JSON.parse(localStorage.getItem(_this.$store.state.localStorageHq))[0].item,
              arr   = [],
              serialNum = [];
          for(let i=0;i<_this.tableData.length;i++){
            serialNum.push(_this.tableData[i].serialnum)
            for(let j=0;j<hqMsg.length;j++){
              if(_this.tableData[i].futures_code == hqMsg[j].code ){
                _this.tableData[i].buyPoint = hqMsg[j].buyPoint
               arr.push((hqMsg[j].buyPoint*1000 - _this.tableData[i].futures_price*1000)*_this.tableData[i].futures_num*_this.tableData[i].cs/1000) 
              }
            }
          }

            _this.equity = eval(arr.join("+"))
           _this.$store.state.serialnum = serialNum
            _this.$store.state.equityData = _this.equity
        })
       
      }
     
      
    },
    //平仓
    setPingchang(msg){
      // console.log(msg)
      const h = this.$createElement;
      this.$msgbox({
        title: '提示',
        message: h('p', {style:'text-align:center;'}, [
         
          h('p', null, msg.futures_name+' '+msg.futures_code),
          h('p', {style:'color:red'},msg.updown==1?'买'+msg.futures_num:'卖'+msg.futures_num),
         
          h('span', null, '确定平仓 '),
          h('i', { style: 'color: teal' }, '?')
        ]),
        center: true,
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        // beforeClose: (action, instance, done) => {
        //   if (action === 'confirm') {
        //     instance.confirmButtonLoading = true;
        //     instance.confirmButtonText = '执行中...';
        //     setTimeout(() => {
        //       done();
        //       setTimeout(() => {
        //         instance.confirmButtonLoading = false;
        //       }, 300);
        //     }, 3000);
        //   } else {
        //     done();
        //   }
        // }
      }).then(action => {
        // let userId = JSON.parse(localStorage.getItem(this.$store.state.localStorageUid)).userId
        let msgs = JSON.stringify({
            userID:JSON.parse(localStorage.getItem(this.$store.state.localStorageUid)).userId,
            tradeNum: msg.futures_num,
            tradePrice: msg.futures_price,
            futuresCode: msg.futures_code,
            updown: msg.updown,
            priceType: msg.orderTradeType,
            serialNum: msg.serialnum,
            stopLoss: msg.stoploss,
            stopProfit:msg.stopprofit
          })
          // console.log(msg);
          this.$pro.post('close_position', msgs).then((res) => {
            // console.log(res)
            if(res.result == 1){
              // this.axiosChiCang()
               this.$message({
                type: 'success',
                message: '成功'
              });
            }
           
          })
        
      });
    },
    c(row) {
      this.zuixinjia = row.myPrice;
    }
  },
  created(){
    let _this = this
    this.axiosChiCang();
     //监听webScoket数据变化  , 在created里执行监听,是因为要先执行上面一步初始化之后才进行动态赋值
    //  setTimeout(function(){
    //    _this.$watch('changeQuoteData',(val)=>{
    //     for(let i=0;i<_this.tableData.length;i++){
    //       if(val.code == _this.tableData[i].futures_code){
    //         _this.tableData[i].buyPoint = val.buyPoint
    //         // console.log(this.tableData)
    //       }
    //     }
    //   })
    //  },500)
    
  },
  computed:{
    changeLoginStatus(){
      return this.$store.state.account.loginStatus 
    },
    changeQuoteData(){
      return this.$store.state.market.quoteData
    },
    changeInitChicang(){
      return this.$store.state.market.initChicang
    },
    
    // changeTableData(){
    //   let _this = this
    //     for(let i=0;i<_this.tableData.length;i++){
    //       if(_this.$store.state.market.quoteData.code == _this.tableData[i].futures_code){
    //         _this.tableData[i].buyPoint = _this.$store.state.market.quoteData.buyPoint
    //         // console.log(this.tableData)
    //       }
    //     }
     
     
    //   return this.tableData
    // }
  },
  watch: {
    // 当窗口发生变化或页面加载时，获父级传递过来的高度，动态修改自身相关元素的高度
    Listheight: {
      handler: function(Val, oldVal) {
        document.getElementById("chicangTable").style.height = +Val - 60 + "px";
      }
    },
    //监听登录状态
    changeLoginStatus:function(val){
      if(val == true){
       this.axiosChiCang()
      }else{
        this.tableData = []
      }
    },
    changeQuoteData:function(val){
      let _this =this
      let nullObj     = {}
      let arr = [],a;
      // console.log(val)
      for(let i=0;i<this.tableData.length;i++){
        if(val.code == this.tableData[i].futures_code){
          this.tableData[i].buyPoint = val.buyPoint
          nullObj = this.tableData[i]
          this.$set(this.tableData,i,nullObj)  //强制刷新视图
          //计算动态权益
          for(let i=0;i<this.tableData.length;i++){
            
          
            arr.push((this.tableData[i].buyPoint*1000 - this.tableData[i].futures_price*1000)*this.tableData[i].futures_num*this.tableData[i].cs/1000)
          }
        
          _this.equity = eval(arr.join("+")).toFixed(2)
          _this.$store.state.equityData = _this.equity
          arr = []//清空arr
        }

      }
      
      
    },
    //监听持仓变化,初始化持仓列表
    // changeInitChicang:function(val,oldVal){
  
    //     this.axiosChiCang();
       
    // }

    
  }
};
</script>
<style lang="scss" scoped>
#chicangTable {
  // background: red;
  overflow-y: scroll;
  overflow-x: scroll;
  .el-table{
    background-color: transparent;
  }
  
}
.determineBtn{
    position: absolute;
    bottom: 0;
    left: 0;
    button{
      border: none;
      border-radius: 5px;
      width: 70px;
      height: 25px;
      background: #4176d8;
      color: white;
      line-height: 25px;
      margin-left: 5px;
      cursor: pointer;
      :hover{
        background: #224586;
      }
    }
  }
#chicangTable::-webkit-scrollbar {
  // display: none;
  width: 10px; // 横向滚动条
  height: 10px;
}
#chicangTable::-webkit-scrollbar-corner {
  display: none;
//  background: rgba(34, 39, 46, 1);
}
#chicangTable::-webkit-scrollbar-thumb {
  background-color: rgba(34,48,76,1);
  width: 6px; // 横向滚动条
  height: 6px;
}
</style>