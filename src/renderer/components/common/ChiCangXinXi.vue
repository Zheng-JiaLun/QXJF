<template>
  <div class="chicang">
    <div id="chicangTable">
      <el-table :data="tableData" class="table01" highlight-current-row>
        <el-table-column width="45px">
          <template slot-scope>
            <i class="el-icon-remove" style="font-size: 18px;color: #4176D8;cursor: pointer;"></i>
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
            <span style="color: #DCDC0A;">{{scope.row.position}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="futures_price" label="持仓价格" show-overflow-tooltip></el-table-column>
        <el-table-column prop="futures_num" label="变动单位" show-overflow-tooltip></el-table-column>
        <el-table-column label="最新价格" show-overflow-tooltip>
           <template slot-scope="scope">
            <span :style="scope.row.buyPoint >scope.row.futures_price?'color:#FF3322;':'color:#00BD00;'">{{scope.row.buyPoint}}</span>
          </template>
        </el-table-column>
        <el-table-column  label="盈亏" show-overflow-tooltip>
           <template slot-scope="scope">
            <span :style="scope.row.buyPoint - scope.row.futures_price >= 0 ? 'color:#FF3322;' : 'color:#00BD00;'"
            >{{(scope.row.buyPoint*100 - scope.row.futures_price*100)*scope.row.futures_num/100}}</span>
          </template>
        </el-table-column>
        <el-table-column  label="本币盈亏" show-overflow-tooltip>
            <template slot-scope="scope">
              <span :style="scope.row.this_pro_loss >= 0 ? 'color:#FF3322;' : 'color:#00BD00;'"
              >{{scope.row.this_pro_loss}}</span>
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
    
  </div>
</template>
<script>
export default {
  name: "chicang",
  props: ["Listheight"],
  data() {
    return {
      dialogVisible: false,
      zuixinjia: "暂无数据",
      equity:null,
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
       if (!localStorage.getItem('ycxUserLoginState_QXJF')) { //判断是否为登录状态
        console.log('未登录状态');
       
      } else {
        console.log('登录状态');
       let msg = JSON.stringify({
        userID:JSON.parse(localStorage.getItem('ycxUserInfo_QXJF')).userId
        })
        this.$pro.post('get_position_list_new', msg).then((res) => {
          _this.tableData = res.msg.data
          let hqMsg = JSON.parse(localStorage.getItem(_this.$store.state.localStorageHq)),
              arr   = [];
          for(let i=0;i<_this.tableData.length;i++){

            for(let j=0;j<hqMsg.length;j++){
              if(_this.tableData[i].futures_code == hqMsg[j].code ){
                _this.tableData[i].buyPoint = hqMsg[j].buyPoint
               arr.push((_this.tableData[i].buyPoint*1000 - _this.tableData[i].futures_price*1000)*_this.tableData[i].futures_num/1000) 
              }
            }
          }
            _this.equity = eval(arr.join("+"))
            _this.$store.state.equityData = _this.equity
        })
       
      }
     
      
    },
    c(row) {
      this.zuixinjia = row.myPrice;
    }
  },
  created(){
    this.axiosChiCang()
  },
  computed:{
    changeLoginStatus(){
      return this.$store.state.account.loginStatus 
    },
    changeQuoteData(){
      return this.$store.state.market.quoteData
    }
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
        let msg = JSON.stringify({
        userID:JSON.parse(localStorage.getItem('ycxUserInfo_QXJF')).userId
        })
        this.$pro.post('get_position_list_new', msg).then((res) => {
            // console.log(res.msg.data)
            this.tableData = res.msg.data
          
          })
      }else{
        this.tableData = []
      }
    },
    //监听webScoket数据变化
    changeQuoteData:function(val){
      // console.log(val)
      for(let i=0;i<this.tableData.length;i++){
        
        if(val.code == this.tableData[i].futures_code){
          
          
          this.tableData[i].buyPoint = val.buyPoint
          // console.log(this.tableData)
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
#chicangTable {
  // background: red;
  overflow-y: scroll;
  overflow-x: scroll;
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